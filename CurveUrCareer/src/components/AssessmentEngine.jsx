// Assessment Engine - Enhanced for Total Immersion
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSESSMENT_PHASES, ASSESSMENT_ITEMS } from '../data/assessmentData';
import { useFormData } from '../hooks/useFormData';
import { calculateRawScores, normalizeScores, getCareerMapping } from '../utils/assessmentLogic';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Brain, 
  Target, 
  Zap, 
  Users, 
  TrendingUp,
  Crown,
  Banknote,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const icons = {
  'mind-works': Brain,
  'decision-lab': Target,
  'build-fix': Zap,
  'leadership-hq': Crown,
  'finance-zone': Banknote,
  'future-zone': TrendingUp
};

const AssessmentEngine = () => {
  const { updateFormData } = useFormData();
  const navigate = useNavigate();
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentPhase = ASSESSMENT_PHASES[currentPhaseIndex];
  const phaseItems = ASSESSMENT_ITEMS.filter(item => item.phase === currentPhase.id);
  const currentItem = phaseItems[currentItemIndex];

  // Safety check to prevent crash if no items found for a phase
  if (!currentItem) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
        <p className="text-xl font-bold">Synchronizing Evaluation Data...</p>
        <button 
          onClick={() => {
            if (currentPhaseIndex < ASSESSMENT_PHASES.length - 1) {
              setCurrentPhaseIndex(prev => prev + 1);
              setCurrentItemIndex(0);
            } else {
              setIsFinished(true);
            }
          }}
          className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all"
        >
          Skip to next phase
        </button>
      </div>
    );
  }

  const handleResponse = (response) => {
    const newResponses = [
      ...responses.filter(r => r.itemId !== currentItem.id),
      { itemId: currentItem.id, ...response }
    ];
    setResponses(newResponses);

    if (currentItemIndex < phaseItems.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    } else if (currentPhaseIndex < ASSESSMENT_PHASES.length - 1) {
      setCurrentPhaseIndex(currentPhaseIndex + 1);
      setCurrentItemIndex(0);
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
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-700 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card z-10 max-w-2xl w-full mx-4 p-12 text-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-[3rem] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
          <div className="p-6 inline-block rounded-full bg-emerald-500/20 mb-8 border border-emerald-400/30">
            <CheckCircle2 className="w-24 h-24 text-white" />
          </div>
          <h2 className="text-5xl font-black text-white mb-6 tracking-tight">EVALUATION COMPLETE</h2>
          <p className="text-emerald-50 text-xl font-medium leading-relaxed mb-12 opacity-90">
            Your unique cognitive DNA has been mapped. We've unlocked your specialized career clusters based on leadership, financial savvy, and creative depth.
          </p>
          <button
            onClick={() => navigate('/results')}
            className="group relative inline-flex items-center gap-3 px-12 py-5 bg-white text-emerald-800 rounded-2xl font-black text-xl hover:bg-emerald-50 transition-all hover:scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
          >
            VIEW CAREER BLUEPRINT <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  const ProgressIcon = icons[currentPhase.id] || Sparkles;
  const themeColors = {
    indigo: 'from-indigo-900 to-slate-900',
    blue: 'from-blue-900 to-slate-900',
    purple: 'from-purple-900 to-slate-900',
    amber: 'from-amber-900 to-slate-900',
    emerald: 'from-emerald-900 to-slate-900',
    rose: 'from-rose-900 to-slate-900'
  };

  const totalItems = ASSESSMENT_ITEMS.length;
  const itemsBeforeCurrentPhase = ASSESSMENT_ITEMS.filter(it => {
    const phaseIdx = ASSESSMENT_PHASES.findIndex(p => p.id === it.phase);
    return phaseIdx < currentPhaseIndex;
  }).length;
  const currentOverallIndex = itemsBeforeCurrentPhase + currentItemIndex + 1;

  return (
    <div className={`h-screen w-full flex flex-col overflow-hidden bg-gradient-to-br ${themeColors[currentPhase.theme]} relative`}>
      {/* Immersive Background Patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Header / Meta */}
      <div className="px-8 pt-10 pb-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-6">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPhase.id}
              initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 45, opacity: 0 }}
              className={`p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white`}
            >
              <ProgressIcon className="w-10 h-10" />
            </motion.div>
          </AnimatePresence>
          <div>
            <h3 className="text-white/60 font-bold uppercase tracking-[0.2em] text-sm">PHASE {currentPhaseIndex + 1} OF {ASSESSMENT_PHASES.length}</h3>
            <h2 className="text-3xl font-black text-white tracking-tight">{currentPhase.title}</h2>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 min-w-[200px]">
          <div className="flex justify-between w-full text-white/80 font-bold text-sm uppercase tracking-widest">
            <span>Question {currentItemIndex + 1} / {phaseItems.length}</span>
            <span>{Math.round((currentOverallIndex / totalItems) * 100)}%</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/10">
            <motion.div 
              className={`h-full bg-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.5)]`} 
              initial={{ width: 0 }}
              animate={{ width: `${(currentOverallIndex / totalItems) * 100}%` }}
              transition={{ type: 'spring', damping: 15 }}
            />
          </div>
        </div>
      </div>

      {/* Assessment Content */}
      <div className="flex-1 overflow-y-auto px-8 py-12 flex items-center justify-center relative z-20">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentItem.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl w-full"
          >
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs uppercase tracking-widest backdrop-blur-sm">
                  {currentItem.type.replace('-', ' ')}
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                  {currentItem.question}
                </h1>
              </div>

              {/* Show Image if available for pictorial questions */}
              {currentItem.imageUrl && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="rounded-[3rem] overflow-hidden border-4 border-white/20 bg-white/5 backdrop-blur-lg shadow-2xl group"
                >
                  <img 
                    src={currentItem.imageUrl} 
                    alt="Question Visual" 
                    className="w-full h-auto max-h-[400px] object-cover transition-transform group-hover:scale-105 duration-700"
                  />
                </motion.div>
              )}

              {renderItemInput(currentItem, handleResponse)}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Branding */}
      <div className="py-6 px-12 flex justify-between items-center bg-black/20 backdrop-blur-md border-t border-white/5 relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]"></div>
          <span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Neural Processing Active</span>
        </div>
        <span className="text-white/20 font-bold tracking-[0.3em] text-[10px]">CURVEURCAREER IMMERSION CORE v2.0</span>
      </div>
    </div>
  );
};

// Enhanced Item Input Renderer
const renderItemInput = (item, onResponse) => {
  switch (item.type) {
    case 'pattern-grid':
    case 'logic-puzzle':
    case 'tone-check':
    case 'trend-predictor':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {item.options.map((option, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onResponse({ value: option })}
              className="p-8 text-left bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 rounded-3xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-white/10 group-hover:bg-white transition-colors"></div>
              <span className="block text-xl font-bold text-white/90 group-hover:text-white leading-snug">
                {typeof option === 'string' ? option : option.text}
              </span>
            </motion.button>
          ))}
        </div>
      );

    case 'scenario-sim':
    case 'social-sim':
      return (
        <div className="space-y-5">
          {item.options.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ x: 10 }}
              onClick={() => onResponse({ choiceId: option.id })}
              className="w-full p-8 text-left bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 rounded-[2.5rem] transition-all group flex items-start gap-6 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex-shrink-0 flex items-center justify-center font-black text-2xl text-white group-hover:bg-white group-hover:text-slate-900 transition-all">
                {option.id.toUpperCase()}
              </div>
              <span className="text-xl font-bold text-white/80 group-hover:text-white leading-relaxed">
                {option.text}
              </span>
            </motion.button>
          ))}
        </div>
      );

    case 'sequence-order':
    case 'ranking-task':
    case 'drag-drop-build':
      return (
        <SequenceInput item={item} onResponse={onResponse} />
      );

    case 'creative-prompt':
      return (
        <div className="space-y-8">
          <textarea
            className="w-full p-8 bg-white/5 border border-white/10 rounded-[2.5rem] focus:bg-white/10 focus:border-white/40 outline-none min-h-[220px] text-2xl text-white font-medium placeholder-white/20 transition-all"
            placeholder="Describe your innovative vision here..."
            id={`prompt-${item.id}`}
          />
          <div className="flex justify-end">
            <button
              onClick={() => {
                const val = document.getElementById(`prompt-${item.id}`).value;
                if (!val) return;
                onResponse({ value: val });
              }}
              className="group flex items-center gap-4 px-12 py-5 bg-white text-slate-900 rounded-3xl font-black text-xl hover:bg-emerald-400 hover:text-white transition-all shadow-2xl"
            >
              PROJECT VISION <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      );

    default:
      return <div className="text-white bg-red-500/20 p-8 rounded-3xl border border-red-500/30">Unsupported UI Module: {item.type}</div>;
  }
};

const SequenceInput = ({ item, onResponse }) => {
  const [currentItems, setCurrentItems] = useState(item.items);
  
  const moveItem = (index, direction) => {
    const newItems = [...currentItems];
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= currentItems.length) return;
    [newItems[index], newItems[newIdx]] = [newItems[newIdx], newItems[index]];
    setCurrentItems(newItems);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {currentItems.map((text, idx) => (
          <motion.div 
            layout
            key={text} 
            className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all"
          >
            <span className="text-xl font-bold text-white/80">{text}</span>
            <div className="flex gap-3">
              <button 
                onClick={() => moveItem(idx, -1)} 
                disabled={idx === 0}
                className="p-3 bg-white/5 hover:bg-white/20 text-white rounded-xl disabled:opacity-10 border border-white/10 transition-all"
              >
                <ArrowLeft className="w-5 h-5 rotate-90" />
              </button>
              <button 
                onClick={() => moveItem(idx, 1)} 
                disabled={idx === currentItems.length - 1}
                className="p-3 bg-white/5 hover:bg-white/20 text-white rounded-xl disabled:opacity-10 border border-white/10 transition-all"
              >
                <ArrowRight className="w-5 h-5 rotate-90" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        onClick={() => onResponse({ value: currentItems.map(val => item.items.indexOf(val)) })}
        className="w-full py-6 mt-8 bg-white text-slate-900 rounded-3xl font-black text-2xl hover:bg-emerald-400 hover:text-white transition-all shadow-2xl"
      >
        LOCK SEQUENCE
      </button>
    </div>
  );
};

export default AssessmentEngine;
