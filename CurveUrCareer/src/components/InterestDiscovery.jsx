// Interest Discovery Component - Gamified "Career Quest" Edition
import { useState, useEffect } from 'react';
import { useFormData } from '../hooks/useFormData.jsx';
import { INTEREST_PROBE_QUESTIONS } from '../data/assessmentData';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  BrainCircuit, 
  Trophy, 
  ArrowRight,
  Target,
  Rocket
} from 'lucide-react';

const InterestDiscovery = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormData();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selections, setSelections] = useState([]);
  const [isFinishing, setIsFinishing] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Sound effect simulation (visual feedback)
  const [feedback, setFeedback] = useState(null);

  const currentQuestion = INTEREST_PROBE_QUESTIONS[currentIdx];

  const handleChoice = (mapping, optionId) => {
    // Visual feedback
    setFeedback(optionId);
    
    // Delay to show selection
    setTimeout(() => {
      const newSelections = [...selections, mapping];
      setSelections(newSelections);
      setFeedback(null);

      if (currentIdx < INTEREST_PROBE_QUESTIONS.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        processInterests(newSelections);
      }
    }, 400);
  };

  const processInterests = (finalSelections) => {
    setIsFinishing(true);
    
    // Frequency analysis
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

    // Celebration delay
    setTimeout(() => {
      nextStep();
    }, 2500);
  };

  if (showIntro) {
    return (
      <div className="max-w-4xl mx-auto p-8 h-[70vh] flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-12 shadow-2xl border-4 border-blue-100 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
          
          <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Rocket className="w-12 h-12" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Career Avatar Quest
          </h1>
          <p className="text-xl text-slate-500 max-w-lg mx-auto mb-10 font-medium leading-relaxed">
            Forget boring tests! Play through 12 quick scenarios to unlock your unique 
            <span className="text-blue-600 font-bold"> Professional DNA</span> profile.
          </p>
          
          <button
            onClick={() => setShowIntro(false)}
            className="group relative px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200 hover:-translate-y-1 flex items-center gap-3 mx-auto"
          >
            Start The Game <Zap className="w-6 h-6 fill-yellow-400 text-yellow-400 group-hover:animate-pulse" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <AnimatePresence mode="wait">
        {!isFinishing ? (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8"
          >
            {/* Game HUD */}
            <div className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-sm">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 font-black">
                   {currentIdx + 1}
                 </div>
                 <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                   Level {currentIdx + 1} of {INTEREST_PROBE_QUESTIONS.length}
                 </div>
               </div>
               
               <div className="flex-1 max-w-xs mx-4 h-3 bg-slate-100 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                   initial={{ width: `${(currentIdx / INTEREST_PROBE_QUESTIONS.length) * 100}%` }}
                   animate={{ width: `${((currentIdx + 1) / INTEREST_PROBE_QUESTIONS.length) * 100}%` }}
                 />
               </div>
               
               <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold border border-amber-100">
                 <Trophy className="w-3 h-3" /> Streak: {currentIdx * 100} XP
               </div>
            </div>

            {/* Question Card */}
            <div className="text-center space-y-4 mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
                {currentQuestion.question}
              </h2>
            </div>
            
            {/* Gaming Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, idx) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoice(option.mapping, option.id)}
                  className={`relative p-6 text-left rounded-3xl border-2 transition-all overflow-hidden flex items-center gap-4 group ${
                    feedback === option.id 
                      ? 'border-green-500 bg-green-50 ring-4 ring-green-100' 
                      : 'border-slate-100 bg-white hover:border-indigo-500 hover:shadow-xl'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold transition-colors ${
                    feedback === option.id ? 'bg-green-500 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white'
                  }`}>
                    {['A', 'B', 'C', 'D'][idx]}
                  </div>
                  
                  <div className="flex-1">
                    <span className={`text-lg font-bold leading-tight ${feedback === option.id ? 'text-green-800' : 'text-slate-700 group-hover:text-slate-900'}`}>
                      {option.text}
                    </span>
                  </div>

                  {feedback === option.id && (
                    <motion.div
                      layoutId="check"
                      className="absolute right-4 text-green-600"
                    >
                      <Target className="w-6 h-6" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border-8 border-indigo-500 border-t-transparent rounded-full mx-auto mb-8"
            />
            <h2 className="text-4xl font-black text-slate-900 mb-4">Level Up!</h2>
            <p className="text-xl text-slate-500 font-medium">Generating your career avatar...</p>
            <div className="mt-8 flex justify-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
              <BrainCircuit className="w-8 h-8 text-blue-400 animate-bounce delay-100" />
              <Zap className="w-8 h-8 text-purple-400 animate-bounce delay-200" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InterestDiscovery;
