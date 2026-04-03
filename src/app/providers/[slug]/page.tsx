import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProviderBySlug, getAllProviders } from "@/lib/api-data";
import { APIDetailClient } from "@/components/detail/APIDetailClient";
import { SITE_NAME, toAbsoluteUrl } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const providers = getAllProviders();
  return providers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);

  if (!provider) {
    return {
      title: `API Not Found — ${SITE_NAME}`,
    };
  }

  const title = `${provider.name} Free API — ${SITE_NAME}`;
  const description = `Get ${provider.name}'s free API key. ${provider.freeTier.duration} free tier with ${provider.rateLimits.rpm ? `${provider.rateLimits.rpm} RPM` : "generous"} rate limits. Step-by-step signup guide included.`;
  const providerUrl = toAbsoluteUrl(`/providers/${provider.slug}`);
  const providerImageUrl = toAbsoluteUrl(
    `/providers/${provider.slug}/opengraph-image`
  );
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
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
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
      title,
      description: provider.description,
      url: providerUrl,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "article",
      publishedTime: provider.lastUpdated,
      modifiedTime: provider.lastUpdated,
      authors: [SITE_NAME],
      tags: [provider.category, ...provider.badges.map((b) => b.label)],
      images: [
        {
          url: providerImageUrl,
          width: 1200,
          height: 630,
          alt: `${provider.name} Free API — ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: provider.description,
      images: [providerImageUrl],
      creator: "@freeapihub",
    },
    alternates: {
      canonical: providerUrl,
      languages: {
        en: providerUrl,
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
