/**
 * Design system theme tokens for CurveUrCareer
 * Centralized styles, spacing, typography and shadows to build premium consistent UI.
 */

export const themeTokens = {
  colors: {
    brand: {
      cyan: '#06b6d4',
      blue: '#2563eb',
      indigo: '#4f46e5',
      purple: '#9333ea',
      violet: '#7c3aed',
      emerald: '#10b981',
      rose: '#f43f5e',
    },
    darkBg: 'bg-slate-950',
    lightBg: 'bg-white',
    text: {
      darkTitle: 'text-slate-900',
      darkBody: 'text-slate-600',
      lightTitle: 'text-white',
      lightBody: 'text-slate-300',
    }
  },

  gradients: {
    cyanBlue: 'bg-gradient-to-r from-cyan-500 to-blue-600',
    violetIndigo: 'bg-gradient-to-r from-violet-600 to-indigo-600',
    emeraldTeal: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    roseRed: 'bg-gradient-to-r from-rose-500 to-red-600',
    goldOrange: 'bg-gradient-to-r from-amber-400 to-orange-500',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20',
    glassDark: 'bg-slate-900/60 backdrop-blur-xl border border-slate-800/80',
    textPremium: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400',
    textDarkPremium: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600',
  },

  shadows: {
    premium: 'shadow-[0_20px_50px_rgba(8,112,184,0.15)]',
    glass: 'shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]',
    cyanGlow: 'shadow-lg shadow-cyan-500/20',
    blueGlow: 'shadow-lg shadow-blue-500/20',
    purpleGlow: 'shadow-lg shadow-purple-500/20',
    emeraldGlow: 'shadow-lg shadow-emerald-500/20',
  },

  transitions: {
    smooth: 'transition-all duration-300 ease-in-out',
    premium: 'transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)',
  },

  shapes: {
    card: 'rounded-3xl',
    input: 'rounded-2xl',
    button: 'rounded-xl',
  }
};
