import nodemailer from "nodemailer";

export async function POST(req) {
  const body = await req.json();

  const { name, userEmail, message } = body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CLIENT_EMAIL,
        pass: process.env.CLIENT_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.CLIENT_EMAIL,
      to: process.env.OWNER_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        You have a new message:

        Name: ${name}
        Email: ${userEmail}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Message sent to owner successfully!" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Email Sending Error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email." }), {
      status: 500,
    });
  }
}
