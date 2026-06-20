// ============================================================
// CURVEURCAREER — PHASE 3 LEARNING STATE HOOK
// Central hook for all learning-related localStorage operations.
// Manages enrollment, progress, XP, badges, streaks, roadmap.
// ============================================================
import { useState, useEffect, useCallback } from 'react';
import { BADGES, ROADMAP_STAGES, XP_REWARDS, getLevelFromXP } from '../data/learningData';

const STORAGE_KEY = 'curveurcareer_learning_v3';

const defaultState = () => ({
  enrolledCourses: {},     // { courseId: { enrolledAt, progress, completedLessons: [], lastAccessed } }
  completedProjects: [],   // ['python_proj_1', ...]
  startedProjects: [],
  totalXP: 0,
  earnedBadges: [],        // ['first_course', ...]
  streak: 0,
  lastActiveDate: null,
  roadmapStage: 1,
});

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    console.warn('Failed to save learning state to localStorage');
  }
};

// Compute aggregate stats for badge checking
const computeStats = (state) => ({
  enrolledCourses: Object.keys(state.enrolledCourses).length,
  completedLessons: Object.values(state.enrolledCourses).reduce(
    (total, c) => total + (c.completedLessons?.length || 0), 0
  ),
  completedCourses: Object.entries(state.enrolledCourses)
    .filter(([, c]) => c.progress >= 100)
    .map(([id]) => id),
  totalXP: state.totalXP,
  completedProjects: state.completedProjects.length,
  streak: state.streak,
  roadmapStage: state.roadmapStage,
});

// Compute which new badges were earned
const computeNewBadges = (stats, existingBadges) => {
  const newlyEarned = [];
  for (const badge of BADGES) {
    if (!existingBadges.includes(badge.id) && badge.condition(stats)) {
      newlyEarned.push(badge);
    }
  }
  return newlyEarned;
};

// Compute roadmap stage from enrolled course lesson counts
const computeRoadmapStage = (enrolledCourses) => {
  let highestUnlocked = 1;
  for (const stage of ROADMAP_STAGES) {
    const allMet = stage.requiredCourses.every((courseId) => {
      const course = enrolledCourses[courseId];
      return course && (course.completedLessons?.length || 0) >= stage.requiredLessonsPerCourse;
    });
    if (allMet) highestUnlocked = Math.max(highestUnlocked, stage.id + 1);
  }
  return Math.min(highestUnlocked, ROADMAP_STAGES.length);
};

// Update streak based on last active date
const updateStreak = (state) => {
  const today = new Date().toDateString();
  const last = state.lastActiveDate;
  if (last === today) return state; // already counted today

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const wasYesterday = last === yesterday.toDateString();

  return {
    ...state,
    streak: wasYesterday ? state.streak + 1 : 1,
    lastActiveDate: today,
  };
};

const useLearning = () => {
  const [state, setState] = useState(() => loadState());
  const [recentBadges, setRecentBadges] = useState([]);
  const [xpAnimation, setXpAnimation] = useState(null);  // { amount, message }

  // Persist to localStorage whenever state changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Update streak on hook mount (daily login)
  useEffect(() => {
    setState((prev) => updateStreak(prev));
  }, []);

  // ----- Internal helper to award XP and check badges -----
  const _awardXP = useCallback((amount, message, updater) => {
    setState((prev) => {
      const updated = updater(prev);
      const newXP = (updated.totalXP || 0) + amount;
      const stats = computeStats({ ...updated, totalXP: newXP });
      const newBadges = computeNewBadges(stats, updated.earnedBadges || []);
      const newRoadmapStage = computeRoadmapStage(updated.enrolledCourses || {});

      if (newBadges.length > 0) {
        setRecentBadges((prev) => [...prev, ...newBadges]);
      }

      if (amount > 0) {
        setXpAnimation({ amount, message });
        setTimeout(() => setXpAnimation(null), 2500);
      }

      return {
        ...updated,
        totalXP: newXP,
        earnedBadges: [...(updated.earnedBadges || []), ...newBadges.map((b) => b.id)],
        roadmapStage: newRoadmapStage,
      };
    });
  }, []);

  // ----- Enroll in a course -----
  const enrollCourse = useCallback((courseId) => {
    _awardXP(XP_REWARDS.daily_login, 'Enrolled in course!', (prev) => {
      if (prev.enrolledCourses[courseId]) return prev; // already enrolled
      return {
        ...prev,
        enrolledCourses: {
          ...prev.enrolledCourses,
          [courseId]: {
            enrolledAt: new Date().toISOString(),
            progress: 0,
            completedLessons: [],
            lastAccessed: new Date().toISOString(),
          },
        },
      };
    });
  }, [_awardXP]);

  // ----- Complete a lesson -----
  const completeLesson = useCallback((courseId, lessonId, totalLessonsInCourse) => {
    setState((prev) => {
      const courseData = prev.enrolledCourses[courseId] || {
        enrolledAt: new Date().toISOString(),
        progress: 0,
        completedLessons: [],
        lastAccessed: new Date().toISOString(),
      };

      if (courseData.completedLessons.includes(lessonId)) {
        // Already completed — no change
        return prev;
      }

      const newCompleted = [...courseData.completedLessons, lessonId];
      const newProgress = Math.round((newCompleted.length / totalLessonsInCourse) * 100);
      const isCourseComplete = newProgress >= 100;
      const xpGained = XP_REWARDS.lesson_complete + (isCourseComplete ? XP_REWARDS.course_complete : 0);

      const updated = {
        ...prev,
        totalXP: prev.totalXP + xpGained,
        enrolledCourses: {
          ...prev.enrolledCourses,
          [courseId]: {
            ...courseData,
            completedLessons: newCompleted,
            progress: newProgress,
            lastAccessed: new Date().toISOString(),
          },
        },
      };

      const stats = computeStats(updated);
      const newBadges = computeNewBadges(stats, updated.earnedBadges || []);
      const newRoadmapStage = computeRoadmapStage(updated.enrolledCourses);

      if (newBadges.length > 0) {
        setRecentBadges((prev) => [...prev, ...newBadges]);
      }

      setXpAnimation({ amount: xpGained, message: isCourseComplete ? 'Course Complete!' : 'Lesson Complete!' });
      setTimeout(() => setXpAnimation(null), 2500);

      return {
        ...updated,
        earnedBadges: [...(updated.earnedBadges || []), ...newBadges.map((b) => b.id)],
        roadmapStage: newRoadmapStage,
      };
    });
  }, []);

  // ----- Project actions -----
  const startProject = useCallback((projectId) => {
    setState((prev) => ({
      ...prev,
      startedProjects: prev.startedProjects.includes(projectId)
        ? prev.startedProjects
        : [...prev.startedProjects, projectId],
    }));
  }, []);

  const completeProject = useCallback((projectId, xpReward) => {
    _awardXP(xpReward, 'Project Complete!', (prev) => ({
      ...prev,
      startedProjects: prev.startedProjects.includes(projectId) ? prev.startedProjects : [...prev.startedProjects, projectId],
      completedProjects: prev.completedProjects.includes(projectId)
        ? prev.completedProjects
        : [...prev.completedProjects, projectId],
    }));
  }, [_awardXP]);

  // ----- Dismiss a recent badge -----
  const dismissBadge = useCallback((badgeId) => {
    setRecentBadges((prev) => prev.filter((b) => b.id !== badgeId));
  }, []);

  // ----- Computed getters -----
  const getCourseProgress = useCallback((courseId) => {
    const c = state.enrolledCourses[courseId];
    return c ? { progress: c.progress, completedLessons: c.completedLessons } : null;
  }, [state.enrolledCourses]);

  const isEnrolled = useCallback((courseId) => Boolean(state.enrolledCourses[courseId]), [state.enrolledCourses]);
  const isLessonComplete = useCallback((courseId, lessonId) => {
    return state.enrolledCourses[courseId]?.completedLessons?.includes(lessonId) || false;
  }, [state.enrolledCourses]);

  const getLevel = useCallback(() => getLevelFromXP(state.totalXP), [state.totalXP]);

  const getTotalStats = useCallback(() => computeStats(state), [state]);

  const getRoadmapProgress = useCallback((stageId) => {
    const stage = ROADMAP_STAGES.find((s) => s.id === stageId);
    if (!stage) return { percent: 0, isUnlocked: false, isComplete: false };

    const isUnlocked = stageId <= state.roadmapStage;
    const isComplete = stage.requiredCourses.every((courseId) => {
      const c = state.enrolledCourses[courseId];
      return c && (c.completedLessons?.length || 0) >= stage.requiredLessonsPerCourse;
    });

    const totalRequired = stage.requiredCourses.length * stage.requiredLessonsPerCourse;
    const totalDone = stage.requiredCourses.reduce((sum, courseId) => {
      const c = state.enrolledCourses[courseId];
      return sum + Math.min(c?.completedLessons?.length || 0, stage.requiredLessonsPerCourse);
    }, 0);

    return {
      percent: Math.round((totalDone / totalRequired) * 100),
      isUnlocked,
      isComplete,
    };
  }, [state]);

  // ----- Clear all data (for logout) -----
  const clearAllProgress = useCallback(() => {
    const fresh = defaultState();
    setState(fresh);
    saveState(fresh);
    localStorage.removeItem('curveurcareer_course_progress'); // Legacy key cleanup
  }, []);

  return {
    // State
    state,
    enrolledCourses: state.enrolledCourses,
    totalXP: state.totalXP,
    streak: state.streak,
    earnedBadges: state.earnedBadges,
    roadmapStage: state.roadmapStage,
    startedProjects: state.startedProjects,
    completedProjects: state.completedProjects,

    // Notifications
    recentBadges,
    xpAnimation,
    dismissBadge,

    // Actions
    enrollCourse,
    completeLesson,
    startProject,
    completeProject,
    clearAllProgress,

    // Computed
    getCourseProgress,
    isEnrolled,
    isLessonComplete,
    getLevel,
    getTotalStats,
    getRoadmapProgress,
  };
};

export default useLearning;
