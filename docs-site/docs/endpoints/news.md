---
title: GET /api/news
---

import ApiUrl from '@site/src/components/ApiUrl'

# GET `/api/news`

Mengambil daftar berita umum dari halaman berikut:

`https://stockanalysis.com/news/`

## Method

`GET`

## URL

<ApiUrl path="/api/news" />

## Success Response

```json
{
  "success": true,
  "source": "https://stockanalysis.com/news/",
  "fetchedAt": "2026-04-04T16:30:19.188Z",
  "total": 100,
  "data": [
    {
      "id": "Schwab Network-0",
      "title": "Brad Long's Case for \"Temporary\" Crude Oil Rally, Markets Mispricing Risk",
      "summary": "Brad Long says the latest oil spike tied to Iran is likely a temporary shock...",
      "url": "https://stockanalysis.com/news/o4A37OrGYZI",
      "imageUrl": "https://cdn.snapi.dev/images/v1/l/0/7/nhyt43ed-2718121-3617801.jpg",
      "source": "Schwab Network",
      "type": "Video",
      "tickers": [],
      "publishedAtLabel": "Apr 4, 2026, 9:31 AM EDT",
      "relativeTime": "2 hours ago"
    }
  ]
}
```

## Error Response

```json
{
  "success": false,
  "message": "Failed to fetch StockAnalysis news",
  "error": "News data not found in hydration payload"
}
```

## Catatan

- Hanya mendukung method `GET`.
- Jika memakai method selain `GET`, API mengembalikan status `405`.
