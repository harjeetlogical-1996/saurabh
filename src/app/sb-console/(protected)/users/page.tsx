import { getMongoDb } from "@/lib/db/mongo-client";
import { getSession } from "@/lib/auth-server";
import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { Button } from "@/components/admin/Button";
import { setUserSuspended, deleteUser } from "./actions";
import { RoleSelect } from "./RoleSelect";

export const dynamic = "force-dynamic";

type UserRow = {
  _id: string;
  email: string;
  name?: string;
  role?: string;
  suspended?: boolean;
  emailVerified?: boolean;
  createdAt?: Date;
};

async function getUsers(): Promise<UserRow[]> {
  const db = await getMongoDb();
  const docs = await db
    .collection("user")
    .find({})
    .sort({ createdAt: -1 })
    .limit(500)
    .toArray();
  return docs.map((d) => ({
    _id: String(d._id),
    email: String(d.email ?? ""),
    name: d.name as string | undefined,
    role: d.role as string | undefined,
    suspended: !!d.suspended,
    emailVerified: !!d.emailVerified,
    createdAt: d.createdAt as Date | undefined,
  }));
}

function fmtDate(d?: Date) {
  if (!d) return "—";
  return d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function UsersAdminPage() {
  const [users, session] = await Promise.all([getUsers(), getSession()]);
  const meId = (session?.user as unknown as { id?: string })?.id;

  const admins = users.filter((u) => u.role === "admin").length;
  const suspended = users.filter((u) => u.suspended).length;

  return (
    <div>
      <PageHeader
        eyebrow="System"
        title="Users"
        description="Promote teammates to admin, suspend abusive accounts, or delete accounts entirely."
        breadcrumbs={[
          { label: "Console", href: "/sb-console" },
          { label: "Users" },
        ]}
        meta={
          <span className="text-[12px] font-mono text-[var(--muted)]">
            {users.length} total · {admins} admin · {suspended} suspended
          </span>
        }
      />

      <div className="px-6 md:px-10 py-10 max-w-[1240px]">
        {users.length === 0 ? (
          <EmptyState title="No users yet." />
        ) : (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden">
            <div className="grid grid-cols-[1.4fr_1fr_120px_120px_240px] gap-4 px-5 py-3 border-b border-[var(--line)] text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
              <div>User</div>
              <div>Joined</div>
              <div>Role</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>
            <ul>
              {users.map((u) => {
                const isMe = u._id === meId;
                return (
                  <li
                    key={u._id}
                    className="grid grid-cols-[1.4fr_1fr_120px_120px_240px] gap-4 items-center px-5 py-4 border-b border-[var(--line)] last:border-b-0 hover:bg-[var(--bg)] transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="text-[14px] font-medium text-white truncate">
                        {u.name || u.email}
                        {isMe && (
                          <span className="ml-2 text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono">
                            you
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 text-[12px] text-[var(--muted)] font-mono truncate">
                        {u.email}
                      </div>
                    </div>
                    <div className="text-[12px] text-[var(--muted)] font-mono">
                      {fmtDate(u.createdAt)}
                    </div>

                    {/* Role */}
                    <div>
                      <RoleSelect
                        userId={u._id}
                        defaultValue={u.role ?? "user"}
                        disabled={isMe}
                      />
                    </div>

                    {/* Status */}
                    <div>
                      {u.suspended ? (
                        <span className="inline-flex text-[10px] font-mono uppercase tracking-[0.18em] px-2 py-1 rounded-full border border-red-500/40 text-red-400">
                          suspended
                        </span>
                      ) : (
                        <span className="inline-flex text-[10px] font-mono uppercase tracking-[0.18em] px-2 py-1 rounded-full border border-[var(--accent)]/40 text-[var(--accent)]">
                          active
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2">
                      {!isMe && (
                        <>
                          <form action={setUserSuspended}>
                            <input type="hidden" name="id" value={u._id} />
                            <input
                              type="hidden"
                              name="suspended"
                              value={u.suspended ? "false" : "true"}
                            />
                            <Button type="submit" size="sm" variant="secondary">
                              {u.suspended ? "Unsuspend" : "Suspend"}
                            </Button>
                          </form>
                          <form action={deleteUser}>
                            <input type="hidden" name="id" value={u._id} />
                            <Button type="submit" size="sm" variant="danger">
                              Delete
                            </Button>
                          </form>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <p className="mt-5 text-[12px] text-[var(--muted)] font-mono">
          You can&apos;t demote, suspend, or delete your own account.
        </p>
      </div>
    </div>
  );
}
