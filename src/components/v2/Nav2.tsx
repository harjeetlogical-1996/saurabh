import Link from "next/link";

export function Nav2() {
  const links = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#case-studies" },
    { label: "About", href: "#about" },
    { label: "Tools", href: "#free-tools" },
    { label: "Pricing", href: "#packages" },
    { label: "Blog", href: "#blog" },
  ];
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-[var(--hairline)]">
      <div className="max-w-[1240px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/v2" className="flex items-center gap-2.5 font-bold text-lg">
          <span className="w-9 h-9 rounded-md bg-[var(--ink)] text-white flex items-center justify-center font-display text-xl">
            A
          </span>
          <span className="font-display text-[var(--ink)] text-xl">Aanya Kapoor</span>
        </Link>

        <div className="hidden lg:flex gap-8">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[15px] text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className="hidden sm:inline-flex text-[15px] text-[var(--ink-2)] hover:text-[var(--ink)] px-3 py-2"
          >
            Contact
          </Link>
          <Link
            href="#contact"
            className="bg-[var(--ink)] text-white text-[15px] font-medium px-5 py-2.5 rounded-full hover:bg-black transition-colors"
          >
            Book a call →
          </Link>
        </div>
      </div>
    </nav>
  );
}
