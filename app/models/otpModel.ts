import mongoose, { Schema, Document } from "mongoose";

export interface OTPDoc extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const OTPSchema = new Schema<OTPDoc>(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 }, // expires after 5 mins
  },
  { timestamps: true }
);

export default mongoose.models.OTP || mongoose.model("OTP", OTPSchema);
