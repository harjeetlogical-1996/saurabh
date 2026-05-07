import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth-server";
import { SignOutButton } from "./SignOutButton";
import { SidebarLink } from "./SidebarLink";

export const metadata: Metadata = {
  title: "Console",
  robots: { index: false, follow: false, nocache: true, noimageindex: true },
};

type IconName = React.ComponentProps<typeof SidebarLink>["icon"];

type NavItem = { label: string; href: string; icon: IconName; exact?: boolean };
type NavGroup = { title: string; items: NavItem[] };

const groups: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/sb-console", icon: "bar-chart", exact: true },
      { label: "Activity", href: "/sb-console/activity", icon: "clock" },
    ],
  },
  {
    title: "Inbox",
    items: [
      { label: "Contacts", href: "/sb-console/contacts", icon: "target" },
      { label: "Subscribers", href: "/sb-console/subscribers", icon: "trending-up" },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Blog posts", href: "/sb-console/posts", icon: "file-text" },
      { label: "Categories", href: "/sb-console/categories", icon: "tag" },
      { label: "Case studies", href: "/sb-console/case-studies", icon: "briefcase" },
      { label: "Testimonials", href: "/sb-console/testimonials", icon: "quote" },
      { label: "FAQs", href: "/sb-console/faqs", icon: "list" },
      { label: "Free tools", href: "/sb-console/tools", icon: "wrench" },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Site settings", href: "/sb-console/settings", icon: "settings" },
      { label: "Users", href: "/sb-console/users", icon: "users" },
      { label: "My account", href: "/sb-console/account", icon: "lock" },
    ],
  },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  const user = session.user as unknown as {
    name?: string;
    email: string;
    role?: string;
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] shrink-0 border-r border-[var(--line)] bg-[var(--surface)] sticky top-0 h-screen">
        <div className="px-5 h-16 flex items-center gap-2.5 border-b border-[var(--line)] shrink-0">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--accent)] text-black overflow-hidden">
            <span className="font-display text-[14px] leading-none relative z-10">
              sb
            </span>
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[16px] tracking-tight">
              Saurabh<span className="text-[var(--accent)]">.</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
              Console
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="px-3 mb-1.5 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                {group.title}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <SidebarLink key={item.href} {...item} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-[var(--line)] p-4 shrink-0">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
            Signed in as
          </div>
          <div className="mt-1.5 text-[13px] font-medium text-white truncate">
            {user.name || user.email}
          </div>
          <div className="text-[11px] text-[var(--muted)] truncate font-mono">
            {user.email}
          </div>
          <div className="mt-3.5 flex items-center justify-between">
            <Link
              href="/"
              className="text-[12px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              View site →
            </Link>
            <SignOutButton />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="md:hidden border-b border-[var(--line)] bg-[var(--surface)] px-5 h-14 flex items-center justify-between">
          <Link href="/sb-console" className="flex items-center gap-2">
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent)] text-black">
              <span className="font-display text-[12px] leading-none">sb</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Console
            </span>
          </Link>
          <SignOutButton />
        </header>
        {children}
      </main>
    </div>
  );
}
