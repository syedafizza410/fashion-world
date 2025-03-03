import nodemailer from "nodemailer";
import "dotenv/config";

// SMTP Configuration for Zoho Mail
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ✅ Updated EmailData Interface to Include orderId & products
interface EmailData {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  orderId?: string;
  products?: any[]; // Products array
}

// Function to Send Email via Zoho SMTP
export async function sendEmail({ to, subject, text, html, orderId, products }: EmailData) {
  try {
    // ✅ Validate Required Fields
    if (!to || !subject) {
      throw new Error("Missing required email fields: 'to' and 'subject'");
    }

    // ✅ Include Order & Product Details in Email Body
    let productDetails = "";
    if (products && products.length > 0) {
      productDetails = products
        .map((p) => `🛒 ${p.name} - ${p.quantity} x $${p.price}`)
        .join("\n");
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM, // Sender email from .env
      to,
      subject,
      text: text || `📦 Order ID: ${orderId}\n\n${productDetails}`,
      html:
        html ||
        `<h2>📦 Order ID: ${orderId}</h2><ul>${products
          ?.map((p) => `<li>🛒 ${p.name} - ${p.quantity} x $${p.price}</li>`)
          .join("")}</ul>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent Successfully:", info.messageId);
    return { success: true, message: "Email sent successfully", messageId: info.messageId };
  } catch (error: any) {
    console.error("❌ Email Sending Failed:", error.message);
    return { success: false, message: "Failed to send email", error: error.message };
  }
}
