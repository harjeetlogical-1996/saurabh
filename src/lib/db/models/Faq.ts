import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const FaqSchema = new Schema(
  {
    question: { type: String, required: true, maxlength: 300 },
    answer: { type: String, required: true, maxlength: 5000 },
    order: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true, index: true },
    page: {
      type: String,
      enum: ["home"],
      default: "home",
      index: true,
    }, // ready for additional pages later
  },
  { timestamps: true },
);

FaqSchema.index({ order: 1, createdAt: 1 });

export type FaqDoc = InferSchemaType<typeof FaqSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Faq: Model<FaqDoc> =
  (mongoose.models.Faq as Model<FaqDoc>) ||
  mongoose.model<FaqDoc>("Faq", FaqSchema);
