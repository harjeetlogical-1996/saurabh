/**
 * Seed (or upsert) Article #1: "The Complete Guide to AI SEO in 2026
 * (GEO, AEO & LLMO Explained)".
 *
 * Run:
 *   npm run seed:article-1
 *
 * Idempotent: if a post with this slug already exists, we update its body +
 * metadata in place but keep `published`, `publishedAt`, and `coverUrl` if
 * those have already been set in the DB (so we don't overwrite manual edits).
 */
import { MongoClient, ObjectId } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "saurabh";
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const ADMIN_NAME = process.env.SEED_ADMIN_NAME || "Saurabh Bhayana";

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is required in .env.local");
  process.exit(1);
}

const SLUG = "ai-seo-2026-geo-aeo-llmo-guide";

const article = {
  slug: SLUG,
  title:
    "The Complete Guide to AI SEO in 2026 (GEO, AEO & LLMO Explained)",
  excerpt:
    "AI search has rewritten SEO. Here's how GEO, AEO, and LLMO actually work in 2026 — and exactly how to optimize your site to be cited by ChatGPT, Perplexity, and Google AI Overviews.",
  tag: "AI SEO",
  readMin: 16,
  focusKeyword: "ai seo guide",
  keywords: [
    "ai seo 2026",
    "geo seo",
    "answer engine optimization",
    "llmo",
    "rank in chatgpt",
    "perplexity seo",
    "google ai overviews seo",
    "ai search vs google",
    "how to rank in ai search",
    "ai content seo",
  ],
  keyTakeaways: [
    "AI search now answers ~60% of informational queries before users click — your goal is to be cited inside the answer, not just to rank #10.",
    "GEO (Generative Engine Optimization) is the new umbrella term for ranking inside ChatGPT, Perplexity, Gemini, and Google AI Overviews.",
    "AEO and LLMO are subsets of GEO: AEO focuses on direct-answer questions, LLMO focuses on getting your brand cited inside language models.",
    "The mechanics are different from classic SEO: structured data, declarative facts, and named-entity richness matter more than keyword density.",
    "On-page work that rankings AI search rewards: TL;DR boxes, FAQ schema, citation-friendly numbered lists, and crawlable evidence (real numbers, sources).",
    "Off-page still matters — but the signals shifted: brand mentions in trustworthy public corpora (Wikipedia, Reddit, Stack Overflow, niche pubs) train the models that quote you.",
  ],
  faqs: [
    {
      question: "What's the difference between GEO, AEO, and LLMO?",
      answer:
        "GEO (Generative Engine Optimization) is the umbrella term for any work that helps you appear inside AI-generated answers. AEO (Answer Engine Optimization) is a subset focused on direct-answer queries (Google Featured Snippets, voice search, AI Overviews). LLMO (Large Language Model Optimization) is the deepest subset: getting cited inside ChatGPT, Claude, and Perplexity responses where there's no SERP at all.",
    },
    {
      question: "Is traditional SEO dead in 2026?",
      answer:
        "No. Roughly 30–40% of queries still go to Google's classic blue links, especially navigational and transactional ones. But 60% of informational searches are now resolved by AI summaries, voice assistants, or chat answers. Skip GEO/AEO/LLMO and you lose the most valuable buyer-research traffic.",
    },
    {
      question: "How do I rank inside ChatGPT or Perplexity answers?",
      answer:
        "Three things move the needle: (1) be cited by sources the models trust — Wikipedia, Reddit, niche industry publications; (2) write in answer-shaped paragraphs with declarative facts and clear definitions; (3) ship technical SEO that lets AI crawlers (GPTBot, ClaudeBot, PerplexityBot) actually index you. Allow these crawlers in robots.txt, ship structured data, and keep load times under 2 seconds.",
    },
    {
      question: "Do I need to rewrite my whole website for AI SEO?",
      answer:
        "Usually not. Most existing sites need three changes: add JSON-LD schema (Article, FAQPage, BreadcrumbList), insert TL;DR/key-takeaway boxes near the top of every long-form page, and rephrase H2 headings as natural questions. Those three together typically lift AI citations within 4–8 weeks.",
    },
    {
      question: "How do I measure AI SEO success?",
      answer:
        "Track three new metrics alongside classic rankings: brand mentions per AI response (use tools like Otterly.AI or Profound), citation share on Perplexity for your money keywords, and assisted conversions where the first touch is an AI summary. Most analytics still don't surface AI traffic well — log referrers manually.",
    },
  ],
  body: "",
};

const BODY_MARKDOWN = `## Why AI SEO is now table stakes

In late 2024, Google quietly began surfacing AI Overviews on more than half of US informational searches. By mid-2025, OpenAI's ChatGPT crossed 800 million weekly active users. Perplexity tripled its query volume year-over-year. Apple shipped Apple Intelligence summaries on every recent iPhone.

By the time you're reading this — early 2026 — three things are true:

1. **The blue-links SERP is no longer the default search experience.** AI answers come first. Citations come second. Links come third, if at all.
2. **Buyer research happens inside chat interfaces.** Founders, marketers, and engineers are typing entire problem descriptions into ChatGPT or Perplexity rather than chaining together Google searches.
3. **The brands cited inside AI answers are winning the rest of the funnel.** A mention inside a ChatGPT response is the new top-of-funnel placement, and it's worth more than a position-1 organic ranking on Google.

If your SEO playbook still ends at *"rank for the keyword, optimize the title tag, build some links"*, you're optimizing for a search experience that fewer than half of your buyers see anymore.

This guide is what works in 2026. It's the playbook we use with the founders we work with at [Saurabh Bhayana &amp; Team](/services). Read end-to-end, and you'll come out with a prioritized to-do list — not just theory.

## What AI SEO actually means: GEO, AEO, and LLMO

Three acronyms get thrown around. They're related but not the same.

### GEO — Generative Engine Optimization

The umbrella term. **GEO is the practice of getting your brand, content, and pages cited inside AI-generated answers.** That covers:

- Google AI Overviews (formerly SGE)
- Bing Copilot search results
- ChatGPT live web answers
- Perplexity citations
- Gemini answer cards
- Claude (when used in a search context)

The "generative engine" is any system that *generates an answer* rather than returning a list of links. Optimizing for those engines is GEO.

### AEO — Answer Engine Optimization

A specific subset of GEO that predates the LLM boom. **AEO focuses on direct-answer queries** — questions a user wants answered without scrolling.

Classic AEO surfaces include:

- Google Featured Snippets ("position zero")
- People Also Ask boxes
- Voice search results (Google Assistant, Alexa, Siri)
- Schema-driven rich results (recipes, how-tos, FAQs)

If a user types *"how long does SEO take to work"*, AEO is what gets your two-sentence answer pulled into the box at the top of the page.

### LLMO — Large Language Model Optimization

The newest and most technical subset. **LLMO is about getting cited inside an LLM's actual response** — ChatGPT, Claude, Perplexity, Gemini — when there's no SERP at all.

You're not ranking against ten other URLs. You're competing for **mention-share inside a single generated paragraph.**

The mechanics are different again. LLMs cite you because:
- Your domain shows up frequently in the corpus they trained on
- High-trust sites (Wikipedia, Reddit, Stack Overflow, established trade pubs) link to you
- Your content is structured in a way models can extract cleanly (lists, definitions, named entities)
- You allow their crawlers (GPTBot, ClaudeBot, PerplexityBot) in robots.txt

Most of the rest of this guide is about LLMO and GEO together, because in 2026 they're 80% of the AI SEO opportunity.

## How AI search actually works (the 90-second version)

You can't optimize for what you don't understand. Here's the simplest accurate model.

When a user types a query into ChatGPT or Perplexity, three things happen in roughly this order:

**Step 1 — Query understanding.** The model rewrites the query into one or more search-style sub-queries. *"What's the best CRM for a 5-person startup?"* might become three queries: *"best CRM small team 2026"*, *"CRM under $50/seat reviews"*, and *"CRM comparison startup founders"*.

**Step 2 — Retrieval.** The model fires those sub-queries at a real search index — Bing for ChatGPT/Copilot, Google for Gemini, a custom index for Perplexity. It pulls back the top 10–20 pages.

**Step 3 — Synthesis.** The model reads the retrieved pages, extracts the relevant facts, and writes a single answer that cites a handful of sources.

**You win at AI SEO by being one of the sources cited in step 3.** That requires:

- Showing up in step 2 (classical SEO is still required — you have to rank to be retrieved)
- Being easy to extract from in step 3 (the GEO/AEO/LLMO part)
- Being trustworthy enough that the model picks you over competitors (E-E-A-T, brand mentions, structured data)

## On-page checklist: what to do this week

Start here. Most sites can do all of this in two engineering sprints and see citation lift inside 6–8 weeks.

### 1. Add a TL;DR / Key Takeaways box near the top

Every long-form page should have a block of 5–7 declarative sentences high on the page. LLMs prefer to extract from these because each bullet is a self-contained fact.

Bad: *"This article will cover several aspects of SEO including..."*
Good: *"AI search answers 60% of informational queries before users click."*

The bad version is unextractable. The good version reads like a footnote a model would happily quote.

### 2. Rephrase H2 headings as natural questions

Long-form content with question-shaped headings ranks for AEO surfaces (Google's "People also ask") and trains LLMs to associate your URL with those exact phrasings.

- ❌ "Conversion Rate Optimization Best Practices"
- ✅ "How do you actually improve conversion rates in 2026?"

You can keep the body professional. The heading is what gets indexed and matched against user queries.

### 3. Ship the right JSON-LD schema

Schema is the most underrated GEO lever in 2026. The three schemas that move the needle:

- **\`Article\`** — establishes authorship, date, and topic
- **\`FAQPage\`** — eligible for FAQ-rich results AND extracted by AI Overviews
- **\`BreadcrumbList\`** — helps AI engines understand your site structure
- **\`Organization\` + \`Person\`** — lets models attach your brand to a real entity

Get schema right and you'll show up cited in AI answers your competitors can't, even when their content is stronger on raw SEO metrics.

### 4. Allow AI crawlers in robots.txt

If GPTBot, ClaudeBot, or PerplexityBot can't fetch your pages, you can't be cited from them. Period.

A pragmatic 2026 robots.txt:

\`\`\`
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://yourdomain.com/sitemap.xml

# Explicitly allow AI crawlers
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /
\`\`\`

Yes, allowing crawlers means models train on your content. **In 2026, that's exactly what you want.** Models that have seen your content can quote you. Models that haven't, can't.

### 5. Use named entities, not pronouns

LLMs build a mental graph of entities — companies, products, people, concepts. The more clearly your content names those entities, the more reliably you'll be cited when a user asks about them.

- ❌ "We help startups grow."
- ✅ "Saurabh Bhayana &amp; Team helps founders at seed-to-Series-B SaaS, D2C brands, and professional services firms grow through SEO, paid ads, and AI services."

The second version teaches the model exactly who you are, who you serve, and what you offer. The first version teaches it nothing.

### 6. Cite real public sources

Models trust content that cites things models can verify. Linking out to Wikipedia, primary research, vendor docs, or established trade publications signals to LLMs that your page is a useful node in the citation graph.

This is counter-intuitive: in classic SEO, outbound links were thought to "leak link juice." In LLMO, outbound links to canonical sources help you get cited.

### 7. Write declarative facts, not marketing copy

Compare these two paragraphs:

> "Our platform offers comprehensive solutions designed to help businesses unlock unprecedented growth opportunities through innovative AI-powered insights."

> "The platform analyzes 24 months of customer data, predicts churn risk per account at 78% accuracy, and surfaces the top three retention plays for each at-risk customer."

The first is unextractable. The second contains four discrete facts a model can lift verbatim. **Marketing copy is invisible to AI search. Facts are gold.**

## Off-page in 2026: brand mentions over backlinks

The off-page meta has shifted hard. Here's the new hierarchy of off-page signals, in roughly the order an LLM weighs them:

1. **Wikipedia mentions.** Models rely on Wikipedia heavily. A neutral, well-cited Wikipedia article about your company is the single highest-leverage off-page asset you can build in 2026.
2. **Reddit and Stack Overflow threads.** These are heavily represented in LLM training data. Authentic mentions in threads where people are asking about your category move the needle.
3. **Trade-publication mentions.** Authority sites in your niche. A guest post or interview in a publication LLMs trust beats ten low-quality guest posts.
4. **Listicles in established media.** "Best X tools" articles in publications crawlers trust. These get extracted directly into AI answers.
5. **Backlinks (still matter, less than they did).** Domain authority is no longer the dominant signal it was in 2018, but it still helps you get retrieved in step 2 of the AI search pipeline.

The practical implication: **link-building budgets should shift toward digital PR and authentic community presence, not toward anchor-text backlinks at scale.**

## Measuring AI SEO: what to track

Most analytics tools haven't caught up to AI search. Here's the practical 2026 measurement stack:

- **Brand mention tracking inside LLMs.** Tools like [Otterly.AI](https://otterly.ai/) and [Profound](https://www.tryprofound.com/) ping ChatGPT/Perplexity with your target queries on a schedule and report whether you got cited.
- **Citation share on Perplexity.** Manually run your top 20 money keywords on Perplexity weekly. Track which sources show up. Aim to be in the top 5 cited domains.
- **AI Overviews position tracking.** Tools like Semrush and Ahrefs added AI Overviews monitoring in 2025.
- **Server-log AI crawler hits.** Look for GPTBot, ClaudeBot, PerplexityBot in your access logs. Rising hit counts = your content is being trained on.
- **Assisted conversions.** GA4 doesn't show ChatGPT as a referrer, but you'll see direct traffic spikes when a chat answer mentions you. Watch direct + branded search together.

The single best leading indicator is **brand-mention share in Perplexity for your top 10 money keywords**. If that number's rising, your AI SEO is working. If it's flat for two months, your tactics aren't landing — adjust.

## A 90-day AI SEO sprint plan

Here's what we run with most clients:

**Month 1 — Foundation.** Audit existing content, add schema (Article, FAQPage, BreadcrumbList) sitewide, allow AI crawlers in robots.txt, fix Core Web Vitals if LCP &gt; 2.5s. Identify the top 20 money queries to optimize for.

**Month 2 — Content rework.** Add TL;DR boxes to top 20 pages. Rephrase H2 headings as questions. Add FAQ blocks (5+ questions per page) where missing. Insert real numbers, real examples, real entity names. Cite reputable sources in every long-form piece.

**Month 3 — Off-page push.** Get one Wikipedia mention (if you qualify), three Reddit/Stack Overflow contributions, and one trade-publication interview or guest post. Set up brand-mention tracking inside Perplexity.

After 90 days you'll have a measurable baseline. Most teams see citation share double in months 4–6 if the on-page work was thorough.

## Where to go next

If you're a founder, start with month 1 — schema and crawlers — because those are the changes you can ship without writing new content.

If you're a marketer with a content team, start with month 2 — the rewrite. The compounding gains are bigger and the work is more interesting than schema audits.

If you want a partner who lives in this stack daily, [explore our AI Services offering](/services/ai-services) — we run GEO, AEO, and LLMO sprints for founders in India, the US, UK, and EU. The first 30-minute strategy call is free.
`;

// Replace the BODY placeholder with the actual markdown
(article as any).body = BODY_MARKDOWN;

async function main() {
  const client = new MongoClient(MONGODB_URI!);
  await client.connect();
  const db = client.db(MONGODB_DB);
  const posts = db.collection("posts");

  const existing = await posts.findOne({ slug: SLUG });
  const now = new Date();

  // Look up the admin user so we can attribute the post.
  let authorId: string | undefined;
  let authorName: string = ADMIN_NAME;
  if (ADMIN_EMAIL) {
    const u = await db
      .collection("user")
      .findOne({ email: ADMIN_EMAIL.toLowerCase() });
    if (u) {
      authorId = String(u._id);
      authorName = (u.name as string) || ADMIN_NAME;
    }
  }

  const $set = {
    title: article.title,
    excerpt: article.excerpt,
    body: article.body,
    tag: article.tag,
    readMin: article.readMin,
    focusKeyword: article.focusKeyword,
    keywords: article.keywords,
    keyTakeaways: article.keyTakeaways,
    faqs: article.faqs,
    seoTitle: `${article.title} · Saurabh Bhayana`.slice(0, 70),
    seoDescription:
      "AI search rewrote SEO. Learn how GEO, AEO, and LLMO actually work in 2026 — and exactly how to optimize your site to be cited by ChatGPT, Perplexity, and Google AI Overviews.".slice(
        0,
        160,
      ),
    authorId,
    authorName,
    updatedAt: now,
  };

  if (existing) {
    await posts.updateOne(
      { _id: existing._id },
      {
        $set: {
          ...$set,
          // Preserve the existing publish state and cover image.
        },
      },
    );
    console.log(`✅ Updated existing article: /blog/${SLUG}`);
    console.log(`   Mongo _id: ${existing._id}`);
  } else {
    const inserted = await posts.insertOne({
      _id: new ObjectId(),
      slug: SLUG,
      ...$set,
      coverUrl: null,
      coverAlt: `Editorial cover image for the article: ${article.title}`,
      published: false,
      publishedAt: null,
      createdAt: now,
      social: {},
      inlineImages: [],
      aiMeta: {},
    });
    console.log(`✅ Inserted new article: /blog/${SLUG}`);
    console.log(`   Mongo _id: ${inserted.insertedId}`);
  }

  console.log("");
  console.log("Next steps:");
  console.log("  1. Open /sb-console/posts and click into the article.");
  console.log("  2. Click 'Generate cover' (uses Gemini).");
  console.log("  3. Click 'Suggest keywords', 'Generate FAQs', etc. to enrich.");
  console.log("  4. Click 'Run optimization audit' to see your score.");
  console.log("  5. When happy, toggle Published and Save.");

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
