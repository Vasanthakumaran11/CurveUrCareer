import React, { useState } from 'react';
import WelcomeStep from '../components/career-guidance/WelcomeStep';
import AcademicStep from '../components/career-guidance/AcademicStep';
import AnalysisStep from '../components/career-guidance/AnalysisStep';
import RoadmapStep from '../components/career-guidance/RoadmapStep';
import { careerData } from '../data/careerData';


const CareerGuidance = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    academic: {},
    preferences: {}
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const getPersonalizedSuggestions = () => {
    // Static analysis logic based on form data
    const { academic } = formData;
    
    let suggestions = [];
    
    // Analyze academic strengths
    if (academic.mathComfort >= 4) {
      suggestions.push(...careerData.techCareers);
    }
    if (academic.theoryComfort >= 3) {
      suggestions.push(...careerData.researchCareers);
    }
    if (academic.practicalComfort >= 4) {
      suggestions.push(...careerData.creativeCareers);
    }
    
    // Remove duplicates and limit to 4 suggestions
    const uniqueSuggestions = [...new Set(suggestions)];
    return uniqueSuggestions.slice(0, 4);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return <WelcomeStep nextStep={nextStep} />;
      case 2:
        return <AcademicStep 
          nextStep={nextStep} 
          prevStep={prevStep} 
          updateFormData={updateFormData}
          formData={formData.academic}
        />;
      case 3:
        return <AnalysisStep 
          nextStep={nextStep} 
          prevStep={prevStep} 
          suggestions={getPersonalizedSuggestions()}
          formData={formData}
        />;
      case 4:
        return <RoadmapStep 
          prevStep={prevStep}
          suggestions={getPersonalizedSuggestions()}
        />;
      default:
        return <WelcomeStep nextStep={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-md z-10">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <h1 className="text-2xl font-bold text-gray-800">CurveUrCareer</h1>
          </div>
          <div className="flex space-x-6">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="/career-guidance" className="text-blue-600 font-medium border-b-2 border-blue-600">Career Guidance</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Streams</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
          </div>
        </nav>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                stepNum <= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div className={`w-16 h-1 ${stepNum < step ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 text-xl font-semibold mt-4 text-gray-700">
          <span>Welcome</span>
          <span>Academic</span>
          <span>Analysis</span>
          <span>Roadmap</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {renderStep()}
      </main>
    </div>
  );
};

export default CareerGuidance;