import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Premium Button Component
 */
const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary | secondary | premium | danger | success | outline | ghost
  size = 'md', // sm | md | lg
  disabled = false,
  loading = false,
  className = '',
  leftIcon = null,
  rightIcon = null,
  ...props
}) => {
  // Styles based on variant
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 border border-transparent shadow-md',
    secondary: 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 shadow-sm',
    premium: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-cyan-500/20 shadow-lg border border-transparent',
    danger: 'bg-red-500 hover:bg-red-600 text-white border border-transparent shadow-md shadow-red-500/10',
    success: 'bg-emerald-500 hover:bg-emerald-600 text-white border border-transparent shadow-md shadow-emerald-500/10',
    outline: 'bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-transparent'
  };

  // Styles based on size
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs font-semibold rounded-lg',
    md: 'px-6 py-3 text-sm font-bold rounded-xl',
    lg: 'px-8 py-4 text-base font-bold rounded-2xl'
  };

  const baseStyles = 'inline-flex items-center justify-center gap-2 select-none active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:pointer-events-none';

  return (
    <motion.button
      whileHover={{ y: disabled || loading ? 0 : -2, scale: disabled || loading ? 1 : 1.01 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      
      {!loading && leftIcon && <span className="flex items-center justify-center">{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span className="flex items-center justify-center">{rightIcon}</span>}
    </motion.button>
  );
};

export default Button;
