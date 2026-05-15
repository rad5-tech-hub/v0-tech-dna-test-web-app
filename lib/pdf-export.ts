import jsPDF from "jspdf"

interface TestSession {
  name: string
  gender: string
  startTime: number
  answers: Record<number, number[]>
  results?: {
    scores: Record<string, number>
    percentages: Record<string, number>
    topSkill: string
    timeTaken: number,
    topMatches: { name: string; percentage: number; score: number }[]
  }
}

export function generatePDF(session: TestSession) {
  if (!session.results) return
  
  const topMatches = session.results.topMatches;
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  let yPosition = 20

  // Header
  doc.setFontSize(24)
  doc.setTextColor(37, 64, 122) // Primary color
  doc.text("RAD5 TechDNA Test", pageWidth / 2, yPosition, { align: "center" })

  yPosition += 15
  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  doc.text("Your Digital Career Path Report", pageWidth / 2, yPosition, { align: "center" })

  // User Info
  yPosition += 20
  doc.setFontSize(11)
  doc.setTextColor(0, 0, 0)
  doc.text(`Name: ${session.name}`, 20, yPosition)
  yPosition += 8
  doc.text(`Gender: ${session.gender}`, 20, yPosition)
  yPosition += 8
  doc.text(`Test Duration: ${session.results.timeTaken} minutes`, 20, yPosition)
  yPosition += 8
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPosition)

  // Results Section
  yPosition += 15
  doc.setFontSize(14)
  doc.setTextColor(37, 64, 122)
  doc.text("Your Results", 20, yPosition)

  yPosition += 12
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  
  const skills = [
    "Product Design", 
    "Frontend Development", 
    "Backend Development", 
    "Data Analytics", 
    "Digital Marketing", 
    "Cybersecurity", 
    "Graphics Design", 
    "Video Editing", 
    "Content Creation", 
    "Product Management", 
    "Technical Writing"
  ]

  skills.forEach((skill) => {
    const percentage = session.results!.percentages[skill] || 0
    doc.text(`${skill}: ${percentage}%`, 20, yPosition)

    // Draw progress bar
    const barWidth = 100
    const barHeight = 4
    doc.setDrawColor(200, 200, 200)
    doc.rect(120, yPosition - 3, barWidth, barHeight)

    doc.setFillColor(37, 64, 122)
    doc.rect(120, yPosition - 3, (barWidth * percentage) / 100, barHeight, "F")

    yPosition += 10
  })

  // Top Matches Detail
  yPosition += 10
  doc.setFontSize(14)
  doc.setTextColor(37, 64, 122)
  doc.text("Top Recommendations", 20, yPosition)

  // Recommendation
  yPosition += 15
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)

  const recommendations: Record<string, string> = {
    "Product Design": "You have a natural gift for user-centric thinking and creative vision. You enjoy balancing aesthetics with functionality to make products simpler and more beautiful.",
    "Frontend Development": "You enjoy the logic of code combined with visual creativity. You are a 'digital builder' who likes bringing designs to life for users to interact with.",
    "Backend Development": "You thrive on solving difficult challenges and understanding how systems work 'under the hood.' You have the persistence needed to build the brain of an application.",
    "Data Analytics": "You are a digital detective. You find joy in discovering hidden patterns within numbers and transforming information into useful insights for smart decision-making.",
    "Digital Marketing": "You are a communicator and a strategist. You enjoy social media and have a natural instinct for getting the right message to the right audience to help brands grow.",
    "Cybersecurity": "You have a 'security thinking' mindset. You are protective and analytical, making you excellent at defending systems from hackers and investigating problems.",
    "Graphics Design": "Your eye for color and layout is your superpower. You enjoy expressing ideas visually and creating designs that leave a lasting impression.",
    "Video Editing": "You have a talent for storytelling through motion. You enjoy the creative process of editing and producing videos that capture people's attention.",
    "Content Creation": "You are naturally expressive and thrive on social engagement. You enjoy learning random interesting things and sharing them with an audience online.",
    "Product Management": "You are a leader and an organizer. You enjoy talking to people, organizing operations, and ensuring that businesses and products run smoothly.",
    "Technical Writing": "You excel at explaining complex things simply. Your attention to detail and structured thinking make you perfect for creating useful documentation and guides."
  }

  topMatches.forEach((match, idx) => {
    doc.setFontSize(11);
    doc.text(`${idx + 1}. ${match.name} (${match.percentage}%)`, 20, yPosition);
    yPosition += 7;
    doc.setFontSize(9);
    const splitText = doc.splitTextToSize(recommendations[match.name], pageWidth - 40);
    doc.text(splitText, 20, yPosition);
    yPosition += (splitText.length * 5) + 10;
  });

  // Contact Info
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text("For personalized guidance, contact:", 20, yPosition)
  yPosition += 8
  doc.text("Phone: +234 706 434 3189", 20, yPosition)
  yPosition += 6
  doc.text("Email: info@rad5.com.ng", 20, yPosition)
  yPosition += 6
  doc.text("Website: www.rad5.com.ng", 20, yPosition)

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.text("Powered by RAD5 Tech Hub | Discover Your Digital DNA", pageWidth / 2, pageHeight - 10, { align: "center" })

  // Save PDF
  doc.save(`RAD5_TechDNA_Report_${session.name.replace(/\s+/g, "_")}.pdf`)
}


// lib/pdf-export.ts (client-side)

/**
 * Generate a PDF Blob for the given session.
 * Returns a Blob which you can:
 *  - convert to base64 and POST to server,
 *  - createObjectURL to preview,
 *  - or trigger a download if you want.
 */
export async function generatePDFBlob(session: TestSession): Promise<Blob> {
  if (!session.results) throw new Error("Session results missing");

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Header
  doc.setFontSize(24);
  doc.setTextColor(37, 64, 122); // Primary color
  doc.text("RAD5 TechDNA Test", pageWidth / 2, yPosition, { align: "center" });

  yPosition += 15;
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("Your Digital Career Path Report", pageWidth / 2, yPosition, { align: "center" });

  // User Info
  yPosition += 20;
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(`Name: ${session.name}`, 20, yPosition);
  yPosition += 12;
  doc.text(`Gender: ${session.gender}`, 20, yPosition);
  yPosition += 12;
  doc.text(`Test Duration: ${session.results.timeTaken} minutes`, 20, yPosition);
  yPosition += 12;
  doc.text(`Date: ${new Date().toLocaleString()}`, 20, yPosition);

  // Results Section
  yPosition += 22;
  doc.setFontSize(14);
  doc.setTextColor(37, 64, 122);
  doc.text("Your Results", 20, yPosition);

  yPosition += 14;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  const skills = ["Data Analytics", "Cybersecurity", "Web Development", "Product Design", "Digital Marketing"];
  const percentages = session.results.percentages ?? {};

  for (const skill of skills) {
    // new page handling
    if (yPosition > pageHeight - 120) {
      doc.addPage();
      yPosition = 40;
    }

    const percentage = percentages[skill] ?? 0;
    doc.text(`${skill}: ${percentage}%`, 20, yPosition);

    // Draw progress bar
    const barX = 120;
    const barWidth = 220; // wider for readability on A4
    const barHeight = 6;
    doc.setDrawColor(200, 200, 200);
    doc.rect(barX, yPosition - 6, barWidth, barHeight);

    doc.setFillColor(37, 64, 122);
    const fillWidth = (barWidth * Math.max(0, Math.min(100, percentage))) / 100;
    if (fillWidth > 0) doc.rect(barX, yPosition - 6, fillWidth, barHeight, "F");

    yPosition += 18;
  }

  // Top Skill
  if (yPosition > pageHeight - 120) {
    doc.addPage();
    yPosition = 40;
  }
  yPosition += 6;
  doc.setFontSize(12);
  doc.setTextColor(37, 64, 122);
  doc.text(`Top Match: ${session.results.topSkill}`, 20, yPosition);

  // Recommendation
  yPosition += 18;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  const recommendations: Record<string, string> = {
    "Data Analytics":
      "You have a strong natural alignment toward Data Analytics due to your analytical mindset, attention to detail, and ability to find patterns in complex information. Consider exploring foundational data science and business intelligence learning paths.",
    Cybersecurity:
      "You have a strong natural alignment toward Cybersecurity due to your analytical mindset, love for structure, and desire to protect systems and information. Consider exploring foundational cybersecurity learning paths.",
    "Web Development":
      "You have a strong natural alignment toward Web Development due to your creative problem-solving skills, attention to user experience, and technical curiosity. Consider exploring full-stack development frameworks and modern web technologies.",
    "Product Design":
      "You have a strong natural alignment toward Product Design due to your user-centric thinking, creative vision, and ability to balance aesthetics with functionality. Consider exploring UX/UI design principles and prototyping tools.",
    "Digital Marketing":
      "You have a strong natural alignment toward Digital Marketing due to your communication skills, strategic thinking, and ability to understand audience behavior. Consider exploring digital marketing strategies and analytics platforms.",
  };

  const recommendation = recommendations[session.results.topSkill] ?? "";
  const splitText = doc.splitTextToSize(recommendation, pageWidth - 40);
  doc.text(splitText, 20, yPosition);

  yPosition += (splitText.length * 12) + 12;

  // Contact Info
  if (yPosition > pageHeight - 120) {
    doc.addPage();
    yPosition = 40;
  }
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("For personalized guidance, contact:", 20, yPosition);
  yPosition += 12;
  doc.text("Phone: +234 706 434 3189", 20, yPosition);
  yPosition += 12;
  doc.text("Email: info@rad5.com.ng", 20, yPosition);
  yPosition += 12;
  doc.text("Website: www.rad5.com.ng", 20, yPosition);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Powered by RAD5 Tech Hub | Discover Your Digital DNA", pageWidth / 2, pageHeight - 10, { align: "center" });

  // Return Blob instead of saving (so caller can upload/attach)
  const blob = doc.output("blob");
  return blob;
}
