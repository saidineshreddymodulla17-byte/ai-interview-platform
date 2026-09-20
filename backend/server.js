const express = require("express")
const cors = require("cors")
require("dotenv").config()

const protect = require("./middleware/authMiddleware")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const interviewRoutes = require("./routes/interviewRoutes")

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/interviews", interviewRoutes)
// Protected test route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user,
  })
})

// Test route
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend is working",
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})