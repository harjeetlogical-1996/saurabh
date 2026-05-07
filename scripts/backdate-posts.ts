/**
 * Backdate published posts so they look like a real, paced publishing
 * cadence instead of "all dropped today."
 *
 *   npm run backdate:posts
 *
 * Edit the schedule below if you want to adjust dates later.
 */
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "saurabh";

if (!MONGODB_URI) {
  console.error("MONGODB_URI required");
  process.exit(1);
}

// Times are IST (UTC+05:30). Spread across weekday business hours.
const SCHEDULE: Array<{ slug: string; iso: string }> = [
  {
    slug: "ai-vs-human-content-what-ranks-on-google-2026",
    iso: "2026-02-12T10:42:00+05:30",
  },
  {
    slug: "how-to-build-ai-chatbot-for-website-no-code",
    iso: "2026-03-02T15:18:00+05:30",
  },
  {
    slug: "best-ai-marketing-tools-2026",
    iso: "2026-03-19T11:07:00+05:30",
  },
  {
    slug: "traditional-seo-dead-ai-search-vs-google",
    iso: "2026-04-08T09:34:00+05:30",
  },
  {
    slug: "how-to-rank-in-chatgpt-perplexity-gemini",
    iso: "2026-04-22T16:21:00+05:30",
  },
  {
    slug: "ai-seo-2026-geo-aeo-llmo-guide",
    iso: "2026-05-03T12:48:00+05:30",
  },
];

async function main() {
  const client = new MongoClient(MONGODB_URI!);
  await client.connect();
  const posts = client.db(MONGODB_DB).collection("posts");

  for (const { slug, iso } of SCHEDULE) {
    const date = new Date(iso);
    const r = await posts.updateOne(
      { slug },
      {
        $set: {
          publishedAt: date,
          createdAt: date,
          updatedAt: date,
        },
      },
    );
    console.log(
      `${r.matchedCount ? "ok " : "??? "} ${slug.padEnd(50)} -> ${date.toISOString()}`,
    );
  }

  await client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
