import React from 'react';

/**
 * Reusable Premium Input Component
 */
const Input = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  helperText = '',
  leftIcon = null,
  rightIcon = null,
  disabled = false,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 tracking-tight"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}
        
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full bg-slate-50/50 dark:bg-slate-900/60 text-slate-800 dark:text-white text-sm md:text-base border ${
            error 
              ? 'border-red-500/80 focus:ring-red-500/20' 
              : 'border-slate-200 dark:border-slate-800 focus:ring-blue-500/20'
          } rounded-2xl ${leftIcon ? 'pl-11' : 'pl-5'} ${rightIcon ? 'pr-11' : 'pr-5'} py-3.5 focus:outline-none focus:ring-4 focus:border-blue-500 transition-all duration-300 placeholder-slate-400/80 dark:placeholder-slate-500/80 disabled:opacity-50 disabled:cursor-not-allowed`}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-4 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <span className="text-xs font-semibold text-red-500 flex items-center gap-1 animate-pulse">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </span>
      ) : helperText ? (
        <span className="text-xs text-slate-400 dark:text-slate-500">{helperText}</span>
      ) : null}
    </div>
  );
};

export default Input;
