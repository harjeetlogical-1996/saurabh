"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    try {
      await authClient.signOut();
      router.push("/sb-console/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="text-[12px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors disabled:opacity-50"
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
