import type { APIProvider } from "./types";

export const apiProviders: APIProvider[] = [
  {
    id: "openai-free",
    slug: "openai-free-api",
    name: "OpenAI",
    website: "https://openai.com",
    description:
      "Access GPT-4o-mini and other models through OpenAI's API with a free tier for new users.",
    category: "AI & Machine Learning",
    subcategory: "Large Language Models",
    freeTier: {
      freeCredits: 5,
      duration: "3 months",
      includes: [
        "GPT-4o-mini access",
        "GPT-3.5-turbo access",
        "Whisper API",
        "TTS API",
        "Embeddings API",
      ],
      excludes: ["GPT-4o full", "DALL·E 3 HD", "Fine-tuning"],
      autoUpgrade: false,
    },
    rateLimits: {
      rpm: 3,
      rpd: 200,
      tpm: 40000,
    },
    creditCardRequired: false,
    verificationRequired: ["email", "phone"],
    geoRestrictions: ["China", "Russia", "Iran", "North Korea"],
    signupSteps: [
      {
        order: 1,
        title: "Create an OpenAI account",
        description: "Go to platform.openai.com and sign up with email or Google/Microsoft account.",
        url: "https://platform.openai.com/signup",
      },
      {
        order: 2,
        title: "Verify your phone number",
        description: "OpenAI requires phone verification. Use a real phone number (VoIP numbers are blocked).",
        warning: "Some countries' phone numbers may not be accepted.",
      },
      {
        order: 3,
        title: "Navigate to API Keys",
        description: "Go to Settings → API Keys and click 'Create new secret key'.",
        url: "https://platform.openai.com/api-keys",
      },
      {
        order: 4,
        title: "Copy and store your key securely",
        description: "Copy the key immediately — it won't be shown again. Store it in an environment variable.",
        warning: "Never commit API keys to version control.",
      },
    ],
    testingSteps: [
      {
        order: 1,
        title: "Test with cURL",
        command: `curl https://api.openai.com/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"Hello!"}]}'`,
        description: "Send a simple chat completion request.",
        expectedResult: "JSON response with a message completion from the model.",
      },
      {
        order: 2,
        title: "Check your usage",
        description: "Visit the usage dashboard to confirm the request was counted.",
        command: "https://platform.openai.com/usage",
      },
    ],
    docsUrl: "https://platform.openai.com/docs",
    pricingUrl: "https://openai.com/pricing",
    dashboardUrl: "https://platform.openai.com/usage",
    badges: [
      { label: "Best for Students", color: "blue" },
      { label: "High Quality", color: "purple" },
    ],
    hiddenLimitations: [
      "Free credits expire after 3 months",
      "Rate limits are very low on free tier (3 RPM)",
      "Phone verification blocks many VoIP numbers",
      "Some models require payment method to access",
    ],
    abusePolicy:
      "OpenAI monitors usage patterns and may suspend accounts for automated abuse, scraping, or ToS violations.",
    lastVerified: "2026-02-15",
    lastUpdated: "2026-02-15",
    communityRating: 4.5,
    reviewCount: 342,
  },
  {
    id: "google-gemini",
    slug: "google-gemini-free-api",
    name: "Google Gemini",
    website: "https://ai.google.dev",
    description:
      "Google's Gemini API offers generous free tier access to Gemini Pro and Flash models for AI development.",
    category: "AI & Machine Learning",
    subcategory: "Large Language Models",
    freeTier: {
      duration: "Forever (with limits)",
      includes: [
        "Gemini 2.0 Flash",
        "Gemini 1.5 Pro",
        "Gemini 1.5 Flash",
        "Embeddings",
        "Multimodal input",
      ],
      excludes: ["Gemini Ultra", "Batch processing priority"],
      autoUpgrade: false,
    },
    rateLimits: {
      rpm: 15,
      rpd: 1500,
      tpm: 1000000,
    },
    creditCardRequired: false,
    verificationRequired: ["email"],
    geoRestrictions: ["EU (limited features)", "UK (limited features)"],
    signupSteps: [
      {
        order: 1,
        title: "Go to Google AI Studio",
        description: "Visit ai.google.dev and sign in with your Google account.",
        url: "https://ai.google.dev",
      },
      {
        order: 2,
        title: "Get your API key",
        description: "Click 'Get API Key' in Google AI Studio. You can create a key in a new or existing GCP project.",
        url: "https://aistudio.google.com/apikey",
      },
      {
        order: 3,
        title: "Store the key securely",
        description: "Copy the API key and store it as an environment variable.",
      },
    ],
    testingSteps: [
      {
        order: 1,
        title: "Test with cURL",
        command: `curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"contents":[{"parts":[{"text":"Hello!"}]}]}'`,
        description: "Send a simple content generation request.",
        expectedResult: "JSON response with generated text from Gemini.",
      },
    ],
    docsUrl: "https://ai.google.dev/docs",
    pricingUrl: "https://ai.google.dev/pricing",
    dashboardUrl: "https://aistudio.google.com",
    badges: [
      { label: "No Credit Card", color: "green" },
      { label: "High RPM", color: "orange" },
      { label: "Best for Students", color: "blue" },
    ],
    hiddenLimitations: [
      "Some features unavailable in EU/UK due to regulations",
      "Free tier data may be used for model improvement",
      "Rate limits can change without notice",
    ],
    abusePolicy:
      "Google monitors for abuse and may revoke access for ToS violations including automated scraping.",
    lastVerified: "2026-02-14",
    lastUpdated: "2026-02-14",
    communityRating: 4.7,
    reviewCount: 528,
  },
  {
    id: "anthropic-claude",
    slug: "anthropic-claude-free-api",
    name: "Anthropic Claude",
    website: "https://anthropic.com",
    description:
      "Anthropic offers free API credits for Claude models, known for safety and long context windows.",
    category: "AI & Machine Learning",
    subcategory: "Large Language Models",
    freeTier: {
      freeCredits: 5,
      duration: "Initial credits (no expiry announced)",
      includes: [
        "Claude 3.5 Sonnet",
        "Claude 3 Haiku",
        "Messages API",
        "Vision capabilities",
      ],
      excludes: ["Claude 3 Opus", "Batch API priority"],
      autoUpgrade: false,
    },
    rateLimits: {
      rpm: 5,
      rpd: 1000,
      tpm: 20000,
    },
    creditCardRequired: false,
    verificationRequired: ["email"],
    geoRestrictions: [],
    signupSteps: [
      {
        order: 1,
        title: "Create an Anthropic account",
        description: "Go to console.anthropic.com and sign up.",
        url: "https://console.anthropic.com",
      },
      {
        order: 2,
        title: "Generate an API key",
        description: "Navigate to API Keys section and create a new key.",
        url: "https://console.anthropic.com/settings/keys",
      },
      {
        order: 3,
        title: "Store securely",
        description: "Save the key as ANTHROPIC_API_KEY environment variable.",
      },
    ],
    testingSteps: [
      {
        order: 1,
        title: "Test with cURL",
        command: `curl https://api.anthropic.com/v1/messages \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"claude-3-5-sonnet-20241022","max_tokens":256,"messages":[{"role":"user","content":"Hello!"}]}'`,
        description: "Send a simple message to Claude.",
        expectedResult: "JSON response with Claude's reply.",
      },
    ],
    docsUrl: "https://docs.anthropic.com",
    pricingUrl: "https://anthropic.com/pricing",
    dashboardUrl: "https://console.anthropic.com",
    badges: [
      { label: "No Credit Card", color: "green" },
      { label: "Long Context", color: "purple" },
    ],
    hiddenLimitations: [
      "Free credits are limited and don't renew",
      "Rate limits are strict on free tier",
      "Some features require paid plan",
    ],
    abusePolicy:
      "Anthropic has strict usage policies. Accounts may be suspended for generating harmful content.",
    lastVerified: "2026-02-13",
    lastUpdated: "2026-02-13",
    communityRating: 4.6,
    reviewCount: 215,
  },
  {
    id: "cloudflare-workers-ai",
    slug: "cloudflare-workers-ai-free",
    name: "Cloudflare Workers AI",
    website: "https://developers.cloudflare.com/workers-ai",
    description:
      "Run AI models on Cloudflare's edge network with a generous free tier — no credit card required.",
    category: "AI & Machine Learning",
    subcategory: "Edge AI Inference",
    freeTier: {
      duration: "Forever",
      includes: [
        "10,000 neurons/day free",
        "LLaMA, Mistral, Stable Diffusion models",
        "Text generation, classification, embeddings",
        "Image generation",
        "Speech-to-text",
      ],
      excludes: ["Custom model uploads", "Priority inference"],
      autoUpgrade: false,
    },
    rateLimits: {
      rpd: 10000,
      custom: "10,000 neurons/day (varies by model)",
    },
    creditCardRequired: false,
    verificationRequired: ["email"],
    geoRestrictions: [],
    signupSteps: [
      {
        order: 1,
        title: "Create Cloudflare account",
        description: "Sign up at dash.cloudflare.com.",
        url: "https://dash.cloudflare.com/sign-up",
      },
      {
        order: 2,
        title: "Enable Workers AI",
        description: "Go to AI → Workers AI in the dashboard and enable it.",
      },
      {
        order: 3,
        title: "Get your API token",
        description: "Create an API token with Workers AI permissions.",
        url: "https://dash.cloudflare.com/profile/api-tokens",
      },
    ],
    testingSteps: [
      {
        order: 1,
        title: "Test with cURL",
        command: `curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{"messages":[{"role":"user","content":"Hello!"}]}'`,
        description: "Run inference on a LLaMA model.",
        expectedResult: "JSON response with model output.",
      },
    ],
    docsUrl: "https://developers.cloudflare.com/workers-ai",
    pricingUrl: "https://developers.cloudflare.com/workers-ai/platform/pricing",
    dashboardUrl: "https://dash.cloudflare.com",
    badges: [
      { label: "No Credit Card", color: "green" },
      { label: "Forever Free", color: "green" },
      { label: "Edge Computing", color: "blue" },
    ],
    hiddenLimitations: [
      "Neuron-based pricing can be confusing",
      "Some models consume more neurons than others",
      "Cold start latency on edge",
    ],
    abusePolicy: "Standard Cloudflare ToS applies. Automated abuse will result in account suspension.",
    lastVerified: "2026-02-12",
    lastUpdated: "2026-02-12",
    communityRating: 4.3,
    reviewCount: 156,
  },
  {
    id: "supabase-free",
    slug: "supabase-free-tier",
    name: "Supabase",
    website: "https://supabase.com",
    description:
      "Open-source Firebase alternative with a generous free tier including PostgreSQL, Auth, Storage, and Realtime.",
    category: "Cloud & Infrastructure",
    subcategory: "Backend as a Service",
    freeTier: {
      duration: "Forever (with limits)",
      includes: [
        "500MB database",
        "1GB file storage",
        "2GB bandwidth",
        "50,000 monthly active users (auth)",
        "500K edge function invocations",
        "Realtime subscriptions",
      ],
      excludes: [
        "Daily backups",
        "Custom domains",
        "Priority support",
        "More than 2 projects",
      ],
      autoUpgrade: false,
    },
    rateLimits: {
      bandwidth: "2GB/month",
      custom: "500MB database, 2 free projects",
    },
    creditCardRequired: false,
    verificationRequired: ["email"],
    geoRestrictions: [],
    signupSteps: [
      {
        order: 1,
        title: "Sign up at Supabase",
        description: "Create an account using GitHub or email.",
        url: "https://supabase.com/dashboard",
      },
      {
        order: 2,
        title: "Create a new project",
        description: "Click 'New Project', choose a name, password, and region.",
      },
      {
        order: 3,
        title: "Get your API keys",
        description: "Go to Settings → API to find your project URL and anon/service keys.",
      },
    ],
    testingSteps: [
      {
        order: 1,
        title: "Test the REST API",
        command: `curl 'https://YOUR_PROJECT.supabase.co/rest/v1/' \\
  -H "apikey: YOUR_ANON_KEY" \\
  -H "Authorization: Bearer YOUR_ANON_KEY"`,
        description: "Query your Supabase REST API.",
        expectedResult: "Empty array or your table data.",
      },
    ],
    docsUrl: "https://supabase.com/docs",
    pricingUrl: "https://supabase.com/pricing",
    dashboardUrl: "https://supabase.com/dashboard",
    badges: [
      { label: "No Credit Card", color: "green" },
      { label: "Forever Free", color: "green" },
      { label: "Open Source", color: "purple" },
    ],
    hiddenLimitations: [
      "Projects pause after 1 week of inactivity on free tier",
      "Limited to 2 free projects",
      "No daily backups on free tier",
      "Edge functions have cold starts",
    ],
    abusePolicy: "Supabase may pause or delete inactive free-tier projects.",
    lastVerified: "2026-02-10",
    lastUpdated: "2026-02-10",
    communityRating: 4.8,
    reviewCount: 412,
  },
  {
    id: "vercel-free",
    slug: "vercel-free-tier",
    name: "Vercel",
    website: "https://vercel.com",
    description:
      "Deploy frontend applications with serverless functions, edge middleware, and analytics on Vercel's free Hobby plan.",
    category: "Cloud & Infrastructure",
    subcategory: "Hosting & Deployment",
    freeTier: {
      duration: "Forever (Hobby plan)",
      includes: [
        "100GB bandwidth/month",
        "Serverless functions",
        "Edge middleware",
        "Preview deployments",
        "Custom domains",
        "SSL certificates",
      ],
      excludes: [
        "Team collaboration",
        "Advanced analytics",
        "Password protection",
        "DDoS mitigation",
      ],
      autoUpgrade: false,
    },
    rateLimits: {
      bandwidth: "100GB/month",
      custom: "100 deployments/day, 12 serverless functions concurrent",
    },
    creditCardRequired: false,
    verificationRequired: ["email"],
    geoRestrictions: [],
    signupSteps: [
      {
        order: 1,
        title: "Sign up at Vercel",
        description: "Create an account using GitHub, GitLab, or Bitbucket.",
        url: "https://vercel.com/signup",
      },
      {
        order: 2,
        title: "Import a project",
        description: "Connect your Git repository and import your project.",
      },
      {
        order: 3,
        title: "Deploy",
        description: "Vercel auto-deploys on every push. Get your live URL instantly.",
      },
    ],
    testingSteps: [
      {
        order: 1,
        title: "Push to your repo",
        description: "Make a commit and push. Vercel will auto-deploy.",
        expectedResult: "Live URL at your-project.vercel.app",
      },
    ],
    docsUrl: "https://vercel.com/docs",
    pricingUrl: "https://vercel.com/pricing",
    dashboardUrl: "https://vercel.com/dashboard",
    badges: [
      { label: "No Credit Card", color: "green" },
      { label: "Forever Free", color: "green" },
      { label: "Best for Students", color: "blue" },
    ],
    hiddenLimitations: [
      "Hobby plan is for non-commercial use only",
      "Serverless function timeout: 10s (free), 60s (pro)",
      "No team features on free plan",
      "Build time limited to 45 min/deployment",
    ],
    abusePolicy: "Commercial use on Hobby plan violates ToS. Vercel may suspend accounts.",
    lastVerified: "2026-02-11",
    lastUpdated: "2026-02-11",
    communityRating: 4.6,
    reviewCount: 389,
  },
  {
    id: "resend-free",
    slug: "resend-free-email-api",
    name: "Resend",
    website: "https://resend.com",
    description:
      "Modern email API for developers. Send transactional emails with a clean API and generous free tier.",
    category: "Communication",
    subcategory: "Email",
    freeTier: {
      duration: "Forever",
      includes: [
        "100 emails/day",
        "3,000 emails/month",
        "1 custom domain",
        "React Email support",
      ],
      excludes: ["Multiple domains", "Dedicated IP", "Priority support"],
      autoUpgrade: false,
    },
    rateLimits: {
      rpd: 100,
      custom: "3,000 emails/month, 100 emails/day",
    },
    creditCardRequired: false,
    verificationRequired: ["email"],
    geoRestrictions: [],
    signupSteps: [
      {
        order: 1,
        title: "Sign up at Resend",
        description: "Create an account at resend.com.",
        url: "https://resend.com/signup",
      },
      {
        order: 2,
        title: "Verify your domain",
        description: "Add DNS records to verify your sending domain.",
      },
      {
        order: 3,
        title: "Get your API key",
        description: "Go to API Keys and create a new key.",
        url: "https://resend.com/api-keys",
      },
    ],
    testingSteps: [
      {
        order: 1,
        title: "Send a test email",
        command: `curl -X POST https://api.resend.com/emails \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"from":"you@yourdomain.com","to":"test@example.com","subject":"Hello","html":"<p>Test!</p>"}'`,
        description: "Send a test email via the API.",
        expectedResult: "JSON response with email ID.",
      },
    ],
    docsUrl: "https://resend.com/docs",
    pricingUrl: "https://resend.com/pricing",
    dashboardUrl: "https://resend.com/overview",
    badges: [
      { label: "No Credit Card", color: "green" },
      { label: "Forever Free", color: "green" },
      { label: "Developer Friendly", color: "blue" },
    ],
    hiddenLimitations: [
      "Only 1 custom domain on free tier",
      "No dedicated IP (shared sending reputation)",
      "Daily limit of 100 emails is strict",
    ],
    abusePolicy: "Resend monitors for spam. Accounts sending unsolicited email will be suspended.",
    lastVerified: "2026-02-09",
    lastUpdated: "2026-02-09",
    communityRating: 4.4,
    reviewCount: 98,
  },
  {
    id: "upstash-redis",
    slug: "upstash-redis-free",
    name: "Upstash Redis",
    website: "https://upstash.com",
    description:
      "Serverless Redis with a generous free tier. Perfect for caching, rate limiting, and session storage.",
    category: "Cloud & Infrastructure",
    subcategory: "Database & Caching",
    freeTier: {
      duration: "Forever",
      includes: [
        "10,000 commands/day",
        "256MB storage",
        "REST API",
        "Global replication (1 region)",
      ],
      excludes: ["Multi-region replication", "Advanced analytics", "SLA guarantee"],
      autoUpgrade: true,
    },
    rateLimits: {
      rpd: 10000,
      custom: "10,000 commands/day, 256MB max data size",
    },
    creditCardRequired: false,
    verificationRequired: ["email"],
    geoRestrictions: [],
    signupSteps: [
      {
        order: 1,
        title: "Sign up at Upstash",
        description: "Create an account at console.upstash.com.",
        url: "https://console.upstash.com",
      },
      {
        order: 2,
        title: "Create a Redis database",
        description: "Click 'Create Database', choose a region, and select the free tier.",
      },
      {
        order: 3,
        title: "Get connection details",
        description: "Copy the REST URL and token from the database details page.",
      },
    ],
    testingSteps: [
      {
        order: 1,
        title: "Test with cURL",
        command: `curl https://YOUR_REDIS_URL/set/mykey/myvalue \\
  -H "Authorization: Bearer YOUR_TOKEN"`,
        description: "Set a key-value pair.",
        expectedResult: 'JSON response: {"result":"OK"}',
      },
    ],
    docsUrl: "https://upstash.com/docs/redis",
    pricingUrl: "https://upstash.com/pricing",
    dashboardUrl: "https://console.upstash.com",
    badges: [
      { label: "No Credit Card", color: "green" },
      { label: "Forever Free", color: "green" },
      { label: "Serverless", color: "purple" },
    ],
    hiddenLimitations: [
      "Auto-upgrade to pay-as-you-go if you exceed limits (can be disabled)",
      "10,000 commands/day may not be enough for production",
      "Single region only on free tier",
    ],
    abusePolicy: "Standard ToS. Excessive usage without payment will trigger throttling.",
    lastVerified: "2026-02-08",
    lastUpdated: "2026-02-08",
    communityRating: 4.5,
    reviewCount: 134,
  },
];

// ============================================================
// Helper functions
// ============================================================

export function getProviderBySlug(slug: string): APIProvider | undefined {
  return apiProviders.find((p) => p.slug === slug);
}

export function getProviderById(id: string): APIProvider | undefined {
  return apiProviders.find((p) => p.id === id);
}

export function getCategories(): string[] {
  return [...new Set(apiProviders.map((p) => p.category))];
}

export function filterProviders(params: {
  category?: string;
  search?: string;
  creditCardRequired?: boolean;
  minRpm?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): APIProvider[] {
  let results = [...apiProviders];

  if (params.category) {
    results = results.filter((p) => p.category === params.category);
  }

  if (params.search) {
    const q = params.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subcategory?.toLowerCase().includes(q) ?? false)
    );
  }

  if (params.creditCardRequired === false) {
    results = results.filter((p) => !p.creditCardRequired);
  }

  if (params.minRpm) {
    results = results.filter((p) => (p.rateLimits.rpm ?? 0) >= params.minRpm!);
  }

  // Sort
  const order = params.sortOrder === "desc" ? -1 : 1;
  switch (params.sortBy) {
    case "name":
      results.sort((a, b) => a.name.localeCompare(b.name) * order);
      break;
    case "rpm":
      results.sort((a, b) => ((a.rateLimits.rpm ?? 0) - (b.rateLimits.rpm ?? 0)) * order);
      break;
    case "rpd":
      results.sort((a, b) => ((a.rateLimits.rpd ?? 0) - (b.rateLimits.rpd ?? 0)) * order);
      break;
    case "rating":
      results.sort(
        (a, b) => ((a.communityRating ?? 0) - (b.communityRating ?? 0)) * order
      );
      break;
    default:
      break;
  }

  return results;
}
