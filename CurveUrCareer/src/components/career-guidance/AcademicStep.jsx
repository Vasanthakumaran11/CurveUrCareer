import React, { useState, useEffect } from 'react';
import { FaCalculator, FaBook, FaFlask, FaChartLine, FaLightbulb, FaUserGraduate, FaExclamationCircle } from 'react-icons/fa';

const AcademicStep = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [academic, setAcademic] = useState({
    board: formData.board || '',
    stream: formData.stream || '',
    classCompleted: formData.classCompleted || '',
    subjects: formData.subjects || [],
    strengths: formData.strengths || '',
    weaknesses: formData.weaknesses || '',
    mathComfort: formData.mathComfort || 3,
    theoryComfort: formData.theoryComfort || 3,
    practicalComfort: formData.practicalComfort || 3,
    overallPerformance: formData.overallPerformance || '',
    tenthPercentage: formData.tenthPercentage || '',
    twelfthPercentage: formData.twelfthPercentage || '',
    favoriteSubjects: formData.favoriteSubjects || [],
    difficultSubjects: formData.difficultSubjects || [],
    projectExperience: formData.projectExperience || '',
    olympiadsCompeted: formData.olympiadsCompeted || [],
    studyHoursDaily: formData.studyHoursDaily || '',
    learningEnvironment: formData.learningEnvironment || ''
  });

  const [calculatedStreamScores, setCalculatedStreamScores] = useState({
    science: 0,
    commerce: 0,
    arts: 0
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    calculateStreamScores();
  }, [academic]);

  // Validation rules - Removed for simpler workflow
  const validateForm = () => {
    return {};
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcademic(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubjectToggle = (subject, category) => {
    setAcademic(prev => ({
      ...prev,
      [category]: prev[category].includes(subject)
        ? prev[category].filter(s => s !== subject)
        : [...prev[category], subject]
    }));
    
    // Clear validation error for favoriteSubjects
    if (category === 'favoriteSubjects' && validationErrors.favoriteSubjects) {
      setValidationErrors(prev => ({
        ...prev,
        favoriteSubjects: null
      }));
    }
  };

  const handleArrayInput = (name, value) => {
    setAcademic(prev => ({
      ...prev,
      [name]: value.split(',').map(item => item.trim()).filter(item => item)
    }));
    
    // Clear validation error
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const calculateStreamScores = () => {
    let scienceScore = 0;
    let commerceScore = 0;
    let artsScore = 0;

    // Score based on comfort levels
    scienceScore += academic.mathComfort * 20;
    scienceScore += academic.practicalComfort * 15;
    commerceScore += academic.mathComfort * 15;
    commerceScore += academic.theoryComfort * 20;
    artsScore += academic.theoryComfort * 25;

    // Score based on subjects
    const scienceSubjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science'];
    const commerceSubjects = ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'Statistics'];
    const artsSubjects = ['History', 'Political Science', 'Geography', 'Psychology', 'Sociology', 'English'];

    academic.favoriteSubjects.forEach(subject => {
      if (scienceSubjects.includes(subject)) scienceScore += 25;
      if (commerceSubjects.includes(subject)) commerceScore += 25;
      if (artsSubjects.includes(subject)) artsScore += 25;
    });

    // Adjust based on percentages if available
    if (academic.twelfthPercentage) {
      const percent = parseFloat(academic.twelfthPercentage);
      if (academic.stream === 'Science' && percent > 75) scienceScore += 30;
      if (academic.stream === 'Commerce' && percent > 75) commerceScore += 30;
      if (academic.stream === 'Arts' && percent > 75) artsScore += 30;
    }

    setCalculatedStreamScores({
      science: Math.min(100, scienceScore),
      commerce: Math.min(100, commerceScore),
      arts: Math.min(100, artsScore)
    });
  };

  const handleSubmit = () => {
    // Update form data and proceed to next step
    updateFormData('academic', academic);
    nextStep();
  };

  const subjects = {
    Science: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science'],
    Commerce: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'Statistics'],
    Arts: ['History', 'Political Science', 'Geography', 'Psychology', 'Sociology', 'English']
  };

  const allSubjects = [...subjects.Science, ...subjects.Commerce, ...subjects.Arts];

  const InputError = ({ field }) => {
    if (!validationErrors[field] || !showValidation) return null;
    
    return (
      <div className="mt-1 flex items-center text-red-600 text-sm">
        <FaExclamationCircle className="mr-1" />
        {validationErrors[field]}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">📚 Academic Profile Analysis</h2>
        <p className="text-gray-600">Please fill all required fields to get accurate career suggestions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaUserGraduate className="mr-2 text-blue-600" />
              Basic Information <span className="text-red-500 ml-1">*</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Class Completed <span className="text-red-500">*</span>
                </label>
                <select 
                  name="classCompleted"
                  value={academic.classCompleted}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.classCompleted && showValidation 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Class</option>
                  <option value="10">10th</option>
                  <option value="12">12th</option>
                  <option value="college">College Student</option>
                </select>
                <InputError field="classCompleted" />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Education Board <span className="text-red-500">*</span>
                </label>
                <select 
                  name="board"
                  value={academic.board}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.board && showValidation 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Board</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="State Board">State Board</option>
                  <option value="IB">International Baccalaureate</option>
                  <option value="IGCSE">IGCSE</option>
                </select>
                <InputError field="board" />
              </div>
            </div>

            {academic.classCompleted === '12' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Stream (12th) <span className="text-red-500">*</span>
                  </label>
                  <select 
                    name="stream"
                    value={academic.stream}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      validationErrors.stream && showValidation 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Stream</option>
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts/Humanities</option>
                    <option value="Vocational">Vocational</option>
                  </select>
                  <InputError field="stream" />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    12th Percentage/CGPA <span className="text-red-500">*</span>
                    {academic.stream && <span className="text-sm text-gray-500 ml-2">({academic.stream} stream)</span>}
                  </label>
                  <input
                    type="number"
                    name="twelfthPercentage"
                    value={academic.twelfthPercentage}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      validationErrors.twelfthPercentage && showValidation 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                    placeholder="Enter percentage"
                    min="0"
                    max="100"
                    step="0.01"
                  />
                  <InputError field="twelfthPercentage" />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  10th Percentage/CGPA <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="tenthPercentage"
                  value={academic.tenthPercentage}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.tenthPercentage && showValidation 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter percentage"
                  min="0"
                  max="100"
                  step="0.01"
                />
                <InputError field="tenthPercentage" />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Daily Study Hours <span className="text-red-500">*</span>
                </label>
                <select 
                  name="studyHoursDaily"
                  value={academic.studyHoursDaily}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.studyHoursDaily && showValidation 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Study Hours</option>
                  <option value="1-2">1-2 hours</option>
                  <option value="2-3">2-3 hours</option>
                  <option value="3-4">3-4 hours</option>
                  <option value="4+">4+ hours</option>
                  <option value="varies">Varies a lot</option>
                </select>
                <InputError field="studyHoursDaily" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Overall Academic Performance <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Below Average', 'Average', 'Above Average'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setAcademic(prev => ({ ...prev, overallPerformance: level }))}
                    className={`px-4 py-3 rounded-lg border transition duration-300 ${
                      academic.overallPerformance === level
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:bg-gray-50'
                    } ${validationErrors.overallPerformance && showValidation ? 'border-red-500' : ''}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <InputError field="overallPerformance" />
            </div>
          </div>

          {/* Subject Analysis */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaBook className="mr-2 text-green-600" />
              Subject Analysis <span className="text-red-500 ml-1">*</span>
            </h3>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-3">
                Favorite Subjects <span className="text-red-500">*</span>
                <span className="text-sm text-gray-500 ml-2">(Comma separated or select from below)</span>
              </label>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  value={academic.favoriteSubjects.join(', ')}
                  onChange={(e) => handleArrayInput('favoriteSubjects', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.favoriteSubjects && showValidation 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300'
                  }`}
                  placeholder="e.g., Mathematics, Physics, Computer Science"
                />
                <InputError field="favoriteSubjects" />
                
                <div className="flex flex-wrap gap-2">
                  {allSubjects.slice(0, 8).map(subject => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => handleSubjectToggle(subject, 'favoriteSubjects')}
                      className={`px-3 py-1 rounded-full transition duration-300 text-sm ${
                        academic.favoriteSubjects.includes(subject)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-3">
                Subjects You Find Difficult
                <span className="text-sm text-gray-500 ml-2">(Optional, but helpful)</span>
              </label>
              <input
                type="text"
                value={academic.difficultSubjects.join(', ')}
                onChange={(e) => handleArrayInput('difficultSubjects', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Chemistry, Accountancy, History"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-3">
                Project/Research Experience
                <span className="text-sm text-gray-500 ml-2">(Optional)</span>
              </label>
              <textarea
                name="projectExperience"
                value={academic.projectExperience}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Describe any projects, research, or practical work you've done..."
              />
            </div>
          </div>
        </div>

        {/* Right Column - Comfort Levels & Strengths */}
        <div>
          {/* Comfort Levels */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaChartLine className="mr-2 text-purple-600" />
              Comfort Analysis <span className="text-red-500 ml-1">*</span>
            </h3>

            {[
              { name: 'mathComfort', label: 'Mathematics & Logic', icon: <FaCalculator />, color: 'bg-blue-500' },
              { name: 'theoryComfort', label: 'Theory & Memorization', icon: <FaBook />, color: 'bg-green-500' },
              { name: 'practicalComfort', label: 'Practical & Hands-on', icon: <FaFlask />, color: 'bg-yellow-500' }
            ].map((item) => (
              <div key={item.name} className="mb-6">
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </label>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500 text-sm w-12">Low</span>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    name={item.name}
                    value={academic[item.name]}
                    onChange={handleChange}
                    className="w-full"
                  />
                  <span className="text-gray-500 text-sm w-12">High</span>
                  <span className="font-bold text-blue-600 w-8 text-center">{academic[item.name]}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 - Struggles</span>
                  <span>3 - Neutral</span>
                  <span>5 - Excels</span>
                </div>
              </div>
            ))}
          </div>

          {/* Strengths & Weaknesses */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaLightbulb className="mr-2 text-yellow-500" />
              Self-Assessment <span className="text-red-500 ml-1">*</span>
            </h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Academic Strengths <span className="text-red-500">*</span>
              </label>
              <textarea
                name="strengths"
                value={academic.strengths}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.strengths && showValidation 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300'
                }`}
                rows="3"
                placeholder="What are you naturally good at? (e.g., problem-solving, analysis, creativity)"
              />
              <InputError field="strengths" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Areas for Improvement
                <span className="text-sm text-gray-500 ml-2">(Optional)</span>
              </label>
              <textarea
                name="weaknesses"
                value={academic.weaknesses}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="What challenges you academically?"
              />
            </div>
          </div>
        </div>
      </div>

      

      {/* Completion Status */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
              Object.keys(validationErrors).length === 0 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-300 text-gray-600'
            }`}>
              {Object.keys(validationErrors).length === 0 ? '✓' : '?'}
            </div>
            <span className="font-medium">Form Completion Status</span>
          </div>
          <span className="text-sm font-bold">
            {((1 - Object.keys(validationErrors).length / 9) * 100).toFixed(0)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(1 - Object.keys(validationErrors).length / 9) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {Object.keys(validationErrors).length === 0 
            ? "✓ All required fields are completed. You can proceed to the next step."
            : `⚠ ${Object.keys(validationErrors).length} required field(s) need to be completed.`
          }
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition duration-300 flex items-center"
        >
          ← Back to Welcome
        </button>
        
        <div className="flex flex-col items-end">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition duration-300 flex items-center"
          >
            Continue to Analysis Stream →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademicStep;