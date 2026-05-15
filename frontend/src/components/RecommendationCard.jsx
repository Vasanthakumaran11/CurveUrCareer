// Recommendation Card Component
import { TrendingUp, Clock, DollarSign, Award, Sparkles } from 'lucide-react';

const RecommendationCard = ({ recommendation, rank }) => {
  const { course, matchPercentage, reasoning, scores } = recommendation;

  const getPriorityColor = (percentage) => {
    if (percentage >= 75) return 'bg-green-100 text-green-800 border-green-300';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-primary-600">#{rank}</span>
            <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
            {course.trending && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-black rounded-full border border-orange-200 animate-pulse">
                <Sparkles className="w-3 h-3" />
                TRENDING
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{course.description}</p>
        </div>
        <div className={`px-4 py-2 rounded-full border-2 ${getPriorityColor(matchPercentage)}`}>
          <span className="font-bold">{matchPercentage}%</span>
        </div>
      </div>

      {/* Course Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{course.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{course.averageSalary}</span>
        </div>
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{course.stream}</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700 truncate">{course.futureScope?.split('-')[0]}</span>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Score Breakdown:</h4>
        <div className="space-y-2">
          {[
            { label: 'Academic', score: scores.academic, color: 'bg-blue-500' },
            { label: 'Interest', score: scores.interest, color: 'bg-purple-500' },
            { label: 'Skills', score: scores.skills, color: 'bg-green-500' },
            { label: 'Expectations', score: scores.expectations, color: 'bg-yellow-500' }
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-xs w-24 text-gray-600">{item.label}:</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <span className="text-xs w-12 text-right text-gray-700">{Math.round(item.score)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Special Recommendation Alert */}
      {scores.specialReasons && scores.specialReasons.length > 0 && (
        <div className="mb-4 p-4 bg-primary-50 border border-primary-100 rounded-lg flex items-start gap-3">
          <Award className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
          <p className="text-sm font-medium text-primary-800 leading-relaxed italic">
            {scores.specialReasons[0]}
          </p>
        </div>
      )}

      {/* Reasoning */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Why this fits you:</h4>
        <ul className="space-y-1">
          {reasoning.map((reason, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
              <span className="text-primary-500 mt-1 shrink-0">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Career Paths */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Career Opportunities:</h4>
        <div className="flex flex-wrap gap-2">
          {course.careerPaths.slice(0, 4).map((path, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
            >
              {path}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
