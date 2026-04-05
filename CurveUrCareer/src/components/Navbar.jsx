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

  const navLinks = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.assessment'), path: '/assessment' },
    { name: t('navbar.results'), path: '/results' },
    { name: t('navbar.learning'), path: '/learning' },
    { name: t('navbar.about'), path: '#' },
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
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
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
            className="md:hidden p-2 text-slate-600 dark:text-slate-400"
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
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-white dark:bg-slate-900 z-[60] shadow-2xl p-6 md:hidden flex flex-col pt-20"
            >
              <div className="space-y-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-xl font-bold text-slate-800 dark:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
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
    </>
  );
};

export default Navbar;
