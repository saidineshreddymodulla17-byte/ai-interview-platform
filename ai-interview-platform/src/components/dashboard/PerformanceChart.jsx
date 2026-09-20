import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

function PerformanceChart() {
  const [data, setData] = useState([])

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

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch interviews")
        }

        const completedInterviews = (result.interviews || [])
          .filter(
            (interview) =>
              interview.status === "completed" &&
              typeof interview.score === "number"
          )
          .reverse()

        const chartData = completedInterviews.map(
          (interview, index) => ({
            interview: String(index + 1),
            score: Math.round(interview.score * 10),
          })
        )

        setData(chartData)
      } catch (error) {
        console.error("Performance chart error:", error)
      }
    }

    fetchInterviews()
  }, [])

  return (
    <div className="h-[400px] rounded-2xl border border-slate-800 bg-slate-900 p-6">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-white">
          Performance Overview
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Track your interview performance
        </p>
      </div>

      {/* Chart */}
      <div className="mt-6 h-[300px]">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Complete an interview to see your performance.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="interview"
                stroke="#64748b"
                label={{
                  value: "Interview",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#64748b",
                }}
              />

              <YAxis
                domain={[0, 100]}
                stroke="#64748b"
              />

              <Tooltip
                formatter={(value) => [`${value}%`, "Score"]}
              />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  )
}

export default PerformanceChart