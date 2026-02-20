import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        console.log("Incoming Body:", { email, password });

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        if (!password) {
            return NextResponse.json({ message: "Password is required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        user.password = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { email },
            data: { password: user.password },
        });

        return NextResponse.json({ message: "Password reset successfully." }, { status: 200 });

    } catch (error) {   
        console.error("Error during password reset:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }   
}