import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceBlock } from "@/components/services/ServiceBlock";
import { ServicesProcess } from "@/components/services/ServicesProcess";

export const metadata: Metadata = {
  title: "Services · Saurabh Bhayana",
  description:
    "Three services. One mission: your growth. Website development, digital marketing, and AI services, built end-to-end by Saurabh Bhayana & Team.",
};

const webDev = {
  index: "01",
  slug: "website-development",
  detailHref: "/services/website-development",
  eyebrow: "Service 01",
  title: "Website Development",
  tagline: "Websites that work as hard as you do.",
  body: "Custom design, e-commerce, CMS builds, web apps, integrations, performance, and maintenance. From a single landing page to a SaaS dashboard, we build what your business actually needs to grow.",
  // High-level categories, full breakdown lives on /services/website-development
  subs: [
    {
      n: "01",
      title: "Website Design",
      body: "Custom UI/UX, design systems, wireframes, prototypes, and Figma files.",
    },
    {
      n: "02",
      title: "Website Development Types",
      body: "Marketing, corporate, portfolio, landing pages, microsites, single or multi-page.",
    },
    {
      n: "03",
      title: "E-commerce Development",
      body: "Shopify, WooCommerce, Magento, headless, marketplaces, and subscriptions.",
    },
    {
      n: "04",
      title: "CMS Development",
      body: "WordPress, Webflow, Framer, and headless CMS (Sanity, Contentful, Strapi).",
    },
    {
      n: "05",
      title: "Web Application Development",
      body: "SaaS, dashboards, CRMs, booking apps, LMS, and marketplace platforms.",
    },
    {
      n: "06",
      title: "Specialized Services",
      body: "Funnels, multi-language, multi-region, coming-soon, and maintenance pages.",
    },
    {
      n: "07",
      title: "Technical Services",
      body: "Speed, Core Web Vitals, accessibility, schema, security, and database tuning.",
    },
    {
      n: "08",
      title: "Migration & Redesign",
      body: "Replatform, redesign, HTTP→HTTPS, hosting & domain migration, modernization.",
    },
    {
      n: "09",
      title: "Maintenance & Support",
      body: "Monitoring, backups, updates, fixes, and 24/7 emergency support.",
    },
    {
      n: "10",
      title: "Integrations",
      body: "Payments, CRM, email, analytics, chat, booking, and custom APIs.",
    },
  ],
  highlights: [
    "Custom Design (no templates)",
    "E-commerce & CMS Builds",
    "Web Apps & SaaS Products",
    "Performance & Core Web Vitals",
    "Migrations & Redesigns",
    "Maintenance & Integrations",
  ],
};

const aiServices = {
  index: "03",
  slug: "ai-services",
  detailHref: "/services/ai-services",
  eyebrow: "Service 03 · 2026",
  title: "AI Services",
  tagline: "AI that earns revenue, not just headlines.",
  body: "From GEO & LLMO (the new SEO of 2026) to AI content engines, AI video, AI chatbots, AI sales outreach, and AI-powered web apps. Practical AI workflows that pay for themselves, built on Claude, GPT, and the best open-source stack.",
  // High-level categories, full breakdown lives on /services/ai-services
  subs: [
    {
      n: "01",
      title: "AI SEO (GEO / AEO / LLMO)",
      body: "Get cited by ChatGPT, Perplexity, Google AI Overviews, Gemini, and Claude. The hottest trend of 2026.",
    },
    {
      n: "02",
      title: "AI Content Creation",
      body: "AI-assisted blogs, copy, scripts, translations, and 10K+ word guides, with human editing.",
    },
    {
      n: "03",
      title: "AI Visual Content",
      body: "Midjourney, DALL-E, Flux for logos, ads, mockups, product imagery, and 3D assets.",
    },
    {
      n: "04",
      title: "AI Video Services",
      body: "Avatars, voiceovers, translations, reels, Runway, HeyGen, ElevenLabs, Suno.",
    },
    {
      n: "05",
      title: "AI Marketing Automation",
      body: "Personalization, segmentation, predictive analytics, and auto-optimization at scale.",
    },
    {
      n: "06",
      title: "AI Chatbots & Support",
      body: "Custom GPTs, voice assistants, WhatsApp bots, and multi-language support agents.",
    },
    {
      n: "07",
      title: "AI Sales & Outreach",
      body: "Cold email personalization, LinkedIn automation, prospect research, CRM auto-fill.",
    },
    {
      n: "08",
      title: "AI Analytics & Insights",
      body: "AI dashboards, competitor intel, content gap, churn prediction, revenue forecasting.",
    },
    {
      n: "09",
      title: "AI Web Development",
      body: "AI personalization, recommendation engines, OpenAI / Anthropic API integration, custom GPTs.",
    },
    {
      n: "10",
      title: "AI Strategy & Consulting",
      body: "Readiness audits, roadmaps, team training, ROI analysis, and compliance.",
    },
  ],
  highlights: [
    "AI SEO (GEO / AEO / LLMO)",
    "AI Content & Copywriting",
    "AI Visual & Video Creation",
    "AI Chatbots & Automation",
    "AI Web Apps & Integrations",
    "AI Strategy & Consulting",
  ],
};

const digitalMarketing = {
  index: "02",
  slug: "digital-marketing",
  detailHref: "/services/digital-marketing",
  eyebrow: "Service 02",
  title: "Digital Marketing",
  tagline: "Marketing that moves the needle.",
  body: "Full-stack digital marketing, SEO, paid ads, content, social, email, CRO, analytics, branding, video, and partnerships. We don't chase vanity metrics. We chase revenue you can measure.",
  // High-level categories, full breakdown lives on /services/digital-marketing
  subs: [
    {
      n: "01",
      title: "SEO",
      body: "Technical, on-page, off-page, local, e-commerce, and international SEO.",
    },
    {
      n: "02",
      title: "Paid Advertising (PPC)",
      body: "Google, Meta, LinkedIn, TikTok, Pinterest, programmatic, and retargeting.",
    },
    {
      n: "03",
      title: "Social Media Marketing",
      body: "Strategy, content calendars, community, and influencer programs across every channel.",
    },
    {
      n: "04",
      title: "Content Marketing",
      body: "Blog, pillar pages, ebooks, case studies, scripts, and lead magnets.",
    },
    {
      n: "05",
      title: "Email Marketing",
      body: "Welcome flows, sales funnels, newsletters, cold outreach, and automation.",
    },
    {
      n: "06",
      title: "Conversion Rate Optimization",
      body: "A/B testing, funnel analysis, heatmaps, and personalization.",
    },
    {
      n: "07",
      title: "Analytics & Reporting",
      body: "GA4, GTM, attribution, custom dashboards, and ROAS reporting.",
    },
    {
      n: "08",
      title: "Branding & Strategy",
      body: "Identity, positioning, messaging, market research, and personas.",
    },
    {
      n: "09",
      title: "Video Marketing",
      body: "YouTube, Reels, Shorts, ads, brand stories, and demos.",
    },
    {
      n: "10",
      title: "Affiliate & Partnerships",
      body: "Affiliate programs, influencer outreach, and referral loops.",
    },
  ],
  highlights: [
    "SEO & Organic Growth",
    "Paid Ads (Google + Meta + more)",
    "Social Media Management",
    "Content Marketing",
    "Email Marketing",
    "Analytics & Reporting",
  ],
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ServicesHero />
        <ServiceBlock data={webDev} />
        <ServiceBlock data={digitalMarketing} reversed />
        <ServiceBlock data={aiServices} />
        <ServicesProcess />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
