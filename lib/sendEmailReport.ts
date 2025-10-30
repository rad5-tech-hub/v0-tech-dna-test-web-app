// services/reportSender.ts

import { sendMail } from "@/services/nodemailer.services"; // your existing nodemailer wrapper
import { buildReportHtml,buildPlainText,ReportSession } from "./email-template";

export async function sendReportEmail(session: ReportSession & { pdfBuffer?: Buffer; pdfFilename?: string }) {
  const html = buildReportHtml(session);
  const text = buildPlainText(session);

  const attachments = [];
  if (session.pdfBuffer) {
    attachments.push({
      filename: session.pdfFilename ?? `RAD5_Report_${session.name ?? "report"}.pdf`,
      content: session.pdfBuffer,
      contentType: "application/pdf",
    });
  }

  // If you want to embed a logo inline, use cid and add as attachment with cid: 'logo@rad5'
  // attachments.push({ filename:'logo.png', path:'/path/logo.png', cid:'logo@rad5' })

  await sendMail({
    to: session.contact?.email ?? session.contact?.email ?? session.contact?.email ?? undefined, // replace appropriately
    subject: `Your RAD5 TechDNA Report — ${session.name}`,
    html,
    text,
    attachments,
  });
}
