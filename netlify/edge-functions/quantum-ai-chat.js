const jsonHeaders = { 'Content-Type': 'application/json' };

function dot(left, right) {
  let total = 0;
  for (let index = 0; index < left.length; index += 1) {
    total += left[index] * right[index];
  }
  return total;
}

function cosine(left, right) {
  const denominator = Math.sqrt(dot(left, left)) * Math.sqrt(dot(right, right));
  return denominator === 0 ? 0 : dot(left, right) / denominator;
}

async function loadVectorStore(request) {
  try {
    const storeUrl = new URL('/data/vecstore.json', request.url);
    const response = await fetch(storeUrl);
    if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
      return null;
    }

    const store = await response.json();
    return Array.isArray(store.documents) ? store : null;
  } catch (error) {
    console.error('Failed to load vector store', error instanceof Error ? error.message : error);
    return null;
  }
}

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
  }

  const openAiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAiKey) {
    return new Response('Missing OPENAI_API_KEY', { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers: jsonHeaders });
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const verifyMode = Boolean(body.verify);
  if (!message) {
    return new Response(JSON.stringify({ error: 'Missing message' }), { status: 400, headers: jsonHeaders });
  }

  const store = await loadVectorStore(request);
  let top = [];

  if (store) {
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${openAiKey}` },
      body: JSON.stringify({
        model: Deno.env.get('EMBEDDING_MODEL') || 'text-embedding-3-small',
        input: message,
      }),
    });

    if (!embeddingResponse.ok) {
      console.error('Embedding request failed', embeddingResponse.status);
      return new Response('Embedding error', { status: 502 });
    }

    const embeddingData = await embeddingResponse.json();
    const queryVector = embeddingData.data?.[0]?.embedding;

    if (Array.isArray(queryVector)) {
      top = store.documents
        .filter((document) => Array.isArray(document.embedding) && document.embedding.length === queryVector.length)
        .map((document) => ({ ...document, score: cosine(queryVector, document.embedding) }))
        .sort((left, right) => right.score - left.score)
        .slice(0, 5);
    }
  }

  const topScore = top[0]?.score ?? 0;
  const inferenceFlag = top.length === 0
    || topScore < Number(Deno.env.get('SIMILARITY_THRESHOLD') || 0.15);
  const verifyInstruction = verifyMode
    ? '\n\nThe user enabled VERIFY mode. Add the provided source path after factual claims supported by context.'
    : '';
  const systemPrompt = `You are Quantum AI, the assistant for Etheria Systems. Use the provided site content when available. Always refer to yourself as "Quantum AI". If context directly answers the question, prefer it and cite its source path. Clearly label any inference beyond the context and explain its basis and confidence. Never claim sentience or consciousness.${verifyInstruction}`;
  const contextPieces = top
    .map((item, index) => `Source ${index + 1}: ${item.path}\n${String(item.text || '').slice(0, 800)}`)
    .join('\n\n');
  const userPrompt = contextPieces
    ? `Context:\n${contextPieces}\n\nQuestion: ${message}\n\nAnswer concisely and cite source paths for contextual claims.`
    : `Question: ${message}\n\nAnswer concisely. No site context was available, so clearly label factual claims as unverified.`;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${openAiKey}` },
          body: JSON.stringify({
            model: Deno.env.get('CHAT_MODEL') || 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            max_tokens: 800,
            temperature: 0.2,
            stream: true,
          }),
        });

        if (!openAiResponse.ok || !openAiResponse.body) {
          controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ error: 'Chat request failed' })}\n\n`));
          controller.close();
          return;
        }

        const reader = openAiResponse.body.getReader();
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          if (value) controller.enqueue(encoder.encode(`data: ${new TextDecoder().decode(value)}\n\n`));
        }

        const metadata = {
          sources: top.map((item) => ({ path: item.path, score: item.score })),
          inference: inferenceFlag,
          topScore,
        };
        controller.enqueue(encoder.encode(`event: meta\ndata: ${JSON.stringify(metadata)}\n\n`));
        controller.close();
      } catch (error) {
        console.error('Chat stream failed', error instanceof Error ? error.message : error);
        controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ error: 'Chat stream failed' })}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
};

export const config = {
  path: '/.netlify/edge-functions/quantum-ai-chat',
};
