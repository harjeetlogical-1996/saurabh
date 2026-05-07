import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  meta?: ReactNode;
  actions?: ReactNode;
};

/**
 * Standard admin page header. Use it as the first element in every admin page
 * for consistent spacing, breadcrumb, eyebrow, title row, and right-aligned
 * action slot (e.g. "Create new" button).
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  meta,
  actions,
}: Props) {
  return (
    <header className="px-6 md:px-10 pt-10 md:pt-14 pb-8 border-b border-[var(--line)]">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono"
        >
          {breadcrumbs.map((c, i) => {
            const last = i === breadcrumbs.length - 1;
            return (
              <span key={`${c.label}-${i}`} className="inline-flex items-center gap-1.5">
                {c.href && !last ? (
                  <Link
                    href={c.href}
                    className="hover:text-[var(--accent)] transition-colors"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className={last ? "text-white" : ""}>{c.label}</span>
                )}
                {!last && <span className="text-[var(--line-2)]">/</span>}
              </span>
            );
          })}
        </nav>
      )}

      <div className="flex items-end justify-between gap-6 flex-wrap max-w-[1240px]">
        <div className="min-w-0">
          {eyebrow && (
            <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
              {eyebrow}
            </div>
          )}
          <h1 className="mt-3 font-display text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.025em]">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-[14px] text-[var(--muted)] max-w-[640px]">
              {description}
            </p>
          )}
          {meta && <div className="mt-3">{meta}</div>}
        </div>

        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </header>
  );
}
