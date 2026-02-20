import { useState } from 'react';
import { useFormData } from '../hooks/useFormData.jsx';
import { motion } from 'framer-motion';
import { 
  Target, 
  DollarSign, 
  Building2, 
  MapPin, 
  Compass, 
  Briefcase,
  Zap,
  Shield,
  Clock,
  GraduationCap,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const LifeGoalsAndReality = () => {
  const { formData, updateFormData, prevStep, nextStep } = useFormData();
  const [localData, setLocalData] = useState({
    expectations: formData.expectations || {},
    constraints: formData.constraints || {},
    selfAssessment: formData.selfAssessment || {
      leadership: 50,
      creativity: 50,
      moneyManagement: 50,
      entrepreneurialDrive: 50
    }
  });

  const updateSection = (section, field, value) => {
    setLocalData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleNext = () => {
    updateFormData('expectations', localData.expectations);
    updateFormData('constraints', localData.constraints);
    updateFormData('selfAssessment', localData.selfAssessment);
    nextStep();
  };

  const isFormValid = () => {
    const { expectations, constraints } = localData;
    return (
      expectations.preferredEnvironment &&
      expectations.jobSecurity &&
      constraints.familyFinancialRange &&
      constraints.collegePreference
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-50 rounded-full border border-indigo-100 text-indigo-600 mb-4">
          <Compass className="w-5 h-5" />
          <span className="font-black uppercase tracking-widest text-xs">Future Architect</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-tight">
          Design Your <span className="text-indigo-600 italic">Trajectory</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Before entering the simulation, define your mission constraints and career expectations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Dimensions */}
        <div className="space-y-12">
          {/* Career Expectations */}
          <section className="bg-white rounded-[3.5rem] p-10 md:p-14 border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-12">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
                  <Target className="w-8 h-8" />
               </div>
               <div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Mission Metrics</h2>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Section 01 // Expectations</p>
               </div>
            </div>

            <div className="space-y-10">
              {/* Preferred Environment */}
              <div className="space-y-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Strategic Environment
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['Corporate', 'Startup', 'Government', 'Freelance'].map(env => (
                    <button
                      key={env}
                      onClick={() => updateSection('expectations', 'preferredEnvironment', env)}
                      className={`py-4 px-6 rounded-2xl border-2 transition-all font-black text-sm uppercase tracking-widest ${
                        localData.expectations.preferredEnvironment === env
                          ? 'border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-200 scale-[1.05]'
                          : 'border-slate-50 bg-slate-50/50 text-slate-400 hover:border-slate-200 hover:text-slate-600'
                      }`}
                    >
                      {env}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priorities Row */}
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Job Security
                  </label>
                  <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                    {['Low', 'Medium', 'High'].map(level => (
                      <button
                        key={level}
                        onClick={() => updateSection('expectations', 'jobSecurity', level)}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          localData.expectations.jobSecurity === level
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Work-Life
                  </label>
                  <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                    {['Low', 'Medium', 'High'].map(level => (
                      <button
                        key={level}
                        onClick={() => updateSection('expectations', 'workLifeBalance', level)}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          localData.expectations.workLifeBalance === level
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Salary Expectation Slider */}
              <div className="space-y-6 pt-4">
                <div className="flex justify-between items-end mb-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Target Compensation
                  </label>
                  <div className="text-2xl font-black text-blue-600 italic">
                    {localData.expectations.minSalary}<span className="text-xs uppercase ml-1 not-italic opacity-40">LPA</span>
                  </div>
                </div>
                <div className="relative group px-1">
                  <input
                    type="range"
                    min="3"
                    max="50"
                    step="0.5"
                    value={localData.expectations.minSalary}
                    onChange={(e) => updateSection('expectations', 'minSalary', parseFloat(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>

              {/* Further Studies */}
              <motion.label 
                whileHover={{ backgroundColor: 'rgba(79, 70, 229, 0.05)' }}
                className="flex items-center gap-6 cursor-pointer p-8 rounded-[2.5rem] bg-indigo-50/30 border-2 border-dashed border-indigo-100 transition-colors"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={localData.expectations.furtherStudies}
                    onChange={(e) => updateSection('expectations', 'furtherStudies', e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-8 h-8 bg-white border-2 border-indigo-200 rounded-xl peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all flex items-center justify-center">
                    {localData.expectations.furtherStudies && <div className="w-2.5 h-2.5 bg-white rounded-full shadow-lg" />}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-black text-slate-900 uppercase tracking-widest block">Elite Academic Path</span>
                  <span className="text-xs font-medium text-slate-400">Planning for Masters/PhD or Specialization</span>
                </div>
              </motion.label>
            </div>
          </section>
        </div>

        {/* Right Column: Constraints */}
        <div className="space-y-12">
          {/* Constraints Card */}
          <section className="bg-white rounded-[3.5rem] p-10 md:p-14 border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-12">
             <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-emerald-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-emerald-200">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Real-World Logic</h2>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Section 02 // Constraints</p>
                </div>
            </div>

            <div className="space-y-10">
              {/* Financial Range */}
              <div className="space-y-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Financial Bandwidth
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['Low', 'Medium', 'High'].map(range => (
                    <button
                      key={range}
                      onClick={() => updateSection('constraints', 'familyFinancialRange', range)}
                      className={`py-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${
                        localData.constraints.familyFinancialRange === range
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-xl shadow-emerald-200'
                          : 'border-slate-50 bg-slate-50/50 text-slate-400 hover:border-emerald-200'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* College Preference */}
              <div className="space-y-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Portfolio Preference
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Government', 'Private', 'Either'].map(pref => (
                    <button
                      key={pref}
                      onClick={() => updateSection('constraints', 'collegePreference', pref)}
                      className={`py-4 px-6 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${
                        localData.constraints.collegePreference === pref
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-xl shadow-emerald-200'
                          : 'border-slate-50 bg-slate-50/50 text-slate-400 hover:border-emerald-200'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

               {/* Location Preference */}
               <div className="space-y-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Deployment Zone
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['Same State', 'Pan-India'].map(loc => (
                    <button
                      key={loc}
                      onClick={() => updateSection('constraints', 'locationPreference', loc)}
                      className={`py-4 px-6 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${
                        localData.constraints.locationPreference === loc
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-xl shadow-emerald-200'
                          : 'border-slate-50 bg-slate-50/50 text-slate-400 hover:border-emerald-200'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* New Baseline Self-Assessment */}
          <section className="bg-slate-900 rounded-[3.5rem] p-10 md:p-14 border border-white/10 shadow-3xl text-white space-y-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Zap className="w-48 h-48" />
            </div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center text-white border border-white/20">
                <Zap className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Neural Scan</h2>
            </div>
            
            <div className="space-y-10 relative z-10">
              {[
                { id: 'leadership', label: 'Command Presence', icon: '👑', color: 'from-blue-500 to-indigo-500' },
                { id: 'moneyManagement', label: 'Fiscal Intelligence', icon: '💰', color: 'from-emerald-500 to-teal-500' },
                { id: 'creativity', label: 'Innovation Core', icon: '🎨', color: 'from-rose-500 to-orange-500' },
                { id: 'entrepreneurialDrive', label: 'Venture Drive', icon: '🚀', color: 'from-amber-500 to-yellow-500' }
              ].map(attr => (
                <div key={attr.id} className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black uppercase tracking-widest text-white/40">{attr.label}</span>
                    <span className="text-xl font-black italic">{localData.selfAssessment[attr.id]}<span className="text-[10px] ml-1 opacity-40">%</span></span>
                  </div>
                  <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${localData.selfAssessment[attr.id]}%` }}
                      className={`absolute inset-0 bg-gradient-to-r ${attr.color}`}
                    />
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={localData.selfAssessment[attr.id]}
                      onChange={(e) => updateSection('selfAssessment', attr.id, parseInt(e.target.value))}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-12 border-t border-slate-100">
        <button
          onClick={prevStep}
          className="group flex items-center gap-4 font-black uppercase tracking-[0.3em] text-xs text-slate-400 hover:text-slate-900 transition-colors"
        >
          <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-slate-100 transition-colors">
            ←
          </div>
          Return to Foundation
        </button>
        
        <motion.button
          whileHover={isFormValid() ? { scale: 1.02, y: -2 } : {}}
          whileTap={isFormValid() ? { scale: 0.98 } : {}}
          onClick={handleNext}
          disabled={!isFormValid()}
          className={`px-16 py-8 rounded-[3rem] font-black text-2xl uppercase tracking-widest transition-all shadow-3xl flex items-center gap-6 ${
            isFormValid() 
              ? 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700' 
              : 'bg-slate-100 text-slate-300 cursor-not-allowed'
          }`}
        >
          Begin Immersive Simulation <ArrowRight className="w-8 h-8" />
        </motion.button>
      </div>
    </div>
  );
};

export default LifeGoalsAndReality;
