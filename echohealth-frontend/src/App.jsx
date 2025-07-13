import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import DiagnosisPage from './pages/DiagnosisPage'
import EchoBuddy from './pages/EchoBuddy'
import ExercisePage from './pages/ExercisePage'
import SeekHelp from './pages/SeekHelp'
import ProtectedRoute from './components/ProtectedRoute'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/diagnosis" element={
            <ProtectedRoute>
              <DiagnosisPage />
            </ProtectedRoute>
          } />
          <Route path="/echobuddy" element={
            <ProtectedRoute>
              <EchoBuddy />
            </ProtectedRoute>
          } />
          <Route path="/exercises" element={
            <ProtectedRoute>
              <ExercisePage />
            </ProtectedRoute>
          } />
          <Route path="/seek-help" element={
            <ProtectedRoute>
              <SeekHelp />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App