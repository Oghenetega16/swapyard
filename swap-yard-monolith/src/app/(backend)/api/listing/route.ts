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
    const token = await getCookie(req, "session");
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
  })),
},
      },
      include: { images: true },
    });

    return NextResponse.json({ ok: true, listing }, { status: 201 });
  } catch(err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "";
    const condition = searchParams.get("condition")?.trim() || "";
    const state = searchParams.get("state")?.trim() || "";
    const sellerId = searchParams.get("sellerId")?.trim() || "";

    const minPriceRaw = searchParams.get("minPrice");
    const maxPriceRaw = searchParams.get("maxPrice");
    const minPrice = minPriceRaw ? Number(minPriceRaw) : null;
    const maxPrice = maxPriceRaw ? Number(maxPriceRaw) : null;

    const pageRaw = searchParams.get("page");
    const limitRaw = searchParams.get("limit");
    const page = pageRaw ? Math.max(1, Number(pageRaw)) : 1;
    const limit = limitRaw ? Math.min(50, Math.max(1, Number(limitRaw))) : 12;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) where.status = status;
    if (condition) where.condition = condition;
    if (state) where.state = state;
    if (sellerId) where.sellerId = sellerId;

    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { location: { contains: q, mode: "insensitive" } },
      ];
    }

    if (minPrice !== null && !Number.isNaN(minPrice)) where.price = { ...(where.price || {}), gte: minPrice };
    if (maxPrice !== null && !Number.isNaN(maxPrice)) where.price = { ...(where.price || {}), lte: maxPrice };

    const [items, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        include: { images: true, seller: { select: { id: true } } },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.listing.count({ where }),
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