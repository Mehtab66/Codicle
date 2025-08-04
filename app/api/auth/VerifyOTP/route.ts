import { NextResponse } from "next/server";
import { connectDB } from "../../../libs/mongoDb";
import OTP from "../../../models/otpModel";
import User from "../../../models/UserModel";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, otp, name, password } = await request.json();

    if (!email || !otp || !name || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find OTP in MongoDB
    const otpDoc = await OTP.findOne({ email, otp });
    if (!otpDoc) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // OTP is valid, delete it
    await OTP.deleteOne({ email, otp });

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    await user.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
