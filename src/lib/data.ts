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
  {
    id: "nvidia-nim",
    slug: "nvidia-nim-free-api",
    name: "NVIDIA NIM",
    website: "https://build.nvidia.com",
    description:
      "NVIDIA NIM (NVIDIA Inference Microservices) provides free API access to state-of-the-art AI models including LLaMA, Mistral, and NVIDIA's own models with GPU-accelerated inference.",
    category: "AI & Machine Learning",
    subcategory: "GPU-Accelerated Inference",
    freeTier: {
      freeCredits: 1000,
      duration: "1,000 free credits (no expiry announced)",
      includes: [
        "LLaMA 3.1 405B, 70B, 8B",
        "Mistral Large, Mixtral 8x22B",
        "NVIDIA Nemotron models",
        "Code Llama 70B",
        "Stable Diffusion XL",
        "Embedding models",
        "Reranking models",
      ],
      excludes: ["Dedicated endpoints", "Custom model deployment", "SLA guarantee"],
      autoUpgrade: false,
    },
    rateLimits: {
      rpm: 10,
      rpd: 5000,
      tpm: 100000,
    },
    creditCardRequired: false,
    verificationRequired: ["email"],
    geoRestrictions: [],
    signupSteps: [
      {
        order: 1,
        title: "Create an NVIDIA account",
        description: "Go to build.nvidia.com and sign up with your email or existing NVIDIA account.",
        url: "https://build.nvidia.com",
      },
      {
        order: 2,
        title: "Browse available models",
        description: "Explore the model catalog. Each model has a 'Try' button with a playground.",
      },
      {
        order: 3,
        title: "Generate an API key",
        description: "Click 'Get API Key' on any model page. You'll receive 1,000 free credits.",
        url: "https://build.nvidia.com/explore/discover",
      },
      {
        order: 4,
        title: "Use the OpenAI-compatible endpoint",
        description: "NIM uses an OpenAI-compatible API format, making it easy to switch from OpenAI.",
      },
    ],
    testingSteps: [
      {
        order: 1,
        title: "Test with cURL (OpenAI-compatible)",
        command: `curl https://integrate.api.nvidia.com/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"meta/llama-3.1-70b-instruct","messages":[{"role":"user","content":"Hello!"}],"max_tokens":512}'`,
        description: "Send a chat completion request using the OpenAI-compatible endpoint.",
        expectedResult: "JSON response with model completion, same format as OpenAI.",
      },
      {
        order: 2,
        title: "Check credit balance",
        description: "Visit your NVIDIA dashboard to see remaining credits.",
        command: "https://build.nvidia.com/dashboard",
      },
    ],
    docsUrl: "https://docs.api.nvidia.com",
    pricingUrl: "https://build.nvidia.com/pricing",
    dashboardUrl: "https://build.nvidia.com/dashboard",
    badges: [
      { label: "No Credit Card", color: "green" },
      { label: "High RPM", color: "orange" },
      { label: "GPU Accelerated", color: "purple" },
      { label: "OpenAI Compatible", color: "blue" },
    ],
    hiddenLimitations: [
      "1,000 credits are consumed at different rates per model (larger models cost more)",
      "Credits don't renew — once used, you need to pay",
      "Some models may be removed from free tier without notice",
      "Rate limits vary by model size",
    ],
    abusePolicy:
      "NVIDIA monitors API usage. Accounts violating ToS or generating harmful content will be suspended.",
    lastVerified: "2026-02-15",
    lastUpdated: "2026-02-15",
    communityRating: 4.4,
    reviewCount: 187,
  },
  {
    id: "openrouter-free",
    slug: "openrouter-free-api",
    name: "OpenRouter",
    website: "https://openrouter.ai",
    description:
      "Unified API gateway to 100+ AI models from OpenAI, Anthropic, Google, Meta, and more. Many models available completely free with community credits.",
    category: "AI & Machine Learning",
    subcategory: "AI Model Gateway",
    freeTier: {
      duration: "Forever (free models always available)",
      includes: [
        "Free models: LLaMA 3.1 8B, Gemma 2 9B, Phi-3, Qwen 2.5",
        "OpenAI-compatible API format",
        "Model routing & fallback",
        "Usage analytics dashboard",
        "Prompt caching",
      ],
      excludes: ["Premium models (GPT-4o, Claude 3.5)", "Priority routing", "Custom rate limits"],
      autoUpgrade: false,
    },
    rateLimits: {
      rpm: 20,
      rpd: 200,
      tpm: 200000,
      custom: "Free models: 20 RPM, 200 RPD. Paid models: varies by credit balance.",
    },
    creditCardRequired: false,
    verificationRequired: ["email"],
    geoRestrictions: [],
    signupSteps: [
      {
        order: 1,
        title: "Create an OpenRouter account",
        description: "Sign up at openrouter.ai with email, Google, or GitHub.",
        url: "https://openrouter.ai/auth",
      },
      {
        order: 2,
        title: "Get your API key",
        description: "Go to Keys page and create a new API key.",
        url: "https://openrouter.ai/keys",
      },
      {
        order: 3,
        title: "Choose free models",
        description: "Browse the model list and filter by 'Free' to see all available free models.",
        url: "https://openrouter.ai/models?q=free",
      },
    ],
    testingSteps: [
      {
        order: 1,
        title: "Test with cURL",
        command: `curl https://openrouter.ai/api/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"meta-llama/llama-3.1-8b-instruct:free","messages":[{"role":"user","content":"Hello!"}]}'`,
        description: "Send a request to a free model via OpenRouter.",
        expectedResult: "JSON response in OpenAI-compatible format.",
      },
    ],
    docsUrl: "https://openrouter.ai/docs",
    pricingUrl: "https://openrouter.ai/models",
    dashboardUrl: "https://openrouter.ai/activity",
    badges: [
      { label: "No Credit Card", color: "green" },
      { label: "Forever Free", color: "green" },
      { label: "100+ Models", color: "purple" },
      { label: "OpenAI Compatible", color: "blue" },
    ],
    hiddenLimitations: [
      "Free models have lower rate limits than paid ones",
      "Free model availability can change",
      "Response times may be slower on free tier during peak hours",
      "Some free models are community-hosted and may have downtime",
    ],
    abusePolicy:
      "OpenRouter monitors for abuse. Excessive requests or harmful content generation will result in account restrictions.",
    lastVerified: "2026-02-14",
    lastUpdated: "2026-02-14",
    communityRating: 4.6,
    reviewCount: 298,
  },
  {
    id: "groq-free",
    slug: "groq-free-api",
    name: "Groq",
    website: "https://groq.com",
    description:
      "Ultra-fast AI inference powered by Groq's custom LPU chips. Free tier offers blazing-fast access to LLaMA, Mixtral, and Gemma models.",
    category: "AI & Machine Learning",
    subcategory: "Fast AI Inference",
    freeTier: {
      duration: "Forever (with rate limits)",
      includes: [
        "LLaMA 3.1 70B & 8B",
        "Mixtral 8x7B",
        "Gemma 2 9B",
        "Whisper Large v3 (speech-to-text)",
        "LLaVA (vision)",
        "Tool use / function calling",
      ],
      excludes: ["Dedicated capacity", "SLA guarantee", "Priority queue"],
      autoUpgrade: false,
    },
    rateLimits: {
      rpm: 30,
      rpd: 14400,
      tpm: 6000,
      custom: "Rate limits vary by model. LLaMA 3.1 70B: 30 RPM, 14,400 RPD.",
    },
    creditCardRequired: false,
    verificationRequired: ["email"],
    geoRestrictions: [],
    signupSteps: [
      {
        order: 1,
        title: "Create a Groq account",
        description: "Sign up at console.groq.com with email or Google.",
        url: "https://console.groq.com/signup",
      },
      {
        order: 2,
        title: "Generate an API key",
        description: "Go to API Keys and create a new key.",
        url: "https://console.groq.com/keys",
      },
      {
        order: 3,
        title: "Start using the API",
        description: "Groq uses an OpenAI-compatible API format for easy integration.",
      },
    ],
    testingSteps: [
      {
        order: 1,
        title: "Test with cURL",
        command: `curl https://api.groq.com/openai/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"llama-3.1-70b-versatile","messages":[{"role":"user","content":"Hello!"}]}'`,
        description: "Send a chat completion request. Notice the blazing-fast response time!",
        expectedResult: "JSON response in ~200ms — much faster than typical cloud inference.",
      },
    ],
    docsUrl: "https://console.groq.com/docs",
    pricingUrl: "https://groq.com/pricing",
    dashboardUrl: "https://console.groq.com",
    badges: [
      { label: "No Credit Card", color: "green" },
      { label: "Forever Free", color: "green" },
      { label: "Ultra Fast", color: "orange" },
      { label: "Best for Students", color: "blue" },
    ],
    hiddenLimitations: [
      "Token per minute limits are relatively low (6,000 TPM for some models)",
      "Model selection is more limited than OpenAI/Anthropic",
      "No fine-tuning support",
      "Occasional capacity issues during peak demand",
    ],
    abusePolicy:
      "Groq monitors usage patterns. Accounts generating harmful content or exceeding fair use will be restricted.",
    lastVerified: "2026-02-15",
    lastUpdated: "2026-02-15",
    communityRating: 4.7,
    reviewCount: 376,
  },
  {
    id: "together-ai-free",
    slug: "together-ai-free-api",
    name: "Together AI",
    website: "https://together.ai",
    description:
      "Run open-source AI models with a generous free tier. Access LLaMA, Mistral, Code Llama, Stable Diffusion, and 100+ models.",
    category: "AI & Machine Learning",
    subcategory: "Open Source Model Hosting",
    freeTier: {
      freeCredits: 5,
      duration: "$5 free credits for new users",
      includes: [
        "LLaMA 3.1 405B, 70B, 8B",
        "Mistral Large, Mixtral",
        "Code Llama 34B",
        "Stable Diffusion XL",
        "Embedding models",
        "Fine-tuning (limited)",
      ],
      excludes: ["Dedicated instances", "Priority support", "Custom model hosting"],
      autoUpgrade: false,
    },
    rateLimits: {
      rpm: 60,
      tpm: 100000,
      custom: "Rate limits vary by model and account tier.",
    },
    creditCardRequired: false,
    verificationRequired: ["email"],
    geoRestrictions: [],
    signupSteps: [
      {
        order: 1,
        title: "Create a Together AI account",
        description: "Sign up at api.together.ai with email or GitHub.",
        url: "https://api.together.ai/signup",
      },
      {
        order: 2,
        title: "Get your API key",
        description: "Your API key is available in the dashboard settings.",
        url: "https://api.together.ai/settings/api-keys",
      },
      {
        order: 3,
        title: "Explore available models",
        description: "Browse 100+ open-source models available through the API.",
        url: "https://api.together.ai/models",
      },
    ],
    testingSteps: [
      {
        order: 1,
        title: "Test with cURL",
        command: `curl https://api.together.xyz/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo","messages":[{"role":"user","content":"Hello!"}]}'`,
        description: "Send a chat completion request using the OpenAI-compatible endpoint.",
        expectedResult: "JSON response with model completion.",
      },
    ],
    docsUrl: "https://docs.together.ai",
    pricingUrl: "https://together.ai/pricing",
    dashboardUrl: "https://api.together.ai",
    badges: [
      { label: "No Credit Card", color: "green" },
      { label: "High RPM", color: "orange" },
      { label: "100+ Models", color: "purple" },
      { label: "OpenAI Compatible", color: "blue" },
    ],
    hiddenLimitations: [
      "$5 credits don't renew — pay-as-you-go after that",
      "Larger models (405B) consume credits faster",
      "Fine-tuning has separate pricing",
      "Some models may be deprecated without long notice",
    ],
    abusePolicy:
      "Together AI monitors for abuse and harmful content generation. Accounts violating ToS will be suspended.",
    lastVerified: "2026-02-13",
    lastUpdated: "2026-02-13",
    communityRating: 4.5,
    reviewCount: 203,
  },
  {
    id: "mistral-free",
    slug: "mistral-ai-free-api",
    name: "Mistral AI",
    website: "https://mistral.ai",
    description:
      "European AI company offering powerful open and commercial models. Free tier includes access to Mistral Small and open-source models.",
    category: "AI & Machine Learning",
    subcategory: "Large Language Models",
    freeTier: {
      duration: "Free experiment tier (with limits)",
      includes: [
        "Mistral Small (latest)",
        "Mistral Nemo",
        "Codestral Mamba",
        "Embeddings API",
        "Function calling",
      ],
      excludes: ["Mistral Large", "Mistral Medium", "Fine-tuning", "Guardrails API"],
      autoUpgrade: false,
    },
    rateLimits: {
      rpm: 2,
      rpd: 500,
      tpm: 500000,
    },
    creditCardRequired: false,
    verificationRequired: ["email"],
    geoRestrictions: [],
    signupSteps: [
      {
        order: 1,
        title: "Create a Mistral account",
        description: "Sign up at console.mistral.ai.",
        url: "https://console.mistral.ai",
      },
      {
        order: 2,
        title: "Select the free tier",
        description: "Choose the 'Experiment' plan which is free and doesn't require a credit card.",
      },
      {
        order: 3,
        title: "Generate an API key",
        description: "Go to API Keys and create a new key.",
        url: "https://console.mistral.ai/api-keys",
      },
    ],
    testingSteps: [
      {
        order: 1,
        title: "Test with cURL",
        command: `curl https://api.mistral.ai/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"mistral-small-latest","messages":[{"role":"user","content":"Hello!"}]}'`,
        description: "Send a chat completion request to Mistral Small.",
        expectedResult: "JSON response with Mistral's completion.",
      },
    ],
    docsUrl: "https://docs.mistral.ai",
    pricingUrl: "https://mistral.ai/pricing",
    dashboardUrl: "https://console.mistral.ai",
    badges: [
      { label: "No Credit Card", color: "green" },
      { label: "EU Based", color: "blue" },
      { label: "OpenAI Compatible", color: "blue" },
    ],
    hiddenLimitations: [
      "Free tier has very low RPM (2 requests per minute)",
      "Only smaller models available on free tier",
      "Rate limits can change without notice",
      "Free tier data may be used for model improvement",
    ],
    abusePolicy:
      "Mistral AI monitors usage. Accounts violating acceptable use policy will be restricted.",
    lastVerified: "2026-02-12",
    lastUpdated: "2026-02-12",
    communityRating: 4.3,
    reviewCount: 145,
  },
  {
    id: "huggingface-free",
    slug: "huggingface-inference-free",
    name: "Hugging Face Inference",
    website: "https://huggingface.co",
    description:
      "Access thousands of open-source AI models through Hugging Face's free Inference API. Text generation, image generation, embeddings, and more.",
    category: "AI & Machine Learning",
    subcategory: "Model Hub & Inference",
    freeTier: {
      duration: "Forever (rate limited)",
      includes: [
        "Thousands of open-source models",
        "Text generation (LLaMA, Mistral, Falcon)",
        "Image generation (Stable Diffusion)",
        "Embeddings & sentence similarity",
        "Audio transcription",
        "Zero-shot classification",
      ],
      excludes: ["Dedicated endpoints", "GPU acceleration guarantee", "SLA"],
      autoUpgrade: false,
    },
    rateLimits: {
      custom: "Varies by model. Shared infrastructure with queue-based processing.",
    },
    creditCardRequired: false,
    verificationRequired: ["email"],
    geoRestrictions: [],
    signupSteps: [
      {
        order: 1,
        title: "Create a Hugging Face account",
        description: "Sign up at huggingface.co.",
        url: "https://huggingface.co/join",
      },
      {
        order: 2,
        title: "Get your access token",
        description: "Go to Settings → Access Tokens and create a new token.",
        url: "https://huggingface.co/settings/tokens",
      },
      {
        order: 3,
        title: "Find a model",
        description: "Browse models on the Hub and look for the 'Inference API' badge.",
        url: "https://huggingface.co/models",
      },
    ],
    testingSteps: [
      {
        order: 1,
        title: "Test with cURL",
        command: `curl https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"inputs":"Hello, how are you?"}'`,
        description: "Send a text generation request to a model.",
        expectedResult: "JSON response with generated text.",
      },
    ],
    docsUrl: "https://huggingface.co/docs/api-inference",
    pricingUrl: "https://huggingface.co/pricing",
    dashboardUrl: "https://huggingface.co/settings/tokens",
    badges: [
      { label: "No Credit Card", color: "green" },
      { label: "Forever Free", color: "green" },
      { label: "Open Source", color: "purple" },
      { label: "1000+ Models", color: "orange" },
    ],
    hiddenLimitations: [
      "Free inference is shared and can be slow (queued)",
      "Large models may time out on free tier",
      "No guaranteed uptime or response time",
      "Some popular models have long queue times",
    ],
    abusePolicy:
      "Hugging Face monitors for abuse. Excessive automated requests may be throttled.",
    lastVerified: "2026-02-11",
    lastUpdated: "2026-02-11",
    communityRating: 4.5,
    reviewCount: 567,
  },
  {
    id: "cohere-free",
    slug: "cohere-free-api",
    name: "Cohere",
    website: "https://cohere.com",
    description:
      "Enterprise-grade NLP API with a generous free trial tier. Excellent for text generation, embeddings, reranking, and RAG applications.",
    category: "AI & Machine Learning",
    subcategory: "NLP & Embeddings",
    freeTier: {
      duration: "Forever (trial key with limits)",
      includes: [
        "Command R+ (latest)",
        "Command R",
        "Embed v3 (multilingual)",
        "Rerank v3",
        "RAG with web search",
        "Function calling",
      ],
      excludes: ["Production key", "SLA guarantee", "Priority support", "Custom models"],
      autoUpgrade: false,
    },
    rateLimits: {
      rpm: 20,
      custom: "Trial key: 20 RPM, 1,000 calls/month. Production requires paid plan.",
    },
    creditCardRequired: false,
    verificationRequired: ["email"],
    geoRestrictions: [],
    signupSteps: [
      {
        order: 1,
        title: "Create a Cohere account",
        description: "Sign up at dashboard.cohere.com.",
        url: "https://dashboard.cohere.com/welcome/register",
      },
      {
        order: 2,
        title: "Get your trial API key",
        description: "A trial API key is automatically generated. Find it in API Keys section.",
        url: "https://dashboard.cohere.com/api-keys",
      },
      {
        order: 3,
        title: "Try the playground",
        description: "Use the built-in playground to test models before coding.",
        url: "https://dashboard.cohere.com/playground",
      },
    ],
    testingSteps: [
      {
        order: 1,
        title: "Test with cURL",
        command: `curl https://api.cohere.com/v2/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"command-r-plus","messages":[{"role":"user","content":"Hello!"}]}'`,
        description: "Send a chat request to Command R+.",
        expectedResult: "JSON response with Cohere's completion.",
      },
    ],
    docsUrl: "https://docs.cohere.com",
    pricingUrl: "https://cohere.com/pricing",
    dashboardUrl: "https://dashboard.cohere.com",
    badges: [
      { label: "No Credit Card", color: "green" },
      { label: "Forever Free", color: "green" },
      { label: "Best for RAG", color: "purple" },
    ],
    hiddenLimitations: [
      "Trial key is for non-production use only",
      "1,000 API calls/month limit on trial",
      "Production use requires paid plan",
      "Trial key responses may include attribution requirements",
    ],
    abusePolicy:
      "Cohere monitors trial key usage. Commercial use on trial keys violates ToS.",
    lastVerified: "2026-02-10",
    lastUpdated: "2026-02-10",
    communityRating: 4.4,
    reviewCount: 178,
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
