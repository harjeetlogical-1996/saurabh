/**
 * Centralized env-var access. Throws on missing required vars.
 * Keep this file edge-runtime-safe (no Node imports).
 */
function required(name: string): string {
  const value = process.env[name];
  if (!value || value.length === 0) {
    throw new Error(
      `Missing required environment variable: ${name}. Add it to .env.local.`,
    );
  }
  return value;
}

export const env = {
  get MONGODB_URI() {
    return required("MONGODB_URI");
  },
  get MONGODB_DB() {
    return process.env.MONGODB_DB || "saurabh";
  },
  get BETTER_AUTH_SECRET() {
    return required("BETTER_AUTH_SECRET");
  },
  get BETTER_AUTH_URL() {
    return process.env.BETTER_AUTH_URL || "http://localhost:3000";
  },
  get SEED_ADMIN_EMAIL() {
    return required("SEED_ADMIN_EMAIL");
  },
  get SEED_ADMIN_PASSWORD() {
    return required("SEED_ADMIN_PASSWORD");
  },
  get SEED_ADMIN_NAME() {
    return process.env.SEED_ADMIN_NAME || "Admin";
  },
};
