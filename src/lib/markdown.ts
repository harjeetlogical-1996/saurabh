/**
 * Server-only markdown -> safe HTML.
 * Uses `marked` for rendering and `isomorphic-dompurify` to scrub.
 */
import { Marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

const marked = new Marked({
  breaks: false,
  gfm: true,
});

export async function renderMarkdown(md: string): Promise<string> {
  const html = await marked.parse(md ?? "", { async: true });
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
  });
}
