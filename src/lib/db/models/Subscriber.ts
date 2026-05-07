import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const SubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 320,
    },
    source: { type: String, default: "footer" },
    unsubscribed: { type: Boolean, default: false, index: true },
    confirmedAt: { type: Date },
  },
  { timestamps: true },
);

SubscriberSchema.index({ createdAt: -1 });

export type SubscriberDoc = InferSchemaType<typeof SubscriberSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Subscriber: Model<SubscriberDoc> =
  (mongoose.models.Subscriber as Model<SubscriberDoc>) ||
  mongoose.model<SubscriberDoc>("Subscriber", SubscriberSchema);
