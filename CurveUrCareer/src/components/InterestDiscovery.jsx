// Interest Discovery Component - Redesigned as an interactive pictorial test
import { useState } from 'react';
import { useFormData } from '../hooks/useFormData.jsx';
import { INTEREST_PROBE_QUESTIONS } from '../data/assessmentData';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, CheckCircle2, Zap } from 'lucide-react';

const InterestDiscovery = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormData();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selections, setSelections] = useState([]);
  const [isFinishing, setIsFinishing] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const currentQuestion = INTEREST_PROBE_QUESTIONS[currentIdx];

  const handleChoice = (mapping) => {
    const newSelections = [...selections, mapping];
    setSelections(newSelections);

    if (currentIdx < INTEREST_PROBE_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      processInterests(newSelections);
    }
  };

  const processInterests = (finalSelections) => {
    setIsFinishing(true);
    
    // Simple frequency-based mapping to determine top interests
    const frequency = finalSelections.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    const sortedInterests = Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]);
    
    // Update global form data
    updateFormData('interests', {
      ...formData.interests,
      topInterests: sortedInterests.slice(0, 3)
    });

    // Short delay for visual polish
    setTimeout(() => {
      nextStep();
    }, 2000);
  };

  if (showIntro) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-12 text-center h-[70vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl rotate-3">
            <Sparkles className="w-12 h-12" />
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Interest DNA Discovery</h1>
            <p className="text-xl text-slate-500 max-w-lg mx-auto font-medium">
              We'll show you a series of visual scenarios. Choose the one that naturally sparks your curiosity.
            </p>
          </div>
          <button
            onClick={() => setShowIntro(false)}
            className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200 transform hover:scale-105 flex items-center gap-3 mx-auto"
          >
            START SCAN <Zap className="w-6 h-6 fill-current" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-[600px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {!isFinishing ? (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-12"
          >
            {/* Header with Step Counter */}
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">Discovery Phase</span>
                <h3 className="text-4xl font-black text-slate-900 leading-tight">{currentQuestion.question}</h3>
              </div>
              <div className="text-right">
                <span className="text-slate-300 font-black text-6xl italic leading-none">{currentIdx + 1}</span>
              </div>
            </div>

            {/* Progress Mini-Bar */}
            <div className="flex gap-2 h-1.5">
              {INTEREST_PROBE_QUESTIONS.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-full flex-1 rounded-full transition-all duration-700 ${
                    idx <= currentIdx ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-slate-100'
                  }`}
                />
              ))}
            </div>

            {/* Visual Image if present */}
            {currentQuestion.imageUrl && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl bg-slate-100 relative group"
              >
                <img 
                  src={currentQuestion.imageUrl} 
                  alt="Interest Scenario" 
                  className="w-full h-64 md:h-80 object-cover transition-transform group-hover:scale-110 duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentQuestion.options.map((option, idx) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoice(option.mapping)}
                  className="p-8 text-left rounded-3xl border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50/50 transition-all group flex items-start justify-between shadow-sm hover:shadow-xl bg-white"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-black text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-xl font-bold text-slate-700 group-hover:text-blue-900 block">
                      {option.text}
                    </span>
                  </div>
                  <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
                </motion.button>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                className="text-slate-400 font-bold hover:text-slate-600 transition-colors uppercase tracking-widest text-xs flex items-center gap-2"
              >
                ← Return to Academic
              </button>
              <div className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                Question {currentIdx + 1} of {INTEREST_PROBE_QUESTIONS.length}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-10"
          >
            <div className="relative mx-auto w-32 h-32">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-[2.5rem] border-4 border-dashed border-emerald-200"
              />
              <div className="absolute inset-0 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-emerald-200">
                <CheckCircle2 className="w-16 h-16" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">Interest DNA Mapped</h2>
              <p className="text-xl text-slate-500 font-medium max-w-sm mx-auto">
                We've identified your primary cognitive drivers. Proceeding to Life Goals Blueprint...
              </p>
            </div>
            <div className="flex justify-center gap-3">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  className="w-3 h-3 bg-emerald-500 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InterestDiscovery;
