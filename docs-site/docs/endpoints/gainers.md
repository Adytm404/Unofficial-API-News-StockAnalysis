---
title: GET /api/gainers
---

import ApiUrl from '@site/src/components/ApiUrl'

# GET `/api/gainers`

Mengambil data `today` dari halaman berikut:

`https://stockanalysis.com/markets/gainers/`

## Method

`GET`

## URL

<ApiUrl path="/api/gainers" />

## Success Response

```json
{
  "success": true,
  "source": "https://stockanalysis.com/markets/gainers/",
  "section": "Top Stock Gainers",
  "timeframe": "today",
  "fetchedAt": "2026-04-04T16:30:19.188Z",
  "total": 20,
  "query": {
    "type": "s",
    "index": "stocks",
    "main": "change",
    "count": 20,
    "sortDirection": "desc",
    "filters": ["change-over-0", "priceDate-isLastTradingDay"]
  },
  "data": [
    {
      "rank": 1,
      "symbol": "GV",
      "name": "Visionary Holdings Inc.",
      "changePercent": 116.78,
      "price": 0.4444,
      "volume": 579376343,
      "marketCap": 2491905,
      "priceDate": "2026-04-02",
      "url": "https://stockanalysis.com/stocks/gv/"
    }
  ]
}
```

## Catatan

- Data difilter ke `priceDate-isLastTradingDay` dari source.
- Hanya mendukung method `GET`.
