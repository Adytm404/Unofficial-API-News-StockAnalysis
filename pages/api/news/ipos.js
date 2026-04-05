import { fetchStockAnalysisNews } from './index'

const IPO_NEWS_URL = 'https://stockanalysis.com/ipos/news/'

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
      url: IPO_NEWS_URL,
      path: [2, 'data', 'news']
    })

    return res.status(200).json({
      success: true,
      source: IPO_NEWS_URL,
      fetchedAt: new Date().toISOString(),
      total: data.length,
      data
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch StockAnalysis IPO news',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
