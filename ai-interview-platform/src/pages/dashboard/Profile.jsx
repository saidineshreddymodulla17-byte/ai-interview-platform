import { User, Mail, ShieldCheck } from "lucide-react"
import DashboardLayout from "../../components/layout/DashboardLayout"

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  )

  return (
    <DashboardLayout>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Profile
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your account information
        </p>
      </div>

      {/* Profile Card */}
      <div className="mt-8 max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">

        {/* Avatar */}
        <div className="flex items-center gap-5 border-b border-slate-800 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              {user.name || "User"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              AI Interviewer Account
            </p>
          </div>
        </div>

        {/* Account Information */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white">
            Account Information
          </h3>

          <div className="mt-5 space-y-4">

            {/* Name */}
            <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                <User
                  size={19}
                  className="text-indigo-400"
                />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Full Name
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {user.name || "Not available"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                <Mail
                  size={19}
                  className="text-indigo-400"
                />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Email Address
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {user.email || "Not available"}
                </p>
              </div>
            </div>

            {/* Account Status */}
            <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                <ShieldCheck
                  size={19}
                  className="text-indigo-400"
                />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Account Status
                </p>

                <p className="mt-1 text-sm font-medium text-green-400">
                  Active
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}

export default Profile