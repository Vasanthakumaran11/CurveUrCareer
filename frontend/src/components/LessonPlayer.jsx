import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, Code2, Globe, Target, HelpCircle, Zap, CheckCircle2, XCircle } from 'lucide-react';

// -------------------------------------------------------
// LESSON PLAYER
// Fullscreen step-by-step lesson viewer with 4 phases:
// 1. Concept  2. Code Example  3. Real-World  4. Quiz
// -------------------------------------------------------

const PHASES = [
  { key: 'concept',     label: 'Concept',      icon: HelpCircle, color: '#6366f1' },
  { key: 'code',        label: 'Code',         icon: Code2,      color: '#0ea5e9' },
  { key: 'realworld',   label: 'Real World',   icon: Globe,      color: '#10b981' },
  { key: 'quiz',        label: 'Quiz',         icon: Target,     color: '#f59e0b' },
];

// Quiz sub-component
const QuizPhase = ({ questions, onComplete }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[current];
  const isCorrect = selected === q.answer;

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.answer) setCorrectCount((c) => c + 1);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setDone(true);
    }
  };

  if (done) {
    const pct = Math.round((correctCount / questions.length) * 100);
    const passed = pct >= 67;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center h-full gap-6"
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center border-2"
          style={{
            borderColor: passed ? '#10b981' : '#ef4444',
            background: passed ? '#10b98120' : '#ef444420',
            boxShadow: `0 0 30px ${passed ? '#10b981' : '#ef4444'}30`,
          }}
        >
          {passed
            ? <CheckCircle2 size={36} style={{ color: '#10b981' }} />
            : <XCircle size={36} style={{ color: '#ef4444' }} />
          }
        </div>
        <div>
          <div className="text-3xl font-black text-white mb-1">{pct}%</div>
          <div className="text-slate-400 text-sm">
            {correctCount} of {questions.length} correct
          </div>
        </div>
        <div className="text-lg font-bold" style={{ color: passed ? '#10b981' : '#f59e0b' }}>
          {passed ? 'Excellent work! Moving forward.' : 'Keep going — you will get it!'}
        </div>
        <button
          onClick={() => onComplete(correctCount, questions.length)}
          className="px-8 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
          style={{
            background: passed ? '#10b981' : '#6366f1',
            color: 'white',
            boxShadow: `0 4px 20px ${passed ? '#10b98140' : '#6366f140'}`,
          }}
        >
          {passed ? 'Complete Lesson' : 'Complete Anyway'}
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="text-slate-400 text-sm">
          Question {current + 1} of {questions.length}
        </div>
        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-500 rounded-full transition-all duration-500"
            style={{ width: `${((current) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="text-lg font-bold text-white leading-relaxed">
        {q.question}
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3 flex-1">
        {q.options.map((opt, idx) => {
          let borderColor = 'border-white/10';
          let bg = 'bg-slate-800/50 hover:bg-slate-700/50';
          let textColor = 'text-slate-300';

          if (answered) {
            if (idx === q.answer) {
              borderColor = 'border-green-500';
              bg = 'bg-green-500/15';
              textColor = 'text-green-300';
            } else if (idx === selected) {
              borderColor = 'border-red-500';
              bg = 'bg-red-500/15';
              textColor = 'text-red-300';
            }
          } else if (selected === idx) {
            borderColor = 'border-indigo-500';
            bg = 'bg-indigo-500/20';
          }

          return (
            <motion.button
              key={idx}
              whileHover={!answered ? { scale: 1.01 } : {}}
              whileTap={!answered ? { scale: 0.99 } : {}}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border ${borderColor} ${bg} ${textColor} transition-all duration-200 flex items-center gap-3 font-medium text-sm`}
            >
              <div className="w-6 h-6 rounded-lg border border-current flex items-center justify-center flex-shrink-0 text-xs font-black">
                {String.fromCharCode(65 + idx)}
              </div>
              {opt}
              {answered && idx === q.answer && (
                <CheckCircle2 size={16} className="ml-auto text-green-400" />
              )}
              {answered && idx === selected && idx !== q.answer && (
                <XCircle size={16} className="ml-auto text-red-400" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation and Next */}
      {answered && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`p-4 rounded-xl border mb-4 ${isCorrect ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
            <p className={`text-sm font-semibold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
              {isCorrect ? 'Correct!' : `Correct answer: ${q.options[q.answer]}`}
            </p>
          </div>
          <button
            onClick={handleNext}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all"
          >
            {current + 1 < questions.length ? 'Next Question' : 'See Results'}
          </button>
        </motion.div>
      )}
    </div>
  );
};

// Main LessonPlayer
const LessonPlayer = ({ lesson, courseId, totalLessonsInCourse, onComplete, onClose }) => {
  const [phase, setPhase] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentPhase = PHASES[phase];
  const isLastPhase = phase === PHASES.length - 1;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleQuizComplete = (correct, total) => {
    setCompleted(true);
    if (onComplete) onComplete(lesson.id, lesson.xpReward);
  };

  const handleAdvance = () => {
    if (phase < PHASES.length - 1) {
      setPhase((p) => p + 1);
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-slate-950 flex flex-col"
      >
        {/* Header */}
        <div className="border-b border-white/5 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex items-center gap-4 flex-shrink-0">
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all flex-shrink-0"
          >
            <X size={16} />
          </button>

          <div className="flex-1 min-w-0">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">Learning Lesson</div>
            <div className="text-white font-bold text-sm truncate">{lesson.title}</div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Zap size={14} className="text-yellow-400" fill="currentColor" />
            <span className="text-yellow-400 font-bold text-sm">+{lesson.xpReward} XP</span>
          </div>
        </div>

        {/* Phase Navigation */}
        <div className="border-b border-white/5 bg-slate-900/50 px-6 py-3 flex items-center gap-1 flex-shrink-0 overflow-x-auto">
          {PHASES.map((p, idx) => {
            const PhaseIcon = p.icon;
            const isActive = idx === phase;
            const isPast = idx < phase;

            return (
              <button
                key={p.key}
                onClick={() => idx <= phase && setPhase(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all flex-shrink-0 ${
                  isActive
                    ? 'text-white'
                    : isPast
                    ? 'text-slate-400 hover:text-white cursor-pointer'
                    : 'text-slate-600 cursor-not-allowed'
                }`}
                style={{
                  background: isActive ? `${p.color}20` : 'transparent',
                  border: `1px solid ${isActive ? p.color + '40' : 'transparent'}`,
                }}
              >
                {isPast
                  ? <Check size={12} style={{ color: p.color }} />
                  : <PhaseIcon size={12} style={{ color: isActive ? p.color : 'currentColor' }} />
                }
                <span style={{ color: isActive ? p.color : undefined }}>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Phase Progress Bar */}
        <div className="h-0.5 bg-slate-800">
          <motion.div
            className="h-full"
            style={{ background: currentPhase.color }}
            animate={{ width: `${((phase + 1) / PHASES.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 max-w-3xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {/* Phase Title */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{ borderColor: `${currentPhase.color}40`, background: `${currentPhase.color}15` }}
                >
                  <currentPhase.icon size={20} style={{ color: currentPhase.color }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest" style={{ color: currentPhase.color }}>
                    Phase {phase + 1} of {PHASES.length}
                  </div>
                  <div className="text-white font-bold">{currentPhase.label}</div>
                </div>
              </div>

              {/* CONCEPT PHASE */}
              {phase === 0 && (
                <div>
                  <div className="text-slate-200 text-base leading-relaxed bg-slate-800/30 border border-white/5 rounded-2xl p-6 mb-6">
                    {lesson.concept}
                  </div>
                  {lesson.challenge && (
                    <div className="border border-indigo-500/30 bg-indigo-500/10 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={14} className="text-indigo-400" />
                        <div className="text-indigo-400 text-xs font-bold uppercase tracking-wider">Practice Challenge</div>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">{lesson.challenge}</p>
                    </div>
                  )}
                </div>
              )}

              {/* CODE PHASE */}
              {phase === 1 && (
                <div>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    Study this code example carefully. Understand each line before moving on.
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-white/10">
                    <div className="bg-slate-800/80 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      </div>
                      <Code2 size={12} className="text-slate-500 ml-2" />
                      <span className="text-slate-500 text-xs">example.code</span>
                    </div>
                    <pre className="bg-slate-900 p-5 text-sm text-slate-200 overflow-x-auto leading-relaxed font-mono whitespace-pre-wrap break-words">
                      {lesson.codeExample}
                    </pre>
                  </div>
                </div>
              )}

              {/* REAL WORLD PHASE */}
              {phase === 2 && (
                <div>
                  <div className="border border-emerald-500/30 bg-emerald-500/10 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe size={16} className="text-emerald-400" />
                      <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Real World Connection</div>
                    </div>
                    <p className="text-slate-200 text-base leading-relaxed">{lesson.realWorldExample}</p>
                  </div>

                  <div className="bg-slate-800/30 border border-white/5 rounded-xl p-5">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Key Takeaway</div>
                    <div className="flex items-start gap-3">
                      <Check size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-300 text-sm leading-relaxed">
                        The concept you just learned is used daily by professional developers building real products. Understanding it deeply is what separates good developers from great ones.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* QUIZ PHASE */}
              {phase === 3 && (
                <QuizPhase
                  questions={lesson.quiz}
                  onComplete={handleQuizComplete}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer (nav for phases 0-2) */}
        {phase < 3 && (
          <div className="border-t border-white/5 px-6 py-4 flex items-center justify-between bg-slate-950/80 backdrop-blur-md flex-shrink-0">
            <button
              onClick={() => phase > 0 && setPhase((p) => p - 1)}
              disabled={phase === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-white/5"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {PHASES.map((_, idx) => (
                <div
                  key={idx}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: idx === phase ? currentPhase.color : idx < phase ? '#4ade80' : '#374151',
                    width: idx === phase ? '20px' : '6px',
                    borderRadius: idx === phase ? '4px' : '50%',
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleAdvance}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${currentPhase.color}, ${currentPhase.color}90)`,
                boxShadow: `0 4px 15px ${currentPhase.color}30`,
              }}
            >
              {phase === 2 ? 'Take Quiz' : 'Next'}
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default LessonPlayer;
