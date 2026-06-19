import { useState, useEffect } from 'react';
import { useFormData } from '../hooks/useFormData.jsx';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { 
  Download, 
  TrendingUp, 
  Award, 
  Building2, 
  Map, 
  Brain, 
  ShieldAlert, 
  Sparkles, 
  Check, 
  GraduationCap, 
  Laptop, 
  BookOpen, 
  Compass, 
  Briefcase,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { downloadPDFReport } from '../utils/pdfGenerator';
import { audioSynth } from '../utils/audioSynth';
import { Link } from 'react-router-dom';

const ResultsDashboard = () => {
  const { formData } = useFormData();
  const [results, setResults] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedGapPathway, setSelectedGapPathway] = useState('');
  const [downloading, setDownloading] = useState(false);

  // Resume Upload and Parsing States
  const [resumeText, setResumeText] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [uploadingResume, setUploadingResume] = useState(false);
  const [inputMode, setInputMode] = useState('upload'); // 'upload' or 'text'
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResumeFileName(file.name);
    setUploadError('');
    setUploadingResume(true);
    setUploadProgress(10);

    try {
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (event) => {
          setResumeText(event.target.result || '');
          setUploadProgress(100);
          setUploadingResume(false);
        };
        reader.onerror = () => {
          setUploadError('Failed to read text file.');
          setUploadingResume(false);
        };
        reader.readAsText(file);
      } else if (file.type === 'application/pdf') {
        setUploadProgress(30);
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const typedarray = new Uint8Array(event.target.result);
            setUploadProgress(50);
            
            // Load pdf.js dynamically if not available
            if (!window.pdfjsLib) {
              const script = document.createElement('script');
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
              document.head.appendChild(script);
              await new Promise((resolve) => {
                script.onload = () => resolve();
              });
            }
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
            
            const pdf = await window.pdfjsLib.getDocument({ data: typedarray }).promise;
            setUploadProgress(70);
            let text = '';
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              text += textContent.items.map(item => item.str).join(' ') + '\n';
            }
            setResumeText(text);
            setUploadProgress(100);
            setUploadingResume(false);
          } catch (err) {
            console.error(err);
            setUploadError('Failed to extract text from PDF. Try copy-pasting your text below.');
            setUploadingResume(false);
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        setUploadError('Unsupported file type. Please upload a .txt or .pdf file.');
        setUploadingResume(false);
      }
    } catch (err) {
      setUploadError('Error processing file.');
      setUploadingResume(false);
    }
  };

  const handleRunScan = () => {
    if (!resumeText.trim()) {
      setUploadError('Please upload a resume file or paste your text first!');
      return;
    }
    setUploadError('');
    setScanning(true);
    setScanProgress(0);
    setScanComplete(false);
  };

  useEffect(() => {
    let timer;
    if (scanning) {
      timer = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setScanning(false);
            setScanComplete(true);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
    return () => clearInterval(timer);
  }, [scanning]);

  // Fetch results on mount from backend if not already inside state
  useEffect(() => {
    const fetchDiscoveryResults = async () => {
      try {
        setLocalLoading(true);
        const token = localStorage.getItem('curveurcareer_token');
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5050'}/api/discover/results`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success && data.results) {
          setResults(data.results);
          // Set default selected pathway for skill gap analyzer
          const dashboardData = data.results.dashboard_data || {};
          const pathways = dashboardData.recommendedPathways || [];
          if (pathways.length > 0) {
            setSelectedGapPathway(pathways[0].name);
          } else if (data.results.recommended_pathways && data.results.recommended_pathways.length > 0) {
            setSelectedGapPathway(data.results.recommended_pathways[0]);
          }
        } else {
          setError(data.error || 'Diagnostic results not found. Please complete the self-discovery assessment.');
        }
      } catch (err) {
        console.error('Failed fetching self-discovery results:', err);
        setError('Connection failure. Please ensure the backend server is running.');
      } finally {
        setLocalLoading(false);
      }
    };

    fetchDiscoveryResults();
  }, []);

  // Synchronize active tab with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['overview', 'pathways', 'skills', 'roadmap', 'colleges'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabSwitch = (tabId) => {
    audioSynth.playTap();
    setActiveTab(tabId);
    window.history.pushState(null, '', `#${tabId}`);
  };

  const handleDownloadReport = async () => {
    if (!results) return;
    audioSynth.playSuccess();
    try {
      setDownloading(true);
      await downloadPDFReport(results);
    } catch (err) {
      console.error('PDF report compilation failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  if (localLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-slate-950 text-white font-sans">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin"></div>
          <div className="absolute inset-2 bg-slate-950 rounded-full flex items-center justify-center">
            <span className="text-xl animate-pulse text-blue-400">⚙️</span>
          </div>
        </div>
        <h3 className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-mono uppercase">
          SYNCHRONIZING CAREER INTELLIGENCE DATA
        </h3>
        <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-wide">// SIFTING WEIGHTED NEURAL DIAGNOSTICS...</p>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-slate-900 border border-red-500/30 rounded-2xl text-center shadow-lg text-white">
        <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-2xl font-black uppercase font-mono tracking-wider text-red-400">INTELLIGENCE REPORT BLOCK</h3>
        <p className="text-slate-400 font-mono text-sm mt-3 leading-relaxed">
          {error || 'No discovery records found. You must complete your "Discover Yourself" diagnostic assessment to unlock the Career Intelligence Dashboard.'}
        </p>
        <div className="mt-8">
          <Link
            to="/discover-yourself"
            className="inline-block px-8 py-4 font-black uppercase bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl transition-all shadow-lg text-sm tracking-widest font-mono"
          >
            LAUNCH DIAGNOSTICS NOW →
          </Link>
        </div>
      </div>
    );
  }

  // Parse dashboard data from backend synthesis
  const dashboardData = results.dashboard_data || {};
  const profile = results.profile || {};
  const behavior = results.behavior || {};

  const snapshot = dashboardData.identitySnapshot || {
    profileName: results.explorationType || 'Active Explorer',
    description: results.personalized_summary || 'You are an active learner who is exploring career directions.',
    traits: results.detected_patterns || ['Logical', 'Inquisitive']
  };

  const academic = dashboardData.academicInsights || {
    strongestSubjects: profile.favorite_subjects || [],
    alignmentFeedback: `Your subjects align with your stream: ${profile.academic_stream || 'General'}.`,
    streamInfo: `Stream: ${profile.academic_stream || 'General'} | Marks: ${profile.marks_range || 'N/A'}`
  };

  const skills = dashboardData.skillAnalytics || {
    logicalThinking: (behavior.logical_reasoning_score || 3) * 20,
    analyticalThinking: (behavior.analytical_score || 3) * 20,
    criticalThinking: (behavior.analytical_score || 3) * 20,
    creativity: (behavior.creativity_score || 3) * 20,
    communication: (behavior.communication_tendency || 3) * 20,
    curiosity: (behavior.curiosity_score || 3) * 20,
    problemSolving: (behavior.emotional_confidence_score || 3) * 20,
    observationSkills: (behavior.exploration_level || 3) * 20,
    decisionMaking: (behavior.analytical_score || 3) * 20,
    leadership: (behavior.communication_tendency || 3) * 20,
    adaptability: (behavior.retry_behavior_score || 3) * 20
  };

  const recommendedPathways = dashboardData.recommendedPathways || [];
  const backupPathways = dashboardData.backupPathways || [];
  const learningRecommendations = dashboardData.learningRecommendations || {
    courses: ['Python', 'MySQL', 'Problem Solving'],
    certifications: ['Google Data Analytics Certificate'],
    projects: ['Database analyzer dashboard'],
    priorities: ['Improve data structure logic']
  };
  const higherEducation = dashboardData.higherEducation || {
    recommendation: 'Master of Science (M.S.) in specialized field',
    locationPreference: 'India',
    suggestedDegrees: ['B.Tech Computer Science']
  };
  const colleges = dashboardData.colleges || {
    dream: [{ name: 'IIT Madras', location: 'Chennai', desc: 'Premier institution.' }],
    realistic: [{ name: 'VIT University', location: 'Vellore', desc: 'Good placements.' }],
    safe: [{ name: 'SRM Institute', location: 'Chennai', desc: 'Flexible options.' }]
  };
  const roadmap = dashboardData.careerRoadmap || {
    foundations: 'Strengthen core academic foundation.',
    skillDevelopment: ' neutralization of skill gaps.',
    projects: 'Build real portfolio projects.',
    internships: 'Secure early summer internships.',
    advancedLearning: 'Acquire high specialization certs.',
    careerReadiness: 'Prepare placement materials.'
  };

  const radarData = [
    { name: 'LOGICAL', score: skills.logicalThinking },
    { name: 'ANALYTICAL', score: skills.analyticalThinking },
    { name: 'CRITICAL', score: skills.criticalThinking },
    { name: 'CREATIVITY', score: skills.creativity },
    { name: 'COMMUNICATION', score: skills.communication },
    { name: 'CURIOSITY', score: skills.curiosity },
    { name: 'PROBLEM SOLVING', score: skills.problemSolving }
  ];

  // Map CurveUrCareer's actual course pages to course strings
  const courseUrlMap = {
    'C': 'c-programming',
    'Java': 'java-programming',
    'Python': 'python-programming',
    'MySQL': 'mysql-basics',
    'Communication Skills': 'communication-skills',
    'Problem Solving': 'problem-solving'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 relative overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* Glowing Accents */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Futuristic Dashboard Header */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest font-black">
              <Sparkles className="w-4 h-4 animate-spin-slow" /> CAREER INTELLIGENCE PLATFORM ENGINE // READY
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-none font-mono">
              {profile.name || profile.username || 'Explorer'}<span className="text-blue-500 font-sans font-normal text-2xl md:text-3xl">.dashboard</span>
            </h1>
            <p className="text-slate-400 text-xs md:text-sm font-mono leading-relaxed">
              // ONBOARDING COMPLETE: VALIDATED MULTIDIMENSIONAL PROFILE
            </p>
          </div>
          
          <button
            onClick={handleDownloadReport}
            disabled={downloading}
            className="flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black uppercase text-sm tracking-widest rounded-xl transition-all shadow-lg active:scale-95 duration-200 shrink-0"
          >
            <Download className={`w-5 h-5 ${downloading ? 'animate-bounce' : ''}`} />
            {downloading ? 'GENERATING REPORT...' : 'DOWNLOAD MULTI-PAGE PDF'}
          </button>
        </div>

        {/* Dynamic Horizontal Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
          {[
            { id: 'overview', label: 'IDENTITY SNAPSHOT', icon: TrendingUp },
            { id: 'pathways', label: 'CAREER DIRECTIONS', icon: Award },
            { id: 'skills', label: 'SKILL GAP ANALYZER', icon: Brain },
            { id: 'roadmap', label: 'HORIZON ROADMAP', icon: Map },
            { id: 'colleges', label: 'HIGHER EDUCATION', icon: Building2 }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabSwitch(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 rounded-xl font-mono text-xs font-black uppercase tracking-widest transition-all shrink-0 duration-200 border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Archetype & Academic Insights */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Identity Snapshot Card */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-850 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden group">
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 bg-blue-900/40 text-blue-400 border border-blue-800 text-xxs font-black tracking-widest uppercase font-mono rounded">
                    DOMINANT BEHAVIORAL PROFILE
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-white font-mono uppercase tracking-tight mt-1">
                    {snapshot.profileName}
                  </h2>
                </div>

                <div className="p-6 bg-slate-950/80 border border-slate-900 rounded-2xl relative shadow-inner">
                  <div className="absolute top-2 left-2 text-[10px] text-slate-600 font-mono uppercase">COGNITIVE SUMMARY ANALYSIS</div>
                  <p className="text-slate-300 text-sm md:text-base font-medium font-mono leading-relaxed mt-4 uppercase">
                    "{snapshot.description}"
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {snapshot.traits.map(t => (
                    <span key={t} className="px-3.5 py-1.5 bg-slate-950 border border-slate-800 text-xs font-bold font-mono uppercase text-slate-300 rounded-lg">
                      🔥 {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Academic Insights */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-850 rounded-3xl p-8 shadow-lg space-y-6">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                  <h3 className="text-xl font-bold uppercase font-mono text-white tracking-wider">ACADEMIC ALIGNMENT INSIGHTS</h3>
                </div>

                <div className="p-6 bg-slate-950/50 border border-slate-900 rounded-2xl space-y-4">
                  <span className="text-xxs font-black text-slate-500 uppercase tracking-widest font-mono">EDUCATIONAL ALIGNMENT FEEDBACK</span>
                  <p className="text-slate-300 text-sm leading-relaxed font-mono uppercase">
                    {academic.alignmentFeedback}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-3">
                    <h4 className="text-xs font-black tracking-widest text-slate-500 uppercase font-mono border-b border-slate-850 pb-2">FAVORITE ACADEMIC SUBJECTS</h4>
                    <div className="flex flex-wrap gap-2">
                      {academic.strongestSubjects.map(subj => (
                        <span key={subj} className="px-3 py-1.5 bg-blue-900/30 text-blue-300 border border-blue-800/40 text-xs font-bold uppercase font-mono rounded-lg">
                          {subj}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-xs font-black tracking-widest text-slate-500 uppercase font-mono border-b border-slate-850 pb-2">STREAM DATA</h4>
                    <div className="font-mono text-xs uppercase space-y-1 text-slate-400">
                      <div>StreamSelected: <span className="font-bold text-white">{profile.academic_stream || 'General'}</span></div>
                      <div>AveragePerformance: <span className="font-bold text-blue-400">{profile.marks_range || 'N/A'}</span></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Heptagonal Skill Analytics Radar */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-850 rounded-3xl p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <h3 className="text-lg font-black font-mono text-white uppercase tracking-wider mb-2">SKILL ANALYTICS SPECTROGRAM</h3>
                <p className="text-slate-500 text-xxs font-mono uppercase leading-relaxed mb-6">// MEASURING INTERACTIVE MOMENT DATA</p>
              </div>

              <div className="w-full h-80 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 9, fontWeight: 'bold', fontFamily: 'monospace' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fontSize: 8, fill: '#64748b' }} />
                    <Radar
                      name="Cognitive Score"
                      dataKey="score"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.25}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="border-t border-slate-850 pt-4 mt-4 space-y-2 text-xxs font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>LOGICAL DECISIONS:</span>
                  <span className="font-bold text-white uppercase">LEVEL {skills.logicalThinking}%</span>
                </div>
                <div className="flex justify-between">
                  <span>PROBLEM SOLVING:</span>
                  <span className="font-bold text-blue-400 uppercase">LEVEL {skills.problemSolving}%</span>
                </div>
                <div className="flex justify-between">
                  <span>CREATIVITY COEFFICIENT:</span>
                  <span className="font-bold text-indigo-400 uppercase">LEVEL {skills.creativity}%</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: RECOMMENDED CAREERS & BACKUPS */}
        {activeTab === 'pathways' && (
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white font-mono uppercase tracking-wider">RECOMMENDED CAREER DIRECTIONS</h2>
              <p className="text-slate-500 text-xs font-mono uppercase">// PRIMARY PATHWAYS AND COMPREHENSIVE CAREER REALITY ANALYSIS</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedPathways.map((pathway, index) => {
                const isTop = index === 0;
                return (
                  <div 
                    key={pathway.name}
                    className={`bg-slate-900/40 backdrop-blur-xl border rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-lg ${
                      isTop 
                        ? 'border-blue-500/45 shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-blue-500' 
                        : 'border-slate-850 hover:border-slate-700'
                    }`}
                  >
                    {isTop && (
                      <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-xxs font-black uppercase font-mono tracking-widest rounded-bl-xl shadow-lg">
                        TOP PATHWAY
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="text-xxs font-mono text-blue-400 font-bold uppercase tracking-wider">CAREER SECTOR 0{index + 1}</span>
                        <h3 className="text-xl font-black text-white uppercase font-mono tracking-tight group-hover:text-blue-400 transition-colors">
                          {pathway.name}
                        </h3>
                        <div className="flex items-end gap-2 mt-1">
                          <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-mono">
                            {pathway.matchScore}%
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black mb-1">MATCH</span>
                        </div>
                      </div>

                      <p className="text-slate-300 text-xs leading-relaxed font-mono uppercase">
                        {pathway.description}
                      </p>

                      <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl space-y-2">
                        <span className="text-[9px] font-mono text-slate-500 font-black uppercase tracking-widest">FIT LOGIC</span>
                        <p className="text-slate-400 text-xxs leading-relaxed font-mono uppercase">
                          {pathway.matchReason}
                        </p>
                      </div>

                      {/* Career Reality Analysis Panel */}
                      <div className="border-t border-slate-850 pt-4 space-y-2.5 text-[10px] font-mono">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">CAREER REALITY ANALYSIS</span>
                        <div className="flex justify-between border-b border-slate-900 pb-1.5">
                          <span className="text-slate-400">SALARY POTENTIAL:</span>
                          <span className="text-white font-bold">{pathway.salaryPotential}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-900 pb-1.5">
                          <span className="text-slate-400">DEMAND PROFILE:</span>
                          <span className="text-blue-400 font-bold uppercase">{pathway.demand}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-900 pb-1.5">
                          <span className="text-slate-400">STABILITY INDEX:</span>
                          <span className="text-emerald-400 font-bold uppercase">{pathway.stability}</span>
                        </div>
                        <div className="flex justify-between pb-1">
                          <span className="text-slate-400">COMPETITION:</span>
                          <span className="text-orange-400 font-bold uppercase">{pathway.competition}</span>
                        </div>
                        <p className="text-slate-500 text-[9px] mt-1 italic uppercase leading-tight">{pathway.futureOpportunities}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Backup Career Pathways Panel */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-850 rounded-3xl p-8 shadow-lg space-y-6">
              <div className="flex items-center gap-3">
                <Compass className="w-8 h-8 text-indigo-400" />
                <h3 className="text-xl font-bold uppercase font-mono text-white tracking-wider">BACKUP CAREER PATHWAYS</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {backupPathways.map(backup => (
                  <div key={backup.name} className="p-6 bg-slate-950 border border-slate-900 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-200 text-sm uppercase font-mono">{backup.name}</h4>
                      <span className="text-xs font-bold text-indigo-400 font-mono">{backup.matchScore}% Fit</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed font-mono uppercase">{backup.description}</p>
                    <p className="text-slate-500 text-[10px] italic font-mono uppercase">{backup.matchReason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SKILL GAP ANALYZER */}
        {activeTab === 'skills' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white font-mono uppercase tracking-wider">SKILL GAP ANALYZER</h2>
              <p className="text-slate-500 text-xs font-mono uppercase">// UPLOAD YOUR RESUME TO GENERATE DYNAMIC GAPS & ALIGN ECOSYSTEM COURSEWARE</p>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-850 rounded-3xl p-8 shadow-2xl space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Left Panel: Target Pathway & Resume Uploader */}
                <div className="md:col-span-5 space-y-6">
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
                      [CHOOSE TARGET CAREER PROFILE]
                    </label>
                    <select
                      value={selectedGapPathway}
                      onChange={(e) => {
                        audioSynth.playTap();
                        setSelectedGapPathway(e.target.value);
                        setScanComplete(false);
                      }}
                      className="w-full bg-slate-950 border-2 border-slate-850 text-white font-mono font-bold uppercase tracking-wider px-5 py-4 focus:border-blue-500 outline-none rounded-xl cursor-pointer transition-colors"
                    >
                      {recommendedPathways.map(p => (
                        <option key={p.name} value={p.name}>{p.name}</option>
                      ))}
                      {backupPathways.map(p => (
                        <option key={p.name} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Resume Upload / Input Mode */}
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
                      Your Resume Credentials
                    </label>
                    
                    <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-850">
                      <button
                        type="button"
                        onClick={() => setInputMode('upload')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${inputMode === 'upload' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        Upload File
                      </button>
                      <button
                        type="button"
                        onClick={() => setInputMode('text')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${inputMode === 'text' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        Paste Text
                      </button>
                    </div>

                    {inputMode === 'upload' ? (
                      <div className="border border-dashed border-slate-800 rounded-xl p-4 text-center hover:border-blue-500/50 transition-colors relative cursor-pointer group">
                        <input
                          type="file"
                          accept=".txt,.pdf"
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="space-y-1">
                          <div className="text-slate-300 text-xs font-semibold group-hover:text-blue-400 transition-colors">
                            {resumeFileName ? `Selected: ${resumeFileName}` : 'Drag & Drop or Click to Upload'}
                          </div>
                          <p className="text-[10px] text-slate-500 font-mono">Supports PDF or TXT formats</p>
                        </div>
                      </div>
                    ) : (
                      <textarea
                        rows={3}
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your resume text or copy-paste your key skills here..."
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-blue-500/50 outline-none transition-colors resize-none font-semibold"
                      />
                    )}

                    {uploadingResume && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Parsing resume...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                        </div>
                      </div>
                    )}

                    {uploadError && (
                      <p className="text-xs text-red-400 font-semibold">{uploadError}</p>
                    )}
                  </div>

                  {/* Run Scan Button */}
                  <button
                    disabled={scanning || uploadingResume}
                    onClick={handleRunScan}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black uppercase text-sm tracking-widest rounded-xl transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95 duration-200"
                  >
                    {scanning ? 'Running AI Diagnostics...' : 'Launch Skill Gap Scan'}
                  </button>
                </div>

                {/* Right Panel: Scanned Output / Instructions */}
                <div className="md:col-span-7 relative border border-slate-850 bg-slate-950/40 rounded-3xl p-6 shadow-2xl min-h-[300px] flex flex-col justify-center overflow-hidden w-full">
                  {scanning && (
                    <div className="space-y-6 text-center">
                      <h4 className="text-lg font-bold text-blue-400 animate-pulse">Scanning Profile Assets...</h4>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden max-w-xs mx-auto">
                        <div className="h-full bg-blue-500" style={{ width: `${scanProgress}%` }} />
                      </div>
                      <p className="text-xs text-slate-500 font-mono">Comparing skills: {scanProgress}%</p>
                    </div>
                  )}

                  {!scanning && !scanComplete && (
                    <div className="text-center space-y-4 py-8">
                      <h4 className="text-lg font-bold text-slate-400">Ready to Scan</h4>
                      <p className="text-slate-500 text-xs max-w-xs mx-auto">
                        Upload your resume file or paste text details on the left, then click the scan trigger to perform real-time gap analysis against the selected pathway.
                      </p>
                    </div>
                  )}

                  {!scanning && scanComplete && (() => {
                    const pathwayObj = (recommendedPathways.concat(backupPathways)).find(p => p.name === selectedGapPathway);
                    const required = pathwayObj?.requiredSkills || ['Logical Thinking', 'Analytical Thinking', 'Problem Solving'];
                    const textToSearch = resumeText.toLowerCase();
                    const present = [];
                    const missing = [];

                    required.forEach(skill => {
                      let keyword = skill.toLowerCase();
                      if (keyword === 'logical thinking') keyword = 'logic';
                      else if (keyword === 'analytical thinking') keyword = 'analyt';
                      else if (keyword === 'critical thinking') keyword = 'critic';
                      else if (keyword === 'problem solving') keyword = 'problem solving';
                      
                      if (textToSearch.includes(keyword)) {
                        present.push(skill);
                      } else {
                        missing.push(skill);
                      }
                    });

                    const score = Math.max(10, Math.round((present.length / required.length) * 100));

                    return (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-900">
                          <div>
                            <h4 className="text-lg font-bold text-white uppercase">{selectedGapPathway} Gap Report</h4>
                            <p className="text-[10px] text-slate-500 font-mono">// CALCULATED REAL-TIME MATCH</p>
                          </div>
                          <div className="text-right">
                            <span className="text-3xl font-black text-blue-400">{score}%</span>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* Present */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest font-mono">Validated Strengths</span>
                            <div className="space-y-1.5">
                              {present.map(item => (
                                <div key={item} className="flex items-center gap-2 text-xxs font-bold text-emerald-300 font-mono bg-emerald-950/20 border border-emerald-900/30 p-2 rounded-lg">
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  {item}
                                </div>
                              ))}
                              {present.length === 0 && (
                                <p className="text-[10px] text-slate-500 uppercase italic">No matching strengths found</p>
                              )}
                            </div>
                          </div>

                          {/* Missing */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest font-mono">Specialized Gaps</span>
                            <div className="space-y-1.5">
                              {missing.map(item => (
                                <div key={item} className="flex items-center justify-between text-xxs font-bold text-slate-400 font-mono bg-slate-900 border border-slate-850 p-2 rounded-lg">
                                  <span>{item}</span>
                                  <span className="text-[8px] bg-orange-950/30 border border-orange-900/30 text-orange-400 px-1 rounded">GAP</span>
                                </div>
                              ))}
                              {missing.length === 0 && (
                                <p className="text-[10px] text-emerald-400 uppercase font-bold">✓ All criteria met!</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Personalized Learning Recommendations connected to Ecosystem */}
              <div className="p-6 bg-slate-950 border border-slate-900 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-black text-blue-400 uppercase tracking-widest font-mono">
                  <Laptop className="w-4 h-4" /> CURVEURCAREER INTERNAL LEARNING ECOSYSTEM
                </div>
                <p className="text-slate-400 text-xs font-mono uppercase leading-relaxed">
                  Neutralize your identified gaps immediately. The following introductory courses match your target career path requirements. Click to launch learning dashboard modules.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  {learningRecommendations.courses.map(course => {
                    const mappedId = courseUrlMap[course] || 'python-programming';
                    return (
                      <Link
                        key={course}
                        to="/learning"
                        onClick={() => audioSynth.playTap()}
                        className="p-4 bg-slate-900 border border-slate-880 hover:border-blue-500 rounded-xl flex items-center justify-between transition-all group font-mono text-xs uppercase font-bold text-white shadow-md hover:-translate-y-0.5 duration-200"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="w-4 h-4 text-blue-400 group-hover:rotate-6 transition-transform" />
                          <span>{course} Course</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Extra priorities / Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-900 text-xs font-mono uppercase">
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">RECOMMENDED CERTIFICATIONS</span>
                  <div className="space-y-2">
                    {learningRecommendations.certifications.map(cert => (
                      <div key={cert} className="p-3 bg-slate-950 border border-slate-900 text-slate-300 rounded-lg">
                        🎓 {cert}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">SUGGESTED CAPSTONE PROJECTS</span>
                  <div className="space-y-2">
                    {learningRecommendations.projects.map(proj => (
                      <div key={proj} className="p-3 bg-slate-950 border border-slate-900 text-slate-300 rounded-lg">
                        🛠️ {proj}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: HORIZON ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white font-mono uppercase tracking-wider">HORIZON ROADMAP</h2>
              <p className="text-slate-500 text-xs font-mono uppercase">// STAGED STRATEGIC DEVELOPMENT FROM FOUNDATIONS TO PLACEMENT READINESS</p>
            </div>

            <div className="relative">
              {/* Vertical Connector line */}
              <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 opacity-25"></div>

              <div className="space-y-6">
                {[
                  {
                    step: 'STAGE 01',
                    title: 'FOUNDATIONS',
                    icon: BookOpen,
                    color: 'text-blue-400',
                    bg: 'bg-blue-950/20 border-blue-900/30',
                    desc: roadmap.foundations
                  },
                  {
                    step: 'STAGE 02',
                    title: 'SKILL DEVELOPMENT',
                    icon: Laptop,
                    color: 'text-indigo-400',
                    bg: 'bg-indigo-950/20 border-indigo-900/30',
                    desc: roadmap.skillDevelopment
                  },
                  {
                    step: 'STAGE 03',
                    title: 'CAPSTONE PROJECTS',
                    icon: Brain,
                    color: 'text-purple-400',
                    bg: 'bg-purple-950/20 border-purple-900/30',
                    desc: roadmap.projects
                  },
                  {
                    step: 'STAGE 04',
                    title: 'COMPETITIVE INTERNSHIPS',
                    icon: Briefcase,
                    color: 'text-pink-400',
                    bg: 'bg-pink-950/20 border-pink-900/30',
                    desc: roadmap.internships
                  },
                  {
                    step: 'STAGE 05',
                    title: 'ADVANCED SPECIALIZATIONS',
                    icon: Award,
                    color: 'text-orange-400',
                    bg: 'bg-orange-950/20 border-orange-900/30',
                    desc: roadmap.advancedLearning
                  },
                  {
                    step: 'STAGE 06',
                    title: 'CAREER READY PLACEMENT',
                    icon: GraduationCap,
                    color: 'text-emerald-400',
                    bg: 'bg-emerald-950/20 border-emerald-900/30',
                    desc: roadmap.careerReadiness
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="relative flex gap-6 items-start group pl-4">
                      {/* Timeline dot */}
                      <div className="absolute left-8 w-8 h-8 rounded-full border border-slate-800 bg-slate-950 flex items-center justify-center transform -translate-x-[15px] z-10 group-hover:border-blue-500 transition-colors duration-200">
                        <div className="w-3.5 h-3.5 bg-slate-800 group-hover:bg-blue-500 rounded-full transition-colors"></div>
                      </div>

                      <div className={`flex-1 bg-slate-900/40 backdrop-blur-xl border rounded-3xl p-6 ml-6 space-y-2 hover:border-slate-700 transition-colors shadow-lg ${item.bg}`}>
                        <div className="flex justify-between items-center">
                          <span className={`text-[10px] font-mono font-black tracking-widest uppercase ${item.color}`}>
                            {item.step}
                          </span>
                          <Icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <h4 className="text-base font-bold text-white uppercase font-mono">{item.title}</h4>
                        <p className="text-slate-400 text-xs leading-relaxed font-mono uppercase">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TIERED COLLEGES & SUGGESTED DEGREES */}
        {activeTab === 'colleges' && (
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white font-mono uppercase tracking-wider">HIGHER EDUCATION & COLLEGES</h2>
              <p className="text-slate-500 text-xs font-mono uppercase">// TIERED DEGREE & COLLEGE HIGHLIGHTS INCORPORATING LOCATION PREFERENCES</p>
            </div>

            {/* Path Recommendation Summary */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-850 rounded-3xl p-8 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-xs font-black text-blue-400 uppercase tracking-widest font-mono">
                <GraduationCap className="w-5 h-5" /> HIGHER EDUCATION RECOMMENDATION
              </div>
              <h4 className="text-lg font-bold text-white uppercase font-mono">
                {higherEducation.recommendation}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs font-mono uppercase">
                <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl">
                  <span className="text-[10px] text-slate-500 block mb-1">STUDY GEOGRAPHIC LOCATION PREFERENCE</span>
                  <span className="font-bold text-white">{higherEducation.locationPreference}</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl">
                  <span className="text-[10px] text-slate-500 block mb-1">RECOMMENDED DEGREES</span>
                  <span className="font-bold text-white">{higherEducation.suggestedDegrees.join(' or ')}</span>
                </div>
              </div>
            </div>

            {/* Colleges tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Dream Colleges */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-6 space-y-6 shadow-lg hover:border-emerald-500/40 transition-colors">
                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 bg-emerald-950/40 text-emerald-400 border border-emerald-900/40 text-xxs font-black tracking-widest font-mono rounded">
                    🎯 DREAM TIER 1
                  </span>
                  <h3 className="text-lg font-black text-white uppercase font-mono mt-2">PREMIER INSTITUTES</h3>
                </div>
                
                <div className="space-y-4">
                  {colleges.dream.map(clg => (
                    <div key={clg.name} className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                      <h4 className="font-bold text-slate-100 text-xs uppercase font-mono leading-tight">{clg.name}</h4>
                      <span className="text-[9px] font-mono text-slate-500 uppercase">{clg.location}</span>
                      <p className="text-slate-400 text-xxs mt-1.5 font-mono uppercase leading-relaxed">{clg.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Realistic Colleges */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-6 space-y-6 shadow-lg hover:border-blue-500/40 transition-colors">
                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 bg-blue-950/40 text-blue-400 border border-blue-800 text-xxs font-black tracking-widest font-mono rounded">
                    ✅ REALISTIC TIER 2
                  </span>
                  <h3 className="text-lg font-black text-white uppercase font-mono mt-2">TARGET ALIGNMENT</h3>
                </div>
                
                <div className="space-y-4">
                  {colleges.realistic.map(clg => (
                    <div key={clg.name} className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                      <h4 className="font-bold text-slate-100 text-xs uppercase font-mono leading-tight">{clg.name}</h4>
                      <span className="text-[9px] font-mono text-slate-500 uppercase">{clg.location}</span>
                      <p className="text-slate-400 text-xxs mt-1.5 font-mono uppercase leading-relaxed">{clg.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safe Colleges */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-850 rounded-3xl p-6 space-y-6 shadow-lg hover:border-slate-700 transition-colors">
                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 bg-slate-950 text-slate-400 border border-slate-800 text-xxs font-black tracking-widest font-mono rounded">
                    🛡️ SAFE TIER 3
                  </span>
                  <h3 className="text-lg font-black text-white uppercase font-mono mt-2">STABLE ANCHORS</h3>
                </div>
                
                <div className="space-y-4">
                  {colleges.safe.map(clg => (
                    <div key={clg.name} className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                      <h4 className="font-bold text-slate-100 text-xs uppercase font-mono leading-tight">{clg.name}</h4>
                      <span className="text-[9px] font-mono text-slate-500 uppercase">{clg.location}</span>
                      <p className="text-slate-400 text-xxs mt-1.5 font-mono uppercase leading-relaxed">{clg.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResultsDashboard;
