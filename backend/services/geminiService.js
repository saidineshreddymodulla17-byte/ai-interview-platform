const { GoogleGenAI } = require("@google/genai")

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

// Generate interview questions
const generateInterviewQuestions = async (
  topic,
  difficulty,
  interviewType
) => {
  const prompt = `
Generate 5 interview questions.

Topics: ${topic.join(", ")}
Difficulty: ${difficulty}
Interview Type: ${interviewType}

Return only the questions as a JSON array of strings.

Example:
[
  "What is the Virtual DOM?",
  "What is the difference between state and props?"
]
`

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  })

  const text = response.text

  const questions = JSON.parse(text)

  return questions
}


// Evaluate interview answers
const evaluateInterviewAnswers = async (
  questions,
  answers,
  difficulty,
  interviewType
) => {
  const prompt = `
You are an AI technical interviewer.

Evaluate the candidate's answers to the interview questions.

Difficulty: ${difficulty}
Interview Type: ${interviewType}

Questions:
${questions.map((question, index) => `${index + 1}. ${question}`).join("\n")}

Candidate Answers:
${answers.map((answer, index) => `${index + 1}. ${answer}`).join("\n")}

For each question, evaluate the corresponding answer.

Give each answer a score from 0 to 10.

Consider:
- Technical correctness
- Understanding of the concept
- Completeness
- Clarity
- Relevance

Return ONLY valid JSON in this exact format:

{
  "evaluations": [
    {
      "score": 8,
      "feedback": "Good explanation of the concept.",
      "strengths": [
        "Correct understanding",
        "Clear explanation"
      ],
      "improvements": [
        "Mention an example",
        "Explain the concept in more detail"
      ]
    }
  ]
}

There must be exactly ${questions.length} evaluation objects.
Do not include markdown.
Do not include any text outside the JSON.
`

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  })

  const text = response.text

  const result = JSON.parse(text)

  return result.evaluations
}


module.exports = {
  generateInterviewQuestions,
  evaluateInterviewAnswers,
}