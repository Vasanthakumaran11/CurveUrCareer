import { useState } from 'react';
import { useFormData } from '../hooks/useFormData.jsx';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  BookOpen, 
  Beaker, 
  Calculator, 
  Palette, 
  ChevronRight,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const AcademicBackground = () => {
  const { formData, updateFormData, nextStep } = useFormData();
  const [localData, setLocalData] = useState(formData.academic);

  const streams = [
    { id: 'Science', name: 'Science', icon: <Beaker className="w-6 h-6" />, color: 'blue' },
    { id: 'Commerce', name: 'Commerce', icon: <Calculator className="w-6 h-6" />, color: 'emerald' },
    { id: 'Arts', name: 'Arts', icon: <Palette className="w-6 h-6" />, color: 'purple' }
  ];

  const subjectsByStream = {
    Science: ['Physics', 'Chemistry', 'Math', 'Biology', 'Computer Science', 'Information Technology', 'Statistics'],
    Commerce: ['Accountancy', 'Business Studies', 'Economics', 'Math', 'Information Practices', 'Entrepreneurship'],
    Arts: ['History', 'Political Science', 'Psychology', 'English', 'Sociology', 'Geography', 'Fine Arts', 'Physical Education']
  };

  const boards = ['CBSE', 'ICSE', 'State Board', 'International (IB/IGCSE)', 'Other'];
  
  const handleChange = (field, value) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubjectToggle = (subject) => {
    setLocalData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('academic', localData);
    nextStep();
  };

  const isValid = localData.stream && localData.subjects.length > 0 && localData.percentage > 0 && localData.board;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-50 rounded-full border border-blue-100 text-blue-600 mb-4">
            <ShieldCheck className="w-5 h-5" />
            <span className="font-black uppercase tracking-widest text-xs">Identity Verification</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Your Academic <span className="text-blue-600 italic">Foundation</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Tell us about your 12th-grade journey so we can tailor your career assessment with precision.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Stream Selection */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full" /> 1. Selected Stream
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {streams.map(stream => (
                <button
                  key={stream.id}
                  type="button"
                  onClick={() => {
                    handleChange('stream', stream.id);
                    handleChange('subjects', []);
                  }}
                  className={`relative p-8 rounded-[2.5rem] border-4 transition-all overflow-hidden flex flex-col items-center gap-6 group ${
                    localData.stream === stream.id
                      ? `border-blue-600 bg-blue-50 shadow-2xl shadow-blue-200 -translate-y-2`
                      : 'border-slate-50 bg-white hover:border-slate-200 hover:shadow-xl'
                  }`}
                >
                  <div className={`p-5 rounded-3xl transition-colors ${
                    localData.stream === stream.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                  }`}>
                    {stream.icon}
                  </div>
                  <div className="text-center space-y-1">
                    <div className={`text-2xl font-black ${localData.stream === stream.id ? 'text-blue-900' : 'text-slate-700'}`}>
                      {stream.name}
                    </div>
                  </div>
                  {localData.stream === stream.id && (
                    <motion.div 
                      layoutId="stream-active"
                      className="absolute bottom-0 inset-x-0 h-2 bg-blue-600"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects Selection */}
          {localData.stream && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-6"
            >
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full" /> 2. Core Subjects
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
                {subjectsByStream[localData.stream].map(subject => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => handleSubjectToggle(subject)}
                    className={`px-6 py-4 rounded-2xl border-2 transition-all font-bold text-sm text-center ${
                      localData.subjects.includes(subject)
                        ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                        : 'border-white bg-white hover:border-blue-200 text-slate-500 hover:text-blue-600'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Combined Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             {/* Percentage Input */}
            <div className="space-y-6">
               <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full" /> 3. Percentage
              </h3>
              <div className="relative group">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={localData.percentage || ''}
                  onChange={(e) => handleChange('percentage', parseFloat(e.target.value))}
                  className="w-full px-8 py-6 bg-white border-4 border-slate-50 rounded-[2.5rem] focus:border-blue-600 focus:outline-none text-2xl font-black text-slate-900 transition-all placeholder:text-slate-200 group-hover:border-slate-100 shadow-sm"
                  placeholder="00.0"
                />
                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-3xl font-black text-slate-200 group-focus-within:text-blue-600 transition-colors">%</span>
              </div>
            </div>

            {/* Board Selection */}
            <div className="space-y-6">
               <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full" /> 4. Education Board
              </h3>
              <div className="relative">
                <select
                  value={localData.board}
                  onChange={(e) => handleChange('board', e.target.value)}
                  className="w-full px-8 py-6 bg-white border-4 border-slate-50 rounded-[2.5rem] focus:border-blue-600 focus:outline-none text-xl font-black text-slate-900 transition-all appearance-none cursor-pointer group-hover:border-slate-100 shadow-sm"
                >
                  <option value="">Select Board</option>
                  {boards.map(board => (
                    <option key={board} value={board}>{board}</option>
                  ))}
                </select>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                   <ChevronRight className="w-6 h-6 rotate-90" />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={isValid ? { scale: 1.02, y: -2 } : {}}
            whileTap={isValid ? { scale: 0.98 } : {}}
            type="submit"
            disabled={!isValid}
            className={`w-full py-8 rounded-[2.5rem] font-black text-2xl transition-all flex items-center justify-center gap-4 ${
              isValid
                ? 'bg-blue-600 text-white shadow-2xl shadow-blue-200 hover:bg-blue-700'
                : 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-100'
            }`}
          >
            CONTINUE QUEST <ArrowRight className="w-8 h-8" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AcademicBackground;
