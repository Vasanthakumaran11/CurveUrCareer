import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff, Sparkles, TrendingUp, Users, Award } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useSettings } from '../../hooks/useSettings';
import { motion } from 'framer-motion';

const stats = [
  { icon: Users, value: '50K+', label: 'Students' },
  { icon: TrendingUp, value: '94%', label: 'Growth Rate' },
  { icon: Award, value: '200+', label: 'Career Paths' },
];

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const { t } = useSettings();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/learning');
    } catch (err) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/learning');
    } catch (err) {
      setError(err.message || 'Failed to log in with Google.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* ── LEFT BRAND PANEL ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0d4f3c 0%, #0a7c5c 40%, #1a9e7a 70%, #2dd4a7 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #a7f3d0 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 right-[-40px] w-48 h-48 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }} />

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
              Welcome back,<br />
              <span style={{ color: '#a7f3d0' }}>let's keep growing.</span>
            </h2>
            <p className="text-emerald-100 text-base leading-relaxed max-w-sm">
              Pick up right where you left off. Your skills, courses, and career roadmap are all waiting for you.
            </p>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 mb-8 rounded-3xl overflow-hidden shadow-2xl"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <img
              src="https://illustrations.popsy.co/emerald/man-working-from-home.svg"
              alt="Student learning"
              className="w-full h-56 object-contain"
              style={{ background: 'rgba(255,255,255,0.08)', padding: '24px' }}
            />
          </motion.div>

          {/* Stats row */}
          <div className="flex gap-6">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex flex-col items-center rounded-2xl px-4 py-3 flex-1"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
              >
                <Icon className="w-4 h-4 text-emerald-200 mb-1" />
                <span className="text-white font-extrabold text-lg leading-none">{value}</span>
                <span className="text-emerald-200 text-xs mt-0.5">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer quote */}
        <div className="relative z-10 px-12 py-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
          <p className="text-emerald-100 text-sm italic">
            "The secret of getting ahead is getting started." — Mark Twain
          </p>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-8 py-12 relative">
        {/* Mobile logo */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span className="font-extrabold text-slate-800 text-lg">CurveUrCareer</span>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Heading */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Welcome back</p>
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
                Sign up free
              </Link>
            </p>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all duration-200 font-semibold text-slate-700 shadow-sm hover:shadow mb-6"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-widest">or sign in with email</span>
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
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-slate-800 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-slate-800 text-sm"
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
                  ? '#6ee7b7'
                  : 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
                boxShadow: loading ? 'none' : '0 4px 24px rgba(5, 150, 105, 0.35)',
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4 mr-1 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Terms */}
          <p className="mt-8 text-center text-xs text-slate-400 leading-relaxed">
            By signing in, you agree to our{' '}
            <a href="#" className="text-slate-600 hover:underline font-medium">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-slate-600 hover:underline font-medium">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
