import type { QUESTIONS } from "./questions"

export function calculateScores(selectedQuestions: typeof QUESTIONS, answers: Record<number, number>) {
  const skills = ["Data Analytics", "Cybersecurity", "Web Development", "Product Design", "Digital Marketing"]
  const scores: Record<string, number> = {}

  // Initialize scores
  skills.forEach((skill) => {
    scores[skill] = 0
  })

  // Calculate scores based on answers
  selectedQuestions.forEach((question) => {
    const answerIndex = answers[question.question_id]
    if (answerIndex !== undefined) {
      skills.forEach((skill) => {
        const weights = question.weights[skill as keyof typeof question.weights]
        if (weights && weights[answerIndex] !== undefined) {
          scores[skill] += weights[answerIndex]
        }
      })
    }
  })

  // Calculate total and percentages
  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  const percentages: Record<string, number> = {}

  skills.forEach((skill) => {
    percentages[skill] = total > 0 ? Math.round((scores[skill] / total) * 100) : 0
  })

  // Find top skill
  const topSkill = skills.reduce((prev, current) => (percentages[current] > percentages[prev] ? current : prev))

  return {
    scores,
    percentages,
    topSkill,
  }
}
