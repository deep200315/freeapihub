// ============================================================
// FreeAPIHub — Dynamic Sitemap
// Generates XML sitemap from /data/apis.json
// ============================================================

import { MetadataRoute } from "next";
import { getAllProviders, getDataMetadata } from "@/lib/api-data";

const BASE_URL = "https://freeapihub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const providers = getAllProviders();
  const metadata = getDataMetadata();

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(metadata.lastUpdated),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // All provider detail pages
  const providerUrls = providers.map((provider) => ({
    url: `${BASE_URL}/providers/${provider.slug}`,
    lastModified: new Date(provider.lastUpdated),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Additional static pages
  const staticPages = [
    { path: "/compare", priority: 0.7 },
  ];

  staticPages.forEach((page) => {
    routes.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: new Date(metadata.lastUpdated),
      changeFrequency: "weekly",
      priority: page.priority,
    });
  });

  return [...routes, ...providerUrls];
}
