import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Zap, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';

const QuickFireCards = ({ item, onResponse }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipes, setSwipes] = useState([]);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const handleSwipe = (direction) => {
    const newSwipes = [...swipes, { id: item.cards[currentIndex].id, direction }];
    
    if (currentIndex < item.cards.length - 1) {
      setSwipes(newSwipes);
      setCurrentIndex(currentIndex + 1);
    } else {
      onResponse({ swipes: newSwipes });
    }
  };

  const currentCard = item.cards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center space-y-16 py-12 pb-32">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center gap-4 px-8 py-3 bg-rose-500/10 rounded-full border border-rose-500/20 shadow-xl shadow-rose-900/20">
          <Zap className="w-6 h-6 text-rose-400 fill-rose-400 animate-pulse" />
          <span className="text-rose-200 font-black uppercase tracking-[0.4em] text-xs">Instinct Protocol</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase leading-none">
          Speed Assessment
        </h2>
        <p className="text-xl text-white/40 font-medium">
          Trust your primary drivers. Swipe or click to decide your path immediately.
        </p>
      </div>

      <div className="relative w-full max-w-lg aspect-[4/5] md:aspect-[3/4]">
        {/* Decorative Background Glow */}
        <div className="absolute inset-0 bg-rose-500/20 blur-[120px] rounded-full scale-150 animate-pulse" />
        
        <AnimatePresence>
          <motion.div
            key={currentCard.id}
            style={{ x, y, rotate, opacity }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x > 100) handleSwipe('right');
              else if (info.offset.x < -100) handleSwipe('left');
              else if (info.offset.y < -100) handleSwipe('up');
              else if (info.offset.y > 100) handleSwipe('down');
            }}
            whileDrag={{ scale: 1.05 }}
            className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[4rem] p-12 md:p-16 border-2 border-white/10 shadow-3xl cursor-grab active:cursor-grabbing flex flex-col justify-between items-center text-center group ring-1 ring-white/5"
          >
            <div className="w-24 h-24 rounded-[2.5rem] bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mb-8 shadow-2xl">
              <Zap className="w-12 h-12 text-rose-400 drop-shadow-[0_0_15px_rgba(251,113,133,0.5)]" />
            </div>
            
            <div className="flex-1 flex items-center">
               <h3 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
                "{currentCard.text}"
              </h3>
            </div>

            <div className="w-full space-y-8 mt-12">
               <div className="flex justify-between items-center gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(251,113,133,0.2)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSwipe('left')}
                    className="flex-1 flex flex-col items-center gap-2 p-4 bg-white/5 rounded-3xl border border-white/10 transition-all group/btn"
                  >
                    <ArrowLeft className="w-6 h-6 text-rose-400 group-hover/btn:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black text-white/40 group-hover/btn:text-white uppercase tracking-widest">{currentCard.options.left}</span>
                  </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(251,113,133,0.2)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSwipe('right')}
                    className="flex-1 flex flex-col items-center gap-2 p-4 bg-white/5 rounded-3xl border border-white/10 transition-all group/btn"
                  >
                    <ArrowRight className="w-6 h-6 text-rose-400 group-hover/btn:translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black text-white/40 group-hover/btn:text-white uppercase tracking-widest">{currentCard.options.right}</span>
                  </motion.button>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(251,113,133,0.2)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSwipe('up')}
                    className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-3xl border border-white/10 transition-all group/btn"
                  >
                    <ArrowUp className="w-6 h-6 text-rose-400 group-hover/btn:-translate-y-1 transition-transform" />
                    <span className="text-[10px] font-black text-white/40 group-hover/btn:text-white uppercase tracking-widest">{currentCard.options.up}</span>
                  </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(251,113,133,0.2)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSwipe('down')}
                    className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-3xl border border-white/10 transition-all group/btn"
                  >
                    <ArrowDown className="w-6 h-6 text-rose-400 group-hover/btn:translate-y-1 transition-transform" />
                    <span className="text-[10px] font-black text-white/40 group-hover/btn:text-white uppercase tracking-widest">{currentCard.options.down}</span>
                  </motion.button>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="text-white/20 font-black text-xs uppercase tracking-[0.6em] flex items-center gap-4">
          <span>IDENTITY BUFFER {currentIndex + 1} / {item.cards.length}</span>
        </div>
        <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-rose-600 to-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / item.cards.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuickFireCards;
