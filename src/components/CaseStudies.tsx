import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./Reveal";

const cases = [
  {
    n: "01",
    client: "Helix Health",
    sector: "B2B SaaS · Healthcare",
    title: "From 4k to 312k organic visits in 14 months, without one paid ad.",
    metric: "+78× organic",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&h=900&fit=crop&auto=format&q=70",
  },
  {
    n: "02",
    client: "Forge Studios",
    sector: "D2C · Furniture",
    title:
      "Cut content output by 60%, grew revenue 3.4× by killing what didn't work.",
    metric: "+340% revenue",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=900&fit=crop&auto=format&q=70",
  },
  {
    n: "03",
    client: "Atlas Legal",
    sector: "Professional services",
    title:
      "Took a 7-year-old domain from page 6 to top-3 for every money keyword.",
    metric: "Top 3 / 42 kws",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&h=900&fit=crop&auto=format&q=70",
  },
];

export function CaseStudies() {
  return (
    <section
      id="cases"
      className="relative border-b border-[var(--line)] bg-[var(--bg)] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-6 py-28 md:py-40">
        <Reveal className="flex items-end justify-between gap-8 flex-wrap">
          <div>
            <Eyebrow>Featured work</Eyebrow>
            <h2 className="mt-4 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.03em]">
              Numbers that <span className="text-[var(--accent)]">moved.</span>
            </h2>
          </div>
          <Link
            href="#"
            className="inline-flex h-11 items-center gap-1.5 px-5 rounded-full border border-[var(--line)] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[14px] font-medium"
          >
            All case studies →
          </Link>
        </Reveal>

        <div className="mt-20 space-y-6">
          {cases.map((c, i) => (
            <Reveal key={c.n} delay={i * 100}>
              <article className="group grid grid-cols-1 md:grid-cols-12 gap-0 bg-[var(--surface)] border border-[var(--line)] rounded-2xl overflow-hidden hover:border-[var(--accent)] hover:-translate-y-1 transition-all">
                <div className="md:col-span-5 relative aspect-[16/10] md:aspect-auto bg-black overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.client}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover grayscale opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex font-mono bg-black/60 backdrop-blur text-[var(--accent)] text-[11px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-[var(--accent)]/40">
                      Case_{c.n}
                    </span>
                  </div>
                  <div className="absolute right-4 bottom-4">
                    <span className="inline-flex items-center gap-1.5 bg-[var(--accent)] text-black text-[12px] font-semibold px-3 py-1.5 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-black" />
                      {c.metric}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
                      <span>{c.client}</span>
                      <span className="h-px w-4 bg-[var(--line)]" />
                      <span>{c.sector}</span>
                    </div>
                    <h3 className="mt-4 font-display text-[20px] md:text-[26px] leading-[1.25] tracking-[-0.02em] max-w-[640px] text-white">
                      {c.title}
                    </h3>
                  </div>
                  <div className="mt-10 flex items-center justify-between">
                    <Link
                      href="#"
                      className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--accent)] border-b border-[var(--accent)] pb-0.5 hover:gap-2.5 transition-all"
                    >
                      Read case study <span>→</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-1.5 text-[12px] text-[var(--muted)] font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      Verified results
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
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
