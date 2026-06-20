import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Award, Zap } from 'lucide-react';

const AchievementPopup = ({ badge, onDismiss }) => {
  if (!badge) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 80, scale: 0.8 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="fixed bottom-6 right-6 z-[100] w-80 max-w-[calc(100vw-2rem)]"
    >
      <div
        className="relative rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl p-5 shadow-2xl overflow-hidden"
        style={{ boxShadow: `0 0 40px ${badge.color}30` }}
      >
        {/* Colored top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(to right, transparent, ${badge.color}, transparent)` }}
        />

        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none" />

        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/20 transition-all"
        >
          <X size={12} />
        </button>

        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10"
            style={{ background: `${badge.color}20` }}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Award size={24} style={{ color: badge.color }} />
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div
              className="text-[9px] font-black uppercase tracking-[0.15em] mb-1"
              style={{ color: badge.color }}
            >
              Badge Unlocked
            </div>
            <div className="text-white font-bold text-sm leading-tight mb-1">
              {badge.name}
            </div>
            <div className="text-slate-400 text-xs leading-relaxed">
              {badge.description}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// XP notification popup
export const XPPopup = ({ xpAnimation }) => {
  if (!xpAnimation) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={`xp-${xpAnimation.amount}`}
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ type: 'spring', damping: 18, stiffness: 300 }}
        className="fixed bottom-24 right-6 z-[101]"
      >
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/95 border border-yellow-500/30 rounded-2xl shadow-2xl backdrop-blur-xl"
          style={{ boxShadow: '0 0 30px rgba(245,158,11,0.2)' }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -10, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Zap size={18} className="text-yellow-400" fill="currentColor" />
          </motion.div>
          <div>
            <div className="text-yellow-400 font-black text-sm">+{xpAnimation.amount} XP</div>
            <div className="text-slate-400 text-xs">{xpAnimation.message}</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Badge notification queue manager
export const BadgeNotificationManager = ({ recentBadges, onDismiss }) => {
  const topBadge = recentBadges[0] || null;

  return (
    <AnimatePresence>
      {topBadge && (
        <AchievementPopup
          key={topBadge.id}
          badge={topBadge}
          onDismiss={() => onDismiss(topBadge.id)}
        />
      )}
    </AnimatePresence>
  );
};

export default AchievementPopup;
