import { NextResponse } from "next/server";
import { sendEmail } from "../../utils/sendEmail";
import { sendWhatsapp } from "../../utils/sendWhatsapp";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("✅ Received Request Data:", body);

    if (!body?.email || !body?.products || !body?.customer) {
      return NextResponse.json(
        { error: "Missing required fields", receivedData: body },
        { status: 400 }
      );
    }

    const { email, products, customer } = body;

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty products array", receivedProducts: products },
        { status: 400 }
      );
    }

    if (!customer?.firstName || !customer?.lastName || !customer?.phone) {
      return NextResponse.json(
        { error: "Incomplete customer details", receivedCustomer: customer },
        { status: 400 }
      );
    }

    const orderId = uuidv4();
    console.log("🔹 Generated Order ID:", orderId);

    const totalAmount = products.reduce(
      (sum, p) => sum + ((p.price || 0) * (p.quantity || 1)), 
      0 
    );

    let emailResponse;
    try {
      emailResponse = await sendEmail({
        to: email,
        subject: `Order Confirmation - ${orderId}`,
        text: `Your order with ID ${orderId} has been placed successfully.`,
        html: `<p>Your order with ID <strong>${orderId}</strong> has been placed successfully.</p>`,
      });
    } catch (emailError) {
      console.error("❌ Email Sending Failed:", emailError);
      emailResponse = { success: false, error: (emailError as Error).message };
    }

    let whatsappResponse;
    try {
      whatsappResponse = await sendWhatsapp({
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        email: customer.email || "Not Provided",  
        address: customer.address || "Not Provided", 
        paymentMethod: customer.paymentMethod || "Not Provided",
        orderId,
        products,
        total: totalAmount,
      });
    } catch (whatsappError) {
      console.error("❌ WhatsApp Sending Failed:", whatsappError);
      whatsappResponse = { success: false, error: (whatsappError as Error).message };
    }

    console.log("✅ Email Response:", emailResponse);
    console.log("✅ WhatsApp Response:", whatsappResponse);

    return NextResponse.json({
      success: true,
      message: "Order processed successfully",
      orderId,
      emailInfo: emailResponse,
      whatsappInfo: whatsappResponse,
      totalAmount,
    });

  } catch (error) {
    console.error("❌ Order API Error:", error);
    return NextResponse.json(
      { error: "Failed to process order", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
