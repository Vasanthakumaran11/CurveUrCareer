import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaClock, FaGraduationCap, FaChartLine, FaBook, 
  FaUniversity, FaCheckCircle, FaCalendar, FaMapMarkerAlt, FaMoneyBillWave,
  FaUsers, FaStar, FaExternalLinkAlt, FaDownload, FaShareAlt, FaBookmark
} from 'react-icons/fa';
import { streamsData } from '../data/streamsData';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [relatedCourses, setRelatedCourses] = useState([]);

  useEffect(() => {
    // Find course in all streams
    let foundCourse = null;
    let streamId = null;

    for (const [stream, courses] of Object.entries(streamsData.courses)) {
      const found = courses.find(c => c.id === courseId);
      if (found) {
        foundCourse = found;
        streamId = stream;
        break;
      }
    }

    if (foundCourse) {
      setCourse({ ...foundCourse, streamId });
      
      // Find related courses from same stream
      if (streamId) {
        const related = streamsData.courses[streamId]
          .filter(c => c.id !== courseId)
          .slice(0, 3);
        setRelatedCourses(related);
      }
    } else {
      navigate('/streams');
    }
  }, [courseId, navigate]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  const stream = streamsData.streams.find(s => s.id === course.streamId);

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
            <Link to="/streams" className="text-gray-600 hover:text-blue-600">Streams</Link>
            <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to {stream?.name || 'Streams'}
        </button>

        {/* Course Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{stream?.icon || '🎓'}</span>
                <div>
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-700">
                    {course.category}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600">{course.stream}</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white px-4 py-2 rounded-lg">
                  <FaClock className="text-blue-600 mr-2" />
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-lg">
                  <FaMoneyBillWave className="text-green-600 mr-2" />
                  <span className="font-medium">{course.avgSalary}</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-lg">
                  <FaChartLine className="text-purple-600 mr-2" />
                  <span className="font-medium">{course.demand} Demand</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-lg">
                  <FaGraduationCap className="text-yellow-600 mr-2" />
                  <span className="font-medium">{course.difficulty} Difficulty</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eligibility</span>
                    <span className="font-medium">{course.eligibility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entrance Exams</span>
                    <span className="font-medium">{course.entranceExams.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Top Colleges</span>
                    <span className="font-medium">{course.topColleges.split(',').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Career Growth</span>
                    <span className="font-medium text-green-600">High</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-300 flex items-center justify-center">
                    <FaBookmark className="mr-2" />
                    Save Course
                  </button>
                  <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 rounded-lg transition duration-300 flex items-center justify-center">
                    <FaShareAlt className="mr-2" />
                    Share with Friends
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {['overview', 'colleges', 'roadmap', 'skills', 'exams'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-3 px-1 font-medium border-b-2 transition duration-300 ${
                  selectedTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {selectedTab === 'overview' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 shadow">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">📋 Course Overview</h3>
                  <p className="text-gray-600 mb-6">
                    {course.title} is a comprehensive program designed to equip students with the necessary skills 
                    and knowledge to excel in the field. This course combines theoretical knowledge with practical 
                    applications, preparing students for real-world challenges.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <FaCheckCircle className="text-green-500 mr-2" />
                          <span>Industry-relevant curriculum</span>
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-green-500 mr-2" />
                          <span>Practical hands-on training</span>
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-green-500 mr-2" />
                          <span>Industry expert faculty</span>
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-green-500 mr-2" />
                          <span>Internship opportunities</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">Career Opportunities</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span>High-paying job roles</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span>Global career prospects</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span>Entrepreneurship opportunities</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span>Research and development</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">🎯 Skills You'll Learn</h3>
                  <div className="flex flex-wrap gap-3">
                    {course.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'colleges' && (
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">🏛 Top Colleges & Institutions</h3>
                <div className="space-y-4">
                  {course.topColleges.split(', ').map((college, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition duration-300">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-gray-800">{college}</h4>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <FaMapMarkerAlt className="mr-1" />
                            <span>Multiple locations across India</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-yellow-500">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar className="text-gray-300" />
                            <span className="ml-2 text-gray-700">4.2</span>
                          </div>
                          <div className="text-sm text-gray-500">Ranking: Top {index + 1}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                        <div>
                          <div className="text-gray-500">Average Fees</div>
                          <div className="font-medium">₹{index === 0 ? '2-5' : '1-3'} L/Year</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Placement Rate</div>
                          <div className="font-medium text-green-600">90%+</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Avg Package</div>
                          <div className="font-medium">{course.avgSalary}</div>
                        </div>
                      </div>
                      <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm flex items-center">
                        View College Details <FaExternalLinkAlt className="ml-1" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'roadmap' && (
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">🗺️ Success Roadmap</h3>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200"></div>
                  
                  {course.roadmap.map((step, index) => (
                    <div key={index} className="relative mb-8 ml-12">
                      <div className="absolute -left-9 top-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-5">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-lg font-bold text-gray-800">
                            {step.year ? `Year ${step.year}` : step.stage}
                          </h4>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            Focus Area
                          </span>
                        </div>
                        <p className="text-gray-700">{step.focus}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {index === 0 && (
                            <>
                              <span className="bg-white border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm">
                                Foundation Subjects
                              </span>
                              <span className="bg-white border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm">
                                Basic Skills
                              </span>
                            </>
                          )}
                          {index === 1 && (
                            <>
                              <span className="bg-white border border-green-200 text-green-700 px-3 py-1 rounded-full text-sm">
                                Specialization
                              </span>
                              <span className="bg-white border border-green-200 text-green-700 px-3 py-1 rounded-full text-sm">
                                Projects
                              </span>
                            </>
                          )}
                          {index === 2 && (
                            <>
                              <span className="bg-white border border-purple-200 text-purple-700 px-3 py-1 rounded-full text-sm">
                                Advanced Topics
                              </span>
                              <span className="bg-white border border-purple-200 text-purple-700 px-3 py-1 rounded-full text-sm">
                                Placements
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-bold text-gray-800 mb-2">🎯 Pro Tips for Success</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span>Start building projects from year 1</span>
                    </li>
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span>Participate in hackathons and competitions</span>
                    </li>
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span>Network with industry professionals</span>
                    </li>
                    <li className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span>Focus on soft skills development</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {selectedTab === 'skills' && (
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">💪 Essential Skills Breakdown</h3>
                <div className="space-y-6">
                  {course.skills.map((skill, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-gray-800">{skill}</h4>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {index < 3 ? 'Core Skill' : 'Advanced Skill'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {index < 2 
                          ? 'Fundamental skill required for all positions in this field'
                          : 'Specialized skill that gives competitive advantage'
                        }
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="w-3/4 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${100 - (index * 15)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{100 - (index * 15)}% Important</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'exams' && (
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">📝 Entrance Exams & Admission</h3>
                <div className="space-y-6">
                  {course.entranceExams.map((exam, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">{exam}</h4>
                          <p className="text-gray-600 mt-1">National/State level entrance examination</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          index === 0 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {index === 0 ? 'Most Important' : 'Important'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Exam Frequency</div>
                          <div className="font-bold">Once a Year</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Difficulty Level</div>
                          <div className="font-bold">{index === 0 ? 'Very High' : 'High'}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Acceptance Rate</div>
                          <div className="font-bold">{index === 0 ? '< 1%' : '5-10%'}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <a 
                          href="#" 
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          Download Syllabus <FaDownload className="ml-1" />
                        </a>
                        <a 
                          href="#" 
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          Previous Papers <FaExternalLinkAlt className="ml-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-lg font-bold text-gray-800 mb-4">⚡ Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-300">
                  Download Course Guide
                </button>
                <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 rounded-lg transition duration-300">
                  Compare with Similar Courses
                </button>
                <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 rounded-lg transition duration-300">
                  Book Career Counseling
                </button>
              </div>
            </div>

            {/* Related Courses */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📚 Related Courses</h3>
              <div className="space-y-4">
                {relatedCourses.map((relatedCourse) => (
                  <div key={relatedCourse.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition duration-300">
                    <h4 className="font-bold text-gray-800 mb-1">{relatedCourse.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <FaClock className="mr-1" />
                      <span>{relatedCourse.duration}</span>
                      <span className="mx-2">•</span>
                      <FaMoneyBillWave className="mr-1" />
                      <span>{relatedCourse.avgSalary}</span>
                    </div>
                    <Link
                      to={`/course/${relatedCourse.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      View Details <FaArrowRight className="ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Support */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 shadow border border-green-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Need Help Deciding?</h3>
              <p className="text-gray-600 mb-4">
                Still unsure if this course is right for you? Our career counselors can help!
              </p>
              <Link
                to="/career-guidance"
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg text-center transition duration-300"
              >
                Get Personalized Advice
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;