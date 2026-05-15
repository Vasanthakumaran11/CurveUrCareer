import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, User, Bot, ArrowRight } from 'lucide-react';

const ReflectionRoom = ({ item, onResponse }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hey there! I\'m Alex, and I really need your advice.' },
    { id: 2, type: 'bot', text: item.description }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(true);

  const handleSelect = (option) => {
    setShowOptions(false);
    const userMsg = { id: messages.length + 1, type: 'user', text: option.text };
    setMessages([...messages, userMsg]);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botMsg = { 
        id: messages.length + 2, 
        type: 'bot', 
        text: option.id === 'r1' 
          ? 'I want to build things, but I\'m worried about security. What do you think?' 
          : 'I guess... but I don\'t want to regret it. How do we even decide?' 
      };
      setMessages(prev => [...prev, botMsg]);
      
      // Complete after the last interaction
      setTimeout(() => {
        onResponse({ choiceId: option.id, value: option.id });
      }, 2500);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto h-[600px] flex flex-col bg-slate-900/50 backdrop-blur-2xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
      <div className="p-8 bg-black/20 border-b border-white/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-white font-bold leading-none mb-1">Career Reflection HQ</h3>
          <span className="text-emerald-400/60 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> AI SIMULATION ACTIVE
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black ${
                  msg.type === 'user' ? 'bg-white text-slate-900' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {msg.type === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`px-6 py-4 rounded-[2rem] text-sm font-medium leading-relaxed ${
                  msg.type === 'user' 
                    ? 'bg-white text-slate-900 rounded-tr-none' 
                    : 'bg-white/5 text-white/90 rounded-tl-none border border-white/10'
                }`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center"><Bot size={14} className="text-emerald-400" /></div>
                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-[2rem] flex gap-1 items-center">
                   <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" />
                   <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                   <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-8 bg-black/20 border-t border-white/5 min-h-[140px] flex items-center">
        <AnimatePresence mode="wait">
          {showOptions ? (
            <motion.div 
              key="options"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-wrap gap-2 justify-center w-full"
            >
              {item.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt)}
                  className="px-6 py-3 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-100 text-sm font-bold transition-all hover:scale-105 active:scale-95"
                >
                  {opt.text}
                </button>
              ))}
            </motion.div>
          ) : !isTyping && (
            <motion.div 
              key="completing"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex justify-center w-full"
            >
               <span className="text-white/20 font-black text-xs uppercase tracking-[0.4em] flex items-center gap-2">
                  <div className="w-2 h-2 bg-white/20 rounded-full" /> SIMULATION COMPLETING
               </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReflectionRoom;
