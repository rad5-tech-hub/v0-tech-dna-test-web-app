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

  // Calculate scores
  selectedQuestions.forEach((question) => {
    const answerIndices = answers[question.question_id] || []
    skills.forEach((skill) => {
      const weights = question.weights[skill as keyof typeof question.weights]
      if (weights && answerIndices.length > 0) {
        answerIndices.forEach(idx => {
          if (weights[idx] !== undefined) {
            scores[skill] += weights[idx]
          }
        })
      }
    })
  })

  // Percentage Recommendation Logic
  // Career Score ÷ Highest Career Score × 100
  const highestScore = Math.max(...Object.values(scores), 1);
  const percentages: Record<string, number> = {}

  skills.forEach((skill) => {
    percentages[skill] = Math.round((scores[skill] / highestScore) * 100)
  })

  // Get top 3
  const sortedResults = skills
    .map(skill => ({ name: skill, percentage: percentages[skill], score: scores[skill] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  return {
    scores,
    percentages,
    topSkill: sortedResults[0].name,
    topMatches: sortedResults
  }
}
