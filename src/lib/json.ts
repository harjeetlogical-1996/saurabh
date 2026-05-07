/**
 * Pull a JSON object/array out of a model response that might be wrapped in
 * markdown fences, prefixed with prose, or contain string-literals with stray
 * quotes/braces.
 *
 * Strategy:
 *   1. Strip markdown fences.
 *   2. Walk the string with a tiny tokenizer that respects string literals
 *      (and escape sequences) so the brace counter doesn't get fooled by
 *      braces inside quoted text.
 *   3. Slice from the first opening `{`/`[` to its matching close.
 */
export function extractJson<T = unknown>(text: string): T {
  let s = text.trim();
  // Strip ```json … ``` fences (any leading prose before the fence is dropped).
  s = s.replace(/^[\s\S]*?```(?:json)?\s*/i, "").replace(/```[\s\S]*$/, "").trim();

  // If still no clear opener up front, drop preamble until first { or [.
  const opener = findFirstOpener(s);
  if (opener === -1) {
    throw new Error("No JSON object or array found in model response");
  }
  s = s.slice(opener);

  const closer = findMatchingCloser(s);
  if (closer === -1) {
    // Last-resort: treat the whole remaining string as the candidate.
    return JSON.parse(repair(s)) as T;
  }

  const candidate = s.slice(0, closer + 1);
  return JSON.parse(repair(candidate)) as T;
}

function findFirstOpener(s: string): number {
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "{" || c === "[") return i;
  }
  return -1;
}

/**
 * Walk the string from index 0 (which must be { or [) and return the index
 * of the matching closing brace, or -1 if unbalanced.
 */
function findMatchingCloser(s: string): number {
  const open = s[0];
  if (open !== "{" && open !== "[") return -1;
  const close = open === "{" ? "}" : "]";

  let depth = 0;
  let inString = false;
  let stringChar = "";
  let escaped = false;

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (c === "\\") {
        escaped = true;
      } else if (c === stringChar) {
        inString = false;
      }
      continue;
    }

    if (c === '"' || c === "'") {
      inString = true;
      stringChar = c;
      continue;
    }

    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/** Strip trailing commas before close braces, which Gemini occasionally emits. */
function repair(s: string): string {
  return s.replace(/,(\s*[}\]])/g, "$1");
}
