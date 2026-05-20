import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff, Sparkles, BookOpen, Target, Zap } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useSettings } from '../../hooks/useSettings';
import { motion } from 'framer-motion';

const features = [
  { icon: BookOpen, title: 'Curated Learning Paths', desc: 'AI-powered courses tailored to your goals' },
  { icon: Target, title: 'Skill Gap Analyzer', desc: 'Know exactly what skills you need to grow' },
  { icon: Zap, title: 'Career Roadmaps', desc: 'Step-by-step guidance to your dream career' },
];

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const { t } = useSettings();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signup(email, password, name);
      navigate('/learning');
    } catch (err) {
      setError('Failed to create an account. ' + (err.message || ''));
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/learning');
    } catch (err) {
      setError(err.message || 'Failed to sign up with Google.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* ── LEFT FORM PANEL ── */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-8 py-12 relative order-1 lg:order-none">
        {/* Mobile logo */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-violet-600" />
          <span className="font-extrabold text-slate-800 text-lg">CurveUrCareer</span>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Heading */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-2">Create your account</p>
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Start your journey today
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-violet-600 hover:text-violet-700 hover:underline transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogleSignup}
            type="button"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all duration-200 font-semibold text-slate-700 shadow-sm hover:shadow mb-6"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-widest">or with email</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3"
            >
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all text-slate-800 text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all text-slate-800 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all text-slate-800 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all duration-300 group mt-2"
              style={{
                background: loading
                  ? '#c4b5fd'
                  : 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
                boxShadow: loading ? 'none' : '0 4px 24px rgba(124, 58, 237, 0.35)',
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4 mr-1 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-slate-400 leading-relaxed">
            By signing up, you agree to our{' '}
            <a href="#" className="text-slate-600 hover:underline font-medium">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-slate-600 hover:underline font-medium">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>

      {/* ── RIGHT BRAND PANEL ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #2d1b69 0%, #5b21b6 40%, #7c3aed 70%, #9333ea 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #ddd6fe 0%, transparent 70%)' }} />

        {/* Floating grid dots */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Logo */}
        <div className="relative z-10 p-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">CurveUrCareer</span>
          </div>
        </div>

        {/* Centre content */}
        <div className="relative z-10 px-12 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-white font-extrabold text-4xl leading-tight mb-4">
              Everything you need<br />
              <span style={{ color: '#ddd6fe' }}>to succeed in one place.</span>
            </h2>
            <p className="text-violet-200 text-base leading-relaxed max-w-sm">
              Join 50,000+ students discovering their potential and building the career they've always dreamed of.
            </p>
          </motion.div>

          {/* Feature cards */}
          <div className="mt-8 space-y-3">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="flex items-start gap-4 p-4 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{title}</p>
                  <p className="text-violet-300 text-xs mt-0.5">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer quote */}
        <div className="relative z-10 px-12 py-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['👩‍💻', '👨‍🎓', '👩‍🔬'].map((em, i) => (
                <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 border-violet-700"
                  style={{ background: 'rgba(255,255,255,0.15)' }}>{em}</div>
              ))}
            </div>
            <p className="text-violet-200 text-xs">
              <span className="font-bold text-white">1,200+ students</span> joined this week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
