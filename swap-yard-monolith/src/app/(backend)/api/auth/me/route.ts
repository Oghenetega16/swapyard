import { cookies } from "next/headers";
import { verifyToken } from "@/lib/token";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { updateProfileSchema } from "../schema";

export async function GET() {
  try {
    const token = (await cookies()).get("session")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    const userId = typeof payload === "string" ? payload : payload?.userId;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phoneNumber: true,
        role: true,
        state: true,
        address: true,
        deliveryAddress: true,
        bio: true,
        contract: true,
        sellerAccount: {
          select: {
            id: true,
            bankName: true,
            accountName: true,
            accountNumber: true,
            accountType: true,
            isVerified: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const token = (await cookies()).get("session")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    const userId = typeof payload === "string" ? payload : payload?.userId;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = updateProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      firstname,
      lastname,
      phoneNumber,
      email,
      state,
      bio,
      deliveryAddress,
      bankName,
      accountName,
      accountNumber,
      accountType,
    } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        sellerAccount: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (email && email !== existingUser.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (emailTaken) {
        return NextResponse.json(
          { message: "Email address is already in use" },
          { status: 409 }
        );
      }
    }

    const userData: {
      firstname?: string;
      lastname?: string;
      phoneNumber?: string;
      email?: string;
      state?: string;
      bio?: string;
      deliveryAddress?: string;
    } = {};

    if (firstname !== undefined) userData.firstname = firstname;
    if (lastname !== undefined) userData.lastname = lastname;
    if (phoneNumber !== undefined) userData.phoneNumber = phoneNumber;
    if (email !== undefined) userData.email = email;
    if (state !== undefined) userData.state = state;
    if (bio !== undefined) userData.bio = bio;
    if (deliveryAddress !== undefined) userData.deliveryAddress = deliveryAddress;

    const payoutFieldsProvided =
      bankName !== undefined ||
      accountName !== undefined ||
      accountNumber !== undefined ||
      accountType !== undefined;

    await prisma.$transaction(async (tx) => {
      if (Object.keys(userData).length > 0) {
        await tx.user.update({
          where: { id: userId },
          data: userData,
        });
      }

      if (payoutFieldsProvided) {
        if (existingUser.sellerAccount?.id) {
          await tx.sellerAccount.update({
            where: { userId },
            data: {
              ...(bankName !== undefined ? { bankName } : {}),
              ...(accountName !== undefined ? { accountName } : {}),
              ...(accountNumber !== undefined ? { accountNumber } : {}),
              ...(accountType !== undefined ? { accountType } : {}),
            },
          });
        } else {
          await tx.sellerAccount.create({
            data: {
              userId,
              bankName: bankName ?? "",
              accountName: accountName ?? "",
              accountNumber: accountNumber ?? "",
              accountType: accountType ?? "Savings",
            },
          });
        }
      }
    });

    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phoneNumber: true,
        role: true,
        state: true,
        address: true,
        deliveryAddress: true,
        bio: true,
        contract: true,
        sellerAccount: {
          select: {
            id: true,
            bankName: true,
            accountName: true,
            accountNumber: true,
            accountType: true,
            isVerified: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}