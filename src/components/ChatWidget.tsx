import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

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
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const appendMessage = (message: Message) => setMessages((current) => [...current, message]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const txt = input.trim();
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
    } catch (error) {
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
    <div className="w-full max-w-4xl mx-auto">
      <div className="p-4 rounded-2xl bg-[#0a0a0b]/40 border border-white/10 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-cinzel text-lg text-[#f5f5f5]">Ask Quantum AI</h4>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-[#a0a0b8]"><input type="checkbox" checked={verifyMode} onChange={(e) => setVerifyMode(e.target.checked)} /> Verify</label>
            <button onClick={downloadTranscript} className="text-xs text-[#a0a0b8] hover:text-[#00e5e5]">Download transcript</button>
          </div>
        </div>

        <div ref={containerRef} className="h-56 overflow-auto p-3 rounded-md bg-black/20 border border-white/5 mb-4">
          {messages.map((m) => (
            <div key={m.id} className={`mb-3 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block max-w-[85%] break-words px-3 py-2 rounded-md ${m.role === 'user' ? 'bg-[#c9a227]/15 text-[#f5f5f5]' : 'bg-[#111111]/70 text-[#dcdcdc]'}`}>
                <div className="text-sm whitespace-pre-wrap">{m.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown}
            placeholder="Ask about Quantum AI, our company, or products..."
            className="flex-1 resize-none min-h-[44px] max-h-36 px-3 py-2 rounded-md bg-transparent border border-white/10 text-[#e6e6e6] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40" />
          <button onClick={sendMessage} disabled={loading || !input.trim()} className="px-4 py-2 bg-gradient-to-r from-[#c9a227] to-[#e5c100] text-[#0a0a0b] font-cinzel rounded-md disabled:opacity-50">
            {loading ? 'Thinking...' : 'Send'}
          </button>
        </div>

        {lastMeta && (
          <div className="mt-3 text-xs text-[#8b8b9a]" aria-live="polite">
            <div>Last response confidence: <span className="font-mono text-sm">{lastMeta.topScore ? lastMeta.topScore.toFixed(3) : 'n/a'}</span> {lastMeta.inference ? <span className="text-[#f0a100]">(Inference)</span> : ''}</div>
            {lastMeta.sources?.length ? <div>Sources: {lastMeta.sources.map((source) => source.path).join(', ')}</div> : null}
          </div>
        )}
      </div>
    </div>
  );
}
