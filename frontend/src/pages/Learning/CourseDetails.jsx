import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, DollarSign, Briefcase, 
  GraduationCap, TrendingUp, Users, Calendar, 
  MapPin, ShieldCheck, Bookmark, Sparkles, Award
} from 'lucide-react';
import { coursesData } from '../../data/coursesData';
import { motion } from 'framer-motion';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find(c => c.id === courseId);

  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedModules, setCompletedModules] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('curveurcareer_course_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed[courseId]) {
          setStarted(parsed[courseId].started || false);
          setProgress(parsed[courseId].progress || 0);
          setCompletedModules(parsed[courseId].completedModules || []);
        }
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, [courseId]);

  const saveProgressToStorage = (isStarted, currentProgress, currentModules) => {
    const saved = localStorage.getItem('curveurcareer_course_progress') || '{}';
    try {
      const parsed = JSON.parse(saved);
      parsed[courseId] = {
        started: isStarted,
        progress: currentProgress,
        completedModules: currentModules,
        lastAccessed: new Date().toISOString()
      };
      localStorage.setItem('curveurcareer_course_progress', JSON.stringify(parsed));
    } catch (e) {
      console.error("Failed to save progress", e);
    }
  };

  const handleStartCourse = () => {
    setStarted(true);
    setProgress(20);
    setCompletedModules([0]); // Check the first module by default
    saveProgressToStorage(true, 20, [0]);
  };

  const handleToggleModule = (idx) => {
    let newModules;
    if (completedModules.includes(idx)) {
      newModules = completedModules.filter(m => m !== idx);
    } else {
      newModules = [...completedModules, idx];
    }
    const newProgress = Math.round((newModules.length / 5) * 100);
    setCompletedModules(newModules);
    setProgress(newProgress);
    saveProgressToStorage(started, newProgress, newModules);
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6 relative overflow-hidden">
        {/* Glow assets */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(239,68,68,0.1),rgba(255,255,255,0))]" />
        
        <div className="text-center relative z-10 max-w-md">
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/10">
            <ShieldCheck size={40} className="text-red-500" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3 tracking-tight">Course Not Found</h1>
          <p className="text-slate-400 mb-8 font-medium">The course syllabus you are looking for does not exist or has been archived.</p>
          <button 
            onClick={() => navigate('/learning')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
          >
           Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Stream-based styling context
  const theme = {
    Science: {
      accent: 'from-cyan-400 to-blue-500',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
      badge: 'bg-cyan-950/50 border-cyan-500/30 text-cyan-400'
    },
    Commerce: {
      accent: 'from-emerald-400 to-teal-500',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
      badge: 'bg-emerald-950/50 border-emerald-500/30 text-emerald-400'
    },
    Arts: {
      accent: 'from-purple-400 to-pink-500',
      iconBg: 'bg-purple-500/10 text-purple-400 border border-purple-500/30',
      badge: 'bg-purple-950/50 border-purple-500/30 text-purple-400'
    }
  }[course.stream] || {
    accent: 'from-slate-400 to-slate-200',
    iconBg: 'bg-slate-800 text-white',
    badge: 'bg-slate-900 border-white/10 text-white'
  };

  const sections = [
    { 
      title: "Course Overview", 
      icon: <GraduationCap className="w-6 h-6 text-cyan-400" />, 
      content: course.description,
      details: [
        { label: "Duration", value: course.duration, icon: <Calendar size={14} /> },
        { label: "Stream Group", value: course.stream, icon: <Bookmark size={14} /> }
      ]
    },
    { 
      title: "Eligibility Criteria", 
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />, 
      content: (
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Core Prerequisite Subjects</span>
            <div className="flex flex-wrap gap-2">
              {course.eligibility.subjects.map(s => (
                <span key={s} className="px-3.5 py-2 bg-slate-900/80 border border-white/10 text-slate-300 rounded-xl text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-slate-900/60 border border-white/5 rounded-2xl max-w-md">
            <Award className="text-cyan-400" size={20} />
            <p className="text-slate-300 text-sm font-semibold">
              Minimum Academic Cut-off: <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 font-extrabold">{course.eligibility.minPercentage}%</span> in Boards
            </p>
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Entrance Exams Required</span>
            <div className="flex flex-wrap gap-2">
              {course.eligibility.entranceExams.map(e => (
                <span key={e} className="px-3.5 py-2 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 rounded-xl text-xs font-black uppercase tracking-widest">
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    { 
      title: "Career & Growth", 
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />, 
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-5 bg-gradient-to-r from-slate-900/80 to-indigo-950/20 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-3">
              <DollarSign className="text-purple-400" />
              <span className="text-sm font-bold text-slate-300">Avg. Standard Salary</span>
            </div>
            <span className="text-xl font-black text-purple-400 tracking-tight">{course.averageSalary}</span>
          </div>
          
          <div className="space-y-3">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
               <Briefcase size={14} /> High-Growth Targets
             </span>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               {course.careerPaths.map(path => (
                 <div key={path} className="p-4 bg-slate-900/60 border border-white/10 rounded-2xl text-sm font-semibold text-slate-300 shadow-sm flex items-center gap-2.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                   {path}
                 </div>
               ))}
             </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 relative overflow-hidden transition-colors duration-300">
      {/* Cyber Assets */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(8,145,178,0.12),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Futuristic Header */}
      <div className="bg-slate-900/40 backdrop-blur-md border-b border-white/10 pt-10 pb-16 px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Link 
            to="/learning" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 font-bold mb-8 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                 <span className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block ${theme.badge}`}>
                    Syllabus Guide
                 </span>
                 <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                   {course.name}
                 </h1>
              </div>
              {started ? (
                <div className={`px-8 py-4 bg-slate-900 border ${progress === 100 ? 'border-emerald-500/50 text-emerald-400' : 'border-cyan-500/50 text-cyan-400'} rounded-2xl font-black text-md shadow-lg flex flex-col items-center gap-1`}>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-mono">YOUR COURSE STATE</span>
                  <span className="uppercase text-sm tracking-wider font-bold">
                    {progress === 100 ? 'Syllabus Completed 🏆' : `Learning: ${progress}%`}
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleStartCourse}
                  className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/20 text-white rounded-2xl font-black text-md transition-all hover:-translate-y-1 shadow-md hover:scale-105 active:scale-95 duration-200"
                >
                  Start Course
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Syllabus Progress Tracking Checklist Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-md bg-slate-900/40 p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none rounded-tr-3xl" />
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-cyan-500/10 text-cyan-400 border border-cyan-500/30`}>
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    Syllabus Tracking
                  </h2>
                  <p className="text-slate-500 text-xxs font-mono uppercase tracking-wider mt-0.5">// ACTIVE PROGRESS CHECKLIST</p>
                </div>
              </div>
              
              {started && (
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Progress</div>
                  <div className="text-2xl font-black text-cyan-400">{progress}%</div>
                </div>
              )}
            </div>

            {!started ? (
              <div className="text-center p-6 bg-slate-950/60 border border-white/5 rounded-2xl">
                <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-3 animate-pulse" />
                <h4 className="text-base font-bold text-white uppercase tracking-wider mb-2">Track Your Learnings</h4>
                <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto mb-4">
                  Start learning this course path to unlock the dynamic module completion checklists and track your skills!
                </p>
                <button
                  onClick={handleStartCourse}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-md text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300"
                >
                  Unlock Progress Tracker
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Checklist items */}
                <div className="space-y-3">
                  {[
                    "Module 1: Foundational Principles & Core Concepts",
                    "Module 2: Intermediate Architecture & Applied Case Studies",
                    "Module 3: Deep Technical Integration & Tooling Basics",
                    "Module 4: Advanced Optimizations & Real-world Workflows",
                    "Module 5: Capstone Application Development & Industry Readiness"
                  ].map((moduleName, idx) => {
                    const isChecked = completedModules.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => handleToggleModule(idx)}
                        className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-4 ${isChecked ? 'bg-cyan-950/20 border-cyan-500/30 text-white' : 'bg-slate-950/50 border-white/5 text-slate-400 hover:border-white/15'}`}
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'border-slate-700'}`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3] text-slate-950" />}
                        </div>
                        <span className="text-xs font-semibold tracking-wide uppercase font-mono">{moduleName}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>

          {sections.map((section, idx) => (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: idx * 0.1 }}
              key={section.title}
              className="backdrop-blur-md bg-slate-900/40 p-8 rounded-3xl border border-white/10 shadow-2xl relative"
            >
              {/* Flares */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none rounded-tr-3xl" />

              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme.iconBg}`}>
                  {section.icon}
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  {section.title}
                </h2>
              </div>
              
              <div className="text-slate-300 font-medium leading-relaxed">
                {typeof section.content === 'string' ? (
                  <p className="text-lg leading-relaxed text-slate-300">{section.content}</p>
                ) : (
                  section.content
                )}
              </div>

              {section.details && (
                <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-white/5">
                  {section.details.map(d => (
                    <div key={d.label} className="bg-slate-950/80 border border-white/5 px-4 py-3 rounded-xl flex items-center gap-3">
                      <div className="text-slate-500">
                        {d.icon}
                      </div>
                      <div className="leading-none">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">{d.label}</span>
                        <p className="text-sm font-bold text-slate-300">{d.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.section>
          ))}
        </div>

        {/* Right Column - Top Colleges & Environment */}
        <div className="space-y-8">
           {/* Top Colleges Glow Card */}
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative group overflow-hidden"
           >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${theme.accent} rounded-3xl blur opacity-25 group-hover:opacity-45 transition duration-500`} />
              
              <div className="relative bg-slate-900 p-8 rounded-3xl text-white shadow-2xl overflow-hidden">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                  <MapPin size={20} className="text-cyan-400 animate-bounce" /> Top Colleges
                </h3>
                <div className="space-y-3">
                  {course.topColleges.map(college => (
                    <div key={college} className="flex items-center gap-3 bg-white/5 border border-white/5 p-3.5 rounded-2xl backdrop-blur-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="text-sm font-semibold text-slate-200">{college}</span>
                    </div>
                  ))}
                </div>
              </div>
           </motion.div>

           {/* Work Environment Card */}
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl relative"
           >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none rounded-tr-3xl" />
              
              <h3 className="text-xl font-black text-white mb-6">Work Environment</h3>
              <div className="p-5 bg-slate-950/80 border border-white/5 rounded-2xl flex items-center gap-4">
                 <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-cyan-400 border border-white/5 shadow-sm">
                   <Users size={24} />
                 </div>
                 <div>
                   <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">Type</span>
                   <p className="text-lg font-black text-white">{course.workEnvironment}</p>
                 </div>
              </div>
              
              <div className="mt-8 border-t border-white/5 pt-6">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Future Prospects</span>
                <p className="text-slate-300 font-semibold leading-relaxed italic text-sm">
                  "{course.futureScope}"
                </p>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
