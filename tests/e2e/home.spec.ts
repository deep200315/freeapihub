import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/FreeAPIHub/i);
  await expect(page.getByText(/Discover/i)).toBeVisible();
});

test("providers API endpoint returns data", async ({ request }) => {
  const response = await request.get("/api/providers");
  expect(response.ok()).toBeTruthy();

  const payload = await response.json();
  expect(Array.isArray(payload.data)).toBeTruthy();
});
