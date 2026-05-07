import { headers } from "next/headers";
import { getAuth } from "@/lib/auth";
import { requireUser } from "@/lib/auth-server";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/admin/Button";
import { NameForm, PasswordForm } from "./AccountForms";
import { revokeSessionAction, revokeOtherSessionsAction } from "./actions";

export const dynamic = "force-dynamic";

type SessionRow = {
  token: string;
  ipAddress?: string;
  userAgent?: string;
  expiresAt: Date;
  createdAt: Date;
  current?: boolean;
};

async function getSessionList(currentToken?: string): Promise<SessionRow[]> {
  try {
    const h = await headers();
    const list = await getAuth().api.listSessions({ headers: h });
    return (list ?? []).map((s) => ({
      token: s.token,
      ipAddress: s.ipAddress ?? undefined,
      userAgent: s.userAgent ?? undefined,
      expiresAt: s.expiresAt,
      createdAt: s.createdAt,
      current: !!currentToken && s.token === currentToken,
    }));
  } catch (err) {
    console.warn("[listSessions] failed", err);
    return [];
  }
}

function fmtDate(d: Date) {
  return new Date(d).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function browserFromUA(ua?: string): string {
  if (!ua) return "Unknown";
  if (/iPhone|iPad/i.test(ua)) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  if (/Edg\//.test(ua)) return "Edge";
  if (/Chrome/.test(ua)) return "Chrome";
  if (/Safari/.test(ua)) return "Safari";
  if (/Firefox/.test(ua)) return "Firefox";
  if (/curl|node|wget/i.test(ua)) return "API client";
  return "Browser";
}

export default async function AccountPage() {
  const session = await requireUser("/sb-console/account");
  const user = session.user as unknown as {
    id: string;
    email: string;
    name?: string;
  };
  const currentToken = (session as unknown as { session?: { token?: string } })
    .session?.token;

  const sessions = await getSessionList(currentToken);

  return (
    <div>
      <PageHeader
        eyebrow="System"
        title="My account"
        description="Update your name, change your password, and review active sessions."
        breadcrumbs={[
          { label: "Console", href: "/sb-console" },
          { label: "My account" },
        ]}
      />

      <div className="px-6 md:px-10 py-10 max-w-[920px] space-y-8">
        {/* Profile */}
        <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7 md:p-9">
          <h2 className="font-display text-[20px] tracking-tight text-white">Profile</h2>
          <p className="mt-1.5 text-[13px] text-[var(--muted)]">
            Email <span className="text-white font-mono">{user.email}</span> can&apos;t
            be changed yet. Display name and password can.
          </p>
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono mb-3">
                Display name
              </div>
              <NameForm defaultName={user.name ?? ""} />
            </div>
            <div>
              <div className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono mb-3">
                Password
              </div>
              <PasswordForm />
            </div>
          </div>
        </section>

        {/* Sessions */}
        <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7 md:p-9">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="font-display text-[20px] tracking-tight text-white">
                Active sessions
              </h2>
              <p className="mt-1.5 text-[13px] text-[var(--muted)]">
                Each device that&apos;s signed in to your account.
              </p>
            </div>
            <form action={revokeOtherSessionsAction}>
              <Button type="submit" variant="secondary" size="sm">
                Sign out other devices
              </Button>
            </form>
          </div>

          {sessions.length === 0 ? (
            <div className="mt-7 text-[13px] text-[var(--muted)]">
              No active sessions besides the one you&apos;re using right now.
            </div>
          ) : (
            <ul className="mt-7 divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
              {sessions.map((s) => (
                <li
                  key={s.token}
                  className="grid grid-cols-[1fr_auto] gap-3 items-center py-4"
                >
                  <div className="min-w-0">
                    <div className="text-[14px] text-white">
                      {browserFromUA(s.userAgent)}
                      {s.current && (
                        <span className="ml-2 text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono">
                          this device
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-[11px] text-[var(--muted)] font-mono flex-wrap">
                      <span>started {fmtDate(s.createdAt)}</span>
                      <span>· expires {fmtDate(s.expiresAt)}</span>
                      {s.ipAddress && <span>· {s.ipAddress}</span>}
                    </div>
                  </div>
                  {!s.current && (
                    <form action={revokeSessionAction}>
                      <input type="hidden" name="token" value={s.token} />
                      <Button type="submit" variant="ghost" size="sm">
                        Revoke
                      </Button>
                    </form>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
