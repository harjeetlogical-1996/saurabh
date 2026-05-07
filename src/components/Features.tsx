import Image from "next/image";
import { Reveal } from "./Reveal";

export function Features() {
  return (
    <section id="product" className="relative border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
        <Reveal className="text-center">
          <Eyebrow>Built for focus</Eyebrow>
          <h2 className="mt-4 font-display font-light text-[44px] md:text-[80px] leading-[0.95] tracking-[-0.04em]">
            Less surface area.
            <br />
            <span className="italic font-normal">More</span> progress.
          </h2>
          <p className="mt-6 max-w-[560px] mx-auto text-[var(--ink-2)] text-[17px] md:text-[19px] leading-[1.5]">
            Every feature sharpened to a single edge. No dashboards begging
            for attention. No noise. Just the work.
          </p>
        </Reveal>

        {/* Big feature row */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <Reveal className="md:col-span-6">
            <Eyebrow>01 · Writing</Eyebrow>
            <h3 className="mt-4 font-display font-light text-[40px] md:text-[56px] leading-[1] tracking-[-0.03em]">
              A writing surface
              <br className="hidden md:block" />
              <span className="italic font-normal">that disappears.</span>
            </h3>
            <p className="mt-4 text-[var(--muted)] text-[16px] leading-relaxed max-w-[480px]">
              Markdown, slash commands, and a typography stack tuned for long
              sessions. The page stays out of the way until you need it.
            </p>
            <ul className="mt-6 space-y-2 text-[14px] text-[var(--ink-2)]">
              {["Distraction-free editor", "Local-first sync", "Version history with diffs"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="md:col-span-6" delay={150}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-black bg-black group">
              <Image
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&h=900&fit=crop&auto=format&q=70"
                alt="Writing on a clean desk"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover grayscale transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between text-white">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] opacity-70">Editor</div>
                  <div className="font-display text-[22px] leading-tight">draft.md · saved a moment ago</div>
                </div>
                <span className="h-2 w-2 rounded-full bg-white animate-blink" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Reverse row */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <Reveal className="md:col-span-6 md:order-2">
            <Eyebrow>02 · Planning</Eyebrow>
            <h3 className="mt-4 font-display font-light text-[40px] md:text-[56px] leading-[1] tracking-[-0.03em]">
              Plans that
              <br className="hidden md:block" />
              <span className="italic font-normal">update themselves.</span>
            </h3>
            <p className="mt-4 text-[var(--muted)] text-[16px] leading-relaxed max-w-[480px]">
              Tasks, sprints, and roadmaps share the same atoms. Move a card,
              the timeline updates. Reschedule, the team is notified. Quiet, by
              design.
            </p>
            <ul className="mt-6 space-y-2 text-[14px] text-[var(--ink-2)]">
              {["Dependency-aware timelines", "Auto-rebalanced sprints", "Quiet hours, always"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="md:col-span-6 md:order-1" delay={150}>
            <PlannerVisual />
          </Reveal>
        </div>

        {/* Card grid */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-5">
          {smallFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <article className="group h-full border border-[var(--line)] rounded-2xl p-6 hover:border-black transition-colors bg-white">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[11px] tracking-wider text-[var(--muted)]">
                    {f.code}
                  </div>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
                    →
                  </span>
                </div>
                <div className="mt-10">{f.svg}</div>
                <h4 className="mt-6 font-display text-[26px] leading-[1.05] tracking-[-0.02em]">
                  {f.title}
                </h4>
                <p className="mt-3 text-[14px] text-[var(--muted)] leading-[1.55]">
                  {f.body}
                </p>
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
    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
      <span className="h-px w-6 bg-black/40" />
      {children}
    </div>
  );
}

function PlannerVisual() {
  const lanes = [
    { name: "Design", bars: [{ s: 5, w: 35 }, { s: 50, w: 25 }] },
    { name: "Engineering", bars: [{ s: 0, w: 45 }, { s: 55, w: 30 }] },
    { name: "Launch", bars: [{ s: 70, w: 28 }] },
  ];
  return (
    <div className="relative rounded-2xl border border-black bg-white overflow-hidden">
      <div className="flex items-center gap-2 px-4 h-10 border-b border-[var(--line)] bg-[var(--soft)]">
        <span className="text-[11px] uppercase tracking-wider text-[var(--muted)]">Q3 Roadmap</span>
        <span className="ml-auto text-[11px] font-mono text-[var(--muted)]">14 weeks</span>
      </div>

      <div className="p-5 space-y-5">
        {lanes.map((lane, li) => (
          <div key={lane.name}>
            <div className="text-[12px] mb-2 flex items-center justify-between">
              <span className="font-medium">{lane.name}</span>
              <span className="text-[var(--muted)] font-mono text-[10px]">
                lane-{String(li + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="relative h-8 rounded-md bg-[var(--soft)] border border-[var(--line)] overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 right-0 opacity-50"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, rgba(0,0,0,0.06) 0 1px, transparent 1px 60px)",
                }}
              />
              {lane.bars.map((b, bi) => (
                <span
                  key={bi}
                  className="absolute top-1 bottom-1 rounded bg-black"
                  style={{
                    left: `${b.s}%`,
                    width: `${b.w}%`,
                    animation: `rise 0.9s ${(li * 2 + bi) * 120}ms cubic-bezier(0.2,0.7,0.2,1) both`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 pb-5 flex items-center justify-between">
        <div className="text-[12px] text-[var(--muted)]">
          Auto-balanced • <span className="text-black">94% on-track</span>
        </div>
        <div className="flex -space-x-2">
          {avatarUrls.map((u, i) => (
            <span
              key={i}
              className="relative h-7 w-7 rounded-full border-2 border-white overflow-hidden"
            >
              <Image
                src={u}
                alt=""
                width={28}
                height={28}
                className="object-cover grayscale"
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const avatarUrls = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format&q=70",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format&q=70",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format&q=70",
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&h=80&fit=crop&auto=format&q=70",
];

const smallFeatures = [
  {
    code: "F.03 / SEARCH",
    title: "Find anything in 40ms.",
    body:
      "Local index, fuzzy ranking, and zero-network results. Press ⌘K and breathe.",
    svg: (
      <svg viewBox="0 0 200 80" className="w-full h-20">
        <g stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round">
          <line x1="0" y1="40" x2="200" y2="40" strokeDasharray="2 4" opacity="0.3" />
          <circle cx="60" cy="40" r="14">
            <animate attributeName="r" values="14;18;14" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <line x1="72" y1="50" x2="92" y2="68" />
          <circle cx="140" cy="40" r="3" fill="black">
            <animate attributeName="cx" values="140;180;140" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    ),
  },
  {
    code: "F.04 / AUTOMATE",
    title: "Calm automations.",
    body:
      "Triggers that never spam. Build flows in plain English; ship in one click.",
    svg: (
      <svg viewBox="0 0 200 80" className="w-full h-20">
        <g stroke="black" strokeWidth="1.5" fill="none">
          <rect x="6" y="28" width="40" height="24" rx="4" />
          <rect x="80" y="28" width="40" height="24" rx="4" />
          <rect x="154" y="28" width="40" height="24" rx="4" />
          <line x1="46" y1="40" x2="80" y2="40" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="0.8s" repeatCount="indefinite" />
          </line>
          <line x1="120" y1="40" x2="154" y2="40" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="0.8s" repeatCount="indefinite" />
          </line>
        </g>
      </svg>
    ),
  },
  {
    code: "F.05 / SECURE",
    title: "Privacy on by default.",
    body:
      "End-to-end encryption, audit logs, and per-doc access. Compliance is boring, that's the point.",
    svg: (
      <svg viewBox="0 0 200 80" className="w-full h-20">
        <g stroke="black" strokeWidth="1.5" fill="none">
          <path d="M100 14 L150 30 V50 C150 64 130 72 100 78 C70 72 50 64 50 50 V30 Z">
            <animate attributeName="opacity" values="1;0.6;1" dur="2.4s" repeatCount="indefinite" />
          </path>
          <path d="M82 46 L96 58 L120 36" />
        </g>
      </svg>
    ),
  },
];
