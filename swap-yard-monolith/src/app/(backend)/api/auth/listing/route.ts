import { NextResponse } from "next/server";
import { uploadManyImageFiles } from "@/app/(backend)/utils/cloudinary";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"

export async function POST(req:Request){

    const {name, price, description, location, state, status, condition, negotiable} = await req.json()

if (!name){
        return NextResponse.json({message: "Missing name"}, {status: 400})
    }
    
    const images = formData.getAll("images").filter(Boolean) as File[];

    

    const uploaded = images.length ? await uploadManyImageFiles(
        images, {subfolder: "listings"}
    ):[];

    const newListing = await prisma.listing.create({
        data:{
            name,
            price,

        }
    })

}