// ============================================================
// CURVEURCAREER — PHASE 3 LEARNING ECOSYSTEM DATA
// Gamification config, roadmap stages, badge definitions,
// and skill taxonomy powering the Personalized Learning Hub.
// ============================================================

// ---------------------------------------------------------------------------
// XP Level System
// ---------------------------------------------------------------------------
export const XP_LEVELS = [
  { level: 1,  title: 'Novice',       minXP: 0,    maxXP: 200,   color: '#64748b' },
  { level: 2,  title: 'Learner',      minXP: 200,  maxXP: 500,   color: '#0891b2' },
  { level: 3,  title: 'Apprentice',   minXP: 500,  maxXP: 1000,  color: '#7c3aed' },
  { level: 4,  title: 'Practitioner', minXP: 1000, maxXP: 2000,  color: '#0d9488' },
  { level: 5,  title: 'Developer',    minXP: 2000, maxXP: 3500,  color: '#d97706' },
  { level: 6,  title: 'Engineer',     minXP: 3500, maxXP: 5500,  color: '#059669' },
  { level: 7,  title: 'Specialist',   minXP: 5500, maxXP: 8000,  color: '#dc2626' },
  { level: 8,  title: 'Expert',       minXP: 8000, maxXP: 12000, color: '#9333ea' },
  { level: 9,  title: 'Architect',    minXP: 12000,maxXP: 18000, color: '#0284c7' },
  { level: 10, title: 'Master',       minXP: 18000,maxXP: 99999, color: '#f59e0b' },
];

export const getLevelFromXP = (xp) => {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].minXP) return XP_LEVELS[i];
  }
  return XP_LEVELS[0];
};

export const getXPProgress = (xp) => {
  const current = getLevelFromXP(xp);
  const range = current.maxXP - current.minXP;
  const earned = xp - current.minXP;
  return Math.min(100, Math.round((earned / range) * 100));
};

// ---------------------------------------------------------------------------
// Badge Definitions
// ---------------------------------------------------------------------------
export const BADGES = [
  // Enrollment badges
  { id: 'first_course',     name: 'First Steps',        description: 'Enrolled in your first course.',        icon: 'BookOpen',    color: '#0891b2', condition: (stats) => stats.enrolledCourses >= 1 },
  { id: 'all_courses',      name: 'Full Stack Scholar',  description: 'Enrolled in all 5 core courses.',       icon: 'Library',     color: '#7c3aed', condition: (stats) => stats.enrolledCourses >= 5 },

  // Lesson completion badges
  { id: 'lesson_5',         name: 'Quick Starter',       description: 'Completed 5 lessons.',                  icon: 'Zap',         color: '#f59e0b', condition: (stats) => stats.completedLessons >= 5 },
  { id: 'lesson_15',        name: 'Momentum Builder',    description: 'Completed 15 lessons.',                 icon: 'TrendingUp',  color: '#059669', condition: (stats) => stats.completedLessons >= 15 },
  { id: 'lesson_30',        name: 'Consistent Learner',  description: 'Completed 30 lessons.',                 icon: 'Award',       color: '#0d9488', condition: (stats) => stats.completedLessons >= 30 },
  { id: 'lesson_75',        name: 'Knowledge Seeker',    description: 'Completed 75 lessons.',                 icon: 'Star',        color: '#9333ea', condition: (stats) => stats.completedLessons >= 75 },

  // Course completion badges
  { id: 'course_python',    name: 'Python Certified',    description: 'Completed Python Programming.',         icon: 'Code',        color: '#f59e0b', condition: (stats) => stats.completedCourses.includes('python') },
  { id: 'course_c',         name: 'C Systems Expert',    description: 'Completed C Programming Core.',         icon: 'Cpu',         color: '#0891b2', condition: (stats) => stats.completedCourses.includes('c') },
  { id: 'course_cplusplus', name: 'C++ OOP Master',      description: 'Completed C++ Object Oriented Prog.',  icon: 'Layers',      color: '#7c3aed', condition: (stats) => stats.completedCourses.includes('cplusplus') },
  { id: 'course_java',      name: 'Java Developer',      description: 'Completed Java Development.',           icon: 'Coffee',      color: '#dc2626', condition: (stats) => stats.completedCourses.includes('java') },
  { id: 'course_mysql',     name: 'Database Engineer',   description: 'Completed MySQL Databases.',            icon: 'Database',    color: '#059669', condition: (stats) => stats.completedCourses.includes('mysql') },

  // XP badges
  { id: 'xp_500',          name: 'Rising Star',          description: 'Earned 500 XP.',                       icon: 'Sparkles',    color: '#f59e0b', condition: (stats) => stats.totalXP >= 500 },
  { id: 'xp_2000',         name: 'XP Champion',          description: 'Earned 2000 XP.',                      icon: 'Trophy',      color: '#9333ea', condition: (stats) => stats.totalXP >= 2000 },
  { id: 'xp_5000',         name: 'XP Legend',            description: 'Earned 5000 XP.',                      icon: 'Crown',       color: '#f59e0b', condition: (stats) => stats.totalXP >= 5000 },

  // Project badges
  { id: 'first_project',   name: 'Builder',               description: 'Completed your first project.',        icon: 'Hammer',      color: '#0891b2', condition: (stats) => stats.completedProjects >= 1 },
  { id: 'projects_5',      name: 'Portfolio Builder',     description: 'Completed 5 projects.',                icon: 'Folder',      color: '#7c3aed', condition: (stats) => stats.completedProjects >= 5 },

  // Streak badges
  { id: 'streak_3',        name: 'Three-Day Streak',      description: 'Maintained a 3-day learning streak.',  icon: 'Flame',       color: '#f59e0b', condition: (stats) => stats.streak >= 3 },
  { id: 'streak_7',        name: 'Week Warrior',          description: 'Maintained a 7-day learning streak.',  icon: 'Shield',      color: '#dc2626', condition: (stats) => stats.streak >= 7 },
  { id: 'streak_30',       name: 'Iron Discipline',       description: 'Maintained a 30-day learning streak.', icon: 'Medal',       color: '#9333ea', condition: (stats) => stats.streak >= 30 },

  // Roadmap badges
  { id: 'stage_2',         name: 'Skill Builder',         description: 'Reached Stage 2 of your roadmap.',     icon: 'Map',         color: '#0d9488', condition: (stats) => stats.roadmapStage >= 2 },
  { id: 'stage_4',         name: 'Advanced Learner',      description: 'Reached Stage 4 of your roadmap.',     icon: 'Compass',     color: '#059669', condition: (stats) => stats.roadmapStage >= 4 },
  { id: 'stage_6',         name: 'Career Ready',          description: 'Completed all 6 roadmap stages.',       icon: 'GraduationCap', color: '#f59e0b', condition: (stats) => stats.roadmapStage >= 6 },
];

// ---------------------------------------------------------------------------
// Career Roadmap Stage Definitions
// ---------------------------------------------------------------------------
export const ROADMAP_STAGES = [
  {
    id: 1,
    title: 'Foundations',
    subtitle: 'Build your programming base',
    icon: '01',
    description: 'Establish core programming literacy across C and Python. Understand variables, loops, functions, and problem-solving logic.',
    requiredCourses: ['c', 'python'],
    requiredLessonsPerCourse: 5,
    skills: ['Variables & Data Types', 'Control Flow', 'Functions', 'Basic Algorithms', 'Code Syntax'],
    outcomes: ['Write working programs', 'Understand compilation', 'Solve basic problems'],
    nextAction: 'Complete at least 5 lessons each in C and Python to advance.',
    color: '#0891b2',
  },
  {
    id: 2,
    title: 'Skill Building',
    subtitle: 'Expand into OOP and databases',
    icon: '02',
    description: 'Deepen your technical repertoire with C++ OOP principles, Java development, and core database knowledge with MySQL.',
    requiredCourses: ['cplusplus', 'java', 'mysql'],
    requiredLessonsPerCourse: 5,
    skills: ['Object-Oriented Programming', 'Classes & Inheritance', 'SQL Queries', 'Data Modeling', 'Design Patterns'],
    outcomes: ['Build OOP systems', 'Query databases', 'Design class hierarchies'],
    nextAction: 'Complete the C++, Java, and MySQL foundational modules.',
    color: '#7c3aed',
  },
  {
    id: 3,
    title: 'Projects',
    subtitle: 'Apply skills to real problems',
    icon: '03',
    description: 'Build real-world projects using the skills you have acquired. Apply your code to solve practical problems and begin building your portfolio.',
    requiredCourses: ['c', 'python', 'java'],
    requiredLessonsPerCourse: 10,
    skills: ['Project Architecture', 'Debugging', 'Version Control', 'Documentation', 'Problem Decomposition'],
    outcomes: ['Portfolio projects', 'Debug complex code', 'Architect solutions'],
    nextAction: 'Complete 10 lessons per course and finish at least 2 beginner projects.',
    color: '#059669',
  },
  {
    id: 4,
    title: 'Advanced Learning',
    subtitle: 'Master complex concepts',
    icon: '04',
    description: 'Tackle advanced topics: algorithms, data structures, system design, performance optimization, and multi-paradigm programming.',
    requiredCourses: ['python', 'cplusplus'],
    requiredLessonsPerCourse: 12,
    skills: ['Data Structures', 'Algorithms', 'Memory Optimization', 'Concurrency', 'System Design Basics'],
    outcomes: ['Implement DS&A', 'Write concurrent code', 'Optimize performance'],
    nextAction: 'Reach Module 4 in Python and C++ courses.',
    color: '#d97706',
  },
  {
    id: 5,
    title: 'Internship Ready',
    subtitle: 'Get industry-ready',
    icon: '05',
    description: 'Prepare for technical interviews, build a polished portfolio, understand industry workflows, and practice solving real coding challenges.',
    requiredCourses: ['python', 'java', 'mysql'],
    requiredLessonsPerCourse: 13,
    skills: ['Interview Problem Solving', 'Portfolio Development', 'Git Workflow', 'Code Review', 'API Fundamentals'],
    outcomes: ['Pass technical interviews', 'Present portfolio', 'Work in teams'],
    nextAction: 'Complete all modules in Python, Java, and MySQL.',
    color: '#9333ea',
  },
  {
    id: 6,
    title: 'Career Readiness',
    subtitle: 'Launch your career',
    icon: '06',
    description: 'You are equipped to apply for your first professional role. Finalize your portfolio, practice system design discussions, and target your first position.',
    requiredCourses: ['python', 'c', 'cplusplus', 'java', 'mysql'],
    requiredLessonsPerCourse: 15,
    skills: ['Complete Portfolio', 'System Design', 'Professional Communication', 'Resume Building', 'Job Search Strategy'],
    outcomes: ['Land your first role', 'Complete system design', 'Build professional network'],
    nextAction: 'Complete all 5 core courses fully to reach Career Readiness.',
    color: '#f59e0b',
  },
];

// ---------------------------------------------------------------------------
// Skill Taxonomy — maps skill names to course IDs
// ---------------------------------------------------------------------------
export const SKILL_TAXONOMY = {
  // Python skills
  'Python':               'python',
  'Scripting':            'python',
  'Data Analysis':        'python',
  'Automation':           'python',
  'OOP':                  ['python', 'java', 'cplusplus'],
  'AI/ML Basics':         'python',
  'Pandas':               'python',
  'Flask':                'python',

  // C skills
  'C Programming':        'c',
  'Memory Management':    'c',
  'Pointers':             'c',
  'System Programming':   'c',
  'Embedded Systems':     'c',
  'Compilation':          'c',

  // C++ skills
  'C++':                  'cplusplus',
  'Templates':            'cplusplus',
  'STL':                  'cplusplus',
  'Performance Tuning':   'cplusplus',
  'Polymorphism':         'cplusplus',
  'Game Dev Basics':      'cplusplus',

  // Java skills
  'Java':                 'java',
  'Design Patterns':      'java',
  'Spring Framework':     'java',
  'Enterprise Software':  'java',
  'Android Basics':       'java',
  'Maven/Gradle':         'java',

  // MySQL skills
  'SQL':                  'mysql',
  'MySQL':                'mysql',
  'Database Design':      'mysql',
  'Query Optimization':   'mysql',
  'Relational Modeling':  'mysql',
  'Joins & Indexes':      'mysql',
};

// ---------------------------------------------------------------------------
// Career Path Skill Requirements (for Skill Gap Analyzer)
// ---------------------------------------------------------------------------
export const CAREER_SKILL_REQUIREMENTS = {
  'Software Engineer':       ['Python', 'Java', 'C++', 'OOP', 'Design Patterns', 'SQL', 'Data Structures'],
  'Data Analyst':            ['Python', 'SQL', 'Data Analysis', 'MySQL', 'Pandas', 'Query Optimization'],
  'Backend Developer':       ['Java', 'Python', 'MySQL', 'Design Patterns', 'SQL', 'Enterprise Software', 'Spring Framework'],
  'Systems Programmer':      ['C Programming', 'C++', 'Memory Management', 'Pointers', 'System Programming', 'Performance Tuning'],
  'Database Administrator':  ['SQL', 'MySQL', 'Database Design', 'Query Optimization', 'Relational Modeling', 'Joins & Indexes'],
  'Android Developer':       ['Java', 'OOP', 'Android Basics', 'Design Patterns', 'Maven/Gradle'],
  'Automation Engineer':     ['Python', 'Scripting', 'Automation', 'SQL', 'AI/ML Basics'],
  'Game Developer':          ['C++', 'Game Dev Basics', 'Performance Tuning', 'STL', 'Polymorphism'],
  'Full Stack Developer':    ['Python', 'Java', 'SQL', 'MySQL', 'OOP', 'Design Patterns', 'Flask'],
  'Embedded Engineer':       ['C Programming', 'C++', 'Embedded Systems', 'Memory Management', 'Pointers', 'System Programming'],
};

// ---------------------------------------------------------------------------
// Lesson XP Rewards
// ---------------------------------------------------------------------------
export const XP_REWARDS = {
  lesson_complete:   50,
  quiz_perfect:      30,
  quiz_pass:         15,
  challenge_solved:  25,
  module_complete:   100,
  course_complete:   500,
  project_beginner:  150,
  project_intermediate: 300,
  project_advanced:  500,
  streak_bonus:      20,
  daily_login:       10,
};

export default {
  XP_LEVELS,
  BADGES,
  ROADMAP_STAGES,
  SKILL_TAXONOMY,
  CAREER_SKILL_REQUIREMENTS,
  XP_REWARDS,
  getLevelFromXP,
  getXPProgress,
};
