import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";
import { createReviewSchema, getReviewsSchema } from "./schema";

export const runtime = "nodejs";

export async function getCookie(req: Request, name: string) {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;

  return (
    cookie
      .split("; ")
      .find((c) => c.startsWith(`${name}=`))
      ?.split("=")[1] ?? null
  );
}

export async function POST(req: Request) {
  try {
    const token = await getCookie(req, "session");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { userId } = await verifyToken(token);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User does not exist" }, { status: 404 });
    }

    if (user.role !== "BUYER") {
      return NextResponse.json({ message: "User is not authorized" }, { status: 403 });
    }

    const body = await req.json();

    const validatedInput = createReviewSchema.safeParse({
      rating: body?.rating,
      comment: body?.comment ? String(body.comment).trim() : null,
      sellerId: String(body?.sellerId || "").trim(),
    });

    if (!validatedInput.success) {
      return NextResponse.json(
        {
          message: "Input does not meet required schema",
          errors: validatedInput.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { rating, comment, sellerId } = validatedInput.data;

    if (sellerId === user.id) {
      return NextResponse.json(
        { message: "You cannot review yourself" },
        { status: 400 }
      );
    }

    const seller = await prisma.user.findUnique({
      where: { id: sellerId },
      select: { id: true, role: true },
    });

    if (!seller) {
      return NextResponse.json({ message: "Seller not found" }, { status: 404 });
    }

    if (seller.role !== "SELLER") {
      return NextResponse.json(
        { message: "Target user is not a seller" },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        buyerId: user.id,
        sellerId,
      },
      include: {
        buyer: { select: { id: true } },
        seller: { select: { id: true } },
      },
    });

    return NextResponse.json({ ok: true, review }, { status: 201 });
  } catch (err: any) {
    if (err?.code === "P2002") {
      return NextResponse.json(
        { message: "You have already reviewed this seller" },
        { status: 409 }
      );
    }

    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const rawQuery = {
      sellerId: searchParams.get("sellerId") ?? undefined,
      buyerId: searchParams.get("buyerId") ?? undefined,
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
    };

    const validatedQuery = getReviewsSchema.safeParse(rawQuery);

    if (!validatedQuery.success) {
      return NextResponse.json(
        {
          message: "Invalid query parameters",
          errors: validatedQuery.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { sellerId, buyerId, page, limit } = validatedQuery.data;

    const skip = (page - 1) * limit;

    const where: Prisma.ReviewWhereInput = {};

    if (sellerId) where.sellerId = sellerId;
    if (buyerId) where.buyerId = buyerId;

    const [items, total] = await Promise.all([
      prisma.review.findMany({
        where,
        include: {
          buyer: { select: { id: true } },
          seller: { select: { id: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.review.count({ where }),
    ]);

    return NextResponse.json(
      {
        ok: true,
        items,
        meta: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}