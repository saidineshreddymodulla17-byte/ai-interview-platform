const mongoose = require("mongoose")

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: {
      type: [String],
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    interviewType: {
      type: String,
      required: true,
    },

    questions: {
      type: [String],
      default: [],
    },

    answers: {
      type: [String],
      default: [],
    },

    evaluations: {
      type: [
        {
          score: {
            type: Number,
            min: 0,
            max: 10,
          },

          feedback: {
            type: String,
          },

          strengths: {
            type: [String],
            default: [],
          },

          improvements: {
            type: [String],
            default: [],
          },
        },
      ],
      default: [],
    },

    score: {
      type: Number,
      default: null,
    },

    status: {
      type: String,
      enum: ["created", "in-progress", "completed"],
      default: "created",
    },
  },
  {
    timestamps: true,
  }
)

const Interview = mongoose.model("Interview", interviewSchema)

module.exports = Interview