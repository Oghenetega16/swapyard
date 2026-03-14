import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { uploadManyImageFiles } from "@/app/(backend)/utils/cloudinary";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";
import { createListingSchema, getListingsSchema } from "./schema";
import { redisClient } from "@/lib/redis";

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

function toNullableString(value: FormDataEntryValue | null) {
  const parsed = String(value || "").trim();
  return parsed ? parsed : null;
}

export async function POST(req: Request) {
  let uploaded: Array<{ url: string; public_id: string }> = [];

  try {
    const token = await getCookie(req, "session");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    const userId = typeof payload === "string" ? payload : payload?.userId;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const rawInput = {
      name: String(formData.get("name") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      location: toNullableString(formData.get("location")),
      state: toNullableString(formData.get("state")),
      status: String(formData.get("status") || "AVAILABLE").trim(),
      condition: String(formData.get("condition") || "").trim(),
      price: Number(formData.get("price")),
      negotiable: String(formData.get("negotiable")) === "true",
      offersDelivery: String(formData.get("offersDelivery")) === "true",
      contact: toNullableString(formData.get("contact")),
      categoryId: toNullableString(formData.get("categoryId")),
    };

    const validatedInput = createListingSchema.safeParse(rawInput);

    if (!validatedInput.success) {
      return NextResponse.json(
        {
          message: "Input does not meet required schema",
          errors: validatedInput.error.flatten().fieldErrors,
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
      offersDelivery,
      contact,
      categoryId,
    } = validatedInput.data;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    if (user.role !== "SELLER") {
      return NextResponse.json(
        { message: "User is not authorized" },
        { status: 403 }
      );
    }

    if (categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: categoryId },
        select: { id: true },
      });

      if (!categoryExists) {
        return NextResponse.json(
          { message: "Selected category does not exist" },
          { status: 400 }
        );
      }
    }

    const images = formData
      .getAll("images")
      .filter((file): file is File => file instanceof File && file.size > 0);

    uploaded = images.length
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
        offersDelivery,
        contact,
        categoryId,
        sellerId: user.id,
        images: {
          create: uploaded.map((img) => ({
            url: img.url,
            publicId: img.public_id,
          })),
        },
      },
      include: {
        images: true,
        category: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        seller: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
      },
    });

    const listingKeys = await redisClient.keys("listings:*");
    if (listingKeys.length > 0) {
      await redisClient.del(listingKeys);
    }

    return NextResponse.json(
      { message: "Listing created successfully", listing },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating listing:", err);
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
      categoryId: searchParams.get("categoryId") ?? undefined,
      minPrice: searchParams.get("minPrice") ?? undefined,
      maxPrice: searchParams.get("maxPrice") ?? undefined,
      offersDelivery: searchParams.get("offersDelivery") ?? undefined,
      negotiable: searchParams.get("negotiable") ?? undefined,
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
    };

    const validatedQuery = getListingsSchema.safeParse(rawQuery);

    if (!validatedQuery.success) {
      return NextResponse.json(
        {
          message: "Invalid query parameters",
          errors: validatedQuery.error.flatten().fieldErrors,
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
      categoryId,
      minPrice,
      maxPrice,
      offersDelivery,
      negotiable,
      page,
      limit,
    } = validatedQuery.data;

    const cacheKey = `listings:${JSON.stringify({
      q,
      status,
      condition,
      state,
      sellerId,
      categoryId,
      minPrice,
      maxPrice,
      offersDelivery,
      negotiable,
      page,
      limit,
    })}`;

    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return NextResponse.json(JSON.parse(cached), { status: 200 });
    }

    const skip = (page - 1) * limit;

    const where: Prisma.ListingWhereInput = {
      ...(status ? { status } : {}),
      ...(condition ? { condition } : {}),
      ...(state ? { state } : {}),
      ...(sellerId ? { sellerId } : {}),
      ...(categoryId ? { categoryId } : {}),
      ...(offersDelivery !== undefined ? { offersDelivery } : {}),
      ...(negotiable !== undefined ? { negotiable } : {}),
      ...(minPrice !== undefined || maxPrice !== undefined
        ? {
            price: {
              ...(minPrice !== undefined ? { gte: minPrice } : {}),
              ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
            },
          }
        : {}),
    };

    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { location: { contains: q, mode: "insensitive" } },
        { state: { contains: q, mode: "insensitive" } },
        { contact: { contains: q, mode: "insensitive" } },
        {
          category: {
            name: { contains: q, mode: "insensitive" },
          },
        },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        include: {
          images: true,
          category: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          seller: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.listing.count({ where }),
    ]);

    const responseData = {
      ok: true,
      items,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };

    await redisClient.set(cacheKey, JSON.stringify(responseData), {
      EX: 600,
    });

    return NextResponse.json(responseData, { status: 200 });
  } catch (err) {
    console.error("Error fetching listings:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}