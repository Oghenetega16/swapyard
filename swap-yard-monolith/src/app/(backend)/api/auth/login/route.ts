import { prisma } from "@/lib/prisma";
import {createToken} from "@/lib/token";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { loginSchema } from "../schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

   const validatedInput = loginSchema.safeParse(body)

   if (!validatedInput.success) {
      return NextResponse.json({message: "Input does not meet required schema", error:validatedInput.error.flatten()}, {status: 400})
   }

   const {email, password} = validatedInput.data

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Optional: enforce email verification later

    const token = await createToken(user.id);

    const response = NextResponse.json(
      { message: "Login successful", user: { id: user.id, email: user.email } },
      { status: 200 }
    );

    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
