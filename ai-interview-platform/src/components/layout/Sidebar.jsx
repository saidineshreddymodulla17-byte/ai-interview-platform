import {
  LayoutDashboard,
  PlusCircle,
  History,
  User,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react"

import { useNavigate, useLocation } from "react-router-dom"

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    navigate("/login")
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800 bg-slate-950">

      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
          <Sparkles size={20} />
        </div>

        <div>
          <h1 className="text-lg font-bold text-white">
            AI Interviewer
          </h1>

          <p className="text-xs text-slate-500">
            Practice. Improve. Succeed.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Menu
        </p>

        <div className="space-y-1">

          <SidebarItem
            icon={<LayoutDashboard size={19} />}
            label="Dashboard"
            active={location.pathname === "/dashboard"}
            onClick={() => navigate("/dashboard")}
          />

          <SidebarItem
            icon={<PlusCircle size={19} />}
            label="Start Interview"
            active={location.pathname === "/dashboard/setup"}
            onClick={() => navigate("/dashboard/setup")}
          />

          <SidebarItem
            icon={<History size={19} />}
            label="Interview History"
            active={location.pathname === "/dashboard/history"}
            onClick={() => navigate("/dashboard/history")}
          />

        </div>

        <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Account
        </p>

        <div className="space-y-1">

          <SidebarItem
            icon={<User size={19} />}
            label="Profile"
            active={location.pathname === "/dashboard/profile"}
            onClick={() => navigate("/dashboard/profile")}
          />

          <SidebarItem
            icon={<Settings size={19} />}
            label="Settings"
            active={location.pathname === "/dashboard/settings"}
            onClick={() => navigate("/dashboard/settings")}
          />

        </div>

      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 w-full border-t border-slate-800 p-3">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
        >
          <LogOut size={19} />
          Logout
        </button>

      </div>

    </aside>
  )
}

function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
        active
          ? "bg-indigo-600/15 text-indigo-400"
          : "text-slate-400 hover:bg-slate-900 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

export default Sidebar