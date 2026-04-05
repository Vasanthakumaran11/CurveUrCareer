import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, DollarSign, Briefcase, 
  GraduationCap, TrendingUp, Users, Calendar, 
  MapPin, ShieldCheck, Bookmark
} from 'lucide-react';
import { coursesData } from '../../data/coursesData';
import { motion } from 'framer-motion';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <div className="text-center">
          <ShieldCheck size={64} className="mx-auto text-red-500 mb-6" />
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2 tracking-tight">Course Not Found</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">The course you are looking for does not exist or has been removed.</p>
          <button 
            onClick={() => navigate('/learning')}
            className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
           Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    { 
      title: "Course Overview", 
      icon: <GraduationCap className="text-blue-500" />, 
      content: course.description,
      details: [
        { label: "Duration", value: course.duration, icon: <Calendar size={14} /> },
        { label: "Stream", value: course.stream, icon: <Bookmark size={14} /> }
      ]
    },
    { 
      title: "Eligibility Criteria", 
      icon: <CheckCircle2 className="text-emerald-500" />, 
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {course.eligibility.subjects.map(s => (
              <span key={s} className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-bold ring-1 ring-emerald-100 dark:ring-emerald-800">
                {s}
              </span>
            ))}
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">
            Minimum Percentage Required: <span className="text-emerald-600 font-bold">{course.eligibility.minPercentage}%</span>
          </p>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Entrance Exams</span>
            <div className="flex flex-wrap gap-2">
              {course.eligibility.entranceExams.map(e => (
                <span key={e} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-bold">
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
      icon: <TrendingUp className="text-purple-500" />, 
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-100 dark:border-purple-800">
            <div className="flex items-center gap-3">
              <DollarSign className="text-purple-600" />
              <span className="text-sm font-bold text-slate-800 dark:text-white">Avg. Salary</span>
            </div>
            <span className="text-lg font-black text-purple-600 tracking-tight">{course.averageSalary}</span>
          </div>
          
          <div className="space-y-3">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <Briefcase size={14} /> Career Paths
             </span>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
               {course.careerPaths.map(path => (
                 <div key={path} className="p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
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
    <div className="min-h-screen bg-[#f8faff] dark:bg-slate-950 pb-20 transition-colors duration-300">
      {/* Dynamic Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-8 pb-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <Link 
            to="/learning" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                 <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                    Professional Course
                 </span>
                 <h1 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tight leading-tight">
                   {course.name}
                 </h1>
              </div>
              <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-200 dark:shadow-none transition-all hover:-translate-y-1">
                Enroll Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          {sections.map((section, idx) => (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={section.title}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                  {section.title}
                </h2>
              </div>
              
              <div className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {typeof section.content === 'string' ? (
                  <p className="text-lg">{section.content}</p>
                ) : (
                  section.content
                )}
              </div>

              {section.details && (
                <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-slate-50 dark:border-slate-800">
                  {section.details.map(d => (
                    <div key={d.label} className="bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-xl flex items-center gap-3">
                      <div className="text-slate-400">
                        {d.icon}
                      </div>
                      <div className="leading-none">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d.label}</span>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{d.value}</p>
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
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden"
           >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                <MapPin size={20} /> Top Colleges
              </h3>
              <div className="space-y-3">
                {course.topColleges.map(college => (
                  <div key={college} className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                    <span className="text-sm font-bold">{college}</span>
                  </div>
                ))}
              </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm"
           >
              <h3 className="text-xl font-black text-slate-800 dark:text-white mb-6">Work Environment</h3>
              <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center gap-4">
                 <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                   <Users size={24} />
                 </div>
                 <div>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Type</span>
                   <p className="text-lg font-black text-slate-800 dark:text-white">{course.workEnvironment}</p>
                 </div>
              </div>
              <div className="mt-8">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Future Scope</span>
                <p className="text-slate-600 dark:text-slate-400 font-bold leading-snug italic">
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
