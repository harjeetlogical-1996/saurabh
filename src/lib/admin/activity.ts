import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/**
 * Append-only audit trail of admin actions.
 * Created by `recordActivity()` in lib/admin/activity.ts.
 */
const ActivityLogSchema = new Schema(
  {
    actorId: { type: String, index: true }, // user._id as string
    actorEmail: { type: String, index: true },
    action: { type: String, required: true, index: true }, // e.g. "post.create"
    entity: { type: String, required: true, index: true }, // e.g. "post"
    entityId: { type: String, index: true },
    summary: { type: String, maxlength: 500 },
    metadata: { type: Schema.Types.Mixed },
    ip: { type: String, maxlength: 64 },
    userAgent: { type: String, maxlength: 500 },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

ActivityLogSchema.index({ createdAt: -1 });

export type ActivityLogDoc = InferSchemaType<typeof ActivityLogSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ActivityLog: Model<ActivityLogDoc> =
  (mongoose.models.ActivityLog as Model<ActivityLogDoc>) ||
  mongoose.model<ActivityLogDoc>("ActivityLog", ActivityLogSchema);
