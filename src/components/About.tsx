import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section
      id="about"
      className="border-b border-[var(--line)] bg-[var(--bg)] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-6 py-28 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <Reveal className="md:col-span-5">
            <div className="relative max-w-[440px]">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-2xl border border-[var(--accent)]/30"
              />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--line)] bg-black">
                <Image
                  src="https://images.unsplash.com/photo-1542178243-bc20204b769f?w=900&h=1125&fit=crop&auto=format&q=80"
                  alt="Saurabh Bhayana, founder of Saurabh Bhayana & Team, at his desk in Fatehabad, India"
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover grayscale opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-[var(--accent)]">
                      Based in
                    </div>
                    <div className="font-display text-[20px] mt-1 leading-tight text-white">
                      Fatehabad, India
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass text-[11px] font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
                    Online
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" delay={150}>
            <Eyebrow>About the founder</Eyebrow>
            <h2 className="mt-4 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.03em]">
              Hi, I&apos;m Saurabh. Founder-led{" "}
              <span className="text-[var(--accent)]">growth, without the agency bloat.</span>
            </h2>
            <div className="mt-6 space-y-4 text-[15px] md:text-[16px] leading-[1.7] text-[var(--muted)] max-w-[640px]">
              <p>
                I started this 5 years ago with a simple belief: most brands
                don&apos;t need bigger budgets, they need smarter execution.
                That idea became{" "}
                <span className="text-white">Saurabh Bhayana &amp; Team</span>
                . A small studio that ships{" "}
                <span className="text-white">
                  websites, full-stack digital marketing, and AI services
                </span>{" "}
                under one roof.
              </p>
              <p>
                Today I lead 8 specialists across design, development (Next.js,
                Webflow, Shopify, WordPress), SEO, paid media, and AI
                engineering. We&apos;ve shipped 50+ projects for founders in
                India, the US, UK and Europe, from seed-stage startups to
                established D2C and B2B brands.
              </p>
              <p>
                When you hire us, you work with me directly. I lead every
                strategy call and review every milestone. My team handles
                execution under my supervision, so you get the speed of a
                solo consultant with the firepower of a senior agency.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-[480px]">
              {[
                { v: "5 yrs", k: "running the studio" },
                { v: "8", k: "in-house specialists" },
                { v: "50+", k: "projects shipped" },
              ].map((s, i) => (
                <div
                  key={s.k}
                  className={`pl-4 border-l-2 ${
                    i === 1 ? "border-[var(--accent)]" : "border-[var(--line)]"
                  }`}
                >
                  <div className="font-display text-[24px] leading-none tracking-tight text-white">
                    {s.v}
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
                    {s.k}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="#"
              className="mt-10 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--accent)] border-b border-[var(--accent)] pb-0.5 hover:gap-2.5 transition-all"
            >
              Read my full story <span>→</span>
            </Link>
          </Reveal>
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
