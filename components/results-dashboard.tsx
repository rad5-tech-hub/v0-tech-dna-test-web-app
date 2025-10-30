"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {Toaster,  toast } from "sonner"
import { Loader, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { generatePDF, generatePDFBlob } from "@/lib/pdf-export"


interface TestSession {
  name: string
  gender: string
  startTime: number
  email: string
  answers: Record<number, number>
  results?: {
    scores: Record<string, number>
    percentages: Record<string, number>
    topSkill: string
    timeTaken: number
  }
}

interface ResultsDashboardProps {
  session: TestSession
  onRetake: () => void
}

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"]
const SKILLS = ["Data Analytics", "Cybersecurity", "Web Development", "Product Design", "Digital Marketing"]

const RECOMMENDATIONS: Record<string, string> = {
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

export default function ResultsDashboard({ session, onRetake }: ResultsDashboardProps) {
  // UI state
  const [isVisible, setIsVisible] = useState(false)
  const [mailButtonLoading, setMailButtonLoading] = useState(false)
  const [mailError, setMailError] = useState<string | null>(null)
  // track mounted to avoid setState after unmount
  useEffect(() => {
    let mounted = true
    setIsVisible(true)
    return () => {
      mounted = false
      // no-op - we only use mounted in async callback below
    }
  }, [])

  // Derived data (memoized)
  const chartData = useMemo(() => {
    return SKILLS.map((skill) => ({
      name: skill,
      percentage: session.results?.percentages?.[skill] ?? 0,
    }))
  }, [session.results])

  const pieData = useMemo(() => chartData.filter((item) => item.percentage > 0), [chartData])

  const sortedSkills = useMemo(() => {
    return SKILLS.slice().sort((a, b) => {
      const pa = session.results?.percentages?.[a] ?? 0
      const pb = session.results?.percentages?.[b] ?? 0
      return pb - pa
    })
  }, [session.results])



  // helper: convert Blob/ArrayBuffer to base64
  async function blobToBase64(blob: Blob | ArrayBuffer): Promise<string> {
    if (blob instanceof ArrayBuffer) {
      // convert ArrayBuffer -> base64
      const bytes = new Uint8Array(blob);
      let binary = "";
      const chunk = 0x8000;
      for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
      }
      return btoa(binary);
    }

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string; // e.g. "data:application/pdf;base64,...."
        const base64 = dataUrl.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(blob as Blob);
    });
  }


  // Handle sending email report
  const handleEmailReport = useCallback(async () => {
    if (!session.email || !session.name) {
      toast.error("Missing recipient details");
      return;
    }

    setMailButtonLoading(true);

    try {
      // Step 1: Generate the PDF
      const pdfResult = await generatePDFBlob(session);
      const pdfBase64 = await blobToBase64(pdfResult);

      // Step 2: Build payload
      const payload = {
        session: {
          name: session.name,
          gender: session.gender,
          date: new Date().toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }),
          timeTaken: session.results?.timeTaken ?? 0,
          topSkill: session.results?.topSkill,
          percentages: session.results?.percentages ?? {},
          contact: {
            phone: "+234 706 434 3189",
            email: "info@rad5.com.ng",
            website: "www.rad5.com.ng",
          },
        },
        pdfBase64,
        pdfFilename: `RAD5_Report_${session.name.replace(/\s+/g, "_")}.pdf`,
        to: session.email,
      };

      // Step 3: Send mail request
      const toastId = toast.loading("Sending report...");

      const res = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("send-report failed", data);
        toast.error(data?.message || "Failed to send email", { id: toastId });
      } else {
        toast.success("Report sent successfully! 🎉", { id: toastId });
      }
    } catch (err: any) {
      console.error("Email send error", err);
      toast.error(err?.message ?? "Failed to send report");
    } finally {
      setMailButtonLoading(false);
    }
  }, [session]);




  if (!session.results) return null

  return (
    <>

      <div
        className={`min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-primary/10 rounded-lg p-3 mb-4 transform transition-transform duration-500 hover:scale-105">
              <div className="text-3xl font-bold text-primary">RAD5</div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Your TechDNA Result</h1>
            <p className="text-muted-foreground">Personalized Career Path Recommendation</p>
          </div>

          {/* User Info Card */}
          <Card className="shadow-lg mb-8 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="transform transition-transform duration-300 hover:scale-105">
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="text-lg font-semibold text-foreground">{session.name}</p>
                </div>
                <div className="transform transition-transform duration-300 hover:scale-105">
                  <p className="text-sm text-muted-foreground mb-1">Gender</p>
                  <p className="text-lg font-semibold text-foreground">{session.gender}</p>
                </div>
                <div className="transform transition-transform duration-300 hover:scale-105">
                  <p className="text-sm text-muted-foreground mb-1">Time Taken</p>
                  <p className="text-lg font-semibold text-foreground">{session.results.timeTaken} minute(s)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="gap-8 mb-8">
            {/* Bar Chart */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Skill Distribution</CardTitle>
                <CardDescription>Your scores across all digital skills</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="percentage" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 mt-7">
              <CardHeader>
                <CardTitle>Skill Breakdown</CardTitle>
                <CardDescription>Percentage composition of your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }: any) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Scores */}
          <Card className="shadow-lg mb-8 hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Detailed Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedSkills.map((skill) => {
                  const percent = session.results?.percentages?.[skill] ?? 0
                  return (
                    <div key={skill} className="transform transition-transform duration-300 hover:scale-102">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-foreground">{skill}</span>
                        <span className="text-primary font-semibold">{percent}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary rounded-full h-2 transition-all duration-1000 ease-out"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recommendation */}
          <Card className="shadow-lg mb-8 border-primary/20 bg-primary/5 hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-primary">Your Top Match: {session.results.topSkill}</CardTitle>
              <CardDescription>Personalized Recommendation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{RECOMMENDATIONS[session.results.topSkill]}</p>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="shadow-lg mb-8 bg-secondary/5 border-secondary/20 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-3">For personalized guidance, contact:</p>
              <div className="space-y-2">
                <p className="text-foreground">
                  <span className="font-semibold">Phone:</span> +234 706 434 3189
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">Email:</span> info@rad5.com.ng
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">Website:</span> www.rad5.com.ng
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Powered by RAD5 Tech Hub | Discover Your Digital DNA</p>
            </CardContent>
          </Card>

          {/* Actions */}
         <div className="flex flex-col md:flex-row gap-3 w-full mx-auto">
  <Button
    onClick={() => generatePDF(session)}
    className="w-full md:flex-1 py-4 text-base bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200 transform hover:scale-105"
    size="lg"
  >
    Download PDF Report
  </Button>

  {session.email && (
    <Button
      onClick={handleEmailReport}
      variant="outline"
      disabled={mailButtonLoading}
      className="w-full md:flex-1 py-4 text-base bg-transparent transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
      size="lg"
      aria-busy={mailButtonLoading}
    >
      {mailButtonLoading ? <Loader className="animate-spin h-4 w-4" /> : <Mail className="h-4 w-4" />}
      <span>{mailButtonLoading ? "Sending..." : "Email Report"}</span>
    </Button>
  )}

  <Button
    onClick={onRetake}
    variant="outline"
    className="w-full md:flex-1 py-4 text-base bg-transparent transition-all duration-200 transform hover:scale-105"
    size="lg"
  >
    Retake Test
  </Button>
</div>


          {mailError && <p className="mt-3 text-sm text-destructive">{mailError}</p>}
        </div>
      </div>
      <Toaster position="top-right"/>
    </>
  )
}
