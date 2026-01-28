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
    coreCompetencies: formData.coreCompetencies || []
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

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
          <FaClipboardList className="mr-3 text-purple-600 text-2xl" />
          Competitions & Achievements
        </h3>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3">
            Competition Participation (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Mathematics Olympiad', 'Science Olympiad', 'Computing/Coding Competitions',
              'Quiz Competitions', 'Debate/MUN', 'Essay Writing',
              'Science Fair', 'Art Competitions', 'Sports Events',
              'Business Plan Competitions', 'Hackathons', 'Robotics Competitions',
              'National Talent Search', 'KVPY', 'NTSE', 'None'
            ].map(competition => (
              <button
                key={competition}
                onClick={() => handleMultiSelect('competitionParticipation', competition)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium text-left ${
                  academic.competitionParticipation.includes(competition)
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-300 hover:border-purple-300 text-gray-700'
                }`}
              >
                {competition}
              </button>
            ))}
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

        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-4">
            Favorite Subjects <span className="text-red-500">*</span>
            <span className="text-sm font-normal text-gray-500 ml-2">(Select at least 3)</span>
          </label>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-blue-700 mb-3 text-sm uppercase tracking-wide">Science Subjects</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'Environmental Science', 'Biotechnology', 'Electronics'].map(subject => (
                  <button
                    key={subject}
                    onClick={() => handleMultiSelect('favoriteSubjects', subject)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
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

            <div>
              <h4 className="font-semibold text-green-700 mb-3 text-sm uppercase tracking-wide">Commerce Subjects</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Accountancy', 'Business Studies', 'Economics', 'Statistics', 'Entrepreneurship', 'Financial Markets', 'Banking', 'Taxation'].map(subject => (
                  <button
                    key={subject}
                    onClick={() => handleMultiSelect('favoriteSubjects', subject)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                      academic.favoriteSubjects.includes(subject)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-green-300 text-gray-700'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-purple-700 mb-3 text-sm uppercase tracking-wide">Arts & Humanities</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['History', 'Political Science', 'Geography', 'Psychology', 'Sociology', 'Philosophy', 'English Literature', 'Languages', 'Journalism', 'Fine Arts'].map(subject => (
                  <button
                    key={subject}
                    onClick={() => handleMultiSelect('favoriteSubjects', subject)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                      academic.favoriteSubjects.includes(subject)
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-300 hover:border-purple-300 text-gray-700'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-4">
            Subjects You Find Challenging
            <span className="text-sm font-normal text-gray-500 ml-2">(Optional but recommended)</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Accountancy', 'Economics', 'Statistics', 'Languages', 'History', 'Theory-Heavy Subjects', 'Calculation-Based Subjects', 'None'].map(subject => (
              <button
                key={subject}
                onClick={() => handleMultiSelect('difficultSubjects', subject)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                  academic.difficultSubjects.includes(subject)
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-300 hover:border-orange-300 text-gray-700'
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
                    checked={academic.coreCompetencies.includes(`mathComfort-${level}`)}
                    onChange={() => handleMultiSelect('coreCompetencies', `mathComfort-${level}`)}
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
                    checked={academic.coreCompetencies.includes(`theoryComfort-${level}`)}
                    onChange={() => handleMultiSelect('coreCompetencies', `theoryComfort-${level}`)}
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
                    checked={academic.coreCompetencies.includes(`practicalComfort-${level}`)}
                    onChange={() => handleMultiSelect('coreCompetencies', `practicalComfort-${level}`)}
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
                    checked={academic.coreCompetencies.includes(`analyticalThinking-${level}`)}
                    onChange={() => handleMultiSelect('coreCompetencies', `analyticalThinking-${level}`)}
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
                    checked={academic.coreCompetencies.includes(`creativityLevel-${level}`)}
                    onChange={() => handleMultiSelect('coreCompetencies', `creativityLevel-${level}`)}
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

  const renderSkillsExperience = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
          <FaLaptopCode className="mr-3 text-blue-600 text-2xl" />
          Technical Skills & Knowledge
        </h3>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3">
            Technical Skills (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Programming (Python, Java, C++)',
              'Web Development',
              'Mobile App Development',
              'Data Analysis',
              'Database Management',
              'Cloud Computing',
              'Artificial Intelligence/ML',
              'Cybersecurity',
              'Digital Marketing',
              'Graphic Design',
              'Video Editing',
              'CAD/3D Modeling',
              'Data Science',
              'DevOps',
              'UI/UX Design',
              'None'
            ].map(skill => (
              <button
                key={skill}
                onClick={() => handleMultiSelect('technicalSkills', skill)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium text-left ${
                  academic.technicalSkills.includes(skill)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-blue-300 text-gray-700'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3">
            Software/Tools Proficiency
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'MS Office Suite',
              'Google Workspace',
              'Adobe Creative Suite',
              'AutoCAD',
              'MATLAB',
              'R/Python',
              'Tally',
              'SAP',
              'Statistical Software (SPSS)',
              'Video Editing Tools',
              'None'
            ].map(software => (
              <button
                key={software}
                onClick={() => handleMultiSelect('softwareKnowledge', software)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                  academic.softwareKnowledge.includes(software)
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:border-green-300 text-gray-700'
                }`}
              >
                {software}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-3">
            Language Proficiency
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'English (Fluent)',
              'English (Intermediate)',
              'Hindi',
              'Regional Language',
              'French',
              'German',
              'Spanish',
              'Mandarin',
              'Japanese',
              'Other Foreign Language'
            ].map(language => (
              <button
                key={language}
                onClick={() => handleMultiSelect('languageProficiency', language)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                  academic.languageProficiency.includes(language)
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-300 hover:border-purple-300 text-gray-700'
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
          <FaRocket className="mr-3 text-orange-600 text-2xl" />
          Practical Experience
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Projects & Research Experience
            </label>
            <textarea
              name="projectExperience"
              value={academic.projectExperience}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              rows="4"
              placeholder="Describe any academic projects, research work, science fair projects, or independent studies you have undertaken. Include brief details about the topic, your role, and outcomes."
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Certifications & Online Courses
            </label>
            <textarea
              name="certifications"
              value={academic.certifications}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              rows="3"
              placeholder="List any certifications, MOOCs, or online courses completed (e.g., Coursera, edX, NPTEL, Udemy). Include course names and platforms."
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Internship / Work Experience
            </label>
            <textarea
              name="internshipExperience"
              value={academic.internshipExperience}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              rows="3"
              placeholder="Describe any internships, part-time work, or professional experience. Include organization name, role, and key learnings."
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-3">
              Extracurricular Activities & Interests
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'Sports & Athletics',
                'Music & Performing Arts',
                'Visual Arts & Crafts',
                'Drama & Theatre',
                'Debate & Public Speaking',
                'Writing & Journalism',
                'Photography',
                'Robotics & Makers',
                'Community Service',
                'Environmental Activities',
                'Cultural Activities',
                'Student Government',
                'Coding Clubs',
                'Reading Clubs',
                'Content Creation',
                'None'
              ].map(activity => (
                <button
                  key={activity}
                  onClick={() => handleMultiSelect('extracurricularActivities', activity)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium text-left ${
                    academic.extracurricularActivities.includes(activity)
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-300 hover:border-orange-300 text-gray-700'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCareerPreferences = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
          <FaBriefcase className="mr-3 text-green-600 text-2xl" />
          Career Interests & Industry Preferences
        </h3>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3">
            Career Fields of Interest (Select all that appeal to you)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Engineering & Technology',
              'Medicine & Healthcare',
              'Business & Management',
              'Finance & Banking',
              'Law & Legal Services',
              'Education & Teaching',
              'Research & Development',
              'Arts & Design',
              'Media & Communication',
              'Government & Public Service',
              'Social Work & NGO',
              'Entrepreneurship',
              'Agriculture & Environment',
              'Aviation & Defense',
              'Hospitality & Tourism',
              'Sports & Fitness',
              'Fashion & Lifestyle',
              'Entertainment Industry'
            ].map(career => (
              <button
                key={career}
                onClick={() => handleMultiSelect('careerInterests', career)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium text-left ${
                  academic.careerInterests.includes(career)
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:border-green-300 text-gray-700'
                }`}
              >
                {career}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3">
            Industry Sectors of Interest
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Information Technology',
              'Healthcare & Pharmaceuticals',
              'Financial Services',
              'Manufacturing',
              'Consulting',
              'Education Technology',
              'E-commerce & Retail',
              'Energy & Utilities',
              'Telecommunications',
              'Automotive',
              'Aerospace',
              'Real Estate',
              'Media & Entertainment',
              'Food & Beverage',
              'Not Sure Yet'
            ].map(industry => (
              <button
                key={industry}
                onClick={() => handleMultiSelect('industryPreferences', industry)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium text-left ${
                  academic.industryPreferences.includes(industry)
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-300 hover:border-teal-300 text-gray-700'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Preferred Work Environment
            </label>
            <select 
              name="workEnvironmentPreference"
              value={academic.workEnvironmentPreference}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Preference</option>
              <option value="Corporate Office">Corporate Office Environment</option>
              <option value="Startup Culture">Startup/Dynamic Environment</option>
              <option value="Remote Work">Remote/Work from Home</option>
              <option value="Field Work">Field Work/Outdoor</option>
              <option value="Research Lab">Research Laboratory</option>
              <option value="Creative Studio">Creative Studio</option>
              <option value="Healthcare Facility">Hospital/Healthcare Facility</option>
              <option value="Educational Institution">Educational Institution</option>
              <option value="Flexible">Flexible/No Preference</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-4">
              Career Priority: Salary vs Passion
            </label>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 w-28">High Salary</span>
              <input 
                type="range" 
                min="1" 
                max="5" 
                name="salaryVsPassion"
                value={academic.salaryVsPassion}
                onChange={handleChange}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-600 w-28 text-right">Passion/Interest</span>
              <span className="font-bold text-green-600 text-lg w-12 text-center">{academic.salaryVsPassion}/5</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2 px-28">
              <span>Money Focused</span>
              <span>Balanced</span>
              <span>Passion Driven</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFutureGoals = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
          <FaRocket className="mr-3 text-red-600 text-2xl" />
          Academic & Career Goals
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Higher Education Plans
            </label>
            <select 
              name="higherEducationPlans"
              value={academic.higherEducationPlans}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select Your Plan</option>
              <option value="Undergraduate (Bachelor's)">Pursuing Undergraduate Degree (Bachelor's)</option>
              <option value="Postgraduate (Master's)">Planning for Postgraduate (Master's)</option>
              <option value="Professional Course">Professional Course (CA, CS, CFA, etc.)</option>
              <option value="Research/PhD">Research Oriented (PhD)</option>
              <option value="Diploma/Certificate">Diploma or Certificate Program</option>
              <option value="Skill Development">Short-term Skill Development</option>
              <option value="Direct Employment">Direct Employment (No Higher Studies)</option>
              <option value="Undecided">Not Yet Decided</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Preferred Study Location
              </label>
              <select 
                name="studyLocation"
                value={academic.studyLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select Location Preference</option>
                <option value="Home City">Home City/Local</option>
                <option value="Same State">Within Same State</option>
                <option value="Metro Cities">Major Metro Cities (Delhi, Mumbai, Bangalore, etc.)</option>
                <option value="Anywhere in India">Anywhere in India</option>
                <option value="Abroad">Study Abroad</option>
                <option value="Online">Online/Distance Learning</option>
                <option value="Flexible">Flexible/No Preference</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Budget Constraints for Education
              </label>
              <select 
                name="budgetConstraints"
                value={academic.budgetConstraints}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select Budget Range</option>
                <option value="Under 1 Lakh">Under 1 Lakh per year</option>
                <option value="1-3 Lakhs">1-3 Lakhs per year</option>
                <option value="3-5 Lakhs">3-5 Lakhs per year</option>
                <option value="5-10 Lakhs">5-10 Lakhs per year</option>
                <option value="Above 10 Lakhs">Above 10 Lakhs per year</option>
                <option value="Looking for Scholarships">Looking for Scholarships</option>
                <option value="Education Loan">Planning Education Loan</option>
                <option value="No Constraint">No Budget Constraint</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Short-term Goals (1-3 years)
            </label>
            <textarea
              name="shortTermGoals"
              value={academic.shortTermGoals}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              rows="4"
              placeholder="What do you want to achieve in the next 1-3 years? (e.g., Complete graduation with good grades, gain specific skills, secure internship, prepare for competitive exams, etc.)"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Long-term Career Vision (5-10 years)
            </label>
            <textarea
              name="longTermGoals"
              value={academic.longTermGoals}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              rows="4"
              placeholder="Where do you see yourself in 5-10 years? What kind of professional do you aspire to be? (e.g., Senior software engineer in a tech giant, successful entrepreneur, research scientist, doctor specializing in cardiology, etc.)"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
        <div className="flex items-start">
          <FaCheckCircle className="text-blue-600 text-3xl mr-4 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-lg text-gray-800 mb-2">Important Note</h4>
            <p className="text-gray-700 leading-relaxed">
              The information you provide will be analyzed using advanced algorithms to generate personalized career recommendations. 
              The more detailed and accurate your responses, the more precise and valuable your career guidance will be. 
              All information is confidential and used solely for creating your personalized career roadmap.
            </p>
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
