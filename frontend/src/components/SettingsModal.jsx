import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon, Languages, LogOut } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { useAuth } from '../hooks/useAuth';

const SettingsModal = ({ isVisible, onClose }) => {
  const { theme, toggleTheme, language, changeLanguage, t } = useSettings();
  const { logout } = useAuth();

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Languages size={24} className="text-blue-500" />
              {t('settings.title')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <X size={20} className="text-slate-500" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Theme Selection */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t('settings.theme')}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => theme === 'dark' && toggleTheme()}
                  className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    theme === 'light'
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200'
                  }`}
                >
                  <Sun size={20} />
                  <span className="font-medium">{t('settings.lightMode')}</span>
                </button>
                <button
                  onClick={() => theme === 'light' && toggleTheme()}
                  className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    theme === 'dark'
                      ? 'border-blue-500 bg-slate-800 text-white'
                      : 'border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <Moon size={20} />
                  <span className="font-medium">{t('settings.darkMode')}</span>
                </button>
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t('settings.language')}
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'en', label: t('settings.english') },
                  { id: 'ta', label: t('settings.tamil') }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => changeLanguage(lang.id)}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                      language === lang.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-medium">{lang.label}</span>
                    {language === lang.id && (
                      <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900/50 flex flex-col gap-3 border-t border-slate-100 dark:border-slate-800">
             <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-semibold transition-colors"
            >
              <LogOut size={18} />
              {t('navbar.logout')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SettingsModal;
