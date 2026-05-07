import { notFound } from "next/navigation";
import { connectMongoose } from "@/lib/db/mongoose";
import { Post } from "@/lib/db/models/Post";
import { Category } from "@/lib/db/models/Category";
import { PageHeader } from "@/components/admin/PageHeader";
import { PostEditor } from "../PostEditor";
import { updatePost, deletePost } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectMongoose();
  const [doc, categoryDocs] = await Promise.all([
    Post.findById(id).lean(),
    Category.find({ published: true })
      .sort({ order: 1, name: 1 })
      .select({ name: 1 })
      .lean(),
  ]);
  if (!doc) notFound();
  const categoryNames = categoryDocs.map((c) => c.name);

  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title="Edit post"
        description={`Editing /${doc.slug}`}
        breadcrumbs={[
          { label: "Console", href: "/sb-console" },
          { label: "Blog posts", href: "/sb-console/posts" },
          { label: doc.title },
        ]}
      />
      <div className="px-6 md:px-10 py-10 max-w-[920px]">
        <PostEditor
          action={updatePost}
          deleteAction={deletePost}
          submitLabel="Save changes"
          categoryNames={categoryNames}
          initial={{
            id: String(doc._id),
            title: doc.title,
            slug: doc.slug,
            excerpt: doc.excerpt ?? "",
            body: doc.body,
            coverUrl: doc.coverUrl ?? "",
            coverAlt: doc.coverAlt ?? "",
            coverPrompt: doc.coverPrompt ?? "",
            seoOgImage: doc.seoOgImage ?? "",
            tag: doc.tag ?? "",
            readMin: doc.readMin ?? 5,
            focusKeyword: doc.focusKeyword ?? "",
            keywords: doc.keywords ?? [],
            keyTakeaways: doc.keyTakeaways ?? [],
            faqs: (doc.faqs ?? []).map((f) => ({
              question: f.question,
              answer: f.answer,
            })),
            seoTitle: doc.seoTitle ?? "",
            seoDescription: doc.seoDescription ?? "",
            social: {
              twitter: doc.social?.twitter ?? "",
              linkedin: doc.social?.linkedin ?? "",
              facebook: doc.social?.facebook ?? "",
              instagram: doc.social?.instagram ?? "",
            },
            published: !!doc.published,
          }}
        />
      </div>
    </div>
  );
}
