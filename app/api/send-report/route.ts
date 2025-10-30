// app/api/send-report/route.ts (server-side)
import { NextResponse } from "next/server";
import { sendMail } from "@/services/nodemailer.services"; // your wrapper
import { buildPlainText, buildReportHtml } from "@/lib/email-template";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { session, pdfBase64, pdfFilename, to } = body;

    if (!to || !session) {
      return NextResponse.json({ ok: false, message: "Missing to or session" }, { status: 400 });
    }

    const attachments: any[] = [];
    if (pdfBase64) {
      const buffer = Buffer.from(pdfBase64, "base64");
      attachments.push({
        filename: pdfFilename ?? `RAD5_Report_${session.name ?? "report"}.pdf`,
        content: buffer,
        contentType: "application/pdf",
      });
    }

    const html = buildReportHtml(session); // from your email template file
    const text = buildPlainText(session);

    await sendMail({
      to,
      subject: `Your RAD5 TechDNA Report — ${session.name}`,
      html,
      text,
      attachments,
    });

    return NextResponse.json({ ok: true, message: "Email sent" });
  } catch (err) {
    console.error("send-report route error:", err);
    return NextResponse.json({ ok: false, message: String(err) }, { status: 500 });
  }
}
