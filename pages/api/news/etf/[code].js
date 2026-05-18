import {
  extractHydrationPayload,
  findBestNewsArray,
  mapStockNewsItem,
  REQUEST_HEADERS
} from '../index'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  const code = String(req.query.code || '').trim().toLowerCase()

  if (!code) {
    return res.status(400).json({
      success: false,
      message: 'ETF code is required'
    })
  }

  const etfUrl = `https://stockanalysis.com/etf/${code}/`

  try {
    const response = await fetch(etfUrl, {
      headers: REQUEST_HEADERS,
      cache: 'no-store'
    })

    if (response.status === 404) {
      return res.status(404).json({
        success: false,
        message: `ETF code '${code}' was not found`
      })
    }

    if (!response.ok) {
      throw new Error(`Upstream request failed with status ${response.status}`)
    }

    const html = await response.text()
    const hydrationPayload = extractHydrationPayload(html)
    const etfInfo = hydrationPayload?.[1]?.data?.info
    const newsItems = hydrationPayload?.[2]?.data?.news?.data
    const newsMatch = Array.isArray(newsItems) ? { items: newsItems } : findBestNewsArray(hydrationPayload)

    if (!newsMatch || !Array.isArray(newsMatch.items)) {
      throw new Error('ETF news data not found in hydration payload')
    }

    const data = newsMatch.items.map((item, index) => mapStockNewsItem(item, index, etfUrl, code))

    return res.status(200).json({
      success: true,
      source: etfUrl,
      symbol: etfInfo?.ticker || code.toUpperCase(),
      name: etfInfo?.name || null,
      fetchedAt: new Date().toISOString(),
      total: data.length,
      data
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch StockAnalysis ETF news',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
