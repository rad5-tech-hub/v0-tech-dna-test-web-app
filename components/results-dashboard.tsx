"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { generatePDF } from "@/lib/pdf-export"

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
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (!session.results) return null

  const chartData = SKILLS.map((skill) => ({
    name: skill,
    percentage: session.results!.percentages[skill] || 0,
  }))

  const pieData = chartData.filter((item) => item.percentage > 0)

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
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
                <p className="text-lg font-semibold text-foreground">{session.results.timeTaken} minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
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
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
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
              {SKILLS.map((skill, index) => (
                <div key={skill} className="transform transition-transform duration-300 hover:scale-102">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-foreground">{skill}</span>
                    <span className="text-primary font-semibold">{session.results!.percentages[skill] || 0}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary rounded-full h-2 transition-all duration-1000 ease-out"
                      style={{ width: `${session.results!.percentages[skill] || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
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
        <div className="flex gap-3">
          <Button
            onClick={() => generatePDF(session)}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            Download PDF Report
          </Button>
          <Button
            onClick={onRetake}
            variant="outline"
            className="flex-1 bg-transparent transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            Retake Test
          </Button>
        </div>
      </div>
    </div>
  )
}
