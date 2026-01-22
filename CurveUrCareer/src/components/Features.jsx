import React from 'react';

const Features = () => {
  const features = [
    {
      number: "12+",
      title: "Courses Covered",
      description: "Comprehensive course database with detailed information"
    },
    {
      number: "3",
      title: "Major Streams",
      description: "Science, Commerce, and Arts with all sub-streams"
    },
    {
      number: "100%",
      title: "Free Guidance",
      description: "Completely free for all students - no hidden charges"
    }
  ];

  return (
    <section className="bg-white py-12 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-xl border-2 border-blue-100 bg-gradient-to-b from-white to-blue-50 shadow-sm hover:shadow-md transition duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">{feature.number}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;