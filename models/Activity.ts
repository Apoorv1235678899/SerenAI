import mongoose, { Document, Schema } from "mongoose";

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  name: string;
  description?: string;
  duration?: number;
  difficulty?: string;
  feedback?: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "meditation",
        "exercise",
        "walking",
        "reading",
        "journaling",
        "therapy",
        "game",
        "breathing",
      ],
    },
    name: { type: String, required: true },
    description: String,
    duration: { type: Number, min: 0 },
    difficulty: String,
    feedback: String,
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

activitySchema.index({ userId: 1, timestamp: -1 });

export const Activity =
  (mongoose.models.Activity as mongoose.Model<IActivity> | undefined) ??
  mongoose.model<IActivity>("Activity", activitySchema);