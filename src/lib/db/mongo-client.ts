/**
 * Native MongoClient instance for Better Auth's Mongo adapter.
 * Cached on globalThis to survive Next.js dev hot-reloads.
 */
import { MongoClient, type Db } from "mongodb";
import { env } from "../env";

const globalForMongo = globalThis as unknown as {
  __mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> {
  if (!globalForMongo.__mongoClientPromise) {
    const client = new MongoClient(env.MONGODB_URI);
    globalForMongo.__mongoClientPromise = client.connect();
  }
  return globalForMongo.__mongoClientPromise;
}

export async function getMongoDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(env.MONGODB_DB);
}

export async function getMongoClient(): Promise<MongoClient> {
  return getClientPromise();
}
