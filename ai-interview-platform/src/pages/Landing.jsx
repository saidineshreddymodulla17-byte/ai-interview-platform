import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Code2,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react"

import { Link } from "react-router-dom"

function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/20">
              <Sparkles size={21} />
            </div>

            <div>
              <h1 className="text-lg font-bold">
                AI Interviewer
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                Practice. Improve. Succeed.
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              How it works
            </a>

            <Link
              to="/login"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile button */}
          <Link
            to="/register"
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white md:hidden"
          >
            Get Started
          </Link>

        </div>
      </header>

      {/* Hero */}
      <main>

        <section className="relative">

          {/* Background glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-20 lg:grid-cols-2 lg:px-8 lg:pb-32 lg:pt-28">

            {/* Left */}
            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
                <Sparkles size={16} />
                AI-powered interview practice
              </div>

              <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Practice interviews.
                <span className="block text-indigo-400">
                  Get better every time.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
                Simulate real technical interviews with an AI interviewer,
                receive detailed feedback, and track your performance over
                time.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link
                  to="/register"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
                >
                  Start Interview

                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
                >
                  Sign In
                </Link>

              </div>

              {/* Trust points */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-indigo-400"
                  />
                  AI-generated questions
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-indigo-400"
                  />
                  Instant feedback
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-indigo-400"
                  />
                  Performance tracking
                </div>

              </div>

            </div>

            {/* Right - Interview Preview */}
            <div className="relative">

              <div className="absolute -inset-8 rounded-full bg-indigo-600/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/30">

                {/* Window Header */}
                <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
                      <Bot size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        AI Interviewer
                      </p>

                      <p className="text-xs text-slate-500">
                        Technical Interview
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                    Live
                  </span>

                </div>

                {/* Question */}
                <div className="p-6">

                  <div className="flex items-center gap-2 text-xs font-medium text-indigo-400">
                    <MessageSquare size={15} />
                    QUESTION 3 OF 5
                  </div>

                  <h2 className="mt-4 text-lg font-semibold leading-7 text-white">
                    What is the difference between authentication
                    and authorization?
                  </h2>

                  <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Bot size={14} />
                      Your answer
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      Authentication verifies who the user is,
                      while authorization determines what that
                      user is allowed to access...
                    </p>

                  </div>

                  {/* Score */}
                  <div className="mt-6 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500">
                          AI Evaluation
                        </p>

                        <p className="mt-1 text-sm font-medium text-white">
                          Strong answer
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-400">
                          8.4
                        </p>

                        <p className="text-xs text-slate-500">
                          / 10
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-[84%] rounded-full bg-indigo-500" />
                    </div>

                  </div>

                </div>

              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl sm:block">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
                    <TrendingUp
                      size={19}
                      className="text-green-400"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Performance
                    </p>

                    <p className="text-sm font-semibold text-white">
                      Improving
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-y border-slate-800/80 bg-slate-900/30"
        >
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

            <div className="mx-auto max-w-2xl text-center">

              <p className="text-sm font-semibold text-indigo-400">
                FEATURES
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Everything you need to practice smarter
              </h2>

              <p className="mt-4 text-slate-400">
                A complete interview practice environment powered by AI.
              </p>

            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">

              <FeatureCard
                icon={<BrainCircuit size={22} />}
                title="AI-Powered Interviews"
                description="Generate interview questions based on your selected topics, difficulty, and interview type."
              />

              <FeatureCard
                icon={<Target size={22} />}
                title="AI Evaluation"
                description="Get scores, strengths, weaknesses, and actionable feedback for every answer."
              />

              <FeatureCard
                icon={<TrendingUp size={22} />}
                title="Track Your Progress"
                description="Review your previous interviews and monitor how your performance changes over time."
              />

            </div>

          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
        >

          <div className="text-center">

            <p className="text-sm font-semibold text-indigo-400">
              HOW IT WORKS
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              From preparation to feedback in three steps
            </h2>

          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            <StepCard
              number="01"
              icon={<Code2 size={21} />}
              title="Choose your interview"
              description="Select your topics, difficulty level, and interview type."
            />

            <StepCard
              number="02"
              icon={<MessageSquare size={21} />}
              title="Answer the questions"
              description="Take the interview and submit your answers just like a real interview."
            />

            <StepCard
              number="03"
              icon={<Target size={21} />}
              title="Get AI feedback"
              description="Receive a score, detailed feedback, strengths, and areas to improve."
            />

          </div>

        </section>

        {/* CTA */}
        <section className="px-6 pb-24 lg:px-8">

          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/20 via-slate-900 to-slate-900 px-6 py-16 text-center sm:px-12">

            <div className="absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative">

              <Sparkles
                size={28}
                className="mx-auto text-indigo-400"
              />

              <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
                Ready for your next interview?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Practice with AI, understand your mistakes,
                and become more confident with every interview.
              </p>

              <Link
                to="/register"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Start Practicing

                <ChevronRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-8 lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Sparkles size={16} />
            </div>

            <span className="text-sm font-semibold text-white">
              AI Interviewer
            </span>

          </div>

          <p className="text-xs text-slate-600">
            AI-powered interview practice platform
          </p>

        </div>

      </footer>

    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-indigo-500/30">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/15 text-indigo-400">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        {description}
      </p>

    </div>
  )
}

function StepCard({
  number,
  icon,
  title,
  description,
}) {
  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/15 text-indigo-400">
          {icon}
        </div>

        <span className="text-3xl font-bold text-slate-800">
          {number}
        </span>

      </div>

      <h3 className="mt-6 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        {description}
      </p>

    </div>
  )
}

export default Landing