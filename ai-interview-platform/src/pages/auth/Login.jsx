import { useState } from "react"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import AuthLayout from "../../components/auth/AuthLayout"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")
    setLoading(true)

    try {
      const response = await fetch(
        "https://ai-interview-platform-yaf9.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        )
      }

      if (!data.token) {
        throw new Error("Token was not received from server")
      }

      // Store authentication data
      localStorage.setItem("token", data.token)
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      )

      // Navigate to dashboard
      navigate("/dashboard")
    } catch (error) {
      setError(
        error.message || "Something went wrong"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Welcome back
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Enter your details to continue your interview preparation.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-300"
          >
            Email
          </label>

          <div className="relative mt-2">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-300"
          >
            Password
          </label>

          <div className="relative mt-2">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-12 text-sm text-white outline-none transition focus:border-indigo-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label
            htmlFor="remember"
            className="flex items-center gap-2 text-slate-400"
          >
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="accent-indigo-600"
            />
            Remember me
          </label>

          <button
            type="button"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Register Link */}
      <p className="mt-6 text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-indigo-400 hover:text-indigo-300"
        >
          Create account
        </Link>
      </p>
    </AuthLayout>
  )
}

export default Login