// Assessment Engine - "Career Quest" Revamped Edition
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSESSMENT_PHASES, ASSESSMENT_ITEMS } from '../data/assessmentData';
import { useFormData } from '../hooks/useFormData';
import { calculateRawScores, normalizeScores, getCareerMapping } from '../utils/assessmentLogic';
import { 
  ChevronRight, 
  Trophy, 
  Zap, 
  ShieldCheck,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import New Gamification Components
import StoryAdventure from './gamification/StoryAdventure';
import CreatorsLab from './gamification/CreatorsLab';
import PatternDetective from './gamification/PatternDetective';
import QuickFireCards from './gamification/QuickFireCards';
import ReflectionRoom from './gamification/ReflectionRoom';

const AssessmentEngine = () => {
  const { updateFormData } = useFormData();
  const navigate = useNavigate();
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [achievements, setAchievements] = useState([]);

  const currentPhase = ASSESSMENT_PHASES[currentPhaseIndex];
  
  // In the new model, each phase represents one major gamified item/scenario
  const currentItem = useMemo(() => {
    return ASSESSMENT_ITEMS.find(item => item.phase === currentPhase.id);
  }, [currentPhase.id]);

  const handleResponse = (response) => {
    const newResponses = [
      ...responses.filter(r => r.itemId !== currentItem.id),
      { itemId: currentItem.id, ...response }
    ];
    setResponses(newResponses);

    // Achievement logic
    if (currentPhaseIndex === 0) setAchievements([...achievements, 'Storyteller 🎭']);
    if (currentPhaseIndex === 1) setAchievements([...achievements, 'The Builder 🏗️']);

    if (currentPhaseIndex < ASSESSMENT_PHASES.length - 1) {
      setCurrentPhaseIndex(currentPhaseIndex + 1);
    } else {
      finishAssessment(newResponses);
    }
  };

  const finishAssessment = (finalResponses) => {
    const rawScores = calculateRawScores(finalResponses);
    const skillProfile = normalizeScores(rawScores);
    const careerMatches = getCareerMapping(skillProfile);

    updateFormData('assessmentResults', {
      responses: finalResponses,
      skillProfile,
      careerMatches,
      isCompleted: true
    });
    
    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-500/20"></div>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="z-10 max-w-2xl w-full mx-4 p-12 text-center bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem] shadow-2xl relative overflow-hidden"
        >
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="p-8 inline-block rounded-full bg-emerald-500/20 mb-8 border border-emerald-400/30 shadow-[0_0_50px_rgba(16,185,129,0.3)]"
          >
            <Trophy className="w-24 h-24 text-white" />
          </motion.div>
          
          <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">QUEST COMPLETE!</h2>
          <div className="flex justify-center gap-2 mb-8">
            <Star className="text-amber-400 fill-amber-400 w-6 h-6" />
            <Star className="text-amber-400 fill-amber-400 w-6 h-6" />
            <Star className="text-amber-400 fill-amber-400 w-6 h-6" />
            <Star className="text-amber-400 fill-amber-400 w-6 h-6" />
            <Star className="text-amber-400 fill-amber-400 w-6 h-6" />
          </div>

          <p className="text-white/60 text-lg font-medium leading-relaxed mb-12">
            You've navigated the Career Quest with excellence. Your hidden talents in {achievements.length > 0 ? achievements[0].split(' ')[0] : 'Thinking'} and Strategy are now mapped.
          </p>

          <button
            onClick={() => navigate('/results')}
            className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-slate-950 rounded-[2rem] font-black text-xl hover:bg-emerald-400 hover:text-white transition-all hover:scale-105 shadow-2xl"
          >
            VIEW YOUR LEGACY <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  const renderPhaseContent = () => {
    if (!currentItem) return <div className="text-white">Loading Quest Module...</div>;

    switch (currentPhase.id) {
      case 'story-adventure':
        return <StoryAdventure item={currentItem} onResponse={handleResponse} />;
      case 'creators-lab':
        return <CreatorsLab item={currentItem} onResponse={handleResponse} />;
      case 'pattern-detective':
        return <PatternDetective item={currentItem} onResponse={handleResponse} />;
      case 'quick-fire':
        return <QuickFireCards item={currentItem} onResponse={handleResponse} />;
      case 'reflection-room':
        return <ReflectionRoom item={currentItem} onResponse={handleResponse} />;
      default:
        return <div className="text-white">Quest Phase Unrecognized: {currentPhase.id}</div>;
    }
  };

  const themeColors = {
    indigo: 'from-indigo-950 via-slate-900 to-black',
    purple: 'from-purple-950 via-slate-900 to-black',
    blue: 'from-blue-950 via-slate-900 to-black',
    rose: 'from-rose-950 via-slate-900 to-black',
    emerald: 'from-emerald-950 via-slate-900 to-black'
  };

  return (
    <div className={`h-screen w-full flex flex-col overflow-hidden bg-gradient-to-br ${themeColors[currentPhase.theme]} relative selection:bg-white/20`}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" 
        />
      </div>

      {/* Modern HUD Header */}
      <header className="px-12 py-8 flex justify-between items-center z-30 relative">
        <div className="flex items-center gap-8">
           <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg animate-pulse"></div>
              <div className="relative w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-3xl">
                {currentPhase.icon}
              </div>
           </div>
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <span className="px-3 py-0.5 rounded-full bg-white/10 text-white/40 font-black text-[10px] uppercase tracking-widest border border-white/5">
                    Quest Level {currentPhaseIndex + 1}
                 </span>
                 <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase">{currentPhase.title}</h1>
           </div>
        </div>

        <div className="hidden lg:flex flex-col items-end gap-3 min-w-[300px]">
           <div className="flex justify-between w-full text-white/40 font-black text-[10px] uppercase tracking-[0.3em]">
              <span>OVERALL PROGRESS</span>
              <span>{Math.round(((currentPhaseIndex + 1) / ASSESSMENT_PHASES.length) * 100)}%</span>
           </div>
           <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentPhaseIndex + 1) / ASSESSMENT_PHASES.length) * 100}%` }}
                transition={{ type: 'spring', damping: 20 }}
              />
           </div>
        </div>
      </header>

      {/* Main Quest Area */}
      <main className="flex-1 overflow-y-auto px-12 py-6 relative z-30 flex items-center justify-center scrollbar-hide">
        <div className="w-full max-w-6xl">
           <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase.id}
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {renderPhaseContent()}
              </motion.div>
           </AnimatePresence>
        </div>
      </main>

      {/* Modern Footer HUD */}
      <footer className="px-12 py-6 bg-black/40 backdrop-blur-md border-t border-white/5 z-30 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2 text-emerald-500/40">
              <ShieldCheck className="w-4 h-4" /> SECURE PSYCHOMETRIC CORE
           </div>
           <div className="h-4 w-px bg-white/5" />
           <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-white/20" /> {achievements.length} BADGES EARNED
           </div>
        </div>
        <div className="flex gap-4">
           {achievements.map((ach, i) => (
             <motion.span 
              initial={{ scale: 0, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              key={i} 
              className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-white/40"
             >
               {ach}
             </motion.span>
           ))}
        </div>
      </footer>
    </div>
  );
};

export default AssessmentEngine;

