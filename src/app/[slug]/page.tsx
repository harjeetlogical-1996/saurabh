import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BgFx } from "@/components/BgFx";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { getPostBySlug } from "@/lib/content/posts";
import { renderMarkdown } from "@/lib/markdown";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

type Params = { slug: string };

/**
 * Slugs that already belong to other top-level routes. We refuse them at the
 * post lookup level so a post slug can never shadow a real page.
 */
const RESERVED_SLUGS = new Set([
  "api",
  "blog",
  "contact",
  "dashboard",
  "favicon.ico",
  "login",
  "robots.txt",
  "sb-console",
  "services",
  "signup",
  "sitemap.xml",
  "technologies",
  "v2",
]);

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) {
    return { title: "Not found", robots: { index: false } };
  }
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found", robots: { index: false } };

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || "";
  const canonical = `/${post.slug}`;
  const ogImg = post.seoOgImage || post.coverUrl;

  return {
    title,
    description,
    keywords: [
      ...(post.focusKeyword ? [post.focusKeyword] : []),
      ...(post.keywords ?? []),
    ],
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${site.url}${canonical}`,
      images: ogImg ? [{ url: ogImg, alt: post.coverAlt ?? title }] : undefined,
      publishedTime: post.publishedAt
        ? new Date(post.publishedAt).toISOString()
        : undefined,
      modifiedTime: post.updatedAt
        ? new Date(post.updatedAt).toISOString()
        : undefined,
      authors: post.authorName ? [post.authorName] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImg ? [ogImg] : undefined,
    },
  };
}

function fmtDate(d?: Date | string) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  const datePart = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
  const timePart = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
  return `${datePart} · ${timePart}`;
}

/**
 * Pull H2 headings from the rendered HTML to power the TOC and add an anchor
 * id to each one so the TOC can deep-link.
 */
function extractTocAndAddAnchors(html: string): {
  html: string;
  toc: Array<{ id: string; text: string }>;
} {
  const toc: Array<{ id: string; text: string }> = [];
  const used = new Set<string>();
  const out = html.replace(
    /<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi,
    (_match, attrs: string | undefined, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const baseId =
        text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 80) || `section-${toc.length + 1}`;
      let id = baseId;
      let i = 2;
      while (used.has(id)) id = `${baseId}-${i++}`;
      used.add(id);
      toc.push({ id, text });
      const safeAttrs = attrs ?? "";
      return `<h2 id="${id}"${safeAttrs}>${inner}</h2>`;
    },
  );
  return { html: out, toc };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) notFound();

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const renderedHtml = await renderMarkdown(post.body);
  const { html, toc } = extractTocAndAddAnchors(renderedHtml);

  const articleUrl = `${site.url}/${post.slug}`;
  const authorName = post.authorName ?? site.founder.name;
  const authorIsFounder =
    !post.authorName || post.authorName === site.founder.name;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? "",
    image: post.coverUrl ?? `${site.url}${site.ogImage}`,
    keywords: [
      ...(post.focusKeyword ? [post.focusKeyword] : []),
      ...(post.keywords ?? []),
    ].join(", "),
    datePublished: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : undefined,
    dateModified: post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : undefined,
    author: authorIsFounder
      ? {
          "@type": "Person",
          name: site.founder.name,
          jobTitle: site.founder.jobTitle,
          description: site.founder.bio,
          url: `${site.url}/about`,
          sameAs: [...site.founder.sameAs],
          worksFor: {
            "@type": "Organization",
            name: site.brand,
            url: site.url,
          },
          knowsAbout: [...site.org.serviceTypes],
        }
      : {
          "@type": "Person",
          name: authorName,
          worksFor: { "@type": "Organization", name: site.brand, url: site.url },
        },
    publisher: {
      "@type": "Organization",
      name: site.brand,
      logo: { "@type": "ImageObject", url: `${site.url}${site.ogImage}` },
    },
    mainEntityOfPage: articleUrl,
    articleSection: post.tag ?? undefined,
  };

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Blog", url: `${site.url}/blog` },
    { name: post.title, url: articleUrl },
  ]);

  const shareTwitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    articleUrl,
  )}&text=${encodeURIComponent(post.title)}`;
  const shareLinkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    articleUrl,
  )}`;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <header className="relative overflow-hidden bg-[var(--bg)] border-b border-[var(--line)]">
          <div aria-hidden className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-grid animate-drift" />
          </div>
          <BgFx variant="hero" />
          <div className="relative z-10 max-w-[860px] mx-auto px-6 pt-20 pb-12 md:pt-28">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono"
            >
              <Link
                href="/blog"
                className="hover:text-[var(--accent)] transition-colors"
              >
                Blog
              </Link>
              {post.tag && (
                <>
                  <span className="text-[var(--line-2)]">/</span>
                  <span className="text-white">{post.tag}</span>
                </>
              )}
            </nav>

            <h1 className="mt-6 font-display text-[34px] md:text-[52px] leading-[1.05] tracking-[-0.035em]">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-5 text-[16px] md:text-[18px] leading-[1.6] text-[var(--muted)]">
                {post.excerpt}
              </p>
            )}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <a
                href="#about-author"
                className="group flex items-center gap-3"
                aria-label={`About the author, ${authorName}`}
              >
                <span
                  aria-hidden
                  className="h-9 w-9 rounded-full bg-[var(--accent)] text-black font-display font-semibold text-[14px] flex items-center justify-center shrink-0"
                >
                  {authorName.trim().charAt(0).toUpperCase()}
                </span>
                <span className="flex flex-col">
                  <span className="text-[13px] text-white group-hover:text-[var(--accent)] transition-colors leading-[1.2]">
                    {authorName}
                  </span>
                  {authorIsFounder && (
                    <span className="text-[11px] text-[var(--muted)] font-mono leading-[1.2] mt-0.5">
                      {site.founder.jobTitle}
                    </span>
                  )}
                </span>
              </a>
              <span className="hidden md:block h-6 w-px bg-[var(--line)]" />
              <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono flex-wrap">
                <span>{fmtDate(post.publishedAt as Date)}</span>
                <span className="h-px w-3 bg-[var(--line)]" />
                <span>{post.readMin ?? 5} min read</span>
                {post.updatedAt && (
                  <>
                    <span className="h-px w-3 bg-[var(--line)]" />
                    <span>Updated {fmtDate(post.updatedAt as Date)}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="bg-[var(--bg)]">
          <div className="max-w-[1180px] mx-auto px-6 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12">
            {/* TOC sidebar */}
            <aside className="hidden lg:block">
              {toc.length > 0 && (
                <nav
                  aria-label="On this page"
                  className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2"
                >
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono mb-3">
                    On this page
                  </div>
                  <ol className="space-y-2 text-[13px]">
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a
                          href={`#${t.id}`}
                          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors block py-0.5"
                        >
                          {t.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
            </aside>

            <article className="min-w-0">
              {/* TL;DR / Key takeaways box */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <aside
                  aria-label="Key takeaways"
                  className="mb-12 rounded-2xl border border-[var(--accent)]/40 bg-[var(--surface)] p-7"
                >
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
                    Key takeaways
                  </div>
                  <ul className="mt-4 space-y-2.5 text-[15px] leading-[1.65] text-white/90">
                    {post.keyTakeaways.map((t, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}

              <div
                className="prose-content text-[16px] md:text-[17px] leading-[1.8] text-white/90
                  [&_h1]:font-display [&_h1]:text-[32px] [&_h1]:font-semibold [&_h1]:mt-12 [&_h1]:mb-5 [&_h1]:tracking-[-0.025em] [&_h1]:text-white
                  [&_h2]:font-display [&_h2]:text-[26px] [&_h2]:font-semibold [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:tracking-[-0.02em] [&_h2]:text-white [&_h2]:scroll-mt-24
                  [&_h3]:font-display [&_h3]:text-[20px] [&_h3]:font-semibold [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-white
                  [&_p]:my-5
                  [&_a]:text-[var(--accent)] [&_a]:underline [&_a]:underline-offset-2
                  [&_strong]:text-white [&_strong]:font-semibold
                  [&_code]:font-mono [&_code]:bg-[var(--surface)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[14px]
                  [&_pre]:bg-[var(--surface)] [&_pre]:p-5 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre]:border [&_pre]:border-[var(--line)]
                  [&_pre_code]:bg-transparent [&_pre_code]:p-0
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-5
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-5
                  [&_li]:my-1.5
                  [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--accent)] [&_blockquote]:pl-5 [&_blockquote]:my-6 [&_blockquote]:text-[var(--muted)] [&_blockquote]:italic
                  [&_hr]:my-10 [&_hr]:border-[var(--line)]
                  [&_img]:rounded-xl [&_img]:my-10 [&_img]:border [&_img]:border-[var(--line)] [&_img]:w-full"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              {/* FAQ block */}
              {post.faqs && post.faqs.length > 0 && (
                <section
                  aria-labelledby="post-faq"
                  itemScope
                  itemType="https://schema.org/FAQPage"
                  className="mt-16 pt-10 border-t border-[var(--line)]"
                >
                  <h2
                    id="post-faq"
                    className="font-display text-[26px] font-semibold tracking-[-0.02em] text-white"
                  >
                    Frequently asked questions
                  </h2>
                  <ul className="mt-8 divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
                    {post.faqs.map((f, i) => (
                      <li
                        key={i}
                        itemScope
                        itemProp="mainEntity"
                        itemType="https://schema.org/Question"
                        className="py-6"
                      >
                        <h3
                          itemProp="name"
                          className="font-display text-[18px] font-semibold text-white"
                        >
                          {f.question}
                        </h3>
                        <div
                          itemScope
                          itemProp="acceptedAnswer"
                          itemType="https://schema.org/Answer"
                          className="mt-2"
                        >
                          <p
                            itemProp="text"
                            className="text-[15px] leading-[1.7] text-[var(--muted)]"
                          >
                            {f.answer}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* About the author (E-E-A-T) */}
              {authorIsFounder && (
                <section
                  id="about-author"
                  aria-labelledby="about-author-title"
                  itemScope
                  itemType="https://schema.org/Person"
                  className="mt-14 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7 scroll-mt-24"
                >
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                    About the author
                  </div>
                  <div className="mt-4 flex items-start gap-5">
                    <span
                      aria-hidden
                      className="h-14 w-14 rounded-full bg-[var(--accent)] text-black font-display font-semibold text-[22px] flex items-center justify-center shrink-0"
                    >
                      {site.founder.name.trim().charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <h2
                        id="about-author-title"
                        itemProp="name"
                        className="font-display text-[20px] font-semibold text-white"
                      >
                        {site.founder.name}
                      </h2>
                      <div
                        itemProp="jobTitle"
                        className="mt-0.5 text-[12px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono"
                      >
                        {site.founder.jobTitle}
                      </div>
                      <p
                        itemProp="description"
                        className="mt-4 text-[15px] leading-[1.7] text-white/85"
                      >
                        {site.founder.bio}
                      </p>
                      <div className="mt-3 text-[13px] text-[var(--muted)]">
                        Based in{" "}
                        <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                          <span itemProp="addressLocality">
                            {site.org.address.city}
                          </span>
                          ,{" "}
                          <span itemProp="addressRegion">
                            {site.org.address.region}
                          </span>
                          ,{" "}
                          <span itemProp="addressCountry">
                            {site.org.address.country}
                          </span>
                        </span>
                        . Working with founders across{" "}
                        {site.org.areaServed.join(", ")}.
                      </div>
                      <div className="mt-2 text-[13px] text-[var(--muted)]">
                        Specializes in{" "}
                        <span itemProp="knowsAbout">
                          SEO, GEO, AEO, LLMO, conversion-focused web
                          development, and AI growth systems
                        </span>
                        .
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {site.founder.sameAs.map((u) => {
                          const label = u.includes("linkedin")
                            ? "LinkedIn"
                            : u.includes("twitter") || u.includes("x.com")
                              ? "X / Twitter"
                              : u.includes("github")
                                ? "GitHub"
                                : "Website";
                          return (
                            <a
                              key={u}
                              href={u}
                              target="_blank"
                              rel="noopener noreferrer me"
                              itemProp="sameAs"
                              className="inline-flex h-8 items-center px-3 rounded-full border border-[var(--line)] text-[12px] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                            >
                              {label} →
                            </a>
                          );
                        })}
                        <Link
                          href="/contact"
                          className="inline-flex h-8 items-center px-3 rounded-full border border-[var(--accent)]/60 text-[12px] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-colors"
                        >
                          Work with Saurabh →
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Share kit */}
              <section className="mt-10 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7">
                <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                  Found this useful?
                </div>
                <div className="mt-2 font-display text-[18px] text-white">
                  Share it with someone who needs it.
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={shareTwitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center px-4 rounded-full border border-[var(--line)] text-[13px] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  >
                    Share on X →
                  </a>
                  <a
                    href={shareLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center px-4 rounded-full border border-[var(--line)] text-[13px] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  >
                    Share on LinkedIn →
                  </a>
                </div>
              </section>
            </article>
          </div>
        </div>

        <section className="bg-[var(--bg)] border-t border-[var(--line)]">
          <div className="max-w-[860px] mx-auto px-6 py-12 flex items-center justify-between gap-4 flex-wrap">
            <Link
              href="/blog"
              className="text-[14px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              ← All articles
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center px-5 rounded-full bg-[var(--accent)] text-black font-semibold text-[13px] hover:shadow-[0_0_24px_var(--accent-glow)] transition-shadow"
            >
              Book a strategy call →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd id={`ld-article-${post.slug}`} data={articleSchema} />
      <JsonLd id={`ld-breadcrumb-${post.slug}`} data={breadcrumb} />
      {post.faqs && post.faqs.length > 0 && (
        <JsonLd
          id={`ld-faq-${post.slug}`}
          data={faqSchema(
            post.faqs.map((f) => ({ q: f.question, a: f.answer })),
          )}
        />
      )}
    </>
  );
}
