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

### `GET /api/ratings/{code}`

Mengambil data analyst ratings dan ratings history berdasarkan kode saham, misalnya:

`https://stockanalysis.com/stocks/nvda/ratings/`

## Format Response Umum

### Untuk Endpoint News:
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

### Untuk Endpoint Ratings:
```json
{
  "success": true,
  "source": "https://stockanalysis.com/stocks/nvda/ratings/",
  "symbol": "NVDA",
  "name": "NVIDIA Corporation",
  "currentPrice": 189.31,
  "fetchedAt": "2026-04-14T03:32:17.955Z",
  "summary": {
    "totalAnalysts": 39,
    "consensus": "Strong Buy",
    "priceTarget": 264.54,
    "upside": 39.74,
    "totalRatings": 985
  },
  "total": 16,
  "data": [
    {
      "id": "nvda-benchmark-cody-acree-2026-03-31",
      "analyst": "Cody Acree",
      "firm": "Benchmark",
      "rating": "Strong Buy",
      "previousRating": "Strong Buy",
      "action": "Reiterates",
      "priceTarget": 250,
      "previousPriceTarget": 250,
      "date": "2026-03-31",
      "time": "01:55:57",
      "analystScore": {
        "score": 83.85,
        "stars": 4.95,
        "totalRatings": 148,
        "avgReturn": 46.81,
        "successRate": 71.62
      }
    }
  ]
}
```

## Field Response

### Untuk Endpoint News:
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

### Untuk Endpoint Ratings:
| Field | Tipe | Keterangan |
| --- | --- | --- |
| `success` | `boolean` | Status request |
| `source` | `string` | URL sumber halaman |
| `symbol` | `string` | Kode saham (uppercase) |
| `name` | `string` | Nama perusahaan |
| `currentPrice` | `number` | Harga saham saat ini |
| `fetchedAt` | `string` | Waktu data diambil |
| `summary` | `object` | Ringkasan ratings |
| `summary.totalAnalysts` | `number` | Jumlah analis |
| `summary.consensus` | `string` | Konsensus rating (Strong Buy/Buy/Hold/Sell) |
| `summary.priceTarget` | `number` | Target harga rata-rata |
| `summary.upside` | `number` | Potensi kenaikan (%) |
| `summary.totalRatings` | `number` | Total rating history |
| `total` | `number` | Jumlah rating terbaru |
| `data` | `array` | Daftar rating terbaru |
| `data[].id` | `string` | ID unik rating |
| `data[].analyst` | `string` | Nama analis |
| `data[].firm` | `string` | Nama firma analis |
| `data[].rating` | `string` | Rating saat ini |
| `data[].previousRating` | `string` | Rating sebelumnya |
| `data[].action` | `string` | Aksi (Reiterates/Maintains) |
| `data[].priceTarget` | `number` | Target harga |
| `data[].previousPriceTarget` | `number` | Target harga sebelumnya |
| `data[].date` | `string` | Tanggal rating (YYYY-MM-DD) |
| `data[].time` | `string` | Waktu rating (HH:MM:SS) |
| `data[].analystScore` | `object` | Skor performa analis |
| `data[].analystScore.score` | `number` | Total score analis |
| `data[].analystScore.stars` | `number` | Rating bintang (1-5) |
| `data[].analystScore.totalRatings` | `number` | Total rating oleh analis |
| `data[].analystScore.avgReturn` | `number` | Rata-rata return (%) |
| `data[].analystScore.successRate` | `number` | Success rate (%) |

## Catatan

- API ini unofficial.
- Data diambil dari hydration payload halaman StockAnalysis.
- Struktur dapat berubah jika website sumber mengubah implementasinya.
