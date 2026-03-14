import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";
import { updateOrderSchema } from "../schema";

export const runtime = "nodejs";

async function getCookie(req: Request, name: string) {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;

  return (
    cookie
      .split("; ")
      .find((c) => c.startsWith(`${name}=`))
      ?.split("=")[1] ?? null
  );
}

async function getUserId(req: Request) {
  const token = await getCookie(req, "session");
  if (!token) return null;

  const payload = await verifyToken(token);
  return typeof payload === "string" ? payload : payload?.userId;
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await ctx.params;

    const order = await prisma.order.findFirst({
      where: {
        id,
        OR: [
          { buyerId: userId },
          {
            items: {
              some: {
                sellerId: userId,
              },
            },
          },
        ],
      },
      include: {
        buyer: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        items: {
          include: {
            listing: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
            seller: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
              },
            },
          },
        },
        payment: true,
      },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error("GET ORDER ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await ctx.params;
    const body = await req.json();

    const parsed = updateOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const existingOrder = await prisma.order.findFirst({
      where: {
        id,
        OR: [
          { buyerId: userId },
          {
            items: {
              some: {
                sellerId: userId,
              },
            },
          },
        ],
      },
      include: {
        items: true,
      },
    });

    if (!existingOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const newStatus = parsed.data.status;

    const updateData: {
      status: typeof newStatus;
      deliveredAt?: Date;
      completedAt?: Date;
      cancelledAt?: Date;
    } = {
      status: newStatus,
    };

    if (newStatus === "DELIVERED") {
      updateData.deliveredAt = new Date();
    }

    if (newStatus === "COMPLETED") {
      updateData.completedAt = new Date();
    }

    if (newStatus === "CANCELLED") {
      updateData.cancelledAt = new Date();
    }

    const order = await prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        buyer: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
        items: {
          include: {
            listing: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
            seller: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
              },
            },
          },
        },
        payment: true,
      },
    });

    return NextResponse.json(
      {
        message: "Order updated successfully",
        order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH ORDER ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}