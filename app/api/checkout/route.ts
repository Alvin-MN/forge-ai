import { NextRequest, NextResponse } from "next/server";
import { polar } from "@/lib/polar";

export async function GET(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get("product");
  if (!productId) return NextResponse.json({ error: "Missing product ID" }, { status: 400 });

  try {
    const checkout = await polar.checkouts.create({
      products: [productId],
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?success=true`,
    });
    return NextResponse.redirect(checkout.url);
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
