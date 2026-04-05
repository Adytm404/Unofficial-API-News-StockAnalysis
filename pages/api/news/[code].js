import {
  extractHydrationPayload,
  findBestNewsArray,
  mapStockNewsItem,
  REQUEST_HEADERS
} from './index'

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
      message: 'Stock code is required'
    })
  }

  const stockUrl = `https://stockanalysis.com/stocks/${code}/`

  try {
    const response = await fetch(stockUrl, {
      headers: REQUEST_HEADERS,
      cache: 'no-store'
    })

    if (response.status === 404) {
      return res.status(404).json({
        success: false,
        message: `Stock code '${code}' was not found`
      })
    }

    if (!response.ok) {
      throw new Error(`Upstream request failed with status ${response.status}`)
    }

    const html = await response.text()
    const hydrationPayload = extractHydrationPayload(html)
    const stockInfo = hydrationPayload?.[1]?.data?.info
    const newsMatch = findBestNewsArray(hydrationPayload)

    if (!newsMatch || !Array.isArray(newsMatch.items)) {
      throw new Error('Stock news data not found in hydration payload')
    }

    const data = newsMatch.items.map((item, index) => mapStockNewsItem(item, index, stockUrl, code))

    return res.status(200).json({
      success: true,
      source: stockUrl,
      symbol: stockInfo?.ticker || code.toUpperCase(),
      name: stockInfo?.nameFull || stockInfo?.name || null,
      fetchedAt: new Date().toISOString(),
      total: data.length,
      data
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch StockAnalysis stock news',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
