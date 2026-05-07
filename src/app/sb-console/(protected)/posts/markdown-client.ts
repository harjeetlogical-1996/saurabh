"use client";

/**
 * Lightweight client-side markdown for the live preview.
 * NOT used to render the public site (the server renders that with marked + DOMPurify).
 */
export function renderMarkdownClient(md: string): string {
  if (!md) return "";
  let html = md;

  // Escape raw HTML first (the preview should match what marked produces).
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks
  html = html.replace(
    /```([\s\S]*?)```/g,
    (_m, code) => `<pre><code>${code.trim()}</code></pre>`,
  );
  // Inline code
  html = html.replace(/`([^`\n]+)`/g, "<code>$1</code>");
  // Headings
  html = html
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>");
  // Bold/italic
  html = html
    .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  // Links
  html = html.replace(
    /\[([^\]]+)\]\((https?:[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
  // Lists
  html = html.replace(/^(?:- (.*)(?:\n|$))+/gm, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((line) => `<li>${line.replace(/^- /, "")}</li>`)
      .join("");
    return `<ul>${items}</ul>`;
  });
  // Paragraphs
  html = html
    .split(/\n{2,}/)
    .map((para) => {
      if (/^<(h\d|ul|pre|blockquote|p)/.test(para.trim())) return para;
      return `<p>${para.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");

  return html;
}
