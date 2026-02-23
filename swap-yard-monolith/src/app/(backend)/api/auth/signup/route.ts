import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req:Request){
    try {
        const { email, password, firstname, lastname, phoneNumber, role, state, contract } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstname,
                lastname,
                role,
                phoneNumber,
                state,
                contract
            },
        });

        return NextResponse.json({ message: "User created successfully", user: { id: newUser.id, email: newUser.email } }, { status: 201 });
    } catch (error) {
        console.error("Error during user registration:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }   
        
}

