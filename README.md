# StockAnalysis Unofficial API

An unofficial API built with Next.js for scraping selected public data from [StockAnalysis](https://stockanalysis.com/).

This project exposes JSON endpoints for general news, IPO news, ticker-specific news, trending stocks, top gainers, and top losers. It also includes a Docusaurus-powered documentation homepage and a simple uptime monitoring page.

## Features

- `GET /api/news` for general stock market news
- `GET /api/news/ipos` for IPO-related news
- `GET /api/news/{code}` for ticker-specific stock news
- `GET /api/trending` for `Trending Today` top stocks
- `GET /api/gainers` for top stock gainers today
- `GET /api/losers` for top stock losers today
- `GET /api/uptime` for JSON uptime monitoring
- `/` serves API documentation using Docusaurus
- `/uptime` shows live route health monitoring

## Tech Stack

- Next.js
- Docusaurus
- Express custom server

## Available Routes

### API Routes

- `/api/news`
- `/api/news/ipos`
- `/api/news/{code}`
- `/api/trending`
- `/api/gainers`
- `/api/losers`
- `/api/uptime`

### Web Routes

- `/` documentation homepage
- `/uptime` route monitoring page

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

This starts:

- Next.js API routes
- the custom Express server
- the Docusaurus documentation build served on `/`

## Production Build

```bash
npm run build
npm run start
```

## How It Works

The API does not use an official StockAnalysis API.

Instead, it fetches public HTML pages and extracts the embedded hydration payload used by the website itself. The payload is then transformed into clean JSON responses.

Because of this, the API may break if StockAnalysis changes its page structure or hydration format.

## Example Endpoints

### General News

```bash
GET /api/news
```

### IPO News

```bash
GET /api/news/ipos
```

### Ticker-Specific News

```bash
GET /api/news/aapl
```

### Trending Stocks

```bash
GET /api/trending
```

### Top Gainers

```bash
GET /api/gainers
```

### Top Losers

```bash
GET /api/losers
```

### Uptime JSON

```bash
GET /api/uptime
```

## Uptime Monitoring

Open the following page in your browser:

```bash
/uptime
```

It checks all registered API routes and shows:

- current status
- response time
- error details if a route is failing

## Project Structure

```text
.
├── docs-site/          # Docusaurus documentation
├── pages/api/          # Next.js API routes
├── server.js           # Custom Express server
├── package.json
└── README.md
```

## Disclaimer

This is an unofficial project and is not affiliated with StockAnalysis.

Use it responsibly and expect upstream structure changes over time.
