import React from 'react';
import { FaQuestionCircle, FaStream, FaSearch, FaChartLine, FaUserGraduate, FaUniversity, FaBriefcase, FaClipboardCheck } from 'react-icons/fa';

const HowItWorks = () => {
  const features = [
    {
      icon: <FaQuestionCircle className="text-4xl" />,
      title: "Personalized Assessment",
      description: "Take a quick quiz about your interests, strengths, and preferences",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: <FaStream className="text-4xl" />,
      title: "Stream Matching",
      description: "Get matched with the most suitable stream based on your profile",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: <FaUniversity className="text-4xl" />,
      title: "College & Course Finder",
      description: "Discover government colleges and courses available in your area",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: <FaClipboardCheck className="text-4xl" />,
      title: "Entrance Exam Guide",
      description: "Learn about required exams, syllabus, and preparation tips",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-100"
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: "Career Roadmap",
      description: "See step-by-step path from course completion to dream job",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: <FaBriefcase className="text-4xl" />,
      title: "Job Opportunities",
      description: "Explore potential careers, salaries, and industry demand",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-100"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discover Yourself",
      description: "Understand your strengths, interests, and career preferences through guided questions"
    },
    {
      step: "02",
      title: "Explore Options",
      description: "Browse through streams, courses, and colleges that match your profile"
    },
    {
      step: "03",
      title: "Plan Your Path",
      description: "Create a personalized roadmap with entrance exams, timelines, and milestones"
    },
    {
      step: "04",
      title: "Take Action",
      description: "Get guidance on applications, preparation, and next steps to secure your future"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Path to the Perfect Career
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A simple, guided journey from confusion to confidence. We help you make informed decisions about your future.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 h-full">
                  <div className="flex items-start mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl flex items-center justify-center font-bold text-2xl mr-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 pt-2">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {index < processSteps.length - 1 && (
                  <>
                    <div className="hidden lg:block absolute top-8 right-0 w-8 h-0.5 bg-blue-300 transform translate-x-4"></div>
                    <div className="hidden lg:block absolute top-8 right-0 w-0.5 h-8 bg-blue-300 transform translate-x-4 translate-y-8"></div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Everything You Need in One Place
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className={`${feature.bgColor} rounded-xl p-6 h-full transform transition duration-300 group-hover:-translate-y-2 group-hover:shadow-xl`}>
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white mr-4`}>
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{feature.title}</h4>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Shape Your Future?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have found their perfect career path with our guidance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition duration-300 transform hover:scale-105">
                Start Free Assessment
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
                Explore All Streams
              </button>
            </div>
            <div className="mt-8 flex justify-center space-x-6 text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">10,000+</div>
                <div className="text-blue-200">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">200+</div>
                <div className="text-blue-200">Colleges Listed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-blue-200">Career Experts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;