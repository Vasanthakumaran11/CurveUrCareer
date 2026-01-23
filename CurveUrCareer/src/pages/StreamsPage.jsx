import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar, FaGraduationCap, FaClock, FaArrowRight, FaUsers } from 'react-icons/fa';
import { streamsData } from '../data/streamsData';
import StreamCard from '../components/StreamCard';
import CourseCard from '../components/CourseCard';

const StreamsPage = () => {
  const { streamId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStream, setSelectedStream] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    if (streamId) {
      const stream = streamsData.streams.find(s => s.id === streamId);
      setSelectedStream(stream);
      
      if (stream && streamsData.courses[streamId]) {
        setFilteredCourses(streamsData.courses[streamId]);
      }
    } else {
      setSelectedStream(null);
      // Show all courses from all streams
      const allCourses = Object.values(streamsData.courses).flat();
      setFilteredCourses(allCourses);
    }
  }, [streamId]);

  useEffect(() => {
    let courses = streamId ? streamsData.courses[streamId] || [] : Object.values(streamsData.courses).flat();
    
    // Apply search filter
    if (searchTerm) {
      courses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      courses = courses.filter(course => 
        course.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setFilteredCourses(courses);
  }, [searchTerm, selectedCategory, streamId]);

  const getStreamCoursesCount = (streamId) => {
    return streamsData.courses[streamId]?.length || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-md z-10">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <Link to="/" className="text-2xl font-bold text-gray-800">CurveUrCareer</Link>
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <Link to="/career-guidance" className="text-gray-600 hover:text-blue-600">Career Guidance</Link>
            <Link to="/streams" className="text-blue-600 font-medium border-b-2 border-blue-600">Streams</Link>
            <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {selectedStream ? `${selectedStream.icon} Explore ${selectedStream.name} Courses` : '🎓 Explore All Career Pathways'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {selectedStream ? selectedStream.description : 'Browse through various career options and find your perfect fit'}
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search careers or courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FaFilter className="text-gray-500 mr-2" />
                <span className="text-gray-700 font-medium">Filter by:</span>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {streamsData.categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stream Selection (if no specific stream selected) */}
        {!streamId && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Stream</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {streamsData.streams.map(stream => (
                <StreamCard
                  key={stream.id}
                  stream={stream}
                  courseCount={getStreamCoursesCount(stream.id)}
                  onClick={() => navigate(`/streams/${stream.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Stream Info Banner (if specific stream selected) */}
        {selectedStream && (
          <div className={`mb-8 p-6 rounded-2xl ${
            selectedStream.color === 'blue' ? 'bg-blue-50 border border-blue-200' :
            selectedStream.color === 'green' ? 'bg-green-50 border border-green-200' :
            'bg-purple-50 border border-purple-200'
          }`}>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedStream.icon} {selectedStream.name} Stream
                </h2>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <FaStar className="mr-1 text-yellow-500" />
                    {selectedStream.popularity} Popularity
                  </span>
                  <span className="flex items-center">
                    <FaGraduationCap className="mr-1 text-blue-500" />
                    {selectedStream.totalCourses} Courses Available
                  </span>
                  <span className="flex items-center">
                    <FaUsers className="mr-1 text-green-500" />
                    High Career Opportunities
                  </span>
                </div>
              </div>
              <Link
                to="/streams"
                className="mt-4 md:mt-0 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
              >
                ← Back to All Streams
              </Link>
            </div>
          </div>
        )}
        {/* Courses Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              {selectedStream ? 'Available Courses' : 'All Career Courses'}
              <span className="ml-2 text-blue-600">({filteredCourses.length})</span>
            </h3>
            <div className="text-sm text-gray-500">
              Sorted by: <span className="font-medium text-gray-700">Popularity</span>
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow">
              <div className="text-5xl mb-4">🔍</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">No courses found</h4>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
        <br />
        {/* Career Paths Section (if specific stream selected) */}
        {selectedStream && (
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Popular Career Paths</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedStream.careerPaths.map((path, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{path.icon}</span>
                    <h4 className="font-bold text-gray-800">{path.name}</h4>
                  </div>
                  <div className="space-y-1">
                    {path.careers.slice(0, 3).map((career, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {career}
                      </div>
                    ))}
                    {path.careers.length > 3 && (
                      <div className="text-sm text-blue-600">+{path.careers.length - 3} more</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Trending Courses Section */}
        {selectedStream && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-800 mb-6">🔥 Trending in {selectedStream.name}</h3>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedStream.trendingCourses.map((course, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-800">{course}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Trending</span>
                    </div>
                    <Link
                      to={`/course/${selectedStream.id}-${course.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      Explore <FaArrowRight className="ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still Confused About Your Career Path?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Take our personalized career assessment to find the perfect match based on your skills, interests, and personality.
            </p>
            <Link
              to="/career-guidance"
              className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition duration-300"
            >
              Start Career Assessment →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StreamsPage;