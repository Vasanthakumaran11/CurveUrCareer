import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Terminal, Cpu, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col justify-between pt-24">
      {/* Dynamic Futuristic Background Assets */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Cyber Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float pointer-events-none" />

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-xl w-full text-center"
        >
          {/* Neon Top Icon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-8 shadow-lg shadow-cyan-500/10">
            <Terminal size={14} className="animate-pulse" />
            <span>PLATFORM ORIGINS</span>
          </div>

          {/* Core Glass Card */}
          <div className="relative group">
            {/* Soft border outer glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000" />
            
            <div className="relative backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-10 md:p-12 shadow-2xl overflow-hidden">
              {/* Shiny corner flares */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none" />

              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 leading-tight">
                About CurveUrCareer
              </h1>
              
              <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent my-6" />

              <p className="text-xl md:text-2xl font-bold text-slate-300 tracking-wide mb-8">
                "This is our CurveUrCareer"
              </p>

              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                An advanced AI-powered career navigator designed to map skills, diagnose professional gaps, and architect high-growth trajectories for the pioneers of tomorrow.
              </p>

              {/* Decorative Features grid inside card */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
                <div className="text-center">
                  <div className="text-cyan-400 flex justify-center mb-2"><Cpu size={20} /></div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">AI Engineered</span>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 flex justify-center mb-2"><Globe size={20} /></div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Global Scale</span>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 flex justify-center mb-2"><Sparkles size={20} /></div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Interactive</span>
                </div>
              </div>
            </div>
          </div>

          {/* Symmetrical Back to Home Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 border border-white/10 hover:border-transparent text-sm font-black tracking-widest uppercase text-slate-300 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-0.5"
            >
              <ArrowLeft size={16} />
              Return to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Futuristic footer overlay */}
      <div className="py-8 text-center text-xs text-slate-600 font-mono relative z-10 border-t border-white/5">
        &copy; {new Date().getFullYear()} CurveUrCareer Platform. All rights reserved.
      </div>
    </div>
  );
};

export default AboutPage;
