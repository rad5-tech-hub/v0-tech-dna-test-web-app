"use client"

import { useState } from "react"
import OnboardingFlow from "@/components/onboarding-flow"
import QuestionEngine from "@/components/question-engine"
import ResultsDashboard from "@/components/results-dashboard"
import { Toaster, toast } from "sonner"
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes"
type AppState = "onboarding" | "test" | "results"

export interface TestSession {
  name: string
  gender: string
  startTime: number
  email: string
  answers: Record<number, number>,
  intendedTrack?:string,
  results?: {
    scores: Record<string, number>
    percentages: Record<string, number>
    topSkill: string
    timeTaken?: number
  }
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>("onboarding")
  const [session, setSession] = useState<TestSession | null>(null)

  const handleOnboardingComplete = (name: string, gender: string, email: string,intendedTrack?:string) => {
    setSession({
      name,
      gender,
      email,
      intendedTrack,
      startTime: Date.now(),
      answers: {},
    })
    setAppState("test")
  }

  // helper that sends the final session to your server which appends to Google Sheets
  async function saveReportToSheets(finalSession: TestSession) {
    const payload = {
      session: {
        // keep payload minimal and serializable
        name: finalSession.name,
        gender: finalSession.gender,
        email: finalSession.email ?? "",
        date: new Date().toISOString(),
        timeTaken: finalSession.results?.timeTaken ?? null,
        intendedTrack:finalSession.intendedTrack,
        topSkill: finalSession.results?.topSkill ?? "",
        percentages: finalSession.results?.percentages ?? {},
        testId: finalSession.startTime ?? Date.now(), // idempotency key
      },
    }

    const res = await fetch("/api/save-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data?.message || "Failed to save report")
    return data
  }

  const handleTestComplete = async (answers: Record<number, number>, results: any) => {
    if (!session) return

    // create a new session object with answers + results (avoid mutating state)
    const finalSession: TestSession = {
      ...session,
      answers,
      results,
    }

    // update UI state immediately so user sees results
    setSession(finalSession)
    setAppState("results")

    // Now persist to Google Sheets (fire & await, but we already navigated to results)
    // const toastId = toast.loading("Saving report to Google Sheets...")

    try {
      try {
        await saveReportToSheets(finalSession)
      } catch (err) {
        // one quick retry
        console.warn("First save attempt failed, retrying once...", err)
        await saveReportToSheets(finalSession)
      }
      // toast.success("Report saved to Google Sheets ✅", { id: toastId })
    } catch (err: any) {
      console.error("Failed saving report to sheets:", err)
      // toast.error("Failed to save report to Google Sheets. It will be retried.", { id: toastId })
      // Optionally: enqueue retry logic (localStorage / background worker) — left as an improvement
    }
  }

  const handleRetakeTest = () => {
    setAppState("onboarding")
    setSession(null)
  }

  return (
    <>
    <Theme accentColor="blue">
    <main className="min-h-screen bg-background">
      {appState === "onboarding" && <OnboardingFlow onComplete={handleOnboardingComplete} />}
      {appState === "test" && session && <QuestionEngine session={session} onComplete={handleTestComplete} />}
      {appState === "results" && session && session.results && (
        <ResultsDashboard session={session} onRetake={handleRetakeTest} />
      )}
      <Toaster position="top-right" />
    </main>
    </Theme>
    </>
  )
}
