import Link from "next/link";
import { Reveal } from "../Reveal";
import { BgFx } from "../BgFx";

type Sub = {
  n: string;
  title: string;
  body: string;
};

export type ServiceData = {
  index: string;
  slug: string;
  eyebrow: string;
  title: string;
  tagline: string;
  body: string;
  subs: Sub[];
  highlights: string[];
  /** Optional URL to a dedicated detail page for this service */
  detailHref?: string;
};

type Props = {
  data: ServiceData;
  reversed?: boolean;
};

export function ServiceBlock({ data, reversed = false }: Props) {
  return (
    <section
      id={`service-${data.index}`}
      className="relative bg-[var(--bg)] border-b border-[var(--line)] overflow-hidden"
    >
      <BgFx variant="subtle" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-24 md:py-32">
        {/* Intro: title block + summary card */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start ${
            reversed ? "" : ""
          }`}
        >
          <Reveal
            className={`lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}
          >
            <div className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.24em] text-[var(--accent)] font-mono">
              <span className="h-px w-8 bg-[var(--accent)]" />
              {data.eyebrow}
            </div>
            <h2 className="mt-4 font-display text-[36px] md:text-[56px] leading-[1.05] tracking-[-0.035em]">
              {data.title}
            </h2>
            <p className="mt-5 text-[18px] md:text-[20px] leading-[1.4] text-[var(--accent)] font-medium">
              {data.tagline}
            </p>
            <p className="mt-5 max-w-[560px] text-[15px] md:text-[16px] leading-[1.7] text-[var(--muted)]">
              {data.body}
            </p>
          </Reveal>

          <Reveal
            className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}
            delay={150}
          >
            <div className="glass rounded-2xl p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--accent)] uppercase">
                  Includes
                </span>
                <span className="font-mono text-[10px] text-[var(--muted)]">
                  {String(data.highlights.length).padStart(2, "0")} items
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {data.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-[14px] leading-[1.5] text-white/90"
                  >
                    <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)] text-[10px] font-bold">
                      ✓
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] text-black font-semibold text-[14px] hover:shadow-[0_0_36px_var(--accent-glow)] hover:-translate-y-0.5 transition-all"
              >
                Get a quote <span>→</span>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Sub-services grid */}
        <Reveal className="mt-20">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="font-mono text-[11px] tracking-[0.22em] text-[var(--muted)] uppercase">
                What&apos;s inside
              </div>
              <h3 className="mt-3 font-display text-[24px] md:text-[32px] leading-[1.15] tracking-[-0.025em]">
                Everything you need under{" "}
                <span className="text-[var(--accent)]">one roof.</span>
              </h3>
            </div>
            <div className="text-[12px] text-[var(--muted)] font-mono">
              {data.subs.length} sub-services
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.subs.map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <article className="group h-full bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-7 hover:border-[var(--accent)] hover:-translate-y-1 transition-all relative overflow-hidden">
                <span
                  aria-hidden
                  className="absolute -top-px left-8 right-8 h-px bg-[var(--accent)]/30 group-hover:bg-[var(--accent)] transition-colors"
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--accent)]">
                    {data.index}.{s.n}
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors">
                    →
                  </span>
                </div>
                <h4 className="mt-8 font-display text-[18px] md:text-[20px] leading-[1.25] tracking-[-0.02em] text-white">
                  {s.title}
                </h4>
                <p className="mt-3 text-[13px] leading-[1.65] text-[var(--muted)]">
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {data.detailHref && (
          <Reveal className="mt-12 flex justify-center">
            <Link
              href={data.detailHref}
              className="group inline-flex h-12 items-center gap-2 px-6 rounded-full border border-[var(--accent)] text-[var(--accent)] font-semibold text-[14px] hover:bg-[var(--accent)] hover:text-black hover:shadow-[0_0_36px_var(--accent-glow)] transition-all"
            >
              View all {data.title.toLowerCase()} services
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
