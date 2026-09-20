import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Clock, Bot, ArrowRight } from "lucide-react"

function InterviewRoom() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [interview, setInterview] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answer, setAnswer] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const token = localStorage.getItem("token")

        const response = await fetch(
          `https://ai-interview-platform-yaf9.onrender.com/api/interviews/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load interview"
          )
        }

        setInterview(data.interview)

        if (
          data.interview.questions &&
          data.interview.questions.length > 0
        ) {
          setQuestions(data.interview.questions)
        } else {
          setError("No questions found for this interview.")
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInterview()
  }, [id])

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      setError("Please enter an answer before continuing.")
      return
    }

    try {
      setSubmitting(true)
      setError("")

      const token = localStorage.getItem("token")

      // Save answer
      const response = await fetch(
        `https://ai-interview-platform-yaf9.onrender.com/api/interviews/${id}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            answer,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save answer"
        )
      }

      setAnswer("")

      // Move to next question
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        return
      }

      // Evaluate interview after final answer
      const evaluateResponse = await fetch(
        `https://ai-interview-platform-yaf9.onrender.com/api/interviews/${id}/evaluate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const evaluateData = await evaluateResponse.json()

      if (!evaluateResponse.ok) {
        throw new Error(
          evaluateData.message || "Failed to evaluate interview"
        )
      }

      // Go to report after successful evaluation
      navigate(`/interview/${id}/report`)
    } catch (error) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400">
          Loading interview...
        </p>
      </div>
    )
  }

  // Error state
  if (error && !interview) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <p className="text-red-400">
            {error}
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
              <Bot size={22} />
            </div>

            <div>
              <h1 className="font-semibold text-white">
                AI Interviewer
              </h1>

              <p className="text-sm text-slate-400">
                {interview?.interviewType || "Technical"} Interview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 text-sm text-slate-400">

            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <div className="flex items-center gap-2">
              <Clock size={17} />
              <span>15:00</span>
            </div>

          </div>
        </div>

        {/* Main Interview Card */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">

          {/* AI Label */}
          <div className="flex items-center gap-2">
            <Bot size={20} className="text-indigo-400" />

            <span className="text-sm font-medium text-indigo-400">
              AI INTERVIEWER
            </span>
          </div>

          {/* Interview Details */}
          {interview && (
            <div className="mt-4 flex flex-wrap gap-2">

              <span className="rounded-lg bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {interview.difficulty}
              </span>

              {interview.topic?.map((topic) => (
                <span
                  key={topic}
                  className="rounded-lg bg-slate-800 px-3 py-1 text-xs text-slate-300"
                >
                  {topic}
                </span>
              ))}

            </div>
          )}

          {/* Question */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold leading-relaxed text-white sm:text-2xl">
              {questions[currentQuestion]}
            </h2>

            <p className="mt-4 text-sm text-slate-400">
              Take your time and explain your answer clearly.
            </p>
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-slate-800" />

          {/* Answer Section */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Your Answer
            </label>

            <textarea
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value)
                setError("")
              }}
              placeholder="Type your answer here..."
              rows={7}
              disabled={submitting}
              className="mt-3 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 disabled:opacity-60"
            />

            {error && (
              <p className="mt-2 text-sm text-red-400">
                {error}
              </p>
            )}
          </div>

          {/* Action */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmitAnswer}
              disabled={submitting}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? currentQuestion === questions.length - 1
                  ? "Evaluating..."
                  : "Saving Answer..."
                : currentQuestion === questions.length - 1
                  ? "Finish Interview"
                  : "Submit Answer"}

              {!submitting && <ArrowRight size={18} />}
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default InterviewRoom