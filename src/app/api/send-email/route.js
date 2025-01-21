import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;

    try {
      // 1) Nodemailer Transporter setup
      //    -- Gmail ke liye agar aap "app password" use karein to security better hai.
      //    -- Nahi to "less secure apps" ON karna padega Gmail me (not recommended).
      //    -- Recommended hai ke aap ENV variables use karein credentials ke liye:
      //        process.env.GMAIL_USER, process.env.GMAIL_PASS
      //    -- Example:
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER, // e.g. "myexample@gmail.com"
          pass: process.env.GMAIL_PASS, // e.g. "abcd1234" (App password recommended)
        },
      });

      // 2) Email send karne ka config
      //    -- "to" me aap apni email dalen (jahan receive karna chahte hain)
      const mailOptions = {
        from: email, // user ka email ya aapka hi email
        to: process.env.GMAIL_USER, // jis email par receive karna hai
        subject: subject || 'New message from contact form',
        text: `
          You have a new message from your website contact form.
          
          Name: ${name}
          Email: ${email}
          Subject: ${subject}
          Message: ${message}
        `,
      };

      // 3) Send email
      await transporter.sendMail(mailOptions);

      // 4) Response wapas
      return res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
  } else {
    // Agar GET ya koi aur request type ho
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
