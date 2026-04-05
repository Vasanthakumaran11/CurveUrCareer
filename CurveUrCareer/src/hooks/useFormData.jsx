// Form data context and hook for managing multi-step form state
import { createContext, useContext, useState, useEffect } from 'react';

const FormDataContext = createContext();

const STORAGE_KEY = 'curveurcareer_form_data';
const SESSION_STORAGE_KEY = 'curveurcareer_session_data';

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    // Load from localStorage on initialization
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
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
      };
    } catch (error) {
      console.error('Error loading form data from localStorage:', error);
      return {
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
      };
    }
  });

  const [currentStep, setCurrentStep] = useState(0);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving form data to localStorage:', error);
    }
  }, [formData]);

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
    const defaultData = {
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
    };
    setFormData(defaultData);
    setCurrentStep(0);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  // Session storage utilities for temporary data
  const saveToSession = (key, data) => {
    try {
      const sessionData = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}');
      sessionData[key] = data;
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
    } catch (error) {
      console.error('Error saving to session storage:', error);
    }
  };

  const getFromSession = (key) => {
    try {
      const sessionData = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}');
      return sessionData[key];
    } catch (error) {
      console.error('Error reading from session storage:', error);
      return null;
    }
  };

  const clearSession = () => {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing session storage:', error);
    }
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
    goToStep,
    saveToSession,
    getFromSession,
    clearSession
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
