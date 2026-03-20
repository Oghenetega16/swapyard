import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { resetPasswordSchema } from "../schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedInput = resetPasswordSchema.safeParse(body);

    if (!validatedInput.success) {
      return NextResponse.json(
        {
          message: "Input does not meet required schema",
          errors: validatedInput.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { token, password } = validatedInput.data;

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!passwordResetToken) {
      return NextResponse.json({ message: "Invalid token." }, { status: 400 });
    }

    const hasExpired = new Date() > new Date(passwordResetToken.expires);

    if (hasExpired) {
      await prisma.passwordResetToken.delete({
        where: { token },
      });

      return NextResponse.json(
        { message: "Token has expired." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: passwordResetToken.email },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Authentication process failed" },
        { status: 404 }
      );
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

    return NextResponse.json(
      { message: "Password reset successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during password reset:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}