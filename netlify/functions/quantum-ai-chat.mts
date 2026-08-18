import OpenAI from 'openai'

function createOpenAiClient() {
  const gatewayKey = process.env.NETLIFY_AI_GATEWAY_KEY
  const gatewayBaseUrl = process.env.NETLIFY_AI_GATEWAY_BASE_URL

  if (gatewayKey && gatewayBaseUrl) {
    return new OpenAI({
      apiKey: gatewayKey,
      baseURL: gatewayBaseUrl.replace(/\/$/, ''),
    })
  }

  return new OpenAI()
}

const openai = createOpenAiClient()

type VectorDocument = {
  path: string
  text?: string
  embedding?: number[]
  score?: number
}

type VectorStore = {
  documents: VectorDocument[]
}

function jsonResponse(payload: unknown, status: number) {
  return Response.json(payload, { status })
}

function dot(left: number[], right: number[]) {
  return left.reduce((total, value, index) => total + value * (right[index] ?? 0), 0)
}

function cosine(left: number[], right: number[]) {
  const denominator = Math.sqrt(dot(left, left)) * Math.sqrt(dot(right, right))
  return denominator === 0 ? 0 : dot(left, right) / denominator
}

async function loadVectorStore(request: Request): Promise<VectorStore | null> {
  try {
    const response = await fetch(new URL('/data/vecstore.json', request.url))
    if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) return null

    const store = await response.json() as Partial<VectorStore>
    return Array.isArray(store.documents) ? { documents: store.documents } : null
  } catch (error) {
    console.error('Failed to load vector store', error instanceof Error ? error.message : error)
    return null
  }
}

async function findContext(request: Request, message: string) {
  const store = await loadVectorStore(request)
  if (!store) return []

  try {
    const embedding = await openai.embeddings.create({
      model: process.env.EMBEDDING_MODEL || 'text-embedding-3-small',
      input: message,
    })
    const queryVector = embedding.data[0]?.embedding
    if (!queryVector) return []

    return store.documents
      .filter((document) => Array.isArray(document.embedding) && document.embedding.length === queryVector.length)
      .map((document) => ({ ...document, score: cosine(queryVector, document.embedding!) }))
      .sort((left, right) => (right.score ?? 0) - (left.score ?? 0))
      .slice(0, 5)
  } catch (error) {
    console.error('Embedding request failed', error instanceof Error ? error.message : error)
    return []
  }
}

export default async (request: Request) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } })
  }

  let body: { message?: unknown; verify?: unknown }
  try {
    body = await request.json()
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400)
  }

  const message = typeof body.message === 'string' ? body.message.trim() : ''
  if (!message) return jsonResponse({ error: 'Missing message' }, 400)

  const top = await findContext(request, message)
  const topScore = top[0]?.score ?? 0
  const inference = top.length === 0 || topScore < Number(process.env.SIMILARITY_THRESHOLD || 0.15)
  const verifyInstruction = body.verify
    ? ' The user enabled VERIFY mode. Add the provided source path after factual claims supported by context.'
    : ''
  const context = top
    .map((item, index) => `Source ${index + 1}: ${item.path}\n${String(item.text || '').slice(0, 800)}`)
    .join('\n\n')
  const prompt = context
    ? `Context:\n${context}\n\nQuestion: ${message}\n\nAnswer concisely and cite source paths for contextual claims.`
    : `Question: ${message}\n\nAnswer concisely. No site context was available, so clearly label factual claims as unverified.`

  const encoder = new TextEncoder()
  const responseStream = new ReadableStream({
    async start(controller) {
      try {
        const stream = await openai.responses.create({
          model: process.env.CHAT_MODEL || 'gpt-5.2',
          instructions: `You are Quantum AI, the assistant for Etheria Systems. Use the provided site content when available. Always refer to yourself as "Quantum AI". If context directly answers the question, prefer it and cite its source path. Clearly label any inference beyond the context and explain its basis and confidence. Never claim sentience or consciousness.${verifyInstruction}`,
          input: prompt,
          max_output_tokens: 800,
          stream: true,
        })

        for await (const event of stream) {
          if (event.type === 'response.output_text.delta' && event.delta) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token: event.delta })}\n\n`))
          }
        }

        controller.enqueue(encoder.encode(`event: meta\ndata: ${JSON.stringify({
          sources: top.map((item) => ({ path: item.path, score: item.score })),
          inference,
          topScore,
        })}\n\n`))
      } catch (error) {
        console.error('Quantum AI request failed', error instanceof Error ? error.message : error)
        controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({
          error: 'Quantum AI is temporarily unavailable. Please try again.',
        })}\n\n`))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(responseStream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}

export const config = {
  path: '/api/quantum-ai-chat',
}
