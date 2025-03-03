import twilio from "twilio";
import "dotenv/config";

// Twilio Credentials from .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
// const whatsappFrom = process.env.TWILIO_WHATSAPP_NUMBER!;
// const ownerWhatsApp = process.env.OWNER_WHATSAPP_NUMBER!;

// Define TypeScript Interface for WhatsApp Data
interface WhatsAppData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;  // ✅ Address field added
  paymentMethod: string; // ✅ Payment Method added
  orderId: string;
  products: { name: string; price: number; quantity: number }[];
  total: number;
}

// Twilio Client Initialization
const client = twilio(accountSid, authToken);

// Function to Send WhatsApp Message via Twilio
export async function sendWhatsapp({
  firstName,
  lastName,
  email,
  phone,
  address,
  paymentMethod,
  orderId,
  products,
  total,
}: WhatsAppData) {
  try {
    if (!orderId || !Array.isArray(products) || !address || !paymentMethod) {
      throw new Error("Invalid WhatsApp parameters");
    }

    // Construct WhatsApp message
    const messageBody = `🚀 *New Order Received!*\n\n👤 *Customer Details:*\n👨‍💼 Name: ${firstName} ${lastName}\n📧 Email: ${email}\n📞 Contact: ${phone}\n🏠 Address: ${address}\n💳 Payment: ${paymentMethod}\n\n📌 *Order ID:* ${orderId}\n\n🛒 *Products Ordered:*\n${products
      .map((p) => `✅ ${p.name} - ${p.quantity} x $${p.price.toFixed(2)} = $${(p.quantity * p.price).toFixed(2)}`)
      .join("\n")}\n\n💰 *Total Amount:* $${total.toFixed(2)}\n\n📢 *Please confirm the order!*`;

    // Sending WhatsApp Message to Website Owner
    const message = await client.messages.create({
      body: messageBody,
      from: `whatsapp:+14155238886`, // Twilio WhatsApp Business Number
      to: `whatsapp:+12043334556`, // ✅ Website Owner's WhatsApp Number
    });

    console.log("✅ WhatsApp Message Sent Successfully:", message.sid);
    return { success: true, message: "WhatsApp message sent successfully", sid: message.sid };
  } catch (error: any) {
    console.error("❌ WhatsApp Message Sending Failed:", error.message);
    return { success: false, message: "Failed to send WhatsApp message", error: error.message };
  }
}
