import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { GET as getProviders } from "@/app/api/providers/route";
import { GET as getCategories } from "@/app/api/categories/route";
import { GET as getProviderById } from "@/app/api/providers/[id]/route";
import { getAllProviders } from "@/lib/api-data";

describe("api routes integration tests", () => {
  it("returns provider list with pagination metadata", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/providers?page=1&pageSize=5",
    );
    const response = await getProviders(request, { params: {} });
    expect(response.status).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload.data)).toBe(true);
    expect(payload.pagination.page).toBe(1);
  });

  it("returns categories with counts", async () => {
    const request = new NextRequest("http://localhost:3000/api/categories");
    const response = await getCategories(request, { params: {} });
    expect(response.status).toBe(200);

    const payload = await response.json();
    expect(Array.isArray(payload.data)).toBe(true);
    expect(payload.data.length).toBeGreaterThan(0);
    expect(payload.data[0]).toHaveProperty("name");
    expect(payload.data[0]).toHaveProperty("count");
  });

  it("returns provider detail by slug", async () => {
    const provider = getAllProviders()[0];
    const request = new NextRequest(
      `http://localhost:3000/api/providers/${provider.slug}`,
    );
    const response = await getProviderById(request, {
      params: Promise.resolve({ id: provider.slug }),
    });
    expect(response.status).toBe(200);

    const payload = await response.json();
    expect(payload.data.slug).toBe(provider.slug);
  });
});
