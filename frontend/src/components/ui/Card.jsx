import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Premium Card Component
 */
const Card = ({
  children,
  onClick,
  variant = 'glass', // glass | glassPremium | border | flat
  hoverEffect = true,
  glowColor = null, // cyan | blue | purple | emerald | pink | null
  className = '',
  ...props
}) => {
  // Styles based on variant
  const variantStyles = {
    glass: 'bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/80 shadow-md',
    glassPremium: 'bg-white/10 dark:bg-slate-900/20 backdrop-blur-xl border border-white/20 dark:border-slate-800/60 shadow-[0_50px_100px_rgba(0,0,0,0.06)]',
    border: 'bg-transparent border border-slate-200 dark:border-slate-800',
    flat: 'bg-slate-50 dark:bg-slate-900 border border-transparent'
  };

  // Glow styles mapping
  const glowStyles = {
    cyan: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] border-cyan-500/20 dark:border-cyan-500/10',
    blue: 'hover:shadow-[0_0_40px_rgba(37,99,235,0.15)] border-blue-500/20 dark:border-blue-500/10',
    purple: 'hover:shadow-[0_0_40px_rgba(147,51,234,0.15)] border-purple-500/20 dark:border-purple-500/10',
    emerald: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] border-emerald-500/20 dark:border-emerald-500/10',
    pink: 'hover:shadow-[0_0_40px_rgba(244,63,94,0.15)] border-pink-500/20 dark:border-pink-500/10',
  };

  const isInteractive = !!onClick;

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
      className={`
        relative rounded-[2rem] p-6 overflow-hidden transition-all duration-500
        ${variantStyles[variant] || variantStyles.glass} 
        ${glowColor && glowStyles[glowColor] ? glowStyles[glowColor] : ''}
        ${isInteractive ? 'cursor-pointer select-none active:scale-[0.99]' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Decorative gradient overlay for premium cards */}
      {variant === 'glassPremium' && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[2rem]" />
      )}
      
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
