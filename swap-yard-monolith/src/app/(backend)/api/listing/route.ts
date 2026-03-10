import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { uploadManyImageFiles } from "@/app/(backend)/utils/cloudinary";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";
import { createListingSchema, getListingsSchema } from "./schema";
import { createClient } from "redis";

export const runtime = "nodejs";

//Intitialize Redis
const redisClient = createClient()

const default_expiration = 3600;

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

    const formData = await req.formData();

    const rawInput = {
      name: String(formData.get("name") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      location: String(formData.get("location") || "").trim() || null,
      state: String(formData.get("state") || "").trim() || null,
      status: String(formData.get("status") || "AVAILABLE"),
      condition: String(formData.get("condition") || "").trim(),
      price: Number(formData.get("price")),
      negotiable: formData.get("negotiable") === "true",
    };

    const validatedInput = createListingSchema.safeParse(rawInput);

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
      name,
      description,
      location,
      state,
      status,
      condition,
      price,
      negotiable,
    } = validatedInput.data;

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

    const images = formData.getAll("images").filter(Boolean) as File[];

    const uploaded = images.length
      ? await uploadManyImageFiles(images, { subfolder: "listings" })
      : [];

    const listing = await prisma.listing.create({
      data: {
        name,
        description,
        location,
        state,
        status,
        condition,
        price,
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
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const rawQuery = {
      q: searchParams.get("q") ?? undefined,
      status: searchParams.get("status") ?? undefined,
      condition: searchParams.get("condition") ?? undefined,
      state: searchParams.get("state") ?? undefined,
      sellerId: searchParams.get("sellerId") ?? undefined,
      minPrice: searchParams.get("minPrice") ?? undefined,
      maxPrice: searchParams.get("maxPrice") ?? undefined,
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
    };

    const validatedQuery = getListingsSchema.safeParse(rawQuery);

    if (!validatedQuery.success) {
      return NextResponse.json(
        {
          message: "Invalid query parameters",
          errors: validatedQuery.error.flatten(),
        },
        { status: 400 }
      );
    }

    const {
      q,
      status,
      condition,
      state,
      sellerId,
      minPrice,
      maxPrice,
      page,
      limit,
    } = validatedQuery.data;

    const skip = (page - 1) * limit;

    const where: Prisma.ListingWhereInput = {};

    if (status) where.status = status;
    if (condition) where.condition = condition;
    if (state) where.state = state;
    if (sellerId) where.sellerId = sellerId;

    if (q) {
      where.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
        { location: { contains: q } },
      ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {
        ...(minPrice !== undefined ? { gte: minPrice } : {}),
        ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
      };
    }

    const [items, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        include: {
          images: true,
          seller: {
            select: { id: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.listing.count({ where }),
    ]);

    redisClient.setEx("items", default_expiration, JSON.stringify(items))
    
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