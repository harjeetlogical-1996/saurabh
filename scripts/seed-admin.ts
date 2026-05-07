/**
 * Create (or upgrade) the first admin user.
 *
 * Run with:
 *   npm run seed:admin
 *
 * Reads SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD / SEED_ADMIN_NAME from .env.local.
 * Safe to run repeatedly — it will:
 *   - create the user if missing
 *   - set role: 'admin' if it isn't already
 *   - leave password alone if user exists (use "Forgot password" flow to change)
 */
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "saurabh";
const SEED_ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const SEED_ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;
const SEED_ADMIN_NAME = process.env.SEED_ADMIN_NAME || "Admin";
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET;
const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

function fail(msg: string): never {
  console.error(`\n❌  ${msg}`);
  process.exit(1);
}

if (!MONGODB_URI) fail("MONGODB_URI is required in .env.local");
if (!SEED_ADMIN_EMAIL) fail("SEED_ADMIN_EMAIL is required in .env.local");
if (!SEED_ADMIN_PASSWORD) fail("SEED_ADMIN_PASSWORD is required in .env.local");
if (!BETTER_AUTH_SECRET) fail("BETTER_AUTH_SECRET is required in .env.local");

async function main() {
  // We use Better Auth's own signup endpoint to create the user so the password
  // gets hashed exactly the way the running app expects on login.
  const { betterAuth } = await import("better-auth");
  const { mongodbAdapter } = await import("better-auth/adapters/mongodb");

  const client = new MongoClient(MONGODB_URI!);
  await client.connect();
  const db = client.db(MONGODB_DB);

  const auth = betterAuth({
    secret: BETTER_AUTH_SECRET!,
    baseURL: BETTER_AUTH_URL,
    database: mongodbAdapter(db, { client, transaction: false }),
    emailAndPassword: { enabled: true, autoSignIn: false, minPasswordLength: 8 },
    user: {
      additionalFields: {
        role: { type: "string", required: false, defaultValue: "user", input: false },
      },
    },
    advanced: { cookiePrefix: "saurabh" },
  });

  console.log(`Connecting to ${MONGODB_DB}...`);

  const userColl = db.collection("user");
  const existing = await userColl.findOne({ email: SEED_ADMIN_EMAIL!.toLowerCase() });

  if (existing) {
    if (existing.role === "admin") {
      console.log(`ℹ️  ${SEED_ADMIN_EMAIL} is already an admin. Nothing to do.`);
    } else {
      await userColl.updateOne(
        { _id: existing._id },
        { $set: { role: "admin", updatedAt: new Date() } },
      );
      console.log(`✅ Promoted ${SEED_ADMIN_EMAIL} to admin.`);
    }
  } else {
    console.log(`Creating new admin user ${SEED_ADMIN_EMAIL}...`);
    const result = await auth.api.signUpEmail({
      body: {
        email: SEED_ADMIN_EMAIL!,
        password: SEED_ADMIN_PASSWORD!,
        name: SEED_ADMIN_NAME,
      },
    });
    if (!result?.user) {
      fail("Failed to create user. Check the error above.");
    }
    await userColl.updateOne(
      { email: SEED_ADMIN_EMAIL!.toLowerCase() },
      { $set: { role: "admin", updatedAt: new Date() } },
    );
    console.log(`✅ Admin created: ${SEED_ADMIN_EMAIL}`);
    console.log(`   Password: ${SEED_ADMIN_PASSWORD}`);
    console.log(`   Change it after first login.`);
  }

  await client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
