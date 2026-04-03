// ============================================================
// FreeAPIHub — Dynamic Sitemap
// Generates XML sitemap from /data/apis.json
// ============================================================

import { MetadataRoute } from "next";
import { getAllProviders, getDataMetadata } from "@/lib/api-data";
import { SITE_URL, toAbsoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const providers = getAllProviders();
  const metadata = getDataMetadata();
  const defaultLastModified = new Date(metadata.lastUpdated);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: defaultLastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: toAbsoluteUrl("/compare"),
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const providerRoutes: MetadataRoute.Sitemap = providers
    .slice()
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((provider) => ({
      url: toAbsoluteUrl(`/providers/${provider.slug}`),
      lastModified: new Date(provider.lastUpdated),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...providerRoutes];
}
