import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const ContactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 320 },
    company: { type: String, trim: true, maxlength: 200 },
    budget: { type: String, trim: true, maxlength: 80 },
    service: { type: String, trim: true, maxlength: 80 },
    message: { type: String, trim: true, maxlength: 5000 },
    status: {
      type: String,
      enum: ["new", "in_progress", "won", "lost", "spam"],
      default: "new",
      index: true,
    },
    source: { type: String, default: "contact_form" },
    userAgent: { type: String, maxlength: 500 },
    ip: { type: String, maxlength: 64 },
  },
  { timestamps: true },
);

ContactSchema.index({ createdAt: -1 });

export type ContactDoc = InferSchemaType<typeof ContactSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Contact: Model<ContactDoc> =
  (mongoose.models.Contact as Model<ContactDoc>) ||
  mongoose.model<ContactDoc>("Contact", ContactSchema);
