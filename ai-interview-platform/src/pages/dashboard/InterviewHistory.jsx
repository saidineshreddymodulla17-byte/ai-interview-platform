import { useEffect, useState } from "react"
import {
  ArrowLeft,
  Eye,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

import DashboardLayout from "../../components/layout/DashboardLayout"

function InterviewHistory() {
  const navigate = useNavigate()

  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem("token")

        const response = await fetch(
          "https://ai-interview-platform-yaf9.onrender.com/api/interviews",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch interviews"
          )
        }

        setInterviews(data.interviews || [])
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInterviews()
  }, [])

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const getScoreStyle = (score) => {
    if (score >= 8) {
      return "text-green-400"
    }

    if (score >= 6) {
      return "text-yellow-400"
    }

    return "text-red-400"
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex items-center gap-3 text-slate-400">
            <Loader2
              size={20}
              className="animate-spin"
            />
            Loading interview history...
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Interview History
          </h1>

          <p className="mt-2 text-slate-400">
            Review your previous interview sessions and performance.
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!error && interviews.length === 0 && (
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">

          <Clock
            size={42}
            className="mx-auto text-slate-600"
          />

          <h2 className="mt-4 text-xl font-semibold text-white">
            No interviews yet
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Start your first AI interview to see your history here.
          </p>

          <button
            onClick={() => navigate("/dashboard/setup")}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Start Interview
          </button>

        </div>
      )}

      {/* Interview List */}
      {interviews.length > 0 && (
        <div className="mt-8 space-y-4">

          {interviews.map((interview) => (

            <div
              key={interview._id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
            >

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                {/* Interview Info */}
                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-2">

                    {interview.topic?.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-lg bg-slate-800 px-3 py-1 text-xs text-slate-300"
                      >
                        {topic}
                      </span>
                    ))}

                    <span className="rounded-lg bg-indigo-500/10 px-3 py-1 text-xs text-indigo-400">
                      {interview.difficulty}
                    </span>

                  </div>

                  <h2 className="mt-3 text-lg font-semibold text-white">
                    {interview.interviewType} Interview
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">

                    <span>
                      {formatDate(interview.createdAt)}
                    </span>

                    <span>
                      {interview.questions?.length || 0} Questions
                    </span>

                    <span>
                      {interview.answers?.length || 0} Answers
                    </span>

                  </div>

                </div>

                {/* Score + Status + View */}
                <div className="flex items-center justify-between gap-6 lg:justify-end">

                  <div className="text-center">

                    <p className="text-xs uppercase text-slate-500">
                      Score
                    </p>

                    <p
                      className={`mt-1 text-2xl font-bold ${
                        interview.score !== null
                          ? getScoreStyle(interview.score)
                          : "text-slate-500"
                      }`}
                    >
                      {interview.score !== null
                        ? `${interview.score}/10`
                        : "--"}
                    </p>

                  </div>

                  <div>

                    {interview.status === "completed" ? (
                      <div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-xs font-medium text-green-400">
                        <CheckCircle2 size={15} />
                        Completed
                      </div>
                    ) : (
                      <div className="rounded-lg bg-yellow-500/10 px-3 py-2 text-xs font-medium text-yellow-400">
                        In Progress
                      </div>
                    )}

                  </div>

                  <button
                    onClick={() =>
                      interview.status === "completed"
                        ? navigate(`/interview/${interview._id}/report`)
                        : navigate(`/interview/${interview._id}`)
                    }
                    className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    <Eye size={17} />
                    View
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </DashboardLayout>
  )
}

export default InterviewHistory