import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { ProfileSetup } from './components/Profile/ProfileSetup';
import { QuizComponent } from './components/Quiz/QuizComponent';
import { Dashboard } from './pages/Dashboard';
import { Results } from './pages/Results';
import { Colleges } from './pages/Colleges';
import { Timeline } from './pages/Timeline';
import { Profile } from './pages/Profile';
import { Loader } from 'lucide-react';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

// Public Route Component (redirect if already authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile-setup" element={
                <ProtectedRoute>
                  <ProfileSetup />
                </ProtectedRoute>
              } />
              <Route path="/quiz" element={
                <ProtectedRoute>
                  <QuizComponent />
                </ProtectedRoute>
              } />
              <Route path="/results" element={
                <ProtectedRoute>
                  <Results />
                </ProtectedRoute>
              } />
              <Route path="/colleges" element={
                <ProtectedRoute>
                  <Colleges />
                </ProtectedRoute>
              } />
              <Route path="/timeline" element={
                <ProtectedRoute>
                  <Timeline />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;