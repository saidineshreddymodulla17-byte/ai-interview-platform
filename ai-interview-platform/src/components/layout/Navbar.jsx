import { useState } from "react"
import {
  Bell,
  ChevronDown,
  CheckCircle,
  Sparkles,
} from "lucide-react"

function Navbar() {
  const [showNotifications, setShowNotifications] =
    useState(false)

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to AI Interviewer",
      message: "Start your first interview and test your skills.",
      read: false,
      icon: Sparkles,
    },
    {
      id: 2,
      title: "Practice regularly",
      message: "Complete more interviews to improve your performance.",
      read: false,
      icon: CheckCircle,
    },
  ])

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  )

  const userName = user.name || "User"

  const initials = userName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    )
  }

  return (
    <header className="fixed right-0 top-0 z-30 h-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="flex h-full items-center justify-between px-8">

        {/* Page title */}
        <div>
          <h2 className="text-lg font-semibold text-white">
            Dashboard
          </h2>

          <p className="text-sm text-slate-500">
            Track your interview preparation
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5">

          {/* Notification */}
          <div className="relative">
            <button
              onClick={() =>
                setShowNotifications((previous) => !previous)
              }
              className="relative rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <Bell size={20} />

              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-indigo-500" />
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Notifications
                    </h3>

                    <p className="text-xs text-slate-500">
                      {unreadCount} unread
                    </p>
                  </div>

                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-indigo-400 hover:text-indigo-300"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                {/* Notifications */}
                <div className="max-h-80 overflow-y-auto">

                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-slate-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => {
                      const Icon = notification.icon

                      return (
                        <button
                          key={notification.id}
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                          className={`flex w-full gap-3 border-b border-slate-800 p-4 text-left transition hover:bg-slate-800/50 ${
                            !notification.read
                              ? "bg-indigo-500/5"
                              : ""
                          }`}
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600/15">
                            <Icon
                              size={17}
                              className="text-indigo-400"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white">
                              {notification.title}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {notification.message}
                            </p>

                            {!notification.read && (
                              <span className="mt-2 inline-block text-[10px] font-medium text-indigo-400">
                                NEW
                              </span>
                            )}
                          </div>
                        </button>
                      )
                    })
                  )}

                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-slate-900">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold">
              {initials}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-white">
                {userName}
              </p>

              <p className="text-xs text-slate-500">
                Candidate
              </p>
            </div>

            <ChevronDown
              size={16}
              className="text-slate-500"
            />

          </button>

        </div>
      </div>
    </header>
  )
}

export default Navbar