import React from 'react';

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Your Career Journey Starts Here
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Confused About What to Do After Class 12?
        </p>
        <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
          Don't worry! We'll help you discover the right stream, choose the best course, 
          and understand your career options — all in simple language.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-lg transition duration-300 transform hover:scale-105">
          Start Your Career Discovery →
        </button>
      </div>
    </section>
  );
};

export default Hero;