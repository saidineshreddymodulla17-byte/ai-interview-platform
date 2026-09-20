const express = require("express")

const {
  createInterview,
  getInterview,
  saveAnswer,
  evaluateInterview,
  getUserInterviews,
} = require("../controllers/interviewController")

const protect = require("../middleware/authMiddleware")

const router = express.Router()

// Create interview
router.post("/", protect, createInterview)

//get history of interviews
router.get("/", protect, getUserInterviews)

// Get interview
router.get("/:id", protect, getInterview)

// Save answer
router.post("/:id/answer", protect, saveAnswer)

// Evaluate interview
router.post("/:id/evaluate", protect, evaluateInterview)


module.exports = router