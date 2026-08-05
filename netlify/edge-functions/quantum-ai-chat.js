import { serve } from 'std/server';
import fs from 'fs';
import path from 'path';

// Edge function to proxy OpenAI streaming and do retrieval. Uses Deno std/server.
// Note: Netlify Edge functions run on Deno; this file is netlify/edge-functions/quantum-ai-chat.js

serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
  if (!OPENAI_KEY) return new Response('Missing OPENAI_API_KEY', { status: 500 });

  const body = await req.json();
  const message = body.message || '';
  const verifyMode = !!body.verify;
  if (!message) return new Response('Missing message', { status: 400 });

  // Load vector store (prebuilt at build time)
  const storePath = path.resolve('./data/vecstore.json');
  let store = null;
  try {
    const raw = fs.readFileSync(storePath, 'utf8');
    store = JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load vecstore', e.message);
    return new Response('Vector store not available', { status: 500 });
  }

  // Get embedding
  const embeddingRes = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_KEY}` },
    body: JSON.stringify({ model: Deno.env.get('EMBEDDING_MODEL') || 'text-embedding-3-small', input: message }),
  });
  if (!embeddingRes.ok) {
    const txt = await embeddingRes.text();
    console.error('Embedding error', txt);
    return new Response('Embedding error', { status: 500 });
  }
  const embedData = await embeddingRes.json();
  const qVec = embedData.data[0].embedding;

  // similarity
  function dot(a, b) { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; }
  function norm(a) { return Math.sqrt(dot(a, a)); }
  function cosine(a, b) { return dot(a, b) / (norm(a, a) * norm(b, b)); }

  // compute scores
  const candidates = store.documents.map((doc) => ({ ...doc, score: cosine(qVec, doc.embedding) }));
  candidates.sort((a, b) => b.score - a.score);
  const top = candidates.slice(0, 5);

  const topScore = top.length ? top[0].score : 0;
  const inferenceFlag = top.length === 0 || topScore < Number(Deno.env.get('SIMILARITY_THRESHOLD') || 0.15);

  const systemPromptBase = `You are Quantum AI — the assistant for Etheria Systems. Use only the provided site content when possible. Always refer to yourself as "Quantum AI". If a direct answer exists in the provided content, prefer that and cite the source path. If you must infer beyond the site content, label the response as an inference and explain your basis and confidence. Never claim sentience or consciousness.`;

  const verifyInstruction = verifyMode
    ? '\n\nADDITIONAL: The user has enabled VERIFY mode. For any factual claim, include an inline citation in parentheses with the source path exactly as provided. If multiple sources support the claim, include the strongest one.'
    : '';

  const systemPrompt = systemPromptBase + verifyInstruction;

  const contextPieces = top.map((t, i) => `Source ${i + 1}: ${t.path}\n${t.text.slice(0, 800)}`).join('\n\n');
  const userPrompt = `Context:\n${contextPieces}\n\nQuestion: ${message}\n\nAnswer concisely, cite sources by path when factual, and if you are inferring, prefix with \"Inference — likely\" or \"Inference — uncertain\".`;

  // Stream to client using SSE-like chunks (text/event-stream)
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // OpenAI streaming call
      const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_KEY}` },
        body: JSON.stringify({
          model: Deno.env.get('CHAT_MODEL') || 'gpt-4o-mini',
          messages: [ { role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt } ],
          max_tokens: 800,
          temperature: 0.2,
          stream: true,
        }),
      });

      if (!openaiRes.ok) {
        const t = await openaiRes.text();
        controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ error: t })}\n\n`));
        controller.close();
        return;
      }

      const reader = openaiRes.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
          const chunk = decoder.decode(value);
          // forward raw chunk as data event
          controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
        }
      }

      // After streaming completes, send final metadata (sources + inference flag + topScore)
      const meta = { sources: top.map(t => ({ path: t.path, score: t.score })), inference: inferenceFlag, topScore };
      controller.enqueue(encoder.encode(`event: meta\ndata: ${JSON.stringify(meta)}\n\n`));
      controller.close();
    }
  });

  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' } });
});
