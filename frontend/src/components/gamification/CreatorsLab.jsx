import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Briefcase, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

const CreatorsLab = ({ item, onResponse }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [budget, setBudget] = useState(item.budget);

  const toggleItem = (labItem) => {
    if (selectedItems.includes(labItem.id)) {
      setSelectedItems(selectedItems.filter(id => id !== labItem.id));
      setBudget(prev => prev + labItem.cost);
    } else {
      if (budget >= labItem.cost) {
        setSelectedItems([...selectedItems, labItem.id]);
        setBudget(prev => prev - labItem.cost);
      }
    }
  };

  const handleFinish = () => {
    if (selectedItems.length === 0) return;
    onResponse({ selectedItems, remainingBudget: budget });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        <div className="flex-1 bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-2xl">
              <Briefcase className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">{item.question}</h2>
          </div>
          <p className="text-white/60 leading-relaxed font-medium">
            {item.description}
          </p>
        </div>

        <div className="w-full md:w-64 bg-black/30 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 flex flex-col justify-center items-center">
          <span className="text-white/40 font-bold uppercase tracking-widest text-xs mb-2">REMAINING BUDGET</span>
          <div className="flex items-center gap-2 text-4xl font-black text-emerald-400">
            <IndianRupee className="w-8 h-8" />
            {budget.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {item.items.map((labItem) => {
          const isSelected = selectedItems.includes(labItem.id);
          const canAfford = budget >= labItem.cost || isSelected;

          return (
            <motion.button
              key={labItem.id}
              whileHover={canAfford ? { scale: 1.02 } : {}}
              whileTap={canAfford ? { scale: 0.98 } : {}}
              onClick={() => toggleItem(labItem)}
              disabled={!canAfford}
              className={`p-6 text-left rounded-3xl border transition-all relative overflow-hidden flex flex-col gap-4 ${
                isSelected 
                  ? 'bg-purple-500/20 border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                  : canAfford
                    ? 'bg-white/5 border-white/10 hover:bg-white/10'
                    : 'bg-white/5 border-white/5 opacity-40 cursor-not-allowed'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  isSelected ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60'
                }`}>
                  {labItem.cost > 0 ? `₹${labItem.cost.toLocaleString()}` : 'FREE'}
                </span>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-purple-400" />}
              </div>
              
              <div className="flex-1">
                <h4 className="text-xl font-bold text-white mb-2">{labItem.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {labItem.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-[10px] text-white/40 font-bold uppercase tracking-wider">
                      <Zap className="w-3 h-3 text-amber-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={handleFinish}
          disabled={selectedItems.length === 0}
          className="group relative inline-flex items-center gap-4 px-16 py-6 bg-white text-slate-900 rounded-[2rem] font-black text-2xl hover:bg-purple-400 hover:text-white transition-all hover:scale-105 shadow-2xl disabled:opacity-50 disabled:hover:scale-100"
        >
          FINISH BUILDING <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CreatorsLab;
