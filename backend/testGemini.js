require("dotenv").config()

const {
  generateInterviewQuestions,
} = require("./services/geminiService")

const testGemini = async () => {
  try {
    const questions = await generateInterviewQuestions(
      ["React", "JavaScript"],
      "Medium",
      "Technical"
    )

    console.log("Generated Questions:")
    console.log(questions)
  } catch (error) {
    console.error("Gemini Error:")
    console.error(error.message)
  }
}

testGemini()