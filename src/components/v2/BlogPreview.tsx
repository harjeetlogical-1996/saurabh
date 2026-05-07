import Link from "next/link";

const posts = [
  {
    tint: "bg-[var(--bg-tint-violet)]",
    category: "Conversion",
    date: "Apr 28, 2026",
    title: "The 3-second test that predicts every homepage's success",
    readTime: "5 min read",
  },
  {
    tint: "bg-[var(--bg-tint-mint)]",
    category: "Copywriting",
    date: "Apr 14, 2026",
    title: "Why 'we' is the most expensive word on your homepage",
    readTime: "4 min read",
  },
  {
    tint: "bg-[var(--bg-tint-amber)]",
    category: "Pricing pages",
    date: "Mar 30, 2026",
    title: "How to write a pricing page that doesn't trigger sticker shock",
    readTime: "7 min read",
  },
];

export function BlogPreview() {
  return (
    <section className="bg-white py-24" id="blog">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div className="max-w-[640px]">
            <span className="inline-block text-xs font-semibold uppercase tracking-[2px] text-[var(--accent-2)] mb-4">
              From the blog
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)]">
              Notes on shipping better websites.
            </h2>
          </div>
          <Link
            href="#"
            className="text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            All posts →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link
              href="#"
              key={p.title}
              className="group block bg-white rounded-2xl border border-[var(--hairline)] overflow-hidden hover:border-[var(--accent)] hover:-translate-y-1 transition-all"
            >
              <div className={`${p.tint} h-44 relative`}>
                <span className="absolute top-4 left-4 bg-white text-[var(--ink)] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {p.category}
                </span>
              </div>
              <div className="p-6">
                <div className="text-xs text-[var(--muted)] mb-3 flex gap-2">
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--ink)] leading-snug group-hover:text-[var(--accent)] transition-colors">
                  {p.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
