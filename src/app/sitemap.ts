import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublishedPosts } from "@/lib/content/posts";

/**
 * /sitemap.xml
 *
 * Lists every public, indexable route. Static routes are hand-curated;
 * blog posts are appended dynamically from the DB.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    {
      path: "/services/website-development",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      path: "/services/website-development/custom-website-design",
      priority: 0.85,
      changeFrequency: "monthly",
    },
    {
      path: "/services/website-development/ui-ux-design",
      priority: 0.85,
      changeFrequency: "monthly",
    },
    {
      path: "/services/digital-marketing",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services",
      priority: 0.95, // higher: GEO/AEO/LLMO is timely
      changeFrequency: "weekly",
    },
    {
      path: "/services/ai-services/generative-engine-optimization",
      priority: 0.9, // higher: timely + low competition
      changeFrequency: "weekly",
    },
    {
      path: "/services/ai-services/answer-engine-optimization",
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      path: "/services/ai-services/llm-optimization",
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      path: "/services/ai-services/ai-search-visibility-audit",
      priority: 0.88,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services/chatgpt-seo",
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      path: "/services/ai-services/perplexity-seo",
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      path: "/services/ai-services/google-ai-overviews-optimization",
      priority: 0.92,
      changeFrequency: "weekly",
    },
    {
      path: "/services/ai-services/schema-markup-for-ai",
      priority: 0.85,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services/eeat-optimization",
      priority: 0.88,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services/brand-mention-tracking-in-llms",
      priority: 0.85,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services/content-restructuring-for-ai",
      priority: 0.88,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services/ai-blog-writing",
      priority: 0.85,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services/ai-content-strategy",
      priority: 0.85,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services/ai-copywriting",
      priority: 0.85,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services/ai-newsletters",
      priority: 0.82,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services/ai-product-descriptions",
      priority: 0.85,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services/ai-script-writing",
      priority: 0.83,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services/ai-translation-localization",
      priority: 0.85,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services/ai-content-repurposing",
      priority: 0.85,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services/ai-long-form-content",
      priority: 0.85,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services/ai-headline-hook-generation",
      priority: 0.83,
      changeFrequency: "monthly",
    },
    {
      path: "/services/ai-services/ai-ab-test-variations",
      priority: 0.82,
      changeFrequency: "monthly",
    },
    { path: "/technologies", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const posts = await getPublishedPosts(500);
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/${p.slug}`,
    lastModified: p.publishedAt ?? now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
