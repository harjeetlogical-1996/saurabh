/**
 * URL-safe slug from any input string.
 * "Hello, World! 2026" → "hello-world-2026"
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}
