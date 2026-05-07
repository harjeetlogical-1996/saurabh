/**
 * FAQ content for the home page.
 *
 * Reads from the DB if available, falls back to the static seed list below.
 * The static list also seeds the DB on first admin save.
 */
import { cache } from "react";
import { connectMongoose } from "@/lib/db/mongoose";
import { Faq } from "@/lib/db/models/Faq";

export type FAQ = { q: string; a: string };

/** Static fallback. Used when the DB has no FAQs yet. */
export const seedFaqs: ReadonlyArray<FAQ> = [
  {
    q: "What services do you offer?",
    a: "Three core service lines: <strong>Website Development</strong> (Next.js, Webflow, Shopify, WordPress, web apps), <strong>Digital Marketing</strong> (SEO, Google &amp; Meta Ads, content, email, CRO), and <strong>AI Services</strong> (AI SEO / GEO / AEO / LLMO, AI content, chatbots, automations, custom OpenAI / Anthropic integrations). Take one or all three. They're designed to work together.",
  },
  {
    q: "How quickly will I see results from SEO, ads, or a new website?",
    a: "Depends on the service. A new website usually ships in 4–8 weeks. Paid ads can drive qualified leads within 2–4 weeks. SEO compounds: quick technical wins land in 30–60 days, content + AI search visibility usually shows by month 3, with serious revenue impact by month 6. We forecast realistically on the first call.",
  },
  {
    q: "What is GEO / AEO / LLMO and do I really need it in 2026?",
    a: "<strong>GEO</strong> (Generative Engine Optimization), <strong>AEO</strong> (Answer Engine Optimization), and <strong>LLMO</strong> (Large Language Model Optimization) get your brand cited by ChatGPT, Perplexity, Google AI Overviews, Gemini, and Claude. In 2026, AI search drives a fast-growing share of buyer research. If you're not optimized for it, your competitors will be the answer when buyers ask AI.",
  },
  {
    q: "Do you work with our in-house team or existing agency?",
    a: "Yes. We plug in as strategists, ship deliverables your team owns, train your writers and designers, or run end-to-end. We've worked alongside marketing teams, dev teams, and other agencies. Pick what makes sense for your stage.",
  },
  {
    q: "What size of company do you typically work with?",
    a: "Mostly seed to Series-B SaaS, D2C brands doing $1–50M in revenue, ambitious solo founders, and growth-stage agencies in India, the US, UK, and EU. We take on a small number of clients at a time so the founder (Saurabh) stays involved on every project.",
  },
  {
    q: "How is your pricing structured?",
    a: "Three options: <strong>fixed-quote projects</strong> (websites, audits, AI builds), <strong>monthly retainers</strong> (digital marketing, ongoing SEO, AI workflow ops; 3-month minimum), or <strong>done-with-you sprints</strong>. Exact numbers depend on scope. You get a fixed quote within 48 hours of the discovery call.",
  },
  {
    q: "Will you sign an NDA, DPA, or SOC 2 vendor questionnaire?",
    a: "Yes. We've worked with healthcare, fintech, and legal clients and are comfortable with NDAs, DPAs, vendor security reviews, and SOC 2-aligned processes. Standard NDA goes out before our discovery call if you'd like.",
  },
  {
    q: "Where is your team based and which countries do you serve?",
    a: "Founder-led from <strong>Fatehabad, India</strong>, with team members across India working async-first. We serve clients across India, the United States, the United Kingdom, and the European Union, with overlapping working hours of at least 4 hours per day with most time zones.",
  },
];

/** @deprecated Kept for compatibility with existing imports. Prefer getHomepageFaqs(). */
export const homepageFaqs = seedFaqs;

/**
 * Read published home-page FAQs in display order. Falls back to seed list
 * when DB is empty or unavailable.
 */
export const getHomepageFaqs = cache(async (): Promise<ReadonlyArray<FAQ>> => {
  try {
    await connectMongoose();
    const docs = await Faq.find({ page: "home", published: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    if (docs.length === 0) return seedFaqs;
    return docs.map((d) => ({ q: d.question, a: d.answer }));
  } catch (err) {
    console.warn("[getHomepageFaqs] DB unavailable, using seed list:", err);
    return seedFaqs;
  }
});
