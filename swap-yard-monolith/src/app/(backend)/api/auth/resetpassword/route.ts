import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json({ message: "Token and password are required" }, { status: 400 });
        }

        const passwordResetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (!passwordResetToken) {
            return NextResponse.json({ message: "Invalid token." }, { status: 400 });
        }

        const hasExpired = new Date() > new Date(passwordResetToken.expires);
        if (hasExpired) {
            await prisma.passwordResetToken.delete({ where: { token } });
            return NextResponse.json({ message: "Token has expired." }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: passwordResetToken.email },
        });

        if (!user) {
            return NextResponse.json({ message: "User no longer exists." }, { status: 404 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await prisma.$transaction([
            prisma.user.update({
                where: { id: user.id },
                data: { password: hashedPassword },
            }),
            prisma.passwordResetToken.delete({
                where: { token },
            }),
        ]);

        return NextResponse.json({ message: "Password reset successfully." }, { status: 200 });

    } catch (error) {
        console.error("Error during password reset:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}