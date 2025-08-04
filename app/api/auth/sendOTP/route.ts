import { NextResponse } from "next/server";
import { connectDB } from "../../../libs/mongoDb";
import OTP from "../../../models/otpModel";
import { sendEmail } from "../../../helpers/email/OtpEmail";
import User from "../../../models/UserModel";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, name, password } = await request.json();

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in MongoDB
    await OTP.create({ email, otp });

    // Send OTP email
    await sendEmail(email, otp);

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send OTP Error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
