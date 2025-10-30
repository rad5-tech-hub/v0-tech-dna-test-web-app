"use client"

import { useState } from "react"
import OnboardingFlow from "@/components/onboarding-flow"
import QuestionEngine from "@/components/question-engine"
import ResultsDashboard from "@/components/results-dashboard"
import { Toaster, toast } from "sonner"

type AppState = "onboarding" | "test" | "results"

export interface TestSession {
  name: string
  gender: string
  startTime: number
  email: string
  answers: Record<number, number>
  results?: {
    scores: Record<string, number>
    percentages: Record<string, number>
    topSkill: string
  }
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>("onboarding")
  const [session, setSession] = useState<TestSession | null>(null)

  const handleOnboardingComplete = (name: string, gender: string, email: string) => {
    setSession({
      name,
      gender,
      email,
      startTime: Date.now(),
      answers: {},
    })
    setAppState("test")
  }

  const handleTestComplete = (answers: Record<number, number>, results: any) => {
    if (session) {
      setSession({
        ...session,
        answers,
        results,
      })
      setAppState("results")
    }
  }

  const handleRetakeTest = () => {
    setAppState("onboarding")
    setSession(null)
  }

  return (
    <main className="min-h-screen bg-background">
      {appState === "onboarding" && <OnboardingFlow onComplete={handleOnboardingComplete} />}
      {appState === "test" && session && <QuestionEngine session={session} onComplete={handleTestComplete} />}
      {appState === "results" && session && session.results && (
        <ResultsDashboard session={session} onRetake={handleRetakeTest} />
      )}
      <Toaster
        position="top-right"

      />
    </main>
  )
}
