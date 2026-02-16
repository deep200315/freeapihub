import { NextRequest, NextResponse } from "next/server";
import { getProviderById, getProviderBySlug } from "@/lib/data";

/**
 * GET /api/providers/:id
 * Get a single provider by ID or slug
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Try by ID first, then by slug
  const provider = getProviderById(id) ?? getProviderBySlug(id);

  if (!provider) {
    return NextResponse.json(
      { error: "Provider not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { data: provider },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
