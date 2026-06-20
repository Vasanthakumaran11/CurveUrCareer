import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, ChevronRight } from 'lucide-react';
import { ROADMAP_STAGES } from '../data/learningData';

// Animated 6-stage career roadmap
const RoadmapEngine = ({ currentStage, getStageProgress, onStageClick }) => {
  return (
    <div className="w-full">
      {/* Desktop layout: horizontal timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-8 left-12 right-12 h-0.5 bg-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(100, ((currentStage - 1) / (ROADMAP_STAGES.length - 1)) * 100)}%`,
              }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </div>

          {/* Stage nodes */}
          <div className="relative grid grid-cols-6 gap-2">
            {ROADMAP_STAGES.map((stage, idx) => {
              const stageProgress = getStageProgress ? getStageProgress(stage.id) : { percent: 0, isUnlocked: idx === 0, isComplete: false };
              const isUnlocked = stageProgress.isUnlocked;
              const isComplete = stageProgress.isComplete;
              const isCurrent = stage.id === currentStage;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                  onClick={() => onStageClick && onStageClick(stage)}
                >
                  {/* Node */}
                  <div className="relative">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-105"
                      style={{
                        borderColor: isComplete
                          ? '#10b981'
                          : isCurrent
                          ? stage.color
                          : isUnlocked
                          ? `${stage.color}60`
                          : '#374151',
                        background: isComplete
                          ? '#10b98120'
                          : isCurrent
                          ? `${stage.color}20`
                          : isUnlocked
                          ? `${stage.color}10`
                          : '#1e293b',
                        boxShadow: (isCurrent || isComplete)
                          ? `0 0 20px ${isComplete ? '#10b98140' : stage.color + '40'}`
                          : 'none',
                      }}
                    >
                      {isComplete ? (
                        <Check size={24} className="text-emerald-400" />
                      ) : isUnlocked ? (
                        <span className="text-2xl">{stage.icon}</span>
                      ) : (
                        <Lock size={20} className="text-slate-600" />
                      )}
                    </motion.div>

                    {/* Current stage pulse */}
                    {isCurrent && !isComplete && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2"
                        style={{ borderColor: stage.color }}
                        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    )}

                    {/* Stage number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
                      style={{
                        background: isComplete ? '#10b981' : isUnlocked ? stage.color : '#374151',
                        color: 'white',
                      }}
                    >
                      {stage.id}
                    </div>
                  </div>

                  {/* Progress ring (small arc below node) */}
                  {isUnlocked && !isComplete && stageProgress.percent > 0 && (
                    <div className="h-1 w-12 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: stage.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${stageProgress.percent}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  )}

                  {/* Title */}
                  <div className="text-center">
                    <div
                      className="text-xs font-bold leading-tight mb-0.5"
                      style={{ color: isUnlocked ? 'white' : '#475569' }}
                    >
                      {stage.title}
                    </div>
                    <div className="text-[10px] text-slate-600 leading-tight">{stage.subtitle}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile layout: vertical list */}
      <div className="md:hidden flex flex-col gap-3">
        {ROADMAP_STAGES.map((stage, idx) => {
          const stageProgress = getStageProgress ? getStageProgress(stage.id) : { percent: 0, isUnlocked: idx === 0, isComplete: false };
          const isUnlocked = stageProgress.isUnlocked;
          const isComplete = stageProgress.isComplete;
          const isCurrent = stage.id === currentStage;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all"
              style={{
                borderColor: isCurrent ? `${stage.color}50` : isComplete ? '#10b98130' : '#1e293b',
                background: isCurrent ? `${stage.color}08` : 'rgba(15,23,42,0.5)',
              }}
              onClick={() => onStageClick && onStageClick(stage)}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border"
                style={{
                  borderColor: isComplete ? '#10b981' : isUnlocked ? `${stage.color}50` : '#374151',
                  background: isComplete ? '#10b98120' : isUnlocked ? `${stage.color}15` : '#1e293b',
                }}
              >
                {isComplete
                  ? <Check size={20} className="text-emerald-400" />
                  : isUnlocked
                  ? <span className="text-xl">{stage.icon}</span>
                  : <Lock size={16} className="text-slate-600" />
                }
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white">{stage.title}</div>
                <div className="text-xs text-slate-500">{stage.subtitle}</div>
                {isUnlocked && !isComplete && stageProgress.percent > 0 && (
                  <div className="mt-2 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ background: stage.color, width: `${stageProgress.percent}%` }}
                    />
                  </div>
                )}
              </div>

              <ChevronRight size={16} className={isUnlocked ? 'text-slate-400' : 'text-slate-700'} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Compact stage detail card (shown when a stage is clicked)
export const StageDetailCard = ({ stage, stageProgress, onClose }) => {
  if (!stage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border p-6"
      style={{ borderColor: `${stage.color}30`, background: `${stage.color}08` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border"
            style={{ borderColor: `${stage.color}40`, background: `${stage.color}20` }}
          >
            {stage.icon}
          </div>
          <div>
            <div className="text-white font-bold">{stage.title}</div>
            <div className="text-sm" style={{ color: stage.color }}>{stage.subtitle}</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-sm">
            Close
          </button>
        )}
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-4">{stage.description}</p>

      {stageProgress.percent > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500">Progress</span>
            <span style={{ color: stage.color }}>{stageProgress.percent}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: stage.color }}
              initial={{ width: 0 }}
              animate={{ width: `${stageProgress.percent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      )}

      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Career Outcomes</div>
        <div className="flex flex-wrap gap-2">
          {stage.outcomes.map((outcome, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-lg text-xs font-semibold border"
              style={{ borderColor: `${stage.color}30`, color: stage.color, background: `${stage.color}10` }}
            >
              {outcome}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RoadmapEngine;
