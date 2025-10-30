import nodemailer from 'nodemailer';
import dotenv from "dotenv"
dotenv.config()
interface MailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string; // Optional override
  attachments?:any[]
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port:parseInt(process.env.MAIL_PORT as string),
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASS,
  },
});

/**
 * Send an email using the reusable transporter
 */
export async function sendMail(options: MailOptions): Promise<void> {
  try {
    const mail = await transporter.sendMail({
      from: options.from || `"Here are your DNA Results :)" <${process.env.APP_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      attachments:options.attachments,
      text: options.text,
      html: options.html,
    });

    console.log(`✅ Email sent to ${options.to}: ${mail.messageId}`);
  } catch (error) {
    console.error(`❌ Error sending mail to ${options.to}`, error);
    throw error;
  }
}
