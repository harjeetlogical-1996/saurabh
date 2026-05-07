import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { BgFx } from "@/components/BgFx";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "AI Services · Saurabh Bhayana",
  description:
    "AI SEO (GEO/AEO/LLMO), content, visuals, video, automation, chatbots, sales, analytics, web dev, and strategy. End-to-end AI services for ambitious brands in 2026.",
};

type SubItem = {
  title: string;
  desc?: string;
  hot?: boolean;
  /** Optional internal route. When set the card renders as a Link
   *  to the dedicated sub-service page. */
  href?: string;
};

type Category = {
  n: string;
  title: string;
  blurb: string;
  badge?: string;
  items: SubItem[];
};

const categories: Category[] = [
  {
    n: "01",
    title: "AI SEO (GEO / AEO / LLMO)",
    blurb:
      "The hottest trend of 2026. Traditional Google SEO isn't enough, you need to be cited by ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude, and Copilot.",
    badge: "New & Trending",
    items: [
      {
        title: "GEO · Generative Engine Optimization",
        desc:
          "Optimize content to appear in AI-generated answers (ChatGPT, Perplexity, Google AI Overviews, Gemini).",
        hot: true,
        href: "/services/ai-services/generative-engine-optimization",
      },
      {
        title: "AEO · Answer Engine Optimization",
        desc: "Get featured in AI answer boxes and voice search results.",
        hot: true,
        href: "/services/ai-services/answer-engine-optimization",
      },
      {
        title: "LLMO · Large Language Model Optimization",
        desc:
          "Optimize so LLMs cite YOUR brand when answering relevant questions.",
        hot: true,
        href: "/services/ai-services/llm-optimization",
      },
      {
        title: "AI Search Visibility Audit",
        desc:
          "Track where your brand appears across ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude, and Copilot.",
        hot: true,
        href: "/services/ai-services/ai-search-visibility-audit",
      },
      {
        title: "ChatGPT SEO",
        desc: "Get listed when users search via ChatGPT.",
        hot: true,
        href: "/services/ai-services/chatgpt-seo",
      },
      {
        title: "Perplexity SEO",
        desc: "Optimize for Perplexity's citation algorithm.",
        hot: true,
        href: "/services/ai-services/perplexity-seo",
      },
      {
        title: "Google SGE / AI Overviews Optimization",
        desc: "Rank in Google's AI-generated answer summaries.",
        hot: true,
        href: "/services/ai-services/google-ai-overviews-optimization",
      },
      {
        title: "Schema Markup for AI",
        desc: "Advanced structured data so AI understands your content.",
        hot: true,
        href: "/services/ai-services/schema-markup-for-ai",
      },
      {
        title: "E-E-A-T Optimization",
        desc:
          "Experience, Expertise, Authoritativeness, Trust, critical for AI citations.",
        hot: true,
        href: "/services/ai-services/eeat-optimization",
      },
      {
        title: "Brand Mention Tracking in LLMs",
        desc: "Monitor how AI tools talk about your brand.",
        hot: true,
        href: "/services/ai-services/brand-mention-tracking-in-llms",
      },
      {
        title: "Content Restructuring for AI",
        desc:
          "Format content for AI consumption, Q&A, lists, citations, scannable structure.",
        hot: true,
        href: "/services/ai-services/content-restructuring-for-ai",
      },
    ],
  },
  {
    n: "02",
    title: "AI Content Creation",
    blurb:
      "AI-assisted content with human editing, blogs, copy, scripts, translations, and long-form guides at scale.",
    items: [
      { title: "AI-Powered Blog Writing (with human editing)" },
      { title: "AI Content Strategy" },
      { title: "AI Copywriting (ads, emails, landing pages)" },
      { title: "AI-Generated Newsletters" },
      { title: "AI Product Descriptions (e-commerce)" },
      { title: "AI Script Writing (videos, podcasts)" },
      { title: "AI Translation & Localization" },
      {
        title: "AI Content Repurposing",
        desc: "1 video → blog + tweets + LinkedIn + carousel",
      },
      { title: "AI-Assisted Long-Form Content (10K+ word guides)" },
      { title: "AI Headline & Hook Generation" },
      { title: "AI A/B Test Variation Creation" },
    ],
  },
  {
    n: "03",
    title: "AI Visual Content",
    blurb:
      "Brand-grade visuals with Midjourney, DALL-E, Flux, and beyond, logos, ads, mockups, and product imagery.",
    items: [
      { title: "AI Image Generation (Midjourney, DALL-E, Flux)" },
      { title: "AI Logo Design" },
      { title: "AI Brand Asset Creation" },
      { title: "AI Product Photography" },
      { title: "AI Mockups & Visualization" },
      { title: "AI Banner & Ad Creative Generation" },
      { title: "AI Social Media Graphics" },
      { title: "AI Thumbnail Design (YouTube, blog)" },
      { title: "AI Illustration Services" },
      { title: "AI 3D Asset Creation" },
      { title: "AI Photo Editing & Retouching" },
      { title: "AI Background Removal at Scale" },
    ],
  },
  {
    n: "04",
    title: "AI Video Services",
    blurb:
      "Avatars, voiceovers, translations, reels, and post-production with Runway, HeyGen, ElevenLabs, and more.",
    items: [
      { title: "AI Video Editing (Runway, Pika, Kling)" },
      { title: "AI Avatar Videos (HeyGen, Synthesia, D-ID)" },
      { title: "AI Voiceovers (ElevenLabs)" },
      { title: "AI Video Translation (multi-language)" },
      { title: "AI Lip-Sync Videos" },
      { title: "AI Reels & Shorts Generation" },
      { title: "AI Talking Head Videos" },
      { title: "AI Video Captions & Subtitles" },
      { title: "AI Stock Video Replacement" },
      { title: "AI Music Generation (Suno, Udio)" },
      { title: "AI Podcast Editing & Cleanup" },
    ],
  },
  {
    n: "05",
    title: "AI Marketing Automation",
    blurb:
      "Personalization, segmentation, predictive analytics, and auto-optimized campaigns at scale.",
    items: [
      { title: "AI Email Personalization at Scale" },
      { title: "AI Sales Funnel Optimization" },
      { title: "AI Customer Segmentation" },
      { title: "AI Lead Scoring" },
      { title: "AI Predictive Analytics" },
      { title: "AI Customer Journey Mapping" },
      { title: "AI Drip Campaign Optimization" },
      { title: "AI A/B Testing (auto-optimization)" },
      { title: "AI Sentiment Analysis" },
      { title: "AI Review Management & Response" },
    ],
  },
  {
    n: "06",
    title: "AI Chatbots & Customer Support",
    blurb:
      "Custom GPTs, voice assistants, WhatsApp bots, and multi-language support agents, built for production.",
    items: [
      { title: "Custom GPT Development" },
      { title: "AI Chatbot for Websites" },
      { title: "WhatsApp AI Bot Integration" },
      { title: "AI Customer Support Agent" },
      { title: "AI Lead Qualification Bot" },
      { title: "AI Booking & Scheduling Bot" },
      { title: "Voice AI Assistants" },
      { title: "AI FAQ Automation" },
      { title: "Multi-language AI Support" },
      { title: "AI Live Chat Integration" },
    ],
  },
  {
    n: "07",
    title: "AI Sales & Outreach",
    blurb:
      "Personalized cold email, LinkedIn automation, prospect research, and CRM auto-fill, pipeline that runs itself.",
    items: [
      { title: "AI Cold Email Personalization" },
      { title: "AI LinkedIn Outreach Automation" },
      { title: "AI Sales Sequences" },
      { title: "AI Prospect Research" },
      {
        title: "AI Meeting Notes & CRM Updates",
        desc: "Otter, Fathom, Fireflies",
      },
      { title: "AI Sales Call Analysis" },
      { title: "AI Proposal Generation" },
      { title: "AI Lead Generation Tools" },
    ],
  },
  {
    n: "08",
    title: "AI Analytics & Insights",
    blurb:
      "AI-powered dashboards, competitor intelligence, content gap analysis, churn prediction, and forecasting.",
    items: [
      { title: "AI-Powered Marketing Dashboards" },
      { title: "AI Competitor Analysis" },
      { title: "AI Trend Detection" },
      { title: "AI Content Gap Analysis" },
      { title: "AI SEO Recommendations" },
      { title: "AI Heatmap & Behavior Analysis" },
      { title: "AI Churn Prediction" },
      { title: "AI Revenue Forecasting" },
      { title: "AI Attribution Modeling" },
    ],
  },
  {
    n: "09",
    title: "AI Web Development",
    blurb:
      "AI-powered builds, code review, personalization engines, recommendation systems, and OpenAI / Anthropic API integrations.",
    badge: "Trending",
    items: [
      {
        title: "AI-Powered Website Building",
        desc: "using Cursor, Claude, V0, Bolt",
      },
      { title: "AI Code Generation & Review" },
      { title: "AI-Assisted Custom App Development" },
      { title: "AI Personalization Engine on Websites" },
      { title: "AI Recommendation Systems (e-commerce)" },
      {
        title: "AI Dynamic Content",
        desc: "different content per visitor",
      },
      { title: "AI-Powered Search on Websites" },
      { title: "Custom AI Tool Development for Clients" },
      { title: "AI Integration with Existing Sites" },
      { title: "OpenAI / Anthropic API Integration" },
      { title: "Custom GPT Apps & Plugins" },
    ],
  },
  {
    n: "10",
    title: "AI Strategy & Consulting",
    blurb:
      "Readiness audits, roadmaps, team training, ROI analysis, and compliance, high-leverage strategy for serious operators.",
    badge: "High-ticket",
    items: [
      { title: "AI Readiness Audit for Businesses" },
      { title: "AI Marketing Strategy" },
      { title: "AI Workflow Automation Setup" },
      { title: "AI Tool Stack Recommendations" },
      { title: "AI Training for Teams" },
      { title: "AI Implementation Roadmaps" },
      { title: "AI ROI Analysis" },
      { title: "AI Compliance & Ethics Consulting" },
      { title: "Custom AI Solutions Architecture" },
    ],
  },
];

type ToolGroup = {
  title: string;
  items: string[];
};

const toolGroups: ToolGroup[] = [
  {
    title: "AI Writing & Content",
    items: [
      "ChatGPT (GPT-4o, GPT-5)",
      "Claude (Anthropic)",
      "Gemini (Google)",
      "Perplexity AI",
      "Copy.ai",
      "Jasper AI",
      "Writesonic",
      "Notion AI",
      "Grammarly AI",
    ],
  },
  {
    title: "AI Image Generation",
    items: [
      "Midjourney",
      "DALL-E 3",
      "Flux (Black Forest Labs)",
      "Stable Diffusion",
      "Ideogram",
      "Adobe Firefly",
      "Leonardo AI",
      "Recraft",
      "Krea AI",
    ],
  },
  {
    title: "AI Video & Animation",
    items: [
      "Runway ML (Gen-3)",
      "Pika Labs",
      "Kling AI",
      "Sora (OpenAI)",
      "HeyGen",
      "Synthesia",
      "D-ID",
      "Descript",
      "Opus Clip",
      "Captions.ai",
      "Vidu AI",
    ],
  },
  {
    title: "AI Voice & Audio",
    items: [
      "ElevenLabs",
      "Murf AI",
      "Suno",
      "Udio",
      "Adobe Podcast",
      "Otter.ai",
      "Whisper (OpenAI)",
    ],
  },
  {
    title: "AI SEO & Marketing",
    items: [
      "Surfer SEO",
      "Frase",
      "Clearscope",
      "MarketMuse",
      "Writesonic SEO",
      "Otterly.AI",
      "Profound",
      "HubSpot AI",
      "Mutiny",
      "Optimizely AI",
    ],
  },
  {
    title: "AI Development",
    items: [
      "Cursor",
      "GitHub Copilot",
      "v0 by Vercel",
      "Bolt.new",
      "Lovable.dev",
      "Claude Code",
      "Replit AI",
      "Tabnine",
    ],
  },
  {
    title: "AI Automation",
    items: ["Zapier AI", "Make (Integromat) AI", "n8n with AI", "Relevance AI", "Lindy AI", "Bardeen AI"],
  },
  {
    title: "AI Chatbots & Agents",
    items: [
      "Custom GPTs (OpenAI)",
      "Anthropic Claude API",
      "Voiceflow",
      "Botpress",
      "Dialogflow",
      "ManyChat AI",
      "Chatbase",
    ],
  },
  {
    title: "AI Analytics",
    items: ["Mixpanel AI", "June AI", "Pendo AI", "Heap AI", "Microsoft Clarity AI"],
  },
];

export default function AIServicesPage() {
  const totalItems = categories.reduce((acc, c) => acc + c.items.length, 0);
  const totalTools = toolGroups.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero
          totalItems={totalItems}
          categoriesCount={categories.length}
          totalTools={totalTools}
        />
        <CategoryNav />
        <CategoryList />
        <ToolStack totalTools={totalTools} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function Hero({
  totalItems,
  categoriesCount,
  totalTools,
}: {
  totalItems: number;
  categoriesCount: number;
  totalTools: number;
}) {
  return (
    <header className="relative overflow-hidden bg-[var(--bg)] border-b border-[var(--line)]">
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid animate-drift" />
      </div>
      <BgFx variant="hero" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-20 pb-20 md:pt-28 md:pb-24">
        <Reveal className="max-w-[860px]">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
            <Link
              href="/services"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Services
            </Link>
            <span className="text-[var(--line-2)]">/</span>
            <span className="text-white">AI Services</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service 03 · AI Services · 2026
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[56px] md:text-[68px] leading-[1.02] tracking-[-0.04em]">
            AI services that{" "}
            <span className="text-[var(--accent)]">earn revenue</span>, not
            just headlines.
          </h1>

          <p className="mt-7 max-w-[660px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            From <span className="text-white">GEO &amp; LLMO</span> (the new
            SEO of 2026) to AI content engines, AI video, AI chatbots, AI
            sales outreach, and AI-powered web apps, we ship practical AI
            workflows that pay for themselves. Built on Claude, GPT, and the
            best open-source stack.
          </p>

          <div className="mt-9 flex items-center gap-3 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 px-6 rounded-full bg-[var(--accent)] text-black font-semibold text-[14px] hover:-translate-y-0.5 hover:shadow-[0_0_36px_var(--accent-glow)] transition-all"
            >
              Contact us <span>→</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center px-6 rounded-full border border-[var(--line)] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[14px] font-medium"
            >
              All services
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-end gap-10">
            <div>
              <div className="font-display text-[36px] leading-none tracking-tight text-white">
                {categoriesCount}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                Categories
              </div>
            </div>
            <div>
              <div className="font-display text-[36px] leading-none tracking-tight text-[var(--accent)]">
                {totalItems}+
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                AI Sub-services
              </div>
            </div>
            <div>
              <div className="font-display text-[36px] leading-none tracking-tight text-white">
                {totalTools}+
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                AI Tools in our stack
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  );
}

function CategoryNav() {
  return (
    <section className="sticky top-16 z-30 border-b border-[var(--line)] bg-[rgba(10,10,10,0.85)] backdrop-blur-xl">
      <div className="max-w-[1240px] mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto">
        <span className="shrink-0 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono pr-3 border-r border-[var(--line)]">
          Jump to
        </span>
        {categories.map((c) => (
          <a
            key={c.n}
            href={`#cat-${c.n}`}
            className="shrink-0 text-[12px] font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors px-2.5 py-1.5 rounded-full border border-transparent hover:border-[var(--accent)]/40"
          >
            <span className="text-[var(--accent)]/70">{c.n}</span>{" "}
            {shortTitle(c.title)}
          </a>
        ))}
        <a
          href="#tools"
          className="shrink-0 text-[12px] font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors px-2.5 py-1.5 rounded-full border border-transparent hover:border-[var(--accent)]/40"
        >
          <span className="text-[var(--accent)]/70">+</span> Tools
        </a>
      </div>
    </section>
  );
}

function shortTitle(title: string): string {
  return title.replace(/\s*\([^)]*\)\s*/g, "").trim();
}

function CategoryList() {
  return (
    <section className="relative bg-[var(--bg)] overflow-hidden">
      <BgFx variant="subtle" />
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-20 md:py-28 space-y-20 md:space-y-28">
        {categories.map((c) => (
          <CategoryRow key={c.n} category={c} />
        ))}
      </div>
    </section>
  );
}

function CategoryRow({ category }: { category: Category }) {
  return (
    <article id={`cat-${category.n}`} className="scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
              <span className="h-px w-8 bg-[var(--accent)]" />
              Category {category.n}
            </div>
            <h2 className="mt-4 font-display text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.025em]">
              {category.title}
            </h2>
            {category.badge && (
              <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--accent)] text-black text-[10px] uppercase tracking-[0.18em] font-mono font-bold">
                <Icon name="zap" size={11} strokeWidth={2.5} />
                {category.badge}
              </div>
            )}
            <p className="mt-4 max-w-[460px] text-[14px] md:text-[15px] leading-[1.7] text-[var(--muted)]">
              {category.blurb}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {category.items.length} services
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {category.items.map((item, i) => {
              const baseClasses = `group p-4 rounded-xl border bg-[var(--surface)] transition-all hover:-translate-y-0.5 ${
                item.hot
                  ? "border-[var(--accent)]/40 hover:border-[var(--accent)]"
                  : "border-[var(--line)] hover:border-[var(--accent)]"
              }`;
              const inner = (
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 min-w-[2.2rem] items-center justify-center rounded-md bg-[var(--accent)]/10 text-[var(--accent)] text-[11px] font-mono font-semibold px-1.5">
                    {category.n}.{String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-start gap-2">
                      <span className="text-[14px] leading-[1.4] font-medium text-white">
                        {item.title}
                      </span>
                      {item.hot && (
                        <span className="shrink-0 inline-flex items-center text-[var(--accent)]">
                          <Icon name="flame" size={13} strokeWidth={2} />
                        </span>
                      )}
                      {item.href && (
                        <span
                          aria-hidden
                          className="ml-auto shrink-0 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity text-[14px]"
                        >
                          →
                        </span>
                      )}
                    </div>
                    {item.desc && (
                      <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[var(--muted)]">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>
              );
              return (
                <li key={item.title}>
                  {item.href ? (
                    <Link href={item.href} className={`${baseClasses} block`}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={baseClasses}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </article>
  );
}

function ToolStack({ totalTools }: { totalTools: number }) {
  return (
    <section
      id="tools"
      className="relative bg-[var(--bg)] border-y border-[var(--line)] overflow-hidden scroll-mt-32"
    >
      <BgFx variant="subtle" />
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-24 md:py-32">
        <Reveal className="max-w-[860px]">
          <div className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.24em] text-[var(--accent)] font-mono">
            <span className="h-px w-8 bg-[var(--accent)]" />
            Our AI Tech Stack
          </div>
          <h2 className="mt-4 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.03em]">
            {totalTools}+ AI tools.{" "}
            <span className="text-[var(--accent)]">One opinionated stack.</span>
          </h2>
          <p className="mt-5 max-w-[600px] text-[15px] md:text-[16px] leading-[1.7] text-[var(--muted)]">
            We don&apos;t use every tool. We use the best tool for the job, and we know which is which because we ship with them every day.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {toolGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 70}>
              <div className="h-full bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 hover:border-[var(--accent)] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="font-display text-[16px] tracking-tight text-white">
                    {g.title}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                    {String(g.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {g.items.map((t) => (
                    <li
                      key={t}
                      className="text-[12px] px-2.5 py-1 rounded-full border border-[var(--line)] text-[var(--muted)] font-mono hover:border-[var(--accent)]/50 hover:text-white transition-colors"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
