import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const CaseStudySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, maxlength: 200, index: true },
    client: { type: String, required: true, maxlength: 120 },
    sector: { type: String, maxlength: 120 }, // "B2B SaaS · Healthcare"
    title: { type: String, required: true, maxlength: 300 },
    metric: { type: String, maxlength: 60 }, // "+78× organic"
    coverUrl: { type: String, maxlength: 1000 },
    coverAlt: { type: String, maxlength: 200 },
    summary: { type: String, maxlength: 2000 }, // shown on detail page
    order: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true, index: true },
    featured: { type: Boolean, default: false }, // show on home if section is unhidden
  },
  { timestamps: true },
);

CaseStudySchema.index({ order: 1, createdAt: -1 });

export type CaseStudyDoc = InferSchemaType<typeof CaseStudySchema> & {
  _id: mongoose.Types.ObjectId;
};

export const CaseStudy: Model<CaseStudyDoc> =
  (mongoose.models.CaseStudy as Model<CaseStudyDoc>) ||
  mongoose.model<CaseStudyDoc>("CaseStudy", CaseStudySchema);
