import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * /robots.txt
 *
 * - Allow indexing for everything public by default.
 * - Block dashboard, signup, login, API, and v2 from crawl.
 * - We deliberately DO NOT list the admin/console path here (security through
 *   obscurity), and instead block it via X-Robots-Tag header in middleware.ts.
 * - Explicitly allow major LLM/AI crawlers so we get cited (GEO/AEO/LLMO).
 *
 * Reference: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const disallowedPaths = ["/api", "/dashboard", "/login", "/signup", "/v2"];

  return {
    rules: [
      // Default policy for all bots
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
      },
      // AI / LLM crawlers we explicitly want indexing us
      {
        userAgent: [
          "GPTBot", // OpenAI
          "OAI-SearchBot", // OpenAI search
          "ChatGPT-User", // ChatGPT live browsing
          "PerplexityBot", // Perplexity
          "Perplexity-User", // Perplexity live
          "ClaudeBot", // Anthropic
          "Claude-Web", // Anthropic
          "Google-Extended", // Google AI / Gemini
          "Applebot-Extended", // Apple Intelligence
          "Bytespider", // ByteDance / Doubao
          "Amazonbot", // Amazon / Alexa
          "DuckAssistBot", // DuckDuckGo
          "CCBot", // Common Crawl (used by many LLM training sets)
          "anthropic-ai",
        ],
        allow: "/",
        disallow: disallowedPaths,
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
