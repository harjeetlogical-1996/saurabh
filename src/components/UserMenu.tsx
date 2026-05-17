"use client";

/**
 * Logged-in user dropdown for the marketing-site Navbar.
 *
 * Renders the avatar + chevron button on the right of the navbar. On
 * click expands a panel with name, email, and the most common
 * destinations (Dashboard, Account, Tools, Sign out).
 *
 * Server-rendered Navbar passes the resolved session info down so
 * this client component doesn't re-fetch on the first paint — avoids
 * the brief "Log in" flash before the menu hydrates.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function UserMenu({
  user,
}: {
  user: { name?: string | null; email?: string | null; role?: string | null };
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click / Escape so the menu doesn't trap focus.
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const display = user.name || user.email || "Account";
  const initial = (user.name?.[0] ?? user.email?.[0] ?? "?").toUpperCase();
  const isAdmin = user.role === "admin";

  async function handleSignOut() {
    setBusy(true);
    try {
      await authClient.signOut();
      // router.refresh() re-renders server components so Navbar picks
      // up the now-empty session immediately.
      router.refresh();
      router.push("/");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-1 pr-2 h-9 rounded-full hover:bg-white/5 transition-colors"
        aria-label="Account menu"
        aria-expanded={open}
      >
        <span className="h-7 w-7 rounded-full bg-[var(--accent)] text-black font-display text-[12px] flex items-center justify-center">
          {initial}
        </span>
        <span className="hidden md:inline text-[13px] text-white max-w-[140px] truncate">
          {display}
        </span>
        <Chevron open={open} />
      </button>
      {open && (
        <div className="absolute right-0 top-11 z-40 w-[260px] rounded-lg border border-[var(--line)] bg-[var(--surface)] shadow-2xl p-1.5">
          <div className="px-3 py-2.5">
            <div className="text-[13px] text-white truncate">{display}</div>
            {user.email && (
              <div className="text-[11px] text-[var(--muted)] truncate font-mono mt-0.5">
                {user.email}
              </div>
            )}
          </div>
          <div className="border-t border-[var(--line)] py-1">
            <MenuLink href="/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </MenuLink>
            <MenuLink href="/sb-console/account" onClick={() => setOpen(false)}>
              Account & password
            </MenuLink>
            <MenuLink
              href="https://tool.saurabhbhayana.com"
              onClick={() => setOpen(false)}
              external
            >
              Tools workspace →
            </MenuLink>
            {isAdmin && (
              <MenuLink
                href="/sb-console"
                onClick={() => setOpen(false)}
                accent
              >
                Admin console →
              </MenuLink>
            )}
          </div>
          <div className="border-t border-[var(--line)] py-1">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={busy}
              className="w-full text-left px-3 py-2 rounded-md text-[12.5px] text-[var(--muted)] hover:bg-white/5 hover:text-red-400 disabled:opacity-50"
            >
              {busy ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  children,
  onClick,
  external,
  accent,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  external?: boolean;
  accent?: boolean;
}) {
  const cls = `block w-full text-left px-3 py-2 rounded-md text-[13px] hover:bg-white/5 ${
    accent ? "text-[var(--accent)]" : "text-white"
  }`;
  if (external) {
    return (
      <a href={href} onClick={onClick} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={cls}>
      {children}
    </Link>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-[var(--muted)] transition-transform ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
