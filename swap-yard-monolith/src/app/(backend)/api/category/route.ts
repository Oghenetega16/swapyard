import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";
import { uploadOneImageFile } from "@/app/(backend)/utils/cloudinary";
import { createCategorySchema } from "./schema";

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

async function getSeller(req: Request) {
  const token = await getCookie(req, "session");
  if (!token) return null;

  const payload = await verifyToken(token);
  const userId = typeof payload === "string" ? payload : payload?.userId;

  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  if (!user || user.role !== "SELLER") return null;

  return user;
}

export async function POST(req: Request) {
  let uploadedImage: any = null;

  try {
    const seller = await getSeller(req);

    if (!seller) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const rawInput = {
      name: String(formData.get("name") || "").trim(),
    };

    const parsed = createCategorySchema.safeParse(rawInput);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const file = formData.get("image");

    if (file instanceof File && file.size > 0) {
      uploadedImage = await uploadOneImageFile(file, {
        subfolder: "categories",
      });
    }

    const category = await prisma.category.create({
      data: {
        name: parsed.data.name,
        image: uploadedImage?.url || null,
        publicId: uploadedImage?.public_id || null,
      },
    });

    return NextResponse.json(
      { message: "Category created", category },
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        listings: {
          include: {
            images: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ categories }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}