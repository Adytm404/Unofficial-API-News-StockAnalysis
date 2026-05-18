---
title: GET /api/news/etf/{code}
---

import ApiUrl from '@site/src/components/ApiUrl'

# GET `/api/news/etf/{code}`

Mengambil daftar news berdasarkan kode ETF dari halaman detail StockAnalysis.

## Method

`GET`

## URL Sumber

`https://stockanalysis.com/etf/{code}/`

## URL

<ApiUrl path="/api/news/etf/voo" />

Contoh kode lain:

- `spy`
- `qqq`
- `vti`

## Success Response

```json
{
  "success": true,
  "source": "https://stockanalysis.com/etf/voo/",
  "symbol": "VOO",
  "name": "Vanguard S&P 500 ETF",
  "fetchedAt": "2026-05-18T05:30:00.000Z",
  "total": 50,
  "data": [
    {
      "id": "voo-Market Watch-0",
      "title": "Sample ETF news title",
      "summary": "Sample summary",
      "url": "https://example.com/news",
      "imageUrl": "https://example.com/image.jpg",
      "source": "Market Watch",
      "type": "Article",
      "tickers": ["#IVV", "#SPY"],
      "publishedAtLabel": "May 17, 2026, 10:00 AM EDT",
      "relativeTime": "19 hours ago"
    }
  ]
}
```

## Not Found Response

```json
{
  "success": false,
  "message": "ETF code 'xxxx' was not found"
}
```

## Catatan

- Hanya mendukung method `GET`.
- Route ini dinamis berdasarkan kode ETF.
- Format response disamakan dengan `GET /api/news/{code}`.
- Data diambil dari hydration payload halaman ETF StockAnalysis.
