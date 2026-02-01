// Skills Assessment Component - Step 3
import { useState } from 'react';
import { useFormData } from '../hooks/useFormData.jsx';
import { Zap } from 'lucide-react';

const SkillsAssessment = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormData();
  const [localData, setLocalData] = useState(formData.skills);

  const skills = [
    { id: 'analytical', label: 'Analytical Thinking' },
    { id: 'creative', label: 'Creative Problem Solving' },
    { id: 'communication', label: 'Communication' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'technical', label: 'Technical Skills' },
    { id: 'empathy', label: 'Empathy & Emotional Intelligence' },
    { id: 'numerical', label: 'Numerical Ability' },
    { id: 'research', label: 'Research & Analysis' }
  ];

  const handleSkillChange = (skillId, value) => {
    setLocalData(prev => ({
      ...prev,
      skillLevels: {
        ...prev.skillLevels,
        [skillId]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('skills', localData);
    nextStep();
  };

  const ratedSkills = Object.keys(localData.skillLevels).length;
  const isValid = ratedSkills >= 4;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="glass-card rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-8 h-8 text-primary-500" />
          <h2 className="text-2xl font-bold text-gray-900">Skills Assessment</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <p className="text-gray-600 mb-4">
            Rate your proficiency in the following skills (0 = Beginner, 10 = Expert)
          </p>

          {skills.map(skill => (
            <div key={skill.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  {skill.label}
                </label>
                <span className="text-sm font-semibold text-primary-600">
                  {localData.skillLevels[skill.id] || 0}/10
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={localData.skillLevels[skill.id] || 0}
                onChange={(e) => handleSkillChange(skill.id, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
            </div>
          ))}

          <p className="text-xs text-gray-500 mt-4">
            Please rate at least 4 skills to continue ({ratedSkills}/4)
          </p>

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
                  ? 'bg-primary-500 hover:bg-primary-600 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Continue to Expectations
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillsAssessment;
