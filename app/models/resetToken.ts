import mongoose, { Schema, Document } from "mongoose";

export interface ResetTokenDoc extends Document {
  email: string;
  token: string;
  createdAt: Date;
}

const ResetTokenSchema = new Schema<ResetTokenDoc>(
  {
    email: { type: String, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 }, // Expires after 1 hour
  },
  { timestamps: true }
);

export default mongoose.models.ResetToken ||
  mongoose.model("ResetToken", ResetTokenSchema);
