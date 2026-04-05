const express = require('express')
const fs = require('node:fs')
const path = require('node:path')
const next = require('next')

const dev = process.argv.includes('--dev')
const port = Number(process.env.PORT || 3000)
const docsBuildDir = path.join(__dirname, 'docs-site', 'build')

function sendDocsUnavailable(res) {
  return res.status(503).send('Docusaurus docs belum dibuild. Jalankan `npm run docs:build` terlebih dahulu.')
}

function renderUptimePage(payload) {
  const results = Array.isArray(payload?.data) ? payload.data : []
  const allHealthy = Boolean(payload?.uptime)
  const rows = results
    .map((result) => {
      const statusText = result.ok ? 'UP' : 'DOWN'
      const statusColor = result.ok ? '#16a34a' : '#dc2626'
      const detail = result.error || `HTTP ${result.status}`

      return `
        <tr>
          <td><code>${result.route}</code></td>
          <td><span style="display:inline-block;padding:4px 10px;border-radius:999px;background:${statusColor};color:#fff;font-weight:700;">${statusText}</span></td>
          <td>${result.responseTimeMs} ms</td>
          <td>${detail}</td>
        </tr>
      `
    })
    .join('')

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>API Uptime Monitor</title>
    <style>
      body { font-family: Arial, sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 32px; }
      .wrap { max-width: 1100px; margin: 0 auto; }
      .card { background: #111827; border: 1px solid #1f2937; border-radius: 16px; padding: 24px; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      th, td { text-align: left; padding: 14px 12px; border-bottom: 1px solid #1f2937; vertical-align: top; }
      th { color: #93c5fd; font-size: 14px; }
      h1 { margin: 0 0 8px; }
      p { color: #94a3b8; }
      code { color: #f8fafc; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <h1>API Route Monitoring</h1>
        <p>Status saat ini: <strong style="color:${allHealthy ? '#4ade80' : '#f87171'};">${allHealthy ? 'SEMUA ROUTE UP' : 'ADA ROUTE BERMASALAH'}</strong></p>
        <p>Checked at: ${payload?.checkedAt || new Date().toISOString()}</p>
        <p>Healthy: ${payload?.healthy ?? 0} / ${payload?.total ?? results.length}</p>
        <table>
          <thead>
            <tr>
              <th>Route</th>
              <th>Status</th>
              <th>Response Time</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  </body>
</html>`
}

async function startServer() {
  const app = next({ dev })
  const handle = app.getRequestHandler()

  await app.prepare()

  const server = express()

  server.all('/api/*', (req, res) => handle(req, res))
  server.all('/_next/*', (req, res) => handle(req, res))
  server.get('/uptime', async (req, res) => {
    const host = req.get('host') || `localhost:${port}`
    const protocol = req.protocol || 'http'
    const baseUrl = `${protocol}://${host}`
    const response = await fetch(`${baseUrl}/api/uptime`, {
      headers: {
        accept: 'application/json'
      }
    })

    if (!response.ok) {
      return res.status(502).send('Failed to load uptime data from /api/uptime')
    }

    const payload = await response.json()

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    return res.status(200).send(renderUptimePage(payload))
  })

  if (fs.existsSync(docsBuildDir)) {
    server.use(express.static(docsBuildDir))

    server.get('*', (req, res) => {
      res.sendFile(path.join(docsBuildDir, 'index.html'))
    })
  } else {
    server.get('*', (req, res) => sendDocsUnavailable(res))
  }

  server.listen(port, () => {
    process.stdout.write(`> Ready on http://localhost:${port}\n`)
  })
}

startServer().catch((error) => {
  process.stderr.write(`${error.stack || error}\n`)
  process.exit(1)
})
