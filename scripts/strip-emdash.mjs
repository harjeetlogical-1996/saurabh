// One-off script to remove em dashes (—) from source content.
// Replacement strategy:
//   - In numeric ranges like "$5,000 — $15,000" or "2 — 4 weeks": use en dash (–).
//   - "Title — Subtitle" patterns (heading-style separators): use middle dot (·).
//   - Otherwise: use ". " (period + space) when it ends a clause, or ", " for continuations.
//   - Newline-following dashes (" —\n") are treated as ". ".
// We err toward ". " since it's the most universally readable replacement.

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "src");
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".md"]);

// Regex to detect if a dash sits between two number-ish tokens (currency, week ranges, etc.)
const numericRange = /(\$?\d[\d,.]*\+?\s*(?:weeks?|days?|months?|hrs?|hours?|min(?:utes?)?|seconds?|yrs?|years?|kw?s?|million|m\+?|k\+?)?)\s*—\s*(\$?\d)/gi;

// Title-style "Foo — Bar" inside short strings (like "Service 02 — Digital Marketing")
// This catches occurrences where the preceding chunk is a single-line / short label.

function transform(source) {
  let out = source;

  // 1. Numeric ranges → en dash
  out = out.replace(numericRange, "$1–$2");

  // 2. Surrounding spaces variant: " — " → ". " (most common)
  //    But avoid breaking title-style separators in JSX text where it follows a colon-less label.
  //    We'll first handle a few specific title patterns we know exist in the codebase:
  const titlePatterns = [
    [/(Service \d+)\s+—\s+/g, "$1 · "], // "Service 03 — AI Services" → "Service 03 · AI Services"
    [/(STEP \{p\.n\})\s+—\s+/g, "$1 · "], // already in template form
    [/(Newsletter)\s+—\s+/g, "$1 · "],
    [/(Booking 4 founder projects)\s+—\s+/g, "$1, "],
    [/(Contact us)\s+—\s+/g, "$1 · "],
    [/(Technologies)\s+—\s+/g, "$1 · "],
    [/(\b\d{2})\s+—\s+(Writing|Planning)/g, "$1 · $2"],
    [/(GEO|AEO|LLMO|S\.\d+|T\.\d+|F\.\d+)\s+—\s+/g, "$1 · "],
    [/(\bdraft\.md)\s+—\s+/g, "$1 · "],
    [/(metadata title:?\s*)?"([^"]*?)\s+—\s+(Saurabh Bhayana)"/g, '"$2 · $3"'],
  ];
  for (const [re, rep] of titlePatterns) {
    out = out.replace(re, rep);
  }

  // 3. JSX template separator: `{s.code} — {s.label}` style → use ` · `
  out = out.replace(/(\{[^}]+\})\s+—\s+(\{[^}]+\})/g, "$1 · $2");

  // 4. Generic " — " (still left) → ", " (comma + space). Reads naturally without forcing capitalization.
  out = out.replace(/\s+—\s+/g, ", ");

  // 5. Trailing "—" before newline: convert to "."
  out = out.replace(/\s+—\s*$/gm, ".");

  // 6. Any remaining em dash → "," (defensive)
  out = out.replace(/—/g, ",");

  return out;
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      // skip v2 folder so we don't touch it
      if (e.name === "v2") continue;
      yield* walk(full);
    } else if (EXTENSIONS.has(path.extname(e.name))) {
      yield full;
    }
  }
}

let touched = 0;
for await (const file of walk(ROOT)) {
  const original = await fs.readFile(file, "utf8");
  if (!original.includes("—")) continue;
  const next = transform(original);
  if (next !== original) {
    await fs.writeFile(file, next);
    touched++;
    console.log("✓", path.relative(ROOT, file));
  }
}
console.log(`\nDone. ${touched} files updated.`);
