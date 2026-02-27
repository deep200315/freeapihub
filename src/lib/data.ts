// ============================================================
// FreeAPIHub — Data Module
// Uses /data/apis.json as single source of truth
// This file provides backward compatibility - actual implementation is in api-data.ts
// ============================================================

// Re-export types
export type { APIProvider, APICategory, APIFilters, PaginatedResponse, RateLimit, FreeTierDetails, SignupStep, TestingStep, Badge } from "./types";

// Import functions from api-data (which reads from JSON)
import {
  getAllProviders,
  getProviderBySlug,
  getProviderById,
  getCategories,
  filterProviders as filterProvidersFn,
  getProviders,
  getDataMetadata,
  getProviderStructuredData,
  getProviderUrls,
  getBadgeCounts,
  getSubcategories,
} from "./api-data";
import type { APIProvider } from "./types";

// Re-export all functions for backward compatibility
export const apiProviders = getAllProviders();

export { 
  getProviderBySlug, 
  getProviderById, 
  getCategories, 
  getProviders, 
  getDataMetadata, 
  getProviderStructuredData, 
  getProviderUrls, 
  getBadgeCounts,
  getSubcategories 
};

/**
 * Filter providers with flexible string inputs
 * Accepts string for category and sortBy (for URL params)
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
  return filterProvidersFn(params);
}

// Aliases for backward compatibility
export function getProviderBySlugData(slug: string) {
  return getProviderBySlug(slug);
}

export function getProviderByIdData(id: string) {
  return getProviderById(id);
}

export function getCategoriesData() {
  return getCategories();
}
