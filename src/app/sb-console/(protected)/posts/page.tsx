import Link from "next/link";
import { connectMongoose } from "@/lib/db/mongoose";
import { Post } from "@/lib/db/models/Post";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/admin/Button";
import { EmptyState } from "@/components/admin/EmptyState";

export const dynamic = "force-dynamic";

async function getPosts() {
  await connectMongoose();
  return Post.find({}).sort({ updatedAt: -1 }).lean();
}

function fmtDate(d: Date | string | undefined) {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function PostsPage() {
  const posts = await getPosts();
  const publishedCount = posts.filter((p) => p.published).length;

  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title="Blog posts"
        description="Write, edit, and publish blog content. Drafts stay private until you check Published."
        breadcrumbs={[
          { label: "Console", href: "/sb-console" },
          { label: "Blog posts" },
        ]}
        meta={
          <span className="text-[12px] font-mono text-[var(--muted)]">
            {posts.length} total · {publishedCount} published · {posts.length - publishedCount} drafts
          </span>
        }
        actions={<Button href="/sb-console/posts/new">New post</Button>}
      />

      <div className="px-6 md:px-10 py-10 max-w-[1240px]">
        {posts.length === 0 ? (
          <EmptyState
            title="No posts yet."
            description='Write your first post. It will be saved as a draft until you toggle "Published".'
            action={<Button href="/sb-console/posts/new">Write your first post</Button>}
          />
        ) : (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden">
            <div className="grid grid-cols-[1fr_120px_120px_180px] gap-4 px-5 py-3 border-b border-[var(--line)] text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
              <div>Title</div>
              <div>Tag</div>
              <div>Status</div>
              <div className="text-right">Updated</div>
            </div>
            <ul>
              {posts.map((p) => {
                const id = String(p._id);
                return (
                  <li
                    key={id}
                    className="border-b border-[var(--line)] last:border-b-0"
                  >
                    <Link
                      href={`/sb-console/posts/${id}`}
                      className="grid grid-cols-[1fr_120px_120px_180px] gap-4 items-center px-5 py-4 hover:bg-[var(--bg)] transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="text-[14px] font-medium text-white truncate">
                          {p.title}
                        </div>
                        <div className="mt-1 text-[11px] text-[var(--muted)] font-mono truncate">
                          /{p.slug}
                        </div>
                      </div>
                      <div className="text-[12px] text-[var(--muted)] font-mono truncate">
                        {p.tag ?? "—"}
                      </div>
                      <div>
                        {p.published ? (
                          <span className="inline-flex text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/40">
                            published
                          </span>
                        ) : (
                          <span className="inline-flex text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-1 rounded-full border border-[var(--line)] text-[var(--muted)]">
                            draft
                          </span>
                        )}
                      </div>
                      <div className="text-right text-[11px] text-[var(--muted)] font-mono">
                        {fmtDate(p.updatedAt as Date)}
                      </div>
                    </Link>
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
