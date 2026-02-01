// Interest Discovery Component - Step 2 (Psychology-backed indirect questions)
import { useState } from 'react';
import { useFormData } from '../hooks/useFormData.jsx';
import { Heart, Sparkles } from 'lucide-react';

const InterestDiscovery = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormData();
  const [localData, setLocalData] = useState(formData.interests);

  const interestCategories = [
    { id: 'Technology', label: 'Technology & Innovation', emoji: '💻' },
    { id: 'Healthcare', label: 'Healthcare & Helping Others', emoji: '🏥' },
    { id: 'Business', label: 'Business & Finance', emoji: '💼' },
    { id: 'Creative', label: 'Art & Creativity', emoji: '🎨' },
    { id: 'Social', label: 'Social Service & Teaching', emoji: '👥' },
    { id: 'Science', label: 'Science & Research', emoji: '🔬' },
    { id: 'Law', label: 'Law & Justice', emoji: '⚖️' },
    { id: 'Media', label: 'Media & Communication', emoji: '📺' }
  ];

  const activities = [
    'Solving puzzles and problems',
    'Helping and caring for others',
    'Creating art or design',
    'Reading and writing',
    'Working with numbers',
    'Building or fixing things',
    'Public speaking or debating',
    'Organizing events'
  ];

  const handleInterestToggle = (interest) => {
    setLocalData(prev => ({
      ...prev,
      topInterests: prev.topInterests.includes(interest)
        ? prev.topInterests.filter(i => i !== interest)
        : prev.topInterests.length < 3
        ? [...prev.topInterests, interest]
        : prev.topInterests
    }));
  };

  const handleActivityToggle = (activity) => {
    setLocalData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('interests', localData);
    nextStep();
  };

  const isValid = localData.topInterests.length >= 2 && localData.activities.length >= 2;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="glass-card rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-8 h-8 text-primary-500" />
          <h2 className="text-2xl font-bold text-gray-900">Discover Your Interests</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Interest Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What fields excite you the most? (Select up to 3)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interestCategories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleInterestToggle(category.id)}
                  disabled={!localData.topInterests.includes(category.id) && localData.topInterests.length >= 3}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    localData.topInterests.includes(category.id)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300 disabled:opacity-50'
                  }`}
                >
                  <div className="text-2xl mb-1">{category.emoji}</div>
                  <div className="text-xs font-medium">{category.label}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Selected: {localData.topInterests.length}/3
            </p>
          </div>

          {/* Activities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Which activities do you enjoy? (Select at least 2)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activities.map(activity => (
                <button
                  key={activity}
                  type="button"
                  onClick={() => handleActivityToggle(activity)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    localData.activities.includes(activity)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
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
              Continue to Skills
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterestDiscovery;
