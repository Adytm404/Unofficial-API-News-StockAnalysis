---
title: GET /api/losers
---

import ApiUrl from '@site/src/components/ApiUrl'

# GET `/api/losers`

Mengambil data `today` dari halaman berikut:

`https://stockanalysis.com/markets/losers/`

## Method

`GET`

## URL

<ApiUrl path="/api/losers" />

## Success Response

```json
{
  "success": true,
  "source": "https://stockanalysis.com/markets/losers/",
  "section": "Top Stock Losers",
  "timeframe": "today",
  "fetchedAt": "2026-04-04T16:30:19.188Z",
  "total": 20,
  "query": {
    "type": "s",
    "index": "stocks",
    "main": "change",
    "count": 20,
    "sortDirection": "asc",
    "filters": ["change-under-0", "priceDate-isLastTradingDay"]
  },
  "data": [
    {
      "rank": 1,
      "symbol": "LPCN",
      "name": "Lipocine Inc.",
      "changePercent": -77.84,
      "price": 2.05,
      "volume": 7397255,
      "marketCap": 14964358,
      "priceDate": "2026-04-02",
      "url": "https://stockanalysis.com/stocks/lpcn/"
    }
  ]
}
```

## Catatan

- Data difilter ke `priceDate-isLastTradingDay` dari source.
- Hanya mendukung method `GET`.
