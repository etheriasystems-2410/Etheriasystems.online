function jsonResponse(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function getOpenAiConfig() {
  const gatewayKey = Deno.env.get('NETLIFY_AI_GATEWAY_KEY');
  const gatewayBaseUrl = Deno.env.get('NETLIFY_AI_GATEWAY_BASE_URL');

  if (gatewayKey && gatewayBaseUrl) {
    return {
      apiKey: gatewayKey,
      apiBaseUrl: `${gatewayBaseUrl.replace(/\/$/, '')}/v1`,
    };
  }

  const openAiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAiKey) return null;

  return {
    apiKey: openAiKey,
    apiBaseUrl: (Deno.env.get('OPENAI_BASE_URL') || 'https://api.openai.com/v1').replace(/\/$/, ''),
  };
}

function getChatModel() {
  const configuredModel = Deno.env.get('CHAT_MODEL');
  const supportedModels = new Set(['gpt-4o-mini', 'gpt-4.1-mini', 'gpt-5-mini']);
  return configuredModel && supportedModels.has(configuredModel) ? configuredModel : 'gpt-4.1-mini';
}

async function logProviderError(label, response) {
  let detail = '';

  try {
    const payload = await response.clone().json();
    detail = payload?.error?.code || payload?.error?.type || '';
  } catch {
    detail = '';
  }

  console.error(label, response.status, detail);
}

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

  const openAiConfig = getOpenAiConfig();
  if (!openAiConfig) {
    return jsonResponse({ error: 'AI service configuration unavailable' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const verifyMode = Boolean(body.verify);
  if (!message) {
    return jsonResponse({ error: 'Missing message' }, 400);
  }

  const store = await loadVectorStore(request);
  let top = [];

  if (store) {
    const embeddingResponse = await fetch(`${openAiConfig.apiBaseUrl}/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${openAiConfig.apiKey}` },
      body: JSON.stringify({
        model: Deno.env.get('EMBEDDING_MODEL') || 'text-embedding-3-small',
        input: message,
      }),
    });

    if (!embeddingResponse.ok) {
      await logProviderError('Embedding request failed', embeddingResponse);
      return jsonResponse({ error: 'AI context service unavailable' }, 502);
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
        const openAiResponse = await fetch(`${openAiConfig.apiBaseUrl}/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${openAiConfig.apiKey}` },
          body: JSON.stringify({
            model: getChatModel(),
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
          await logProviderError('Chat request failed', openAiResponse);
          controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ error: 'Quantum AI is temporarily unavailable. Please try again.' })}\n\n`));
          controller.close();
          return;
        }

        const reader = openAiResponse.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        const forwardLine = (line) => {
          if (!line.startsWith('data:')) return;

          const data = line.slice(5).trim();
          if (!data || data === '[DONE]') return;

          try {
            const chunk = JSON.parse(data);
            const token = chunk.choices?.[0]?.delta?.content;
            if (token) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`));
          } catch (error) {
            console.error('Invalid OpenAI stream chunk', error instanceof Error ? error.message : error);
          }
        };

        while (true) {
          const { value, done } = await reader.read();
          buffer += decoder.decode(value, { stream: !done });

          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          lines.forEach(forwardLine);

          if (done) break;
        }

        if (buffer.trim()) forwardLine(buffer);

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
