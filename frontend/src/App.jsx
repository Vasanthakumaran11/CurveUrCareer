import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FormDataProvider } from './contexts/FormDataProvider';
import { AuthProvider } from './contexts/AuthProvider';
import { SettingsProvider } from './contexts/SettingsProvider';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

const HomePage = lazy(() => import('./pages/HomePage'));
const AssessmentPage = lazy(() => import('./pages/AssessmentPage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/Auth/SignupPage'));
const LearningDashboard = lazy(() => import('./pages/Learning/LearningDashboard'));
const CourseDetails = lazy(() => import('./pages/Learning/CourseDetails'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

// A component that listens to URL changes and automatically scrolls to hashes smoothly
const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timeoutId = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => clearTimeout(timeoutId);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, pathname]);

  return null;
};

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
  const hideNavbar = ['/discover-yourself', '/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
      {!hideNavbar && <Navbar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/discover-yourself" element={
            <ProtectedRoute>
              <AssessmentPage />
            </ProtectedRoute>
          } />
          <Route path="/results" element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          } />
          <Route path="/about" element={<AboutPage />} />
          
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
            <ScrollToHash />
            <InitialRedirect />
            <ErrorBoundary>
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">Loading…</div>}>
                <MainContent />
              </Suspense>
            </ErrorBoundary>
          </Router>
        </FormDataProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;
