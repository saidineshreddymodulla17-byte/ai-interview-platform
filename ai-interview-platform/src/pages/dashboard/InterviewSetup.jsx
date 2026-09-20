import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

import DashboardLayout from "../../components/layout/DashboardLayout"

function InterviewSetup() {
  const navigate = useNavigate()

  const [role, setRole] = useState("Frontend Developer")
  const [difficulty, setDifficulty] = useState("Medium")
  const [interviewType, setInterviewType] = useState("Technical")
  const [selectedTopics, setSelectedTopics] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const topics = [
    "JavaScript",
    "React",
    "Node.js",
    "DBMS",
    "Operating Systems",
    "System Design",
  ]

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(
        selectedTopics.filter((item) => item !== topic)
      )
    } else {
      setSelectedTopics([...selectedTopics, topic])
    }

    setError("")
  }

  const handleStartInterview = async () => {
    if (selectedTopics.length === 0) {
      setError("Please select at least one topic.")
      return
    }

    try {
      setLoading(true)
      setError("")

      const token = localStorage.getItem("token")

      const response = await fetch(
        "http://localhost:5000/api/interviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            topic: selectedTopics,
            difficulty,
            interviewType,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create interview"
        )
      }

      navigate(`/interview/${data.interview._id}`)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Create Your Interview
        </h1>

        <p className="mt-2 text-slate-400">
          Customize your interview session based on your goals.
        </p>
      </div>

      {/* Setup Container */}
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">

        <h2 className="text-xl font-semibold text-white">
          Interview Configuration
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Select your preferences before starting the interview.
        </p>

        <div className="mt-8 space-y-8">

          {/* Role Selection */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Select Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
            >
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
              <option>Software Engineer</option>
              <option>Data Analyst</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Select Difficulty
            </label>

            <div className="mt-3 grid grid-cols-3 gap-4">
              {["Easy", "Medium", "Hard"].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    difficulty === level
                      ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                      : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Interview Type */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Interview Type
            </label>

            <div className="mt-3 grid grid-cols-3 gap-4">
              {["Technical", "HR", "Mixed"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setInterviewType(type)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    interviewType === type
                      ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                      : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Select Topics
            </label>

            <p className="mt-1 text-sm text-slate-500">
              Choose the topics you want to be asked about.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {topics.map((topic) => {
                const isSelected = selectedTopics.includes(topic)

                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => toggleTopic(topic)}
                    className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                        : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {isSelected ? "✓ " : ""}
                    {topic}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Start Interview */}
          <div className="flex justify-end border-t border-slate-800 pt-6">
            <button
              type="button"
              onClick={handleStartInterview}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating Interview..." : "Start Interview"}

              {!loading && <ArrowRight size={18} />}
            </button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  )
}

export default InterviewSetup