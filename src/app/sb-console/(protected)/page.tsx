import Link from "next/link";
import { connectMongoose } from "@/lib/db/mongoose";
import { Contact, Subscriber } from "@/lib/db/models";
import { Post } from "@/lib/db/models/Post";
import { Faq } from "@/lib/db/models/Faq";
import { Testimonial } from "@/lib/db/models/Testimonial";
import { CaseStudy } from "@/lib/db/models/CaseStudy";
import { Tool } from "@/lib/db/models/Tool";
import { ActivityLog } from "@/lib/admin/activity";
import { PageHeader } from "@/components/admin/PageHeader";

export const dynamic = "force-dynamic";

async function getStats() {
  await connectMongoose();
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [
    totalContacts,
    newContacts,
    contacts24h,
    totalSubs,
    subs24h,
    publishedPosts,
    draftPosts,
    faqsCount,
    testimonialsCount,
    caseStudiesCount,
    toolsCount,
    recentActivity,
  ] = await Promise.all([
    Contact.countDocuments({}),
    Contact.countDocuments({ status: "new" }),
    Contact.countDocuments({ createdAt: { $gte: since24h } }),
    Subscriber.countDocuments({ unsubscribed: { $ne: true } }),
    Subscriber.countDocuments({
      unsubscribed: { $ne: true },
      createdAt: { $gte: since24h },
    }),
    Post.countDocuments({ published: true }),
    Post.countDocuments({ published: false }),
    Faq.countDocuments({ published: true }),
    Testimonial.countDocuments({ published: true }),
    CaseStudy.countDocuments({ published: true }),
    Tool.countDocuments({ published: true }),
    ActivityLog.find({}).sort({ createdAt: -1 }).limit(6).lean(),
  ]);

  return {
    totalContacts,
    newContacts,
    contacts24h,
    totalSubs,
    subs24h,
    publishedPosts,
    draftPosts,
    faqsCount,
    testimonialsCount,
    caseStudiesCount,
    toolsCount,
    recentActivity,
  };
}

function fmtDate(d?: Date) {
  if (!d) return "";
  return new Date(d).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminHome() {
  const stats = await getStats();

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Last 24 hours of activity across the site, plus quick links into every module."
        breadcrumbs={[{ label: "Console" }]}
      />

      <div className="px-6 md:px-10 py-10 max-w-[1240px] space-y-10">
        {/* Inbox stats */}
        <section>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono mb-3">
            Inbox · last 24h
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="New leads (24h)"
              value={stats.contacts24h}
              sub={`${stats.newContacts} unread total`}
              accent
            />
            <StatCard
              label="Subscribers (24h)"
              value={stats.subs24h}
              sub={`${stats.totalSubs} total`}
            />
            <StatCard label="All contacts" value={stats.totalContacts} sub="all-time" />
            <StatCard label="All subscribers" value={stats.totalSubs} sub="active" />
          </div>
        </section>

        {/* Content stats */}
        <section>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono mb-3">
            Content · published
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatCard
              label="Blog posts"
              value={stats.publishedPosts}
              sub={`${stats.draftPosts} drafts`}
            />
            <StatCard label="Case studies" value={stats.caseStudiesCount} sub="published" />
            <StatCard label="Testimonials" value={stats.testimonialsCount} sub="published" />
            <StatCard label="FAQs" value={stats.faqsCount} sub="visible" />
            <StatCard label="Free tools" value={stats.toolsCount} sub="visible" />
          </div>
        </section>

        {/* Quick links */}
        <section>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono mb-3">
            Quick actions
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickAction title="Project briefs" desc="Inbox of contact-form submissions." href="/sb-console/contacts" badge={stats.newContacts > 0 ? `${stats.newContacts} new` : undefined} />
            <QuickAction title="Newsletter list" desc="Active subscribers, exportable as CSV." href="/sb-console/subscribers" badge={stats.totalSubs.toLocaleString()} />
            <QuickAction title="Write a post" desc="Markdown editor with live preview." href="/sb-console/posts/new" />
            <QuickAction title="Site settings" desc="Hero badge, stats, contact, social." href="/sb-console/settings" />
            <QuickAction title="Users" desc="Role, suspend, delete." href="/sb-console/users" />
            <QuickAction title="Activity log" desc="Last 200 admin actions." href="/sb-console/activity" />
          </div>
        </section>

        {/* Recent activity peek */}
        {stats.recentActivity.length > 0 && (
          <section>
            <div className="flex items-end justify-between gap-3 mb-3">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                Recent activity
              </div>
              <Link
                href="/sb-console/activity"
                className="text-[12px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                See all →
              </Link>
            </div>
            <ul className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] divide-y divide-[var(--line)]">
              {stats.recentActivity.map((a) => (
                <li
                  key={String(a._id)}
                  className="grid grid-cols-[160px_1fr_auto] gap-4 items-center px-5 py-3 text-[13px]"
                >
                  <span className="text-[11px] text-[var(--muted)] font-mono">
                    {fmtDate(a.createdAt as Date)}
                  </span>
                  <span className="min-w-0 truncate">
                    <span className="font-mono text-[var(--accent)] mr-2">{a.action}</span>
                    {a.summary}
                  </span>
                  <span className="text-[11px] text-[var(--muted)] font-mono">
                    {a.actorEmail ?? "system"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: number;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent
          ? "border-[var(--accent)]/40 bg-[var(--surface)]"
          : "border-[var(--line)] bg-[var(--surface)]"
      }`}
    >
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
        {label}
      </div>
      <div
        className={`mt-3 font-display text-[30px] leading-none tracking-tight ${
          accent ? "text-[var(--accent)]" : "text-white"
        }`}
      >
        {value.toLocaleString()}
      </div>
      <div className="mt-2 text-[11px] text-[var(--muted)] font-mono">{sub}</div>
    </div>
  );
}

function QuickAction({
  title,
  desc,
  href,
  badge,
}: {
  title: string;
  desc: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 hover:border-[var(--accent)] hover:-translate-y-1 transition-all flex items-center justify-between gap-6"
    >
      <div>
        <div className="font-display text-[16px] tracking-tight text-white">
          {title}
        </div>
        <div className="mt-1 text-[12px] text-[var(--muted)]">{desc}</div>
      </div>
      <div className="flex items-center gap-3">
        {badge && (
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--accent)] border border-[var(--accent)]/40 px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
        <span
          aria-hidden
          className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all"
        >
          →
        </span>
      </div>
    </Link>
  );
}
