import { useState } from "react"
import {
  Bell,
  Mail,
  LogOut,
  Shield,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

import DashboardLayout from "../../components/layout/DashboardLayout"

function Settings() {
  const navigate = useNavigate()

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  )

  const [emailNotifications, setEmailNotifications] =
    useState(
      localStorage.getItem("emailNotifications") !== "false"
    )

  const [interviewReminders, setInterviewReminders] =
    useState(
      localStorage.getItem("interviewReminders") !== "false"
    )

  const handleEmailNotifications = (value) => {
    setEmailNotifications(value)
    localStorage.setItem(
      "emailNotifications",
      value
    )
  }

  const handleInterviewReminders = (value) => {
    setInterviewReminders(value)
    localStorage.setItem(
      "interviewReminders",
      value
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    navigate("/login")
  }

  return (
    <DashboardLayout>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your account and preferences
        </p>
      </div>

      <div className="mt-8 max-w-3xl space-y-6">

        {/* Account */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/20">
              <Shield
                size={20}
                className="text-indigo-400"
              />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Account
              </h2>

              <p className="text-sm text-slate-400">
                Your account information
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">

            <div>
              <p className="text-xs text-slate-500">
                Name
              </p>

              <p className="mt-1 text-sm text-white">
                {user.name || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Email
              </p>

              <p className="mt-1 text-sm text-white">
                {user.email || "Not available"}
              </p>
            </div>

          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/20">
              <Bell
                size={20}
                className="text-indigo-400"
              />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Notifications
              </h2>

              <p className="text-sm text-slate-400">
                Manage your notification preferences
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">

            {/* Email notifications */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Mail
                  size={19}
                  className="text-slate-400"
                />

                <div>
                  <p className="text-sm font-medium text-white">
                    Email Notifications
                  </p>

                  <p className="text-xs text-slate-500">
                    Receive updates about your interviews
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  handleEmailNotifications(
                    !emailNotifications
                  )
                }
                className={`relative h-6 w-11 rounded-full transition ${
                  emailNotifications
                    ? "bg-indigo-600"
                    : "bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    emailNotifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Interview reminders */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Bell
                  size={19}
                  className="text-slate-400"
                />

                <div>
                  <p className="text-sm font-medium text-white">
                    Interview Reminders
                  </p>

                  <p className="text-xs text-slate-500">
                    Get reminders to practice interviews
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  handleInterviewReminders(
                    !interviewReminders
                  )
                }
                className={`relative h-6 w-11 rounded-full transition ${
                  interviewReminders
                    ? "bg-indigo-600"
                    : "bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    interviewReminders
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>

          </div>
        </div>

        {/* Logout */}
        <div className="rounded-2xl border border-red-900/40 bg-slate-900 p-6">

          <h2 className="font-semibold text-white">
            Account Actions
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Sign out of your AI Interviewer account.
          </p>

          <button
            onClick={handleLogout}
            className="mt-5 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>

    </DashboardLayout>
  )
}

export default Settings