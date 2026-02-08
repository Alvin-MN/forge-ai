import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const event = JSON.parse(body);
    console.log("Polar webhook:", event.type);

    switch (event.type) {
      case "order.paid":
        console.log("Order paid:", event.data?.product?.name);
        break;
      case "subscription.active":
        console.log("Subscription active:", event.data?.product?.name);
        break;
      case "subscription.canceled":
        console.log("Subscription canceled:", event.data?.product?.name);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
