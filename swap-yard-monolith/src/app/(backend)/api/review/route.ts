import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";

export const runtime = "nodejs";

export async function getCookie(req: Request, name: string) {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;
  return cookie.split("; ").find((c) => c.startsWith(`${name}=`))?.split("=")[1] ?? null;
}

export async function POST(req: Request) {
  try {
    const token = await getCookie(req, "session");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { userId } = await verifyToken(token);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });

    if (!user) return NextResponse.json({ message: "User does not exist" }, { status: 404 });
    if (user.role !== "BUYER") {
      return NextResponse.json({ message: "User is not authorized" }, { status: 403 });
    }

    const body = await req.json();
    const rating = Number(body?.rating);
    const comment = body?.comment ? String(body.comment).trim() : null;
    const sellerId = String(body?.sellerId || "").trim();

    if (!sellerId || Number.isNaN(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ message: "Invalid parameters" }, { status: 400 });
    }

    if (sellerId === user.id) {
      return NextResponse.json({ message: "You cannot review yourself" }, { status: 400 });
    }

    const seller = await prisma.user.findUnique({
      where: { id: sellerId },
      select: { id: true, role: true },
    });

    if (!seller) return NextResponse.json({ message: "Seller not found" }, { status: 404 });
    if (seller.role !== "SELLER") {
      return NextResponse.json({ message: "Target user is not a seller" }, { status: 400 });
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

    const sellerId = searchParams.get("sellerId")?.trim() || "";
    const buyerId = searchParams.get("buyerId")?.trim() || "";

    const pageRaw = searchParams.get("page");
    const limitRaw = searchParams.get("limit");
    const page = pageRaw ? Math.max(1, Number(pageRaw)) : 1;
    const limit = limitRaw ? Math.min(50, Math.max(1, Number(limitRaw))) : 12;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (sellerId) where.sellerId = sellerId;
    if (buyerId) where.buyerId = buyerId;

    const [items, total] = await Promise.all([
      prisma.review.findMany({
        where,
        include: {
          buyer: { select: { id: true   } },
          seller: { select: { id: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.review.count({ where }),
    ]);

    return NextResponse.json(
      { ok: true, items, meta: { total, page, limit, pages: Math.ceil(total / limit) } },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}