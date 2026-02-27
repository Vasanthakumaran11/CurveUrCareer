// Enhanced Home Page - Matches Reference Design
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, GraduationCap, Layout, Clock, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion'; 
import { useLanguage } from '../hooks/useLanguage.jsx';

const HomePage = () => {
  const { t } = useLanguage();

  const stats = [
    { 
      number: '12+', 
      label: t('stats.courses'), 
      desc: t('stats.coursesDesc'),
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />
    },
    { 
      number: '3', 
      label: t('stats.streams'), 
      desc: t('stats.streamsDesc'),
      icon: <Layout className="w-6 h-6 text-blue-600" />
    },
    { 
      number: '100%', 
      label: t('stats.free'), 
      desc: t('stats.freeDesc'),
      icon: <Shield className="w-6 h-6 text-blue-600" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="bg-[#f0f7ff] pt-24 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-[#1a2138] mb-6 leading-tight"
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-600 font-medium mb-12"
            >
              {t('hero.subtitle')}
            </motion.p>
 
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>
 
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/assessment"
                className="btn-primary inline-flex items-center gap-2 px-10 py-4 shadow-xl shadow-blue-200"
              >
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
 
        {/* Stats Section */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass-card p-8 flex flex-col items-center text-center group"
              >
                <div className="text-4xl font-extrabold text-blue-600 mb-2">{stat.number}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{stat.label}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
 
        {/* Why Choose Us Section - Extra UX Value */}
        <section className="bg-slate-50/50 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-16">{t('whyChooseUs.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: t('whyChooseUs.dataDriven'), desc: t('whyChooseUs.dataDrivenDesc'), icon: <BookOpen className="w-8 h-8 text-blue-600" /> },
                { title: t('whyChooseUs.timeSaving'), desc: t('whyChooseUs.timeSavingDesc'), icon: <Clock className="w-8 h-8 text-blue-600" /> },
                { title: t('whyChooseUs.globalReach'), desc: t('whyChooseUs.globalReachDesc'), icon: <Globe className="w-8 h-8 text-blue-600" /> },
                { title: t('whyChooseUs.safeSecure'), desc: t('whyChooseUs.safeSecureDesc'), icon: <Shield className="w-8 h-8 text-blue-600" /> }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 transition-transform hover:-translate-y-1">
                  <div className="mb-4">{item.icon}</div>
                  <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
 
      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm rotate-45"></div>
            </div>
            <span className="text-lg font-bold text-slate-800">CurveUrCareer</span>
          </div>
          <div className="flex gap-8 text-slate-400 text-sm">
            <a href="#" className="hover:text-blue-600">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-blue-600">{t('footer.terms')}</a>
            <a href="#" className="hover:text-blue-600">{t('footer.contact')}</a>
          </div>
          <p className="text-slate-400 text-sm">{t('footer.rights')}</p>
        </div>
      </footer>
    </div>
  );
};
 
export default HomePage;
