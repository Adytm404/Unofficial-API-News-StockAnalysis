const monitoredRoutes = [
  '/api/news',
  '/api/news/ipos',
  '/api/trending',
  '/api/gainers',
  '/api/losers',
  '/api/news/aapl',
  '/api/ratings/nvda'
]

async function checkRoute(baseUrl, route) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)
  const startedAt = Date.now()

  try {
    const response = await fetch(`${baseUrl}${route}`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        accept: 'application/json'
      },
      cache: 'no-store'
    })

    return {
      route,
      ok: response.ok,
      status: response.status,
      responseTimeMs: Date.now() - startedAt,
      error: null
    }
  } catch (error) {
    return {
      route,
      ok: false,
      status: null,
      responseTimeMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  } finally {
    clearTimeout(timeout)
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  const protocol =
    req.headers['x-forwarded-proto'] ||
    (req.headers.host && req.headers.host.includes('localhost') ? 'http' : 'https')
  const host = req.headers.host || 'localhost:3000'
  const baseUrl = `${protocol}://${host}`
  const results = await Promise.all(monitoredRoutes.map((route) => checkRoute(baseUrl, route)))
  const healthyCount = results.filter((result) => result.ok).length

  return res.status(200).json({
    success: true,
    checkedAt: new Date().toISOString(),
    baseUrl,
    total: results.length,
    healthy: healthyCount,
    unhealthy: results.length - healthyCount,
    uptime: healthyCount === results.length,
    data: results
  })
}
