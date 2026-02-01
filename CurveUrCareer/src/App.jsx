import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { FormDataProvider } from './hooks/useFormData.jsx';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';

// Helper component to handle redirect on refresh
const InitialRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If the user lands on any page other than home via refresh/direct URL
    // redirect them to home to ensure a fresh start as requested.
    if (window.performance && window.performance.navigation.type === 1) {
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    } else if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

function App() {
  return (
    <FormDataProvider>
      <Router>
        <InitialRedirect />
        <div className="min-h-screen flex flex-col bg-[#f8faff]">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/assessment" element={<AssessmentPage />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </FormDataProvider>
  );
}

export default App;
