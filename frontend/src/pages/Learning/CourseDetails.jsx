import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ChevronDown, ChevronUp, Check, Lock, Zap, Clock,
  BookOpen, Target, CheckCircle2, Play, Code2, Database, Coffee,
  Briefcase, GraduationCap, TrendingUp, Star, Award,
  ChevronRight, AlertCircle,
} from 'lucide-react';
import { coursesData } from '../../data/coursesData';
import useLearning from '../../hooks/useLearning';
import LessonPlayer from '../../components/LessonPlayer';
import { BadgeNotificationManager, XPPopup } from '../../components/AchievementPopup';

// -------------------------------------------------------
// COURSE DETAILS PAGE — Interactive course player
// Module accordion + lesson list + lesson player modal
// -------------------------------------------------------

const COURSE_COLORS = {
  python: '#f59e0b',
  c: '#6366f1',
  cplusplus: '#8b5cf6',
  java: '#ef4444',
  mysql: '#10b981',
};

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = useMemo(() => coursesData.find((c) => c.id === courseId), [courseId]);
  const color = COURSE_COLORS[courseId] || '#6366f1';

  const [openModules, setOpenModules] = useState({ 0: true }); // first module open by default
  const [activeLesson, setActiveLesson] = useState(null);      // currently playing lesson
  const [activeModule, setActiveModule] = useState(null);       // lesson's parent module

  const {
    isEnrolled, enrollCourse, isLessonComplete, completeLesson,
    getCourseProgress, recentBadges, xpAnimation, dismissBadge,
  } = useLearning();

  const enrolled = isEnrolled(courseId);
  const progress = getCourseProgress(courseId);
  const pct = progress?.progress || 0;

  const totalLessons = useMemo(
    () => course?.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0,
    [course],
  );

  const completedCount = progress?.completedLessons?.length || 0;

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={40} className="text-red-400 mx-auto mb-4" />
          <div className="text-xl font-bold mb-2">Course Not Found</div>
          <button onClick={() => navigate('/learning')} className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
            Back to Learning Hub
          </button>
        </div>
      </div>
    );
  }

  const toggleModule = (idx) => {
    setOpenModules((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleStartLesson = (lesson, module) => {
    if (!enrolled) {
      enrollCourse(courseId);
    }
    setActiveLesson(lesson);
    setActiveModule(module);
  };

  const handleLessonComplete = (lessonId, xpReward) => {
    completeLesson(courseId, lessonId, totalLessons);
    setActiveLesson(null);
    setActiveModule(null);
  };

  const handleEnroll = () => {
    enrollCourse(courseId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.10),transparent)]" />

      {/* Notifications */}
      <BadgeNotificationManager recentBadges={recentBadges} onDismiss={dismissBadge} />
      <XPPopup xpAnimation={xpAnimation} />

      {/* Lesson Player Modal */}
      <AnimatePresence>
        {activeLesson && (
          <LessonPlayer
            lesson={activeLesson}
            courseId={courseId}
            totalLessonsInCourse={totalLessons}
            onComplete={handleLessonComplete}
            onClose={() => { setActiveLesson(null); setActiveModule(null); }}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative border-b border-white/5 pb-8 pt-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate('/learning')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-all mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Hub</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border-2"
              style={{ borderColor: `${color}50`, background: `${color}15`, boxShadow: `0 0 30px ${color}25` }}
            >
              {courseId === 'mysql'
                ? <Database size={28} style={{ color }} />
                : courseId === 'python'
                ? <Coffee size={28} style={{ color }} />
                : <Code2 size={28} style={{ color }} />
              }
            </div>

            <div className="flex-1 min-w-0">
              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border"
                  style={{ borderColor: `${color}40`, color, background: `${color}15` }}
                >
                  {course.difficulty}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold text-slate-400 bg-slate-800 border border-white/5">
                  {course.stream}
                </span>
                {enrolled && (
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    Enrolled
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">{course.name}</h1>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-xl">{course.description}</p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-5">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen size={12} />
                  {totalLessons} lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap size={12} className="text-yellow-400" fill="currentColor" />
                  <span className="text-yellow-400 font-semibold">{course.totalXP} XP total</span>
                </span>
              </div>

              {/* Progress bar (when enrolled) */}
              {enrolled && (
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Progress</span>
                    <span className="font-bold" style={{ color }}>{completedCount}/{totalLessons} lessons ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              )}

              {/* Enroll CTA */}
              {!enrolled && (
                <button
                  onClick={handleEnroll}
                  className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 flex items-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${color}90)`,
                    color: 'white',
                    boxShadow: `0 4px 20px ${color}30`,
                  }}
                >
                  <Play size={14} />
                  Enroll and Start Learning
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT: Module/Lesson accordion */}
          <div className="md:col-span-2">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen size={16} style={{ color }} />
              Course Content
            </h2>

            {course.modules?.map((module, mIdx) => {
              const isOpen = openModules[mIdx];
              const moduleLessonsComplete = module.lessons?.filter(
                (l) => isLessonComplete(courseId, l.id)
              ).length || 0;
              const totalModuleLessons = module.lessons?.length || 0;
              const isModuleComplete = moduleLessonsComplete === totalModuleLessons && totalModuleLessons > 0;

              return (
                <div key={module.id} className="mb-3 rounded-xl border overflow-hidden" style={{ borderColor: isModuleComplete ? `${color}30` : 'rgba(255,255,255,0.06)' }}>
                  {/* Module header */}
                  <button
                    onClick={() => toggleModule(mIdx)}
                    className="w-full flex items-center justify-between p-4 bg-slate-900/60 hover:bg-slate-800/60 transition-all text-left"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black border"
                        style={{
                          borderColor: isModuleComplete ? '#10b981' : `${color}30`,
                          background: isModuleComplete ? '#10b98120' : `${color}10`,
                          color: isModuleComplete ? '#10b981' : color,
                        }}
                      >
                        {isModuleComplete ? <Check size={12} /> : mIdx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white truncate">{module.title}</div>
                        <div className="text-[11px] text-slate-500">{moduleLessonsComplete}/{totalModuleLessons} lessons</div>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp size={14} className="text-slate-500 flex-shrink-0 ml-2" /> : <ChevronDown size={14} className="text-slate-500 flex-shrink-0 ml-2" />}
                  </button>

                  {/* Lessons */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/5 bg-slate-950/40">
                          {module.lessons?.map((lesson, lIdx) => {
                            const isDone = isLessonComplete(courseId, lesson.id);
                            const isLocked = !enrolled && lIdx > 0;

                            return (
                              <div
                                key={lesson.id}
                                className={`flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0 group transition-all ${
                                  !isLocked ? 'cursor-pointer hover:bg-slate-800/30' : 'opacity-50 cursor-not-allowed'
                                }`}
                                onClick={() => !isLocked && handleStartLesson(lesson, module)}
                              >
                                {/* Status icon */}
                                <div
                                  className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 border text-[10px] font-black transition-all"
                                  style={{
                                    borderColor: isDone ? '#10b981' : isLocked ? '#374151' : `${color}40`,
                                    background: isDone ? '#10b98120' : isLocked ? 'transparent' : `${color}10`,
                                    color: isDone ? '#10b981' : isLocked ? '#374151' : color,
                                  }}
                                >
                                  {isDone ? <Check size={11} /> : isLocked ? <Lock size={10} /> : lIdx + 1}
                                </div>

                                {/* Lesson info */}
                                <div className="flex-1 min-w-0">
                                  <div className={`text-sm font-semibold leading-tight truncate ${isDone ? 'text-emerald-300' : 'text-white'}`}>
                                    {lesson.title}
                                  </div>
                                  <div className="flex items-center gap-3 mt-0.5">
                                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                      <Clock size={9} /> {lesson.duration}
                                    </span>
                                    <span className="text-[10px] text-yellow-500 font-semibold flex items-center gap-0.5">
                                      <Zap size={9} fill="currentColor" /> {lesson.xpReward} XP
                                    </span>
                                  </div>
                                </div>

                                {/* Play button */}
                                {!isLocked && (
                                  <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border"
                                    style={{ borderColor: `${color}40`, background: `${color}15` }}
                                  >
                                    {isDone
                                      ? <CheckCircle2 size={13} style={{ color: '#10b981' }} />
                                      : <Play size={11} style={{ color }} fill="currentColor" />
                                    }
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Course info sidebar */}
          <div className="flex flex-col gap-5">

            {/* Career Relevance */}
            {course.careerRelevance && (
              <div className="p-5 rounded-2xl border border-white/8 bg-slate-900/40">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={14} style={{ color }} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Why Learn This</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">{course.careerRelevance}</p>
              </div>
            )}

            {/* Skills you will gain */}
            {course.skillsGained?.length > 0 && (
              <div className="p-5 rounded-2xl border border-white/8 bg-slate-900/40">
                <div className="flex items-center gap-2 mb-3">
                  <Star size={14} style={{ color }} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Skills Gained</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {course.skillsGained.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-semibold border"
                      style={{ borderColor: `${color}30`, color, background: `${color}10` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Learning Outcomes */}
            {course.learningOutcomes?.length > 0 && (
              <div className="p-5 rounded-2xl border border-white/8 bg-slate-900/40">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={14} style={{ color }} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">What You Will Build</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {course.learningOutcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                      <Check size={11} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Career Paths */}
            {course.careerPaths?.length > 0 && (
              <div className="p-5 rounded-2xl border border-white/8 bg-slate-900/40">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={14} style={{ color }} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Career Paths</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {course.careerPaths.map((path) => (
                    <div key={path} className="flex items-center gap-2 text-xs text-slate-300">
                      <ChevronRight size={10} style={{ color }} className="flex-shrink-0" />
                      {path}
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-white/5">
                  <div className="text-[11px] text-slate-500">Average Salary</div>
                  <div className="text-sm font-bold" style={{ color }}>{course.averageSalary}</div>
                </div>
              </div>
            )}

            {/* Projects */}
            {course.projects?.length > 0 && (
              <div className="p-5 rounded-2xl border border-white/8 bg-slate-900/40">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={14} style={{ color }} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Practice Projects</span>
                </div>
                <div className="flex flex-col gap-3">
                  {course.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-3 rounded-xl border bg-slate-800/30"
                      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="text-xs font-bold text-white leading-tight">{proj.title}</div>
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 border"
                          style={{ color, borderColor: `${color}30`, background: `${color}10` }}
                        >
                          {proj.level}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 leading-relaxed mb-2">{proj.description}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-yellow-500 font-semibold flex items-center gap-0.5">
                          <Zap size={9} fill="currentColor" /> {proj.xpReward} XP
                        </span>
                        <span className="text-[10px] text-slate-600">{proj.estimatedTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
