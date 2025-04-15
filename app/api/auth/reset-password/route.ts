// api/auth/reset-password/route.ts
import User from "@/models/users.models";
import { connectDB } from "@/utils/db";
import Cryptr from "cryptr";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/action/email/SendEmail";
import { FPSuccesfullyResetPassword } from "@/utils/EmailTemplate/auth";

export async function POST(req: NextRequest) {
    const { email, token, newPassword } = await req.json();

    if (!email || !token || !newPassword) {
        return NextResponse.json({
            error: "Email, token, and password are required"
        }, { status: 400 });
    }

    if (!process.env.CRYPTO_SECRET) {
        throw new Error("CRYPTO_SECRET is not defined");
    }

    const decryptedEmail = new Cryptr(process.env.CRYPTO_SECRET).decrypt(email);
    const decryptedToken = new Cryptr(process.env.CRYPTO_SECRET).decrypt(token);

    await connectDB();
    const user = await User.findOne({ email: decryptedEmail });

    if (!user) {
        return NextResponse.json({
            error: "Invalid request"
        }, { status: 400 });
    }

    if (decryptedEmail !== user.email) {
        return NextResponse.json({
            error: "You are not authorized to reset the password"
        }, { status: 400 });
    }
    // Check if the token is valid or not expired
    const isTokenExpired = Date.now() > user.resetPasswordExpires;
    
    if (isTokenExpired) {
        await User.updateOne(
            { _id: user._id },
            {
                resetPasswordToken: "",
                resetPasswordExpires: 0,
                updatedAt: new Date(),
            }
        );
        return NextResponse.json({
            error: "Token has expired. Please request a new password reset link"
        }, { status: 400 });
    }

    if (user.resetPasswordToken !== decryptedToken) {
        return NextResponse.json({
            error: "You are not authorized to reset the password"
        }, { status: 400 });
    }

    // user.password = newPassword;
    // user.resetPasswordToken = "";
    // user.resetPasswordExpires = 0;
    // user.isEmailVerified = true;
    // user.updatedAt = new Date();
    // await user.save();
    await User.updateOne(
        { _id: user._id },
        {
            password: newPassword,
            resetPasswordToken: "",
            resetPasswordExpires: 0,
            isEmailVerified: true,
            updatedAt: new Date(),
        }
    );

    sendEmail({
        to: user.email,
        subject: "Password Reset Successfully for DevBlogger",
        message: FPSuccesfullyResetPassword(user.name)
    });

    return NextResponse.json({
        message: "Password reset successfully"
    });
}