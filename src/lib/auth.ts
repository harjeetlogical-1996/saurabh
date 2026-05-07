import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Build the Better Auth instance once per Node process. Cached on globalThis
// so Next.js dev hot-reloads don't spawn a new MongoClient per change.
const globalForAuth = globalThis as unknown as {
  __betterAuth?: ReturnType<typeof buildInstance>;
  __betterAuthClient?: MongoClient;
};

function buildInstance() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "saurabh";
  const secret = process.env.BETTER_AUTH_SECRET;
  const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

  // Cross-subdomain SSO. In production set this to ".saurabhbhayana.com"
  // (note the leading dot). When unset, cookies stay scoped to the current
  // host, which is what you want on localhost.
  const cookieDomain = process.env.AUTH_COOKIE_DOMAIN;

  // Comma-separated list of additional origins that are allowed to call
  // the auth API. The marketing site origin (BETTER_AUTH_URL) is always
  // trusted automatically, so this list is for sibling subdomains:
  //   AUTH_TRUSTED_ORIGINS="https://tools.saurabhbhayana.com,https://app.saurabhbhayana.com"
  const trustedOrigins = (process.env.AUTH_TRUSTED_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!uri || !secret) {
    throw new Error(
      "Auth is not configured. Set MONGODB_URI and BETTER_AUTH_SECRET in .env.local.",
    );
  }

  if (!globalForAuth.__betterAuthClient) {
    globalForAuth.__betterAuthClient = new MongoClient(uri);
  }
  const client = globalForAuth.__betterAuthClient;
  const db = client.db(dbName);

  return betterAuth({
    secret,
    baseURL,
    trustedOrigins,
    database: mongodbAdapter(db, { client, transaction: false }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      autoSignIn: true,
      minPasswordLength: 8,
    },
    user: {
      additionalFields: {
        role: {
          type: "string",
          required: false,
          defaultValue: "user",
          input: false,
        },
        plan: {
          type: "string",
          required: false,
          defaultValue: "free",
          input: false,
        },
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 30,
      updateAge: 60 * 60 * 24,
      cookieCache: { enabled: true, maxAge: 60 * 5 },
    },
    advanced: {
      cookiePrefix: "saurabh",
      // When AUTH_COOKIE_DOMAIN is set (production), Better Auth writes the
      // session cookie scoped to the parent domain so every subdomain can
      // read it. When unset (local dev), cookies stay host-scoped.
      ...(cookieDomain
        ? {
            crossSubDomainCookies: {
              enabled: true,
              domain: cookieDomain,
            },
            defaultCookieAttributes: {
              sameSite: "lax",
              secure: true,
            },
          }
        : {}),
    },
  });
}

/**
 * Lazy singleton accessor. Reads env at call time so `next build` doesn't
 * fail when env vars are absent (e.g. CI preview without secrets).
 */
export function getAuth() {
  if (globalForAuth.__betterAuth) return globalForAuth.__betterAuth;
  const instance = buildInstance();
  globalForAuth.__betterAuth = instance;
  return instance;
}

export type Session = ReturnType<typeof buildInstance>["$Infer"]["Session"];
