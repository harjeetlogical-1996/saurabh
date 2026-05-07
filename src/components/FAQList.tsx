"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";
import type { FAQ as FAQItem } from "@/lib/content/faqs";

type Props = {
  faqs: ReadonlyArray<FAQItem>;
};

export function FAQList({ faqs }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
      className="border-b border-[var(--line)] bg-[var(--bg)] overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto px-6 py-28 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14">
          <Reveal className="md:col-span-4">
            <Eyebrow>FAQ</Eyebrow>
            <h2
              id="faq-heading"
              className="mt-4 font-display text-[32px] md:text-[40px] leading-[1.1] tracking-[-0.03em]"
            >
              Frequently asked{" "}
              <span className="text-[var(--accent)]">questions.</span>
            </h2>
            <p className="mt-5 text-[14px] leading-[1.65] text-[var(--muted)]">
              Don&apos;t see yours here?{" "}
              <Link
                href="/contact"
                className="text-[var(--accent)] border-b border-[var(--accent)] pb-0.5"
              >
                Ask us directly
              </Link>
              .
            </p>
          </Reveal>

          <div className="md:col-span-8">
            <ul className="border-t border-[var(--line)]">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                const panelId = `faq-panel-${i}`;
                const buttonId = `faq-button-${i}`;
                return (
                  <li
                    key={`${f.q}-${i}`}
                    className="border-b border-[var(--line)]"
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                  >
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="w-full flex items-start justify-between gap-6 text-left py-7 group"
                    >
                      <span
                        itemProp="name"
                        className="font-display text-[16px] md:text-[18px] leading-[1.35] tracking-[-0.015em] text-white group-hover:text-[var(--accent)] transition-colors"
                      >
                        {f.q}
                      </span>
                      <span
                        className={`shrink-0 mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                          isOpen
                            ? "bg-[var(--accent)] text-black border-[var(--accent)] rotate-45"
                            : "border-[var(--line)] text-[var(--muted)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]"
                        }`}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div
                          itemProp="text"
                          className="pb-7 pr-12 text-[14px] md:text-[15px] leading-[1.7] text-[var(--muted)] [&_strong]:text-white [&_strong]:font-semibold"
                          dangerouslySetInnerHTML={{ __html: f.a }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.24em] text-[var(--accent)] font-mono">
      <span className="h-px w-8 bg-[var(--accent)]" />
      {children}
    </div>
  );
}
