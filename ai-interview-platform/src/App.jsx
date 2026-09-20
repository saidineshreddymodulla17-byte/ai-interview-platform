import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landing from "./pages/Landing"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/auth/ProtectedRoute"

import Dashboard from "./pages/dashboard/Dashboard"
import InterviewSetup from "./pages/dashboard/InterviewSetup"
import InterviewHistory from "./pages/dashboard/InterviewHistory"
import Profile from "./pages/dashboard/Profile"
import Settings from "./pages/dashboard/Settings"

import InterviewRoom from "./pages/interview/InterviewRoom"
import CodingRound from "./pages/interview/CodingRound"
import InterviewReport from "./pages/interview/InterviewReport"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/setup"
          element={
            <ProtectedRoute>
              <InterviewSetup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/history"
          element={
            <ProtectedRoute>
              <InterviewHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Interview */}
        <Route
          path="/interview/:id"
          element={<InterviewRoom />}
        />

        <Route
          path="/interview/:id/coding"
          element={<CodingRound />}
        />

        <Route
          path="/interview/:id/report"
          element={<InterviewReport />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App