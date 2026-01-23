import React from 'react';
import { FaArrowRight, FaGraduationCap } from 'react-icons/fa';

const StreamCard = ({ stream, courseCount, onClick }) => {
  const getBgColor = () => {
    switch(stream.color) {
      case 'blue': return 'from-blue-50 to-blue-100';
      case 'green': return 'from-green-50 to-green-100';
      case 'purple': return 'from-purple-50 to-purple-100';
      default: return 'from-gray-50 to-gray-100';
    }
  };

  const getBorderColor = () => {
    switch(stream.color) {
      case 'blue': return 'border-blue-300';
      case 'green': return 'border-green-300';
      case 'purple': return 'border-purple-300';
      default: return 'border-gray-300';
    }
  };

  const getAccentColor = () => {
    switch(stream.color) {
      case 'blue': return 'text-blue-600';
      case 'green': return 'text-green-600';
      case 'purple': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br ${getBgColor()} border-2 ${getBorderColor()} rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105`}
    >
      <div className="mb-4">
        <span className="text-4xl">{stream.icon}</span>
      </div>
      
      <h3 className={`text-2xl font-bold ${getAccentColor()} mb-2`}>
        {stream.name}
      </h3>
      
      <p className="text-gray-700 text-sm mb-4">
        {stream.description}
      </p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Popular Level:</span>
          <span className="font-bold text-gray-800">{stream.popularity}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center">
            <FaGraduationCap className="mr-1" />
            Courses:
          </span>
          <span className="font-bold text-gray-800">{courseCount || stream.totalCourses}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-gray-700 mb-2">Trending Courses:</h4>
        <div className="flex flex-wrap gap-2">
          {stream.trendingCourses.slice(0, 2).map((course, idx) => (
            <span key={idx} className="bg-white/60 text-xs px-2 py-1 rounded-full text-gray-700">
              {course}
            </span>
          ))}
        </div>
      </div>
      
      <button className={`w-full py-2 rounded-lg font-medium flex items-center justify-center transition-all ${
        stream.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
        stream.color === 'green' ? 'bg-green-600 hover:bg-green-700 text-white' :
        'bg-purple-600 hover:bg-purple-700 text-white'
      }`}>
        Explore <FaArrowRight className="ml-2" />
      </button>
    </div>
  );
};

export default StreamCard;
