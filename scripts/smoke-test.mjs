const baseUrl = process.env.SMOKE_URL;

if (!baseUrl) {
  console.error("SMOKE_URL environment variable is required");
  process.exit(1);
}

const endpoints = ["/", "/api/providers", "/api/categories", "/sitemap.xml"];

const run = async () => {
  for (const endpoint of endpoints) {
    const url = new URL(endpoint, baseUrl).toString();
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Smoke test failed for ${url} with status ${res.status}`);
      process.exit(1);
    }
  }

  console.log("Smoke tests passed");
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
