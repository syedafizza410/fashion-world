import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email, orderDetails } = await req.json();

    // Nodemailer transporter with Zoho SMTP
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // Zoho SMTP Host
      port: Number(process.env.EMAIL_PORT), // 465 for SSL, 587 for TLS
      secure: true, // SSL true for port 465, false for 587
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASSWORD!, // Use generated App Password
      },
    });

    let mailOptions = {
      from: `"Crafted Fusion" <${process.env.EMAIL_FROM}>`, // Sender Name + Email
      to: email, // Recipient Email
      subject: "Order Confirmation",
      text: `Your order has been placed successfully!\n\nOrder Details:\n${JSON.stringify(orderDetails, null, 2)}`,
      html: `<h2>Your Order has been Confirmed!</h2>
             <p>Thank you for shopping with us.</p>
             <h3>Order Details:</h3>
             <pre>${JSON.stringify(orderDetails, null, 2)}</pre>`,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Order confirmation email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
