import { NextResponse } from "next/server";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/token";

const googleJWKs = createRemoteJWKSet(
    new URL("https://www.googleapis.com/oauth2/v3/certs")
)

export async function POST(req:Request) {

    try{

        const {idToken} = await req.json()

        if(!idToken){
            return NextResponse.json({message: "Missing Google idToken"}, {status: 400})
        }

        const { payload } = await jwtVerify(idToken, googleJWKs, {
            issuer: ["https://accounts.google.com", "accounts.google.com"],
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        const email = payload.email

    if (typeof email !== "string") {
      return NextResponse.json({ message: "Google did not return an email" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        phoneNumber: true,
        role: true,
        state: true,
        contract: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "No account found for this email. Please sign up first." },
        { status: 401 }
      );
    }

    const sessionToken = await createToken(user.id);

    const res = NextResponse.json({ message: "Login successful", user }, { status: 200 });
    res.cookies.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (err) {
    console.error("Google OAuth login error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}