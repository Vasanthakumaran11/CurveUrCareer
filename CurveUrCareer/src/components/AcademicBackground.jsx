// Academic Background Component - Step 1
import { useState } from 'react';
import { useFormData } from '../hooks/useFormData.jsx';
import { GraduationCap, BookOpen } from 'lucide-react';

const AcademicBackground = () => {
  const { formData, updateFormData, nextStep } = useFormData();
  const [localData, setLocalData] = useState(formData.academic);

  const streams = ['Science', 'Commerce', 'Arts'];
  const boards = ['CBSE', 'ICSE', 'State Board', 'Other'];
  
  const subjectsByStream = {
    Science: ['Physics', 'Chemistry', 'Math', 'Biology', 'Computer Science', 'Information Technology', 'Statistics'],
    Commerce: ['Accountancy', 'Business Studies', 'Economics', 'Math', 'Information Practices', 'Entrepreneurship'],
    Arts: ['History', 'Political Science', 'Psychology', 'English', 'Sociology', 'Geography', 'Fine Arts', 'Physical Education']
  };

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
    <div className="max-w-3xl mx-auto p-6">
      <div className="glass-card rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-8 h-8 text-primary-500" />
          <h2 className="text-2xl font-bold text-gray-900">Academic Background</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stream Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Your Stream
            </label>
            <div className="grid grid-cols-3 gap-4">
              {streams.map(stream => (
                <button
                  key={stream}
                  type="button"
                  onClick={() => {
                    handleChange('stream', stream);
                    handleChange('subjects', []);
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    localData.stream === stream
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="font-semibold">{stream}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Subjects Selection */}
          {localData.stream && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Subjects
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {subjectsByStream[localData.stream].map(subject => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => handleSubjectToggle(subject)}
                    className={`p-3 rounded-lg border-2 transition-all text-sm ${
                      localData.subjects.includes(subject)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Percentage Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              12th Grade Percentage (or Expected)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={localData.percentage || ''}
              onChange={(e) => handleChange('percentage', parseFloat(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
              placeholder="Enter your percentage"
            />
          </div>

          {/* Board Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Board of Education
            </label>
            <select
              value={localData.board}
              onChange={(e) => handleChange('board', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
            >
              <option value="">Select Board</option>
              {boards.map(board => (
                <option key={board} value={board}>{board}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
              isValid
                ? 'bg-primary-500 hover:bg-primary-600 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Continue to Interests
          </button>
        </form>
      </div>
    </div>
  );
};

export default AcademicBackground;
