import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BgFx } from "@/components/BgFx";
import { Reveal } from "@/components/Reveal";
import { getPublishedPosts } from "@/lib/content/posts";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog · Insights on web, growth & AI marketing",
  description:
    "Field notes on website development, digital marketing, SEO, GEO/AEO/LLMO, and AI growth systems. Honest, practical, and written for founders.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog · Saurabh Bhayana",
    description:
      "Field notes on website development, digital marketing, SEO, GEO/AEO/LLMO, and AI growth systems.",
    url: `${site.url}/blog`,
  },
};

function fmtDate(d?: Date) {
  if (!d) return "";
  return d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts(50);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <header className="relative overflow-hidden bg-[var(--bg)] border-b border-[var(--line)]">
          <div aria-hidden className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-grid animate-drift" />
          </div>
          <BgFx variant="hero" />
          <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-24 pb-16 md:pt-32">
            <Reveal className="max-w-[760px]">
              <div className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.24em] text-[var(--accent)] font-mono">
                <span className="h-px w-8 bg-[var(--accent)]" />
                Field notes
              </div>
              <h1 className="mt-5 font-display text-[40px] md:text-[60px] leading-[1.05] tracking-[-0.04em]">
                Insights on web, growth &amp;{" "}
                <span className="text-[var(--accent)]">AI marketing.</span>
              </h1>
              <p className="mt-5 text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
                Long-form, no fluff. Tactics, post-mortems, and frameworks we
                actually use with clients in India, the US, UK, and EU.
              </p>
            </Reveal>
          </div>
        </header>

        <section className="bg-[var(--bg)] border-b border-[var(--line)]">
          <div className="max-w-[1240px] mx-auto px-6 py-16 md:py-24">
            {posts.length === 0 ? (
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-10 text-center">
                <div className="text-[14px] text-[var(--muted)]">
                  We&apos;re polishing a few articles. Subscribe in the footer
                  to be notified when the first one drops.
                </div>
              </div>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((p, i) => (
                  <li key={p._id}>
                    <Reveal delay={(i % 3) * 80}>
                      <Link
                        href={`/${p.slug}`}
                        className="group block h-full bg-[var(--surface)] border border-[var(--line)] rounded-2xl overflow-hidden hover:border-[var(--accent)] hover:-translate-y-1 transition-all"
                      >
                        <div className="relative aspect-[16/10] bg-black overflow-hidden">
                          {p.coverUrl ? (
                            <Image
                              src={p.coverUrl}
                              alt={p.coverAlt ?? `Cover image for: ${p.title}`}
                              fill
                              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                              className="object-cover grayscale opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105 group-hover:grayscale-0"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-grid opacity-30" />
                          )}
                          <div className="absolute inset-0 bg-black/30" />
                          {p.tag && (
                            <div className="absolute left-3 top-3">
                              <span className="inline-flex font-mono bg-black/60 backdrop-blur text-[var(--accent)] text-[11px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-[var(--accent)]/40">
                                {p.tag}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
                            <span>{fmtDate(p.publishedAt)}</span>
                            <span className="h-px w-3 bg-[var(--line)]" />
                            <span>{p.readMin} min read</span>
                          </div>
                          <h2 className="mt-4 font-display text-[16px] md:text-[18px] leading-[1.35] tracking-[-0.015em] text-white">
                            {p.title}
                          </h2>
                          {p.excerpt && (
                            <p className="mt-3 text-[13px] leading-[1.65] text-[var(--muted)] line-clamp-3">
                              {p.excerpt}
                            </p>
                          )}
                          <div className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--accent)] border-b border-[var(--accent)] pb-0.5 group-hover:gap-2.5 transition-all">
                            Read article <span>→</span>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
