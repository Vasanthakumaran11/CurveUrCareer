// Constraints & Reality Factors Component - Step 6
import { useState } from 'react';
import { useFormData } from '../hooks/useFormData.jsx';
import { DollarSign, Building2, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConstraintsAssessment = () => {
  const { formData, updateFormData, prevStep } = useFormData();
  const navigate = useNavigate();
  const [localConstraints, setLocalConstraints] = useState(formData.constraints);

  const handleOptionSelect = (field, value) => {
    const updated = { ...localConstraints, [field]: value };
    setLocalConstraints(updated);
    updateFormData('constraints', updated);
  };

  const handleFinish = () => {
    if (!localConstraints.familyFinancialRange || !localConstraints.collegePreference || !localConstraints.locationPreference) {
      alert('Please select all options to continue.');
      return;
    }
    navigate('/results');
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      <div className="glass-card p-8 md:p-12 mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          Constraints & Reality Factors
        </h2>
        <p className="text-slate-500 mb-10">Help us suggest the most practical colleges and career paths for you.</p>

        <div className="space-y-12">
          {/* Financial Range */}
          <section>
            <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-500" />
              Family Financial Range
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Low', 'Medium', 'High'].map((range) => (
                <button
                  key={range}
                  onClick={() => handleOptionSelect('familyFinancialRange', range)}
                  className={`p-4 rounded-xl border-2 transition-all text-center font-bold ${
                    localConstraints.familyFinancialRange === range
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md'
                      : 'border-slate-100 hover:border-blue-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </section>

          {/* College Preference */}
          <section>
            <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-500" />
              College Preference
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Government', 'Private', 'Either'].map((pref) => (
                <button
                  key={pref}
                  onClick={() => handleOptionSelect('collegePreference', pref)}
                  className={`p-4 rounded-xl border-2 transition-all text-center font-bold ${
                    localConstraints.collegePreference === pref
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md'
                      : 'border-slate-100 hover:border-blue-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </section>

          {/* Location Preference */}
          <section>
            <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              Location Preference
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Same State', 'Anywhere in India'].map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleOptionSelect('locationPreference', loc)}
                  className={`p-4 rounded-xl border-2 transition-all text-center font-bold ${
                    localConstraints.locationPreference === loc
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md'
                      : 'border-slate-100 hover:border-blue-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-16 pt-8 border-t border-slate-100">
          <button
            onClick={prevStep}
            className="btn-secondary px-8 py-3"
          >
            Back
          </button>
          <button
            onClick={handleFinish}
            className="btn-primary px-10 py-3 flex items-center gap-2"
          >
            See My Results
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Internal ArrowRight icon for the button
const ArrowRight = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default ConstraintsAssessment;
