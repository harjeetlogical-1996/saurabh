/**
 * Cached Mongoose connection. Next.js hot-reloads the module graph in dev,
 * so we keep one connection on globalThis to avoid spawning a new pool per request.
 */
import mongoose from "mongoose";
import { env } from "../env";

type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as unknown as {
  __mongoose?: Cached;
};

const cached: Cached =
  globalForMongoose.__mongoose ?? { conn: null, promise: null };

if (!globalForMongoose.__mongoose) {
  globalForMongoose.__mongoose = cached;
}

export async function connectMongoose(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(env.MONGODB_URI, {
      dbName: env.MONGODB_DB,
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
