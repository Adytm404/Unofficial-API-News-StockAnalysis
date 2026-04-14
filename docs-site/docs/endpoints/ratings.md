---
slug: /endpoints/ratings
title: GET /api/ratings/{code}
---

import ApiUrl from '@site/src/components/ApiUrl'

# GET `/api/ratings/{code}`

Mengambil data analyst ratings dan ratings history berdasarkan kode saham.

## URL Sumber

`https://stockanalysis.com/stocks/{code}/ratings/`

## Parameter

| Parameter | Tipe | Required | Keterangan | Contoh |
| --- | --- | --- | --- | --- |
| `code` | `string` | Ya | Kode saham (case-insensitive) | `nvda`, `aapl`, `tsla` |

## Contoh Request

```bash
# Get ratings for NVIDIA
GET /api/ratings/nvda

# Get ratings for Apple
GET /api/ratings/aapl

# Get ratings for Tesla
GET /api/ratings/tsla
```

## Response Format

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

## Contoh Rating Values

### Rating Types:
- `Strong Buy`
- `Buy` 
- `Hold`
- `Sell`
- `Strong Sell`

### Action Types:
- `Reiterates` - Rating diulang tanpa perubahan
- `Maintains` - Rating dipertahankan (mungkin dengan perubahan price target)
- `Upgrades` - Rating dinaikkan
- `Downgrades` - Rating diturunkan
- `Initiates` - Rating baru

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Stock code is required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Stock code 'invalid' was not found"
}
```

### 405 Method Not Allowed
```json
{
  "success": false,
  "message": "Method not allowed"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Failed to fetch StockAnalysis ratings",
  "error": "Error message details"
}
```

## Catatan

- Endpoint ini mengembalikan **16 rating terbaru** dari total ratings history
- Data diambil dari hydration payload halaman StockAnalysis
- `upside` dihitung sebagai: `((priceTarget - currentPrice) / currentPrice) * 100`
- `totalRatings` dalam summary adalah total semua rating history, bukan hanya yang ditampilkan
- Analyst score hanya tersedia untuk analis yang memiliki data performa di StockAnalysis