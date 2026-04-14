import vm from 'node:vm'

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

function mapRatingItem(item, index, code) {
  const analystSlug = item.analyst ? item.analyst.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : `analyst-${index}`
  const firmSlug = item.firm ? item.firm.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : `firm-${index}`
  
  return {
    id: `${code}-${firmSlug}-${analystSlug}-${item.date || index}`,
    analyst: item.analyst || null,
    firm: item.firm || null,
    rating: item.rating_new || null,
    previousRating: item.rating_old || null,
    action: item.action_rt || null,
    priceTarget: item.pt_now ?? null,
    previousPriceTarget: item.pt_old ?? null,
    date: item.date || null,
    time: item.time || null,
    analystScore: item.scores ? {
      score: item.scores.score ?? null,
      stars: item.scores.stars ?? null,
      totalRatings: item.scores.total ?? null,
      avgReturn: item.scores.avg_return ?? null,
      successRate: item.scores.success_rate ?? null
    } : null
  }
}

function calculateUpside(currentPrice, priceTarget) {
  if (!currentPrice || !priceTarget || currentPrice <= 0) {
    return null
  }
  
  return ((priceTarget - currentPrice) / currentPrice) * 100
}

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

  const ratingsUrl = `https://stockanalysis.com/stocks/${code}/ratings/`

  try {
    const response = await fetch(ratingsUrl, {
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
    const widgetData = hydrationPayload?.[2]?.data?.widget
    const rawRatings = hydrationPayload?.[2]?.data?.ratings
    const metaData = hydrationPayload?.[2]?.data?.meta

    if (!Array.isArray(rawRatings)) {
      throw new Error('Ratings data not found in hydration payload')
    }

    const currentPrice = stockInfo?.quote?.p
    const consensusPriceTarget = widgetData?.all?.price_target
    
    const summary = {
      totalAnalysts: widgetData?.all?.count ?? null,
      consensus: widgetData?.all?.consensus || null,
      priceTarget: consensusPriceTarget ?? null,
      upside: calculateUpside(currentPrice, consensusPriceTarget),
      totalRatings: metaData?.total ?? rawRatings.length
    }

    const data = rawRatings.map((item, index) => mapRatingItem(item, index, code))

    return res.status(200).json({
      success: true,
      source: ratingsUrl,
      symbol: stockInfo?.ticker || code.toUpperCase(),
      name: stockInfo?.nameFull || stockInfo?.name || null,
      currentPrice: currentPrice ?? null,
      fetchedAt: new Date().toISOString(),
      summary,
      total: data.length,
      data
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch StockAnalysis ratings',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}