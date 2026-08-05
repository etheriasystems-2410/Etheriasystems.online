import React, { useEffect, useRef, useState } from 'react';

export default function ChatWidget({ apiPath = '/.netlify/edge-functions/quantum-ai-chat' }: { apiPath?: string }) {
  const [messages, setMessages] = useState<{ id: string; role: string; text: string }[]>([
    { id: 'm0', role: 'system', text: 'You are Quantum AI — an assistant that answers questions about Etheria Systems. Prefer site content and cite sources; label inferences.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [verifyMode, setVerifyMode] = useState(false);
  const [lastMeta, setLastMeta] = useState<{ topScore?: number; inference?: boolean } | null>(null);
  const esRef = useRef<EventSource | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const appendMessage = (m: { id: string; role: string; text: string }) => setMessages((s) => [...s, m]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const txt = input.trim();
    appendMessage({ id: `u-${Date.now()}`, role: 'user', text: txt });
    setInput('');
    setLoading(true);
    setIsSpeaking(true);

    try {
      const res = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: txt, sessionContext: 'quantum-ai-page', verify: verifyMode }),
      });

      if (!res.ok) {
        const t = await res.text();
        appendMessage({ id: `e-${Date.now()}`, role: 'assistant', text: `Error: ${t}` });
        setLoading(false);
        setIsSpeaking(false);
        return;
      }

      if (esRef.current) { esRef.current.close(); esRef.current = null; }
      const streamUrl = apiPath;
      const es = new EventSource(streamUrl);
      esRef.current = es;
      let partial = '';

      const assistantId = 'assistant-stream';

      es.onmessage = (ev) => {
        const data = ev.data;
        partial += data;
        setMessages((prev) => {
          const others = prev.filter((p) => p.id !== assistantId);
          return [...others, { id: assistantId, role: 'assistant', text: partial }];
        });
      };

      es.addEventListener('meta', (ev: any) => {
        try {
          const meta = JSON.parse(ev.data);
          setLastMeta({ topScore: meta.topScore, inference: meta.inference });
          appendMessage({ id: `meta-${Date.now()}`, role: 'assistant', text: `Sources:\n${meta.sources.map((s: any) => `- ${s.path} (score:${(s.score ?? 0).toFixed(3)})`).join('\n')}` });
          if (meta.inference) appendMessage({ id: `inf-${Date.now()}`, role: 'assistant', text: 'Inference: This answer includes an informed inference where the site did not provide explicit details.' });

          try { window.dispatchEvent(new CustomEvent('quantum-ai-meta', { detail: meta })); } catch (e) { }

          setLoading(false);
          setIsSpeaking(false);
          es.close();
        } catch (e) {
          console.error('Invalid meta event', e);
        }
      });

      es.onerror = (err) => {
        console.error('SSE error', err);
        es.close();
        setLoading(false);
        setIsSpeaking(false);
      };

    } catch (err: any) {
      appendMessage({ id: `x-${Date.now()}`, role: 'assistant', text: `Error: ${err?.message || 'Network error'}` });
      setLoading(false);
      setIsSpeaking(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
    <div className="w-full max-w-3xl mx-auto">
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

        <div className="mt-3 text-xs text-[#8b8b9a]">
          <div>Last response confidence: <span className="font-mono text-sm">{lastMeta?.topScore ? lastMeta.topScore.toFixed(3) : 'n/a'}</span> {lastMeta?.inference ? <span className="text-[#f0a100]">(Inference)</span> : ''}</div>
          <div>Note: This widget streams responses from the Netlify Edge function at <code className="bg-black/30 px-1 rounded">/.netlify/edge-functions/quantum-ai-chat</code>.</div>
        </div>
      </div>
    </div>
  );
}
