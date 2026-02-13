// Form data context and hook for managing multi-step form state
import { createContext, useContext, useState } from 'react';

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    academic: {
      stream: '',
      subjects: [],
      percentage: 0,
      board: ''
    },
    interests: {
      topInterests: [],
      secondaryInterests: [],
      activities: [],
      preferredSubjects: []
    },
    skills: {
      skillLevels: {},
      strengths: [],
      workStyle: ''
    },
    expectations: {
      minSalary: 0,
      preferredEnvironment: '',
      jobSecurity: '',
      workLifeBalance: '',
      furtherStudies: false,
      locationPreference: '',
      familyExpectations: ''
    },
    constraints: {
      familyFinancialRange: '',
      collegePreference: '',
      locationPreference: ''
    },
    assessmentResults: {
      responses: [],
      skillProfile: {},
      careerMatches: [],
      isCompleted: false
    },
    selfAssessment: {
      leadership: 50,
      creativity: 50,
      moneyManagement: 50,
      entrepreneurialDrive: 50
    }
  });

  const [currentStep, setCurrentStep] = useState(0);

  // Update specific section of form data
  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };

  // Update entire form data
  const setCompleteFormData = (data) => {
    setFormData(data);
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      academic: { stream: '', subjects: [], percentage: 0, board: '' },
      interests: { topInterests: [], secondaryInterests: [], activities: [], preferredSubjects: [] },
      skills: { skillLevels: {}, strengths: [], workStyle: '' },
      expectations: {
        minSalary: 0,
        preferredEnvironment: '',
        jobSecurity: '',
        workLifeBalance: '',
        furtherStudies: false,
        locationPreference: '',
        familyExpectations: ''
      },
      constraints: {
        familyFinancialRange: '',
        collegePreference: '',
        locationPreference: ''
      },
      selfAssessment: {
        leadership: 50,
        creativity: 50,
        moneyManagement: 50,
        entrepreneurialDrive: 50
      },
      assessmentResults: {
        responses: [],
        skillProfile: {},
        careerMatches: [],
        isCompleted: false
      }
    });
    setCurrentStep(0);
  };

  // Navigate to next step
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  // Go to specific step
  const goToStep = (step) => {
    setCurrentStep(Math.max(0, Math.min(step, 5)));
  };

  const value = {
    formData,
    currentStep,
    updateFormData,
    setCompleteFormData,
    resetFormData,
    nextStep,
    prevStep,
    goToStep
  };

  return (
    <FormDataContext.Provider value={value}>
      {children}
    </FormDataContext.Provider>
  );
};

// Custom hook to use form data context
export const useFormData = () => {
  const context = useContext(FormDataContext);
  
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  
  return context;
};
