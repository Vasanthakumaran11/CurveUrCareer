// Career eligibility and compatibility rules
import { coursesData } from '../data/coursesData.js';

/**
 * Check if a student is eligible for a specific course based on academic background
 */
export const checkEligibility = (course, academicData) => {
  const { stream, subjects, percentage } = academicData;
  
  // Check minimum percentage
  if (percentage < course.eligibility.minPercentage) {
    return {
      eligible: false,
      reason: `Minimum ${course.eligibility.minPercentage}% required, you have ${percentage}%`
    };
  }

  // Check subject requirements
  const requiredSubjects = course.eligibility.subjects;
  const hasRequiredSubjects = requiredSubjects.some(reqSubject => {
    if (reqSubject === 'Any') return true;
    if (reqSubject === 'Any with Math') return subjects.includes('Math');
    
    // Check if student's subjects match required combination
    const subjectChars = reqSubject.split('');
    return subjectChars.every(char => {
      const subjectMap = {
        'P': 'Physics',
        'C': 'Chemistry',
        'M': 'Math',
        'B': 'Biology'
      };
      return subjects.includes(subjectMap[char]);
    });
  });

  if (!hasRequiredSubjects) {
    return {
      eligible: false,
      reason: `Required subjects: ${requiredSubjects.join(' or ')}`
    };
  }

  // Check for elective bonuses (returns bonus score multiplier)
  let electiveBonus = 1.0;
  if (course.eligibility.preferredElectives) {
    const matchedElectives = course.eligibility.preferredElectives.filter(e => subjects.includes(e));
    if (matchedElectives.length > 0) {
      electiveBonus = 1.0 + (matchedElectives.length * 0.1); // 10% bonus per elective
    }
  }

  // Check stream compatibility
  if (course.stream !== 'Any' && course.stream !== stream && !course.stream.includes(stream)) {
    return {
      eligible: false,
      reason: `This course is for ${course.stream} stream`
    };
  }

  return {
    eligible: true,
    reason: 'You meet all eligibility criteria',
    electiveBonus
  };
};

/**
 * Calculate interest alignment score for a course
 */
export const calculateInterestAlignment = (course, interestData) => {
  let score = 0;
  let maxScore = 0;

  // Check if course interests match student interests
  if (course.interests && interestData.topInterests) {
    course.interests.forEach(courseInterest => {
      maxScore += 10;
      const normalizedInterest = courseInterest.toLowerCase();
      const hasDirectMatch = interestData.topInterests.some(i => i.toLowerCase().includes(normalizedInterest));
      
      if (hasDirectMatch) {
        score += 10;
      } else if (interestData.secondaryInterests?.some(i => i.toLowerCase().includes(normalizedInterest))) {
        score += 5;
      }
    });
  }

  return maxScore > 0 ? (score / maxScore) * 100 : 50; // Default 50% if no data
};

/**
 * Calculate skills compatibility score
 */
export const calculateSkillsCompatibility = (course, skillsData) => {
  let score = 0;
  let maxScore = 0;

  if (course.skills && skillsData.skillLevels) {
    course.skills.forEach(requiredSkill => {
      maxScore += 10;
      // Precise mapping for skills from component IDs
      const skillIdMap = {
        'technical': ['technical', 'programming', 'coding', 'it'],
        'analytical': ['analytical', 'logical', 'math', 'problem solving'],
        'communication': ['communication', 'soft skills', 'presentation'],
        'creative': ['creative', 'design', 'innovation'],
        'leadership': ['leadership', 'management'],
        'empathy': ['empathy', 'social'],
        'numerical': ['numerical', 'math', 'finance'],
        'research': ['research', 'analysis']
      };

      const normalizedRequired = requiredSkill.toLowerCase();
      let skillPath = normalizedRequired;
      
      // Find the ID that contains this requirement
      Object.entries(skillIdMap).forEach(([id, keywords]) => {
        if (keywords.some(k => normalizedRequired.includes(k))) {
          skillPath = id;
        }
      });

      const skillLevel = skillsData.skillLevels[skillPath] || 0;
      score += skillLevel; 
    });
  }

  return maxScore > 0 ? (score / maxScore) * 100 : 50;
};

/**
 * Calculate expectations match score
 */
export const calculateExpectationsMatch = (course, expectationsData) => {
  let score = 0;
  let total = 0;

  // Salary expectations
  if (expectationsData.minSalary) {
    total++;
    const courseSalaryRange = course.averageSalary;
    const minSalary = parseInt(courseSalaryRange.split('-')[0]);
    if (minSalary >= expectationsData.minSalary) {
      score += 20;
    }
  }

  // Work environment
  if (expectationsData.preferredEnvironment) {
    total++;
    if (course.workEnvironment?.includes(expectationsData.preferredEnvironment)) {
      score += 20;
    }
  }

  // Job security
  if (expectationsData.jobSecurity === 'high') {
    total++;
    if (['Government', 'Medical', 'Engineering'].some(type => 
      course.stream === type || course.futureScope?.includes('Excellent'))) {
      score += 20;
    }
  }

  // Work-life balance
  if (expectationsData.workLifeBalance === 'high') {
    total++;
    if (['Government', 'Teaching', 'Research'].some(type => 
      course.careerPaths?.some(path => path.includes(type)))) {
      score += 20;
    }
  }

  // Further studies
  if (expectationsData.furtherStudies) {
    total++;
    if (course.duration === '3 years' || course.futureScope?.includes('higher studies')) {
      score += 20;
    }
  }

  return total > 0 ? (score / total) : 50;
};

/**
 * Get course recommendations based on all factors
 */
export const getEligibleCourses = (formData) => {
  const eligibleCourses = [];

  coursesData.forEach(course => {
    const eligibility = checkEligibility(course, formData.academic);
    
    if (eligibility.eligible) {
      eligibleCourses.push({
        ...course,
        eligibilityReason: eligibility.reason
      });
    }
  });

  return eligibleCourses;
};

/**
 * Categorize colleges based on student profile
 */
export const categorizeColleges = (colleges, academicData) => {
  const { percentage } = academicData;

  return {
    dream: colleges.filter(c => c.tier === 1 && percentage >= c.cutoff.marks - 5),
    realistic: colleges.filter(c => c.tier === 2 && percentage >= c.cutoff.marks - 10),
    safe: colleges.filter(c => c.tier === 3 && percentage >= c.cutoff.marks - 15)
  };
};

/**
 * Generate reasoning for recommendation
 */
export const generateReasoning = (course, scores, formData) => {
  const reasons = [];

  // Special conditions reasoning (from career logic)
  if (scores.specialReasons && scores.specialReasons.length > 0) {
    reasons.push(...scores.specialReasons);
  }

  // Academic fit
  if (scores.academic >= 80) {
    reasons.push(`Strong academic fit with ${formData.academic.percentage}% in ${formData.academic.stream}`);
  }

  // Interest alignment
  if (scores.interest >= 70) {
    reasons.push(`High interest alignment with your preferences`);
  }

  // Skills match
  if (scores.skills >= 70) {
    reasons.push(`Your skills match well with course requirements`);
  }

  // Career prospects
  if (course.futureScope?.includes('Excellent')) {
    reasons.push(`Excellent career prospects in ${course.stream} field`);
  }

  // Salary potential
  reasons.push(`Average salary range: ${course.averageSalary}`);

  return reasons;
};

export default {
  checkEligibility,
  calculateInterestAlignment,
  calculateSkillsCompatibility,
  calculateExpectationsMatch,
  getEligibleCourses,
  categorizeColleges,
  generateReasoning
};
