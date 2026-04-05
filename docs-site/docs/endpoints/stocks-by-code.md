---
title: GET /api/news/{code}
---

import ApiUrl from '@site/src/components/ApiUrl'

# GET `/api/news/{code}`

Mengambil daftar news berdasarkan kode saham dari halaman stock detail StockAnalysis.

## Method

`GET`

## URL

<ApiUrl path="/api/news/aapl" />

Contoh kode lain:

- `nvda`
- `msft`
- `tsla`

## Success Response

```json
{
  "success": true,
  "source": "https://stockanalysis.com/stocks/aapl/",
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "fetchedAt": "2026-04-04T16:30:19.188Z",
  "total": 10,
  "data": [
    {
      "id": "aapl-CNBC-0",
      "title": "Sample title",
      "summary": "Sample summary",
      "url": "https://example.com/news/aapl",
      "imageUrl": "https://example.com/image.jpg",
      "source": "CNBC",
      "type": "Article",
      "tickers": ["$AAPL"],
      "publishedAtLabel": "Apr 4, 2026, 9:04 AM EDT",
      "relativeTime": "3 hours ago"
    }
  ]
}
```

## Not Found Response

```json
{
  "success": false,
  "message": "Stock code 'xxxx' was not found"
}
```

## Catatan

- Hanya mendukung method `GET`.
- Route ini dinamis berdasarkan kode saham.
- Endpoint mencoba mencari array news paling relevan dari hydration payload halaman stock.
