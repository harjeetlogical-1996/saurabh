import { connectMongoose } from "@/lib/db/mongoose";
import { ActivityLog } from "@/lib/admin/activity";
import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";

export const dynamic = "force-dynamic";

async function getEntries() {
  await connectMongoose();
  return ActivityLog.find({}).sort({ createdAt: -1 }).limit(200).lean();
}

function fmtDate(d?: Date) {
  if (!d) return "—";
  return new Date(d).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const ACTION_COLORS: Record<string, string> = {
  create: "text-[var(--accent)]",
  update: "text-white",
  delete: "text-red-400",
  seed: "text-[var(--accent)]",
  suspend: "text-red-400",
  unsuspend: "text-[var(--accent)]",
  role: "text-white",
  revoke: "text-[var(--muted)]",
  revoke_others: "text-[var(--muted)]",
  change_password: "text-white",
  update_name: "text-white",
};

function actionTone(action: string): string {
  const verb = action.split(".")[1] ?? "";
  return ACTION_COLORS[verb] ?? "text-[var(--muted)]";
}

export default async function ActivityPage() {
  const entries = await getEntries();

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Activity"
        description="Append-only log of admin actions. Last 200 events shown."
        breadcrumbs={[
          { label: "Console", href: "/sb-console" },
          { label: "Activity" },
        ]}
      />

      <div className="px-6 md:px-10 py-10 max-w-[1100px]">
        {entries.length === 0 ? (
          <EmptyState
            title="No admin activity yet."
            description="Anything you create, update, or delete in the console will land here."
          />
        ) : (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden">
            <ul className="divide-y divide-[var(--line)]">
              {entries.map((e) => {
                const id = String(e._id);
                return (
                  <li
                    key={id}
                    className="grid grid-cols-[160px_1fr_auto] gap-4 items-center px-5 py-4 hover:bg-[var(--bg)] transition-colors"
                  >
                    <div className="text-[11px] font-mono text-[var(--muted)]">
                      {fmtDate(e.createdAt as Date)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[13px]">
                        <span className={`font-mono ${actionTone(e.action)}`}>
                          {e.action}
                        </span>
                        {e.summary && (
                          <span className="text-white truncate">
                            {e.summary}
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--muted)] font-mono truncate">
                        {e.actorEmail ?? "system"}
                        {e.entityId && (
                          <>
                            <span className="mx-1.5 text-[var(--line-2)]">·</span>
                            <span>{e.entity}/{e.entityId}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
                      {e.entity}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
