// ============================================================
// FreeAPIHub — Core Type Definitions
// ============================================================

export type APICategory =
  | "AI & Machine Learning"
  | "Cloud & Infrastructure"
  | "DevTools"
  | "Communication"
  | "Data & Analytics"
  | "Finance"
  | "Maps & Geolocation"
  | "Media & Entertainment"
  | "Authentication"
  | "Storage"
  | "Search"
  | "Other";

export type VerificationType =
  | "email"
  | "phone"
  | "credit_card"
  | "government_id"
  | "none";

export interface RateLimit {
  /** Requests per minute */
  rpm?: number;
  /** Requests per day */
  rpd?: number;
  /** Requests per month */
  rpm_month?: number;
  /** Tokens per minute (for AI APIs) */
  tpm?: number;
  /** Tokens per day */
  tpd?: number;
  /** Bandwidth limit (e.g., "1GB/month") */
  bandwidth?: string;
  /** Max concurrent connections */
  concurrency?: number;
  /** Custom limits description */
  custom?: string;
}

export interface FreeTierDetails {
  /** Monthly free credits in USD */
  freeCredits?: number;
  /** Free tier duration (e.g., "12 months", "forever") */
  duration: string;
  /** What's included in free tier */
  includes: string[];
  /** What's NOT included */
  excludes: string[];
  /** Auto-upgrade if limit exceeded? */
  autoUpgrade: boolean;
}

export interface SignupStep {
  order: number;
  title: string;
  description: string;
  url?: string;
  warning?: string;
}

export interface TestingStep {
  order: number;
  title: string;
  command?: string;
  description: string;
  expectedResult?: string;
}

export interface Badge {
  label: string;
  color: "green" | "blue" | "purple" | "orange" | "red" | "yellow";
  icon?: string;
}

export interface APIProvider {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  website: string;
  description: string;
  category: APICategory;
  subcategory?: string;

  // Free tier info
  freeTier: FreeTierDetails;
  rateLimits: RateLimit;

  // Requirements
  creditCardRequired: boolean;
  verificationRequired: VerificationType[];
  geoRestrictions: string[];

  // Guides
  signupSteps: SignupStep[];
  testingSteps: TestingStep[];

  // Links
  docsUrl: string;
  pricingUrl: string;
  dashboardUrl?: string;

  // Metadata
  badges: Badge[];
  hiddenLimitations: string[];
  abusePolicy?: string;
  lastVerified: string;
  lastUpdated: string;

  // Ratings
  communityRating?: number;
  reviewCount?: number;

  // Sponsorship
  sponsored?: boolean;
  affiliateUrl?: string;
}

// ============================================================
// API Response Types
// ============================================================

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface APIFilters {
  category?: APICategory;
  search?: string;
  creditCardRequired?: boolean;
  minRpm?: number;
  minRpd?: number;
  sortBy?: "name" | "rpm" | "rpd" | "rating" | "lastUpdated";
  sortOrder?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

// ============================================================
// Compare Feature
// ============================================================

export interface CompareItem {
  id: string;
  provider: APIProvider;
}
