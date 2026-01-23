import React from 'react';
import { Link } from 'react-router-dom';

const StreamsOverview = () => {
  const streams = [
    {
      id: 'science',
      name: "Science",
      color: "bg-blue-100",
      textColor: "text-blue-800",
      borderColor: "border-blue-300",
      careers: ["Engineering", "Medicine", "Research", "Data Science"],
      icon: "🔬",
      description: "Explore careers in technology, research, healthcare, and innovation"
    },
    {
      id: 'commerce',
      name: "Commerce",
      color: "bg-green-100",
      textColor: "text-green-800",
      borderColor: "border-green-300",
      careers: ["CA", "Finance", "Business", "Marketing"],
      icon: "💼",
      description: "Dive into business, finance, accounting, and management careers"
    },
    {
      id: 'arts',
      name: "Arts/Humanities",
      color: "bg-purple-100",
      textColor: "text-purple-800",
      borderColor: "border-purple-300",
      careers: ["Law", "Psychology", "Journalism", "Design"],
      icon: "🎨",
      description: "Discover creative, social sciences, and communication careers"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Explore Major Streams</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose your academic stream to explore detailed career paths, courses, and opportunities
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {streams.map((stream, index) => (
          <div 
            key={stream.id} 
            className={`border-2 ${stream.borderColor} rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 group`}
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{stream.icon}</span>
              <div>
                <h3 className={`text-2xl font-bold ${stream.textColor}`}>{stream.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{stream.description}</p>
              </div>
            </div>
            
            <div className={`${stream.color} rounded-lg p-4 mb-6`}>
              <h4 className="font-semibold text-gray-800 mb-2">Popular Career Paths:</h4>
              <div className="flex flex-wrap gap-2">
                {stream.careers.map((career, i) => (
                  <span 
                    key={i} 
                    className={`px-3 py-1 rounded-full text-sm ${stream.textColor} ${stream.color.replace('100', '200')}`}
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <div className={`w-2 h-2 ${stream.textColor.replace('text-', 'bg-')} rounded-full mr-3`}></div>
                <span className="text-gray-700">Detailed job roles & salary ranges</span>
              </li>
              <li className="flex items-center">
                <div className={`w-2 h-2 ${stream.textColor.replace('text-', 'bg-')} rounded-full mr-3`}></div>
                <span className="text-gray-700">Entrance exams required for admission</span>
              </li>
              <li className="flex items-center">
                <div className={`w-2 h-2 ${stream.textColor.replace('text-', 'bg-')} rounded-full mr-3`}></div>
                <span className="text-gray-700">Essential skills needed for success</span>
              </li>
              <li className="flex items-center">
                <div className={`w-2 h-2 ${stream.textColor.replace('text-', 'bg-')} rounded-full mr-3`}></div>
                <span className="text-gray-700">Top colleges and institutions</span>
              </li>
            </ul>
            
            <Link 
              to={`/streams/${stream.id}`}
              className={`w-full py-3 font-medium rounded-lg ${stream.textColor} ${stream.color} border ${stream.borderColor} hover:opacity-90 transition duration-300 flex items-center justify-center group-hover:scale-105`}
            >
              <span>Explore {stream.name} Courses</span>
              <svg 
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        ))}
      </div>

      {/* View All Streams Link */}
      <div className="text-center mt-12">
        <Link 
          to="/streams"
          className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition duration-300"
        >
          <span>View All Career Pathways</span>
          <svg 
            className="w-5 h-5 ml-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
        <p className="text-gray-500 text-sm mt-3">Browse through 100+ courses across all streams</p>
      </div>
    </section>
  );
};

export default StreamsOverview;