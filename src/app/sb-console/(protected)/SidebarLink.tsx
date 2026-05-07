"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import type { ComponentProps } from "react";

type IconName = ComponentProps<typeof Icon>["name"];

type Props = {
  label: string;
  href: string;
  icon: IconName;
  exact?: boolean;
  badge?: string | number;
};

export function SidebarLink({ label, href, icon, exact = false, badge }: Props) {
  const pathname = usePathname();
  const active = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  const baseClass =
    "group relative flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-colors";
  const stateClass = active
    ? "bg-[var(--bg)] text-white"
    : "text-[var(--muted)] hover:bg-[var(--bg)] hover:text-white";

  return (
    <Link href={href} className={`${baseClass} ${stateClass}`}>
      {active && (
        <span
          aria-hidden
          className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-[var(--accent)]"
        />
      )}
      <span
        className={`transition-colors ${
          active ? "text-[var(--accent)]" : "text-[var(--muted)] group-hover:text-[var(--accent)]"
        }`}
      >
        <Icon name={icon} size={15} strokeWidth={1.75} />
      </span>
      <span className="flex-1 truncate">{label}</span>
      {badge !== undefined && (
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--accent)] border border-[var(--accent)]/40 px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}
