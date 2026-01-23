import React from 'react';

const WelcomeStep = ({ nextStep }) => {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Your Personal Career Counselor
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Feeling confused about what to do after 10th or 12th? That's completely normal!
        </p>
        <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
          <p className="text-lg text-gray-700 mb-4">
            <span className="font-bold text-blue-600">Important:</span> Interests aren't always predefined. 
            They can be discovered and developed through the right exposure and learning environment.
          </p>
          <p className="text-gray-600">
            This guided process will help you understand yourself better and explore career paths 
            that match your unique strengths and preferences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="text-3xl mb-4">🎯</div>
          <h3 className="font-bold text-lg mb-2">Personalized Assessment</h3>
          <p className="text-gray-600">Understand your unique strengths and preferences</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="text-3xl mb-4">🧩</div>
          <h3 className="font-bold text-lg mb-2">Career Matching</h3>
          <p className="text-gray-600">Find careers that truly fit your personality</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="text-3xl mb-4">🗺️</div>
          <h3 className="font-bold text-lg mb-2">Actionable Roadmap</h3>
          <p className="text-gray-600">Step-by-step guide to achieve your goals</p>
        </div>
      </div>

      <button 
        onClick={nextStep}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg text-lg shadow-lg transition duration-300 transform hover:scale-105"
      >
        Begin Your Career Discovery Journey →
      </button>

      <p className="text-gray-500 mt-8 text-sm">
        All information is confidential. No login required. 100% free guidance.
      </p>
    </div>
  );
};

export default WelcomeStep;