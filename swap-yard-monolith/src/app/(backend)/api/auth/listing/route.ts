import { NextResponse } from "next/server";
import { uploadManyImageFiles } from "@/app/(backend)/utils/cloudinary";

export const runtime = "nodejs"

export async function POST(req:Request){

    const formData = await req.formData()

    const title = String(formData.get("name") || "")

    const images = formData.getAll("images").filter(Boolean) as File[];

    const uploaded = images.length ? await uploadManyImageFiles(
        images, {subfolder: "listings"}
    ):[];

    const imageUrls = uploaded.map((u)=> u.url)
    const imagePublicIds = uploaded.map((u)=> u.public_id)


}