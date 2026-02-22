// ============================================================
// FreeAPIHub — Data Loading Utilities
// Reads from /data/apis.json as single source of truth
// ============================================================

import apisData from "@/data/apis.json";
import type { APIProvider, APIFilters, PaginatedResponse, APICategory } from "./types";

// Type for the JSON structure
interface APIsDataFile {
  providers: APIProvider[];
  metadata: {
    version: string;
    lastUpdated: string;
    totalProviders: number;
  };
}

// ============================================================
// Data Access Functions
// ============================================================

/**
 * Get all API providers from JSON
 */
export function getAllProviders(): APIProvider[] {
  return (apisData as APIsDataFile).providers;
}

/**
 * Get provider by slug
 */
export function getProviderBySlug(slug: string): APIProvider | undefined {
  return getAllProviders().find((p) => p.slug === slug);
}

/**
 * Get provider by ID
 */
export function getProviderById(id: string): APIProvider | undefined {
  return getAllProviders().find((p) => p.id === id);
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  const providers = getAllProviders();
  return [...new Set(providers.map((p) => p.category))];
}

/**
 * Get metadata from JSON file
 */
export function getDataMetadata() {
  return (apisData as APIsDataFile).metadata;
}

// ============================================================
// Filtering & Sorting Functions
// ============================================================

/**
 * Filter and sort providers based on criteria
 * Accepts string inputs for flexibility (URL params, etc.)
 */
export function filterProviders(params: {
  category?: string;
  search?: string;
  creditCardRequired?: boolean;
  minRpm?: number;
  minRpd?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): APIProvider[] {
  let results = [...getAllProviders()];

  // Filter by category (cast to APICategory if valid)
  if (params.category) {
    results = results.filter((p) => p.category === params.category);
  }

  // Filter by search query
  if (params.search) {
    const q = params.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subcategory?.toLowerCase().includes(q) ?? false)
    );
  }

  // Filter by credit card requirement
  if (params.creditCardRequired !== undefined) {
    if (params.creditCardRequired === false) {
      results = results.filter((p) => !p.creditCardRequired);
    } else {
      results = results.filter((p) => p.creditCardRequired);
    }
  }

  // Filter by minimum RPM
  if (params.minRpm !== undefined) {
    const minRpmValue = params.minRpm;
    results = results.filter((p) => (p.rateLimits.rpm ?? 0) >= minRpmValue);
  }

  // Filter by minimum RPD
  if (params.minRpd !== undefined) {
    const minRpdValue = params.minRpd;
    results = results.filter((p) => (p.rateLimits.rpd ?? 0) >= minRpdValue);
  }

  // Sort results
  const order = params.sortOrder === "desc" ? -1 : 1;
  switch (params.sortBy) {
    case "name":
      results.sort((a, b) => a.name.localeCompare(b.name) * order);
      break;
    case "rpm":
      results.sort(
        (a, b) => ((a.rateLimits.rpm ?? 0) - (b.rateLimits.rpm ?? 0)) * order
      );
      break;
    case "rpd":
      results.sort(
        (a, b) => ((a.rateLimits.rpd ?? 0) - (b.rateLimits.rpd ?? 0)) * order
      );
      break;
    case "rating":
      results.sort(
        (a, b) => ((a.communityRating ?? 0) - (b.communityRating ?? 0)) * order
      );
      break;
    case "lastUpdated":
      results.sort((a, b) => {
        const dateA = new Date(a.lastUpdated).getTime();
        const dateB = new Date(b.lastUpdated).getTime();
        return (dateA - dateB) * order;
      });
      break;
    default:
      // Default: sort by name
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return results;
}

/**
 * Get paginated and filtered results
 * Accepts flexible input types for URL params
 */
export function getProviders(filters: {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
  creditCardRequired?: boolean;
  minRpm?: number;
  minRpd?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
} = {}): PaginatedResponse<APIProvider> {
  const {
    page = 1,
    pageSize = 20,
    category,
    search,
    creditCardRequired,
    minRpm,
    minRpd,
    sortBy,
    sortOrder,
  } = filters;

  // Apply filters
  let results = filterProviders({
    category,
    search,
    creditCardRequired,
    minRpm,
    minRpd,
    sortBy,
    sortOrder,
  });

  // Get total before pagination
  const total = results.length;
  const totalPages = Math.ceil(total / pageSize);

  // Apply pagination
  const startIndex = (page - 1) * pageSize;
  const paginatedResults = results.slice(startIndex, startIndex + pageSize);

  return {
    data: paginatedResults,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
    },
  };
}

// ============================================================
// SEO Functions
// ============================================================

/**
 * Generate structured data for a provider (JSON-LD)
 */
export function getProviderStructuredData(provider: APIProvider) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: provider.name,
    description: provider.description,
    brand: {
      "@type": "Brand",
      name: provider.name,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: provider.lastVerified,
    },
    aggregateRating: provider.communityRating
      ? {
          "@type": "AggregateRating",
          ratingValue: provider.communityRating,
          reviewCount: provider.reviewCount ?? 0,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
  };
}

/**
 * Generate sitemap-compatible provider URLs
 */
export function getProviderUrls() {
  const providers = getAllProviders();
  return providers.map((p) => ({
    loc: `/providers/${p.slug}`,
    lastmod: p.lastUpdated,
    changefreq: "weekly" as const,
    priority: 0.8,
  }));
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Get badge counts for display
 */
export function getBadgeCounts() {
  const providers = getAllProviders();
  const badgeCounts: Record<string, number> = {};

  providers.forEach((p) => {
    p.badges.forEach((badge) => {
      badgeCounts[badge.label] = (badgeCounts[badge.label] ?? 0) + 1;
    });
  });

  return badgeCounts;
}

/**
 * Get all subcategories
 */
export function getSubcategories(): string[] {
  const providers = getAllProviders();
  const subcategories = providers
    .map((p) => p.subcategory)
    .filter((s): s is string => !!s);
  return [...new Set(subcategories)];
}
