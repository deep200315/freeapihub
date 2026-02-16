import { NextResponse } from "next/server";
import { getCategories, apiProviders } from "@/lib/data";

/**
 * GET /api/categories
 * Returns all categories with counts
 */
export async function GET() {
  const categories = getCategories();

  const data = categories.map((category) => ({
    name: category,
    count: apiProviders.filter((p) => p.category === category).length,
  }));

  return NextResponse.json(
    { data },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    }
  );
}
