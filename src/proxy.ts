import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy (formerly middleware in Next.js < 16):
 *  - Forces noindex headers on the admin console + its API. Even if the obscure
 *    URL leaks, search engines and AI crawlers drop it from their index.
 *  - Bot-blocking on common admin probes (/admin, /wp-admin, /administrator,
 *    etc.) returns 404 so scanners don't even know the routes existed.
 */
const ADMIN_PROBE_PATHS = new Set([
  "/admin",
  "/admin/",
  "/wp-admin",
  "/wp-admin/",
  "/wp-login.php",
  "/wp-login",
  "/administrator",
  "/administrator/",
  "/cpanel",
  "/phpmyadmin",
  "/phpMyAdmin",
]);

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Send common admin probes to a generic 404 (no signal that we have a console).
  if (ADMIN_PROBE_PATHS.has(pathname)) {
    return new NextResponse(null, { status: 404 });
  }

  // Forward the pathname to server components so the root layout knows
  // whether to inject custom head/body code (excluded from /sb-console).
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  const res = NextResponse.next({ request: { headers: requestHeaders } });

  // 2. Block crawlers from the real console + its API at the header level,
  //    in addition to the in-page <meta> robots tag.
  if (
    pathname.startsWith("/sb-console") ||
    pathname.startsWith("/api/sb-console") ||
    pathname.startsWith("/api/auth")
  ) {
    res.headers.set(
      "X-Robots-Tag",
      "noindex, nofollow, noarchive, nosnippet, noimageindex",
    );
    res.headers.set("Cache-Control", "private, no-store");
  }

  return res;
}

export const config = {
  // Run on every path except Next.js internals and static assets.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|webp|svg|ico|css|js|map|woff2?)).*)",
  ],
};
