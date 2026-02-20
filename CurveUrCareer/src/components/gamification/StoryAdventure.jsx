import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, UserCircle2, ArrowRight } from 'lucide-react';

const StoryAdventure = ({ item, onResponse }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [showConsequence, setShowConsequence] = useState(false);

  const handleChoice = (option) => {
    setSelectedId(option.id);
    setShowConsequence(true);
    
    // Simulate a brief delay to show consequence before moving on
    setTimeout(() => {
      onResponse({ choiceId: option.id, timeCost: option.timeCost });
    }, 2000);
  };

  const selectedOption = item.options.find(o => o.id === selectedId);

  return (
    <div className="space-y-12 pb-12">
      {/* Story Hero Section */}
      <div className="relative rounded-[3.5rem] overflow-hidden bg-slate-900 shadow-2xl border-4 border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mix-blend-overlay"></div>
        <div className="p-8 md:p-16 relative z-10 space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-500/20 rounded-2xl backdrop-blur-xl border border-indigo-500/30">
              <UserCircle2 className="w-10 h-10 text-indigo-400" />
            </div>
            <div className="space-y-1">
              <span className="text-indigo-400 font-black text-xs uppercase tracking-[0.3em]">Living Scenario</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">
                {item.question.split(':')[0]}
              </h2>
            </div>
          </div>
          
          <div className="relative">
             <div className="absolute -left-6 top-0 text-8xl text-indigo-500/20 font-serif leading-none">"</div>
             <p className="text-2xl md:text-4xl text-white/90 leading-tight font-medium italic relative z-10 pl-4 border-l-4 border-indigo-500/50">
               {item.description}
             </p>
          </div>
        </div>
      </div>

      {/* Interactions Area */}
      <div className="grid grid-cols-1 gap-8">
      <AnimatePresence mode="wait">
        {!showConsequence ? (
          <motion.div 
            key="options"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {item.options.map((option, idx) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.98 }}
                disabled={showConsequence}
                onClick={() => handleChoice(option)}
                className="p-10 text-left bg-white/5 border border-white/10 rounded-[3rem] transition-all group relative overflow-hidden flex flex-col justify-between min-h-[220px]"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-20 h-20 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                    {option.icon}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-white/40 text-[10px] font-black uppercase tracking-widest border border-white/5">
                    <Clock className="w-3 h-3" /> {option.timeCost} MINS
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-2xl font-black text-white group-hover:text-indigo-400 transition-colors leading-tight">
                    {option.text}
                  </span>
                  <div className="h-1 w-12 bg-indigo-500/20 group-hover:w-full transition-all duration-500 rounded-full" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="consequence"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-16 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[4rem] text-center shadow-[0_0_100px_rgba(34,197,94,0.1)]"
          >
            <div className="text-9xl mb-12 drop-shadow-2xl">{selectedOption.icon}</div>
            <div className="space-y-6 max-w-2xl mx-auto">
              <h3 className="text-indigo-400 font-black text-sm uppercase tracking-[0.5em]">REALITY IMPACT</h3>
              <p className="text-3xl md:text-5xl text-white font-black italic leading-tight">
                "{selectedOption.consequence}"
              </p>
              <div className="inline-flex items-center gap-4 px-8 py-3 bg-emerald-500/20 text-emerald-400 rounded-full font-black uppercase tracking-widest text-xs border border-emerald-500/30">
                <Clock className="w-5 h-5" />
                <span>EXPANDED ACTION: -{selectedOption.timeCost} MINUTES</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default StoryAdventure;
