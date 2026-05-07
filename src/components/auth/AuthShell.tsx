import Link from "next/link";
import type { ReactNode } from "react";
import { BgFx } from "../BgFx";

type Props = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  children: ReactNode;
  altLink: { label: string; href: string };
  altCta: string;
};

export function AuthShell({
  eyebrow,
  title,
  highlight,
  description,
  children,
  altLink,
  altCta,
}: Props) {
  return (
    <main className="relative min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)] overflow-hidden">
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid animate-drift" />
      </div>
      <BgFx variant="hero" />

      <header className="relative z-10 border-b border-[var(--line)]">
        <div className="max-w-[1240px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--accent)] text-black overflow-hidden border border-[var(--accent)]">
              <span className="font-display text-[14px] leading-none relative z-10">
                sb
              </span>
              <span className="absolute inset-0 animate-spin-slow">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-black" />
              </span>
            </span>
            <span className="font-display text-[19px] tracking-tight">
              Saurabh<span className="text-[var(--accent)]">.</span>
            </span>
          </Link>

          <Link
            href={altLink.href}
            className="inline-flex h-9 items-center gap-1.5 px-4 rounded-full border border-[var(--line)] text-[13px] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            {altCta}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </header>

      <div className="relative z-10 flex-1 grid lg:grid-cols-2">
        {/* Form column */}
        <section className="flex items-center justify-center px-6 py-16 md:py-20">
          <div className="w-full max-w-[440px]">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
              {eyebrow}
            </div>

            <h1 className="mt-6 font-display text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.035em]">
              {title}{" "}
              <span className="text-[var(--accent)]">{highlight}</span>
            </h1>

            <p className="mt-4 text-[14px] md:text-[15px] leading-[1.65] text-[var(--muted)]">
              {description}
            </p>

            <div className="mt-9">{children}</div>

            <p className="mt-8 text-[13px] text-[var(--muted)] text-center">
              {altLink.label}{" "}
              <Link
                href={altLink.href}
                className="text-[var(--accent)] border-b border-[var(--accent)] pb-0.5 hover:opacity-80 transition-opacity"
              >
                {altCta}
              </Link>
            </p>
          </div>
        </section>

        {/* Side panel */}
        <aside className="relative hidden lg:flex items-center justify-center px-10 py-16 border-l border-[var(--line)]">
          <SidePanel />
        </aside>
      </div>

      <footer className="relative z-10 border-t border-[var(--line)] py-6">
        <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between text-[12px] font-mono text-[var(--muted)]">
          <span>© {new Date().getFullYear()} Saurabh Bhayana</span>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-[var(--accent)] transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-[var(--accent)] transition-colors">
              Terms
            </Link>
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">
              Back to site
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SidePanel() {
  const points = [
    {
      label: "Strategy",
      body: "A custom roadmap, written for your business, yours to keep.",
    },
    {
      label: "Execution",
      body: "Specialists across design, development, and marketing, one accountable lead.",
    },
    {
      label: "Growth",
      body: "Weekly Loom updates and monthly reviews against revenue, not vanity.",
    },
  ];
  return (
    <div className="relative max-w-[420px] w-full">
      <div className="relative rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7">
        <div className="flex items-center justify-between">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--accent)]">
            Why founders choose us
          </div>
          <span className="font-mono text-[10px] text-[var(--muted)]">
            v.08
          </span>
        </div>

        <h2 className="mt-5 font-display text-[26px] leading-[1.15] tracking-[-0.025em]">
          Strategy by me. <br />
          <span className="text-[var(--accent)]">Execution by my team.</span>{" "}
          Growth for you.
        </h2>

        <ul className="mt-7 space-y-5">
          {points.map((p, i) => (
            <li key={p.label} className="flex gap-4">
              <span className="font-display text-[22px] leading-none text-[var(--accent)] tracking-tight">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="text-[12px] uppercase tracking-[0.18em] text-white font-mono">
                  {p.label}
                </div>
                <p className="mt-1 text-[13px] leading-[1.55] text-[var(--muted)]">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-6 border-t border-[var(--line)] flex items-center justify-between">
          <div className="text-[12px] text-[var(--muted)] font-mono">
            50+ projects · 10+ countries
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Online
          </span>
        </div>
      </div>
    </div>
  );
}
