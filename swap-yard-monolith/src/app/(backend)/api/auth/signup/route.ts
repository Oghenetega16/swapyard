import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "../schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedInput = registerSchema.safeParse(body);

    if (!validatedInput.success) {
      return NextResponse.json(
        {
          message: "Input does not meet required schema",
          errors: validatedInput.error.flatten(),
        },
        { status: 400 }
      );
    }

    const {
      email,
      password,
      firstname,
      lastname,
      phoneNumber,
      role,
      state,
      contract,
    } = validatedInput.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Unable to process registration" },
        { status: 400 }
      );
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
        contract,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}