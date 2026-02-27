import { NextRequest, NextResponse } from "next/server";
import { filterProviders, apiProviders } from "@/lib/data";
import { withApiLogging } from "@/lib/observability/with-api-logging";

/**
 * GET /api/providers
 *
 * Query params:
 *   - category: Filter by category
 *   - search: Search term
 *   - creditCard: "false" to filter no credit card required
 *   - minRpm: Minimum RPM
 *   - sortBy: "name" | "rpm" | "rpd" | "rating"
 *   - sortOrder: "asc" | "desc"
 *   - page: Page number (default 1)
 *   - pageSize: Items per page (default 20)
 */
async function getProviders(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const category = searchParams.get("category") ?? undefined;
  const search = searchParams.get("search") ?? undefined;
  const creditCard = searchParams.get("creditCard");
  const minRpm = searchParams.get("minRpm");
  const sortBy = searchParams.get("sortBy") ?? undefined;
  const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") ?? undefined;
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get("pageSize") ?? "20", 10)));

  const filtered = filterProviders({
    category,
    search,
    creditCardRequired: creditCard === "false" ? false : undefined,
    minRpm: minRpm ? parseInt(minRpm, 10) : undefined,
    sortBy,
    sortOrder,
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return NextResponse.json(
    {
      data,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}

/**
 * HEAD /api/providers
 * Returns count info in headers
 */
async function headProviders() {
  return new NextResponse(null, {
    headers: {
      "X-Total-Count": apiProviders.length.toString(),
      "Cache-Control": "public, s-maxage=300",
    },
  });
}

export const GET = withApiLogging("providers.list", getProviders);
export const HEAD = withApiLogging("providers.head", async () => headProviders());
