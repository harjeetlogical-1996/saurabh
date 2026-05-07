import { cache } from "react";
import { connectMongoose } from "@/lib/db/mongoose";
import { Tool } from "@/lib/db/models/Tool";

export type ToolCard = {
  code: string;
  title: string;
  body: string;
  cta: string;
  href?: string;
  plan: "free" | "paid";
};

export const seedTools: ReadonlyArray<ToolCard> = [
  {
    code: "T.01",
    title: "Free SEO Audit Tool",
    body:
      "Get a 60-second technical & on-page SEO audit of any URL. Issues prioritized, fixes explained.",
    cta: "Run a free audit",
    plan: "free",
  },
  {
    code: "T.02",
    title: "Image Optimizer",
    body:
      "Compress images without quality loss. Faster Core Web Vitals, better rankings, lower bandwidth bills.",
    cta: "Optimize for free",
    plan: "free",
  },
  {
    code: "T.03",
    title: "Website Speed Checker",
    body:
      "Test PageSpeed, LCP, CLS and INP. Get actionable fixes, not just a score.",
    cta: "Check site speed",
    plan: "free",
  },
];

export const getHomepageTools = cache(
  async (): Promise<ReadonlyArray<ToolCard>> => {
    try {
      await connectMongoose();
      const docs = await Tool.find({ published: true })
        .sort({ order: 1, createdAt: 1 })
        .limit(6)
        .lean();
      if (docs.length === 0) return seedTools;
      return docs.map((d) => ({
        code: d.code,
        title: d.title,
        body: d.body,
        cta: d.cta ?? "Try it free",
        href: d.href ?? undefined,
        plan: (d.plan as "free" | "paid") ?? "free",
      }));
    } catch (err) {
      console.warn("[getHomepageTools] DB unavailable, using seeds:", err);
      return seedTools;
    }
  },
);
