import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Clock, Target, TrendingUp, ArrowRight, Star } from 'lucide-react';
import { coursesData } from '../../data/coursesData';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const LearningDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Science', 'Commerce', 'Arts'];

  const filteredCourses = useMemo(() => {
    return coursesData.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || course.stream === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="min-h-screen bg-[#f8faff] dark:bg-slate-950 pb-20 transition-colors duration-300">
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-12 pb-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 dark:from-blue-900/10 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <TrendingUp size={14} />
                Elevate Your Career
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-4">
                Explore Your <span className="text-blue-600">Future</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl font-medium">
                Choose from a wide range of professional courses curated to match your interests and career goals.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 w-full md:w-auto">
              <div className="flex-1 md:w-80 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 pl-12 pr-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500/20 text-slate-700 dark:text-white font-medium"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 relative z-20">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-blue-200 dark:shadow-none translate-y-[-2px]'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredCourses.map((course, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={course.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px] flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                    course.stream === 'Science' ? 'bg-blue-50 text-blue-600' :
                    course.stream === 'Commerce' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-purple-50 text-purple-600'
                  } group-hover:scale-110 transition-transform`}>
                    <BookOpen size={24} />
                  </div>
                  {course.trending && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> Trending
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-2 mb-6">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Clock size={16} className="text-slate-400" />
                      <span className="text-xs font-bold">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Target size={16} className="text-slate-400" />
                      <span className="text-xs font-bold truncate">{course.eligibility.entranceExams[0] || 'Direct'}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/learning/${course.id}`}
                  className="w-full py-4 bg-slate-50 dark:bg-slate-800 group-hover:bg-blue-600 text-slate-600 dark:text-slate-400 group-hover:text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 transform"
                >
                  Learn More
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 mt-10">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 transform rotate-12">
              <Search size={32} className="text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No courses found</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningDashboard;
