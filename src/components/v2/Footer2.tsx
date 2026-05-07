import Link from "next/link";

const cols = [
  {
    title: "Services",
    links: ["Marketing site", "Landing pages", "Copy audit", "Conversion sprint"],
  },
  { title: "Company", links: ["About", "Case studies", "Blog", "Contact"] },
  { title: "Free", links: ["Headline tool", "Site teardown", "Cheatsheet", "Newsletter"] },
];

export function Footer2() {
  return (
    <footer className="bg-[var(--bg-cream)] border-t border-[var(--hairline)] pt-16 pb-8">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">
          <div>
            <Link href="/v2" className="flex items-center gap-2 font-bold text-lg">
              <span className="w-8 h-8 rounded-lg accent-gradient" />
              Aanya Kapoor
            </Link>
            <p className="text-[var(--muted)] text-sm max-w-[280px] mt-4 leading-relaxed">
              Independent web designer & developer helping founders build websites that convert.
              Based in Bangalore, working worldwide.
            </p>
            <div className="flex gap-3 mt-5">
              {["𝕏", "in", "✦"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white border border-[var(--hairline)] flex items-center justify-center text-sm text-[var(--ink)] hover:border-[var(--accent)] transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-xs uppercase tracking-wider text-[var(--ink)] font-bold mb-4">
                {c.title}
              </h4>
              {c.links.map((l) => (
                <Link
                  key={l}
                  href="#"
                  className="block text-sm py-1.5 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  {l}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--hairline)] pt-6 flex justify-between text-[var(--muted)] text-xs flex-wrap gap-3">
          <div>© 2026 Aanya Kapoor. Made with care in Bangalore.</div>
          <div className="flex gap-5">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
