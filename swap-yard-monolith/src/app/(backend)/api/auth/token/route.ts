import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ message: "If an account exists, a reset link has been sent." }, { status: 200 });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 5 * 60 * 1000);

        await prisma.passwordResetToken.deleteMany({ where: { email: user.email } });
        await prisma.passwordResetToken.create({
            data: {
                email: user.email,
                token: resetToken,
                expires: resetTokenExpiry,
            },
        });

        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

        const { data, error } = await resend.emails.send({
            from: "SwapYard <onboarding@resend.dev>",
            to: [user.email], 
            subject: "Reset Your Password",
            html: `
                <div>
                    <h1>Reset your password</h1>
                    <p>Click the link below to reset your password. This link expires in 5 minutes.</p>
                    <a href="${resetLink}" style="background: #000; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">
                        Reset Password
                    </a>
                    <p>If you didn't request this, you can safely ignore this email.</p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
        }

        return NextResponse.json({ message: "If an account exists, a reset link has been sent." }, { status: 200 });
        
    } catch (error) {
        console.error("Internal Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}