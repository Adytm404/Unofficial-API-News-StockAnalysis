---
title: GET /api/trending
---

import ApiUrl from '@site/src/components/ApiUrl'

# GET `/api/trending`

Mengambil data `Trending Today` pada section `Top Stocks` dari halaman berikut:

`https://stockanalysis.com/trending/`

## Method

`GET`

## URL

<ApiUrl path="/api/trending" />

## Success Response

```json
{
  "success": true,
  "source": "https://stockanalysis.com/trending/",
  "section": "Trending Today",
  "category": "Top Stocks",
  "fetchedAt": "2026-04-04T16:30:19.188Z",
  "total": 20,
  "query": {
    "type": "s",
    "index": "stocks",
    "main": "views",
    "count": 20,
    "sortDirection": "desc",
    "filters": ["views-over-1"]
  },
  "data": [
    {
      "rank": 1,
      "symbol": "NVDA",
      "name": "NVIDIA Corporation",
      "views": 834,
      "marketCap": 4309867440000,
      "changePercent": 0.93,
      "volume": 143297361,
      "url": "https://stockanalysis.com/stocks/nvda/"
    }
  ]
}
```

## Error Response

```json
{
  "success": false,
  "message": "Failed to fetch StockAnalysis trending stocks",
  "error": "Trending data not found in hydration payload"
}
```

## Catatan

- Hanya mendukung method `GET`.
- Endpoint ini fokus ke `Trending Today` untuk `Top Stocks` saja.
