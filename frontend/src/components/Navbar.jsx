import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, LogOut, Menu, X, User, GraduationCap, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';
import { motion, AnimatePresence } from 'framer-motion';
import SettingsModal from './SettingsModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { t } = useSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showOnboardingAlert, setShowOnboardingAlert] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const getUserInitial = () => {
    if (user?.displayName) return user.displayName[0].toUpperCase();
    if (user?.email) return user.email[0].toUpperCase();
    return <User className="w-5 h-5" />;
  };

  const isOnboarded = user && user.profile?.onboarding_completed === true;

  const navLinks = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.exploreSkills'), path: '/#explore-skills' },
    { name: t('navbar.learningPaths'), path: '/learning' },
    { name: t('navbar.discoverYourself'), path: '/discover-yourself' },
    { name: t('navbar.careerDirection'), path: isOnboarded ? '/results#pathways' : '/#career-direction' },
    { name: t('navbar.skillGapAnalyzer'), path: isOnboarded ? '/#skill-gap' : '/results#skill-gap' },
    { name: t('navbar.growthDashboard'), path: isOnboarded ? '/#growth-dashboard' : '/results#growth-dashboard' },
    { name: t('navbar.colleges'), path: isOnboarded ? '/results#colleges' : '/#colleges' },
    { name: t('navbar.about'), path: '/about' },
  ];

  return (
    <>
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-3 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none group-hover:rotate-12 transition-transform duration-300">
            <div className="w-5 h-5 bg-white rounded-md rotate-45 flex items-center justify-center overflow-hidden">
               <div className="w-full h-full bg-blue-600 -rotate-45 translate-x-1/2 translate-y-1/2 scale-150" />
            </div>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 tracking-tight">
            CurveUrCareer
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-5">
          {navLinks.map((link) => {
            const requiresOnboarding = link.path.includes('#growth-dashboard') || link.path.startsWith('/results');
            const hasNotCompleted = user && !user.profile?.onboarding_completed;

            return (
              <Link 
                key={link.path} 
                to={requiresOnboarding && hasNotCompleted ? '#' : link.path}
                onClick={(e) => {
                  if (requiresOnboarding && hasNotCompleted) {
                    e.preventDefault();
                    setShowOnboardingAlert(true);
                  }
                }}
                className="text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pl-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:shadow-md transition-all duration-300"
              >
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white dark:ring-slate-900 overflow-hidden">
                  {getUserInitial()}
                </div>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-20 py-2 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-2">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user.displayName || user.email}</p>
                      </div>

                      <button 
                        onClick={() => { setIsSettingsOpen(true); setIsUserMenuOpen(false); }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        {t('navbar.settings')}
                      </button>

                      <button 
                         onClick={handleLogout}
                         className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('navbar.logout')}
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 transition-colors">
                {t('navbar.login')}
              </Link>
              <Link to="/signup" className="hidden sm:block text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-full shadow-lg shadow-blue-200 dark:shadow-none transition-all duration-300">
                {t('navbar.signup')}
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="xl:hidden p-2 text-slate-600 dark:text-slate-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] xl:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-white dark:bg-slate-900 z-[60] shadow-2xl p-6 xl:hidden flex flex-col pt-20 overflow-y-auto"
            >
              <div className="space-y-6">
                {navLinks.map((link) => {
                  const requiresOnboarding = link.path.includes('#growth-dashboard') || link.path.startsWith('/results');
                  const hasNotCompleted = user && !user.profile?.onboarding_completed;

                  return (
                    <Link 
                      key={link.path} 
                      to={requiresOnboarding && hasNotCompleted ? '#' : link.path} 
                      onClick={(e) => {
                        setIsMenuOpen(false);
                        if (requiresOnboarding && hasNotCompleted) {
                          e.preventDefault();
                          setShowOnboardingAlert(true);
                        }
                      }}
                      className="block text-xl font-bold text-slate-800 dark:text-white"
                    >
                      {link.name}
                    </Link>
                  );
                })}
                {!user && (
                  <Link 
                    to="/signup" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-xl font-bold text-blue-600"
                  >
                    {t('navbar.signup')}
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

       {/* Settings Modal */}
      <SettingsModal isVisible={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Futuristic Onboarding Intercept Alert Modal */}
      <AnimatePresence>
        {showOnboardingAlert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOnboardingAlert(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-md w-full relative z-10 shadow-2xl text-center space-y-6 overflow-hidden"
            >
              {/* Dynamic decorative backdrop grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none"></div>

              {/* Glowing warning icon */}
              <div className="relative flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-3xl shadow-[0_0_20px_rgba(245,158,11,0.25)] animate-pulse">
                  ⚠️
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="text-xl md:text-2xl font-black text-slate-100 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent uppercase tracking-wider">
                  Discovery Link Required
                </h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                  Before you can access the learning pathways, skill diagnostic suites, and personalized career dashboards, you must activate your student neural coordinates.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 relative z-10 pt-2">
                <button
                  onClick={() => setShowOnboardingAlert(false)}
                  className="w-full sm:flex-1 py-3 rounded-xl border border-slate-800 hover:bg-slate-800/50 text-slate-400 text-sm font-semibold transition-colors duration-300"
                >
                  Cancel Connection
                </button>
                <button
                  onClick={() => {
                    setShowOnboardingAlert(false);
                    navigate('/discover-yourself');
                  }}
                  className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-sm font-bold shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Start Discovery Link
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
