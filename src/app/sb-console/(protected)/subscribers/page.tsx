import { connectMongoose } from "@/lib/db/mongoose";
import { Subscriber } from "@/lib/db/models";
import { deleteSubscriber, toggleUnsubscribe } from "./actions";

export const dynamic = "force-dynamic";

async function getSubscribers() {
  await connectMongoose();
  const [docs, activeCount, unsubCount] = await Promise.all([
    Subscriber.find({}).sort({ createdAt: -1 }).limit(500).lean(),
    Subscriber.countDocuments({ unsubscribed: { $ne: true } }),
    Subscriber.countDocuments({ unsubscribed: true }),
  ]);
  return { docs, activeCount, unsubCount };
}

function fmtDate(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function SubscribersPage() {
  const { docs, activeCount, unsubCount } = await getSubscribers();

  return (
    <div className="px-6 md:px-10 py-10 md:py-14 max-w-[1240px]">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
            Newsletter · Subscribers
          </div>
          <h1 className="mt-3 font-display text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.025em]">
            {activeCount.toLocaleString()} active subscribers
          </h1>
          <p className="mt-2 text-[14px] text-[var(--muted)]">
            {unsubCount.toLocaleString()} unsubscribed · {docs.length} most-recent shown.
          </p>
        </div>

        <a
          href="/api/sb-console/subscribers/export"
          className="inline-flex h-11 items-center gap-2 px-5 rounded-full bg-[var(--accent)] text-black font-semibold text-[13px] hover:shadow-[0_0_24px_var(--accent-glow)] transition-shadow"
          download
        >
          Export CSV
          <span aria-hidden>↓</span>
        </a>
      </div>

      {docs.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-10 text-center">
          <div className="text-[14px] text-[var(--muted)]">
            No subscribers yet. The footer newsletter form feeds this list.
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden">
          <div className="grid grid-cols-[1fr_140px_140px_220px] gap-4 px-5 py-3 border-b border-[var(--line)] text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
            <div>Email</div>
            <div>Source</div>
            <div>Status</div>
            <div className="text-right">Joined / Actions</div>
          </div>
          <ul>
            {docs.map((s) => {
              const id = String(s._id);
              return (
                <li
                  key={id}
                  className="grid grid-cols-[1fr_140px_140px_220px] gap-4 items-center px-5 py-4 border-b border-[var(--line)] last:border-b-0 hover:bg-[var(--bg)] transition-colors"
                >
                  <div className="font-mono text-[13px] text-white truncate">
                    {s.email}
                  </div>
                  <div className="text-[12px] text-[var(--muted)] font-mono truncate">
                    {s.source ?? "—"}
                  </div>
                  <div>
                    {s.unsubscribed ? (
                      <span className="inline-flex text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-1 rounded-full border border-[var(--line)] text-[var(--muted)]">
                        unsubscribed
                      </span>
                    ) : (
                      <span className="inline-flex text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/40">
                        active
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-[11px] text-[var(--muted)] font-mono">
                      {fmtDate(s.createdAt as Date)}
                    </span>
                    <form action={toggleUnsubscribe}>
                      <input type="hidden" name="id" value={id} />
                      <button
                        type="submit"
                        className="text-[11px] font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                      >
                        {s.unsubscribed ? "Resub" : "Unsub"}
                      </button>
                    </form>
                    <form action={deleteSubscriber}>
                      <input type="hidden" name="id" value={id} />
                      <button
                        type="submit"
                        className="text-[11px] font-mono text-[var(--muted)] hover:text-red-400 transition-colors"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
