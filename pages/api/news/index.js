import vm from 'node:vm'

const NEWS_URL = 'https://stockanalysis.com/news/'

const REQUEST_HEADERS = {
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml'
}

function extractHydrationPayload(html) {
  const match = html.match(/data:\s*(\[\{type:"data".*?\])\s*,\s*form:\s*null/s)

  if (!match) {
    throw new Error('Hydration payload not found in source page')
  }

  return vm.runInNewContext(`(${match[1]})`)
}

function normalizeUrl(url, baseUrl) {
  if (!url) {
    return null
  }

  return new URL(url, baseUrl).toString()
}

function mapNewsItem(item, index, baseUrl) {
  return {
    id: `${item.source || 'news'}-${index}`,
    title: item.title || null,
    summary: item.text || null,
    url: normalizeUrl(item.url, baseUrl),
    imageUrl: item.img || null,
    source: item.source || null,
    type: item.type || null,
    tickers: Array.isArray(item.tickers) ? item.tickers : [],
    publishedAtLabel: item.time || null,
    relativeTime: item.ago || null
  }
}

async function fetchStockAnalysisNews({ url, path }) {
  const response = await fetch(url, {
    headers: REQUEST_HEADERS,
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error(`Upstream request failed with status ${response.status}`)
  }

  const html = await response.text()
  const hydrationPayload = extractHydrationPayload(html)
  const rawItems = path.reduce((value, key) => value?.[key], hydrationPayload)

  if (!Array.isArray(rawItems)) {
    throw new Error('News data not found in hydration payload')
  }

  return rawItems.map((item, index) => mapNewsItem(item, index, url))
}

function isNewsLikeItem(item) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    return false
  }

  return (
    typeof item.title === 'string' &&
    typeof item.url === 'string' &&
    (typeof item.source === 'string' || typeof item.text === 'string' || typeof item.time === 'string')
  )
}

function findBestNewsArray(root) {
  let bestMatch = null

  const visit = (value, path = []) => {
    if (Array.isArray(value)) {
      if (value.length > 0 && value.every(isNewsLikeItem)) {
        const score = value.length + (path.some((part) => String(part).toLowerCase().includes('news')) ? 100 : 0)

        if (!bestMatch || score > bestMatch.score) {
          bestMatch = { items: value, path, score }
        }
      }

      value.forEach((item, index) => visit(item, path.concat(index)))
      return
    }

    if (value && typeof value === 'object') {
      for (const [key, child] of Object.entries(value)) {
        visit(child, path.concat(key))
      }
    }
  }

  visit(root)
  return bestMatch
}

function mapStockNewsItem(item, index, baseUrl, code) {
  return {
    id: `${code}-${item.source || 'news'}-${index}`,
    title: item.title || null,
    summary: item.text || null,
    url: normalizeUrl(item.url, baseUrl),
    imageUrl: item.img || null,
    source: item.source || null,
    type: item.type || null,
    tickers: Array.isArray(item.tickers) ? item.tickers : [],
    publishedAtLabel: item.time || null,
    relativeTime: item.ago || null
  }
}

export { extractHydrationPayload, findBestNewsArray, mapStockNewsItem, fetchStockAnalysisNews, REQUEST_HEADERS }

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  try {
    const data = await fetchStockAnalysisNews({
      url: NEWS_URL,
      path: [1, 'data', 'data']
    })

    return res.status(200).json({
      success: true,
      source: NEWS_URL,
      fetchedAt: new Date().toISOString(),
      total: data.length,
      data
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch StockAnalysis news',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
