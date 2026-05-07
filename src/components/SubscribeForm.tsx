"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function SubscribeForm({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error || "Couldn't subscribe. Try again.");
        return;
      }
      setStatus("success");
      setMessage(
        data.alreadySubscribed
          ? "You're already on the list. Thanks!"
          : "Subscribed. Check your inbox for a welcome note.",
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-[420px]">
      <label
        htmlFor={`subscribe-${source}`}
        className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono"
      >
        Newsletter · SEO, AI &amp; growth, monthly
      </label>
      <div className="mt-3 flex items-center gap-2 p-1.5 pl-4 rounded-full bg-[var(--surface)] border border-[var(--line)] focus-within:border-[var(--accent)] transition-colors">
        <input
          id={`subscribe-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@studio.com"
          autoComplete="email"
          className="flex-1 min-w-0 bg-transparent h-10 text-[14px] outline-none placeholder:text-[var(--muted)] text-white"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-[var(--accent)] text-black text-[13px] font-semibold hover:shadow-[0_0_24px_var(--accent-glow)] transition-shadow shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Sending..." : "Subscribe"}
          {status !== "submitting" && (
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          )}
        </button>
      </div>

      <p
        className={`mt-2.5 text-[11px] font-mono ${
          status === "success"
            ? "text-[var(--accent)]"
            : status === "error"
              ? "text-red-400"
              : "text-[var(--muted)]"
        }`}
      >
        {message || "One email a month. Unsubscribe anytime."}
      </p>
    </form>
  );
}
