import { NextResponse } from "next/server";
import { getCategories, apiProviders } from "@/lib/data";
import { withApiLogging } from "@/lib/observability/with-api-logging";

/**
 * GET /api/categories
 * Returns all categories with counts
 */
async function getCategoriesWithCount() {
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

export const GET = withApiLogging("categories.list", async () => getCategoriesWithCount());
