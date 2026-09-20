import { ArrowRight, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"

function RecommendedInterview() {
  const navigate = useNavigate()

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/20 via-slate-900 to-slate-900 p-6">

      {/* Background decoration */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

        {/* Left section */}
        <div>
          <div className="flex items-center gap-2">
            <Sparkles
              size={18}
              className="text-indigo-400"
            />

            <span className="text-sm font-medium text-indigo-400">
              Recommended for you
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-bold text-white">
            Backend Developer
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Test your knowledge of Node.js, REST APIs,
            databases, authentication, and backend system
            design.
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              Node.js
            </span>

            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              DBMS
            </span>

            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              REST APIs
            </span>

            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              Medium
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/dashboard/setup")}
          className="group flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Start Interview

          <ArrowRight
            size={17}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>

      </div>
    </div>
  )
}

export default RecommendedInterview