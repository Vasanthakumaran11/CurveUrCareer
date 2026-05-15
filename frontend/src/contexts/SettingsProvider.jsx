import React, { useState, useEffect } from 'react';
import { SettingsContext } from './SettingsContext';
import { translations } from '../data/translations';

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  
  const changeLanguage = (lang) => setLanguage(lang);

  const t = (key) => {
    if (!key) return '';
    const keys = key.split('.');
    let result = translations[language];
    
    for (const k of keys) {
      if (result && typeof result === 'object') {
        result = result[k];
      } else {
        return key;
      }
    }
    
    return result || key;
  };

  const value = {
    theme,
    language,
    toggleTheme,
    changeLanguage,
    t
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
