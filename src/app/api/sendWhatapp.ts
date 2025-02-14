import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: NextRequest) {
  try {
    const { orderDetails } = await req.json();
    
    // ✅ Error handling for missing data
    if (!orderDetails || !orderDetails.products || orderDetails.products.length === 0) {
      return NextResponse.json({ error: "Invalid order details" }, { status: 400 });
    }

    // ✅ Twilio Credentials (Use environment variables)
    const accountSid = process.env.TWILIO_ACCOUNT_SID!;
    const authToken = process.env.TWILIO_AUTH_TOKEN!;
    const fromWhatsAppNumber = "whatsapp:+14155238886"; // Twilio Sandbox Number
    const toWhatsAppNumber = "whatsapp:+12043334556"; // Owner's WhatsApp number

    const client = twilio(accountSid, authToken);

    // ✅ Format message with product list
    const productList = orderDetails.products
      .map((p: any) => `- *${p.name}* (Qty: ${p.quantity})`)
      .join("\n");

    const message = `📦 *New Order Received*\n👤 *Customer:* ${orderDetails.firstName} ${orderDetails.lastName}\n📞 *Phone:* ${orderDetails.phone}\n💰 *Total:* ${orderDetails.total} USD\n\n🛒 *Products:*\n${productList}`;

    // ✅ Send WhatsApp message
    const response = await client.messages.create({
      from: fromWhatsAppNumber,
      to: toWhatsAppNumber,
      body: message,
    });

    console.log("WhatsApp Message Sent:", response.sid);
    return NextResponse.json({ message: "WhatsApp Notification Sent!" });
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return NextResponse.json({ error: "Failed to send WhatsApp message" }, { status: 500 });
  }
}
