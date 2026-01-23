import React from 'react';
import { FaCalendarCheck, FaBookOpen, FaHandsHelping, FaUserGraduate, FaSearch, FaRocket } from 'react-icons/fa';

const RoadmapStep = ({ prevStep, suggestions }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Career Action Roadmap</h2>
        <p className="text-xl text-gray-600">
          A step-by-step guide to turn your career aspirations into reality
        </p>
      </div>

     

      {/* Degree & Course Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 mb-10">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4">
            <FaUserGraduate className="text-2xl text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Recommended Degree Programs</h3>
            <p className="text-gray-600">Based on government colleges and recognized institutions</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4 text-left">Course</th>
                <th className="p-4 text-left">Duration</th>
                <th className="p-4 text-left">Entrance Exams</th>
                <th className="p-4 text-left">Top Colleges</th>
              </tr>
            </thead>
            <tbody>
              {suggestions.slice(0, 3).map((career, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-4 font-medium">{career.degree}</td>
                  <td className="p-4">{career.duration}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {career.entranceExams.map((exam, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {exam}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{career.colleges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Skill Development Timeline */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
            <FaBookOpen className="text-2xl text-green-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Skill Development Timeline</h3>
            <p className="text-gray-600">Build your expertise gradually</p>
          </div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          
          {[
            { time: '1-3 Months', title: 'Foundation Skills', skills: ['Basic Concepts', 'Online Courses', 'Beginner Projects'] },
            { time: '3-6 Months', title: 'Intermediate Skills', skills: ['Advanced Topics', 'Practical Projects', 'Industry Tools'] },
            { time: '6-12 Months', title: 'Specialization', skills: ['Advanced Certification', 'Real-world Projects', 'Portfolio Building'] },
            { time: '12+ Months', title: 'Expert Level', skills: ['Advanced Projects', 'Internships', 'Industry Networking'] }
          ].map((phase, index) => (
            <div key={index} className="relative mb-8 ml-12">
              <div className="absolute -left-9 top-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-bold text-gray-800">{phase.title}</h4>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {phase.time}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {phase.skills.map((skill, i) => (
                    <span key={i} className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Encouragement */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-center text-white mb-10">
        <h3 className="text-2xl font-bold mb-4">You're Not Alone in This Journey</h3>
        <p className="text-lg mb-6">
          Thousands of students have successfully navigated this path. Your confusion today 
          is the first step toward a meaningful career tomorrow.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition duration-300">
            Download Your Career Report
          </button>
          <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition duration-300">
            Book Free Counseling Session
          </button>
        </div>
      </div>

      {/* Final Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition duration-300"
        >
          ← Back to Analysis
        </button>
        <div className="space-x-4">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300">
            Save Your Progress
          </button>
          <a 
            href="/"
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition duration-300 inline-block"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default RoadmapStep;