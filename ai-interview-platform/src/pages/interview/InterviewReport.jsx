import { useEffect, useState } from "react"
import {
  Trophy,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  RotateCcw,
  BrainCircuit,
} from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

function InterviewReport() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [interview, setInterview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
            data.message || "Failed to load interview report"
          )
        }

        setInterview(data.interview)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInterview()
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400">
          Loading interview report...
        </p>
      </div>
    )
  }

  if (error || !interview) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <p className="text-red-400">
            {error || "Interview report not found"}
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

  const score = interview.score || 0
  const evaluations = interview.evaluations || []

  const allStrengths = evaluations.flatMap(
    (evaluation) => evaluation.strengths || []
  )

  const allImprovements = evaluations.flatMap(
    (evaluation) => evaluation.improvements || []
  )

  const averagePercentage = Math.round(score * 10)

  let performanceText = "Keep Practicing"

  if (score >= 8) {
    performanceText = "Excellent Performance"
  } else if (score >= 6) {
    performanceText = "Good Performance"
  } else if (score >= 4) {
    performanceText = "Average Performance"
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white sm:p-6 lg:p-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600">
              <BrainCircuit size={24} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">
                Interview Report
              </h1>

              <p className="text-sm text-slate-400">
                AI-generated performance analysis
              </p>
            </div>

          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

        </div>

        {/* Overall Score */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">

          <div className="flex flex-col items-center text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10">
              <Trophy size={28} className="text-indigo-400" />
            </div>

            <p className="mt-5 text-sm font-medium text-indigo-400">
              INTERVIEW COMPLETE
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Your Interview Score
            </h2>

            <div className="mt-6 flex items-end">

              <span className="text-6xl font-bold text-white">
                {score}
              </span>

              <span className="mb-2 ml-2 text-xl text-slate-400">
                /10
              </span>

            </div>

            <div className="mt-4 rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-400">
              {performanceText}
            </div>

            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-400">
              Your overall score is based on the AI evaluation of
              your interview answers.
            </p>

          </div>

        </div>

        {/* Performance Breakdown */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">

          <h2 className="text-lg font-semibold text-white">
            Performance Breakdown
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Score for each interview question
          </p>

          <div className="mt-6 space-y-6">

            {evaluations.map((evaluation, index) => {

              const questionScore = evaluation.score || 0
              const percentage = questionScore * 10

              return (
                <div key={index}>

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="text-sm font-medium text-slate-300">
                        Question {index + 1}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {interview.questions[index]}
                      </p>
                    </div>

                    <span className="shrink-0 font-semibold text-white">
                      {questionScore}/10
                    </span>

                  </div>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">

                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>
              )
            })}

          </div>

        </div>

        {/* Question-by-question Evaluation */}
        <div className="mt-6 space-y-6">

          {evaluations.map((evaluation, index) => (

            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >

              <div className="flex items-center justify-between gap-4">

                <h2 className="text-lg font-semibold text-white">
                  Question {index + 1}
                </h2>

                <span className="rounded-lg bg-indigo-500/10 px-3 py-1 text-sm font-semibold text-indigo-400">
                  {evaluation.score}/10
                </span>

              </div>

              <div className="mt-4 rounded-xl bg-slate-950 p-4">

                <p className="text-xs font-medium uppercase text-slate-500">
                  Question
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {interview.questions[index]}
                </p>

              </div>

              <div className="mt-4 rounded-xl bg-slate-950 p-4">

                <p className="text-xs font-medium uppercase text-slate-500">
                  Your Answer
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {interview.answers[index]}
                </p>

              </div>

              <div className="mt-4">

                <p className="text-sm font-medium text-indigo-400">
                  AI Feedback
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {evaluation.feedback}
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* Strengths and Improvements */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Strengths */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
                <CheckCircle2
                  size={21}
                  className="text-green-400"
                />
              </div>

              <h2 className="text-lg font-semibold">
                Your Strengths
              </h2>

            </div>

            <div className="mt-6 space-y-4">

              {allStrengths.length > 0 ? (
                allStrengths.map((strength, index) => (

                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >

                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-green-400"
                    />

                    <p className="text-sm leading-6 text-slate-400">
                      {strength}
                    </p>

                  </div>

                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No strengths were provided.
                </p>
              )}

            </div>

          </div>

          {/* Improvements */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                <AlertCircle
                  size={21}
                  className="text-orange-400"
                />
              </div>

              <h2 className="text-lg font-semibold">
                Areas for Improvement
              </h2>

            </div>

            <div className="mt-6 space-y-4">

              {allImprovements.length > 0 ? (
                allImprovements.map((improvement, index) => (

                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >

                    <AlertCircle
                      size={18}
                      className="mt-0.5 shrink-0 text-orange-400"
                    />

                    <p className="text-sm leading-6 text-slate-400">
                      {improvement}
                    </p>

                  </div>

                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No improvements were provided.
                </p>
              )}

            </div>

          </div>

        </div>

        {/* Overall AI Feedback */}
        <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/10 via-slate-900 to-slate-900 p-6 sm:p-8">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">
              <BrainCircuit
                size={23}
                className="text-indigo-400"
              />
            </div>

            <div>

              <h2 className="font-semibold text-white">
                AI Feedback
              </h2>

              <p className="text-sm text-slate-400">
                Personalized feedback based on your answers
              </p>

            </div>

          </div>

          <p className="mt-6 leading-7 text-slate-300">
            You scored {score}/10 overall, which corresponds to{" "}
            {averagePercentage}% of the maximum score.
            Review the question-by-question feedback above to
            understand where you performed well and where you can
            improve.
          </p>

        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
          >
            Back to Dashboard
          </button>

          <button
            onClick={() => navigate("/dashboard/setup")}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            <RotateCcw size={18} />
            Practice Again
          </button>

        </div>

      </div>
    </div>
  )
}

export default InterviewReport