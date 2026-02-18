import {cookies} from "next/headers";
import { verifyToken } from "@/lib/token";
import {prisma} from "@/lib/prisma";
import NextResponse from "next/server";


export async function GET(){
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;