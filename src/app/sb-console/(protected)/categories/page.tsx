import { connectMongoose } from "@/lib/db/mongoose";
import { Category } from "@/lib/db/models/Category";
import { Post } from "@/lib/db/models/Post";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/admin/Button";
import { EmptyState } from "@/components/admin/EmptyState";
import { Field, TextInput, TextArea } from "@/components/admin/Field";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  seedDefaultCategories,
} from "./actions";

export const dynamic = "force-dynamic";

async function getData() {
  await connectMongoose();
  const [cats, postRows] = await Promise.all([
    Category.find().sort({ order: 1, name: 1 }).lean(),
    Post.aggregate<{ _id: string | null; count: number }>([
      { $group: { _id: "$tag", count: { $sum: 1 } } },
    ]),
  ]);
  const counts = new Map<string, number>();
  for (const row of postRows) {
    if (row._id) counts.set(row._id, row.count);
  }
  return { cats, counts };
}

export default async function CategoriesAdminPage() {
  const { cats, counts } = await getData();

  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title="Categories"
        description="Master list of categories used to tag blog posts. Categories control filters and listing labels on the public blog."
        breadcrumbs={[
          { label: "Console", href: "/sb-console" },
          { label: "Categories" },
        ]}
        meta={
          <span className="text-[12px] font-mono text-[var(--muted)]">
            {cats.length} total · changing a category name updates every tagged post
          </span>
        }
      />

      <div className="px-6 md:px-10 py-10 max-w-[1100px] space-y-8">
        {/* Create */}
        <details className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
          <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <div className="font-display text-[18px] tracking-tight">
                Add a new category
              </div>
              <div className="mt-1 text-[12px] text-[var(--muted)]">
                Slug is auto-generated from the name unless you set one.
              </div>
            </div>
            <span className="text-[var(--accent)] text-[20px]">+</span>
          </summary>
          <form action={createCategory} className="px-6 pb-6 space-y-4 border-t border-[var(--line)] pt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name" required>
                <TextInput
                  name="name"
                  placeholder="AI SEO"
                  required
                  maxLength={60}
                />
              </Field>
              <Field label="Slug" hint="Optional · auto from name">
                <TextInput
                  name="slug"
                  placeholder="ai-seo"
                  maxLength={80}
                />
              </Field>
            </div>
            <Field label="Description" hint="Shown on category landing pages and meta">
              <TextArea
                name="description"
                rows={3}
                maxLength={300}
                placeholder="GEO, AEO, and LLMO playbooks..."
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Order" hint="Lower numbers show first">
                <TextInput
                  name="order"
                  type="number"
                  defaultValue={cats.length}
                  min={0}
                  max={9999}
                />
              </Field>
              <Field label="Published?">
                <label className="inline-flex items-center gap-2 h-11 text-[14px] text-white">
                  <input
                    name="published"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 accent-[var(--accent)] rounded"
                  />
                  Visible on the public site
                </label>
              </Field>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button type="submit">Create category</Button>
            </div>
          </form>
        </details>

        {/* List */}
        {cats.length === 0 ? (
          <EmptyState
            title="No categories yet."
            description="Either add one above, or seed the five starter categories that match the topics already on the blog."
            action={
              <form action={seedDefaultCategories}>
                <Button type="submit" variant="secondary" size="md">
                  Seed 5 starter categories
                </Button>
              </form>
            }
          />
        ) : (
          <ul className="space-y-3">
            {cats.map((c) => {
              const id = String(c._id);
              const inUse = counts.get(c.name) ?? 0;
              return (
                <li
                  key={id}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]"
                >
                  <details>
                    <summary className="cursor-pointer list-none px-6 py-5 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-[15px] font-medium text-white truncate">
                          {c.name}
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono flex-wrap">
                          <span>/{c.slug}</span>
                          <span>·</span>
                          <span>order {c.order}</span>
                          <span>·</span>
                          <span>
                            {inUse} {inUse === 1 ? "post" : "posts"}
                          </span>
                          <span>·</span>
                          <span
                            className={
                              c.published
                                ? "text-[var(--accent)]"
                                : "text-red-400"
                            }
                          >
                            {c.published ? "published" : "hidden"}
                          </span>
                        </div>
                        {c.description && (
                          <div className="mt-2 text-[13px] text-[var(--muted)] line-clamp-1">
                            {c.description}
                          </div>
                        )}
                      </div>
                      <span className="text-[var(--muted)] text-[18px]">v</span>
                    </summary>
                    <form
                      action={updateCategory}
                      className="px-6 pb-6 space-y-4 border-t border-[var(--line)] pt-5"
                    >
                      <input type="hidden" name="id" value={id} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Name" required>
                          <TextInput
                            name="name"
                            defaultValue={c.name}
                            required
                            maxLength={60}
                          />
                        </Field>
                        <Field
                          label="Slug"
                          hint="Changing the slug breaks old category URLs"
                        >
                          <TextInput
                            name="slug"
                            defaultValue={c.slug}
                            maxLength={80}
                          />
                        </Field>
                      </div>
                      <Field label="Description">
                        <TextArea
                          name="description"
                          defaultValue={c.description ?? ""}
                          rows={3}
                          maxLength={300}
                        />
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Order">
                          <TextInput
                            name="order"
                            type="number"
                            defaultValue={c.order}
                            min={0}
                            max={9999}
                          />
                        </Field>
                        <Field label="Published?">
                          <label className="inline-flex items-center gap-2 h-11 text-[14px] text-white">
                            <input
                              name="published"
                              type="checkbox"
                              defaultChecked={c.published}
                              className="h-4 w-4 accent-[var(--accent)] rounded"
                            />
                            Visible on the public site
                          </label>
                        </Field>
                      </div>
                      <div className="flex items-center justify-between gap-3 pt-2">
                        <Button type="submit" size="sm">
                          Save
                        </Button>
                      </div>
                    </form>

                    <form
                      action={deleteCategory}
                      className="px-6 pb-6 -mt-4 flex justify-end"
                    >
                      <input type="hidden" name="id" value={id} />
                      <Button
                        type="submit"
                        variant="danger"
                        size="sm"
                        disabled={inUse > 0}
                        title={
                          inUse > 0
                            ? `Cannot delete: ${inUse} post(s) still use this category`
                            : "Delete category"
                        }
                      >
                        {inUse > 0 ? `In use (${inUse})` : "Delete"}
                      </Button>
                    </form>
                  </details>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
