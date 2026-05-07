import Link from "next/link";
import { Reveal } from "./Reveal";

const tiers = [
  {
    name: "Solo",
    price: "$0",
    cadence: "/forever",
    blurb: "For individuals shaping ideas in private.",
    features: [
      "Unlimited docs",
      "1 workspace",
      "Local-first sync",
      "Markdown export",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Team",
    price: "$12",
    cadence: "/seat / month",
    blurb: "For small teams that ship without ceremony.",
    features: [
      "Everything in Solo",
      "Unlimited members",
      "Roadmaps & sprints",
      "Priority support",
      "Audit log",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Studio",
    price: "Custom",
    cadence: "",
    blurb: "For studios and orgs with serious requirements.",
    features: [
      "Everything in Team",
      "SSO & SCIM",
      "Self-hosted option",
      "Dedicated success",
      "DPA & SOC 2",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative bg-black text-white border-y border-black overflow-hidden"
    >
      {/* Animated dark grid */}
      <div aria-hidden className="absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-grid-dark animate-drift opacity-100" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(closest-side at 50% 50%, rgba(0,0,0,0), rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.95) 100%)",
          }}
        />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 py-24 md:py-32">
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-white/60">
            <span className="h-px w-6 bg-white/40" />
            Pricing
          </div>
          <h2 className="mt-4 font-display font-light text-[44px] md:text-[80px] leading-[0.95] tracking-[-0.04em]">
            Honest. Predictable.
            <br />
            <span className="italic font-normal">Calm.</span>
          </h2>
          <p className="mt-6 max-w-[540px] mx-auto text-white/70 text-[17px] md:text-[19px] leading-[1.5]">
            One plan per phase of your journey. No usage tricks. No surprise
            invoices. Cancel any time.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div
                className={`group relative h-full rounded-2xl p-7 border transition-all overflow-hidden ${
                  t.featured
                    ? "bg-white text-black border-white shadow-[10px_10px_0_0_rgba(255,255,255,0.15)]"
                    : "bg-transparent text-white border-white/20 hover:border-white"
                }`}
              >
                {t.featured && (
                  <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.2em] bg-black text-white px-2 py-1 rounded-full">
                    Most loved
                  </span>
                )}
                <div className="font-display text-[22px] tracking-tight">
                  {t.name}
                </div>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-[44px] leading-none">{t.price}</span>
                  {t.cadence && (
                    <span className={`text-[13px] ${t.featured ? "text-black/60" : "text-white/60"}`}>
                      {t.cadence}
                    </span>
                  )}
                </div>
                <p className={`mt-3 text-[14px] ${t.featured ? "text-black/70" : "text-white/70"}`}>
                  {t.blurb}
                </p>

                <ul className="mt-6 space-y-2 text-[14px]">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          t.featured ? "bg-black" : "bg-white"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="#cta"
                  className={`mt-7 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full font-medium text-[14px] transition-transform hover:-translate-y-0.5 ${
                    t.featured
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {t.cta} <span>→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
