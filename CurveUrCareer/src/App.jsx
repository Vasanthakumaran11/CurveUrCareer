import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { FormDataProvider } from './hooks/useFormData.jsx';
import { LanguageProvider } from './hooks/useLanguage.jsx';
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

const MainContent = () => {
  const location = useLocation();
  
  // Hide Navbar on assessment page for total immersion across all steps
  const hideNavbar = location.pathname === '/assessment';

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faff]">
      {!hideNavbar && <Navbar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <FormDataProvider>
        <Router>
          <InitialRedirect />
          <MainContent />
        </Router>
      </FormDataProvider>
    </LanguageProvider>
  );
}

export default App;
