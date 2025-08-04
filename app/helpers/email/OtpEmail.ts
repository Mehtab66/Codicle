import nodemailer from "nodemailer";

export const sendEmail = async (to: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Codicle Team" <${process.env.SMTP_EMAIL}>`,
    to,
    subject: "Your OTP Code for Codicle",
    text: `Your OTP code is ${text}. Enter this code to verify your account and join Codicle, the collaborative platform where developers share insightful articles, follow fellow coders, and engage through likes and comments. Connect, learn, and grow in the coding community!`,
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <h2 style="color: #1a73e8;">Welcome to Codicle!</h2>
            <p>Your OTP code is:</p>
            <h3 style="background-color: #f1f3f4; padding: 10px; display: inline-block; border-radius: 5px;">${text}</h3>
            <p>Please enter this code to verify your account and unlock the full Codicle experience.</p>
            <p>Codicle is a collaborative platform where developers share insightful articles, follow fellow coders, and engage with posts through likes and comments. Whether you're sharing knowledge, building your developer presence, or exploring new ideas, Codicle is your space to connect and grow in the coding community.</p>
            <p style="margin-top: 20px;">Happy coding!</p>
            <p>The Codicle Team</p>
            <hr style="border-top: 1px solid #e0e0e0; margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">This is an automated email. Please do not reply directly to this message.</p>
        </div>
        `,
  });
};

export const sendResetPasswordEmail = async (to: string, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const resetLink = `${
      process.env.NEXTAUTH_URL
    }/ResetPassword?token=${token}&email=${encodeURIComponent(to)}`;

    await transporter.sendMail({
      from: `"Codicle Team" <${process.env.SMTP_EMAIL}>`,
      to,
      subject: "Reset Your Codicle Password",
      text: `You requested to reset your password for Codicle. Click the link below to set a new password:\n\n${resetLink}\n\nThis link will expire in 1 hour. If you did not request a password reset, please ignore this email.\n\nHappy coding!\nThe Codicle Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #1a73e8;">Reset Your Codicle Password</h2>
          <p>You requested to reset your password for Codicle. Click the button below to set a new password:</p>
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #1a73e8; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0;">Reset Password</a>
          <p>This link will expire in 1 hour. If you did not request a password reset, please ignore this email.</p>
          <p>Codicle is a collaborative platform where developers share insightful articles, follow fellow coders, and engage with posts through likes and comments. Whether you're sharing knowledge, building your developer presence, or exploring new ideas, Codicle is your space to connect and grow in the coding community.</p>
          <p style="margin-top: 20px;">Happy coding!</p>
          <p>The Codicle Team</p>
          <hr style="border-top: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">This is an automated email. Please do not reply directly to this message.</p>
        </div>
      `,
    });
    console.log(`Password reset email sent to ${to}`);
  } catch (error) {
    console.error("SendResetPasswordEmail Error:", error);
    throw new Error("Failed to send password reset email");
  }
};
