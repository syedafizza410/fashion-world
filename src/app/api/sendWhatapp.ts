import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: NextRequest) {
  try {
    const { orderDetails } = await req.json();

    // Twilio Credentials (Replace with actual credentials from Twilio Console)
    const accountSid = "YOUR_TWILIO_ACCOUNT_SID";
    const authToken = "YOUR_TWILIO_AUTH_TOKEN";
    const fromWhatsAppNumber = "whatsapp:+14155238886"; // Twilio Sandbox Number
    const toWhatsAppNumber = "whatsapp:+923408066537"; // Replace with owner's WhatsApp number

    const client = twilio(accountSid, authToken);

    const message = `📦 *New Order Received*\n👤 *Customer:* ${orderDetails.firstName} ${orderDetails.lastName}\n📞 *Phone:* ${orderDetails.phone}\n💰 *Total:* ${orderDetails.total} USD\n\n🛒 *Products:*\n${orderDetails.products.map((p: any) => `- ${p.name} (Qty: ${p.quantity})`).join("\n")}`;

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
