// ============================================================
// FreeAPIHub — Dynamic OpenGraph Image
// Generates OG images for each API provider page
// ============================================================

import { ImageResponse } from "next/og";
import { getProviderBySlug, getAllProviders } from "@/lib/api-data";

export const runtime = "edge";

export const alt = "FreeAPIHub API Provider";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all providers at build time
export async function generateStaticParams() {
  const providers = getAllProviders();
  return providers.map((p) => ({ slug: p.slug }));
}

export default async function OpenGraphImage({ params }: PageProps) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);

  if (!provider) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "linear-gradient(to right, #6366f1, #8b5cf6)",
            color: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 20 }}>⚡</div>
          <div>FreeAPIHub</div>
          <div style={{ fontSize: 24, opacity: 0.8, marginTop: 10 }}>
            API Not Found
          </div>
        </div>
      ),
      { ...size }
    );
  }

  // Determine badge colors
  const badgeColors: Record<string, string> = {
    green: "#22c55e",
    blue: "#3b82f6",
    purple: "#a855f7",
    orange: "#f97316",
    red: "#ef4444",
    yellow: "#eab308",
  };

  const primaryBadge = provider.badges[0];
  const badgeColor = primaryBadge ? badgeColors[primaryBadge.color] || "#6366f1" : "#6366f1";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 60,
          justifyContent: "space-between",
        }}
      >
        {/* Header with logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 12,
                background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              ⚡
            </div>
            <span
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 24,
                fontWeight: 500,
              }}
            >
              FreeAPIHub
            </span>
          </div>
          {primaryBadge && (
            <div
              style={{
                background: badgeColor,
                color: "white",
                padding: "8px 20px",
                borderRadius: 20,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {primaryBadge.label}
            </div>
          )}
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* API Name */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.1,
            }}
          >
            {provider.name}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.4,
              maxWidth: 800,
            }}
          >
            {provider.description.length > 120
              ? provider.description.slice(0, 120) + "..."
              : provider.description}
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 30,
              marginTop: 10,
            }}
          >
            {/* Category */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>
                Category
              </span>
              <span style={{ color: "white", fontSize: 22, fontWeight: 600 }}>
                {provider.category}
              </span>
            </div>

            {/* Rate Limits */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>
                Rate Limit
              </span>
              <span style={{ color: "white", fontSize: 22, fontWeight: 600 }}>
                {provider.rateLimits.rpm
                  ? `${provider.rateLimits.rpm} RPM`
                  : provider.rateLimits.custom || "N/A"}
              </span>
            </div>

            {/* Free Tier Duration */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>
                Free Tier
              </span>
              <span style={{ color: "white", fontSize: 22, fontWeight: 600 }}>
                {provider.freeTier.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 20,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>
            {provider.creditCardRequired
              ? "Credit Card Required"
              : "No Credit Card Required"}
          </span>
          <span style={{ color: "#8b5cf6", fontSize: 18, fontWeight: 600 }}>
            freeapihub.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
