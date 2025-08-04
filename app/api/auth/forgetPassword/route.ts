import { NextResponse } from "next/server";
import { connectDB } from "../../../libs/mongoDb";
import User from "../../../models/UserModel";
import ResetToken from "../../../models/resetToken";
import { sendResetPasswordEmail } from "../../../helpers/email/OtpEmail";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "No user found with this email" },
        { status: 404 }
      );
    }

    // Generate a unique reset token
    const token = crypto.randomBytes(32).toString("hex");

    // Store token in MongoDB
    await ResetToken.create({ email, token });

    // Send reset email
    await sendResetPasswordEmail(email, token);

    return NextResponse.json(
      { message: "Password reset email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { error: "Failed to send reset email" },
      { status: 500 }
    );
  }
}
