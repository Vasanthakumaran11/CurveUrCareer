import React from 'react';

const StreamsOverview = () => {
  const streams = [
    {
      name: "Science",
      color: "bg-blue-100",
      textColor: "text-blue-800",
      borderColor: "border-blue-300",
      careers: ["Engineering", "Medicine", "Research", "Data Science"],
      icon: "🔬"
    },
    {
      name: "Commerce",
      color: "bg-green-100",
      textColor: "text-green-800",
      borderColor: "border-green-300",
      careers: ["CA", "Finance", "Business", "Marketing"],
      icon: "💼"
    },
    {
      name: "Arts/Humanities",
      color: "bg-purple-100",
      textColor: "text-purple-800",
      borderColor: "border-purple-300",
      careers: ["Law", "Psychology", "Journalism", "Design"],
      icon: "🎨"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Explore Major Streams</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {streams.map((stream, index) => (
          <div key={index} className={`border-2 ${stream.borderColor} rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition duration-300`}>
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{stream.icon}</span>
              <h3 className={`text-2xl font-bold ${stream.textColor}`}>{stream.name}</h3>
            </div>
            
            <div className={`${stream.color} rounded-lg p-4 mb-6`}>
              <h4 className="font-semibold text-gray-800 mb-2">Popular Career Paths:</h4>
              <div className="flex flex-wrap gap-2">
                {stream.careers.map((career, i) => (
                  <span key={i} className={`px-3 py-1 rounded-full text-sm ${stream.textColor} ${stream.color.replace('100', '200')}`}>
                    {career}
                  </span>
                ))}
              </div>
            </div>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Job roles & salaries</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Entrance exams required</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Skills needed</span>
              </li>
            </ul>
            
            <button className={`w-full py-3 font-medium rounded-lg ${stream.textColor} ${stream.color} border ${stream.borderColor} hover:opacity-90 transition duration-300`}>
              Explore {stream.name} →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StreamsOverview;