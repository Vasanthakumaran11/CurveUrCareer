import React from "react";

function App() {
  return (
    <div className="max-h-screen bg-gradient-to-r from-blue-100 to-white flex items-center justify-center">
      <div className="max-w-xl w-full p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
          Welcome to CurveUrCareer
        </h1>
        <p className="text-gray-600 text-center">
          This is your starter React + Tailwind project.
        </p>

        <div className="mt-6 flex justify-center">
          <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
