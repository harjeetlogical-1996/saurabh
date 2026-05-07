import { connectMongoose } from "@/lib/db/mongoose";
import { Contact } from "@/lib/db/models";
import { updateContactStatus, deleteContact } from "./actions";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "in_progress", "won", "lost", "spam"] as const;

async function getContacts() {
  await connectMongoose();
  const docs = await Contact.find({}).sort({ createdAt: -1 }).limit(200).lean();
  return docs;
}

function fmtDate(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <div className="px-6 md:px-10 py-10 md:py-14 max-w-[1240px]">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
            Contacts · Inbox
          </div>
          <h1 className="mt-3 font-display text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.025em]">
            Project briefs
          </h1>
          <p className="mt-2 text-[14px] text-[var(--muted)]">
            {contacts.length} most-recent submissions from the contact form.
          </p>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-10 text-center">
          <div className="text-[14px] text-[var(--muted)]">
            No contact submissions yet. They&apos;ll show up here as soon as
            someone submits the form.
          </div>
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {contacts.map((c) => {
            const id = String(c._id);
            return (
              <article
                key={id}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-7"
              >
                <div className="flex items-start justify-between gap-6 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[15px] font-semibold text-white">
                        {c.name}
                      </span>
                      <a
                        href={`mailto:${c.email}`}
                        className="text-[13px] font-mono text-[var(--accent)] hover:opacity-80 transition-opacity"
                      >
                        {c.email}
                      </a>
                      {c.company && (
                        <span className="text-[12px] text-[var(--muted)] font-mono">
                          · {c.company}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono flex-wrap">
                      <span>{fmtDate(c.createdAt as Date)}</span>
                      {c.service && <span>· {c.service}</span>}
                      {c.budget && <span>· {c.budget}</span>}
                      {c.source && <span>· src: {c.source}</span>}
                    </div>
                  </div>

                  <StatusBadge status={c.status as string} />
                </div>

                {c.message && (
                  <p className="mt-5 text-[14px] leading-[1.7] text-white/90 whitespace-pre-wrap">
                    {c.message}
                  </p>
                )}

                <div className="mt-6 pt-5 border-t border-[var(--line)] flex items-center justify-between gap-3 flex-wrap">
                  <form action={updateContactStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={id} />
                    <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
                      Status
                    </label>
                    <select
                      name="status"
                      defaultValue={c.status as string}
                      className="h-9 rounded-lg bg-[var(--bg)] border border-[var(--line)] px-3 text-[13px] text-white outline-none focus:border-[var(--accent)] transition-colors font-mono"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="h-9 px-3 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/40 text-[var(--accent)] text-[12px] font-semibold hover:bg-[var(--accent)] hover:text-black transition-colors"
                    >
                      Update
                    </button>
                  </form>

                  <form action={deleteContact}>
                    <input type="hidden" name="id" value={id} />
                    <button
                      type="submit"
                      className="h-9 px-3 rounded-lg border border-[var(--line)] text-[12px] text-[var(--muted)] hover:border-red-500/40 hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: "bg-[var(--accent)] text-black",
    in_progress: "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/40",
    won: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/40",
    lost: "bg-zinc-500/15 text-zinc-400 border border-zinc-500/40",
    spam: "bg-red-500/15 text-red-400 border border-red-500/40",
  };
  return (
    <span
      className={`shrink-0 inline-flex items-center text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-full ${map[status] || map.new}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
