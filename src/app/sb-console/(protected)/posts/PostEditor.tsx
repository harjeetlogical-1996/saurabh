"use client";

import { useMemo, useState, useTransition } from "react";
import { Field, TextInput, TextArea } from "@/components/admin/Field";
import { Button } from "@/components/admin/Button";
import { renderMarkdownClient } from "./markdown-client";
import {
  aiGenerateExcerpt,
  aiGenerateKeywords,
  aiGenerateSeoMeta,
  aiGenerateTakeaways,
  aiGenerateFaqs,
  aiGenerateSocial,
  aiOptimizationAudit,
  aiGenerateCoverImage,
  aiGenerateInlineImage,
} from "./ai-actions";

export type PostInitial = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverUrl: string;
  coverAlt: string;
  coverPrompt: string;
  seoOgImage: string;
  tag: string;
  readMin: number;
  focusKeyword: string;
  keywords: string[];
  keyTakeaways: string[];
  faqs: Array<{ question: string; answer: string }>;
  seoTitle: string;
  seoDescription: string;
  social: {
    twitter: string;
    linkedin: string;
    facebook: string;
    instagram: string;
  };
  published: boolean;
};

type Props = {
  initial: PostInitial;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  deleteAction?: (formData: FormData) => void | Promise<void>;
  categoryNames?: string[];
};

type Tab = "write" | "seo" | "social" | "audit";

type AiTaskStatus =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "ok"; message?: string }
  | { state: "error"; message: string };

export function PostEditor({ initial, action, submitLabel, deleteAction, categoryNames = [] }: Props) {
  const [tab, setTab] = useState<Tab>("write");

  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const [body, setBody] = useState(initial.body);
  const [coverUrl, setCoverUrl] = useState(initial.coverUrl);
  const [coverAlt, setCoverAlt] = useState(initial.coverAlt);
  const [coverPrompt, setCoverPrompt] = useState(initial.coverPrompt);
  const [seoOgImage, setSeoOgImage] = useState(initial.seoOgImage);
  const [tag, setTag] = useState(initial.tag);
  const [readMin, setReadMin] = useState(initial.readMin);
  const [focusKeyword, setFocusKeyword] = useState(initial.focusKeyword);
  const [keywordsCsv, setKeywordsCsv] = useState((initial.keywords ?? []).join(", "));
  const [takeawaysText, setTakeawaysText] = useState((initial.keyTakeaways ?? []).join("\n"));
  const [faqs, setFaqs] = useState(initial.faqs ?? []);
  const [seoTitle, setSeoTitle] = useState(initial.seoTitle);
  const [seoDescription, setSeoDescription] = useState(initial.seoDescription);
  const [social, setSocial] = useState(initial.social);
  const [published, setPublished] = useState(initial.published);

  const [showPreview, setShowPreview] = useState(false);
  const [pending, start] = useTransition();
  const [statusByTask, setStatus] = useState<Record<string, AiTaskStatus>>({});

  const [auditResult, setAuditResult] = useState<{
    score: number;
    checks: Array<{ label: string; ok: boolean; note?: string }>;
  } | null>(null);

  const [inlinePrompt, setInlinePrompt] = useState("");
  const [coverPromptInput, setCoverPromptInput] = useState("");

  function ctxFormData(): FormData {
    const fd = new FormData();
    fd.set("title", title);
    fd.set("focusKeyword", focusKeyword);
    fd.set("body", body);
    for (const k of keywordsCsv.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean)) {
      fd.append("keywords", k);
    }
    return fd;
  }

  function setTask(key: string, status: AiTaskStatus) {
    setStatus((s) => ({ ...s, [key]: status }));
  }

  async function runExcerpt() {
    setTask("excerpt", { state: "loading" });
    start(async () => {
      const res = await aiGenerateExcerpt(ctxFormData());
      if (!res.ok) return setTask("excerpt", { state: "error", message: res.error });
      setExcerpt(res.data.excerpt);
      setTask("excerpt", { state: "ok", message: "Excerpt updated" });
    });
  }

  async function runKeywords() {
    setTask("keywords", { state: "loading" });
    start(async () => {
      const res = await aiGenerateKeywords(ctxFormData());
      if (!res.ok) return setTask("keywords", { state: "error", message: res.error });
      setFocusKeyword(res.data.focusKeyword);
      setKeywordsCsv(res.data.keywords.join(", "));
      setTask("keywords", { state: "ok", message: "Keywords updated" });
    });
  }

  async function runSeoMeta() {
    setTask("seoMeta", { state: "loading" });
    start(async () => {
      const res = await aiGenerateSeoMeta(ctxFormData());
      if (!res.ok) return setTask("seoMeta", { state: "error", message: res.error });
      setSeoTitle(res.data.seoTitle);
      setSeoDescription(res.data.seoDescription);
      setTask("seoMeta", { state: "ok", message: "SEO meta updated" });
    });
  }

  async function runTakeaways() {
    setTask("takeaways", { state: "loading" });
    start(async () => {
      const res = await aiGenerateTakeaways(ctxFormData());
      if (!res.ok) return setTask("takeaways", { state: "error", message: res.error });
      setTakeawaysText(res.data.keyTakeaways.join("\n"));
      setTask("takeaways", { state: "ok", message: `${res.data.keyTakeaways.length} takeaways` });
    });
  }

  async function runFaqs() {
    setTask("faqs", { state: "loading" });
    start(async () => {
      const res = await aiGenerateFaqs(ctxFormData());
      if (!res.ok) return setTask("faqs", { state: "error", message: res.error });
      setFaqs(res.data.faqs);
      setTask("faqs", { state: "ok", message: `${res.data.faqs.length} FAQs` });
    });
  }

  async function runSocial() {
    setTask("social", { state: "loading" });
    start(async () => {
      const res = await aiGenerateSocial(ctxFormData());
      if (!res.ok) return setTask("social", { state: "error", message: res.error });
      setSocial(res.data);
      setTask("social", { state: "ok", message: "Social posts updated" });
    });
  }

  async function runAudit() {
    setTask("audit", { state: "loading" });
    start(async () => {
      const res = await aiOptimizationAudit(ctxFormData());
      if (!res.ok) return setTask("audit", { state: "error", message: res.error });
      setAuditResult(res.data);
      setTab("audit");
      setTask("audit", { state: "ok", message: `Score ${res.data.score}/100` });
    });
  }

  async function runCoverImage() {
    setTask("cover", { state: "loading" });
    start(async () => {
      const fd = ctxFormData();
      if (coverPromptInput.trim()) fd.set("prompt", coverPromptInput.trim());
      const res = await aiGenerateCoverImage(fd);
      if (!res.ok) return setTask("cover", { state: "error", message: res.error });
      setCoverUrl(res.data.url);
      setCoverAlt(res.data.alt);
      setCoverPrompt(res.data.prompt);
      if (!seoOgImage) setSeoOgImage(res.data.url);
      setTask("cover", { state: "ok", message: "Cover image generated" });
    });
  }

  async function runInlineImage() {
    if (!inlinePrompt.trim()) {
      setTask("inline", { state: "error", message: "Enter a prompt first" });
      return;
    }
    setTask("inline", { state: "loading" });
    start(async () => {
      const fd = ctxFormData();
      fd.set("prompt", inlinePrompt.trim());
      const res = await aiGenerateInlineImage(fd);
      if (!res.ok) return setTask("inline", { state: "error", message: res.error });
      setBody((b) => `${b}${b.endsWith("\n") ? "" : "\n"}\n${res.data.markdown}\n`);
      setInlinePrompt("");
      setTask("inline", { state: "ok", message: "Image inserted at end of body" });
    });
  }

  const wordCount = useMemo(() => {
    return body.trim().split(/\s+/).filter(Boolean).length;
  }, [body]);

  return (
    <form action={action} className="space-y-6">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[var(--line)] -mb-2 flex-wrap">
        {(["write", "seo", "social", "audit"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-[12px] uppercase tracking-[0.18em] font-mono transition-colors ${
              tab === t
                ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
                : "text-[var(--muted)] hover:text-white border-b-2 border-transparent"
            }`}
          >
            {t === "write" && "Write"}
            {t === "seo" && "SEO & meta"}
            {t === "social" && "Social"}
            {t === "audit" && "Audit"}
          </button>
        ))}
        <div className="ml-auto text-[11px] font-mono text-[var(--muted)] hidden sm:block">
          {wordCount.toLocaleString()} words · ~
          {Math.max(1, Math.round(wordCount / 220))} min read
        </div>
      </div>

      {/* WRITE TAB */}
      <div hidden={tab !== "write"} className="space-y-6">
        <Field label="Title" required>
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={200}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Field label="Slug" hint="Leave blank to auto-generate from title">
              <TextInput
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                maxLength={200}
              />
            </Field>
          </div>
          <Field
            label="Category"
            hint={
              categoryNames.length > 0
                ? "Pick from your master list, or type a custom one below"
                : 'e.g. "AI SEO"'
            }
          >
            {categoryNames.length > 0 ? (
              <div className="space-y-2">
                <select
                  value={categoryNames.includes(tag) ? tag : ""}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full h-11 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 text-[14px] text-white"
                >
                  <option value="">— Pick a category —</option>
                  {categoryNames.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <TextInput
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Or type a custom category"
                  maxLength={50}
                />
              </div>
            ) : (
              <TextInput
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                maxLength={50}
              />
            )}
          </Field>
        </div>

        <Field
          label="Excerpt"
          hint={
            <AiBtn
              label="Generate excerpt"
              onClick={runExcerpt}
              status={statusByTask.excerpt}
            />
          }
        >
          <TextArea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            maxLength={400}
          />
        </Field>

        <CoverImagePanel
          coverUrl={coverUrl}
          coverAlt={coverAlt}
          setCoverUrl={setCoverUrl}
          setCoverAlt={setCoverAlt}
          coverPromptInput={coverPromptInput}
          setCoverPromptInput={setCoverPromptInput}
          coverPrompt={coverPrompt}
          onGenerate={runCoverImage}
          status={statusByTask.cover}
          pending={pending}
        />

        <Field
          label="Body (markdown)"
          required
          hint={
            <button
              type="button"
              onClick={() => setShowPreview((p) => !p)}
              className="text-[var(--accent)] hover:opacity-80 transition-opacity normal-case tracking-normal"
            >
              {showPreview ? "Edit" : "Preview"}
            </button>
          }
        >
          {showPreview ? (
            <div
              className="min-h-[400px] rounded-lg border border-[var(--line)] bg-[var(--bg)] p-5 text-[14px] leading-[1.7] text-white/90 [&_h1]:text-[24px] [&_h1]:font-semibold [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-[20px] [&_h2]:font-semibold [&_h2]:mt-5 [&_h2]:mb-3 [&_h3]:text-[17px] [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:my-3 [&_a]:text-[var(--accent)] [&_a]:underline [&_code]:font-mono [&_code]:bg-[var(--surface)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-[var(--surface)] [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_li]:my-1 [&_strong]:text-white [&_strong]:font-semibold [&_img]:rounded-lg [&_img]:my-4"
              dangerouslySetInnerHTML={{ __html: renderMarkdownClient(body) }}
            />
          ) : (
            <TextArea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={22}
              required
              maxLength={200000}
              spellCheck
            />
          )}
        </Field>

        <InlineImagePanel
          prompt={inlinePrompt}
          setPrompt={setInlinePrompt}
          onGenerate={runInlineImage}
          status={statusByTask.inline}
        />
      </div>

      {/* SEO TAB */}
      <div hidden={tab !== "seo"} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Field
              label="Focus keyword"
              hint={
                <AiBtn
                  label="Suggest keywords"
                  onClick={runKeywords}
                  status={statusByTask.keywords}
                />
              }
            >
              <TextInput
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                maxLength={160}
                placeholder='e.g. "ai seo guide"'
              />
            </Field>
          </div>
          <Field label="Reading minutes">
            <TextInput
              type="number"
              value={readMin}
              onChange={(e) => setReadMin(Number(e.target.value || 5))}
              min={1}
              max={120}
            />
          </Field>
        </div>

        <Field label="Secondary / long-tail keywords" hint="Comma-separated">
          <TextArea
            value={keywordsCsv}
            onChange={(e) => setKeywordsCsv(e.target.value)}
            rows={3}
            maxLength={2000}
            placeholder="how to rank in chatgpt, what is geo seo, llmo vs aeo, ..."
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="SEO title"
            hint={
              <AiBtn
                label="Generate"
                onClick={runSeoMeta}
                status={statusByTask.seoMeta}
              />
            }
          >
            <TextInput
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              maxLength={200}
            />
            <CharCount value={seoTitle} ideal={[50, 60]} />
          </Field>
          <Field label="SEO meta description">
            <TextArea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              rows={3}
              maxLength={300}
            />
            <CharCount value={seoDescription} ideal={[140, 160]} />
          </Field>
        </div>

        <Field
          label="Key takeaways (one per line)"
          hint={
            <AiBtn
              label="Generate takeaways"
              onClick={runTakeaways}
              status={statusByTask.takeaways}
            />
          }
        >
          <TextArea
            value={takeawaysText}
            onChange={(e) => setTakeawaysText(e.target.value)}
            rows={6}
            maxLength={5000}
            placeholder={
              "Each line becomes a bullet in the TL;DR box and is exposed to AI search engines.\nKeep them declarative."
            }
          />
        </Field>

        <Field
          label="FAQs"
          hint={<AiBtn label="Generate FAQs" onClick={runFaqs} status={statusByTask.faqs} />}
        >
          <FaqList faqs={faqs} setFaqs={setFaqs} />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Open Graph image URL" hint="Falls back to cover image">
            <TextInput
              value={seoOgImage}
              onChange={(e) => setSeoOgImage(e.target.value)}
              maxLength={1000}
            />
          </Field>
          <Field label="Cover alt text">
            <TextInput
              value={coverAlt}
              onChange={(e) => setCoverAlt(e.target.value)}
              maxLength={300}
            />
          </Field>
        </div>
      </div>

      {/* SOCIAL TAB */}
      <div hidden={tab !== "social"} className="space-y-6">
        <div className="flex items-center gap-3">
          <AiBtn
            label="Generate all 4 platforms"
            onClick={runSocial}
            status={statusByTask.social}
            primary
          />
          <p className="text-[12px] text-[var(--muted)]">
            Tailored to each platform&apos;s style and length limits.
          </p>
        </div>

        <Field label="X / Twitter" hint={<CharCount value={social.twitter} ideal={[100, 270]} />}>
          <TextArea
            value={social.twitter}
            onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
            rows={4}
            maxLength={1000}
          />
        </Field>
        <Field label="LinkedIn" hint={<CharCount value={social.linkedin} ideal={[800, 1300]} />}>
          <TextArea
            value={social.linkedin}
            onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
            rows={8}
            maxLength={4000}
          />
        </Field>
        <Field label="Facebook" hint={<CharCount value={social.facebook} ideal={[250, 500]} />}>
          <TextArea
            value={social.facebook}
            onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
            rows={5}
            maxLength={2000}
          />
        </Field>
        <Field label="Instagram" hint={<CharCount value={social.instagram} ideal={[400, 700]} />}>
          <TextArea
            value={social.instagram}
            onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
            rows={6}
            maxLength={2500}
          />
        </Field>
      </div>

      {/* AUDIT TAB */}
      <div hidden={tab !== "audit"} className="space-y-6">
        <div className="flex items-center gap-3">
          <AiBtn
            label="Run optimization audit"
            onClick={runAudit}
            status={statusByTask.audit}
            primary
          />
          <p className="text-[12px] text-[var(--muted)]">
            Checks on-page SEO, AEO, GEO, and E-E-A-T using Gemini.
          </p>
        </div>
        {auditResult && (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                  Score
                </div>
                <div className="mt-1 font-display text-[44px] leading-none text-[var(--accent)]">
                  {auditResult.score}
                  <span className="text-[20px] text-[var(--muted)]">/100</span>
                </div>
              </div>
              <div className="text-[11px] font-mono text-[var(--muted)]">
                {auditResult.checks.filter((c) => c.ok).length} of{" "}
                {auditResult.checks.length} passed
              </div>
            </div>
            <ul className="mt-6 divide-y divide-[var(--line)]">
              {auditResult.checks.map((c, i) => (
                <li key={i} className="py-3 grid grid-cols-[24px_1fr] gap-3">
                  <span
                    className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[12px] ${
                      c.ok
                        ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {c.ok ? "✓" : "✕"}
                  </span>
                  <div>
                    <div className="text-[14px] text-white">{c.label}</div>
                    {c.note && (
                      <div className="mt-1 text-[12px] text-[var(--muted)]">{c.note}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Hidden form fields so all tabs submit together */}
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="excerpt" value={excerpt} />
      <input type="hidden" name="body" value={body} />
      <input type="hidden" name="coverUrl" value={coverUrl} />
      <input type="hidden" name="coverAlt" value={coverAlt} />
      <input type="hidden" name="coverPrompt" value={coverPrompt} />
      <input type="hidden" name="seoOgImage" value={seoOgImage} />
      <input type="hidden" name="tag" value={tag} />
      <input type="hidden" name="readMin" value={readMin} />
      <input type="hidden" name="focusKeyword" value={focusKeyword} />
      <input type="hidden" name="keywordsCsv" value={keywordsCsv} />
      <input type="hidden" name="takeawaysText" value={takeawaysText} />
      <input type="hidden" name="seoTitle" value={seoTitle} />
      <input type="hidden" name="seoDescription" value={seoDescription} />
      <input type="hidden" name="socialTwitter" value={social.twitter} />
      <input type="hidden" name="socialLinkedin" value={social.linkedin} />
      <input type="hidden" name="socialFacebook" value={social.facebook} />
      <input type="hidden" name="socialInstagram" value={social.instagram} />
      <input type="hidden" name="faqsJson" value={JSON.stringify(faqs)} />
      {published && <input type="hidden" name="published" value="on" />}

      <div className="flex items-center justify-between gap-4 sticky bottom-0 bg-[var(--bg)] border-t border-[var(--line)] -mx-6 md:-mx-10 px-6 md:px-10 py-4">
        <label className="inline-flex items-center gap-2 text-[13px] text-white">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 accent-[var(--accent)] rounded"
          />
          Published (visible on /blog)
        </label>
        <div className="flex items-center gap-3">
          {deleteAction && initial.id && <DeleteForm id={initial.id} action={deleteAction} />}
          <Button type="submit">{submitLabel}</Button>
        </div>
      </div>
    </form>
  );
}

// ── helpers ─────────────────────────────────────────────────────

function AiBtn({
  label,
  onClick,
  status,
  primary,
}: {
  label: string;
  onClick: () => void;
  status?: AiTaskStatus;
  primary?: boolean;
}) {
  const loading = status?.state === "loading";
  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 h-8 text-[11px] font-semibold tracking-[0.05em] uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
          primary
            ? "bg-[var(--accent)] text-black hover:shadow-[0_0_18px_var(--accent-glow)]"
            : "border border-[var(--line)] text-[var(--accent)] hover:border-[var(--accent)]"
        }`}
      >
        ✨ {loading ? "Generating…" : label}
      </button>
      {status?.state === "ok" && status.message && (
        <span className="text-[11px] font-mono text-[var(--accent)]">
          ✓ {status.message}
        </span>
      )}
      {status?.state === "error" && (
        <span className="text-[11px] font-mono text-red-400" title={status.message}>
          ✕ {truncate(status.message, 40)}
        </span>
      )}
    </span>
  );
}

function truncate(s: string, n: number) {
  return s.length <= n ? s : `${s.slice(0, n - 1)}…`;
}

function CharCount({ value, ideal }: { value: string; ideal: [number, number] }) {
  const len = value.length;
  const inRange = len >= ideal[0] && len <= ideal[1];
  return (
    <span
      className={`text-[10px] font-mono normal-case tracking-normal ${
        inRange ? "text-[var(--accent)]" : "text-[var(--muted)]"
      }`}
    >
      {len} chars · ideal {ideal[0]}–{ideal[1]}
    </span>
  );
}

function CoverImagePanel({
  coverUrl,
  coverAlt,
  setCoverUrl,
  setCoverAlt,
  coverPromptInput,
  setCoverPromptInput,
  coverPrompt,
  onGenerate,
  status,
  pending,
}: {
  coverUrl: string;
  coverAlt: string;
  setCoverUrl: (v: string) => void;
  setCoverAlt: (v: string) => void;
  coverPromptInput: string;
  setCoverPromptInput: (v: string) => void;
  coverPrompt: string;
  onGenerate: () => void;
  status?: AiTaskStatus;
  pending: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 md:p-7 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="font-display text-[16px] text-white">Cover image</div>
          <div className="text-[12px] text-[var(--muted)] mt-1">
            16:9. AI-generated with Gemini, optimized to AVIF/WebP, served from /api/blog-images.
          </div>
        </div>
        <AiBtn label="Generate cover" onClick={onGenerate} status={status} primary />
      </div>

      {coverUrl && (
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-[var(--line)] bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverUrl}
            alt={coverAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {pending && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <span className="text-[12px] font-mono text-[var(--accent)]">Generating…</span>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Cover URL" hint="Paste an external URL to override the AI cover">
          <TextInput
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            maxLength={1000}
          />
        </Field>
        <Field label="Cover alt text">
          <TextInput
            value={coverAlt}
            onChange={(e) => setCoverAlt(e.target.value)}
            maxLength={300}
          />
        </Field>
      </div>
      <Field label="Cover prompt (optional)" hint="Override the default editorial prompt">
        <TextArea
          value={coverPromptInput}
          onChange={(e) => setCoverPromptInput(e.target.value)}
          rows={2}
          maxLength={2000}
          placeholder="A close-up of a digital network of glowing nodes representing AI search…"
        />
      </Field>
      {coverPrompt && (
        <div className="text-[11px] font-mono text-[var(--muted)]">
          Last prompt: {truncate(coverPrompt, 120)}
        </div>
      )}
    </div>
  );
}

function InlineImagePanel({
  prompt,
  setPrompt,
  onGenerate,
  status,
}: {
  prompt: string;
  setPrompt: (v: string) => void;
  onGenerate: () => void;
  status?: AiTaskStatus;
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 md:p-7 space-y-3">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="font-display text-[16px] text-white">Insert AI image into body</div>
          <div className="text-[12px] text-[var(--muted)] mt-1">
            Generates a 3:2 image, optimizes it, and appends a markdown reference at the end of the body. Reposition manually after.
          </div>
        </div>
        <AiBtn label="Generate & insert" onClick={onGenerate} status={status} />
      </div>
      <TextArea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={2}
        placeholder="Diagram showing how GEO, AEO, and LLMO overlap with traditional Google SEO."
      />
    </div>
  );
}

function FaqList({
  faqs,
  setFaqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
  setFaqs: (v: Array<{ question: string; answer: string }>) => void;
}) {
  function update(i: number, patch: Partial<{ question: string; answer: string }>) {
    setFaqs(faqs.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  }
  function remove(i: number) {
    setFaqs(faqs.filter((_, idx) => idx !== i));
  }
  function add() {
    setFaqs([...faqs, { question: "", answer: "" }]);
  }
  return (
    <div className="space-y-3">
      {faqs.length === 0 && (
        <div className="text-[12px] text-[var(--muted)]">
          No FAQs yet. Add manually or click &quot;Generate FAQs&quot; above.
        </div>
      )}
      {faqs.map((f, i) => (
        <div
          key={i}
          className="rounded-lg border border-[var(--line)] bg-[var(--bg)] p-4 space-y-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-[0.18em]">
              Q{i + 1}
            </span>
            <input
              value={f.question}
              onChange={(e) => update(i, { question: e.target.value })}
              placeholder="Buyer-style question…"
              className="flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-[var(--muted)]"
              maxLength={300}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-[11px] font-mono text-[var(--muted)] hover:text-red-400"
            >
              Remove
            </button>
          </div>
          <textarea
            value={f.answer}
            onChange={(e) => update(i, { answer: e.target.value })}
            placeholder="2–3 sentence answer."
            rows={3}
            maxLength={2000}
            className="w-full bg-transparent text-[13px] text-white/90 outline-none placeholder:text-[var(--muted)] resize-y"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 text-[12px] text-[var(--accent)] hover:opacity-80"
      >
        + Add FAQ
      </button>
    </div>
  );
}

function DeleteForm({
  id,
  action,
}: {
  id: string;
  action: (formData: FormData) => void | Promise<void>;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Delete this post permanently?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="danger" size="sm">
        Delete
      </Button>
    </form>
  );
}
