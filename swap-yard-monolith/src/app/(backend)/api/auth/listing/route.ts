import { NextResponse } from "next/server";
import { uploadManyImageFiles } from "@/app/(backend)/utils/cloudinary";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";

export const runtime = "nodejs"

export async function getCookie(req:Request, name: string){
    const cookie = req.headers.get("cookie")
    if(!cookie) return null;

    return (cookie.split("; ").find((c)=> c.startsWith(`${name}=`))?.split("=")[1]?? null)
}

export async function POST(req: Request) {
  try {
    const token = await getCookie(req, "auth_token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { userId } = await verifyToken(token);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const location = String(formData.get("location") || "").trim() || null;
    const state = String(formData.get("state") || "").trim() || null;

    const status = String(formData.get("status") || "AVAILABLE");
    const condition = String(formData.get("condition") || "");

    const priceRaw = formData.get("price");
    const price = priceRaw ? Number(priceRaw) : NaN;

    const negotiableRaw = formData.get("negotiable");
    const negotiable =
      negotiableRaw === "true"

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

    if (!name || !description || Number.isNaN(price) || !condition ) {
      return NextResponse.json({ message: "Invalid parameters" }, { status: 400 });
    }

    const images = formData.getAll("images").filter(Boolean) as File[];

    const uploaded = images.length
      ? await uploadManyImageFiles(images, { subfolder: "listings" })
      : [];

    const listing = await prisma.listing.create({
      data: {
        name,
        price,
        description,
        location,
        state,
        status: status as any,
        condition: condition as any,
        negotiable,
        sellerId: user.id,
        images: {
          create: uploaded.map((img) => ({
            url: img.url,
            publicId: img.public_id,
          })),
        },
      },
      include: { images: true },
    });

    return NextResponse.json({ ok: true, listing }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}