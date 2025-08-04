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
