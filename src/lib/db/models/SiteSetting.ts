import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/**
 * Key/value site settings. One document per key.
 *
 * Why a per-key collection (rather than a single big "settings" doc)?
 *   - Lock-free updates (different keys don't fight each other)
 *   - Each key carries its own description for the admin UI
 *   - Easy to seed defaults idempotently with upsert-on-key
 */
const SiteSettingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: Schema.Types.Mixed, required: true },
    label: { type: String, required: true }, // shown in admin UI
    description: { type: String }, // hint shown under the field
    type: {
      type: String,
      enum: ["string", "text", "number", "boolean", "json"],
      default: "string",
    },
    group: { type: String, default: "general", index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type SiteSettingDoc = InferSchemaType<typeof SiteSettingSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const SiteSetting: Model<SiteSettingDoc> =
  (mongoose.models.SiteSetting as Model<SiteSettingDoc>) ||
  mongoose.model<SiteSettingDoc>("SiteSetting", SiteSettingSchema);
