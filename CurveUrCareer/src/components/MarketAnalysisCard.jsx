import React from 'react';
import { useMarketData } from '../hooks/useMarketData';
import { TrendingUp, DollarSign, MapPin, Zap, Briefcase, Info, ArrowUpRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const MarketAnalysisCard = ({ careerName }) => {
  const { marketData, loading } = useMarketData(careerName);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-slate-100 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">Fetching global market trends...</p>
      </div>
    );
  }

  if (!marketData) return null;

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <TrendingUp size={120} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-400/30 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">Industry Health: {marketData.industryHealth}</span>
            <span className="bg-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1">
              <ArrowUpRight size={14} /> +{marketData.demandGrowth}% Growth
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Market Insights: {careerName}</h2>
          <p className="text-blue-100 max-w-2xl">
            Real-time industry analysis showing significant upward trajectory and high demand for specialized talent in the current global economy.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Salary Ranges */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 border border-slate-100 bg-white"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <DollarSign className="text-green-500" /> Salary Trajectory
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500 font-medium">Entry Level</span>
                <span className="text-slate-900 font-bold">{marketData.entrySalary}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 w-1/3"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500 font-medium">Mid-Career</span>
                <span className="text-slate-900 font-bold">{marketData.midSalary}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-2/3"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500 font-medium">Senior/Lead</span>
                <span className="text-slate-900 font-bold">{marketData.seniorSalary}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 w-full"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hot Skills */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 border border-slate-100 bg-white"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Zap className="text-amber-500" /> Hot Skills in Demand
          </h3>
          <div className="flex flex-wrap gap-2">
            {marketData.hotSkills.map((skill, i) => (
              <span key={i} className="px-3 py-2 bg-amber-50 text-amber-700 rounded-xl text-sm font-semibold border border-amber-100 transition-hover hover:bg-amber-100">
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 group">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-400 mt-0.5" />
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Focusing on these specific tools and methodologies increases your hiring probability by up to 40%.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Locations & Remote */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 border border-slate-100 bg-white"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <MapPin className="text-rose-500" /> Hiring Hubs
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="text-indigo-500 w-5 h-5" />
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Remote Trend</p>
                <p className="text-sm text-slate-900 font-bold">{marketData.remoteWorkTrend}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="text-rose-500 w-5 h-5" />
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Top Regions</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {marketData.topLocations.map((loc, i) => (
                    <span key={i} className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg ring-1 ring-blue-100">
              <span className="text-xs font-bold text-blue-700">Live Opportunities</span>
              <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black rounded uppercase">Active</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketAnalysisCard;
