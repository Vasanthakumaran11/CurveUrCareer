// Assessment Page
import { useFormData } from '../hooks/useFormData.jsx';
import ProgressIndicator from '../components/ProgressIndicator';
import AcademicBackground from '../components/AcademicBackground';
import InterestDiscovery from '../components/InterestDiscovery';
import SkillsAssessment from '../components/SkillsAssessment';
import CareerExpectations from '../components/CareerExpectations';
import ConstraintsAssessment from '../components/ConstraintsAssessment';

const AssessmentPage = () => {
  const { currentStep } = useFormData();

  const steps = [
    <AcademicBackground />,
    <InterestDiscovery />,
    <SkillsAssessment />,
    <CareerExpectations />,
    <ConstraintsAssessment />
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto">
        <ProgressIndicator currentStep={currentStep} />
        <div className="mt-8">
          {steps[currentStep]}
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
