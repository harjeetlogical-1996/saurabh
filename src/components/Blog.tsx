import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { getPublishedPosts, type PostListItem } from "@/lib/content/posts";

/** Static fallback shown only when the DB has no published posts yet. */
const placeholderPosts: ReadonlyArray<{
  slug: string;
  tag: string;
  date: string;
  read: string;
  title: string;
  image: string;
}> = [
  {
    slug: "geo-aeo-llmo",
    tag: "AI SEO",
    date: "12 Apr 2026",
    read: "9 min",
    title: "GEO, AEO & LLMO explained: how to rank in ChatGPT and Perplexity.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=900&fit=crop&auto=format&q=70",
  },
  {
    slug: "stack-2026",
    tag: "Web Development",
    date: "28 Mar 2026",
    read: "12 min",
    title: "Webflow vs Next.js vs WordPress in 2026: which should you pick?",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=900&fit=crop&auto=format&q=70",
  },
  {
    slug: "pmax-advantage-plus",
    tag: "Paid Ads",
    date: "10 Mar 2026",
    read: "7 min",
    title: "Google Performance Max + Meta Advantage+: the honest 2026 playbook.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop&auto=format&q=70",
  },
];

function fmtShortDate(d?: Date) {
  if (!d) return "";
  return d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export async function Blog() {
  const dbPosts = await getPublishedPosts(3);

  return (
    <section
      id="blog"
      className="border-b border-[var(--line)] bg-[var(--bg)] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-6 py-28 md:py-40">
        <Reveal className="flex items-end justify-between gap-8 flex-wrap">
          <div>
            <Eyebrow>Field notes</Eyebrow>
            <h2 className="mt-4 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.03em]">
              Insights on web, growth &amp;{" "}
              <span className="text-[var(--accent)]">AI marketing.</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex h-11 items-center gap-1.5 px-5 rounded-full border border-[var(--line)] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[14px] font-medium"
          >
            All articles →
          </Link>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
          {dbPosts.length > 0
            ? dbPosts.slice(0, 3).map((p, i) => (
                <Reveal key={p._id} delay={i * 110}>
                  <DbCard post={p} />
                </Reveal>
              ))
            : placeholderPosts.map((p, i) => (
                <Reveal key={p.title} delay={i * 110}>
                  <PlaceholderCard p={p} />
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}

function DbCard({ post }: { post: PostListItem }) {
  return (
    <Link
      href={`/${post.slug}`}
      className="group block h-full bg-[var(--surface)] border border-[var(--line)] rounded-2xl overflow-hidden hover:border-[var(--accent)] hover:-translate-y-1 transition-all"
    >
      <div className="relative aspect-[16/10] bg-black overflow-hidden">
        {post.coverUrl ? (
          <Image
            src={post.coverUrl}
            alt={post.coverAlt ?? `Cover image for: ${post.title}`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover grayscale opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <div className="absolute inset-0 bg-grid opacity-30" />
        )}
        <div className="absolute inset-0 bg-black/30" />
        {post.tag && (
          <div className="absolute left-3 top-3">
            <span className="inline-flex font-mono bg-black/60 backdrop-blur text-[var(--accent)] text-[11px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-[var(--accent)]/40">
              {post.tag}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
          <span>{fmtShortDate(post.publishedAt)}</span>
          <span className="h-px w-3 bg-[var(--line)]" />
          <span>{post.readMin} min read</span>
        </div>
        <h3 className="mt-4 font-display text-[16px] md:text-[18px] leading-[1.35] tracking-[-0.015em] text-white">
          {post.title}
        </h3>
        <div className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--accent)] border-b border-[var(--accent)] pb-0.5 group-hover:gap-2.5 transition-all">
          Read article <span>→</span>
        </div>
      </div>
    </Link>
  );
}

function PlaceholderCard({
  p,
}: {
  p: {
    slug: string;
    tag: string;
    date: string;
    read: string;
    title: string;
    image: string;
  };
}) {
  return (
    <Link
      href="/blog"
      className="group block h-full bg-[var(--surface)] border border-[var(--line)] rounded-2xl overflow-hidden hover:border-[var(--accent)] hover:-translate-y-1 transition-all"
    >
      <div className="relative aspect-[16/10] bg-black overflow-hidden">
        <Image
          src={p.image}
          alt={`Cover image: ${p.title}`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover grayscale opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute left-3 top-3">
          <span className="inline-flex font-mono bg-black/60 backdrop-blur text-[var(--accent)] text-[11px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-[var(--accent)]/40">
            {p.tag}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
          <span>{p.date}</span>
          <span className="h-px w-3 bg-[var(--line)]" />
          <span>{p.read} read</span>
        </div>
        <h3 className="mt-4 font-display text-[16px] md:text-[18px] leading-[1.35] tracking-[-0.015em] text-white">
          {p.title}
        </h3>
        <div className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--accent)] border-b border-[var(--accent)] pb-0.5 group-hover:gap-2.5 transition-all">
          Read article <span>→</span>
        </div>
      </div>
    </Link>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.24em] text-[var(--accent)] font-mono">
      <span className="h-px w-8 bg-[var(--accent)]" />
      {children}
    </div>
  );
}
