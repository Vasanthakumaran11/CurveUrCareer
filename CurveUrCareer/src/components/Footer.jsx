import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
              <h2 className="text-2xl font-bold">CurveUrCareer</h2>
            </div>
            <p className="text-gray-400">
              Your one-stop personalized career and education advisor for students after Class 12.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Science Stream</a></li>
              <li><a href="#" className="hover:text-white">Commerce Stream</a></li>
              <li><a href="#" className="hover:text-white">Arts Stream</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Course Catalog</a></li>
              <li><a href="#" className="hover:text-white">College Finder</a></li>
              <li><a href="#" className="hover:text-white">Entrance Exams</a></li>
              <li><a href="#" className="hover:text-white">Career Roadmaps</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>help@curveurcareer.com</li>
              <li>+91 98765 43210</li>
              <li>Monday-Friday: 9AM-6PM</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} CurveUrCareer. All rights reserved. Made for students, by educators.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;