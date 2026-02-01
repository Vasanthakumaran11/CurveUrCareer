// Multi-factor scoring algorithm for course recommendations
import {
  checkEligibility,
  calculateInterestAlignment,
  calculateSkillsCompatibility,
  calculateExpectationsMatch,
  generateReasoning
} from './careerRules.js';

/**
 * Weights for different factors in recommendation
 * Total = 100%
 */
const WEIGHTS = {
  academic: 0.40,    // 40% - Academic eligibility and performance
  interest: 0.30,    // 30% - Interest alignment
  skills: 0.20,      // 20% - Skills compatibility
  expectations: 0.10 // 10% - Career expectations match
};

/**
 * Apply special recommendation rules based on student profile
 */
const applySpecialRules = (course, formData) => {
  const { academic, skills, constraints } = formData;
  const { skillLevels } = skills;
  
  let boost = 1.0;
  const specialReasons = [];

  // Engineering Check: Science + CS + >85% + Skills > 7.0
  const isEngineeringCourse = ['btech-cse', 'btech-it', 'btech-aiml', 'btech-ds', 'cyber-security', 'robotics-ai'].includes(course.id);
  if (isEngineeringCourse && academic.stream === 'Science' && academic.subjects.includes('Computer Science')) {
    if (academic.percentage > 85 && 
        (skillLevels.technical >= 7 && skillLevels.analytical >= 7 && skillLevels.creative >= 7)) {
      boost = 1.25; // 25% boost
      specialReasons.push("Highly recommended for Engineering due to your strong Computer Science background and excellent technical/analytical skills.");
    }
  }

  // Medical Check: Science + Biology
  const isMedicalCourse = ['mbbs', 'bpharm', 'clinical-psychology'].includes(course.id);
  if (isMedicalCourse && academic.stream === 'Science' && academic.subjects.includes('Biology')) {
    boost = 1.25; // 25% boost
    specialReasons.push("Priority recommendation for Medical field based on your Biology background.");
  }

  // Stream-based prioritization for Arts and Commerce
  if (academic.stream === 'Arts' && course.stream === 'Arts') {
    boost = 1.3; // 30% boost for matching Arts stream
    specialReasons.push("Top recommendation aligned with your Arts stream.");
  }

  if (academic.stream === 'Commerce' && course.stream === 'Commerce') {
    boost = 1.3; // 30% boost for matching Commerce stream
    specialReasons.push("Top recommendation aligned with your Commerce stream.");
  }

  // Government College Recommendation Logic for Engineering
  if (isEngineeringCourse && boost > 1 && (constraints.familyFinancialRange === 'Low' || constraints.familyFinancialRange === 'Medium')) {
    specialReasons.push("We strongly recommend aiming for Government Engineering Colleges (IITs/NITs) to benefit from high-quality education at lower costs.");
  }

  return { boost, specialReasons };
};

/**
 * Calculate comprehensive score for a course
 */
export const calculateCourseScore = (course, formData) => {
  const scores = {
    academic: 0,
    interest: 0,
    skills: 0,
    expectations: 0,
    total: 0,
    specialReasons: []
  };

  // 1. Academic Score (40%)
  const eligibility = checkEligibility(course, formData.academic);
  if (!eligibility.eligible) {
    return null; // Course not eligible, don't recommend
  }

  // Calculate academic score based on how well student exceeds minimum
  const percentageAboveMin = formData.academic.percentage - course.eligibility.minPercentage;
  scores.academic = Math.min(100, 70 + (percentageAboveMin * 2)); // Base 70, +2 per % above min

  // 2. Interest Score (30%)
  scores.interest = calculateInterestAlignment(course, formData.interests);

  // 3. Skills Score (20%)
  scores.skills = calculateSkillsCompatibility(course, formData.skills);

  // 4. Expectations Score (10%)
  scores.expectations = calculateExpectationsMatch(course, formData.expectations);

  // Apply special rules
  const { boost, specialReasons } = applySpecialRules(course, formData);
  scores.specialReasons = specialReasons;

  // Calculate weighted total
  let total = 
    (scores.academic * WEIGHTS.academic) +
    (scores.interest * WEIGHTS.interest) +
    (scores.skills * WEIGHTS.skills) +
    (scores.expectations * WEIGHTS.expectations);

  // Apply boosts
  total = total * boost;
  
  // Apply elective bonus from eligibility check
  if (eligibility.electiveBonus) {
    total = total * eligibility.electiveBonus;
  }

  scores.total = Math.min(100, total);

  return scores;
};

/**
 * Generate ranked course recommendations
 */
export const generateRecommendations = (courses, formData) => {
  const recommendations = [];

  courses.forEach(course => {
    const scores = calculateCourseScore(course, formData);
    
    if (scores) {
      const reasoning = generateReasoning(course, scores, formData);
      
      recommendations.push({
        course,
        scores,
        matchPercentage: Math.round(scores.total),
        reasoning,
        priority: scores.total >= 75 ? 'high' : scores.total >= 60 ? 'medium' : 'low'
      });
    }
  });

  // Sort by total score (descending)
  recommendations.sort((a, b) => b.scores.total - a.scores.total);

  return recommendations;
};

/**
 * Get top N recommendations
 */
export const getTopRecommendations = (recommendations, count = 5) => {
  return recommendations.slice(0, count);
};

/**
 * Get alternative recommendations (Plan B and C)
 */
export const getAlternativeRecommendations = (recommendations) => {
  // Plan B: Recommendations with 50-70% match
  const planB = recommendations.filter(r => 
    r.matchPercentage >= 50 && r.matchPercentage < 70
  ).slice(0, 3);

  // Plan C: Safety options with lower match but still eligible
  const planC = recommendations.filter(r => 
    r.matchPercentage >= 40 && r.matchPercentage < 50
  ).slice(0, 3);

  return { planB, planC };
};

/**
 * Calculate interest profile for visualization
 */
export const calculateInterestProfile = (interestData) => {
  const profile = {
    technology: 0,
    healthcare: 0,
    business: 0,
    creative: 0,
    social: 0,
    analytical: 0,
    law: 0,
    media: 0
  };

  // Map interest responses to categories
  if (interestData.topInterests) {
    interestData.topInterests.forEach(interest => {
      const normalized = interest.toLowerCase();
      
      if (['technology', 'programming', 'innovation'].some(k => normalized.includes(k))) {
        profile.technology += 20;
      }
      if (['healthcare', 'helping', 'medical'].some(k => normalized.includes(k))) {
        profile.healthcare += 20;
      }
      if (['business', 'finance', 'management'].some(k => normalized.includes(k))) {
        profile.business += 20;
      }
      if (['art', 'design', 'creative', 'media'].some(k => normalized.includes(k))) {
        profile.creative += 20;
      }
      if (['social', 'teaching'].some(k => normalized.includes(k))) {
        profile.social += 20;
      }
      if (['science', 'research', 'problem solving'].some(k => normalized.includes(k))) {
        profile.analytical += 20;
      }
      if (['law', 'justice', 'judiciary'].some(k => normalized.includes(k))) {
        profile.law += 20;
      }
      if (['media', 'communication', 'journalism'].some(k => normalized.includes(k))) {
        profile.media += 20;
      }
    });
  }

  // Normalize to 0-100 scale
  const max = Math.max(...Object.values(profile));
  if (max > 0) {
    Object.keys(profile).forEach(key => {
      profile[key] = Math.round((profile[key] / max) * 100);
    });
  }

  return profile;
};

/**
 * Calculate skills profile for visualization
 */
export const calculateSkillsProfile = (skillsData) => {
  const profile = {};

  if (skillsData.skillLevels) {
    Object.entries(skillsData.skillLevels).forEach(([skill, level]) => {
      profile[skill] = (level / 10) * 100; // Convert 0-10 to 0-100
    });
  }

  return profile;
};

/**
 * Generate comprehensive analysis summary
 */
export const generateAnalysisSummary = (formData, recommendations) => {
  const topRec = recommendations[0];
  
  const summary = {
    studentProfile: {
      stream: formData.academic.stream,
      percentage: formData.academic.percentage,
      subjects: formData.academic.subjects,
      strengths: []
    },
    topRecommendation: topRec ? {
      courseName: topRec.course.name,
      matchPercentage: topRec.matchPercentage,
      primaryReason: topRec.reasoning[0]
    } : null,
    totalEligibleCourses: recommendations.length,
    highPriority: recommendations.filter(r => r.priority === 'high').length,
    mediumPriority: recommendations.filter(r => r.priority === 'medium').length
  };

  // Identify strengths
  if (formData.academic.percentage >= 90) {
    summary.studentProfile.strengths.push('Excellent academic performance');
  }
  if (recommendations.length > 10) {
    summary.studentProfile.strengths.push('Wide range of career options');
  }

  return summary;
};

export default {
  calculateCourseScore,
  generateRecommendations,
  getTopRecommendations,
  getAlternativeRecommendations,
  calculateInterestProfile,
  calculateSkillsProfile,
  generateAnalysisSummary,
  WEIGHTS
};
