import { connectMongoose } from "@/lib/db/mongoose";
import { Faq } from "@/lib/db/models/Faq";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/admin/Button";
import { EmptyState } from "@/components/admin/EmptyState";
import { Field, TextInput, TextArea } from "@/components/admin/Field";
import {
  createFaq,
  updateFaq,
  deleteFaq,
  seedFromStaticList,
} from "./actions";

export const dynamic = "force-dynamic";

async function getFaqs() {
  await connectMongoose();
  return Faq.find({ page: "home" })
    .sort({ order: 1, createdAt: 1 })
    .lean();
}

export default async function FaqsAdminPage() {
  const faqs = await getFaqs();

  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title="FAQs"
        description="Question/answer pairs shown on the home page. Order controls the display sequence."
        breadcrumbs={[
          { label: "Console", href: "/sb-console" },
          { label: "FAQs" },
        ]}
        meta={
          <span className="text-[12px] font-mono text-[var(--muted)]">
            {faqs.length} total · published controls visibility on the public site
          </span>
        }
      />

      <div className="px-6 md:px-10 py-10 max-w-[1100px] space-y-8">
        {/* Create */}
        <details className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
          <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <div className="font-display text-[18px] tracking-tight">
                Add a new FAQ
              </div>
              <div className="mt-1 text-[12px] text-[var(--muted)]">
                Answers support inline HTML — &lt;strong&gt;, &lt;em&gt;, &lt;a href&gt;.
              </div>
            </div>
            <span className="text-[var(--accent)] text-[20px]">＋</span>
          </summary>
          <form action={createFaq} className="px-6 pb-6 space-y-4 border-t border-[var(--line)] pt-5">
            <Field label="Question" required>
              <TextInput
                name="question"
                placeholder="What services do you offer?"
                required
                maxLength={300}
              />
            </Field>
            <Field label="Answer" required hint="HTML allowed">
              <TextArea
                name="answer"
                placeholder="Three core service lines: <strong>Website Development</strong>..."
                rows={5}
                required
                maxLength={5000}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Order" hint="Lower numbers show first">
                <TextInput
                  name="order"
                  type="number"
                  defaultValue={faqs.length}
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
              <Button type="submit">Create FAQ</Button>
            </div>
          </form>
        </details>

        {/* List */}
        {faqs.length === 0 ? (
          <EmptyState
            title="No FAQs yet."
            description="Either add one above, or seed the eight starter FAQs the site originally shipped with."
            action={
              <form action={seedFromStaticList}>
                <Button type="submit" variant="secondary" size="md">
                  Seed 8 starter FAQs
                </Button>
              </form>
            }
          />
        ) : (
          <ul className="space-y-3">
            {faqs.map((f) => {
              const id = String(f._id);
              return (
                <li
                  key={id}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]"
                >
                  <details>
                    <summary className="cursor-pointer list-none px-6 py-5 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-[15px] font-medium text-white truncate">
                          {f.question}
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
                          <span>order {f.order}</span>
                          <span
                            className={
                              f.published
                                ? "text-[var(--accent)]"
                                : "text-red-400"
                            }
                          >
                            {f.published ? "published" : "hidden"}
                          </span>
                        </div>
                      </div>
                      <span className="text-[var(--muted)] text-[18px]">▾</span>
                    </summary>
                    <form
                      action={updateFaq}
                      className="px-6 pb-6 space-y-4 border-t border-[var(--line)] pt-5"
                    >
                      <input type="hidden" name="id" value={id} />
                      <Field label="Question" required>
                        <TextInput
                          name="question"
                          defaultValue={f.question}
                          required
                          maxLength={300}
                        />
                      </Field>
                      <Field label="Answer" required hint="HTML allowed">
                        <TextArea
                          name="answer"
                          defaultValue={f.answer}
                          rows={5}
                          required
                          maxLength={5000}
                        />
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Order">
                          <TextInput
                            name="order"
                            type="number"
                            defaultValue={f.order}
                            min={0}
                            max={9999}
                          />
                        </Field>
                        <Field label="Published?">
                          <label className="inline-flex items-center gap-2 h-11 text-[14px] text-white">
                            <input
                              name="published"
                              type="checkbox"
                              defaultChecked={f.published}
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
                      action={deleteFaq}
                      className="px-6 pb-6 -mt-4 flex justify-end"
                    >
                      <input type="hidden" name="id" value={id} />
                      <Button
                        type="submit"
                        variant="danger"
                        size="sm"
                      >
                        Delete
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
