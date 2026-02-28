import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProviderBySlug, getAllProviders, getDataMetadata } from "@/lib/api-data";
import { APIDetailClient } from "@/components/detail/APIDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BASE_URL = "https://freeapihub.com";

export async function generateStaticParams() {
  const providers = getAllProviders();
  return providers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  
  if (!provider) {
    return {
      title: "API Not Found — FreeAPIHub",
    };
  }

  const title = `${provider.name} Free API — FreeAPIHub`;
  const description = `Get ${provider.name}'s free API key. ${provider.freeTier.duration} free tier with ${provider.rateLimits.rpm ? `${provider.rateLimits.rpm} RPM` : 'generous'} rate limits. Step-by-step signup guide included.`;
  const keywords = [
    `${provider.name} API`,
    "free API",
    "free API key",
    `${provider.name} free tier`,
    "free API providers",
    "developer API",
    provider.category,
    "API comparison",
  ];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "FreeAPIHub" }],
    creator: "FreeAPIHub",
    publisher: "FreeAPIHub",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `${provider.name} Free API — FreeAPIHub`,
      description: provider.description,
      url: `${BASE_URL}/providers/${provider.slug}`,
      siteName: "FreeAPIHub",
      locale: "en_US",
      type: "article",
      publishedTime: provider.lastUpdated,
      modifiedTime: provider.lastUpdated,
      authors: ["FreeAPIHub"],
      tags: [provider.category, ...provider.badges.map((b) => b.label)],
      images: [
        {
          url: `${BASE_URL}/providers/${provider.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${provider.name} Free API — FreeAPIHub`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${provider.name} Free API — FreeAPIHub`,
      description: provider.description,
      images: [`${BASE_URL}/providers/${provider.slug}/opengraph-image`],
      creator: "@freeapihub",
    },
    alternates: {
      canonical: `${BASE_URL}/providers/${provider.slug}`,
      languages: {
        en: `${BASE_URL}/providers/${provider.slug}`,
      },
    },
  };
}

export default async function APIDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);

  if (!provider) {
    notFound();
  }

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${provider.name} API`,
    description: provider.description,
    url: provider.website,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: `Free tier: ${provider.freeTier.duration}`,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: provider.communityRating
      ? {
          "@type": "AggregateRating",
          ratingValue: provider.communityRating,
          reviewCount: provider.reviewCount,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    author: {
      "@type": "Organization",
      name: provider.name,
      url: provider.website,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <APIDetailClient provider={provider} />
    </>
  );
}
