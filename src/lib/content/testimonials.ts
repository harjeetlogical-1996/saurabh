import { cache } from "react";
import { connectMongoose } from "@/lib/db/mongoose";
import { Testimonial } from "@/lib/db/models/Testimonial";

export type TestimonialItem = {
  body: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  featured?: boolean;
};

export const seedTestimonials: ReadonlyArray<TestimonialItem> = [
  {
    body:
      "Saurabh rebuilt our website on Next.js and rewired our SEO from scratch. Six months later we're ranking top-3 for keywords we'd been chasing for two years, and our demo bookings doubled.",
    name: "Maya Chen",
    role: "Head of Growth, Helix Health (B2B SaaS · US)",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&auto=format&q=70",
  },
  {
    body:
      "His team killed 60% of our blog and rebuilt our Shopify store for conversion. Scary advice, best decision we made. Revenue grew 3.4× the next year and ROAS on Meta finally crossed 4x.",
    name: "Daniel Park",
    role: "Founder, Forge Studios (D2C Furniture · UK)",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&auto=format&q=70",
    featured: true,
  },
  {
    body:
      "Three agencies in three years before Saurabh. The difference is night and day, clear weekly reporting, fixed scope, real strategy. He even set up an AI chatbot that handles 40% of our intake now.",
    name: "Priya Iyer",
    role: "CMO, Atlas Legal (Professional Services · India)",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&auto=format&q=70",
  },
];

export const getHomepageTestimonials = cache(
  async (): Promise<ReadonlyArray<TestimonialItem>> => {
    try {
      await connectMongoose();
      const docs = await Testimonial.find({ published: true })
        .sort({ order: 1, createdAt: 1 })
        .lean();
      if (docs.length === 0) return seedTestimonials;
      return docs.map((d) => ({
        body: d.body,
        name: d.name,
        role: d.role ?? undefined,
        avatarUrl: d.avatarUrl ?? undefined,
        featured: d.featured,
      }));
    } catch (err) {
      console.warn("[getHomepageTestimonials] DB unavailable, using seeds:", err);
      return seedTestimonials;
    }
  },
);
