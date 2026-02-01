// Career Expectations Component - Step 4
import { useState } from 'react';
import { useFormData } from '../hooks/useFormData.jsx';
import { Target } from 'lucide-react';

const CareerExpectations = () => {
  const { formData, updateFormData, prevStep, nextStep } = useFormData();
  const [localData, setLocalData] = useState(formData.expectations);

  const handleChange = (field, value) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('expectations', localData);
    nextStep();
  };

  const isValid = localData.preferredEnvironment && localData.jobSecurity && localData.workLifeBalance;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="glass-card rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-8 h-8 text-primary-500" />
          <h2 className="text-2xl font-bold text-gray-900">Career Expectations</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Salary Expectations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Expected Salary (LPA)
            </label>
            <input
              type="number"
              min="0"
              value={localData.minSalary || ''}
              onChange={(e) => handleChange('minSalary', parseInt(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
              placeholder="e.g., 5"
            />
          </div>

          {/* Work Environment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Work Environment
            </label>
            <select
              value={localData.preferredEnvironment}
              onChange={(e) => handleChange('preferredEnvironment', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
            >
              <option value="">Select Environment</option>
              <option value="Corporate">Corporate Office</option>
              <option value="Startup">Startup</option>
              <option value="Government">Government</option>
              <option value="Hospital">Hospital/Healthcare</option>
              <option value="Lab">Laboratory/Research</option>
              <option value="Freelance">Freelance/Remote</option>
              <option value="Field">Field Work</option>
            </select>
          </div>

          {/* Job Security */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Security Importance
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['low', 'medium', 'high'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleChange('jobSecurity', level)}
                  className={`p-3 rounded-lg border-2 capitalize transition-all ${
                    localData.jobSecurity === level
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Work-Life Balance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work-Life Balance Importance
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['low', 'medium', 'high'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleChange('workLifeBalance', level)}
                  className={`p-3 rounded-lg border-2 capitalize transition-all ${
                    localData.workLifeBalance === level
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Further Studies */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={localData.furtherStudies}
                onChange={(e) => handleChange('furtherStudies', e.target.checked)}
                className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">
                I am interested in pursuing further studies (Masters/PhD)
              </span>
            </label>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 py-4 rounded-lg font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-all"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`flex-1 py-4 rounded-lg font-semibold text-white transition-all ${
                isValid
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareerExpectations;
