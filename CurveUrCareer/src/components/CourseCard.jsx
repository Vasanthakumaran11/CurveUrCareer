import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaGraduationCap, FaChartLine, FaBook, FaArrowRight } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'very high': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDemandColor = (demand) => {
    switch(demand.toLowerCase()) {
      case 'very high': return 'bg-green-100 text-green-800';
      case 'high': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300 group">
      {/* Course Header */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-bold text-white bg-black/70 backdrop-blur-sm`}>
            {course.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getDemandColor(course.demand)}`}>
            {course.demand} Demand
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
            <p className="text-sm text-gray-500">{course.stream} • {course.duration}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
        </div>

        <p className="text-gray-600 mb-6 line-clamp-2">{course.description}</p>

        {/* Course Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-500 mb-1">
              <FaClock />
            </div>
            <div className="text-sm font-bold text-gray-800">{course.duration}</div>
            <div className="text-xs text-gray-500">Duration</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-500 mb-1">
              <FaGraduationCap />
            </div>
            <div className="text-sm font-bold text-gray-800">{course.avgSalary}</div>
            <div className="text-xs text-gray-500">Avg Salary</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-500 mb-1">
              <FaChartLine />
            </div>
            <div className="text-sm font-bold text-gray-800">{course.demand}</div>
            <div className="text-xs text-gray-500">Demand</div>
          </div>
        </div>

        {/* Skills Preview */}
        <div className="mb-6">
          <div className="flex items-center text-gray-700 font-medium mb-2">
            <FaBook className="mr-2" />
            Key Skills
          </div>
          <div className="flex flex-wrap gap-2">
            {course.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
            {course.skills.length > 3 && (
              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                +{course.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link
            to={`/course/${course.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg text-center transition duration-300 flex items-center justify-center group"
          >
            View Details
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;