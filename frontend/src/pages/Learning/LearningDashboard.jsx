import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Clock, Target, TrendingUp, ArrowRight, Star, GraduationCap } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-950 text-white pb-20 relative overflow-hidden transition-colors duration-300">
      {/* Premium Cyber Grids and Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(8,145,178,0.15),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-float" />

      {/* Futuristic Header Section */}
      <div className="bg-slate-900/40 backdrop-blur-md border-b border-white/10 pt-16 pb-28 px-6 md:px-12 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto relative z-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 rounded-full text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-cyan-500/5">
                <TrendingUp size={14} className="animate-pulse" />
                <span>ELEVATE YOUR ACADEMICS</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-none">
                Explore Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Future</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl font-medium leading-relaxed">
                Choose from highly professional courses engineered to bridge the skill gaps mapped in your career assessments.
              </p>
            </div>
            
            {/* Search Input Container with Neon Effect */}
            <div className="flex items-center gap-4 bg-slate-900/80 p-2 rounded-2xl border border-white/10 focus-within:border-cyan-500/50 shadow-2xl transition-all duration-300 w-full md:w-auto">
              <div className="flex-1 md:w-80 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input 
                  type="text"
                  placeholder="Search futuristic courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950/80 pl-12 pr-4 py-3 rounded-xl border border-white/5 focus:border-cyan-500/30 focus:ring-2 focus:ring-cyan-500/10 text-white font-semibold placeholder-slate-500 transition-all duration-300"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-14 relative z-20">
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-lg ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/25 border-transparent translate-y-[-2px]'
                  : 'bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800/80 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredCourses.map((course, index) => {
              // Custom neon theme based on stream
              const streamTheme = {
                Science: {
                  badge: 'bg-cyan-950/50 border-cyan-500/30 text-cyan-400 shadow-cyan-500/5',
                  glow: 'group-hover:shadow-cyan-500/10 group-hover:border-cyan-500/40',
                  iconBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                },
                Commerce: {
                  badge: 'bg-emerald-950/50 border-emerald-500/30 text-emerald-400 shadow-emerald-500/5',
                  glow: 'group-hover:shadow-emerald-500/10 group-hover:border-emerald-500/40',
                  iconBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                },
                Arts: {
                  badge: 'bg-purple-950/50 border-purple-500/30 text-purple-400 shadow-purple-500/5',
                  glow: 'group-hover:shadow-purple-500/10 group-hover:border-purple-500/40',
                  iconBg: 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                }
              }[course.stream] || {
                badge: 'bg-slate-900 border-white/10 text-white',
                glow: 'group-hover:border-white/30',
                iconBg: 'bg-slate-800 text-white'
              };

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  key={course.id}
                  className={`group relative overflow-hidden backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full shadow-2xl ${streamTheme.glow}`}
                >
                  {/* Decorative Shiny Flares */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />

                  {/* Header Details */}
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:rotate-6 ${streamTheme.iconBg}`}>
                      <BookOpen size={24} />
                    </div>
                    {course.trending && (
                      <span className="px-3.5 py-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-orange-500/5">
                        <Star size={10} fill="currentColor" /> Trending
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Sub-badge indicating stream */}
                      <span className={`inline-block px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest mb-3 ${streamTheme.badge}`}>
                        {course.stream}
                      </span>
                      <h3 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-cyan-400 transition-colors">
                        {course.name}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        {course.description}
                      </p>
                    </div>

                    {/* Meta stats */}
                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 mb-8">
                      <div className="flex items-center gap-2.5 text-slate-400">
                        <Clock size={16} className="text-slate-500" />
                        <div className="leading-none">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">Duration</span>
                          <span className="text-xs font-bold text-slate-300">{course.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 text-slate-400 overflow-hidden">
                        <Target size={16} className="text-slate-500" />
                        <div className="leading-none overflow-hidden">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">Criteria</span>
                          <span className="text-xs font-bold text-slate-300 truncate block">{course.eligibility.entranceExams[0] || 'Direct Merit'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enroll/Details CTA */}
                  <Link
                    to={`/learning/${course.id}`}
                    className="w-full py-4 bg-white/5 border border-white/10 hover:border-transparent hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 text-slate-300 hover:text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
                  >
                    Explore Syllabus
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-24 bg-slate-900/20 backdrop-blur-md rounded-3xl border border-dashed border-white/10 mt-10">
            <div className="w-20 h-20 bg-slate-900/60 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 transform rotate-12">
              <Search size={32} className="text-cyan-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">No courses found</h3>
            <p className="text-slate-400 font-medium">Try adjusting your search criteria or stream filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningDashboard;
