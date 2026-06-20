import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, Flame } from 'lucide-react';
import { getLevelFromXP, XP_LEVELS } from '../data/learningData';

const GamificationBar = ({ totalXP, streak }) => {
  const levelInfo = useMemo(() => getLevelFromXP(totalXP), [totalXP]);

  // XP progress within the current level
  const progress = Math.min(100, Math.round(
    ((totalXP - levelInfo.minXP) / (levelInfo.maxXP - levelInfo.minXP)) * 100
  ));
  const xpToNext = Math.max(0, levelInfo.maxXP - totalXP);
  const nextLevel = levelInfo.level + 1;

  return (
    <div className="gamification-bar fixed top-16 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4">

        {/* Level Badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="relative">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
              style={{
                background: `linear-gradient(135deg, ${levelInfo.color}, ${levelInfo.color}80)`,
                boxShadow: `0 0 12px ${levelInfo.color}50`,
              }}
            >
              {levelInfo.level}
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Level</div>
            <div className="text-xs font-bold text-white leading-tight">{levelInfo.title}</div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Zap size={11} className="text-yellow-400" fill="currentColor" />
              <span className="text-yellow-400 font-bold text-xs">{totalXP.toLocaleString()} XP</span>
            </div>
            <span className="text-[10px] text-slate-500">
              {xpToNext} XP to Lv.{nextLevel}
            </span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(to right, ${levelInfo.color}90, ${levelInfo.color})`,
                boxShadow: `0 0 6px ${levelInfo.color}60`,
              }}
            />
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <Flame size={14} className="text-orange-400" fill="currentColor" />
          <span className="text-orange-400 font-bold text-sm">{streak}</span>
          <span className="text-slate-500 text-[10px] hidden sm:block">day streak</span>
        </div>

      </div>
    </div>
  );
};

export default GamificationBar;
