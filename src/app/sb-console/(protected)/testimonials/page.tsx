import { connectMongoose } from "@/lib/db/mongoose";
import { Testimonial } from "@/lib/db/models/Testimonial";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/admin/Button";
import { EmptyState } from "@/components/admin/EmptyState";
import { Field, TextInput, TextArea } from "@/components/admin/Field";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  seedTestimonials,
} from "./actions";

export const dynamic = "force-dynamic";

async function getList() {
  await connectMongoose();
  return Testimonial.find({})
    .sort({ order: 1, createdAt: 1 })
    .lean();
}

export default async function TestimonialsAdminPage() {
  const items = await getList();

  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title="Testimonials"
        description="Client quotes shown on the home page. Mark one as featured to display it as the highlighted yellow card."
        breadcrumbs={[
          { label: "Console", href: "/sb-console" },
          { label: "Testimonials" },
        ]}
        meta={
          <span className="text-[12px] font-mono text-[var(--muted)]">
            {items.length} total · order controls layout sequence
          </span>
        }
      />

      <div className="px-6 md:px-10 py-10 max-w-[1100px] space-y-8">
        {/* Create */}
        <details className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
          <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <div className="font-display text-[18px] tracking-tight">
                Add a testimonial
              </div>
              <div className="mt-1 text-[12px] text-[var(--muted)]">
                Real names + role + sector + country in the role line gets the most trust.
              </div>
            </div>
            <span className="text-[var(--accent)] text-[20px]">＋</span>
          </summary>
          <form action={createTestimonial} className="px-6 pb-6 space-y-4 border-t border-[var(--line)] pt-5">
            <Field label="Quote" required>
              <TextArea name="body" rows={4} required maxLength={1500} placeholder="Saurabh rebuilt our website on Next.js…" />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name" required>
                <TextInput name="name" required maxLength={200} placeholder="Maya Chen" />
              </Field>
              <Field label="Role / company / sector" hint="Comma-separated reads best">
                <TextInput name="role" maxLength={200} placeholder="Head of Growth, Helix Health (B2B SaaS · US)" />
              </Field>
            </div>
            <Field label="Avatar URL" hint="Square headshot, 160×160 minimum">
              <TextInput
                name="avatarUrl"
                type="url"
                maxLength={1000}
                placeholder="https://images.unsplash.com/..."
              />
            </Field>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Field label="Order">
                <TextInput name="order" type="number" defaultValue={items.length} min={0} max={9999} />
              </Field>
              <Field label="Published?">
                <label className="inline-flex items-center gap-2 h-11 text-[14px] text-white">
                  <input name="published" type="checkbox" defaultChecked className="h-4 w-4 accent-[var(--accent)] rounded" />
                  Visible on the public site
                </label>
              </Field>
              <Field label="Featured?" hint="Yellow card">
                <label className="inline-flex items-center gap-2 h-11 text-[14px] text-white">
                  <input name="featured" type="checkbox" className="h-4 w-4 accent-[var(--accent)] rounded" />
                  Highlight as featured
                </label>
              </Field>
            </div>
            <Button type="submit">Create testimonial</Button>
          </form>
        </details>

        {/* List */}
        {items.length === 0 ? (
          <EmptyState
            title="No testimonials yet."
            description="Add one above, or seed the three starter testimonials from the launch design."
            action={
              <form action={seedTestimonials}>
                <Button type="submit" variant="secondary">
                  Seed 3 starter testimonials
                </Button>
              </form>
            }
          />
        ) : (
          <ul className="space-y-3">
            {items.map((t) => {
              const id = String(t._id);
              return (
                <li key={id} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
                  <details>
                    <summary className="cursor-pointer list-none px-6 py-5 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-[15px] font-medium text-white truncate">
                          {t.name}
                          {t.featured && (
                            <span className="ml-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--accent)] border border-[var(--accent)]/40 px-1.5 py-0.5 rounded-full">
                              featured
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-[12px] text-[var(--muted)] truncate">
                          {t.role ?? "—"}
                        </div>
                        <div className="mt-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
                          <span>order {t.order}</span>
                          <span className={t.published ? "text-[var(--accent)]" : "text-red-400"}>
                            {t.published ? "published" : "hidden"}
                          </span>
                        </div>
                      </div>
                      <span className="text-[var(--muted)] text-[18px]">▾</span>
                    </summary>
                    <form action={updateTestimonial} className="px-6 pb-6 space-y-4 border-t border-[var(--line)] pt-5">
                      <input type="hidden" name="id" value={id} />
                      <Field label="Quote" required>
                        <TextArea name="body" defaultValue={t.body} rows={4} required maxLength={1500} />
                      </Field>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Name" required>
                          <TextInput name="name" defaultValue={t.name} required maxLength={200} />
                        </Field>
                        <Field label="Role / company / sector">
                          <TextInput name="role" defaultValue={t.role ?? ""} maxLength={200} />
                        </Field>
                      </div>
                      <Field label="Avatar URL">
                        <TextInput name="avatarUrl" type="url" defaultValue={t.avatarUrl ?? ""} maxLength={1000} />
                      </Field>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Field label="Order">
                          <TextInput name="order" type="number" defaultValue={t.order} min={0} max={9999} />
                        </Field>
                        <Field label="Published?">
                          <label className="inline-flex items-center gap-2 h-11 text-[14px] text-white">
                            <input name="published" type="checkbox" defaultChecked={t.published} className="h-4 w-4 accent-[var(--accent)] rounded" />
                            Visible
                          </label>
                        </Field>
                        <Field label="Featured?">
                          <label className="inline-flex items-center gap-2 h-11 text-[14px] text-white">
                            <input name="featured" type="checkbox" defaultChecked={t.featured} className="h-4 w-4 accent-[var(--accent)] rounded" />
                            Featured
                          </label>
                        </Field>
                      </div>
                      <Button type="submit" size="sm">Save</Button>
                    </form>
                    <form action={deleteTestimonial} className="px-6 pb-6 -mt-4 flex justify-end">
                      <input type="hidden" name="id" value={id} />
                      <Button type="submit" variant="danger" size="sm">Delete</Button>
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
