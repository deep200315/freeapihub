# FreeAPIHub

FreeAPIHub helps developers discover and compare free API tiers from popular providers.

## Features

- Search and filter free API providers by category and keywords
- Quick filter for no-credit-card providers
- Sort providers by RPM, RPD, rating, and name
- Compare up to 4 providers side-by-side
- Detailed provider pages with:
  - free tier includes/excludes
  - rate limits
  - hidden limitations
  - signup steps
  - API key testing steps
- Public API endpoints for providers and categories
- Dynamic sitemap and SEO metadata per provider page

## Requirements

- Node.js 20+
- Bun 1.x

## Setup

```bash
bun install
```

## Run (Development)

```bash
bun run dev
```

App URL: `http://localhost:3000`

## Run (Production)

```bash
bun run build
bun run start
```

## API Endpoints

- `GET /api/providers` - list providers with filters/sorting/pagination
- `HEAD /api/providers` - total providers count in headers
- `GET /api/providers/[id]` - get provider by id or slug
- `GET /api/categories` - list categories with counts

## Data Source

- Provider dataset: `data/apis.json`
