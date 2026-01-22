import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import TrendingCourses from './components/TrendingCourses';
import StreamsOverview from './components/StreamsOverview';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 bg-white shadow-md z-10">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <h1 className="text-2xl font-bold text-gray-800">CurveUrCareer</h1>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Streams</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Courses</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
          </div>
        </nav>
      </header>

      <main>
        <Hero />
        <Features />
        <TrendingCourses />
        <StreamsOverview />
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}

export default App;