import React, { useState, useEffect } from 'react';
import { 
  FaCalculator, FaBook, FaFlask, FaChartLine, FaLightbulb, 
  FaUserGraduate, FaExclamationCircle, FaTrophy, FaMedal,
  FaBrain, FaRocket, FaGraduationCap, FaStar, FaFire,
  FaChessKnight, FaPalette, FaCode, FaTheaterMasks,
  FaMusic, FaLaptopCode, FaMicroscope, FaGlobe,
  FaHeart, FaUsers, FaPuzzlePiece, FaAward,
  FaChartBar, FaBookReader, FaPencilAlt, FaCheckCircle,
  FaClock, FaClipboardList, FaBriefcase, FaLanguage
} from 'react-icons/fa';

const AcademicStep = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [academic, setAcademic] = useState({
    // Basic Information
    board: formData.board || '',
    classCompleted: formData.classCompleted || '',
    tenthPercentage: formData.tenthPercentage || '',
    twelfthStream: formData.twelfthStream || '',
    twelfthPercentage: formData.twelfthPercentage || '',
    twelfthAverageMark: formData.twelfthAverageMark || '',
    
    // Academic Performance
    studyHoursDaily: formData.studyHoursDaily || '',
    studyPattern: formData.studyPattern || '',
    concentrationLevel: formData.concentrationLevel || 3,
    learningStyle: formData.learningStyle || '',
    preferredLearningMode: formData.preferredLearningMode || '',
    
    // Subject Preferences
    favoriteSubjects: formData.favoriteSubjects || [],
    difficultSubjects: formData.difficultSubjects || [],
    subjectStrengths: formData.subjectStrengths || '',
    
    // Core Competencies (simplified to radio options)
    mathComfort: formData.mathComfort || '',
    theoryComfort: formData.theoryComfort || '',
    practicalComfort: formData.practicalComfort || '',
    analyticalThinking: formData.analyticalThinking || '',
    creativityLevel: formData.creativityLevel || ''
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [progress, setProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    calculateProgress();
  }, [academic]);

  const calculateProgress = () => {
    const allFields = Object.keys(academic);
    let filledFields = 0;

    allFields.forEach(field => {
      if (Array.isArray(academic[field])) {
        if (academic[field].length > 0) filledFields++;
      } else if (academic[field] !== '' && academic[field] !== 3) {
        filledFields++;
      }
    });

    const percentage = Math.round((filledFields / allFields.length) * 100);
    setProgress(percentage);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcademic(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (field, value) => {
    setAcademic(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const tabs = [
    { id: 'basic', name: 'Basic Information', icon: <FaUserGraduate /> },
    { id: 'academic', name: 'Academic Performance', icon: <FaTrophy /> },
    { id: 'subjects', name: 'Subject Analysis', icon: <FaBook /> },
    { id: 'competencies', name: 'Core Competencies', icon: <FaBrain /> }
  ];

  const renderBasicInformation = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
          <FaGraduationCap className="mr-3 text-blue-600 text-2xl" />
          Educational Background
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Current Academic Level <span className="text-red-500">*</span>
            </label>
            <select 
              name="classCompleted"
              value={academic.classCompleted}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Select Level</option>
              <option value="10">Completed 10th Standard</option>
              <option value="12">Completed 12th Standard</option>
              <option value="college">Currently in College</option>
              <option value="graduate">Completed Graduation</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Education Board <span className="text-red-500">*</span>
            </label>
            <select 
              name="board"
              value={academic.board}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Select Board</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE/ISC</option>
              <option value="State Board">State Board</option>
              <option value="IB">International Baccalaureate (IB)</option>
              <option value="IGCSE">IGCSE/Cambridge</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              10th Standard Percentage/CGPA <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="tenthPercentage"
              value={academic.tenthPercentage}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter percentage or CGPA"
              min="0"
              max="100"
              step="0.01"
            />
          </div>

          {(academic.classCompleted === '12' || academic.classCompleted === 'college' || academic.classCompleted === 'graduate') && (
            <>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  12th Standard Stream <span className="text-red-500">*</span>
                </label>
                <select 
                  name="twelfthStream"
                  value={academic.twelfthStream}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Stream</option>
                  <option value="CS">Science - PCM (Physics, Chemistry, Mathematics)</option>
                  <option value="CB">Science - PCB (Physics, Chemistry, Biology)</option>
                  <option value="PCMB">Science - PCMB (All Sciences)</option>
                  <option value="Commerce">Commerce (with/without Maths)</option>
                  <option value="Arts">Arts/Humanities</option>
                  <option value="Vocational">Vocational Stream</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  12th Standard Percentage/CGPA <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="twelfthPercentage"
                  value={academic.twelfthPercentage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter percentage or CGPA"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  12th Average Mark <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="twelfthAverageMark"
                  value={academic.twelfthAverageMark}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter average marks"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderAcademicPerformance = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
          <FaClock className="mr-3 text-green-600 text-2xl" />
          Study Habits & Learning Patterns
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Average Daily Study Hours <span className="text-red-500">*</span>
            </label>
            <select 
              name="studyHoursDaily"
              value={academic.studyHoursDaily}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Study Duration</option>
              <option value="Less than 1 hour">Less than 1 hour</option>
              <option value="1-2 hours">1-2 hours</option>
              <option value="2-3 hours">2-3 hours</option>
              <option value="3-4 hours">3-4 hours</option>
              <option value="4-5 hours">4-5 hours</option>
              <option value="More than 5 hours">More than 5 hours</option>
              <option value="Varies significantly">Varies significantly</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Preferred Study Time
            </label>
            <select 
              name="studyPattern"
              value={academic.studyPattern}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Study Pattern</option>
              <option value="Early Morning (5 AM - 8 AM)">Early Morning (5 AM - 8 AM)</option>
              <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
              <option value="Afternoon (12 PM - 5 PM)">Afternoon (12 PM - 5 PM)</option>
              <option value="Evening (5 PM - 9 PM)">Evening (5 PM - 9 PM)</option>
              <option value="Night (9 PM - 12 AM)">Night (9 PM - 12 AM)</option>
              <option value="Late Night (12 AM - 3 AM)">Late Night (12 AM - 3 AM)</option>
              <option value="Flexible">Flexible - No fixed pattern</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Learning Style Preference <span className="text-red-500">*</span>
            </label>
            <select 
              name="learningStyle"
              value={academic.learningStyle}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Learning Style</option>
              <option value="Visual">Visual (Diagrams, charts, videos)</option>
              <option value="Auditory">Auditory (Lectures, discussions)</option>
              <option value="Reading/Writing">Reading/Writing (Notes, textbooks)</option>
              <option value="Kinesthetic">Kinesthetic (Hands-on, practical)</option>
              <option value="Multimodal">Multimodal (Combination of styles)</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Preferred Learning Environment
            </label>
            <select 
              name="preferredLearningMode"
              value={academic.preferredLearningMode}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Environment</option>
              <option value="Traditional Classroom">Traditional Classroom Setting</option>
              <option value="Online Learning">Online/Virtual Learning</option>
              <option value="Hybrid">Hybrid (Mix of both)</option>
              <option value="Self-Paced">Self-Paced Learning</option>
              <option value="Group Study">Collaborative Group Study</option>
              <option value="One-on-One">One-on-One Tutoring</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-3">
            Concentration & Focus Level
          </label>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 w-20">Low</span>
            <input 
              type="range" 
              min="1" 
              max="5" 
              name="concentrationLevel"
              value={academic.concentrationLevel}
              onChange={handleChange}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-600 w-20 text-right">High</span>
            <span className="font-bold text-blue-600 text-lg w-12 text-center">{academic.concentrationLevel}/5</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2 px-20">
            <span>Easily Distracted</span>
            <span>Moderate Focus</span>
            <span>Highly Focused</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubjectAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
          <FaBook className="mr-3 text-indigo-600 text-2xl" />
          Subject Preferences & Strengths
        </h3>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3">
            Favorite Subjects (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Mathematics',
              'Physics',
              'Chemistry',
              'Biology',
              'English',
              'History',
              'Geography',
              'Economics',
              'Computer Science',
              'Physical Education',
              'Art',
              'Music',
              'Social Science',
              'Civics',
              'Hindi/Regional Language'
            ].map(subject => (
              <button
                key={subject}
                onClick={() => handleMultiSelect('favoriteSubjects', subject)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium text-left ${
                  academic.favoriteSubjects.includes(subject)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-blue-300 text-gray-700'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3">
            Challenging Subjects (Select areas where you need improvement)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Mathematics',
              'Physics',
              'Chemistry',
              'Biology',
              'English',
              'History',
              'Geography',
              'Economics',
              'Computer Science',
              'Physical Education',
              'Art',
              'Music',
              'Social Science',
              'Civics',
              'Hindi/Regional Language'
            ].map(subject => (
              <button
                key={subject}
                onClick={() => handleMultiSelect('difficultSubjects', subject)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium text-left ${
                  academic.difficultSubjects.includes(subject)
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 hover:border-red-300 text-gray-700'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Describe Your Subject Strengths
          </label>
          <textarea
            name="subjectStrengths"
            value={academic.subjectStrengths}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            placeholder="Describe what you excel at academically. For example: Strong analytical skills in mathematics, quick grasp of scientific concepts, excellent at data interpretation, creative writing abilities, etc."
          />
        </div>
      </div>
    </div>
  );

  const renderCoreCompetencies = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
          <FaBrain className="mr-3 text-pink-600 text-2xl" />
          Core Academic Competencies
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-4">
              Mathematical & Logical Thinking
            </label>
            <div className="flex flex-col space-y-3">
              {['Weak', 'Below Average', 'Average', 'Good', 'Excellent'].map((level) => (
                <label key={level} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                  <input 
                    type="radio"
                    name="mathComfort"
                    value={level}
                    checked={academic.mathComfort === level}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-3 text-gray-700 font-medium">{level}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-4">
              Theoretical Understanding & Memorization
            </label>
            <div className="flex flex-col space-y-3">
              {['Weak', 'Below Average', 'Average', 'Good', 'Excellent'].map((level) => (
                <label key={level} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-green-50 transition">
                  <input 
                    type="radio"
                    name="theoryComfort"
                    value={level}
                    checked={academic.theoryComfort === level}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="ml-3 text-gray-700 font-medium">{level}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-4">
              Practical Application & Hands-on Work
            </label>
            <div className="flex flex-col space-y-3">
              {['Weak', 'Below Average', 'Average', 'Good', 'Excellent'].map((level) => (
                <label key={level} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-yellow-50 transition">
                  <input 
                    type="radio"
                    name="practicalComfort"
                    value={level}
                    checked={academic.practicalComfort === level}
                    onChange={handleChange}
                    className="w-4 h-4 text-yellow-600"
                  />
                  <span className="ml-3 text-gray-700 font-medium">{level}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-4">
              Analytical & Critical Thinking
            </label>
            <div className="flex flex-col space-y-3">
              {['Weak', 'Below Average', 'Average', 'Good', 'Excellent'].map((level) => (
                <label key={level} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-purple-50 transition">
                  <input 
                    type="radio"
                    name="analyticalThinking"
                    value={level}
                    checked={academic.analyticalThinking === level}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="ml-3 text-gray-700 font-medium">{level}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-4">
              Creativity & Innovation
            </label>
            <div className="flex flex-col space-y-3">
              {['Weak', 'Below Average', 'Average', 'Good', 'Excellent'].map((level) => (
                <label key={level} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-pink-50 transition">
                  <input 
                    type="radio"
                    name="creativityLevel"
                    value={level}
                    checked={academic.creativityLevel === level}
                    onChange={handleChange}
                    className="w-4 h-4 text-pink-600"
                  />
                  <span className="ml-3 text-gray-700 font-medium">{level}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const handleSubmit = () => {
    updateFormData('academic', academic);
    nextStep();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Academic Profile Assessment</h2>
        <p className="text-gray-600 text-lg">
          Complete comprehensive evaluation for personalized career guidance
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">Profile Completion</span>
          <span className="text-xl font-bold text-blue-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-3 rounded-full transition-all duration-700 ${
              progress < 40 ? 'bg-red-500' :
              progress < 70 ? 'bg-yellow-500' :
              progress < 90 ? 'bg-blue-500' : 'bg-green-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {progress < 40 && "Begin your assessment - Every detail matters"}
          {progress >= 40 && progress < 70 && "Good progress - Continue sharing information"}
          {progress >= 70 && progress < 90 && "Excellent - Your profile is taking shape"}
          {progress >= 90 && "Outstanding - Comprehensive profile completed"}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2 text-lg">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {activeTab === 'basic' && renderBasicInformation()}
        {activeTab === 'academic' && renderAcademicPerformance()}
        {activeTab === 'subjects' && renderSubjectAnalysis()}
        {activeTab === 'competencies' && renderCoreCompetencies()}
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition duration-300"
          >
            ← Previous Step
          </button>
          
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-2">
              {progress >= 60 ? 'Ready to proceed to analysis' : 'Minimum 60% completion recommended'}
            </p>
            <button
              onClick={handleSubmit}
              className={`px-8 py-3 rounded-lg font-semibold transition duration-300 ${
                progress >= 60
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-lg'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Continue to Analysis →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicStep;
