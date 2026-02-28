# FreeAPIHub — Product Requirements Document

## Vision

FreeAPIHub is the definitive platform for developers to discover, compare, and obtain free API keys from top providers. It eliminates the pain of researching scattered documentation, hidden limitations, and confusing pricing pages by aggregating everything into a single, beautiful, searchable interface.

## Target Users

| Segment | Pain Points | Value Proposition |
|---------|-------------|-------------------|
| **Students** | Limited budgets, need free APIs for projects | Curated list of no-credit-card APIs with step-by-step guides |
| **Indie Developers** | Time wasted researching free tiers | Compare rate limits side-by-side, find the best fit fast |
| **Startups** | Need to prototype cheaply before scaling | Discover generous free tiers, understand upgrade paths |
| **Hobbyists** | Overwhelmed by pricing pages | Clear, honest breakdown of what's actually free |

## Competitive Analysis

| Competitor | Weakness | FreeAPIHub Advantage |
|-----------|----------|---------------------|
| RapidAPI | Focuses on paid APIs, cluttered UI | Free-first, clean dark UI, honest limitations |
| Public APIs (GitHub) | Just a list, no details | Rich data: rate limits, guides, hidden limitations |
| API Layer | Aggregator, not free-focused | Specifically curated for free tiers |
| Individual docs | Scattered, inconsistent | Unified format, side-by-side comparison |

## Unique Differentiation

1. **Hidden Limitations Exposed** — We document what providers don't advertise
2. **Step-by-Step Guides** — From signup to first API call
3. **Side-by-Side Comparison** — Compare up to 4 APIs at once
4. **Badge System** — Quick visual indicators (No Credit Card, High RPM, etc.)
5. **Community Ratings** — Real developer feedback
6. **Testing Guides** — Verify your key works with copy-paste commands

## Monetization Strategy

### Phase 1 (Launch)
- **Affiliate Links** — Earn commissions when users sign up for paid tiers
- **Sponsored Placements** — Providers pay for featured positioning

### Phase 2 (Growth)
- **Premium Analytics** — Dashboard showing API uptime, historical rate limits
- **Email Alerts** — Notify users when rate limits change
- **API Access** — Charge for programmatic access to our data

### Phase 3 (Scale)
- **API Marketplace** — Connect providers directly with developers
- **Enterprise Dashboard** — Team API key management

## Growth Strategy

### SEO (Primary)
- **Programmatic Pages** — Auto-generate pages like "Free AI API with no credit card 2026"
- **Long-tail Keywords** — Target specific queries developers search for
- **JSON-LD** — Structured data for rich search results
- **Internal Linking** — Category pages, comparison pages, provider pages

### Community
- **Developer Forums** — Reddit, HackerNews, Dev.to
- **Open Source** — Contribute data, earn badges
- **Newsletter** — Weekly roundup of new free APIs

## Legal & Compliance

- All data sourced from public documentation
- No API keys stored or transmitted
- GDPR compliant (no personal data collected without consent)
- Clear attribution to original providers
- Terms of Service prohibiting data scraping

## Abuse Prevention

- Rate limiting on API endpoints
- CAPTCHA on community submissions
- Admin moderation queue for user-submitted data
- Automated change detection with manual verification
- IP-based throttling for excessive requests

---

# Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                          │
│  Next.js 16 + React 19 + Tailwind CSS 4             │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐    │
│  │ Home Page│ │Detail Page│ │ Compare Page      │    │
│  │ (Search, │ │(Guides,  │ │(Side-by-side     │    │
│  │ Filter,  │ │Rate Limits│ │ comparison)      │    │
│  │ Cards)   │ │Hidden Lim)│ │                  │    │
│  └──────────┘ └──────────┘ └──────────────────┘    │
├─────────────────────────────────────────────────────┤
│                   API LAYER                          │
│  Next.js API Routes                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌────────────┐  │
│  │GET /api/     │ │GET /api/     │ │GET /api/   │  │
│  │providers     │ │providers/:id │ │categories  │  │
│  │?search&sort  │ │              │ │            │  │
│  └──────────────┘ └──────────────┘ └────────────┘  │
├─────────────────────────────────────────────────────┤
│                   DATA LAYER                         │
│  Currently: In-memory JSON (src/lib/data.ts)         │
│  Future: Supabase PostgreSQL + Redis Cache           │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │Providers │  │Rate Limits│  │Step-by-Step      │  │
│  │Table     │  │History   │  │Guides            │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (dark mode, sidebar, header)
│   ├── page.tsx                  # Home page (hero, search, API grid)
│   ├── not-found.tsx             # 404 page
│   ├── globals.css               # Global styles + Tailwind theme
│   ├── compare/
│   │   └── page.tsx              # Compare APIs page
│   ├── providers/
│   │   └── [slug]/
│   │       └── page.tsx          # API detail page (SSG + JSON-LD)
│   └── api/                      # REST API routes
│       ├── providers/
│       │   ├── route.ts          # GET /api/providers (list + filter)
│       │   └── [id]/
│       │       └── route.ts      # GET /api/providers/:id
│       └── categories/
│           └── route.ts          # GET /api/categories
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Top navigation bar
│   │   └── Sidebar.tsx           # Sticky sidebar with categories
│   ├── cards/
│   │   └── APICard.tsx           # API provider card with badges & rate limits
│   ├── compare/
│   │   ├── CompareContext.tsx     # React context for compare feature
│   │   └── CompareClient.tsx     # Compare table UI
│   ├── detail/
│   │   └── APIDetailClient.tsx   # Full API detail view
│   ├── search/
│   │   └── SearchFilters.tsx     # Search bar + filter panel
│   ├── sections/
│   │   ├── HeroSection.tsx       # Landing hero with stats
│   │   └── APIGrid.tsx           # Responsive API card grid
│   └── ui/
│       ├── Badge.tsx             # Colored badge component
│       └── RateLimitBar.tsx      # Visual rate limit progress bar
└── lib/
    ├── types.ts                  # TypeScript type definitions
    ├── data.ts                   # Seed data + filter/search functions
    └── utils.ts                  # Utility functions (cn)
```

## Database Schema (Future — Supabase PostgreSQL)

```sql
-- Providers table
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  website VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100),
  docs_url VARCHAR(500) NOT NULL,
  pricing_url VARCHAR(500) NOT NULL,
  dashboard_url VARCHAR(500),
  credit_card_required BOOLEAN DEFAULT FALSE,
  geo_restrictions TEXT[] DEFAULT '{}',
  abuse_policy TEXT,
  sponsored BOOLEAN DEFAULT FALSE,
  affiliate_url VARCHAR(500),
  community_rating DECIMAL(2,1),
  review_count INTEGER DEFAULT 0,
  last_verified TIMESTAMP WITH TIME ZONE,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Free tier details
CREATE TABLE free_tier_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  free_credits DECIMAL(10,2),
  duration VARCHAR(100) NOT NULL,
  includes TEXT[] NOT NULL DEFAULT '{}',
  excludes TEXT[] NOT NULL DEFAULT '{}',
  auto_upgrade BOOLEAN DEFAULT FALSE,
  UNIQUE(provider_id)
);

-- Rate limits (current)
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  rpm INTEGER,
  rpd INTEGER,
  rpm_month INTEGER,
  tpm INTEGER,
  tpd INTEGER,
  bandwidth VARCHAR(100),
  concurrency INTEGER,
  custom TEXT,
  UNIQUE(provider_id)
);

-- Rate limit history (for tracking changes)
CREATE TABLE rate_limit_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  field_name VARCHAR(50) NOT NULL,
  old_value TEXT,
  new_value TEXT,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Verification requirements
CREATE TABLE verification_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  verification_type VARCHAR(50) NOT NULL
);

-- Signup steps
CREATE TABLE signup_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  url VARCHAR(500),
  warning TEXT
);

-- Testing steps
CREATE TABLE testing_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  command TEXT,
  description TEXT NOT NULL,
  expected_result TEXT
);

-- Badges
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  label VARCHAR(100) NOT NULL,
  color VARCHAR(20) NOT NULL,
  icon VARCHAR(50)
);

-- Hidden limitations
CREATE TABLE hidden_limitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  limitation TEXT NOT NULL
);

-- User reviews
CREATE TABLE user_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  user_id UUID,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alerts (admin notifications)
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  alert_type VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_providers_category ON providers(category);
CREATE INDEX idx_providers_slug ON providers(slug);
CREATE INDEX idx_providers_credit_card ON providers(credit_card_required);
CREATE INDEX idx_rate_limits_provider ON rate_limits(provider_id);
CREATE INDEX idx_rate_limit_history_provider ON rate_limit_history(provider_id);
CREATE INDEX idx_signup_steps_provider ON signup_steps(provider_id, step_order);
CREATE INDEX idx_testing_steps_provider ON testing_steps(provider_id, step_order);
CREATE INDEX idx_user_reviews_provider ON user_reviews(provider_id);
CREATE INDEX idx_alerts_unresolved ON alerts(resolved) WHERE resolved = FALSE;
```

## API Endpoints

### GET /api/providers
List all providers with filtering, sorting, and pagination.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| category | string | Filter by category |
| search | string | Full-text search |
| creditCard | "false" | Filter no credit card required |
| minRpm | number | Minimum RPM |
| sortBy | string | "name", "rpm", "rpd", "rating" |
| sortOrder | string | "asc" or "desc" |
| page | number | Page number (default: 1) |
| pageSize | number | Items per page (default: 20, max: 50) |

**Response:**
```json
{
  "data": [{ ...provider }],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 8,
    "totalPages": 1
  }
}
```

### GET /api/providers/:id
Get a single provider by ID or slug.

### GET /api/categories
List all categories with counts.

## SEO Strategy

1. **Programmatic Pages** — Each provider gets its own page with unique metadata
2. **JSON-LD** — SoftwareApplication schema for rich search results
3. **Dynamic Metadata** — Title, description, OG tags per page
4. **Long-tail Targeting** — Pages optimized for queries like "free AI API no credit card 2026"
5. **Internal Linking** — Category pages link to providers, providers link to compare

## Deployment

- **Frontend**: Vercel (auto-deploy from Git)
- **Database**: Supabase free tier (when needed)
- **CDN**: Cloudflare (optional, for additional protection)
- **CI/CD**: GitHub Actions for typecheck + lint on PR

## Future Roadmap

1. **Chrome Extension** — Quick API lookup from any page
2. **Email Alerts** — Notify when rate limits change
3. **AI Comparison** — Natural language API recommendations
4. **Community Contributions** — User-submitted API data with moderation
5. **Historical Charts** — Track rate limit changes over time
