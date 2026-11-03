import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import quantumAiHandler from "./netlify/functions/quantum-ai-chat.mts"

function localApiPlugin(): Plugin {
  return {
    name: 'local-quantum-ai-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/quantum-ai-chat') || req.url?.startsWith('/.netlify/edge-functions/quantum-ai-chat')) {
          try {
            let bodyStr = ''
            req.on('data', (chunk) => {
              bodyStr += chunk
            })
            req.on('end', async () => {
              const fullUrl = `http://${req.headers.host || 'localhost'}${req.url}`
              const request = new Request(fullUrl, {
                method: req.method,
                headers: req.headers as Record<string, string>,
                body: ['POST', 'PUT', 'PATCH'].includes(req.method || '') ? bodyStr : undefined,
              })

              const response = await quantumAiHandler(request)
              res.statusCode = response.status
              response.headers.forEach((val, key) => {
                res.setHeader(key, val)
              })

              if (response.body) {
                const reader = response.body.getReader()
                while (true) {
                  const { done, value } = await reader.read()
                  if (done) break
                  if (value) res.write(value)
                }
              }
              res.end()
            })
          } catch (err) {
            console.error('Local API error:', err)
            next()
          }
        } else {
          next()
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), localApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
