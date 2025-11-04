// app/api/save-report/route.ts
import { google } from "googleapis";
import { NextResponse } from "next/server";

function quoteSheetName(name: string) {
  const escaped = name.replace(/'/g, "''");
  return `'${escaped}'`;
}

export async function POST(req: Request) {
  try {
    const { session } = await req.json();
    if (!session?.name) {
      return NextResponse.json({ ok: false, message: "Missing session payload or session.name" }, { status: 400 });
    }

    const saBase64 = process.env.GCP_SA_KEY_BASE64;
    const spreadsheetId = process.env.SHEET_ID;
    const envSheetName = process.env.SHEET_NAME;

    if (!saBase64) {
      return NextResponse.json({ ok: false, message: "Missing GCP_SA_KEY_BASE64 env var" }, { status: 500 });
    }
    if (!spreadsheetId) {
      return NextResponse.json({ ok: false, message: "Missing SHEET_ID env var" }, { status: 500 });
    }

    // Decode service account JSON
    let saJson;
    try {
      saJson = JSON.parse(Buffer.from(saBase64, "base64").toString("utf8"));
    } catch (e) {
      console.error("Failed to parse service account JSON:", e);
      return NextResponse.json({ ok: false, message: "Invalid GCP_SA_KEY_BASE64 value" }, { status: 500 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: saJson,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Get spreadsheet metadata
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetTabs = meta.data.sheets?.map((s) => s.properties?.title).filter(Boolean) as string[] || [];

    // Decide which sheet/tab to use
    let sheetName = envSheetName || sheetTabs[0] || "Sheet1";
    if (!sheetTabs.includes(sheetName)) {
      console.warn(`Configured sheet name "${sheetName}" not found. Available tabs:`, sheetTabs);
      sheetName = sheetTabs[0] ?? sheetName;
    }

    // Map payload keys to sheet column names
    const skillKeyMap: { [key: string]: string } = {
      "Data Analytics": "DATA ANALYTICS",
      "Cybersecurity": "CYBERSECURITY",
      "Web Development": "WEB DEVELOPMENT",
      "Product Design": "PRODUCT DESIGN",
      "Digital Marketing": "DIGITAL MARKETING",
    };

    // Prepare row data
    const percentages = session.percentages ?? {};
    const intendedTrack = session?.intendedTrack || ""
    const phone = session?.phone || ""
    const row = [
      new Date(session.date ?? Date.now()).toLocaleString(), // A: TIME
      session.name ?? "",                                    // B: NAME
      session.email ?? "",                                   // C: EMAIL
      session.gender ?? "",                                  // D: GENDER
      session.topSkill ?? "",                                // E: TOP SKILL
      session.timeTaken ?? "",                               // F: TIME TAKEN
      percentages[skillKeyMap["Data Analytics"]] ?? percentages["Data Analytics"] ?? "", // G: DATA ANALYTICS
      percentages[skillKeyMap["Cybersecurity"]] ?? percentages["Cybersecurity"] ?? "",   // H: CYBERSECURITY
      percentages[skillKeyMap["Web Development"]] ?? percentages["Web Development"] ?? "", // I: WEB DEVELOPMENT
      percentages[skillKeyMap["Product Design"]] ?? percentages["Product Design"] ?? "",  // J: PRODUCT DESIGN
      percentages[skillKeyMap["Digital Marketing"]] ?? percentages["Digital Marketing"] ?? "", // K: DIGITAL MARKETING
      intendedTrack || "",   // L : INTENDED TRACK
      phone   // M : Phone Number
    ]; 

    // Log payload for debugging
    console.log("Session payload:", JSON.stringify(session, null, 2));
    console.log("Row data:", row);

    // Build range for all columns
    const quotedSheet = quoteSheetName(sheetName);
    const range = `${quotedSheet}!A:K`;

    // Append row
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ ok: true, message: "Report saved successfully", session });
  } catch (err: any) {
    console.error("Error saving report:", err);
    const message = err?.message ?? String(err);
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}