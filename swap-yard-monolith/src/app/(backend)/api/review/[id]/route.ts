import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";

export const runtime = "nodejs";

export async function getCookie(req: Request, name: string) {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;
  return cookie.split("; ").find((c) => c.startsWith(`${name}=`))?.split("=")[1] ?? null;
}

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;

    const review = await prisma.review.findUnique({
      where: { id },
      include: {
        buyer: { select: { id: true } },
        seller: { select: { id: true } },
      },
    });

    if (!review) {
      return NextResponse.json({ message: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, review }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;

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

    const existing = await prisma.review.findUnique({
      where: { id },
      select: { id: true, buyerId: true },
    });

    if (!existing) return NextResponse.json({ message: "Review not found" }, { status: 404 });
    if (existing.buyerId !== user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const ratingRaw = body?.rating;
    const commentRaw = body?.comment;

    const data: any = {};

    if (ratingRaw !== undefined) {
      const rating = Number(ratingRaw);
      if (Number.isNaN(rating) || rating < 1 || rating > 5) {
        return NextResponse.json({ message: "Invalid rating" }, { status: 400 });
      }
      data.rating = rating;
    }

    if (commentRaw !== undefined) {
      const comment = commentRaw === null ? null : String(commentRaw).trim();
      data.comment = comment;
    }

    const review = await prisma.review.update({
      where: { id },
      data,
      include: {
        buyer: { select: { id: true } },
        seller: { select: { id: true } },
      },
    });

    return NextResponse.json({ ok: true, review }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;

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

    const existing = await prisma.review.findUnique({
      where: { id },
      select: { id: true, buyerId: true },
    });

    if (!existing) return NextResponse.json({ message: "Review not found" }, { status: 404 });
    if (existing.buyerId !== user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.review.delete({ where: { id } });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}