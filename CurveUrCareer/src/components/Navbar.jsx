import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage.jsx';
import { Globe, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { language, changeLanguage, t } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
        </div>
        <span className="text-xl font-bold text-slate-800 tracking-tight">CurveUrCareer</span>
      </Link>
      
      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="nav-link">{t('nav.home')}</Link>
          <Link to="/assessment" className="nav-link">{t('nav.assessment')}</Link>
          <Link to="/results" className="nav-link">{t('nav.results')}</Link>
          <a href="#" className="nav-link">{t('nav.about')}</a>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-sm font-medium text-slate-700"
          >
            <Globe size={16} className="text-blue-600" />
            <span className="uppercase">{language}</span>
            <ChevronDown size={14} className={`transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => { changeLanguage('en'); setShowLangMenu(false); }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${language === 'en' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}
              >
                English
              </button>
              <button 
                onClick={() => { changeLanguage('ta'); setShowLangMenu(false); }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${language === 'ta' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}
              >
                தமிழ் (Tamil)
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
