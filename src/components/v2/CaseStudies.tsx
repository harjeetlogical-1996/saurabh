import Link from "next/link";

const cases = [
  {
    tint: "bg-[var(--bg-tint-violet)]",
    industry: "B2B SaaS",
    company: "Linkly Analytics",
    headline: "From 1.2% to 4.9% trial signup rate in 30 days",
    metric: "+312%",
    metricLabel: "trial signups",
  },
  {
    tint: "bg-[var(--bg-tint-mint)]",
    industry: "E-commerce",
    company: "Roastery Co.",
    headline: "Repositioned a coffee brand and 2.4x'd AOV",
    metric: "2.4×",
    metricLabel: "average order value",
  },
  {
    tint: "bg-[var(--bg-tint-amber)]",
    industry: "Course creator",
    company: "Meena Iyer",
    headline: "Sold out a $2K cohort in 11 days from one landing page",
    metric: "$84K",
    metricLabel: "in launch revenue",
  },
];

export function CaseStudies() {
  return (
    <section className="bg-white py-28" id="case-studies">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[2.5px] text-[var(--muted)] mb-5">
            Featured work
          </span>
          <h2 className="font-display text-[40px] md:text-[56px] leading-[1.02] tracking-[-0.02em] text-[var(--ink)]">
            Numbers, not vibes.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <Link
              href="#"
              key={c.company}
              className="group block bg-white border border-[var(--hairline)] rounded-2xl overflow-hidden hover:border-[var(--ink)] transition-colors"
            >
              <div className={`${c.tint} h-52 p-7 flex flex-col justify-end`}>
                <div className="font-display text-[56px] leading-none text-[var(--ink)]">
                  {c.metric}
                </div>
                <div className="text-sm text-[var(--ink-2)] mt-2">{c.metricLabel}</div>
              </div>
              <div className="p-7">
                <div className="text-xs uppercase tracking-wider text-[var(--muted)] mb-3 font-medium">
                  {c.industry} · {c.company}
                </div>
                <h3 className="font-display text-[20px] text-[var(--ink)] mb-4 leading-snug">
                  {c.headline}
                </h3>
                <span className="text-sm font-semibold text-[var(--ink)] underline decoration-[var(--highlight)] decoration-4 underline-offset-4">
                  Read case study →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors"
          >
            See all 18 case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
