const baseUrl = process.env.SMOKE_URL;

if (!baseUrl) {
  console.error("SMOKE_URL environment variable is required");
  process.exit(1);
}

const endpoints = ["/", "/api/providers", "/api/categories", "/sitemap.xml"];

const run = async () => {
  const failures = [];

  for (const endpoint of endpoints) {
    const url = new URL(endpoint, baseUrl).toString();
    try {
      const res = await fetch(url);
      if (!res.ok) {
        failures.push(`- ${url}: HTTP ${res.status}`);
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      failures.push(`- ${url}: request failed (${reason})`);
    }
  }

  if (failures.length > 0) {
    console.error("Smoke test failures:");
    for (const failure of failures) {
      console.error(failure);
    }
    process.exit(1);
  }

  console.log("Smoke tests passed");
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
