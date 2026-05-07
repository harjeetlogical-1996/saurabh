import Link from "next/link";
import { Reveal } from "./Reveal";
import { getHomepageTools } from "@/lib/content/tools";

export async function FreeTools() {
  const tools = await getHomepageTools();

  return (
    <section
      id="tools"
      className="relative border-b border-[var(--line)] bg-[var(--bg)] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-6 py-28 md:py-40">
        <Reveal className="flex items-end justify-between gap-8 flex-wrap">
          <div className="max-w-[680px]">
            <Eyebrow>Free Tools &amp; Resources</Eyebrow>
            <h2 className="mt-4 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.03em]">
              Free SEO &amp; performance tools.{" "}
              <span className="text-[var(--accent)]">Use them on us.</span>
            </h2>
            <p className="mt-5 text-[15px] md:text-[16px] leading-[1.7] text-[var(--muted)]">
              We build the tools we wish existed, and share them free. No
              email gates, no upsells. Run them on your site before you talk
              to a single agency.
            </p>
          </div>
          <Link
            href="#tools"
            className="inline-flex h-11 items-center gap-1.5 px-5 rounded-full border border-[var(--line)] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[14px] font-medium"
          >
            Explore all tools →
          </Link>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {tools.map((t, i) => {
            const inner = (
              <article className="group relative h-full bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-7 hover:border-[var(--accent)] hover:-translate-y-1 transition-all overflow-hidden">
                <span
                  aria-hidden
                  className="absolute -top-px left-8 right-8 h-px bg-[var(--accent)]/40"
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--accent)]">
                    {t.code}
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] group-hover:bg-[var(--accent)] group-hover:text-black group-hover:border-[var(--accent)] transition-all">
                    →
                  </span>
                </div>
                <h3 className="mt-8 font-display text-[18px] leading-[1.2] tracking-[-0.02em] text-white">
                  {t.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.65] text-[var(--muted)]">
                  {t.body}
                </p>
                <div className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--accent)] border-b border-[var(--accent)] pb-0.5 group-hover:gap-2.5 transition-all">
                  {t.cta} <span>→</span>
                </div>
              </article>
            );

            const isExternal = !!t.href && /^https?:\/\//i.test(t.href);
            return (
              <Reveal key={`${t.code}-${i}`} delay={i * 90}>
                {t.href ? (
                  isExternal ? (
                    <a href={t.href} target="_blank" rel="noopener noreferrer">
                      {inner}
                    </a>
                  ) : (
                    <Link href={t.href}>{inner}</Link>
                  )
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
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
