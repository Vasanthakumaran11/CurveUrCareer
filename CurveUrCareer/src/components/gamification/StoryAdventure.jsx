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
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-500/20 rounded-2xl">
            <UserCircle2 className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">SCENARIO: {item.question}</h2>
        </div>
        <p className="text-xl text-white/80 leading-relaxed italic">
          "{item.description}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AnimatePresence mode="wait">
        {!showConsequence ? (
          <motion.div 
            key="options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-full"
          >
            {item.options.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice(option)}
                className="p-8 text-left bg-white/5 border border-white/10 rounded-[2.5rem] transition-all group relative overflow-hidden"
              >
                <div className="flex items-center gap-6">
                  <span className="text-4xl">{option.icon}</span>
                  <div className="flex-1">
                    <span className="block text-xl font-bold text-white mb-2">{option.text}</span>
                    <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-widest">
                      <Clock className="w-4 h-4" />
                      {option.timeCost} MINS
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="consequence"
            layoutId="consequence"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="col-span-full p-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[3rem] text-center"
          >
            <div className="text-6xl mb-6">{selectedOption.icon}</div>
            <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">CONSEQUENCE</h3>
            <p className="text-2xl text-emerald-400 font-bold mb-8 italic">
              "{selectedOption.consequence}"
            </p>
            <div className="flex justify-center items-center gap-3 text-white/60 font-bold uppercase tracking-[0.2em]">
              <Clock className="w-6 h-6" />
              <span>-{selectedOption.timeCost} Minutes Remaining</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default StoryAdventure;
