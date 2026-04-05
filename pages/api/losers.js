import vm from 'node:vm'

const LOSERS_URL = 'https://stockanalysis.com/markets/losers/'

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

function mapMoverItem(item) {
  return {
    rank: item.no ?? null,
    symbol: item.s || null,
    name: item.n || null,
    changePercent: item.change ?? null,
    price: item.price ?? null,
    volume: item.volume ?? null,
    marketCap: item.marketCap ?? null,
    priceDate: item.priceDate || null,
    url: item.s ? `https://stockanalysis.com/stocks/${String(item.s).toLowerCase()}/` : null
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

  try {
    const response = await fetch(LOSERS_URL, {
      headers: REQUEST_HEADERS,
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`Upstream request failed with status ${response.status}`)
    }

    const html = await response.text()
    const hydrationPayload = extractHydrationPayload(html)
    const query = hydrationPayload?.[2]?.data?.query
    const rawItems = hydrationPayload?.[2]?.data?.data

    if (!Array.isArray(rawItems)) {
      throw new Error('Losers data not found in hydration payload')
    }

    const data = rawItems.map(mapMoverItem)

    return res.status(200).json({
      success: true,
      source: LOSERS_URL,
      section: 'Top Stock Losers',
      timeframe: 'today',
      fetchedAt: new Date().toISOString(),
      total: data.length,
      query: {
        type: query?.type || null,
        index: query?.index || null,
        main: query?.main || null,
        count: query?.count ?? null,
        sortDirection: query?.sortDirection || null,
        filters: Array.isArray(query?.filters) ? query.filters : []
      },
      data
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch StockAnalysis losers',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
