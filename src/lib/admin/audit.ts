/**
 * Helper to append admin action records to the ActivityLog.
 * Failure to log must NEVER break the underlying action, so we swallow
 * errors and just console.error.
 */
import { headers } from "next/headers";
import { connectMongoose } from "@/lib/db/mongoose";
import { getSession } from "@/lib/auth-server";
import { ActivityLog } from "./activity";

export type AuditEntry = {
  action: string;
  entity: string;
  entityId?: string;
  summary?: string;
  metadata?: Record<string, unknown>;
};

export async function recordActivity(entry: AuditEntry): Promise<void> {
  try {
    const session = await getSession();
    const user = session?.user as
      | { id?: string; email?: string }
      | undefined;
    const h = await headers();

    await connectMongoose();
    await ActivityLog.create({
      actorId: user?.id ?? null,
      actorEmail: user?.email ?? null,
      action: entry.action,
      entity: entry.entity,
      entityId: entry.entityId ?? null,
      summary: entry.summary ?? null,
      metadata: entry.metadata ?? null,
      ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
      userAgent: h.get("user-agent") ?? null,
    });
  } catch (err) {
    console.error("[recordActivity] failed", err);
  }
}
