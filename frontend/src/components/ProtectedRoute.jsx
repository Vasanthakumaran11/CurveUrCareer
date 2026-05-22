import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-cyan-400">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
          <span className="text-sm font-semibold tracking-wider text-slate-400 animate-pulse">SYNCHRONIZING PROFILE...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect unauthenticated users to login, saving the target page in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasCompletedOnboarding = user.profile?.onboarding_completed;

  // Gate 1: If onboarding is complete and trying to go back to assessment, route to career dashboard
  if (hasCompletedOnboarding && location.pathname === '/discover-yourself') {
    return <Navigate to="/results" replace />;
  }

  // Gate 2: If onboarding is NOT complete and trying to go elsewhere, force them to do onboarding
  if (!hasCompletedOnboarding && location.pathname !== '/discover-yourself') {
    return <Navigate to="/discover-yourself" replace />;
  }

  return children;
};

export default ProtectedRoute;
