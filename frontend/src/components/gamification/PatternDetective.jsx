import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart3, HelpCircle, ArrowRight } from 'lucide-react';

const PatternDetective = ({ item, onResponse }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswer = (qIdx, value) => {
    setAnswers({ ...answers, [qIdx]: value });
  };

  const isComplete = Object.keys(answers).length === item.questions.length;

  return (
    <div className="space-y-12 pb-20">
      {/* Investigation Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-blue-400">
            <div className="p-3 bg-blue-500/20 rounded-2xl">
              <Search className="w-6 h-6" />
            </div>
            <span className="font-black uppercase tracking-[0.4em] text-xs">Analysis Protocol</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
            {item.question}
          </h2>
          <p className="text-xl text-white/50 max-w-2xl font-medium leading-relaxed">
            {item.description}
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
          <div className="text-right">
            <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">Confidence Score</div>
            <div className="text-xl font-black text-blue-400">{(Object.keys(answers).length / item.questions.length * 100).toFixed(0)}%</div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-12 items-start">
        {/* Visual Intelligence Center */}
        <div className="xl:col-span-3 space-y-8">
          <div className="bg-slate-900/50 backdrop-blur-3xl rounded-[4rem] p-10 md:p-16 border border-white/10 shadow-3xl relative overflow-hidden flex flex-col min-h-[500px]">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <BarChart3 className="w-64 h-64" />
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-16">
                <span className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full font-black text-[10px] uppercase tracking-widest">
                  Live Data Visualization
                </span>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-white/40">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm" /> SAMOSAS
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/40">
                    <div className="w-2.5 h-2.5 bg-purple-500 rounded-sm" /> SANDWICHES
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/40">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" /> JUICE
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-end justify-between gap-4 pb-12">
                {item.chartData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-6 group cursor-crosshair">
                    <div className="w-full h-full flex items-end justify-center gap-1 group-hover:gap-1.5 transition-all">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${(d.samosas / 200) * 100}%` }}
                        className="w-4 bg-gradient-to-t from-blue-700 to-blue-400 rounded-t-lg shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      />
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${(d.sandwiches / 200) * 100}%` }}
                        className="w-4 bg-gradient-to-t from-purple-700 to-purple-400 rounded-t-lg shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                      />
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${(d.juice / 200) * 100}%` }}
                        className="w-4 bg-gradient-to-t from-emerald-700 to-emerald-400 rounded-t-lg shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      />
                    </div>
                    <div className="text-[10px] font-black text-white/20 group-hover:text-white transition-colors">{d.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Investigation Brief Section */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white/5 border border-white/10 p-1 rounded-[3rem]">
            <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[2.8rem] p-10 space-y-10">
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="w-2 h-10 bg-blue-500 rounded-full" />
                <h3 className="text-2xl font-black text-white uppercase italic">Evidence Log</h3>
              </div>
              
              <div className="space-y-12">
                {item.questions.map((q, idx) => (
                  <div key={idx} className="space-y-6">
                    <div className="flex gap-4">
                      <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-xs border border-blue-500/30">
                        {idx + 1}
                      </span>
                      <h4 className="text-xl font-bold text-white/90 leading-tight">
                        {q.query}
                      </h4>
                    </div>
                    
                    <div className="pl-12 grid grid-cols-1 gap-3">
                      {(q.type === 'click-graph' ? item.chartData.map(d => d.day) : q.options).map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleAnswer(idx, opt)}
                          className={`group relative px-6 py-4 text-left rounded-2xl font-bold text-sm transition-all border-2 overflow-hidden ${
                            answers[idx] === opt 
                              ? 'bg-blue-600 border-blue-400 text-white shadow-xl scale-[1.02]' 
                              : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          <span className="relative z-10">{opt}</span>
                          {answers[idx] === opt && (
                            <motion.div 
                              layoutId="active-bg"
                              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={isComplete ? { scale: 1.02, backgroundColor: '#60a5fa' } : {}}
                whileTap={isComplete ? { scale: 0.98 } : {}}
                disabled={!isComplete}
                onClick={() => onResponse({ answers })}
                className="w-full py-8 bg-blue-600 text-white rounded-[2.5rem] font-black text-xl hover:shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-all disabled:opacity-30 flex items-center justify-center gap-4 uppercase tracking-widest mt-12"
              >
                SUBMIT ANALYSIS <ArrowRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternDetective;
