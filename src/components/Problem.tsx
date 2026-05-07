import { Reveal } from "./Reveal";
import { BgFx } from "./BgFx";
import { Icon } from "./Icon";

const pains = [
  {
    code: "01",
    icon: "target" as const,
    title: "A pretty website that doesn't sell.",
    lead: "Beautiful design, flat conversion rate.",
    body:
      "Your site checks the design boxes but isn't engineered to convert. No clear funnel, weak copy, slow load, buyers bounce before they buy.",
  },
  {
    code: "02",
    icon: "trending-down" as const,
    title: "Ad budget burning, ROAS dropping.",
    lead: "Money in, no qualified leads out.",
    body:
      "Google & Meta ads run without proper targeting, landing pages, or follow-up. CAC keeps climbing while pipeline barely moves.",
  },
  {
    code: "03",
    icon: "search" as const,
    title: "Invisible on Google, and on AI.",
    lead: "Customers can't find you in search or in ChatGPT.",
    body:
      "Weak technical SEO means no organic traffic. And in 2026, no GEO/AEO/LLMO means LLMs cite competitors when buyers ask AI.",
  },
];

export function Problem() {
  return (
    <section
      id="problem"
      className="relative border-b border-[var(--line)] bg-[var(--bg)] overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 z-0 bg-grid opacity-100" />
      <BgFx variant="subtle" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-28 md:py-40">
        <Reveal className="max-w-[860px]">
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-4 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.03em]">
            Most websites look great.{" "}
            <span className="text-[var(--accent)]">Few actually grow revenue.</span>
          </h2>
          <p className="mt-5 max-w-[640px] text-[15px] md:text-[16px] leading-[1.7] text-[var(--muted)]">
            You shipped a beautiful site, ran some ads, posted on social, and
            growth still feels stuck. The pipeline is uneven, ROAS is dropping,
            and Google (and now ChatGPT) barely mention you. Sound familiar?
            Here&apos;s what we see on almost every audit.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {pains.map((p, i) => (
            <Reveal key={p.code} delay={i * 90}>
              <div className="group h-full p-7 md:p-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--bg)] text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                    <Icon name={p.icon} size={20} strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--accent)]">
                    PAIN_{p.code}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.02em] text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.55] text-white/85">
                  {p.lead}
                </p>
                <p className="mt-2 text-[13px] leading-[1.65] text-[var(--muted)]">
                  {p.body}
                </p>
              </div>
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
