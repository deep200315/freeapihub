import { describe, expect, it } from "vitest";
import {
  filterProviders,
  getAllProviders,
  getBadgeCounts,
  getCategories,
  getDataMetadata,
  getProviderById,
  getProviderBySlug,
  getProviderStructuredData,
  getProviderUrls,
  getProviders,
  getSubcategories,
} from "@/lib/api-data";

describe("api-data unit tests", () => {
  it("returns providers from JSON source", () => {
    const providers = getAllProviders();
    expect(providers.length).toBeGreaterThan(0);
  });

  it("metadata totalProviders matches actual provider count", () => {
    const metadata = getDataMetadata();
    const providers = getAllProviders();
    expect(metadata.totalProviders).toBe(providers.length);
  });

  it("resolves provider by slug and id", () => {
    const provider = getAllProviders()[0];

    const bySlug = getProviderBySlug(provider.slug);
    const byId = getProviderById(provider.id);

    expect(bySlug?.id).toBe(provider.id);
    expect(byId?.slug).toBe(provider.slug);
    expect(getProviderBySlug("does-not-exist")).toBeUndefined();
    expect(getProviderById("does-not-exist")).toBeUndefined();
  });

  it("returns unique categories and subcategories", () => {
    const categories = getCategories();
    const subcategories = getSubcategories();

    expect(categories.length).toBeGreaterThan(0);
    expect(new Set(categories).size).toBe(categories.length);
    expect(subcategories.length).toBeGreaterThan(0);
    expect(new Set(subcategories).size).toBe(subcategories.length);
  });

  it("filters providers by category and search", () => {
    const category = getCategories()[0];
    const byCategory = filterProviders({ category });

    expect(byCategory.length).toBeGreaterThan(0);
    expect(byCategory.every((provider) => provider.category === category)).toBe(
      true,
    );

    const searchSource = getAllProviders()[0].name;
    const searchTerm = searchSource.slice(0, 3);
    const bySearch = filterProviders({ search: searchTerm });
    expect(bySearch.length).toBeGreaterThan(0);
  });

  it("filters by credit card requirements and minimum rate limits", () => {
    const noCard = filterProviders({ creditCardRequired: false });
    expect(noCard.length).toBeGreaterThan(0);
    expect(noCard.every((provider) => !provider.creditCardRequired)).toBe(true);

    const minRpm = 5;
    const byRpm = filterProviders({ minRpm });
    expect(
      byRpm.every((provider) => (provider.rateLimits.rpm ?? 0) >= minRpm),
    ).toBe(true);

    const minRpd = 100;
    const byRpd = filterProviders({ minRpd });
    expect(
      byRpd.every((provider) => (provider.rateLimits.rpd ?? 0) >= minRpd),
    ).toBe(true);
  });

  it("sorts providers across supported sort keys", () => {
    const byNameAsc = filterProviders({ sortBy: "name", sortOrder: "asc" });
    expect(
      byNameAsc[0].name.localeCompare(byNameAsc[1].name),
    ).toBeLessThanOrEqual(0);

    const byNameDesc = filterProviders({ sortBy: "name", sortOrder: "desc" });
    expect(
      byNameDesc[0].name.localeCompare(byNameDesc[1].name),
    ).toBeGreaterThanOrEqual(0);

    const byRpmDesc = filterProviders({ sortBy: "rpm", sortOrder: "desc" });
    expect(byRpmDesc[0].rateLimits.rpm ?? 0).toBeGreaterThanOrEqual(
      byRpmDesc[1].rateLimits.rpm ?? 0,
    );

    const byRpdDesc = filterProviders({ sortBy: "rpd", sortOrder: "desc" });
    expect(byRpdDesc[0].rateLimits.rpd ?? 0).toBeGreaterThanOrEqual(
      byRpdDesc[1].rateLimits.rpd ?? 0,
    );

    const byRatingDesc = filterProviders({
      sortBy: "rating",
      sortOrder: "desc",
    });
    expect(byRatingDesc[0].communityRating ?? 0).toBeGreaterThanOrEqual(
      byRatingDesc[1].communityRating ?? 0,
    );

    const byLastUpdatedDesc = filterProviders({
      sortBy: "lastUpdated",
      sortOrder: "desc",
    });
    expect(
      new Date(byLastUpdatedDesc[0].lastUpdated).getTime(),
    ).toBeGreaterThanOrEqual(
      new Date(byLastUpdatedDesc[1].lastUpdated).getTime(),
    );
  });

  it("supports pagination with metadata", () => {
    const pageSize = 5;
    const result = getProviders({ page: 1, pageSize });

    expect(result.data.length).toBeLessThanOrEqual(pageSize);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.pageSize).toBe(pageSize);
    expect(result.pagination.total).toBe(getAllProviders().length);
    expect(result.pagination.totalPages).toBeGreaterThan(0);
  });

  it("generates structured data and provider URLs", () => {
    const provider = getAllProviders()[0];
    const structuredData = getProviderStructuredData(provider);
    const urls = getProviderUrls();

    expect(structuredData["@context"]).toBe("https://schema.org");
    expect(structuredData.name).toBe(provider.name);
    expect(urls.length).toBe(getAllProviders().length);
    expect(urls[0].loc.startsWith("/providers/")).toBe(true);
  });

  it("returns badge counts", () => {
    const badgeCounts = getBadgeCounts();
    const keys = Object.keys(badgeCounts);

    expect(keys.length).toBeGreaterThan(0);
    expect(keys.every((key) => badgeCounts[key] > 0)).toBe(true);
  });
});
