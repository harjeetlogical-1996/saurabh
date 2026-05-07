/**
 * Seed (or upsert) Article #2: "How to Get Your Brand Mentioned in ChatGPT,
 * Perplexity & Gemini (2026 Playbook)".
 *
 * Run:
 *   npm run seed:article-2
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
  console.error("MONGODB_URI is required in .env.local");
  process.exit(1);
}

const SLUG = "how-to-rank-in-chatgpt-perplexity-gemini";

const article = {
  slug: SLUG,
  title:
    "How to Get Your Brand Mentioned in ChatGPT, Perplexity & Gemini (2026 Playbook)",
  excerpt:
    "Ranking inside an AI answer is the new top-of-funnel. Here's the exact playbook we use to get founders cited inside ChatGPT, Perplexity, and Gemini, what works, what doesn't, and how to measure it.",
  tag: "AI SEO",
  readMin: 14,
  focusKeyword: "rank on chatgpt",
  keywords: [
    "rank on chatgpt",
    "get cited in chatgpt",
    "rank on perplexity",
    "rank on gemini",
    "llmo strategy",
    "ai citation seo",
    "brand mentions in ai",
    "how to appear in chatgpt",
    "perplexity citation share",
    "ai search visibility",
  ],
  keyTakeaways: [
    "ChatGPT, Perplexity, and Gemini cite you because of the corpus they read, not the keywords you stuffed. Brand-mention share matters more than rank.",
    "Each engine pulls from a different index. ChatGPT leans on Bing + training data, Perplexity has its own crawler, Gemini leans on Google plus training. Optimize for all three at once.",
    "The five highest-leverage assets in 2026 are a Wikipedia page, real Reddit/Stack Overflow threads, niche trade-pub mentions, structured comparison pages on your own site, and clean JSON-LD entity schema.",
    "Allow GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, and Google-Extended in robots.txt. Block any one of them and you stop getting cited from that engine.",
    "Track citation share weekly across your top 20 money queries on Perplexity and ChatGPT, this is the only leading indicator of whether your LLMO is working.",
    "The first wins usually show up in 4 to 8 weeks. Wikipedia and trade-pub mentions take 2 to 4 months and produce the durable lift.",
  ],
  faqs: [
    {
      question:
        "Can I directly tell ChatGPT or Perplexity to cite my website?",
      answer:
        "No. There is no submission form, paid placement, or API to force a citation. The only way to be cited is to be present in the data the engine reads at answer time, which means the open web (your site, Wikipedia, Reddit, Stack Overflow, trade publications) and the model's training corpus. You influence what they cite by influencing what they can find.",
    },
    {
      question: "How long does it take to start showing up in AI answers?",
      answer:
        "On a clean technical foundation, the first citations on Perplexity usually appear within 4 to 8 weeks of shipping schema, allowing AI crawlers, and adding declarative content. ChatGPT lift is slower because its retrieval pulls heavily from Bing, plan for 8 to 12 weeks. Gemini citations follow your Google rankings, so they move on the same timeline as classic SEO.",
    },
    {
      question: "Do I need a Wikipedia page to get mentioned in ChatGPT?",
      answer:
        "No, but it is the single highest-leverage asset if you qualify. Wikipedia is over-represented in every major LLM training corpus, so a neutral, well-cited article about your company, founder, or product compounds across every engine. If you do not yet meet notability, focus on Reddit, Stack Overflow, trade-pub mentions, and your own structured pages first.",
    },
    {
      question: "Will allowing AI crawlers cannibalize my Google traffic?",
      answer:
        "In practice, no. Pages cited inside AI Overviews and ChatGPT answers see slight clickthrough drops on simple navigational queries but gains on commercial-intent and comparison queries. The brands cited in the answer are the brands users research next. Blocking GPTBot or PerplexityBot to protect rank is the most expensive mistake we see in 2026.",
    },
    {
      question: "What is the minimum on-page setup to compete for AI citations?",
      answer:
        "Five things: a TL;DR or key-takeaways block in the first 600 pixels, H2 headings written as natural questions, FAQPage and Article JSON-LD schema, named entities (your brand, founder, product) used instead of pronouns, and outbound links to canonical sources (Wikipedia, primary research, vendor docs) inside the body.",
    },
  ],
  body: "",
};

const BODY_MARKDOWN = `## Why a citation in ChatGPT is worth more than a #1 on Google

Ten years ago the goal was a blue link in position 1. In 2026, the goal is a single sentence inside a generated answer that names your brand and links back to you.

That single sentence does three things a position-1 ranking cannot:

1. **It removes every competitor from the page.** A SERP shows ten results. An AI answer paragraph names two or three sources. Cut to the front of the consideration set.
2. **It carries the model's authority, not yours.** When ChatGPT recommends a tool by name, the recommendation reads as a synthesis of the whole web, not a paid placement.
3. **It compounds.** A user asking ChatGPT today, Perplexity tomorrow, and Gemini next week sees your name across all three. That repetition is what trains a buyer to type your domain directly.

If you ship one piece of GEO work this quarter, make it a citation push, not another long-form post hoping for a Google ranking that may never click again.

This article is the playbook we use with founders at [Saurabh Bhayana &amp; Team](/services). Read it end to end and you will leave with a concrete 90-day plan, not theory.

## How ChatGPT, Perplexity, and Gemini actually pick a citation

The three engines look similar from the outside. Underneath, they read the web differently. Optimizing for all three at once is the entire game.

### ChatGPT

When ChatGPT runs a live web search (the default for most logged-in users since 2025), it sends sub-queries to Bing's index, fetches the top results, and synthesizes an answer with three to six citations. It also draws on what it learned during training, which is heavily weighted toward Wikipedia, Reddit, Stack Overflow, GitHub, news archives, and high-traffic English-language blogs.

What this means for you: rank on Bing for your money keywords, build mentions on the corpora ChatGPT trained on, and write content the model can extract verbatim.

### Perplexity

Perplexity runs its own crawler (PerplexityBot) and maintains an independent index. Citations are inline in the answer and clickable. The engine biases toward recently-updated, source-of-truth pages, comparison content, and threads on community sites like Reddit.

What this means for you: get crawled by PerplexityBot, keep pages fresh (update dates matter), and cultivate authentic Reddit and niche community mentions.

### Gemini

Gemini sits on top of Google's index and cites pages the way AI Overviews do, with brand-name pulls and direct quotes from high-authority sources. It is the most "classical SEO" of the three: rank well on Google, ship structured data, earn topical authority, and you appear inside Gemini answers.

What this means for you: do not abandon classical SEO. Gemini is still 30 to 40 percent of the AI search opportunity for buyers in India, the US, and Europe.

The practical implication: any piece of content you ship should be optimized for all three engines simultaneously. The on-page work is identical. The off-page work splits across Wikipedia, Reddit, and trade pubs.

## The five assets that drive 80 percent of AI citations

After auditing more than 200 brand-mention reports across ChatGPT and Perplexity in the last 12 months, the same five asset classes do most of the work.

### 1. A Wikipedia page (or a section in one)

Wikipedia is the single most over-represented domain in every LLM training corpus. A neutral, well-cited article about your company, founder, or product compounds across every engine, in every language, forever.

You cannot just write one. Wikipedia requires "notability," which usually means independent coverage in established publications. The realistic path:

- Earn 2 to 5 mentions in trade publications (TechCrunch, The Verge, niche industry magazines, regional business press) over 6 to 12 months.
- Have a community editor draft a stub. Editing your own article is allowed but carefully scrutinized.
- Cite every claim with independent sources. Marketing copy gets reverted within hours.

If a full company article is out of reach, target a section inside an existing relevant article (for example, a "Companies" subsection of a niche topic page).

### 2. Real Reddit and Stack Overflow threads

Reddit and Stack Overflow are heavily weighted in LLM training data, and Perplexity actively pulls from both at answer time. Authentic mentions inside the right subreddits, threads where your category is being discussed, move citation share faster than almost any other off-page tactic.

Rules of engagement:

- **Be a real account.** Karma, history, and a real interest in the subreddit. Drive-by promotional posts get banned and erased.
- **Answer the question, then mention.** Lead with substance. Mention your tool only when it is genuinely the best answer to the specific question.
- **Niche over volume.** A single comment in r/SaaS or r/Entrepreneur with 30 upvotes outweighs 50 comments in low-traffic generic subs.

### 3. Trade-publication mentions and listicles

"Best X tools" articles and topic explainers in established trade publications are gold. AI engines treat these as authoritative sources for category questions. A single mention inside a Forbes Advisor or G2 listicle can drive citations for years.

The realistic plays:

- Pitch yourself as a quoted expert (HARO replacement: Featured.com, Qwoted, ResponseSource).
- Run a contributed article in a smaller trade pub with editorial standards (better for E-E-A-T than mass guest-posting).
- Reach out to writers who already cover your category and offer original data, screenshots, or a fast quote.

### 4. Structured comparison and "alternative to" pages on your own site

Engines disproportionately cite pages that directly answer comparison and "alternative to" queries. These are queries with high commercial intent and very thin content competition.

Examples that work:

- "Tool X vs Tool Y for use case Z"
- "Alternatives to Tool X for [audience]"
- "Best [category] under [price]"

Each comparison page should include a TL;DR, a feature-by-feature table, and a named-entity-rich verdict paragraph. That last paragraph is what gets quoted verbatim inside ChatGPT and Perplexity answers.

### 5. Clean JSON-LD entity schema

Most sites still ship Article schema only. The pages that actually get cited in 2026 also ship Organization, Person, FAQPage, BreadcrumbList, and (for product brands) Product schema. The schema teaches the engine which named entity owns which piece of content, which is exactly what an LLM needs to attribute a citation cleanly.

We covered the technical setup in [The Complete Guide to AI SEO in 2026](/ai-seo-2026-geo-aeo-llmo-guide). If you have not shipped schema sitewide yet, do that first.

## On-page tactics that actually move citation share

Once the off-page foundation is in place, the on-page work is what tips marginal queries from "almost cited" to "cited every time."

### Write the first 600 pixels for the model, not the user

Models extract aggressively from the first visible block of every page. Your TL;DR or key-takeaways block should contain 5 to 7 declarative sentences with the named entities and specific numbers you want quoted.

Bad: *"This guide covers everything you need to know about CRM selection."*
Good: *"In 2026, ${{}}50 per seat is the median entry price for SaaS CRMs targeted at 5- to 25-person teams. The three most-cited tools on Perplexity for this segment are HubSpot, Pipedrive, and Attio."*

The bad version is invisible. The good version reads like a quote a model would happily lift.

### Phrase H2s as natural questions

Every long-form page should have at least three question-shaped H2s. They train models to associate your URL with the exact phrasings users type into chat interfaces.

- Replace "Pricing Strategy" with "How should you price a SaaS product in 2026?"
- Replace "Onboarding Flow" with "What does a high-converting SaaS onboarding flow look like?"

Body copy stays professional. Only the H2 changes.

### Insert real numbers, named tools, named people

The single best predictor of whether a paragraph gets quoted is the density of named entities and specific numbers inside it. Compare:

> "We help businesses grow faster with smarter analytics."

> "We helped a 14-person Indian D2C brand cut their cost-per-acquisition from ₹620 to ₹310 in 11 weeks by rebuilding their Meta Ads attribution on top of Triple Whale and a custom server-side GA4 layer."

The second sentence has eight named entities and four numbers. It is exactly the kind of sentence ChatGPT loves to quote when someone asks about D2C performance marketing in India.

### Cite real sources outbound

Counter to old-school SEO instincts, outbound links to canonical sources (Wikipedia, primary research, vendor docs) help your page get cited. Models trust pages that cite verifiable things. The link graph of trustworthy sources is part of how your page gets evaluated.

Two to four high-quality outbound links per long-form post is the sweet spot.

### Update your dates

Perplexity especially weights recency. Pages last updated more than 18 months ago lose citation share to fresher content. Update the publish or last-modified date when you genuinely refresh the content, do not fake it, but do not let evergreen pieces rot either.

## A robots.txt that gets you cited everywhere

If you remember nothing else from this article, fix this today. Block any one of these crawlers and you stop being cited inside that engine. Period.

A pragmatic robots.txt for 2026:

\`\`\`
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://yourdomain.com/sitemap.xml

# Allow every major AI crawler explicitly
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

User-agent: anthropic-ai
Allow: /

User-agent: cohere-ai
Allow: /
\`\`\`

Yes, this means models train on your content. In 2026 that is exactly what you want, models that have read your content can quote you, models that have not, cannot.

The single exception: behind-login content (dashboards, admin, paid tools). Disallow those. Public marketing pages and the blog should be fully open.

## How to measure citation share without losing your weekend

Most analytics still ignore AI traffic. Until tooling catches up, run this lightweight stack:

- **Manual weekly check.** Pick your top 20 money queries. Run each on Perplexity and ChatGPT. Note whether you got cited and which competitors were cited instead. Spreadsheet it. This takes 45 minutes a week and is the single best leading indicator.
- **Brand-mention monitoring.** Tools like [Otterly.AI](https://otterly.ai/) and [Profound](https://www.tryprofound.com/) automate the manual check. Worth the spend once you have at least 20 tracked queries.
- **Server-log AI crawler hits.** Filter your access logs for GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot. Rising hit counts confirm your content is being read.
- **Direct + branded search lift.** When chat answers cite you, you see direct traffic and branded search rise together, even though there is no referrer. Watch the joint trend, not either alone.
- **Assisted conversions.** Tag any "How did you hear about us?" form field. ChatGPT and Perplexity mentions show up here weeks before they show up in any analytics platform.

The single best leading indicator: **citation share on Perplexity for your top 10 money queries**. If that number is rising week over week, your LLMO is working. Flat for two months means tactics are not landing, adjust.

## A 90-day citation push you can actually run

Here is the sequence we run with most clients. It works because every piece reinforces the next.

**Days 1 to 14 — Technical foundation.**
Allow every AI crawler in robots.txt. Ship JSON-LD for Article, FAQPage, BreadcrumbList, Organization, Person sitewide. Add TL;DR boxes to your top 20 pages. Re-check Core Web Vitals and fix anything with LCP over 2.5 seconds.

**Days 15 to 45 — Content rework.**
Rephrase 20 H2 headings as natural questions. Rewrite the first 600 pixels of those pages with named entities and specific numbers. Add 5 question-and-answer FAQ blocks per page where missing. Insert 2 to 4 outbound links to canonical sources per post.

**Days 30 to 90 — Off-page push (parallel track).**
Set up a Reddit account and post 1 substantive comment per week in 3 relevant subreddits. Pitch 5 trade publications with original data or a contributed angle. Identify 2 Wikipedia gaps you might qualify for and start collecting independent citations.

**Days 75 to 90 — Measure and iterate.**
Run your manual citation check weekly. Identify the 3 queries closest to citation. Targeted content updates on those exact queries usually flip them within 14 days.

After 90 days you will have a measurable baseline and at least 3 to 5 queries where you are reliably cited across ChatGPT and Perplexity. Most teams see citation share double again in months 4 to 6 if the off-page work compounds.

## Where to go next

If you have not yet shipped schema and allowed AI crawlers, start there. Nothing else moves citations until that foundation is in place, and we covered the exact setup in [The Complete Guide to AI SEO in 2026](/ai-seo-2026-geo-aeo-llmo-guide).

If your foundation is solid and you want a dedicated citation push, [explore our AI Services offering](/services/ai-services). We run 90-day LLMO sprints for founders in India, the US, UK, and EU. The first 30-minute strategy call is free.
`;

(article as { body: string }).body = BODY_MARKDOWN;

async function main() {
  const client = new MongoClient(MONGODB_URI!);
  await client.connect();
  const db = client.db(MONGODB_DB);
  const posts = db.collection("posts");

  const existing = await posts.findOne({ slug: SLUG });
  const now = new Date();

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
      "The exact 2026 playbook to get your brand cited inside ChatGPT, Perplexity, and Gemini. Five high-leverage assets, the right robots.txt, and a 90-day plan.".slice(
        0,
        160,
      ),
    authorId,
    authorName,
    updatedAt: now,
  };

  if (existing) {
    await posts.updateOne({ _id: existing._id }, { $set });
    console.log(`Updated existing article: /${SLUG}`);
    console.log(`   Mongo _id: ${existing._id}`);
  } else {
    const inserted = await posts.insertOne({
      _id: new ObjectId(),
      slug: SLUG,
      ...$set,
      coverUrl: null,
      coverAlt: `Editorial cover image for the article: ${article.title}`,
      published: true,
      publishedAt: now,
      createdAt: now,
      social: {},
      inlineImages: [],
      aiMeta: {},
    });
    console.log(`Inserted new article: /${SLUG}`);
    console.log(`   Mongo _id: ${inserted.insertedId}`);
  }

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
