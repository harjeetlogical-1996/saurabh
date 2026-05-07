import { cache } from "react";
import { connectMongoose } from "@/lib/db/mongoose";
import { Post } from "@/lib/db/models/Post";

export type PostListItem = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  tag?: string;
  coverUrl?: string;
  coverAlt?: string;
  readMin: number;
  publishedAt?: Date;
};

export const getPublishedPosts = cache(async (limit = 50): Promise<PostListItem[]> => {
  try {
    await connectMongoose();
    const docs = await Post.find({ published: true })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .lean();
    return docs.map((d) => ({
      _id: String(d._id),
      slug: d.slug,
      title: d.title,
      excerpt: d.excerpt ?? undefined,
      tag: d.tag ?? undefined,
      coverUrl: d.coverUrl ?? undefined,
      coverAlt: d.coverAlt ?? undefined,
      readMin: d.readMin ?? 5,
      publishedAt: d.publishedAt ?? undefined,
    }));
  } catch (err) {
    console.warn("[getPublishedPosts] DB unavailable:", err);
    return [];
  }
});

export const getPostBySlug = cache(async (slug: string) => {
  try {
    await connectMongoose();
    return Post.findOne({ slug, published: true }).lean();
  } catch (err) {
    console.warn("[getPostBySlug] DB unavailable:", err);
    return null;
  }
});
