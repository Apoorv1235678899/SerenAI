import mongoose, { Document, Schema } from "mongoose";

export interface IMood extends Document {
  userId: mongoose.Types.ObjectId;
  score: number;
  note?: string;
  context?: unknown;
  activities?: unknown[];
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const moodSchema = new Schema<IMood>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true, min: 0, max: 100 },
    note: { type: String, trim: true },
    context: Schema.Types.Mixed,
    activities: [Schema.Types.Mixed],
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

moodSchema.index({ userId: 1, timestamp: -1 });

export const Mood =
  (mongoose.models.Mood as mongoose.Model<IMood> | undefined) ??
  mongoose.model<IMood>("Mood", moodSchema);