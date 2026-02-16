import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { apiProviders, getProviderBySlug } from "@/lib/data";
import { APIDetailClient } from "@/components/detail/APIDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return apiProviders.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  if (!provider) return { title: "Not Found" };

  return {
    title: `${provider.name} Free API — Rate Limits, Signup Guide & Hidden Limitations`,
    description: `Get ${provider.name}'s free API key. ${provider.freeTier.duration} free tier with ${provider.rateLimits.rpm ?? provider.rateLimits.rpd ?? "generous"} rate limits. Step-by-step guide included.`,
    openGraph: {
      title: `${provider.name} Free API — FreeAPIHub`,
      description: provider.description,
      type: "article",
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
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: `Free tier: ${provider.freeTier.duration}`,
    },
    aggregateRating: provider.communityRating
      ? {
          "@type": "AggregateRating",
          ratingValue: provider.communityRating,
          reviewCount: provider.reviewCount,
        }
      : undefined,
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
