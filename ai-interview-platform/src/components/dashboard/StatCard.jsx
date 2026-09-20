import { TrendingUp } from "lucide-react"

function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-start justify-between">
        
        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h3>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
          <Icon size={20} />
        </div>

      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <TrendingUp size={15} className="text-emerald-400" />

        <span className="text-emerald-400">
          {description}
        </span>
      </div>
    </div>
  )
}

export default StatCard