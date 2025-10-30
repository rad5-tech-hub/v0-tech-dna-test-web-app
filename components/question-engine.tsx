"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
// import { QUESTIONS } from "@/lib/questions"
import { questionsTests as QUESTIONS } from "@/lib/test"
import { calculateScores } from "@/lib/scoring"

interface TestSession {
  name: string
  gender: string
  startTime: number
  answers: Record<number, number>
}

interface QuestionEngineProps {
  session: TestSession
  onComplete: (answers: Record<number, number>, results: any) => void
}

export default function QuestionEngine({ session, onComplete }: QuestionEngineProps) {
  const [selectedQuestions, setSelectedQuestions] = useState<typeof QUESTIONS>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Shuffle and select 50 random questions
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5)
    setSelectedQuestions(shuffled.slice(0, 1))
    setIsLoading(false)
  }, [])

  const currentQuestion = selectedQuestions[currentIndex]
  const progress = ((currentIndex + 1) / selectedQuestions.length) * 100

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.question_id]: answerIndex,
    }
    setAnswers(newAnswers)

    if (currentIndex < selectedQuestions.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1)
        setIsTransitioning(false)
      }, 300)
    } else {
      // Test complete
      const results = calculateScores(selectedQuestions, newAnswers)
      const timeTaken = Math.round((Date.now() - session.startTime) / 60000)
      onComplete(newAnswers, { ...results, timeTaken })
    }
  }

  if (isLoading || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-muted-foreground">
              Question {currentIndex + 1} of {selectedQuestions.length}
            </div>
            <div className="text-sm font-medium text-primary">{Math.round(progress)}%</div>
          </div>
          <Progress value={progress} className="h-2 transition-all duration-500" />
        </div>

        {/* Question Card */}
        <Card
          className={`shadow-lg mb-8 transition-all duration-300 transform ${isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}
        >
          <CardHeader>
            <CardTitle className="text-2xl leading-relaxed">{currentQuestion.text}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 transform hover:scale-102 ${
                  answers[currentQuestion.question_id] === index
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      answers[currentQuestion.question_id] === index ? "border-primary bg-primary" : "border-border"
                    }`}
                  >
                    {answers[currentQuestion.question_id] === index && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium text-foreground">{answer}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            onClick={() => {
              setIsTransitioning(true)
              setTimeout(() => {
                setCurrentIndex(Math.max(0, currentIndex - 1))
                setIsTransitioning(false)
              }, 300)
            }}
            disabled={currentIndex === 0}
            variant="outline"
            className="flex-1 transition-all duration-200 hover:scale-105"
          >
            Previous
          </Button>
          <Button
            onClick={() => handleAnswer(answers[currentQuestion.question_id] ?? -1)}
            disabled={answers[currentQuestion.question_id] === undefined}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 disabled:scale-100"
          >
            {currentIndex === selectedQuestions.length - 1 ? "Complete Test" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}
