import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/token";

export async function POST(req: Request) {
  try {
    const { accessToken } = await req.json();

    if (!accessToken) {
      return NextResponse.json({ message: "Missing Facebook accessToken" }, { status: 400 });
    }

    const appId = process.env.FACEBOOK_APP_ID!;
    const appSecret = process.env.FACEBOOK_APP_SECRET!;
    const appAccessToken = `${appId}|${appSecret}`;

    const debugUrl =
      `https://graph.facebook.com/debug_token` +
      `?input_token=${encodeURIComponent(accessToken)}` +
      `&access_token=${encodeURIComponent(appAccessToken)}`;

    const debugRes = await fetch(debugUrl);
    const debugJson = await debugRes.json();

    const data = debugJson?.data;

    if (!debugRes.ok || !data?.is_valid) {
      return NextResponse.json({ message: "Invalid Facebook token" }, { status: 401 });
    }

    // 2) Fetch user email
    const meUrl =
      `https://graph.facebook.com/me` +
      `?fields=id,name,email` +
      `&access_token=${encodeURIComponent(accessToken)}`;

    const meRes = await fetch(meUrl);
    const meJson = await meRes.json();

    const email = meJson?.email;

    if (!meRes.ok) {
      return NextResponse.json({ message: "Failed to fetch Facebook profile" }, { status: 401 });
    }

    if (typeof email !== "string") {
      return NextResponse.json(
        { message: "Facebook did not return an email. Use normal login." },
        { status: 400 }
      );
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
    console.error("Facebook OAuth login error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}