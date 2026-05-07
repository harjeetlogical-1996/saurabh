import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 60 },
    slug: { type: String, required: true, unique: true, maxlength: 80, index: true },
    description: { type: String, maxlength: 300 },
    order: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

CategorySchema.index({ order: 1, name: 1 });

export type CategoryDoc = InferSchemaType<typeof CategorySchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Category: Model<CategoryDoc> =
  (mongoose.models.Category as Model<CategoryDoc>) ||
  mongoose.model<CategoryDoc>("Category", CategorySchema);
