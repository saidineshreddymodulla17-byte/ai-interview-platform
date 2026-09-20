import { BrainCircuit } from "lucide-react"

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600">
            <BrainCircuit size={26} className="text-white" />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-white">
            AI Interviewer
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Practice. Improve. Get hired.
          </p>
        </div>

        {/* Auth Form */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          {children}
        </div>

      </div>
    </div>
  )
}

export default AuthLayout