import { NextResponse } from "next/server";
import { uploadManyImageFiles, deleteManyByPublicIds } from "@/app/(backend)/utils/cloudinary";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";

export const runtime = "nodejs";

export async function getCookie(req: Request, name: string) {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;
  return cookie.split("; ").find((c) => c.startsWith(`${name}=`))?.split("=")[1] ?? null;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: params.id },
      include: { images: true, seller: { select: { id: true } } },
    });

    if (!listing) {
      return NextResponse.json({ message: "Listing not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, listing }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
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

    if (user.role !== "SELLER") {
      return NextResponse.json({ message: "User is not authorized" }, { status: 403 });
    }

    const existing = await prisma.listing.findUnique({
      where: { id: params.id },
      include: { images: true },
    });

    if (!existing) {
      return NextResponse.json({ message: "Listing not found" }, { status: 404 });
    }

    if (existing.sellerId !== user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const location = formData.get("location");
    const state = formData.get("state");
    const status = formData.get("status");
    const condition = formData.get("condition");
    const priceRaw = formData.get("price");
    const negotiableRaw = formData.get("negotiable");

    const data: any = {};

    if (name !== null) data.name = String(name).trim();
    if (description !== null) data.description = String(description).trim();

    if (location !== null) {
      const v = String(location).trim();
      data.location = v ? v : null;
    }

    if (state !== null) {
      const v = String(state).trim();
      data.state = v ? v : null;
    }

    if (status !== null) data.status = String(status) as any;
    if (condition !== null) data.condition = String(condition) as any;

    if (priceRaw !== null) {
      const p = Number(priceRaw);
      if (Number.isNaN(p)) {
        return NextResponse.json({ message: "Invalid price" }, { status: 400 });
      }
      data.price = p;
    }

    if (negotiableRaw !== null) {
      data.negotiable = String(negotiableRaw) === "true";
    }

    const images = formData.getAll("images").filter(Boolean) as File[];

    if (images.length) {
      const oldPublicIds = existing.images.map((i) => i.publicId).filter(Boolean) as string[];
      if (oldPublicIds.length) await deleteManyByPublicIds(oldPublicIds);

      await prisma.image.deleteMany({ where: { listingId: existing.id } });

      const uploaded = await uploadManyImageFiles(images, { subfolder: "listings" });

      data.images = {
        create: uploaded.map((img) => ({
          url: img.url,
          publicId: img.public_id,
        })),
      };
    }

    const listing = await prisma.listing.update({
      where: { id: params.id },
      data,
      include: { images: true },
    });

    return NextResponse.json({ ok: true, listing }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
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

    if (user.role !== "SELLER") {
      return NextResponse.json({ message: "User is not authorized" }, { status: 403 });
    }

    const existing = await prisma.listing.findUnique({
      where: { id: params.id },
      include: { images: true },
    });

    if (!existing) {
      return NextResponse.json({ message: "Listing not found" }, { status: 404 });
    }

    if (existing.sellerId !== user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const publicIds = existing.images.map((i) => i.publicId).filter(Boolean) as string[];
    if (publicIds.length) await deleteManyByPublicIds(publicIds);

    await prisma.listing.delete({ where: { id: existing.id } });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}