import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";
import {
  uploadOneImageFile,
  deleteImageByPublicId,
} from "@/app/(backend)/utils/cloudinary";
import { updateCategorySchema } from "../schema";

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

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      listings: {
        include: {
          images: true,
        },
      },
    },
  });

  if (!category) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ category });
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  let uploadedImage: any = null;

  try {
    const seller = await getSeller(req);

    if (!seller) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await ctx.params;

    const existing = await prisma.category.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const formData = await req.formData();

    const rawInput = {
      name:
        formData.get("name") !== null
          ? String(formData.get("name")).trim()
          : undefined,
    };

    const parsed = updateCategorySchema.safeParse(rawInput);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // ---------- IMAGE ----------
    const file = formData.get("image");

    if (file instanceof File && file.size > 0) {
      uploadedImage = await uploadOneImageFile(file, {
        subfolder: "categories",
      });
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        ...(parsed.data.name !== undefined && { name: parsed.data.name }),
        ...(uploadedImage && {
          image: uploadedImage.url,
          publicId: uploadedImage.public_id,
        }),
      },
    });

    // delete old image if replaced
    if (uploadedImage && existing.publicId) {
      await deleteImageByPublicId(existing.publicId);
    }

    return NextResponse.json(
      { message: "Updated", category: updated },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// ---------- DELETE ----------
export async function DELETE(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const seller = await getSeller(req);

  if (!seller) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;

  const existing = await prisma.category.findUnique({
    where: { id },
  });

  if (!existing) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  await prisma.category.delete({
    where: { id },
  });

  if (existing.publicId) {
    await deleteImageByPublicId(existing.publicId);
  }

  return NextResponse.json({ message: "Deleted" });
}