/**
 * Server-side auth helpers. Use these from route handlers, server components,
 * and middleware-adjacent code. NEVER import this from client components.
 */
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "./auth";

export async function getSession() {
  const h = await headers();
  return getAuth().api.getSession({ headers: h });
}

/** Require any authenticated user. Redirects to /login?next=… if missing. */
export async function requireUser(redirectTo?: string) {
  const session = await getSession();
  if (!session?.user) {
    const next = redirectTo ?? "/dashboard";
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }
  // Block suspended accounts everywhere they try to land.
  const suspended = (session.user as unknown as { suspended?: boolean }).suspended;
  if (suspended) {
    redirect(`/login?suspended=1`);
  }
  return session;
}

/**
 * Require an admin. Redirects to /login if not signed in,
 * or to /dashboard if signed in but not an admin.
 */
export async function requireAdmin(loginPath: string = "/sb-console/login") {
  const session = await getSession();
  if (!session?.user) {
    redirect(`${loginPath}?next=/sb-console`);
  }
  const user = session.user as unknown as { role?: string; suspended?: boolean };
  if (user.suspended) {
    redirect(`${loginPath}?suspended=1`);
  }
  if (user.role !== "admin") {
    // Don't reveal admin paths to non-admin users; send them to the
    // public dashboard or 404.
    redirect("/dashboard");
  }
  return session;
}
