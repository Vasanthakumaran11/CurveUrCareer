// Assessment Engine - Roadmap Edition
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSESSMENT_MOMENTS } from '../data/assessmentData';
import { useFormData } from '../hooks/useFormData.jsx';
import { 
  calculateEngineScores, 
  getTopTags, 
  getClusterMatches, 
  generatePatternInsight,
  generateExplorationPlan
} from '../utils/assessmentLogic';
import { 
  ChevronRight, 
  Sparkles,
  Zap, 
  ShieldCheck,
  BrainCircuit,
  Flag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssessmentEngine = () => {
  const { updateFormData } = useFormData();
  const navigate = useNavigate();
  const [currentMomentIndex, setCurrentMomentIndex] = useState(-1); // -1 for intro
  const [responses, setResponses] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Persistence: Check if there's already a result
  useEffect(() => {
    const savedResult = localStorage.getItem('career_assessment_result');
    if (savedResult) {
      // Optional: Ask user if they want to restart or view results
      // For now, let them retake if they navigate here
    }
  }, []);

  const startAssessment = () => {
    setCurrentMomentIndex(0);
  };

  const currentMoment = ASSESSMENT_MOMENTS[currentMomentIndex];

  const handleResponse = (choiceId) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const newResponses = [
      ...responses,
      { momentId: currentMoment.id, choiceId }
    ];
    setResponses(newResponses);

    // Auto-advance with a slight delay for visual feedback
    setTimeout(() => {
      if (currentMomentIndex < ASSESSMENT_MOMENTS.length - 1) {
        setCurrentMomentIndex(currentMomentIndex + 1);
        setIsProcessing(false);
      } else {
        finishAssessment(newResponses);
      }
    }, 400);
  };

  const finishAssessment = (finalResponses) => {
    const scores = calculateEngineScores(finalResponses);
    const topTags = getTopTags(scores);
    const clusters = getClusterMatches(topTags);
    const insight = generatePatternInsight(topTags);
    
    const result = {
      timestamp: new Date().toISOString(),
      topTags,
      clusters: clusters.slice(0, 3).map(c => ({
          ...c,
          reasoning: c.reasoning // In a real app, this could be more dynamic
      })),
      insight,
      explorationPlan: generateExplorationPlan(),
      isCompleted: true
    };

    // Save to localStorage
    localStorage.setItem('career_assessment_result', JSON.stringify(result));

    // Update global state
    updateFormData('assessmentResults', result);
    
    // Navigate to results
    navigate('/results');
  };

  // Intro Screen
  if (currentMomentIndex === -1) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="z-10 max-w-2xl w-full mx-4 p-8 md:p-16 text-center bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl"
        >
          <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-blue-400/30">
            <Sparkles className="w-10 h-10 text-blue-400" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Clarity Engine</h1>
          <p className="text-white/60 text-lg mb-12 leading-relaxed">
            This isn't a test. It's a mirror. <br />
            <span className="font-bold text-white/80">Don't overthink.</span> Trust your first instinct.
          </p>

          <button
            onClick={startAssessment}
            className="group relative flex items-center gap-4 px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-xl hover:bg-blue-400 hover:text-white transition-all hover:scale-105"
          >
            START EXPLORATION <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="mt-8 text-white/30 text-xs font-bold uppercase tracking-widest">
            Takes about 8 minutes • No right or wrong answers
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-950 relative selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-white/5 z-50">
        <motion.div 
          className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentMomentIndex + 1) / ASSESSMENT_MOMENTS.length) * 100}%` }}
        />
      </div>

      {/* Main Moment Area */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMoment.id}
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            className="w-full max-w-4xl"
          >
            <div className="mb-12">
               <span className="text-blue-400 font-black text-sm uppercase tracking-[0.3em] mb-4 block">
                 Moment {currentMomentIndex + 1} of {ASSESSMENT_MOMENTS.length}
               </span>
               <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
                 {currentMoment.scenario}
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentMoment.options.map((option) => (
                <button
                  key={option.id}
                  disabled={isProcessing}
                  onClick={() => handleResponse(option.id)}
                  className={`
                    group p-6 md:p-8 text-left rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95
                    ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full border-2 border-white/20 group-hover:border-blue-400 transition-colors flex-shrink-0" />
                    <p className="text-lg text-white/80 group-hover:text-white transition-colors leading-relaxed">
                      {option.text}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer HUD */}
      <footer className="p-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
        <div className="flex items-center gap-4">
           <BrainCircuit className="w-4 h-4" /> 
           <span>Clarity Core v1.0 • Bias detected: None</span>
        </div>
        <div className="flex items-center gap-4">
           <Flag className="w-4 h-4" />
           <span>This is direction, not destiny</span>
        </div>
      </footer>
    </div>
  );
};

export default AssessmentEngine;
