// lib/email-templates/reportEmail.ts
export type ReportSession = {
  name: string;
  gender?: string;
  date?: string; // ISO or formatted date
  timeTaken?: number; // minutes
  topSkill?: string;
  percentages?: Record<string, number>;
  recommendations?: Record<string, string>;
  contact?: { phone?: string; email?: string; website?: string };
};

export function buildReportHtml(session: ReportSession) {
  const {
    name = "Candidate",
    gender = "N/A",
    date = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),
    timeTaken = 0,
    topSkill = "",
    percentages = {},
    recommendations = {},
    contact = {
      phone: "+234 706 434 3189",
      email: "info@rad5.com.ng",
      website: "www.rad5.com.ng",
    },
  } = session;

  // Build rows for each skill dynamically
  const skillRowsHtml = Object.entries(percentages)
    .map(
      ([skill, pct]) => `
      <tr>
        <td style="padding:6px 12px; font-weight:600;">${escapeHtml(skill)}</td>
        <td style="padding:6px 12px; text-align:right;">${pct}%</td>
      </tr>
    `
    )
    .join("");

  // Get recommendation for topSkill or fallback
  const recommendationText =
    recommendations[topSkill] ??
    recommendations[topSkill || ""] ??
    (topSkill ? `You have a strong natural alignment toward ${topSkill}.` : "");

  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>RAD5 TechDNA Report</title>
    <style>
      /* Basic, email-safe inline-friendly styles */
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; margin:0; padding:24px; background:#f6f7fb; color:#111827; }
      .container { max-width:680px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 6px 18px rgba(15,23,42,0.06); }
      .header { background: linear-gradient(90deg,#06b6d4,#7c3aed); color:white; padding:20px 24px; }
      .brand { font-weight:800; font-size:20px; letter-spacing:0.6px; }
      .body { padding:20px 24px; }
      h1 { margin:0 0 8px 0; font-size:20px; }
      .muted { color:#6b7280; font-size:13px; }
      table { width:100%; border-collapse:collapse; margin-top:12px; }
      .contact { font-size:13px; color:#374151; }
      .footer { padding:16px 24px; font-size:12px; color:#6b7280; text-align:center; background:#fafafa; }
      .skill-table td { border-bottom:1px solid #f1f5f9; }
      .pill { display:inline-block; background:#eef2ff; color:#3730a3; padding:6px 10px; border-radius:999px; font-weight:600; font-size:13px; }
      .recommendation { margin-top:12px; padding:12px; background:#fff7ed; border-radius:6px; color:#92400e; }
    </style>
  </head>
  <body>
    <div class="container" role="article" aria-label="RAD5 TechDNA Report">
      <div class="header">
        <div class="brand">RAD5 TechDNA</div>
        <div style="margin-top:6px; font-size:13px; opacity:0.95;">Your Digital Career Path Report</div>
      </div>

      <div class="body">
        <h1>Hi ${escapeHtml(name)},</h1>
        <p class="muted">Below is your TechDNA quick summary. You can also download the attached PDF for a printable copy.</p>

        <table style="margin-top:16px;">
          <tr>
            <td style="padding:6px 12px; font-weight:700; width:50%;">Name</td>
            <td style="padding:6px 12px;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:6px 12px; font-weight:700;">Gender</td>
            <td style="padding:6px 12px;">${escapeHtml(gender)}</td>
          </tr>
          <tr>
            <td style="padding:6px 12px; font-weight:700;">Test Duration</td>
            <td style="padding:6px 12px;">${escapeHtml(
              String(timeTaken)
            )} minute(s)</td>
          </tr>
          <tr>
            <td style="padding:6px 12px; font-weight:700;">Date</td>
            <td style="padding:6px 12px;">${escapeHtml(date)}</td>
          </tr>
        </table>

        <h2 style="margin-top:18px; font-size:16px;">Your Results</h2>

        <table class="skill-table" style="margin-top:8px;">
          ${skillRowsHtml}
        </table>

        <div style="display:flex; align-items:center; justify-content:space-between; margin-top:16px;">
          <div>
            <div style="font-size:13px; color:#6b7280;">Top Match</div>
            <div class="pill">${escapeHtml(topSkill || "—")}</div>
          </div>
          <div style="text-align:right;">
            <!-- space for graphic / badge if needed -->
          </div>
        </div>

        <div class="recommendation">
          <strong>Recommendation — ${escapeHtml(topSkill || "General")}</strong>
          <div style="margin-top:8px; color:#92400e;">
            ${escapeHtml(recommendationText)}
          </div>
        </div>

        <div style="margin-top:18px;">
          <div style="font-weight:700; margin-bottom:8px;">For personalized guidance, contact:</div>
          <div class="contact">
            <div>Phone: ${escapeHtml(contact.phone || "—")}</div>
            <div>Email: ${escapeHtml(contact.email || "—")}</div>
            <div>Website: ${escapeHtml(contact.website || "—")}</div>
          </div>
        </div>
      </div>

      <div class="footer">
        Powered by RAD5 Tech Hub | Discover Your Digital DNA
      </div>
    </div>
  </body>
  </html>
  `;
}

// small helper to produce safe text fallback
export function buildPlainText(session: ReportSession) {
  const {
    name = "Candidate",
    gender = "N/A",
    date = new Date().toLocaleDateString(),
    timeTaken = 0,
    topSkill = "",
    percentages = {},
    contact = {
      phone: "+234 706 434 3189",
      email: "info@rad5.com.ng",
      website: "www.rad5.com.ng",
    },
  } = session;

  const skillsText = Object.entries(percentages)
    .map(([k, v]) => `${k}: ${v}%`)
    .join("\n");

  return [
    "RAD5 TechDNA Test",
    "Your Digital Career Path Report",
    "",
    `Name: ${name}`,
    `Gender: ${gender}`,
    `Test Duration: ${timeTaken} minute(s)`,
    `Date: ${date}`,
    "",
    "Your Results",
    skillsText,
    "",
    `Top Match: ${topSkill}`,
    "",
    "Recommendation:",
    session.recommendations?.[topSkill] ??
      `You have a strong natural alignment toward ${topSkill}.`,
    "",
    "For personalized guidance, contact:",
    `Phone: ${contact.phone}`,
    `Email: ${contact.email}`,
    `Website: ${contact.website}`,
    "",
    "Powered by RAD5 Tech Hub | Discover Your Digital DNA",
  ].join("\n");
}

// very small escape helper — keep minimal for email text insertion
function escapeHtml(s: string) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
