import { PageHeader } from "@/components/admin/PageHeader";
import { connectMongoose } from "@/lib/db/mongoose";
import { Category } from "@/lib/db/models/Category";
import { PostEditor } from "../PostEditor";
import { createPost } from "../actions";

export const dynamic = "force-dynamic";

async function getCategoryNames(): Promise<string[]> {
  await connectMongoose();
  const cats = await Category.find({ published: true })
    .sort({ order: 1, name: 1 })
    .select({ name: 1 })
    .lean();
  return cats.map((c) => c.name);
}

export default async function NewPostPage() {
  const categoryNames = await getCategoryNames();
  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title="New post"
        description="Write in markdown. Use the AI buttons to generate excerpts, keywords, takeaways, FAQs, social posts, and images."
        breadcrumbs={[
          { label: "Console", href: "/sb-console" },
          { label: "Blog posts", href: "/sb-console/posts" },
          { label: "New" },
        ]}
      />
      <div className="px-6 md:px-10 py-10 max-w-[920px]">
        <PostEditor
          action={createPost}
          submitLabel="Create post"
          categoryNames={categoryNames}
          initial={{
            title: "",
            slug: "",
            excerpt: "",
            body:
              "## Intro\n\nWrite a strong opening paragraph here.\n\n## Section heading\n\nUse **bold** and *italic* and [links](https://example.com).\n\n- Bulleted points\n- Work like this\n\n```\ncode blocks too\n```\n",
            coverUrl: "",
            coverAlt: "",
            coverPrompt: "",
            seoOgImage: "",
            tag: "",
            readMin: 5,
            focusKeyword: "",
            keywords: [],
            keyTakeaways: [],
            faqs: [],
            seoTitle: "",
            seoDescription: "",
            social: { twitter: "", linkedin: "", facebook: "", instagram: "" },
            published: false,
          }}
        />
      </div>
    </div>
  );
}
