"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function ConsoleLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/sb-console";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password,
        rememberMe: true,
      });
      if (res.error) {
        // Use a deliberately vague error to avoid revealing whether the
        // account exists or whether the password was wrong.
        setError("Access denied.");
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Access denied.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
          Email
        </div>
        <input
          type="email"
          required
          value={email}
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 h-11 w-full rounded-lg bg-[var(--bg)] border border-[var(--line)] px-3 text-[14px] text-white outline-none focus:border-[var(--accent)] transition-colors font-mono"
        />
      </label>
      <label className="block">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
          Password
        </div>
        <input
          type="password"
          required
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 h-11 w-full rounded-lg bg-[var(--bg)] border border-[var(--line)] px-3 text-[14px] text-white outline-none focus:border-[var(--accent)] transition-colors font-mono"
        />
      </label>

      {error && (
        <div className="text-[12px] font-mono text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full h-11 rounded-lg bg-[var(--accent)] text-black font-semibold text-[13px] hover:shadow-[0_0_24px_var(--accent-glow)] transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Authenticating..." : "Sign in"}
      </button>
    </form>
  );
}
