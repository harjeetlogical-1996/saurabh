import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const ToolSchema = new Schema(
  {
    code: { type: String, required: true, maxlength: 12 }, // "T.01"
    title: { type: String, required: true, maxlength: 120 },
    body: { type: String, required: true, maxlength: 600 },
    cta: { type: String, default: "Try it free", maxlength: 60 },
    href: { type: String, maxlength: 1000 }, // absolute URL to the tool (e.g. https://tools.saurabhbhayana.com/...) or in-site path
    plan: { type: String, enum: ["free", "paid"], default: "free", index: true },
    order: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

ToolSchema.index({ order: 1, createdAt: 1 });

export type ToolDoc = InferSchemaType<typeof ToolSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Tool: Model<ToolDoc> =
  (mongoose.models.Tool as Model<ToolDoc>) ||
  mongoose.model<ToolDoc>("Tool", ToolSchema);
