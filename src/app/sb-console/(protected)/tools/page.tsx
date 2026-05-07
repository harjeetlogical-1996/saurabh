import { connectMongoose } from "@/lib/db/mongoose";
import { Tool } from "@/lib/db/models/Tool";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/admin/Button";
import { EmptyState } from "@/components/admin/EmptyState";
import { Field, TextInput, TextArea, SelectInput } from "@/components/admin/Field";
import { createTool, updateTool, deleteTool, seedTools } from "./actions";

export const dynamic = "force-dynamic";

const PLAN_OPTIONS = [
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
] as const;

async function getList() {
  await connectMongoose();
  return Tool.find({}).sort({ order: 1, createdAt: 1 }).lean();
}

export default async function ToolsAdminPage() {
  const items = await getList();

  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title="Free tools"
        description="Cards rendered in the Free Tools section. The actual tool implementations are separate."
        breadcrumbs={[
          { label: "Console", href: "/sb-console" },
          { label: "Free tools" },
        ]}
        meta={
          <span className="text-[12px] font-mono text-[var(--muted)]">
            {items.length} total · marked free or paid
          </span>
        }
      />

      <div className="px-6 md:px-10 py-10 max-w-[1100px] space-y-8">
        <details className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
          <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between">
            <div className="font-display text-[18px] tracking-tight">Add a tool</div>
            <span className="text-[var(--accent)] text-[20px]">＋</span>
          </summary>
          <ToolForm action={createTool} submitLabel="Create tool" initial={{ order: items.length, plan: "free", cta: "Try it free", published: true }} />
        </details>

        {items.length === 0 ? (
          <EmptyState
            title="No tools yet."
            description="Seed the three starter cards from the launch design, or add your own."
            action={
              <form action={seedTools}>
                <Button type="submit" variant="secondary">
                  Seed 3 starter tools
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
                        <div className="text-[15px] font-medium text-white">{t.title}</div>
                        <div className="mt-1 text-[12px] text-[var(--muted)] truncate">{t.body}</div>
                        <div className="mt-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
                          <span>{t.code}</span>
                          <span className="text-[var(--accent)]">{t.plan}</span>
                          <span>order {t.order}</span>
                          <span className={t.published ? "text-[var(--accent)]" : "text-red-400"}>
                            {t.published ? "published" : "hidden"}
                          </span>
                        </div>
                      </div>
                      <span className="text-[var(--muted)] text-[18px]">▾</span>
                    </summary>
                    <ToolForm
                      action={updateTool}
                      submitLabel="Save"
                      initial={{
                        id,
                        code: t.code,
                        title: t.title,
                        body: t.body,
                        cta: t.cta ?? "Try it free",
                        href: t.href ?? "",
                        plan: t.plan as "free" | "paid",
                        order: t.order,
                        published: t.published,
                      }}
                    />
                    <form action={deleteTool} className="px-6 pb-6 -mt-4 flex justify-end">
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

type ToolInitial = Partial<{
  id: string;
  code: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  plan: "free" | "paid";
  order: number;
  published: boolean;
}>;

function ToolForm({
  action,
  submitLabel,
  initial,
}: {
  action: (fd: FormData) => void | Promise<void>;
  submitLabel: string;
  initial: ToolInitial;
}) {
  return (
    <form action={action} className="px-6 pb-6 space-y-4 border-t border-[var(--line)] pt-5">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Field label="Code" hint='e.g. "T.04"' required>
          <TextInput name="code" defaultValue={initial.code ?? ""} required maxLength={12} />
        </Field>
        <Field label="Plan" required>
          <SelectInput name="plan" defaultValue={initial.plan ?? "free"} options={PLAN_OPTIONS} />
        </Field>
        <Field label="Order">
          <TextInput name="order" type="number" defaultValue={initial.order ?? 0} min={0} max={9999} />
        </Field>
      </div>
      <Field label="Title" required>
        <TextInput name="title" defaultValue={initial.title ?? ""} required maxLength={120} />
      </Field>
      <Field label="Description" required>
        <TextArea name="body" defaultValue={initial.body ?? ""} rows={3} required maxLength={600} />
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="CTA label">
          <TextInput name="cta" defaultValue={initial.cta ?? "Try it free"} maxLength={60} />
        </Field>
        <Field label="Link (optional)" hint="Where the card sends visitors. Leave blank for now.">
          <TextInput name="href" defaultValue={initial.href ?? ""} maxLength={1000} placeholder="https://tools.saurabhbhayana.com/seo-audit" />
        </Field>
      </div>
      <Field label="Published?">
        <label className="inline-flex items-center gap-2 h-11 text-[14px] text-white">
          <input
            name="published"
            type="checkbox"
            defaultChecked={initial.published ?? true}
            className="h-4 w-4 accent-[var(--accent)] rounded"
          />
          Visible on the public site
        </label>
      </Field>
      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
