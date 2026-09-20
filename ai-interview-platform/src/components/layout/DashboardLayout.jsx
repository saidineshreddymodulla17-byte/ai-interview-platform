import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <Navbar />

      <main className="ml-64 pt-20">
        <div className="p-8">
          {children}
        </div>
      </main>

    </div>
  )
}

export default DashboardLayout