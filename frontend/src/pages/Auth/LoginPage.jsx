import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff, Sparkles, TrendingUp, Users, Compass } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useSettings } from '../../hooks/useSettings';
import { motion } from 'framer-motion';

const stats = [
  { icon: Users, value: '50K+', label: 'Students' },
  { icon: TrendingUp, value: '94%', label: 'Growth Rate' },
  { icon: Compass, value: '200+', label: 'Career Paths' },
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
      navigate('/');
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
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to log in with Google.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* ── LEFT BRAND PANEL ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden p-12 min-h-screen"
        style={{
          background: 'linear-gradient(135deg, #032b20 0%, #011c15 100%)',
        }}
      >
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(16,185,129,0.12),transparent_50%)] pointer-events-none" />

        {/* Fiber Optics SVG Overlay */}
        <svg
          className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-45"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
          </defs>
          <path d="M800,250 C700,200 500,160 400,80 C300,0 200,-40 100,-80" stroke="rgba(52, 211, 153, 0.3)" strokeWidth="1" filter="url(#glow)" />
          <path d="M800,250 C740,180 580,120 440,60 C300,-10 240,-40 140,-80" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="1.5" filter="url(#glow)" />
          <path d="M800,250 C770,140 680,80 480,40 C300,0 180,-15 80,-40" stroke="rgba(52, 211, 153, 0.2)" strokeWidth="0.8" opacity="0.6" />
          <path d="M800,250 C710,320 580,360 380,380 C180,400 80,420 -20,440" stroke="rgba(52, 211, 153, 0.35)" strokeWidth="1.2" filter="url(#glow)" />
          <path d="M800,250 C730,350 630,420 480,460 C330,500 180,540 30,580" stroke="rgba(52, 211, 153, 0.25)" strokeWidth="1" filter="url(#glow)" />
          <path d="M800,250 C750,380 680,480 530,540 C380,600 230,650 80,670" stroke="rgba(52, 211, 153, 0.45)" strokeWidth="1.6" filter="url(#glow)" />
          <circle cx="400" cy="80" r="2" fill="white" className="animate-ping" />
          <circle cx="440" cy="60" r="1.5" fill="white" />
          <circle cx="380" cy="380" r="2" fill="white" className="animate-ping" />
          <circle cx="480" cy="460" r="1.5" fill="white" />
        </svg>

        {/* Decorative Plants SVG Overlay */}
        <svg
          className="absolute bottom-0 left-0 w-56 h-56 pointer-events-none opacity-40 text-emerald-900"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M0,200 C30,170 60,160 80,130 C100,100 90,60 100,20" stroke="currentColor" strokeWidth="3" fill="none" />
          {/* Leaf 1 */}
          <path d="M40,160 C50,150 70,155 75,170 C70,180 50,175 40,160 Z" />
          {/* Leaf 2 */}
          <path d="M70,120 C85,110 95,115 100,130 C90,135 80,130 70,120 Z" />
          {/* Leaf 3 */}
          <path d="M90,70 C105,60 115,65 120,80 C110,85 100,80 90,70 Z" />
          {/* Leaf 4 */}
          <path d="M100,20 C110,10 120,15 125,30 C115,35 105,30 100,20 Z" />
          {/* Secondary stem */}
          <path d="M0,200 C40,150 70,110 120,100" stroke="currentColor" strokeWidth="2" fill="none" />
          {/* Leaf 5 */}
          <path d="M30,180 C40,170 50,175 55,185 C45,190 35,185 30,180 Z" />
          {/* Leaf 6 */}
          <path d="M60,140 C75,130 80,135 85,145 C75,150 65,145 60,140 Z" />
          {/* Leaf 7 */}
          <path d="M95,110 C110,100 115,105 120,115 C110,120 100,115 95,110 Z" />
        </svg>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="28" fill="url(#logoGrad)" />
            <path d="M 30,70 C 35,50 65,50 70,30" stroke="white" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="30" cy="70" r="8" fill="white" />
            <circle cx="70" cy="30" r="8" fill="white" />
            <circle cx="50" cy="50" r="10" fill="white" />
          </svg>
          <span className="text-white font-extrabold text-2xl tracking-tight">CurveUrCareer</span>
        </div>

        {/* Centre content */}
        <div className="relative z-10 px-8 flex-1 flex flex-col justify-center my-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-white font-extrabold text-4xl leading-tight mb-4">
              Welcome back,<br />
              <span className="text-[#10b981]">let's keep growing.</span>
            </h2>
            <p className="text-emerald-100/80 text-sm leading-relaxed max-w-sm">
              Pick up right where you left off. Your skills, courses, and career roadmap are all waiting for you.
            </p>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 flex justify-center items-center"
          >
            <img
              src="/login-illustration.png"
              alt="Student learning"
              className="w-full max-w-[440px] h-auto object-contain select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
            />
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="relative z-10 grid grid-cols-3 gap-4 w-full">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex flex-col items-center rounded-2xl p-4 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              <Icon className="w-5 h-5 text-emerald-400 mb-2" />
              <span className="text-white font-extrabold text-lg leading-none">{value}</span>
              <span className="text-emerald-200/60 text-[10px] uppercase tracking-wider mt-1">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="flex-1 flex flex-col justify-center items-center bg-slate-50 px-6 py-12 relative min-h-screen">
        {/* Mobile logo */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
          <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="28" fill="url(#logoGrad)" />
            <path d="M 30,70 C 35,50 65,50 70,30" stroke="white" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="30" cy="70" r="8" fill="white" />
            <circle cx="70" cy="30" r="8" fill="white" />
            <circle cx="50" cy="50" r="10" fill="white" />
          </svg>
          <span className="font-extrabold text-slate-800 text-lg">CurveUrCareer</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[480px] bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100/50"
        >
          {/* Heading */}
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[#059669] mb-1.5">Welcome Back</p>
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-[#059669] hover:underline transition-colors">
                Sign up free
              </Link>
            </p>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/80 transition-all duration-200 font-semibold text-slate-700 shadow-sm mb-6 text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.354 0 3.373 2.736 1.49 6.72l3.776 3.045Z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.273c0-.818-.073-1.609-.209-2.373H12v4.509h6.445c-.277 1.482-1.118 2.736-2.373 3.582l3.7 2.873c2.164-2 3.718-4.945 3.718-8.59Z"
              />
              <path
                fill="#FBBC05"
                d="M5.266 14.235A7.002 7.002 0 0 1 4.909 12c0-.79.136-1.545.357-2.235L1.49 6.72A11.954 11.954 0 0 0 0 12c0 1.927.455 3.745 1.255 5.373l4.01-3.138Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.245 0 5.973-1.082 7.964-2.918l-3.7-2.873c-1.027.69-2.336 1.1-4.264 1.1-3.282 0-6.073-2.218-7.064-5.209l-4.01 3.137C3.373 21.264 7.354 24 12 24Z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">or sign in with email</span>
            <div className="flex-1 h-px bg-slate-200" />
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
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#059669] transition-all text-slate-800 text-sm shadow-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">Password</label>
                <a href="#" className="text-xs font-bold text-[#059669] hover:underline transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#059669] transition-all text-slate-800 text-sm shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all duration-300 bg-[#059669] hover:bg-[#047857] shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 overflow-hidden mt-6 text-sm"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                  {/* Sparkle decoration */}
                  <svg className="absolute bottom-1 right-2 w-4 h-4 opacity-40 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-slate-500 leading-relaxed max-w-[320px]">
          By signing in, you agree to our{' '}
          <a href="#" className="font-bold text-slate-800 hover:underline">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="font-bold text-slate-800 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
