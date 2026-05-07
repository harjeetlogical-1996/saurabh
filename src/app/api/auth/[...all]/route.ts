import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Defer building the handler until the first actual request. If we
// initialize at module top-level, `next build` evaluates this file during
// page-data collection and crashes when MONGODB_URI / BETTER_AUTH_SECRET
// aren't set in the build container.
let cached: ReturnType<typeof toNextJsHandler> | null = null;
function handler() {
  if (!cached) cached = toNextJsHandler(getAuth());
  return cached;
}

export async function GET(req: Request) {
  return handler().GET(req);
}
export async function POST(req: Request) {
  return handler().POST(req);
}
