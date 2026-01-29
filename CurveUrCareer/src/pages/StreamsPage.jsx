import React from 'react';

const StreamsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Educational Streams</h1>
        <p className="text-lg text-gray-600 mb-4">
          Explore different educational streams and find courses that match your interests.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Available Streams</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Science</li>
            <li>Commerce</li>
            <li>Arts</li>
            <li>Technology</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StreamsPage;