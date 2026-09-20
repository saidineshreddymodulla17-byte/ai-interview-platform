import { useEffect, useState } from "react"
import { ArrowUpRight, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"

function RecentInterviews() {
  const navigate = useNavigate()

  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem("token")

        const response = await fetch(
          "http://localhost:5000/api/interviews",
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

        setInterviews((data.interviews || []).slice(0, 3))
      } catch (error) {
        console.error("Recent interviews error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInterviews()
  }, [])

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Recent Interviews
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your latest interview attempts
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/history")}
          className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
        >
          View all
        </button>
      </div>

      {/* Interview List */}
      <div className="mt-6 space-y-4">

        {loading && (
          <p className="text-sm text-slate-500">
            Loading interviews...
          </p>
        )}

        {!loading && interviews.length === 0 && (
          <p className="text-sm text-slate-500">
            No interviews yet.
          </p>
        )}

        {!loading &&
          interviews.map((interview) => (
            <div
              key={interview._id}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-slate-700"
            >

              {/* Left */}
              <div>
                <h3 className="font-medium text-white">
                  {interview.topic?.length > 0
                    ? interview.topic.join(", ")
                    : interview.interviewType}
                </h3>

                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <Clock size={13} />

                  {formatDate(interview.createdAt)}
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">

                <div className="text-right">
                  <p className="text-sm font-semibold text-white">
                    {interview.score !== null &&
                    interview.score !== undefined
                      ? `${Math.round(interview.score * 10)}%`
                      : "--"}
                  </p>

                  <p className="text-xs text-slate-500">
                    {interview.status === "completed"
                      ? "Score"
                      : "In Progress"}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (interview.status === "completed") {
                      navigate(
                        `/interview/${interview._id}/report`
                      )
                    } else {
                      navigate(`/interview/${interview._id}`)
                    }
                  }}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <ArrowUpRight size={18} />
                </button>

              </div>

            </div>
          ))}

      </div>

    </div>
  )
}

export default RecentInterviews