import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const TestimonialSchema = new Schema(
  {
    body: { type: String, required: true, maxlength: 1500 },
    name: { type: String, required: true, maxlength: 200 },
    role: { type: String, maxlength: 200 }, // "Head of Growth, Helix Health (B2B SaaS · US)"
    avatarUrl: { type: String, maxlength: 1000 },
    order: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true, index: true },
    featured: { type: Boolean, default: false }, // middle yellow card on home
  },
  { timestamps: true },
);

TestimonialSchema.index({ order: 1, createdAt: 1 });

export type TestimonialDoc = InferSchemaType<typeof TestimonialSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Testimonial: Model<TestimonialDoc> =
  (mongoose.models.Testimonial as Model<TestimonialDoc>) ||
  mongoose.model<TestimonialDoc>("Testimonial", TestimonialSchema);
