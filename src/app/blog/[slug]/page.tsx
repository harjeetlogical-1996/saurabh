import { permanentRedirect } from "next/navigation";

/**
 * Old blog URLs (/blog/[slug]) permanently redirect to the new flat
 * URL (/[slug]). Keeps backlinks and social shares working.
 */
export default async function LegacyBlogRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/${slug}`);
}
