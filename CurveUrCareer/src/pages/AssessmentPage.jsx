// Assessment Page - Redesigned for Total Immersion
import { useFormData } from '../hooks/useFormData.jsx';
import ProgressIndicator from '../components/ProgressIndicator';
import AcademicBackground from '../components/AcademicBackground';
import InterestDiscovery from '../components/InterestDiscovery';
import AssessmentEngine from '../components/AssessmentEngine';
import LifeGoalsAndReality from '../components/LifeGoalsAndReality';
import { motion, AnimatePresence } from 'framer-motion';

const AssessmentPage = () => {
  const { currentStep } = useFormData();

  // New flow: Academic -> Interests -> Life Goals -> Immersive Assessment
  const steps = [
    { component: <AcademicBackground />, showMeta: true },
    { component: <InterestDiscovery />, showMeta: true },
    { component: <LifeGoalsAndReality />, showMeta: true },
    { component: <AssessmentEngine />, showMeta: false } // Assessment is full immersion
  ];

  const currentSelection = steps[currentStep] || steps[0];

  return (
    <div className={`min-h-screen transition-colors duration-700 ${currentSelection.showMeta ? 'bg-slate-50 py-8' : 'bg-white'}`}>
      <div className={`${currentSelection.showMeta ? 'max-w-7xl mx-auto px-4 md:px-8' : 'w-full min-h-screen'}`}>
        
        {/* Only show Progress and Header for non-immersive steps */}
        <AnimatePresence>
          {currentSelection.showMeta && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ProgressIndicator currentStep={currentStep} totalSteps={3} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          layout
          className={`${currentSelection.showMeta ? 'mt-8' : 'h-full'}`}
        >
          {currentSelection.component}
        </motion.div>
      </div>
    </div>
  );
};

export default AssessmentPage;
