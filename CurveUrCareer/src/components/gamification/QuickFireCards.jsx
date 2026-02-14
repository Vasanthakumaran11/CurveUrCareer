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
    <div className="flex flex-col items-center justify-center space-y-12 py-12">
      <div className="text-center space-y-4 max-w-xl mx-auto px-4">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-rose-500/20 rounded-full border border-rose-500/30">
          <Zap className="w-5 h-5 text-rose-400 fill-rose-400" />
          <span className="text-rose-200 font-black uppercase tracking-[0.2em] text-xs">QUICK FIRE ROUND</span>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight italic">DECIDE IN AN INSTANT</h2>
      </div>

      <div className="relative w-full max-w-sm aspect-[3/4]">
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
            className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] p-12 border-2 border-white/20 shadow-2xl cursor-grab active:cursor-grabbing flex flex-col justify-between items-center text-center group"
          >
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
              <Zap className="w-10 h-10 text-rose-400" />
            </div>
            
            <h3 className="text-3xl font-bold text-white leading-tight mb-12">
              "{currentCard.text}"
            </h3>

            <div className="w-full space-y-4 opacity-40 group-hover:opacity-100 transition-opacity">
               <div className="flex justify-between items-center text-white/40 font-black text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> {currentCard.options.left}</div>
                  <div className="flex items-center gap-1">{currentCard.options.right} <ArrowRight className="w-3 h-3" /></div>
               </div>
               <div className="flex flex-col items-center gap-1 text-white/40 font-black text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-1"><ArrowUp className="w-3 h-3" /> {currentCard.options.up}</div>
                  <div className="mt-4 flex items-center gap-1">{currentCard.options.down} <ArrowDown className="w-3 h-3" /></div>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="text-white/20 font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4">
        <span>CARD {currentIndex + 1} OF {item.cards.length}</span>
        <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-rose-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / item.cards.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuickFireCards;
