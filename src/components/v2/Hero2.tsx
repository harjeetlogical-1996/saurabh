import Link from "next/link";

export function Hero2() {
  return (
    <header className="dark-surface relative pt-20 pb-24 overflow-hidden">
      <div className="relative max-w-[1240px] mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--surface-line)] text-xs font-medium text-[var(--surface-muted)] mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--highlight)]" />
            Booking projects for Q3 2026 — 2 spots left
          </div>

          <h1 className="font-display text-[44px] md:text-[68px] leading-[1.02] tracking-[-0.025em] text-[var(--surface-ink)] mb-7">
            Websites that{" "}
            <span className="relative inline-block px-2">
              <span className="absolute inset-0 bg-[var(--highlight)] -rotate-1 rounded-sm" />
              <span className="relative italic text-[var(--ink)]">turn visitors</span>
            </span>{" "}
            into paying customers.
          </h1>

          <p className="text-[18px] text-[var(--surface-muted)] max-w-[560px] mb-9 leading-relaxed">
            I help bootstrapped founders ship high-converting marketing sites in 4 weeks — with
            copy, design, and development handled end-to-end.
          </p>

          <div className="flex gap-3 flex-wrap mb-12">
            <Link
              href="#contact"
              className="bg-[var(--highlight)] text-[var(--ink)] font-semibold px-7 py-3.5 rounded-full hover:bg-amber-300 transition-colors"
            >
              Start your project →
            </Link>
            <Link
              href="#case-studies"
              className="border border-[var(--surface-line)] text-[var(--surface-ink)] font-semibold px-7 py-3.5 rounded-full hover:bg-[var(--surface-2)] transition-colors"
            >
              See my work
            </Link>
          </div>

          <div className="flex items-center gap-5 text-sm text-[var(--surface-muted)]">
            <div className="flex -space-x-2">
              {["#fde68a", "#bfdbfe", "#fbcfe8", "#a7f3d0"].map((c, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[var(--surface)]"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div>
              <strong className="text-[var(--surface-ink)] font-semibold">50+ founders</strong>{" "}
              shipped with me
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-white rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] p-6">
            <div className="flex gap-1.5 mb-5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="space-y-3">
              <div className="h-3 w-3/4 bg-stone-100 rounded" />
              <div className="h-3 w-full bg-stone-100 rounded" />
              <div className="h-3 w-5/6 bg-stone-100 rounded" />
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="bg-[var(--bg-tint-amber)] rounded-lg p-4">
                  <div className="font-display text-3xl font-bold text-[var(--ink)]">+312%</div>
                  <div className="text-xs text-[var(--muted)] mt-1">conversion lift</div>
                </div>
                <div className="bg-[var(--bg-tint-mint)] rounded-lg p-4">
                  <div className="font-display text-3xl font-bold text-[var(--ink)]">4 wks</div>
                  <div className="text-xs text-[var(--muted)] mt-1">average delivery</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-[var(--highlight)] rounded-xl p-4 max-w-[210px] shadow-lg">
            <div className="text-[var(--ink)] text-sm mb-1">★★★★★</div>
            <p className="text-xs text-[var(--ink)] font-medium leading-snug">
              &quot;Best money I&apos;ve spent on my business this year.&quot;
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
