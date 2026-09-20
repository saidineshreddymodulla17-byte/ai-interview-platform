import { useEffect, useState } from "react"
import {
  Calendar,
  Target,
  Code2,
  Clock3,
} from "lucide-react"

import DashboardLayout from "../../components/layout/DashboardLayout"
import StatCard from "../../components/dashboard/StatCard"
import RecommendedInterview from "../../components/dashboard/RecommendedInterview"
import RecentInterviews from "../../components/dashboard/RecentInterviews"
import PerformanceChart from "../../components/dashboard/PerformanceChart"

function Dashboard() {
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  )

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

        if (response.ok) {
          setInterviews(data.interviews || [])
        }
      } catch (error) {
        console.error("Dashboard error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInterviews()
  }, [])

  const completedInterviews = interviews.filter(
    (interview) => interview.status === "completed"
  )

  const scores = completedInterviews
    .map((interview) => interview.score)
    .filter((score) => typeof score === "number")

  const averageScore =
    scores.length > 0
      ? (
          scores.reduce((sum, score) => sum + score, 0) /
          scores.length
        ).toFixed(1)
      : "0.0"

  const bestScore =
    scores.length > 0
      ? Math.max(...scores).toFixed(1)
      : "0.0"

  return (
    <DashboardLayout>

      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {user.name || "there"} 👋
        </h1>

        <p className="mt-2 text-slate-400">
          Ready to improve your interview skills?
        </p>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Interviews"
          value={loading ? "..." : interviews.length}
          description={`${completedInterviews.length} completed`}
          icon={Calendar}
        />

        <StatCard
          title="Average Score"
          value={loading ? "..." : `${averageScore}/10`}
          description={
            scores.length > 0
              ? `Best score: ${bestScore}/10`
              : "Complete an interview"
          }
          icon={Target}
        />

        <StatCard
          title="Completed"
          value={loading ? "..." : completedInterviews.length}
          description={
            interviews.length > 0
              ? `${interviews.length} total interviews`
              : "No interviews yet"
          }
          icon={Code2}
        />

        <StatCard
          title="Questions Answered"
          value={
            loading
              ? "..."
              : interviews.reduce(
                  (total, interview) =>
                    total + (interview.answers?.length || 0),
                  0
                )
          }
          description="Across all interviews"
          icon={Clock3}
        />

      </div>

      {/* Recommended Interview */}
      <div className="mt-8">
        <RecommendedInterview />
      </div>

      {/* Performance and Recent Interviews */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <PerformanceChart />
        </div>

        <RecentInterviews />

      </div>

    </DashboardLayout>
  )
}

export default Dashboard