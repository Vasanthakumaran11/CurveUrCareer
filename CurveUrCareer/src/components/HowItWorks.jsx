import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Answer Simple Questions",
      description: "Tell us about your interests, subjects you like, and career preferences",
      icon: "❓"
    },
    {
      step: "2",
      title: "Explore Stream Options",
      description: "See which stream matches your interests and abilities",
      icon: "📊"
    },
    {
      step: "3",
      title: "Discover Courses & Colleges",
      description: "Find suitable courses in government colleges near you",
      icon: "🎓"
    },
    {
      step: "4",
      title: "Understand Career Outcomes",
      description: "Learn about job roles, salaries, skills needed, and entrance exams",
      icon: "💼"
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">How It Works</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Simple 4-step process to find your perfect career path
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">
                    {step.step}
                  </div>
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-8 h-0.5 bg-blue-300 transform translate-x-4"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-lg transition duration-300">
            Start Your Journey Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;