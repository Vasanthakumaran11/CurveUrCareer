import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Import images if they exist, otherwise use placeholder URLs
// If you have local images, place them in src/assets/ and import them
import AiImage from '../assets/AI.jpg'; // Make sure this file exists in src/assets/

const TrendingCourses = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const trendingCourses = [
    {
      id: 1,
      title: "Computer Science Engineering",
      stream: "Science",
      duration: "4 Years",
      image: AiImage, // Use imported image
      color: "bg-blue-100",
      textColor: "text-blue-800",
      rating: 4.8,
      students: "50K+ Students"
    },
    {
      id: 2,
      title: "Bachelor of Commerce (B.Com)",
      stream: "Commerce",
      duration: "3 Years",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop",
      color: "bg-green-100",
      textColor: "text-green-800",
      rating: 4.6,
      students: "40K+ Students"
    },
    {
      id: 3,
      title: "Bachelor of Arts (Psychology)",
      stream: "Arts",
      duration: "3 Years",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&auto=format&fit=crop",
      color: "bg-purple-100",
      textColor: "text-purple-800",
      rating: 4.7,
      students: "35K+ Students"
    },
    {
      id: 4,
      title: "Bachelor of Science (B.Sc)",
      stream: "Science",
      duration: "3 Years",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop",
      color: "bg-blue-100",
      textColor: "text-blue-800",
      rating: 4.5,
      students: "45K+ Students"
    },
    {
      id: 5,
      title: "Chartered Accountancy (CA)",
      stream: "Commerce",
      duration: "4-5 Years",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop",
      color: "bg-green-100",
      textColor: "text-green-800",
      rating: 4.9,
      students: "30K+ Students"
    },
    {
      id: 6,
      title: "Bachelor of Design (B.Des)",
      stream: "Arts",
      duration: "4 Years",
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&auto=format&fit=crop",
      color: "bg-purple-100",
      textColor: "text-purple-800",
      rating: 4.7,
      students: "25K+ Students"
    }
  ];

  // Fallback image URL in case imported image doesn't exist
  const getImageSrc = (image) => {
    if (typeof image === 'string') {
      return image;
    } else if (image && image.default) {
      return image.default;
    } else if (image) {
      return image;
    }
    // Fallback image if no image is provided
    return "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&auto=format&fit=crop";
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === trendingCourses.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? trendingCourses.length - 3 : prevIndex - 1
    );
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Trending Courses Across All Streams</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore popular courses that students are choosing this year
        </p>
      </div>

      {/* Carousel Controls */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={prevSlide}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <div className="flex space-x-2">
          {[...Array(Math.ceil(trendingCourses.length / 3))].map((_, i) => (
            <div 
              key={i}
              className={`w-3 h-3 rounded-full ${currentIndex === i * 3 ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <button 
          onClick={nextSlide}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
        >
          <FaArrowRight className="text-xl" />
        </button>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {trendingCourses.map((course) => (
            <div key={course.id} className="w-full md:w-1/3 flex-shrink-0 px-3">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300 group">
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={getImageSrc(course.image)} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${course.textColor} ${course.color}`}>
                      {course.stream}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                    <span className="text-sm font-bold text-gray-800">{course.duration}</span>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                  
                  {/* Quick Info Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
                      High Demand
                    </span>
                    <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">
                      Good ROI
                    </span>
                    <span className="bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full">
                      Multiple Careers
                    </span>
                  </div>
                  
                  {/* View Details Button */}
                  <button className={`w-full py-3 font-medium rounded-lg ${course.textColor} ${course.color} border ${course.color.replace('100', '300')} hover:opacity-90 transition duration-300 group-hover:scale-105`}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Indicators for Mobile */}
      <div className="flex justify-center mt-8 space-x-2 md:hidden">
        {[...Array(Math.ceil(trendingCourses.length / 1))].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i * 1)}
            className={`w-3 h-3 rounded-full ${currentIndex === i * 1 ? 'bg-blue-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingCourses;