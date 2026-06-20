import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, BookOpen, Trophy, Map, LayoutGrid, Zap, Flame,
  ChevronRight, Lock, Check, BarChart3, Clock, Target,
  Star, Award, TrendingUp, Code2, Database, Coffee,
} from 'lucide-react';
import { coursesData } from '../../data/coursesData';
import { ROADMAP_STAGES, BADGES } from '../../data/learningData';
import useLearning from '../../hooks/useLearning';
import RoadmapEngine, { StageDetailCard } from '../../components/RoadmapEngine';
import GamificationBar from '../../components/GamificationBar';
import { BadgeNotificationManager, XPPopup } from '../../components/AchievementPopup';

// ---------------------------------------------------------------
// CORE COURSES (only the 5 coding courses are shown in the hub)
// ---------------------------------------------------------------
const CORE_COURSE_IDS = ['python', 'c', 'cplusplus', 'java', 'mysql'];
const coreCourses = coursesData.filter((c) => CORE_COURSE_IDS.includes(c.id));

// Course color map
const COURSE_COLORS = {
  python: '#f59e0b',
  c: '#6366f1',
  cplusplus: '#8b5cf6',
  java: '#ef4444',
  mysql: '#10b981',
};

const COURSE_ICONS = {
  python: Coffee,
  c: Code2,
  cplusplus: Code2,
  java: Code2,
  mysql: Database,
};

// Tabs
const TABS = [
  { id: 'discover',  label: 'Discover',    icon: LayoutGrid },
  { id: 'learning',  label: 'My Learning',  icon: BookOpen },
  { id: 'roadmap',   label: 'Career Roadmap', icon: Map },
  { id: 'badges',    label: 'Achievements', icon: Trophy },
  { id: 'stats',     label: 'Analytics',    icon: BarChart3 },
];

// ========================== DISCOVER TAB ==========================
const DiscoverTab = ({ enrolledCourses, isEnrolled, onEnroll, navigate }) => (
  <div>
    <div className="mb-6">
      <h2 className="text-xl font-bold text-white mb-1">Available Courses</h2>
      <p className="text-slate-400 text-sm">Master these foundational programming skills to unlock your career roadmap.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {coreCourses.map((course, idx) => {
        const color = COURSE_COLORS[course.id] || '#6366f1';
        const CourseIcon = COURSE_ICONS[course.id] || Code2;
        const enrolled = isEnrolled(course.id);
        const totalLessons = course.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0;

        return (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="group relative rounded-2xl border bg-slate-900/50 hover:bg-slate-800/50 transition-all duration-300 overflow-hidden cursor-pointer"
            style={{
              borderColor: enrolled ? `${color}40` : 'rgba(255,255,255,0.08)',
              boxShadow: enrolled ? `0 0 20px ${color}15` : 'none',
            }}
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            {/* Glow bg */}
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none transition-opacity group-hover:opacity-20"
              style={{ background: color }}
            />

            <div className="relative p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0"
                  style={{ borderColor: `${color}40`, background: `${color}15` }}
                >
                  <CourseIcon size={22} style={{ color }} />
                </div>

                <div className="flex items-center gap-2">
                  {enrolled && (
                    <div
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border"
                      style={{ borderColor: `${color}40`, color, background: `${color}15` }}
                    >
                      Enrolled
                    </div>
                  )}
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2 py-1 bg-slate-800 rounded-lg">
                    {course.difficulty}
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-white mb-2 leading-snug">{course.name}</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">{course.description}</p>

              {/* Stats row */}
              <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock size={11} />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen size={11} />
                  {totalLessons} lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap size={11} className="text-yellow-500" />
                  {course.totalXP} XP
                </span>
              </div>

              {/* Skills chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {(course.skillsGained || []).slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md text-[10px] font-semibold border"
                    style={{ borderColor: `${color}25`, color, background: `${color}10` }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!enrolled) onEnroll(course.id);
                  navigate(`/courses/${course.id}`);
                }}
                className="w-full py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{
                  background: enrolled ? `${color}15` : `linear-gradient(135deg, ${color}, ${color}90)`,
                  color: enrolled ? color : 'white',
                  border: enrolled ? `1px solid ${color}40` : 'none',
                  boxShadow: !enrolled ? `0 4px 15px ${color}30` : 'none',
                }}
              >
                {enrolled ? 'Continue Learning' : 'Start Course'}
                <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

// ========================== MY LEARNING TAB ==========================
const MyLearningTab = ({ enrolledCourses, getCourseProgress, navigate }) => {
  const enrolledIds = Object.keys(enrolledCourses);

  if (enrolledIds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
          <BookOpen size={28} className="text-slate-600" />
        </div>
        <h3 className="text-white font-bold mb-2">No courses yet</h3>
        <p className="text-slate-500 text-sm mb-6">Enroll in a course from the Discover tab to start learning.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-white mb-1">My Learning</h2>
        <p className="text-slate-400 text-sm">{enrolledIds.length} course{enrolledIds.length !== 1 ? 's' : ''} in progress.</p>
      </div>

      {enrolledIds.map((courseId) => {
        const course = coreCourses.find((c) => c.id === courseId);
        if (!course) return null;
        const color = COURSE_COLORS[courseId] || '#6366f1';
        const progress = getCourseProgress(courseId);
        const pct = progress?.progress || 0;
        const completedLessons = progress?.completedLessons?.length || 0;
        const totalLessons = course.modules?.reduce((s, m) => s + (m.lessons?.length || 0), 0) || 0;
        const CourseIcon = COURSE_ICONS[courseId] || Code2;

        return (
          <motion.div
            key={courseId}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="group p-5 rounded-2xl border bg-slate-900/50 hover:bg-slate-800/40 transition-all cursor-pointer"
            style={{ borderColor: `${color}30` }}
            onClick={() => navigate(`/courses/${courseId}`)}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0"
                style={{ borderColor: `${color}40`, background: `${color}15` }}
              >
                <CourseIcon size={22} style={{ color }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-white font-bold text-sm">{course.name}</h3>
                  <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-1.5">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span>{completedLessons}/{totalLessons} lessons</span>
                  <span className="flex items-center gap-1">
                    <Zap size={10} className="text-yellow-500" fill="currentColor" />
                    {course.totalXP} XP total
                  </span>
                </div>
              </div>

              <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// ========================== ROADMAP TAB ==========================
const RoadmapTab = ({ roadmapStage, getRoadmapProgress }) => {
  const [selectedStage, setSelectedStage] = useState(null);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-1">Your Career Roadmap</h2>
        <p className="text-slate-400 text-sm">
          Complete courses to unlock each stage of your career journey. Currently at Stage {roadmapStage}.
        </p>
      </div>

      <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 mb-6">
        <RoadmapEngine
          currentStage={roadmapStage}
          getStageProgress={getRoadmapProgress}
          onStageClick={setSelectedStage}
        />
      </div>

      <AnimatePresence>
        {selectedStage && (
          <StageDetailCard
            stage={selectedStage}
            stageProgress={getRoadmapProgress(selectedStage.id)}
            onClose={() => setSelectedStage(null)}
          />
        )}
      </AnimatePresence>

      {/* Roadmap stages list */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {ROADMAP_STAGES.map((stage) => {
          const sp = getRoadmapProgress(stage.id);
          return (
            <div
              key={stage.id}
              className="p-4 rounded-xl border bg-slate-900/40 cursor-pointer hover:bg-slate-800/40 transition-all"
              style={{ borderColor: sp.isUnlocked ? `${stage.color}30` : '#1e293b' }}
              onClick={() => setSelectedStage(stage)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-base border"
                  style={{
                    borderColor: sp.isComplete ? '#10b981' : sp.isUnlocked ? `${stage.color}40` : '#374151',
                    background: sp.isComplete ? '#10b98120' : sp.isUnlocked ? `${stage.color}15` : 'transparent',
                  }}
                >
                  {sp.isComplete ? <Check size={14} className="text-emerald-400" /> : sp.isUnlocked ? stage.icon : <Lock size={12} className="text-slate-600" />}
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: sp.isUnlocked ? 'white' : '#475569' }}>
                    {stage.title}
                  </div>
                  <div className="text-[11px]" style={{ color: sp.isUnlocked ? stage.color : '#374151' }}>
                    {stage.subtitle}
                  </div>
                </div>
                <div className="ml-auto text-xs font-bold" style={{ color: sp.isUnlocked ? stage.color : '#374151' }}>
                  {sp.percent}%
                </div>
              </div>
              {sp.isUnlocked && (
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ background: stage.color, width: `${sp.percent}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ========================== BADGES TAB ==========================
const BadgesTab = ({ earnedBadges }) => (
  <div>
    <div className="mb-6">
      <h2 className="text-xl font-bold text-white mb-1">Achievements</h2>
      <p className="text-slate-400 text-sm">{earnedBadges.length} badge{earnedBadges.length !== 1 ? 's' : ''} earned. Complete milestones to unlock more.</p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {BADGES.map((badge) => {
        const isEarned = earnedBadges.includes(badge.id);
        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center p-4 rounded-2xl border transition-all"
            style={{
              borderColor: isEarned ? `${badge.color}40` : '#1e293b',
              background: isEarned ? `${badge.color}08` : 'rgba(15,23,42,0.5)',
              boxShadow: isEarned ? `0 0 20px ${badge.color}15` : 'none',
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 border"
              style={{
                borderColor: isEarned ? `${badge.color}50` : '#374151',
                background: isEarned ? `${badge.color}20` : '#0f172a',
              }}
            >
              <Award size={26} style={{ color: isEarned ? badge.color : '#374151' }} />
            </div>
            <div className="text-sm font-bold mb-1" style={{ color: isEarned ? 'white' : '#475569' }}>
              {badge.name}
            </div>
            <div className="text-[11px] leading-relaxed" style={{ color: isEarned ? '#94a3b8' : '#374151' }}>
              {badge.description}
            </div>
            {!isEarned && (
              <div className="mt-2 flex items-center gap-1">
                <Lock size={10} className="text-slate-700" />
                <span className="text-[10px] text-slate-700">Locked</span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  </div>
);

// ========================== STATS TAB ==========================
const StatsTab = ({ totalXP, streak, enrolledCourses, earnedBadges, getCourseProgress, getLevel }) => {
  const level = getLevel();
  const enrolledIds = Object.keys(enrolledCourses);

  const completedCourses = enrolledIds.filter((id) => {
    const p = getCourseProgress(id);
    return p?.progress >= 100;
  });

  const totalLessonsCompleted = enrolledIds.reduce((sum, id) => {
    const p = getCourseProgress(id);
    return sum + (p?.completedLessons?.length || 0);
  }, 0);

  const stats = [
    { label: 'Total XP', value: totalXP.toLocaleString(), suffix: 'XP', color: '#f59e0b', icon: Zap },
    { label: 'Current Level', value: level.level, suffix: level.title, color: level.color, icon: Star },
    { label: 'Day Streak', value: streak, suffix: 'days', color: '#f97316', icon: Flame },
    { label: 'Courses Enrolled', value: enrolledIds.length, suffix: `of ${coreCourses.length}`, color: '#6366f1', icon: BookOpen },
    { label: 'Courses Completed', value: completedCourses.length, suffix: 'completed', color: '#10b981', icon: Check },
    { label: 'Lessons Finished', value: totalLessonsCompleted, suffix: 'lessons', color: '#0ea5e9', icon: Target },
    { label: 'Badges Earned', value: earnedBadges.length, suffix: `of ${BADGES.length}`, color: '#8b5cf6', icon: Award },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">Your Analytics</h2>
        <p className="text-slate-400 text-sm">A detailed view of your learning progress and performance.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="p-4 rounded-2xl border bg-slate-900/40"
              style={{ borderColor: `${stat.color}25` }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 border"
                style={{ borderColor: `${stat.color}40`, background: `${stat.color}15` }}
              >
                <Icon size={16} style={{ color: stat.color }} />
              </div>
              <div className="text-2xl font-black text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-slate-500 leading-tight">
                {stat.suffix}<br />
                <span className="text-[11px]" style={{ color: stat.color }}>{stat.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Per-course progress */}
      {enrolledIds.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Course Progress</h3>
          <div className="flex flex-col gap-3">
            {enrolledIds.map((courseId) => {
              const course = coreCourses.find((c) => c.id === courseId);
              if (!course) return null;
              const color = COURSE_COLORS[courseId] || '#6366f1';
              const p = getCourseProgress(courseId);
              const pct = p?.progress || 0;
              const lessons = p?.completedLessons?.length || 0;
              const total = course.modules?.reduce((s, m) => s + (m.lessons?.length || 0), 0) || 0;

              return (
                <div key={courseId} className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-slate-900/30">
                  <div className="text-sm font-bold text-white w-40 truncate flex-shrink-0">{course.name}</div>
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <div className="text-xs text-slate-400 w-16 text-right flex-shrink-0">
                    {lessons}/{total}
                  </div>
                  <div className="text-xs font-bold w-10 text-right flex-shrink-0" style={{ color }}>
                    {pct}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ========================== MAIN COMPONENT ==========================
const LearningDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discover');
  const {
    enrolledCourses, totalXP, streak, earnedBadges, roadmapStage,
    recentBadges, xpAnimation, dismissBadge,
    isEnrolled, enrollCourse, getCourseProgress, getRoadmapProgress, getLevel,
  } = useLearning();

  const isLoggedIn = Boolean(localStorage.getItem('user'));

  const handleEnroll = useCallback((courseId) => {
    enrollCourse(courseId);
  }, [enrollCourse]);

  const levelInfo = getLevel();

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293706_1px,transparent_1px),linear-gradient(to_bottom,#1f293706_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Gamification bar — only when enrolled */}
      {isLoggedIn && Object.keys(enrolledCourses).length > 0 && (
        <GamificationBar totalXP={totalXP} streak={streak} />
      )}

      {/* Notifications */}
      <BadgeNotificationManager recentBadges={recentBadges} onDismiss={dismissBadge} />
      <XPPopup xpAnimation={xpAnimation} />

      {/* Hero header */}
      <div className="relative pt-20 pb-8 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3"
              >
                <BookOpen size={12} />
                Learning Ecosystem
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-black text-white leading-tight"
              >
                Your Learning
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Hub
                </span>
              </motion.h1>
            </div>

            {/* Level card */}
            {isLoggedIn && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-sm"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border-2"
                  style={{ borderColor: levelInfo.color, background: `${levelInfo.color}20`, color: levelInfo.color, boxShadow: `0 0 20px ${levelInfo.color}30` }}
                >
                  {levelInfo.level}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{levelInfo.title}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Zap size={11} className="text-yellow-400" fill="currentColor" />
                    <span className="text-yellow-400 font-bold text-xs">{totalXP.toLocaleString()} XP</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Flame size={11} className="text-orange-400" fill="currentColor" />
                    <span className="text-orange-400 text-xs">{streak} day streak</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {TABS.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0"
                  style={{
                    background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                    color: isActive ? '#818cf8' : '#64748b',
                    border: isActive ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                  }}
                >
                  <TabIcon size={13} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'discover' && (
              <DiscoverTab
                enrolledCourses={enrolledCourses}
                isEnrolled={isEnrolled}
                onEnroll={handleEnroll}
                navigate={navigate}
              />
            )}
            {activeTab === 'learning' && (
              <MyLearningTab
                enrolledCourses={enrolledCourses}
                getCourseProgress={getCourseProgress}
                navigate={navigate}
              />
            )}
            {activeTab === 'roadmap' && (
              <RoadmapTab roadmapStage={roadmapStage} getRoadmapProgress={getRoadmapProgress} />
            )}
            {activeTab === 'badges' && (
              <BadgesTab earnedBadges={earnedBadges} />
            )}
            {activeTab === 'stats' && (
              <StatsTab
                totalXP={totalXP}
                streak={streak}
                enrolledCourses={enrolledCourses}
                earnedBadges={earnedBadges}
                getCourseProgress={getCourseProgress}
                getLevel={getLevel}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LearningDashboard;
