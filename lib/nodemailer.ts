import { createTransport } from "nodemailer";

export const transporter = createTransport({
  service: "Gmail",
  auth: {
    user: "jatin.ahluwalia.5@gmail.com",
    pass: process.env.EMAIL_PASS || "",
  },
});
