import jsPDF from "jspdf"

interface TestSession {
  name: string
  gender: string
  startTime: number
  answers: Record<number, number>
  results?: {
    scores: Record<string, number>
    percentages: Record<string, number>
    topSkill: string
    timeTaken: number
  }
}

export function generatePDF(session: TestSession) {
  if (!session.results) return

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

  const skills = ["Data Analytics", "Cybersecurity", "Web Development", "Product Design", "Digital Marketing"]

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

  // Top Skill
  yPosition += 10
  doc.setFontSize(12)
  doc.setTextColor(37, 64, 122)
  doc.text(`Top Match: ${session.results.topSkill}`, 20, yPosition)

  // Recommendation
  yPosition += 15
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)

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
  }

  const recommendation = recommendations[session.results.topSkill]
  const splitText = doc.splitTextToSize(recommendation, pageWidth - 40)
  doc.text(splitText, 20, yPosition)

  yPosition += splitText.length * 5 + 15

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

export async function generatePDFBlob(session: any): Promise<Blob> {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  doc.setFontSize(14);
  doc.text(`RAD5 TechDNA Report - ${session.name}`, 40, 50);
  // ... add rest of PDF content similar to your PDF generation logic
  // return blob:
  const blob = doc.output("blob");
  // optionally trigger download:
  // const url = URL.createObjectURL(blob); // download if needed
  // const a = document.createElement('a'); a.href = url; a.download = `RAD5_Report_${session.name}.pdf`; a.click();
  return blob;
}
