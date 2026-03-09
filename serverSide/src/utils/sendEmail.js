import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL || process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL || process.env.EMAIL_USER,
      to,
      subject,
      text,   // plain text
      html    // html version
    });
  } catch (error) {
    console.error("Email error:", error);
  }
};