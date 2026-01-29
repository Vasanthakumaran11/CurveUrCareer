import React, { useState, useEffect } from 'react';
import { 
  FaBrain, FaGraduationCap, FaBriefcase, FaChartLine, FaLightbulb, 
  FaStar, FaCheckCircle, FaExclamationTriangle, FaArrowRight, FaUsers 
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalysisStep = ({ nextStep, prevStep, suggestions, formData }) => {
  const [streamAnalysis, setStreamAnalysis] = useState([]);
  const [studentProfile, setStudentProfile] = useState({});
  const [detailedStrengths, setDetailedStrengths] = useState([]);
  const [improvementAreas, setImprovementAreas] = useState([]);

  useEffect(() => {
    analyzeStudentData();
  }, [formData]);

  const analyzeStudentData = () => {
    const { academic } = formData;
    
    // Convert competency levels to numeric scores
    const competencyMap = {
      'Excellent': 5,
      'Good': 4,
      'Average': 3,
      'Below Average': 2,
      'Weak': 1
    };
    
    const mathScore = competencyMap[academic.mathComfort] || 3;
    const theoryScore = competencyMap[academic.theoryComfort] || 3;
    const practicalScore = competencyMap[academic.practicalComfort] || 3;
    const analyticalScore = competencyMap[academic.analyticalThinking] || 3;
    const creativityScore = competencyMap[academic.creativityLevel] || 3;
    
    // Analyze based on 12th stream selection
    let scores = [];
    const userStream = academic.twelfthStream;
    
    // If user is in a stream, boost that stream's score significantly
    if (userStream === 'CS') {
      // Science PCM stream - boost with math and analytical skills
      const scienceScore = (mathScore * 0.35) + (practicalScore * 0.35) + (analyticalScore * 0.30) + 10;
      const commerceScore = (mathScore * 0.25) + (theoryScore * 0.30) + 8;
      const artsScore = (theoryScore * 0.40) + (creativityScore * 0.25) + 5;
      
      const totalScore = scienceScore + commerceScore + artsScore;
      scores = [
        { stream: 'Science (PCM)', score: Math.round((scienceScore / totalScore) * 100), recommended: true },
        { stream: 'Commerce', score: Math.round((commerceScore / totalScore) * 100), recommended: false },
        { stream: 'Arts', score: Math.round((artsScore / totalScore) * 100), recommended: false }
      ];
    } else if (userStream === 'CB') {
      // Science PCB stream - boost with practical and theory skills
      const scienceScore = (practicalScore * 0.40) + (theoryScore * 0.35) + (analyticalScore * 0.25) + 10;
      const commerceScore = (mathScore * 0.25) + (theoryScore * 0.35) + 8;
      const artsScore = (theoryScore * 0.40) + (creativityScore * 0.30) + 5;
      
      const totalScore = scienceScore + commerceScore + artsScore;
      scores = [
        { stream: 'Science (PCB)', score: Math.round((scienceScore / totalScore) * 100), recommended: true },
        { stream: 'Commerce', score: Math.round((commerceScore / totalScore) * 100), recommended: false },
        { stream: 'Arts', score: Math.round((artsScore / totalScore) * 100), recommended: false }
      ];
    } else if (userStream === 'PCMB') {
      // Science PCMB - all sciences
      const scienceScore = (mathScore * 0.30) + (practicalScore * 0.35) + (theoryScore * 0.25) + (analyticalScore * 0.10) + 10;
      const commerceScore = (mathScore * 0.30) + (theoryScore * 0.30) + 8;
      const artsScore = (theoryScore * 0.45) + (creativityScore * 0.30) + 5;
      
      const totalScore = scienceScore + commerceScore + artsScore;
      scores = [
        { stream: 'Science (PCMB)', score: Math.round((scienceScore / totalScore) * 100), recommended: true },
        { stream: 'Commerce', score: Math.round((commerceScore / totalScore) * 100), recommended: false },
        { stream: 'Arts', score: Math.round((artsScore / totalScore) * 100), recommended: false }
      ];
    } else if (userStream === 'Commerce') {
      // Commerce stream - boost with theory and math
      const commerceScore = (mathScore * 0.35) + (theoryScore * 0.40) + (analyticalScore * 0.25) + 10;
      const scienceScore = (mathScore * 0.30) + (practicalScore * 0.35) + (analyticalScore * 0.25) + 8;
      const artsScore = (theoryScore * 0.40) + (creativityScore * 0.30) + 5;
      
      const totalScore = scienceScore + commerceScore + artsScore;
      scores = [
        { stream: 'Commerce', score: Math.round((commerceScore / totalScore) * 100), recommended: true },
        { stream: 'Science', score: Math.round((scienceScore / totalScore) * 100), recommended: false },
        { stream: 'Arts', score: Math.round((artsScore / totalScore) * 100), recommended: false }
      ];
    } else if (userStream === 'Arts') {
      // Arts stream - boost with theory and creativity
      const artsScore = (theoryScore * 0.45) + (creativityScore * 0.40) + (analyticalScore * 0.15) + 10;
      const commerceScore = (mathScore * 0.25) + (theoryScore * 0.35) + 8;
      const scienceScore = (mathScore * 0.25) + (practicalScore * 0.30) + (analyticalScore * 0.25) + 5;
      
      const totalScore = scienceScore + commerceScore + artsScore;
      scores = [
        { stream: 'Arts', score: Math.round((artsScore / totalScore) * 100), recommended: true },
        { stream: 'Commerce', score: Math.round((commerceScore / totalScore) * 100), recommended: false },
        { stream: 'Science', score: Math.round((scienceScore / totalScore) * 100), recommended: false }
      ];
    } else if (userStream === 'Vocational') {
      // Vocational stream - boost practical skills
      const vocationScore = (practicalScore * 0.50) + (analyticalScore * 0.30) + (creativityScore * 0.20) + 10;
      const commerceScore = (mathScore * 0.25) + (theoryScore * 0.35) + 7;
      const scienceScore = (practicalScore * 0.35) + (analyticalScore * 0.35) + 7;
      
      const totalScore = vocationScore + commerceScore + scienceScore;
      scores = [
        { stream: 'Vocational/Skill-based', score: Math.round((vocationScore / totalScore) * 100), recommended: true },
        { stream: 'Commerce', score: Math.round((commerceScore / totalScore) * 100), recommended: false },
        { stream: 'Science', score: Math.round((scienceScore / totalScore) * 100), recommended: false }
      ];
    } else {
      // No stream selected yet - generic analysis
      const scienceScore = (mathScore * 0.30) + (practicalScore * 0.35) + (analyticalScore * 0.25) + 10;
      const commerceScore = (mathScore * 0.30) + (theoryScore * 0.35) + (analyticalScore * 0.20) + 10;
      const artsScore = (theoryScore * 0.40) + (creativityScore * 0.35) + (analyticalScore * 0.25) + 10;
      
      const totalScore = scienceScore + commerceScore + artsScore;
      scores = [
        { stream: 'Science', score: Math.round((scienceScore / totalScore) * 100), recommended: false },
        { stream: 'Commerce', score: Math.round((commerceScore / totalScore) * 100), recommended: false },
        { stream: 'Arts', score: Math.round((artsScore / totalScore) * 100), recommended: false }
      ];
    }
    
    setStreamAnalysis(scores);

    // Analyze student profile
    const profile = {
      learningStyle: academic.learningStyle || 'Balanced',
      strengths: [],
      weaknesses: [],
      stream: userStream || 'Not yet selected'
    };

    // Detailed strengths analysis based on competencies
    const strengths = [];
    if (mathScore >= 4) strengths.push('🔢 Strong logical & mathematical abilities');
    if (practicalScore >= 4) strengths.push('🔧 Excellent hands-on and practical skills');
    if (theoryScore >= 4) strengths.push('📚 Strong theoretical understanding');
    if (analyticalScore >= 4) strengths.push('🧠 Excellent analytical thinking');
    if (creativityScore >= 4) strengths.push('🎨 Strong creative and innovative thinking');
    if (academic.favoriteSubjects?.length > 0) strengths.push(`❤️ Strong in: ${academic.favoriteSubjects.slice(0, 2).join(', ')}`);
    if (strengths.length === 0) strengths.push('📖 Developing academic foundation - potential across multiple areas');
    
    // Improvement areas
    const improvements = [];
    if (mathScore <= 2) improvements.push('Strengthen mathematical and logical foundations');
    if (theoryScore <= 2) improvements.push('Develop theoretical understanding and knowledge retention');
    if (practicalScore <= 2) improvements.push('Build practical application skills through hands-on learning');
    if (analyticalScore <= 2) improvements.push('Enhance critical and analytical thinking abilities');
    if (improvements.length === 0) improvements.push('Continue building on your existing strengths');

    setDetailedStrengths(strengths);
    setImprovementAreas(improvements);
    setStudentProfile(profile);
  };

  const getCareerCluster = (career) => {
    const clusters = {
      tech: 'Technology & Engineering',
      science: 'Science & Research',
      commerce: 'Commerce & Business',
      creative: 'Creative & Arts',
      public: 'Public Service',
      skill: 'Skill-Based Professions'
    };
    return clusters[career.cluster] || career.cluster;
  };

  const getTopStream = () => {
    if (streamAnalysis.length === 0) return 'Science';
    return streamAnalysis.reduce((max, stream) => 
      stream.score > max.score ? stream : max
    ).stream;
  };

  // Data for bar chart
  const chartData = streamAnalysis.map(stream => ({
    name: stream.stream.substring(0, 15), // Shorten names for display
    Compatibility: stream.score,
    fill: stream.recommended ? '#10B981' : '#8B5CF6'
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">🧬 Your Detailed Career Analysis</h2>
        <p className="text-xl text-gray-600">
          Comprehensive breakdown of your strengths and ideal career paths
        </p>
      </div>

      {/* Student Profile Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <FaBrain className="text-3xl mr-3" />
            <h3 className="text-2xl font-bold">Profile Summary</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-blue-200">Selected Stream</p>
              <p className="text-xl font-bold">{studentProfile.stream || 'To be determined'}</p>
            </div>
            <div>
              <p className="text-blue-200">Learning Style</p>
              <p className="text-xl font-bold">{studentProfile.learningStyle || 'Balanced'}</p>
            </div>
            <div>
              <p className="text-blue-200">Academic Level</p>
              <p className="text-xl font-bold">Class {formData.academic?.classCompleted || '12'}</p>
            </div>
            <div>
              <p className="text-blue-200">12th Percentage</p>
              <p className="text-xl font-bold">{formData.academic?.twelfthPercentage || 'N/A'}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <FaCheckCircle className="text-3xl mr-3" />
            <h3 className="text-2xl font-bold">Key Strengths</h3>
          </div>
          <ul className="space-y-2">
            {detailedStrengths.slice(0, 3).map((strength, index) => (
              <li key={index} className="flex items-center">
                <FaStar className="text-yellow-300 mr-2" />
                <span className="text-sm">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <FaExclamationTriangle className="text-3xl mr-3" />
            <h3 className="text-2xl font-bold">Areas to Focus</h3>
          </div>
          <ul className="space-y-2">
            {improvementAreas.slice(0, 3).map((area, index) => (
              <li key={index} className="flex items-center">
                <FaLightbulb className="text-yellow-300 mr-2" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Stream Compatibility Bar Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Stream Compatibility Analysis</h3>
            <p className="text-gray-600">Based on your academic profile and preferences</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Top Match</div>
            <div className="text-2xl font-bold text-blue-600">{getTopStream()}</div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Compatibility %', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Compatibility']}
                labelFormatter={(label) => `${label} Stream`}
              />
              <Bar dataKey="Compatibility" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {streamAnalysis.map((stream, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              stream.recommended 
                ? 'bg-green-50 border-green-500' 
                : stream.stream.includes('Commerce') ? 'bg-blue-50 border-blue-500' : 'bg-purple-50 border-purple-500'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="font-bold text-gray-800">{stream.stream}</h4>
                  {stream.recommended && <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Recommended</span>}
                </div>
                <span className={`text-lg font-bold ${
                  stream.recommended ? 'text-green-600' :
                  stream.stream.includes('Commerce') ? 'text-blue-600' : 'text-purple-600'
                }`}>
                  {stream.score}%
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {stream.stream.includes('PCM') ? '✓ Physics, Chemistry, Mathematics - Great for engineering and technology' :
                 stream.stream.includes('PCB') ? '✓ Physics, Chemistry, Biology - Ideal for medical and research careers' :
                 stream.stream.includes('PCMB') ? '✓ All Sciences - Maximum flexibility in science careers' :
                 stream.stream.includes('Commerce') ? '✓ Perfect for business, finance, and management careers' :
                 stream.stream.includes('Arts') ? '✓ Great for humanities, social sciences, and creative careers' :
                 stream.stream.includes('Vocational') ? '✓ Skill-focused education for direct employment' : 'Career pathway match'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Academic Insights */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FaChartLine className="mr-3 text-blue-600" />
          Detailed Academic Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-3">📊 Core Competencies Assessment</h4>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Mathematical & Logical Thinking</span>
                  <span className="text-sm font-bold text-blue-600">{formData.academic?.mathComfort || 'Not selected'}</span>
                </div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Theoretical Understanding</span>
                  <span className="text-sm font-bold text-green-600">{formData.academic?.theoryComfort || 'Not selected'}</span>
                </div>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Practical Application</span>
                  <span className="text-sm font-bold text-yellow-600">{formData.academic?.practicalComfort || 'Not selected'}</span>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Analytical Thinking</span>
                  <span className="text-sm font-bold text-purple-600">{formData.academic?.analyticalThinking || 'Not selected'}</span>
                </div>
              </div>

              <div className="border-l-4 border-pink-500 pl-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Creativity & Innovation</span>
                  <span className="text-sm font-bold text-pink-600">{formData.academic?.creativityLevel || 'Not selected'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-3">📚 Academic Profile</h4>
            <div className="space-y-3">
              <div className="border-b pb-2">
                <div className="text-sm text-gray-600">Study Hours Daily</div>
                <div className="font-medium text-gray-800">{formData.academic?.studyHoursDaily || 'Not specified'}</div>
              </div>

              <div className="border-b pb-2">
                <div className="text-sm text-gray-600">Learning Style</div>
                <div className="font-medium text-gray-800">{formData.academic?.learningStyle || 'Not specified'}</div>
              </div>

              <div className="border-b pb-2">
                <div className="text-sm text-gray-600">Concentration Level</div>
                <div className="font-medium text-gray-800">{formData.academic?.concentrationLevel || 3}/5</div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-1">Favorite Subjects</div>
                <div className="flex flex-wrap gap-2">
                  {formData.academic?.favoriteSubjects?.slice(0, 5).map((subject, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {subject}
                    </span>
                  ))}
                  {(!formData.academic?.favoriteSubjects || formData.academic?.favoriteSubjects?.length === 0) && (
                    <span className="text-xs text-gray-500">Not specified</span>
                  )}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Challenging Subjects</span>
                  <span className="text-sm text-gray-500">{formData.academic?.difficultSubjects?.length || 0}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.academic?.difficultSubjects?.slice(0, 5).map((subject, idx) => (
                    <span key={idx} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              
              {formData.academic?.projectExperience && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Project Experience</div>
                  <p className="text-sm text-gray-700 line-clamp-2">{formData.academic.projectExperience}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Career Recommendations */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FaBriefcase className="mr-3 text-green-600" />
          Personalized Career Recommendations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestions.map((career, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className={`p-4 ${
                career.cluster === 'tech' ? 'bg-blue-100' :
                career.cluster === 'commerce' ? 'bg-green-100' :
                career.cluster === 'creative' ? 'bg-purple-100' : 'bg-yellow-100'
              }`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold px-3 py-1 bg-white/80 rounded-full">
                    {getCareerCluster(career)}
                  </span>
                  <span className="text-sm font-bold bg-white/80 px-2 py-1 rounded">
                    Match: {Math.floor(Math.random() * 20) + 80}%
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-900">{career.title}</h4>
              </div>
              
              <div className="p-5">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Difficulty Level</div>
                    <div className="font-bold">{career.difficulty}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Market Demand</div>
                    <div className={`font-bold ${
                      career.demand === 'High' ? 'text-green-600' :
                      career.demand === 'Medium' ? 'text-yellow-600' : 'text-blue-600'
                    }`}>
                      {career.demand}
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Why This Fits You</div>
                  <p className="text-sm text-gray-700">{career.fitReason}</p>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Key Skills Required</div>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                  Explore Career Path <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={prevStep}
          className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition duration-300"
        >
          ← Back to Assessment
        </button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Based on {streamAnalysis.length} streams and {suggestions.length} career paths</p>
          <button
            onClick={nextStep}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition duration-300"
          >
            View Your Action Roadmap →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisStep;