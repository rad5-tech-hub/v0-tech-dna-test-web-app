import { questionsTests as QUESTIONS } from "./test"

export function calculateScores(selectedQuestions: typeof QUESTIONS, answers: Record<number, number[]>) {
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
  
  const scores: Record<string, number> = {}

  // Initialize scores
  skills.forEach((skill) => {
    scores[skill] = 0
  })

  // Calculate earned scores
  selectedQuestions.forEach((question) => {
    const answerIndices = answers[question.question_id] || []
    skills.forEach((skill) => {
      const weights = question.weights[skill as keyof typeof question.weights]

      if (weights) {
        answerIndices.forEach(idx => {
          if (weights[idx] !== undefined) {
            scores[skill] += weights[idx]
          }
        })
      }
    })
  })

  // Percentage Recommendation Logic: Distributed across total points
  const totalScore = Object.values(scores).reduce((acc, curr) => acc + curr, 0)
  const percentages: Record<string, number> = {}

  skills.forEach((skill) => {
    percentages[skill] = totalScore > 0 
      ? Math.round((scores[skill] / totalScore) * 100) 
      : 0
  })

  // Get top 3
  const sortedResults = skills
    .map(skill => ({ name: skill, percentage: percentages[skill], score: scores[skill] }))
    .sort((a, b) => b.percentage - a.percentage) // Sort by percentage, not raw score
    .slice(0, 3)

  return {
    scores,
    percentages,
    topSkill: sortedResults[0].name,
    topMatches: sortedResults
  }
}
