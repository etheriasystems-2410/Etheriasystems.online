declare const Deno: { env: { get(key: string): string | undefined } } | undefined

function jsonResponse(payload: unknown, status: number) {
  return Response.json(payload, { status })
}

function getEnvironmentVariable(name: string): string | undefined {
  if (typeof Deno !== 'undefined') return Deno.env.get(name)
  return globalThis.process?.env?.[name]
}

function getOpenAiConfig() {
  const gatewayKey = getEnvironmentVariable('NETLIFY_AI_GATEWAY_KEY')
  const gatewayBaseUrl = getEnvironmentVariable('NETLIFY_AI_GATEWAY_BASE_URL')

  if (gatewayKey && gatewayBaseUrl) {
    return {
      apiKey: gatewayKey,
      apiBaseUrl: `${gatewayBaseUrl.replace(/\/$/, '')}/v1`,
    }
  }

  const openAiKey = getEnvironmentVariable('OPENAI_API_KEY')
  if (!openAiKey) return null

  return {
    apiKey: openAiKey,
    apiBaseUrl: (getEnvironmentVariable('OPENAI_BASE_URL') || 'https://api.openai.com/v1').replace(/\/$/, ''),
  }
}

function getChatModel(): string {
  const configuredModel = getEnvironmentVariable('CHAT_MODEL')
  const supportedModels = new Set(['gpt-4o', 'gpt-4o-mini', 'gpt-4.1-mini', 'gpt-3.5-turbo', 'gpt-4'])
  return configuredModel && supportedModels.has(configuredModel) ? configuredModel : 'gpt-4o-mini'
}

type KnowledgeEntry = {
  keywords: string[]
  response: string
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    keywords: ['etheria', 'what is etheria', 'about etheria', 'app', 'company', 'etheria systems'],
    response: 'Etheria Systems is dedicated to combining ancient esoteric wisdom with cutting-edge modern technology. We build apps for tarot, astrology, rituals, crystal study, and spiritual divination designed for both beginners and seasoned practitioners.',
  },
  {
    keywords: ['quantum', 'quantum ai', 'how quantum works', 'ai'],
    response: 'Quantum AI is Etheria Systems\' signature assistant technology. Unlike conventional rigid AI models, Quantum AI adapts dynamically to spiritual, astrological, and symbolic context in real time to offer nuanced and non-repetitive insights.',
  },
  {
    keywords: ['tarot', 'cards', 'reading', 'spread', 'arcanum'],
    response: 'In Etheria\'s Tarot & Arcanum modules, you can explore the Major and Minor Arcana, study symbolic paths, and perform deep spreads tailored to your spiritual queries.',
  },
  {
    keywords: ['astrology', 'horoscope', 'zodiac', 'planet', 'stars'],
    response: 'Our Astrology features interpret natal placements, transits, and elemental harmonies to provide intuitive guidance on life paths and personal timing.',
  },
  {
    keywords: ['price', 'pricing', 'cost', 'subscription', 'free', 'trial', 'pay'],
    response: 'Etheria Systems offers free core access to features across our applications. Full access is available via affordable monthly/annual subscriptions or single access passes through the Etheria Systems Hub.',
  },
  {
    keywords: ['contact', 'support', 'help', 'email', 'tester', 'beta'],
    response: 'You can contact Etheria Systems directly through the app or by reaching out via our official contact channels. Beta testers receive exclusive access codes upon joining!',
  },
]

function generateFallbackResponse(message: string): string {
  const lowerMsg = message.toLowerCase()
  const matched = KNOWLEDGE_BASE.find((entry) =>
    entry.keywords.some((keyword) => lowerMsg.includes(keyword))
  )

  if (matched) {
    return matched.response
  }

  return `Greetings! I am Quantum AI, your assistant for Etheria Systems. Regarding "${message}": Etheria Systems integrates esoteric traditions—such as Tarot, Astrology, and Ritual Work—with responsive digital intelligence. Feel free to ask about our applications, divination tools, or subscription options!`
}

async function streamFallbackResponse(message: string): Promise<Response> {
  const text = generateFallbackResponse(message)
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const words = text.split(' ')
      for (let i = 0; i < words.length; i++) {
        const token = (i === 0 ? '' : ' ') + words[i]
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`))
        await new Promise((resolve) => setTimeout(resolve, 30))
      }

      controller.enqueue(
        encoder.encode(
          `event: meta\ndata: ${JSON.stringify({
            sources: [{ path: '/info/quantum-ai' }],
            inference: true,
            topScore: 1.0,
          })}\n\n`
        )
      )
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}

export default async (request: Request) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } })
  }

  let body: { message?: unknown; verify?: unknown } = {}
  try {
    const json = await request.json()
    if (json && typeof json === 'object') {
      body = json as { message?: unknown; verify?: unknown }
    }
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400)
  }

  const message = typeof body.message === 'string' ? body.message.trim() : ''
  if (!message) return jsonResponse({ error: 'Missing message' }, 400)

  const openAiConfig = getOpenAiConfig()
  if (!openAiConfig) {
    return streamFallbackResponse(message)
  }

  const verifyMode = Boolean(body.verify)
  const verifyInstruction = verifyMode
    ? '\n\nThe user enabled VERIFY mode. Add relevant source references where applicable.'
    : ''
  const systemPrompt = `You are Quantum AI, the assistant for Etheria Systems. Always refer to yourself as "Quantum AI". Provide helpful, concise, and insightful answers regarding Etheria Systems, divination, astrology, and quantum spirituality. Never claim sentience or consciousness.${verifyInstruction}`

  try {
    const openAiResponse = await fetch(`${openAiConfig.apiBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAiConfig.apiKey}`,
      },
      body: JSON.stringify({
        model: getChatModel(),
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 800,
        temperature: 0.3,
        stream: true,
      }),
    })

    if (!openAiResponse.ok || !openAiResponse.body) {
      console.error('OpenAI Chat API returned error:', openAiResponse.status)
      return streamFallbackResponse(message)
    }

    const encoder = new TextEncoder()
    const reader = openAiResponse.body.getReader()
    const decoder = new TextDecoder()

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = ''

        const forwardLine = (line: string) => {
          if (!line.startsWith('data:')) return

          const data = line.slice(5).trim()
          if (!data || data === '[DONE]') return

          try {
            const chunk = JSON.parse(data) as { choices?: Array<{ delta?: { content?: string } }> }
            const token = chunk.choices?.[0]?.delta?.content
            if (token) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`))
            }
          } catch {
            // Ignore parse errors for partial chunks
          }
        }

        try {
          while (true) {
            const { value, done } = await reader.read()
            if (value) {
              buffer += decoder.decode(value, { stream: !done }).replace(/\r\n/g, '\n')
              const lines = buffer.split('\n')
              buffer = lines.pop() || ''
              lines.forEach(forwardLine)
            }
            if (done) break
          }

          if (buffer.trim()) forwardLine(buffer)

          controller.enqueue(
            encoder.encode(
              `event: meta\ndata: ${JSON.stringify({
                sources: [{ path: '/api/quantum-ai-chat' }],
                inference: false,
                topScore: 0.95,
              })}\n\n`
            )
          )
        } catch (err) {
          console.error('Stream processing error:', err)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Quantum AI external request failed:', error)
    return streamFallbackResponse(message)
  }
}

export const config = {
  path: '/api/quantum-ai-chat',
}
