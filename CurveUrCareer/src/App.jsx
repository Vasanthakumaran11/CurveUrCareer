import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FormDataProvider } from './contexts/FormDataProvider';
import { AuthProvider } from './contexts/AuthProvider';
import { SettingsProvider } from './contexts/SettingsProvider';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import LearningDashboard from './pages/Learning/LearningDashboard';
import CourseDetails from './pages/Learning/CourseDetails';
import ProtectedRoute from './components/ProtectedRoute';

// Improved redirect logic to only redirect from non-existent routes if necessary
// but allowed professional deep linking
const InitialRedirect = () => {
  useEffect(() => {
    // If we're on a non-root route, let's keep it if it's potentially valid.
    // The previous logic was too restrictive for a professional app.
    // We only redirect if it's a completely unknown state, but react-router
    // handles that better with a 404 route if needed.
    // For now, let's just make sure we are not stuck.
  }, []);

  return null;
};

const MainContent = () => {
  const location = useLocation();
  
  // Hide Navbar on assessment and auth pages for total immersion
  const hideNavbar = ['/assessment', '/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
      {!hideNavbar && <Navbar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/results" element={<ResultsPage />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Learning Platform Routes (Protected) */}
          <Route path="/learning" element={
            <ProtectedRoute>
              <LearningDashboard />
            </ProtectedRoute>
          } />
          <Route path="/learning/:courseId" element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <FormDataProvider>
          <Router>
            <InitialRedirect />
            <MainContent />
          </Router>
        </FormDataProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;
