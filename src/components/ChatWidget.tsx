import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Square, Volume2, VolumeX } from 'lucide-react';

type Message = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
};

type Source = {
  path: string;
  score?: number;
};

type StreamMeta = {
  sources?: Source[];
  topScore?: number;
  inference?: boolean;
};

type StreamEvent = {
  event: string;
  data: string;
};

function parseEvent(frame: string): StreamEvent | null {
  let event = 'message';
  const data: string[] = [];

  frame.split('\n').forEach((line) => {
    if (line.startsWith('event:')) event = line.slice(6).trim();
    if (line.startsWith('data:')) data.push(line.slice(5).trimStart());
  });

  return data.length ? { event, data: data.join('\n') } : null;
}

export default function ChatWidget({ apiPath = '/api/quantum-ai-chat' }: { apiPath?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm0', role: 'assistant', text: 'Welcome. I am Quantum AI. Ask me about Etheria Systems, our applications, or the technology behind them.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifyMode, setVerifyMode] = useState(false);
  const [lastMeta, setLastMeta] = useState<StreamMeta | null>(null);
  const [speechSupported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window);
  const [voiceEnabled, setVoiceEnabled] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const voiceEnabledRef = useRef(voiceEnabled);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => () => {
    if (speechSupported) window.speechSynthesis.cancel();
  }, [speechSupported]);

  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
  }, [voiceEnabled]);

  const appendMessage = (message: Message) => setMessages((current) => [...current, message]);

  const stopSpeaking = () => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    setSpeakingMessageId(null);
  };

  const speakMessage = (text: string, messageId: string) => {
    if (!speechSupported || !text.trim()) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      text
        .replace(/https?:\/\/\S+/g, 'link')
        .replace(/[*_#`>]/g, '')
        .trim(),
    );
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.lang.startsWith('en') && /natural|premium|enhanced/i.test(voice.name))
      || voices.find((voice) => voice.lang.startsWith('en'))
      || null;
    utterance.rate = 0.96;
    utterance.pitch = 0.94;
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);
    setSpeakingMessageId(messageId);
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoice = () => {
    const nextEnabled = !voiceEnabled;
    voiceEnabledRef.current = nextEnabled;
    setVoiceEnabled(nextEnabled);
    if (!nextEnabled) stopSpeaking();
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const txt = input.trim();
    stopSpeaking();
    window.dispatchEvent(new CustomEvent('quantum-ai-question', { detail: { length: txt.length } }));
    appendMessage({ id: `u-${Date.now()}`, role: 'user', text: txt });
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: txt, sessionContext: 'quantum-ai-page', verify: verifyMode }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || 'Quantum AI is currently unavailable.');
      }

      if (!res.body) throw new Error('Quantum AI returned an empty response.');

      window.dispatchEvent(new CustomEvent('quantum-ai-answer-start'));

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let partial = '';
      let buffer = '';
      let receivedMeta = false;

      const assistantId = `assistant-${Date.now()}`;
      const updateAssistant = () => {
        setMessages((prev) => {
          const others = prev.filter((p) => p.id !== assistantId);
          return [...others, { id: assistantId, role: 'assistant', text: partial }];
        });
      };

      const handleEvent = (streamEvent: StreamEvent) => {
        if (streamEvent.event === 'meta') {
          const meta = JSON.parse(streamEvent.data) as StreamMeta;
          receivedMeta = true;
          setLastMeta(meta);
          window.dispatchEvent(new CustomEvent('quantum-ai-meta', { detail: meta }));
          return;
        }

        if (streamEvent.event === 'error') {
          const error = JSON.parse(streamEvent.data) as { error?: string };
          throw new Error(error.error || 'Quantum AI could not complete the response.');
        }

        const payload = JSON.parse(streamEvent.data) as { token?: string };
        if (payload.token) {
          partial += payload.token;
          updateAssistant();
          window.dispatchEvent(new CustomEvent('quantum-ai-answer-token', { detail: { length: payload.token.length } }));
        }
      };

      while (true) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value, { stream: !done }).replace(/\r\n/g, '\n');

        const frames = buffer.split('\n\n');
        buffer = frames.pop() || '';
        frames.forEach((frame) => {
          const streamEvent = parseEvent(frame);
          if (streamEvent) handleEvent(streamEvent);
        });

        if (done) break;
      }

      if (buffer.trim()) {
        const streamEvent = parseEvent(buffer);
        if (streamEvent) handleEvent(streamEvent);
      }

      if (!partial && !receivedMeta) throw new Error('Quantum AI returned an incomplete response.');
      window.dispatchEvent(new CustomEvent('quantum-ai-answer-complete', { detail: { length: partial.length } }));
      if (voiceEnabledRef.current && partial) speakMessage(partial, assistantId);
    } catch (error) {
      window.dispatchEvent(new CustomEvent('quantum-ai-answer-error'));
      appendMessage({
        id: `x-${Date.now()}`,
        role: 'assistant',
        text: error instanceof Error ? error.message : 'Quantum AI is currently unavailable.',
      });
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const downloadTranscript = () => {
    const lines = messages.map((m) => `${m.role.toUpperCase()}: ${m.text}`);
    const blob = new Blob([lines.join('\n\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quantum-ai-transcript-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-0">
      <div className="flex h-full min-h-0 flex-col rounded-xl sm:rounded-2xl bg-[#0a0a0b]/40 border border-white/10 p-2.5 sm:p-3 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 sm:mb-3">
          <h4 className="font-cinzel text-sm sm:text-base text-[#f5f5f5]">Ask Quantum AI</h4>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleVoice}
              disabled={!speechSupported}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-[10px] sm:text-xs text-[#a0a0b8] transition-colors hover:border-[#00e5e5]/35 hover:text-[#00e5e5] disabled:cursor-not-allowed disabled:opacity-40"
              aria-pressed={voiceEnabled}
              title={speechSupported ? 'Toggle spoken answers' : 'Speech is not supported by this browser'}
            >
              {voiceEnabled ? <Volume2 size={13} aria-hidden="true" /> : <VolumeX size={13} aria-hidden="true" />}
              {voiceEnabled ? 'Voice on' : 'Voice off'}
            </button>
            <label className="hidden sm:flex items-center gap-1.5 text-xs text-[#a0a0b8]"><input type="checkbox" checked={verifyMode} onChange={(e) => setVerifyMode(e.target.checked)} /> Verify</label>
            <button onClick={downloadTranscript} className="hidden lg:inline text-xs text-[#a0a0b8] hover:text-[#00e5e5]">Download</button>
          </div>
        </div>

        <div ref={containerRef} className="min-h-[6.5rem] flex-1 overflow-auto p-2 sm:p-3 rounded-md bg-black/20 border border-white/5 mb-2 sm:mb-3" aria-live="polite">
          {messages.map((m) => (
            <div key={m.id} className={`mb-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`group relative inline-block max-w-[90%] break-words px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md ${m.role === 'user' ? 'bg-[#c9a227]/15 text-[#f5f5f5]' : 'bg-[#111111]/70 text-[#dcdcdc] pr-9'}`}>
                <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{m.text}</div>
                {m.role === 'assistant' && speechSupported && m.text && (
                  <button
                    type="button"
                    onClick={() => speakingMessageId === m.id ? stopSpeaking() : speakMessage(m.text, m.id)}
                    className="absolute right-1.5 top-1.5 rounded p-1 text-[#85859a] transition-colors hover:bg-white/5 hover:text-[#00e5e5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00e5e5]"
                    aria-label={speakingMessageId === m.id ? 'Stop speaking answer' : 'Speak answer'}
                    title={speakingMessageId === m.id ? 'Stop speaking' : 'Speak this answer'}
                  >
                    {speakingMessageId === m.id ? <Square size={12} fill="currentColor" aria-hidden="true" /> : <Volume2 size={14} aria-hidden="true" />}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 sm:gap-3">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown}
            placeholder="Ask about Quantum AI, our company, or products..."
            aria-label="Message Quantum AI"
            className="flex-1 resize-none min-h-[40px] max-h-24 px-2.5 sm:px-3 py-2 rounded-md bg-transparent border border-white/10 text-xs sm:text-sm text-[#e6e6e6] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40" />
          <button onClick={sendMessage} disabled={loading || !input.trim()} className="px-3 sm:px-4 py-2 bg-gradient-to-r from-[#c9a227] to-[#e5c100] text-[#0a0a0b] text-xs sm:text-sm font-cinzel rounded-md disabled:opacity-50">
            {loading ? 'Thinking...' : 'Send'}
          </button>
        </div>

        {lastMeta && (
          <div className="hidden xl:block mt-2 text-[10px] text-[#8b8b9a]" aria-live="polite">
            <div>Last response confidence: <span className="font-mono text-sm">{lastMeta.topScore ? lastMeta.topScore.toFixed(3) : 'n/a'}</span> {lastMeta.inference ? <span className="text-[#f0a100]">(Inference)</span> : ''}</div>
            {lastMeta.sources?.length ? <div>Sources: {lastMeta.sources.map((source) => source.path).join(', ')}</div> : null}
          </div>
        )}
      </div>
    </div>
  );
}
