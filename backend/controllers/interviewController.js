const Interview = require("../models/Interview")

const {
  generateInterviewQuestions,
  evaluateInterviewAnswers,
} = require("../services/geminiService")


// Create a new interview
const createInterview = async (req, res) => {
  try {
    const { topic, difficulty, interviewType } = req.body

    if (!topic || topic.length === 0 || !difficulty || !interviewType) {
      return res.status(400).json({
        message: "Topic, difficulty and interview type are required",
      })
    }

    const questions = await generateInterviewQuestions(
      topic,
      difficulty,
      interviewType
    )

    console.log("Generated questions:", questions)

    const interview = await Interview.create({
      user: req.user.id,
      topic,
      difficulty,
      interviewType,
      questions,
    })

    res.status(201).json({
      message: "Interview created successfully",
      interview,
    })
  } catch (error) {
    console.error("Interview creation error:", error)

    res.status(500).json({
      message: "Server error",
    })
  }
}


// Get a single interview
const getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      })
    }

    if (interview.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to access this interview",
      })
    }

    res.status(200).json({
      interview,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server error",
    })
  }
}


// Save an answer
const saveAnswer = async (req, res) => {
  try {
    const { answer } = req.body

    if (!answer || !answer.trim()) {
      return res.status(400).json({
        message: "Answer is required",
      })
    }

    const interview = await Interview.findById(req.params.id)

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      })
    }

    if (interview.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to access this interview",
      })
    }

    interview.answers.push(answer)
    interview.status = "in-progress"

    await interview.save()

    res.status(200).json({
      message: "Answer saved successfully",
      interview,
    })
  } catch (error) {
    console.error("Save answer error:", error)

    res.status(500).json({
      message: "Server error",
    })
  }
}


// Evaluate interview
const evaluateInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      })
    }

    if (interview.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to evaluate this interview",
      })
    }

    if (interview.answers.length !== interview.questions.length) {
      return res.status(400).json({
        message: "All questions must be answered before evaluation",
      })
    }

    const evaluations = await evaluateInterviewAnswers(
      interview.questions,
      interview.answers,
      interview.difficulty,
      interview.interviewType
    )

    const totalScore = evaluations.reduce(
      (sum, evaluation) => sum + evaluation.score,
      0
    )

    const overallScore =
      Math.round((totalScore / evaluations.length) * 10) / 10

    interview.evaluations = evaluations
    interview.score = overallScore
    interview.status = "completed"

    await interview.save()

    res.status(200).json({
      message: "Interview evaluated successfully",
      interview,
    })
  } catch (error) {
    console.error("Interview evaluation error:", error)

    res.status(500).json({
      message: "Failed to evaluate interview",
    })
  }
}
// Get all interviews for the logged-in user
const getUserInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user.id,
    }).sort({ createdAt: -1 })

    res.status(200).json({
      interviews,
    })
  } catch (error) {
    console.error("Get interviews error:", error)

    res.status(500).json({
      message: "Failed to fetch interviews",
    })
  }
}


module.exports = {
  createInterview,
  getInterview,
  saveAnswer,
  evaluateInterview,
  getUserInterviews
}