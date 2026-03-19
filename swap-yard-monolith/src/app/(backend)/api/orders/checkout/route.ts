import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";
import { checkoutSchema } from "../schema";

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



async function getUser(req: Request) {
  const token = await getCookie(req, "session");
  if (!token) return null;

  const payload = await verifyToken(token);
  const userId = typeof payload === "string" ? payload : payload?.userId;

  if (!userId) return null;

  return prisma.user.findUnique({
    where: { id: userId, role: "BUYER"},
  });
}


export async function POST(req: Request) {
  try {
    const user = await getUser(req);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    //Error line
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { items, pickupLocation, pickupNote } = parsed.data;

    // 1. Fetch listings
    const listingIds = items.map((i) => i.listingId);

    const listings = await prisma.listing.findMany({
      where: {
        id: { in: listingIds },
        status: "AVAILABLE",
      },
      select: {
        id: true,
        name: true,
        price: true,
        sellerId: true,
      },
    });

    if (listings.length !== items.length) {
      return NextResponse.json(
        { message: "Some items unavailable" },
        { status: 400 }
      );
    }


    // 2. Calculate totals
    let subtotal = 0;

    const orderItemsData = items.map((item) => {
      const listing = listings.find((l) => l.id === item.listingId)!;

      const total = listing.price * item.quantity;
      subtotal += total;

      return {
        listingId: listing.id,
        sellerId: listing.sellerId,
        listingName: listing.name,
        unitPrice: listing.price,
        quantity: item.quantity,
      };
    });

    const deliveryFee = 0;
    const platformCommission = subtotal * 0.05;
    const totalAmount = subtotal + deliveryFee;

    // 3. Create Order
    const order = await prisma.order.create({
      data: {
        buyerId: user.id,
        pickupLocation,
        pickupNote,

        subtotal,
        deliveryFee,
        platformCommission,
        totalAmount,

        items: {
          create: orderItemsData,
        },

        payment: {
          create: {
            buyerId: user.id,
            amount: totalAmount,
            status: "PENDING",
            provider: "PAYSTACK",
          },
        },
      },
      include: {
        payment: true,
      },
    });


    // 4. Initialize Paystack
    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        amount: Math.round(totalAmount * 100), // kobo
        reference: order.payment?.id, // IMPORTANT
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      }),
    });

    const paystackData = await paystackRes.json();

    if (!paystackData.status) {
      return NextResponse.json(
        { message: "Payment initialization failed" },
        { status: 400 }
      );
    }


    // 5. Save reference
    await prisma.payment.update({
      where: { id: order.payment!.id },
      data: {
        providerRef: paystackData.data.reference,
      },
    });

    return NextResponse.json(
      {
        message: "Order created",
        paymentUrl: paystackData.data.authorization_url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("CHECKOUT ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}