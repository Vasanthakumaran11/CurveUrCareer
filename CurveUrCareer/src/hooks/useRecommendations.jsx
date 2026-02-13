// Custom hook for generating course and college recommendations
import { useMemo } from 'react';
import { coursesData } from '../data/coursesData.js';
import { collegesData } from '../data/collegesData.js';
import { careerPaths } from '../data/careerPaths.js';
import {
  generateRecommendations,
  getTopRecommendations,
  getAlternativeRecommendations,
  calculateInterestProfile,
  calculateSkillsProfile,
  generateAnalysisSummary
} from '../utils/scoringLogic.js';
import { categorizeColleges } from '../utils/careerRules.js';

export const useRecommendations = (formData) => {
  // Calculate recommendations when form data changes
  const results = useMemo(() => {
    if (!formData || !formData.academic || !formData.academic.stream) {
      return null;
    }

    try {
      // Generate initial course recommendations
      const allRecommendations = generateRecommendations(coursesData, formData);

      // Calculate interest and skills profiles
      const intProfile = calculateInterestProfile(formData.interests);
      
      // Use interactive assessment profile if available, else fall back to basic slider data
      const sklProfile = formData.assessmentResults?.isCompleted 
        ? formData.assessmentResults.skillProfile 
        : calculateSkillsProfile(formData.skills);

      // Refine recommendations if interactive assessment is done
      let refinedRecommendations = allRecommendations;
      if (formData.assessmentResults?.isCompleted) {
        // Boost courses that match the top career cluster from the assessment
        const topCluster = formData.assessmentResults.careerMatches[0];
        refinedRecommendations = allRecommendations.map(rec => {
          // Check if course skills align with the core dimension of the top cluster
          const isClusterMatch = topCluster.core.some(dim => 
            rec.course.skills?.some(s => s.toLowerCase().includes(dim.toLowerCase().replace('skills', '').replace('thinking', '')))
          );
          return isClusterMatch ? { ...rec, matchPercentage: Math.min(100, rec.matchPercentage + 8) } : rec;
        }).sort((a, b) => b.matchPercentage - a.matchPercentage);
      }

      // Get top 5 recommendations from refined list
      const top = getTopRecommendations(refinedRecommendations, 5);
      
      // Get alternative recommendations
      const alternatives = getAlternativeRecommendations(refinedRecommendations);

      // Generate college recommendations based on top courses and constraints
      let categorizedColleges = { dream: [], realistic: [], safe: [] };
      if (top.length > 0) {
        const topCourseIds = top.map(r => r.course.id);
        const relevantColleges = collegesData.filter(college => {
          const offersCourse = college.courses.some(courseId => topCourseIds.includes(courseId));
          if (!offersCourse) return false;

          if (formData.constraints.collegePreference === 'Government' && college.type !== 'Government') return false;
          if (formData.constraints.collegePreference === 'Private' && college.type !== 'Private') return false;
          if (formData.constraints.familyFinancialRange === 'Low' && college.type === 'Private') return false;

          return true;
        });
        
        categorizedColleges = categorizeColleges(relevantColleges, formData.academic);
      }

      // Generate analysis summary
      const summary = generateAnalysisSummary(formData, refinedRecommendations);

      return {
        recommendations: refinedRecommendations,
        topRecommendations: top,
        alternativeRecommendations: alternatives,
        collegeRecommendations: categorizedColleges,
        interestProfile: intProfile,
        skillsProfile: sklProfile,
        analysisSummary: summary
      };
    } catch (err) {
      console.error('Error generating recommendations:', err);
      return null;
    }
  }, [formData]);

  const loading = false;
  const error = results ? null : 'Pending assessment completion...';

  const recommendations = results?.recommendations || [];
  const topRecommendations = results?.topRecommendations || [];
  const alternativeRecommendations = results?.alternativeRecommendations || { planB: [], planC: [] };
  const collegeRecommendations = results?.collegeRecommendations || { dream: [], realistic: [], safe: [] };
  const interestProfile = results?.interestProfile || null;
  const skillsProfile = results?.skillsProfile || null;
  const analysisSummary = results?.analysisSummary || null;

  // Get career path for a specific course
  const getCareerPathForCourse = (courseName) => {
    const courseNameLower = courseName.toLowerCase();
    
    if (courseNameLower.includes('cyber security')) {
      return careerPaths.cyberSecurity;
    } else if (courseNameLower.includes('robotics') || courseNameLower.includes('ai')) {
      return careerPaths.aiRobotics;
    } else if (courseNameLower.includes('fintech')) {
      return careerPaths.fintech;
    } else if (courseNameLower.includes('digital marketing')) {
      return careerPaths.digitalMarketing;
    } else if (courseNameLower.includes('psychology')) {
      return careerPaths.psychology;
    } else if (courseNameLower.includes('ux') || courseNameLower.includes('design')) {
      return careerPaths.uxDesign;
    } else if (courseNameLower.includes('tech') || courseNameLower.includes('engineering') || courseNameLower.includes('bca')) {
      return careerPaths.engineering;
    } else if (courseNameLower.includes('mbbs') || courseNameLower.includes('medical') || courseNameLower.includes('pharm')) {
      return careerPaths.medical;
    } else if (courseNameLower.includes('com') || courseNameLower.includes('bba') || courseNameLower.includes('ca') || courseNameLower.includes('cs')) {
      return careerPaths.commerce;
    } else if (courseNameLower.includes('llb') || courseNameLower.includes('law')) {
      return careerPaths.law;
    } else if (courseNameLower.includes('jmc') || courseNameLower.includes('journalism') || courseNameLower.includes('media')) {
      return careerPaths.media;
    } else if (courseNameLower.includes('bsc') || courseNameLower.includes('science')) {
      return careerPaths.science;
    } else if (courseNameLower.includes('ba') || courseNameLower.includes('arts')) {
      return careerPaths.civilServices;
    }
    
    return null;
  };

  return {
    recommendations,
    topRecommendations,
    alternativeRecommendations,
    collegeRecommendations,
    interestProfile,
    skillsProfile,
    analysisSummary,
    loading,
    error,
    getCareerPathForCourse
  };
};

export default useRecommendations;
