import React from 'react';
import { Link } from 'react-router-dom'; // Add this import
import Hero from './components/Hero';
import Features from './components/Features';
import TrendingCourses from './components/TrendingCourses';
import StreamsOverview from './components/StreamsOverview';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';


const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Navigation - Updated to use Link */}
      <header className="sticky top-0 bg-white shadow-md z-10">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <Link to="/" className="text-2xl font-bold text-gray-800">CurveUrCareer</Link>
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="text-blue-600 font-medium border-b-2 border-blue-600">Home</Link>
            <Link to="/career-guidance" className="text-gray-600 hover:text-blue-600">Career Guidance</Link>
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
};

export default Home;