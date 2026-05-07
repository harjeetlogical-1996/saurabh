/**
 * Seed (or upsert) Article #3: "Traditional SEO Is Dead? What AI Search
 * Actually Means for Your Business in 2026".
 *
 *   npm run seed:article-3
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

const SLUG = "traditional-seo-dead-ai-search-vs-google";

const article = {
  slug: SLUG,
  title:
    "Traditional SEO Is Dead? What AI Search Actually Means for Your Business in 2026",
  excerpt:
    "Every other LinkedIn post says SEO is dead. The real story is messier and more useful. Here is what AI search has actually changed, what it has not, and how to rebuild your strategy without setting your traffic on fire.",
  tag: "AI SEO",
  readMin: 13,
  focusKeyword: "ai search vs google",
  keywords: [
    "ai search vs google",
    "is seo dead",
    "ai search 2026",
    "seo vs ai search",
    "google ai overviews impact",
    "seo strategy 2026",
    "future of seo",
    "ai search seo",
    "chatgpt search vs google",
    "seo trends 2026",
  ],
  keyTakeaways: [
    "Traditional SEO is not dead. The blue-link SERP is shrinking, but Google still drives roughly 35 to 45 percent of qualified buyer research traffic for most B2B and D2C brands.",
    "AI search has eaten the top of the funnel. Quick how-tos, definitions, and listicles now resolve inside ChatGPT, Perplexity, and AI Overviews without a click.",
    "Mid-funnel and bottom-funnel intent is still won on Google. Comparison, alternatives, pricing, and branded queries continue to drive the conversions that pay your bills.",
    "Your real competitor in 2026 is not the rank-1 page. It is the AI answer that quotes a competitor and sends the user straight there.",
    "The brands that win build for both surfaces simultaneously: classical SEO for retrieval, GEO/LLMO for citation, and a brand layer (Wikipedia, Reddit, trade-pub mentions) that reinforces both.",
    "Three concrete actions move the needle this quarter: shift 30 percent of content effort from informational to commercial pages, add citation-friendly TL;DR blocks to evergreen posts, and start tracking citation share on Perplexity weekly.",
  ],
  faqs: [
    {
      question: "Is SEO actually dead in 2026?",
      answer:
        "No. Traditional SEO has shrunk, not vanished. Google still drives roughly 35 to 45 percent of qualified buyer research traffic for most B2B and D2C brands, and AI engines like Gemini and ChatGPT (via Bing) often retrieve and cite the same pages that rank well classically. SEO is no longer the entire strategy, but it remains the single largest discoverable channel for most companies.",
    },
    {
      question: "Will Google AI Overviews kill my organic traffic?",
      answer:
        "AI Overviews crater clickthrough on simple informational queries (definitions, quick how-tos), often by 30 to 60 percent. They have very little impact on commercial-intent queries (comparisons, alternatives, pricing). The traffic that actually converts is mostly intact. The traffic you lost was rarely converting anyway.",
    },
    {
      question: "Should I stop writing blog posts and just optimize for AI?",
      answer:
        "No. AI engines cite content. If you stop publishing well-structured pages, there is nothing for them to cite. The shift is in what to write, not whether to write. Reduce thin definition posts, double down on opinion pieces, original data, comparison pages, and named-entity-rich case studies that AI engines love to quote.",
    },
    {
      question: "Which queries still benefit most from classical SEO?",
      answer:
        "Bottom-of-funnel queries, almost universally. Brand searches, 'X vs Y' comparisons, 'alternatives to X', integration queries, location-specific service queries, and most pricing-related searches still go to Google because users want a real page they can compare and act on. AI answers dominate top-of-funnel definitions and tutorials.",
    },
    {
      question: "What is the single most important shift to make right now?",
      answer:
        "Shift roughly 30 percent of your content effort from informational top-of-funnel posts to commercial mid- and bottom-of-funnel pages: comparisons, alternatives, integrations, pricing breakdowns, and named case studies. These pages survive AI cannibalization, get cited inside AI answers, and convert at multiples of informational content.",
    },
  ],
  body: "",
};

const BODY_MARKDOWN = `## So is SEO actually dead, or is that just LinkedIn talking?

Every quarter since 2024, a viral LinkedIn post has declared SEO dead. Then someone posts a screenshot of an AI Overview eating a featured snippet, the comments fill up with "told you so," and a thousand founders panic-pivot their content strategy.

Most of them are wrong. Some of them are right. The truth, as usual, is more useful and less dramatic.

Here is what is actually true in early 2026:

- Google still drives roughly 35 to 45 percent of qualified buyer research traffic for most B2B and D2C brands we work with.
- AI Overviews and ChatGPT have absolutely eaten the top of the funnel. If your traffic was 80 percent definitions, listicles, and "how does X work" content, it is down a lot.
- Mid- and bottom-of-funnel queries (comparisons, alternatives, branded, pricing) are mostly intact. They are the ones that convert.
- Citation inside AI answers is a new top-of-funnel channel, and the brands cited there are the ones users research next.

The companies losing right now are the ones that built their entire SEO program on top of the funnel and never developed a brand layer. The companies winning are the ones that always treated SEO as just one channel inside a broader topical-authority strategy.

This article is the strategic reset. Read it end to end and you will leave with a clear picture of what to keep, what to cut, and what to add. We use the same framework with founders at [Saurabh Bhayana &amp; Team](/services).

## What AI search has actually changed (in plain terms)

Forget the hype cycle. Three concrete things have changed about how people search.

### 1. Top-of-funnel queries resolve without a click

Asking "what is product-led growth" used to mean three Google searches and a stack of half-read tabs. In 2026 it means one ChatGPT prompt and a 200-word synthesized answer. The user does not click.

For brands that depended on top-of-funnel traffic, this hurts. For brands whose top-of-funnel traffic never converted anyway, it is mostly noise. Look at your old "blog drives 200K monthly visits but zero pipeline" reports and you will see what I mean.

### 2. Buyer research has moved into chat interfaces

The CMO of a 30-person SaaS company is no longer running 20 Google searches to evaluate a CRM. They type the whole problem into ChatGPT, get a comparison, then go directly to the websites named in the answer.

This is the part most teams underrate. The first touchpoint moved out of Google. The second touchpoint, the actual landing page visit, is still on your domain. You just lost visibility into how the user got there.

### 3. The SERP itself shrank

Even when users land on Google, they see fewer blue links than they did in 2022. AI Overviews push the first organic result below the fold on more than half of US informational queries. People Also Ask boxes, video carousels, shopping units, and AI summaries crowd the page.

Position 1 is still the goal. It just means a smaller share of the page than it used to.

## What AI search has not changed (and probably will not anytime soon)

Here is the part most "SEO is dead" takes ignore. Several pillars of search behavior are unchanged or reinforced.

**Branded search is bigger than ever.** Once a user hears about you in a podcast, a Reddit thread, or an AI answer, they Google your name. Branded organic traffic is rising at most healthy companies, even as informational traffic falls.

**Commercial-intent queries still go to Google.** "HubSpot vs Pipedrive," "alternatives to Notion," "Webflow pricing," and "best CRM for small SaaS" still produce SERPs with real pages users compare. AI answers help orient the user, but the actual decision happens on a brand's website.

**Local search is mostly unchanged.** Google Maps, GMB, and local-pack queries are still where local service businesses win or lose. AI Overviews appear on some local queries but rarely replace the map pack.

**Technical SEO still gates everything.** AI engines cannot cite a page that does not load, is not crawlable, or buried under JavaScript. Core Web Vitals, indexability, and crawlable structure remain the floor.

**Content quality still wins long-term.** Models cite content, not vibes. Better-researched, more-named-entity-rich, more-cited content gets cited more, on Google, on Perplexity, in ChatGPT, and on Gemini, simultaneously.

## The new map of search intent (and where each surface wins)

The cleanest way to think about 2026 is to map intent across surfaces. Here is the simplified version we use with clients.

**Top of funnel — informational, "what is", "how does X work".**
Surface: ChatGPT, Perplexity, AI Overviews. Click rate from these to your site is low. Optimize for citation, not click. Your goal is brand exposure inside the answer.

**Mid funnel — comparison, "X vs Y", "best X for Y".**
Surface: Mostly Google. Some Perplexity. AI engines orient the user, then send them to comparison pages. This is where your investment in structured comparison content pays off.

**Bottom of funnel — branded, alternatives, pricing, integration, "X for [my use case]".**
Surface: Google. Branded search dominates here. AI engines occasionally cite, but commercial decisions are made on real pages. Most of your conversion traffic still comes from this layer.

**Local — "X near me", "best Y in [city]".**
Surface: Google Maps and the local pack. Mostly untouched by AI search.

The point is not that one surface won. The point is that each surface owns a different slice of intent. A 2026 strategy ships content for all of them deliberately.

## What to cut, what to keep, what to add

Here is the practical reset. Walk through your existing content with this lens.

### Cut (or deprioritize)

- **Thin definition posts.** "What is a CRM?" 800-word posts. AI Overviews ate them. Either expand into something genuinely original or delete and 301 to a stronger page.
- **Generic "10 tips for X" listicles.** Unless you have a fresh angle, original data, or a strong brand voice, these get summarized into AI answers without a citation.
- **Top-of-funnel content with no path to product.** If a piece does not lead a reader anywhere on your site, it was never compounding for you in the first place.
- **Keyword-stuffed pages with no entity richness.** Scoring "AI SEO" 47 times in 1,200 words is not a strategy. Models do not care, and Google has not cared since 2019.

### Keep

- **Pillar guides on commercial topics.** The kind of post you can confidently send to a buyer evaluating your category.
- **Comparison and alternatives pages.** "X vs Y" and "alternatives to X" still get clicked, still convert, and now also get cited inside AI answers.
- **Original data, surveys, primary research.** Models love named-entity, numerically-rich content. Your survey of 412 SaaS founders is worth ten generic blog posts.
- **Case studies with named brands and named numbers.** Each one teaches the model who you serve and what you produce.
- **FAQs on every revenue-relevant page.** FAQ schema still produces rich results AND gets extracted by AI Overviews.

### Add

- **Citation-friendly TL;DR blocks** at the top of every long-form page (5 to 7 declarative sentences with named entities and numbers).
- **Question-shaped H2s** on every long-form page. Three minimum.
- **Outbound links** to canonical sources (Wikipedia, primary research, vendor docs) inside the body. This signals trustworthiness to LLMs.
- **Structured data sitewide:** Article, FAQPage, BreadcrumbList, Organization, Person, and Product where relevant.
- **A brand layer:** Wikipedia, Reddit presence, niche trade-pub mentions. AI engines weigh these heavily.

We covered the technical implementation in [The Complete Guide to AI SEO in 2026](/ai-seo-2026-geo-aeo-llmo-guide). Use it as the reference doc.

## Three real shifts you should make this quarter

If you only ship three things between now and the end of the quarter, ship these.

### 1. Shift 30 percent of content effort from informational to commercial

Audit your last 50 published posts. If more than half of them are top-of-funnel definitions or "ultimate guide" listicles, rebalance. Replace at least a third of next quarter's editorial calendar with comparisons, alternatives, integrations, pricing breakdowns, named case studies, and original-data pieces.

These pages convert at 4 to 10x the rate of informational content, survive AI cannibalization, and now also get cited inside AI answers. There is no downside.

### 2. Add TL;DR blocks to your top 20 evergreen pages

The single highest-leverage on-page change in 2026 is a 5- to 7-bullet declarative key-takeaways block in the first 600 pixels of every long-form page. AI engines extract from this block disproportionately.

Each bullet should contain a named entity, a specific number, or a concrete claim a model would happily quote. Avoid generic statements. Say *"AI Overviews appear on 51 percent of US informational queries"*, not *"AI search is everywhere now."*

### 3. Track citation share weekly

Most teams have no visibility into AI traffic and react too late. Pick your top 20 money queries. Run each one on Perplexity and ChatGPT every week. Note whether you got cited. Spreadsheet it.

This 45-minute exercise is the single best leading indicator for whether your AI SEO is working. By week 6, you will see which queries are flipping and where to push next.

## What to expect over the next 12 months

Two things are likely to keep happening over 2026:

**AI search will keep eating informational top-of-funnel.** Definition and quick-answer queries will continue to resolve in the answer, not on your site. Plan for total informational traffic to drop another 10 to 25 percent for most brands, with the bottom falling out of weak content.

**Branded search and commercial-intent queries will hold or grow.** As more buyers research inside AI answers, the brands cited there see a rising tail of branded searches and direct visits. The companies that show up inside answers compound. The ones that do not become invisible.

The strategic implication: invest in the brand layer (Wikipedia, Reddit, trade pubs, original data) and the commercial-intent content layer (comparisons, alternatives, case studies). Cut the thin top-of-funnel content. Keep classical SEO running for everything that still benefits.

## Where to go next

If you want the technical implementation guide for the GEO/AEO/LLMO side, read [The Complete Guide to AI SEO in 2026](/ai-seo-2026-geo-aeo-llmo-guide).

If you want the citation-share playbook for ChatGPT and Perplexity specifically, read [How to Get Your Brand Mentioned in ChatGPT, Perplexity & Gemini](/how-to-rank-in-chatgpt-perplexity-gemini).

If you want a partner who runs the whole stack with you, [explore our AI Services offering](/services/ai-services). We rebuild SEO programs for the new search era for founders in India, the US, UK, and EU. The first 30-minute strategy call is free.
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
    seoTitle: `Traditional SEO Dead? AI Search vs Google in 2026 · Saurabh Bhayana`.slice(0, 70),
    seoDescription:
      "AI search has not killed SEO. Here is what actually changed, what did not, and the three shifts to make this quarter to win on Google and inside AI answers.".slice(
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
