---
title: GET /api/news/ipos
---

import ApiUrl from '@site/src/components/ApiUrl'

# GET `/api/news/ipos`

Mengambil daftar berita IPO dari halaman berikut:

`https://stockanalysis.com/ipos/news/`

## Method

`GET`

## URL

<ApiUrl path="/api/news/ipos" />

## Success Response

```json
{
  "success": true,
  "source": "https://stockanalysis.com/ipos/news/",
  "fetchedAt": "2026-04-04T16:30:19.188Z",
  "total": 50,
  "data": [
    {
      "id": "New York Post-0",
      "title": "Elon Musk asks SpaceX IPO banks to buy Grok AI subscriptions: report",
      "summary": "SpaceX boosted its target initial public offering valuation above $2 trillion...",
      "url": "https://nypost.com/2026/04/03/business/elon-musk-asks-spacex-ipo-banks-to-buy-grok-ai-subscriptions-report/",
      "imageUrl": "https://cdn.snapi.dev/images/v1/6/3/b/spc11-3506198-3617588.jpg",
      "source": "New York Post",
      "type": "Article",
      "tickers": [],
      "publishedAtLabel": "Apr 3, 2026, 6:47 PM EDT",
      "relativeTime": "17 hours ago"
    }
  ]
}
```

## Error Response

```json
{
  "success": false,
  "message": "Failed to fetch StockAnalysis IPO news",
  "error": "News data not found in hydration payload"
}
```

## Catatan

- Hanya mendukung method `GET`.
- Ticker bisa kosong jika source tidak menyediakannya.
