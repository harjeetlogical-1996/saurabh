import { connectMongoose } from "@/lib/db/mongoose";
import { CaseStudy } from "@/lib/db/models/CaseStudy";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/admin/Button";
import { EmptyState } from "@/components/admin/EmptyState";
import { Field, TextInput, TextArea } from "@/components/admin/Field";
import {
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
} from "./actions";

export const dynamic = "force-dynamic";

async function getList() {
  await connectMongoose();
  return CaseStudy.find({}).sort({ order: 1, createdAt: -1 }).lean();
}

export default async function CaseStudiesAdminPage() {
  const items = await getList();

  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title="Case studies"
        description="Showcase real client outcomes. Used on the home page and (later) /work."
        breadcrumbs={[
          { label: "Console", href: "/sb-console" },
          { label: "Case studies" },
        ]}
        meta={
          <span className="text-[12px] font-mono text-[var(--muted)]">
            {items.length} total · the home-page section is currently hidden but data feeds JSON-LD
          </span>
        }
      />

      <div className="px-6 md:px-10 py-10 max-w-[1100px] space-y-8">
        <details className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
          <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <div className="font-display text-[18px] tracking-tight">
                Add a case study
              </div>
              <div className="mt-1 text-[12px] text-[var(--muted)]">
                A punchy headline + one big metric does most of the work.
              </div>
            </div>
            <span className="text-[var(--accent)] text-[20px]">＋</span>
          </summary>
          <CaseForm
            action={createCaseStudy}
            submitLabel="Create case study"
            initial={{
              order: items.length,
              published: true,
            }}
          />
        </details>

        {items.length === 0 ? (
          <EmptyState
            title="No case studies yet."
            description="Add your first one above. Even one strong case can lift conversion across the whole site."
          />
        ) : (
          <ul className="space-y-3">
            {items.map((c) => {
              const id = String(c._id);
              return (
                <li key={id} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
                  <details>
                    <summary className="cursor-pointer list-none px-6 py-5 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-[15px] font-medium text-white">
                          {c.client}
                          {c.featured && (
                            <span className="ml-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--accent)] border border-[var(--accent)]/40 px-1.5 py-0.5 rounded-full">
                              featured
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-[13px] text-[var(--muted)] truncate">
                          {c.title}
                        </div>
                        <div className="mt-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
                          <span>order {c.order}</span>
                          {c.metric && (
                            <span className="text-[var(--accent)]">{c.metric}</span>
                          )}
                          <span className={c.published ? "text-[var(--accent)]" : "text-red-400"}>
                            {c.published ? "published" : "hidden"}
                          </span>
                        </div>
                      </div>
                      <span className="text-[var(--muted)] text-[18px]">▾</span>
                    </summary>
                    <CaseForm
                      action={updateCaseStudy}
                      submitLabel="Save"
                      initial={{
                        id,
                        client: c.client,
                        sector: c.sector ?? "",
                        title: c.title,
                        metric: c.metric ?? "",
                        coverUrl: c.coverUrl ?? "",
                        coverAlt: c.coverAlt ?? "",
                        summary: c.summary ?? "",
                        slug: c.slug,
                        order: c.order,
                        published: c.published,
                        featured: c.featured,
                      }}
                    />
                    <form action={deleteCaseStudy} className="px-6 pb-6 -mt-4 flex justify-end">
                      <input type="hidden" name="id" value={id} />
                      <Button type="submit" variant="danger" size="sm">
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

type FormInitial = Partial<{
  id: string;
  client: string;
  sector: string;
  title: string;
  metric: string;
  coverUrl: string;
  coverAlt: string;
  summary: string;
  slug: string;
  order: number;
  published: boolean;
  featured: boolean;
}>;

function CaseForm({
  action,
  submitLabel,
  initial,
}: {
  action: (fd: FormData) => void | Promise<void>;
  submitLabel: string;
  initial: FormInitial;
}) {
  return (
    <form action={action} className="px-6 pb-6 space-y-4 border-t border-[var(--line)] pt-5">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Client" required>
          <TextInput name="client" defaultValue={initial.client ?? ""} required maxLength={120} placeholder="Helix Health" />
        </Field>
        <Field label="Sector" hint='e.g. "B2B SaaS · Healthcare"'>
          <TextInput name="sector" defaultValue={initial.sector ?? ""} maxLength={120} />
        </Field>
      </div>
      <Field label="Headline" required>
        <TextInput
          name="title"
          defaultValue={initial.title ?? ""}
          required
          maxLength={300}
          placeholder="From 4k to 312k organic visits in 14 months"
        />
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Metric pill" hint='Short, e.g. "+78× organic"'>
          <TextInput name="metric" defaultValue={initial.metric ?? ""} maxLength={60} />
        </Field>
        <Field label="Slug" hint="Auto-generated from client name when blank">
          <TextInput name="slug" defaultValue={initial.slug ?? ""} maxLength={200} />
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Cover image URL">
          <TextInput name="coverUrl" type="url" defaultValue={initial.coverUrl ?? ""} maxLength={1000} />
        </Field>
        <Field label="Cover alt text">
          <TextInput name="coverAlt" defaultValue={initial.coverAlt ?? ""} maxLength={200} />
        </Field>
      </div>
      <Field label="Summary" hint="Shown on the case study detail page">
        <TextArea name="summary" defaultValue={initial.summary ?? ""} rows={4} maxLength={2000} />
      </Field>
      <div className="grid grid-cols-3 gap-4">
        <Field label="Order">
          <TextInput name="order" type="number" defaultValue={initial.order ?? 0} min={0} max={9999} />
        </Field>
        <Field label="Published?">
          <label className="inline-flex items-center gap-2 h-11 text-[14px] text-white">
            <input name="published" type="checkbox" defaultChecked={initial.published ?? true} className="h-4 w-4 accent-[var(--accent)] rounded" />
            Visible
          </label>
        </Field>
        <Field label="Featured?">
          <label className="inline-flex items-center gap-2 h-11 text-[14px] text-white">
            <input name="featured" type="checkbox" defaultChecked={initial.featured ?? false} className="h-4 w-4 accent-[var(--accent)] rounded" />
            On home
          </label>
        </Field>
      </div>
      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
