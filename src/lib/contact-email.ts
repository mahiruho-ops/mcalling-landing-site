import nodemailer from "nodemailer";
import { legalMeta } from "@/content/mkcalling/legal/meta";

export type ContactFormPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function h(s: string): string {
  return escapeHtml(s);
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
      servername: process.env.EHLO_DOMAIN || "mahiruho.com",
    },
    name: process.env.EHLO_DOMAIN || "mahiruho.com",
  });
}

export async function sendContactFormEmail(data: ContactFormPayload): Promise<void> {
  const transporter = createTransporter();
  const to = process.env.SUPPORT_EMAIL?.trim() || legalMeta.emails.support;

  const html = `
    <h2>mKcalling Contact Form</h2>
    <p><strong>Subject:</strong> ${h(data.subject)}</p>
    <p><strong>Name:</strong> ${h(data.name)}</p>
    <p><strong>Email:</strong> ${h(data.email)}</p>
    <p><strong>Phone:</strong> ${h(data.phone)}</p>
    <p><strong>Company:</strong> ${h(data.company)}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${h(data.message)}</p>
  `;

  await transporter.sendMail({
    from: `"mKcalling Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to,
    replyTo: data.email,
    subject: `[mKcalling Contact] ${data.subject} — ${data.name}`,
    html,
  });
}
