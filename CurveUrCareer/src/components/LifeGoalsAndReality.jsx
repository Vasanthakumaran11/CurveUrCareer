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
  GraduationCap
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
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Design Your Future Blueprint
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Before we dive into the immersive evaluation, let's map out your expectations and real-world factors.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Career Expectations */}
        <div className="space-y-8">
          <section className="glass-card rounded-3xl p-8 border border-white/20 shadow-xl bg-white/40 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Career Ambitions</h2>
            </div>

            <div className="space-y-8">
              {/* Preferred Environment */}
              <div>
                <label className="text-sm font-bold text-gray-600 mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Preferred Work Environment
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Corporate', 'Startup', 'Government', 'Freelance'].map(env => (
                    <button
                      key={env}
                      onClick={() => updateSection('expectations', 'preferredEnvironment', env)}
                      className={`py-3 px-4 rounded-xl border-2 transition-all font-semibold ${
                        localData.expectations.preferredEnvironment === env
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md'
                          : 'border-gray-100 hover:border-blue-200 text-gray-500 bg-white/50'
                      }`}
                    >
                      {env}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priorities Row */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold text-gray-600 mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Job Security
                  </label>
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    {['Low', 'Medium', 'High'].map(level => (
                      <button
                        key={level}
                        onClick={() => updateSection('expectations', 'jobSecurity', level)}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                          localData.expectations.jobSecurity === level
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-600 mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Work-Life Balance
                  </label>
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    {['Low', 'Medium', 'High'].map(level => (
                      <button
                        key={level}
                        onClick={() => updateSection('expectations', 'workLifeBalance', level)}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                          localData.expectations.workLifeBalance === level
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Salary Expectation Slider */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Min. Salary Target (LPA)
                  </label>
                  <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-lg">
                    {localData.expectations.minSalary} LPA
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="50"
                  step="0.5"
                  value={localData.expectations.minSalary}
                  onChange={(e) => updateSection('expectations', 'minSalary', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Further Studies */}
              <label className="flex items-center gap-4 cursor-pointer p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
                <input
                  type="checkbox"
                  checked={localData.expectations.furtherStudies}
                  onChange={(e) => updateSection('expectations', 'furtherStudies', e.target.checked)}
                  className="w-6 h-6 rounded-lg text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-500" /> I plan to pursue higher studies (Masters/PhD)
                </span>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column: Constraints & Self-Assessment */}
        <div className="space-y-8">
          <section className="glass-card rounded-3xl p-8 border border-white/20 shadow-xl bg-white/40 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Reality Check</h2>
            </div>

            <div className="space-y-8">
              {/* Financial Range */}
              <div>
                <label className="text-sm font-bold text-gray-600 mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Family Financial Range
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Low', 'Medium', 'High'].map(range => (
                    <button
                      key={range}
                      onClick={() => updateSection('constraints', 'familyFinancialRange', range)}
                      className={`py-3 rounded-xl border-2 transition-all font-semibold ${
                        localData.constraints.familyFinancialRange === range
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md'
                          : 'border-gray-100 hover:border-emerald-200 text-gray-500 bg-white/50'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* College Preference */}
              <div>
                <label className="text-sm font-bold text-gray-600 mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> College Tier Preference
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Government', 'Private', 'Either'].map(pref => (
                    <button
                      key={pref}
                      onClick={() => updateSection('constraints', 'collegePreference', pref)}
                      className={`py-3 rounded-xl border-2 transition-all font-semibold ${
                        localData.constraints.collegePreference === pref
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md'
                          : 'border-gray-100 hover:border-emerald-200 text-gray-500 bg-white/50'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Preference */}
              <div>
                <label className="text-sm font-bold text-gray-600 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Location Flexibility
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Same State', 'Pan-India'].map(loc => (
                    <button
                      key={loc}
                      onClick={() => updateSection('constraints', 'locationPreference', loc)}
                      className={`py-3 rounded-xl border-2 transition-all font-semibold ${
                        localData.constraints.locationPreference === loc
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md'
                          : 'border-gray-100 hover:border-emerald-200 text-gray-500 bg-white/50'
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
          <section className="glass-card rounded-3xl p-8 border border-white/20 shadow-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/20 rounded-2xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Self-Intelligence Scan</h2>
            </div>
            
            <div className="space-y-6">
              {[
                { id: 'leadership', label: 'Leadership Potential', icon: '👑' },
                { id: 'moneyManagement', label: 'Financial Savvy', icon: '💰' },
                { id: 'creativity', label: 'Creative Spark', icon: '🎨' },
                { id: 'entrepreneurialDrive', label: 'Startup Drive', icon: '🚀' }
              ].map(attr => (
                <div key={attr.id} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>{attr.icon} {attr.label}</span>
                    <span>{localData.selfAssessment[attr.id]}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={localData.selfAssessment[attr.id]}
                    onChange={(e) => updateSection('selfAssessment', attr.id, parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center py-8">
        <button
          onClick={prevStep}
          className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!isFormValid()}
          className={`px-12 py-4 rounded-2xl font-bold text-white transition-all transform hover:scale-105 shadow-xl ${
            isFormValid() 
              ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' 
              : 'bg-gray-300 cursor-not-allowed opacity-50'
          }`}
        >
          Enter Immersive Assessment
        </button>
      </div>
    </div>
  );
};

export default LifeGoalsAndReality;
