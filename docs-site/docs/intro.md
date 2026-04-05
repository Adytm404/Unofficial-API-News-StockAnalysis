---
slug: /
title: Overview
---

# StockAnalysis Unofficial API

API ini menyediakan endpoint `GET` untuk mengambil data berita dari website StockAnalysis.

## Endpoint Tersedia

### `GET /api/news`

Mengambil daftar berita umum dari:

`https://stockanalysis.com/news/`

### `GET /api/news/ipos`

Mengambil daftar berita IPO dari:

`https://stockanalysis.com/ipos/news/`

### `GET /api/trending`

Mengambil data `Trending Today` pada bagian `Top Stocks` dari:

`https://stockanalysis.com/trending/`

### `GET /api/gainers`

Mengambil data top stock gainers untuk hari ini dari:

`https://stockanalysis.com/markets/gainers/`

### `GET /api/losers`

Mengambil data top stock losers untuk hari ini dari:

`https://stockanalysis.com/markets/losers/`

### `GET /api/news/{code}`

Mengambil news berdasarkan kode saham dari halaman stock detail, misalnya:

`https://stockanalysis.com/stocks/aapl/`

## Format Response Umum

```json
{
  "success": true,
  "source": "https://stockanalysis.com/news/",
  "fetchedAt": "2026-04-04T16:30:19.188Z",
  "total": 100,
  "data": [
    {
      "id": "CNBC-1",
      "title": "Judul berita",
      "summary": "Ringkasan berita",
      "url": "https://example.com/news",
      "imageUrl": "https://example.com/image.jpg",
      "source": "CNBC",
      "type": "Article",
      "tickers": ["$NAVN"],
      "publishedAtLabel": "Apr 3, 2026, 6:29 PM EDT",
      "relativeTime": "18 hours ago"
    }
  ]
}
```

## Field Response

| Field | Tipe | Keterangan |
| --- | --- | --- |
| `success` | `boolean` | Status request |
| `source` | `string` | URL sumber halaman |
| `fetchedAt` | `string` | Waktu data diambil |
| `total` | `number` | Jumlah item berita |
| `data` | `array` | Daftar berita |
| `data[].id` | `string` | ID sederhana dari source dan index |
| `data[].title` | `string \| null` | Judul berita |
| `data[].summary` | `string \| null` | Ringkasan berita |
| `data[].url` | `string \| null` | Link berita |
| `data[].imageUrl` | `string \| null` | Thumbnail berita |
| `data[].source` | `string \| null` | Nama media |
| `data[].type` | `string \| null` | Tipe konten |
| `data[].tickers` | `string[]` | Daftar ticker bila tersedia |
| `data[].publishedAtLabel` | `string \| null` | Label tanggal dari source |
| `data[].relativeTime` | `string \| null` | Waktu relatif |

## Catatan

- API ini unofficial.
- Data diambil dari hydration payload halaman StockAnalysis.
- Struktur dapat berubah jika website sumber mengubah implementasinya.
