import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart3, HelpCircle, ArrowRight } from 'lucide-react';

const PatternDetective = ({ item, onResponse }) => {
  const [answers, setAnswers] = useState({});
  const [showQuestions, setShowQuestions] = useState(false);

  const handleAnswer = (qIdx, value) => {
    setAnswers({ ...answers, [qIdx]: value });
  };

  const isComplete = Object.keys(answers).length === item.questions.length;

  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-500/20 rounded-2xl">
            <Search className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">{item.question}</h2>
        </div>
        <p className="text-white/60 leading-relaxed font-medium">
          {item.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Visual Data Section */}
        <div className="bg-black/30 backdrop-blur-md rounded-[3rem] p-8 border border-white/10 min-h-[400px] flex flex-col justify-center">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-white/40 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> DATA INFOGRAPHIC
            </h3>
          </div>
          
          <div className="relative h-64 flex items-end justify-between gap-1 pb-8 border-b border-white/10">
            {item.chartData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                <div className="w-full flex justify-center gap-0.5 items-end h-full">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.samosas / 200) * 100}%` }}
                    className="w-1/3 bg-blue-500/60 rounded-t-lg group-hover:bg-blue-400 transition-colors"
                  />
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.sandwiches / 200) * 100}%` }}
                    className="w-1/3 bg-purple-500/60 rounded-t-lg group-hover:bg-purple-400 transition-colors"
                  />
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.juice / 200) * 100}%` }}
                    className="w-1/3 bg-emerald-500/60 rounded-t-lg group-hover:bg-emerald-400 transition-colors"
                  />
                </div>
                <span className="text-[10px] font-black text-white/30 uppercase tracking-tighter">{d.day}</span>
              </div>
            ))}
            
            {/* Legend */}
            <div className="absolute top-0 right-0 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-white/40">
                <div className="w-2 h-2 bg-blue-500 rounded-full" /> SAMOSAS
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-white/40">
                <div className="w-2 h-2 bg-purple-500 rounded-full" /> SANDWICHES
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-white/40">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" /> JUICE
              </div>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="space-y-6">
          {item.questions.map((q, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-4">
              <h4 className="text-lg font-bold text-white flex gap-3">
                <HelpCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
                {q.query}
              </h4>
              
              {q.type === 'click-graph' ? (
                <div className="flex flex-wrap gap-3">
                  {item.chartData.map(d => (
                    <button
                      key={d.day}
                      onClick={() => handleAnswer(idx, d.day)}
                      className={`px-6 py-3 rounded-2xl font-black text-sm uppercase transition-all ${
                        answers[idx] === d.day ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/40 hover:bg-white/20'
                      }`}
                    >
                      {d.day}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {q.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(idx, opt)}
                      className={`px-6 py-4 text-left rounded-2xl font-bold text-sm transition-all ${
                        answers[idx] === opt ? 'bg-blue-500 text-white shadow-xl' : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <motion.button
            whileHover={isComplete ? { scale: 1.05 } : {}}
            whileTap={isComplete ? { scale: 0.95 } : {}}
            disabled={!isComplete}
            onClick={() => onResponse({ answers })}
            className="w-full py-6 bg-white text-slate-900 rounded-[2rem] font-black text-2xl hover:bg-blue-400 hover:text-white transition-all shadow-2xl disabled:opacity-30"
          >
            SOLVE THE CASE <ArrowRight className="inline-block ml-3 w-8 h-8" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PatternDetective;
