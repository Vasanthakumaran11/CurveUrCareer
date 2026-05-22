// Premium Dark Futuristic Career Intelligence Dashboard
import { useState, useEffect } from 'react';
import { useFormData } from '../hooks/useFormData.jsx';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Award, Building2, Map, Brain, ShieldAlert, Sparkles, Check, GraduationCap, Laptop, BookOpen } from 'lucide-react';
import { downloadPDFReport } from '../utils/pdfGenerator';
import { audioSynth } from '../utils/audioSynth';

const ResultsDashboard = () => {
  const { formData } = useFormData();
  const [results, setResults] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedGapPathway, setSelectedGapPathway] = useState('');
  const [downloading, setDownloading] = useState(false);

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
          if (data.results.recommended_pathways && data.results.recommended_pathways.length > 0) {
            setSelectedGapPathway(data.results.recommended_pathways[0].name);
          }
        } else {
          setError(data.error || 'Diagnostic results not found. Make sure you complete the self-discovery test.');
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
      <div className="max-w-xl mx-auto my-12 p-8 bg-slate-900 border-2 border-red-500/30 rounded-2xl text-center shadow-[0_0_50px_rgba(239,68,68,0.1)] text-white">
        <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-2xl font-black uppercase font-mono tracking-wider text-red-400">INTELLIGENCE REPORT BLOCK</h3>
        <p className="text-slate-400 font-mono text-sm mt-3 leading-relaxed">
          {error || 'No discovery records found. You must complete your "Discover Yourself" diagnostic assessment to unlock the Career Intelligence Dashboard.'}
        </p>
        <div className="mt-8">
          <a
            href="/discover-yourself"
            className="inline-block px-8 py-4 font-black uppercase bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-xl transition-all shadow-lg hover:shadow-red-500/20 text-sm tracking-widest font-mono"
          >
            LAUNCH DIAGNOSTICS NOW →
          </a>
        </div>
      </div>
    );
  }

  const {
    profile = {},
    behavior = {},
    top_strengths = [],
    recommended_pathways = [],
    skill_gaps = [],
    personalized_summary = ''
  } = results;

  // Render variables mapping
  const stream = profile.academic_stream || 'General';
  const subjects = profile.favorite_subjects || [];
  const marks = profile.marks_range || 'N/A';
  const confidence = profile.academic_confidence || 3;
  const username = profile.name || profile.username || 'Cadet';

  // Format Recharts radar data beautifully
  const radarData = [
    { name: 'CURIOSITY', score: (behavior.curiosity_score || 3) * 20 },
    { name: 'CONFIDENCE', score: (behavior.emotional_confidence_score || 3) * 20 },
    { name: 'ANALYTICAL', score: (behavior.analytical_score || 1) * 50 },
    { name: 'CREATIVITY', score: (behavior.creativity_score || 1) * 50 },
    { name: 'LOGICAL', score: (behavior.logical_reasoning_score || 1) * 50 },
  ];

  // Dynamic College Recommendations based on Stream
  const getColleges = () => {
    if (stream === 'Computer Science' || stream === 'Science') {
      return {
        dream: [
          { name: 'Indian Institute of Technology (IIT) Madras', location: 'Chennai', desc: 'Renowned for computer science and technological research.' },
          { name: 'BITS Pilani', location: 'Rajasthan', desc: 'Premier private institute offering exceptional technical education.' }
        ],
        realistic: [
          { name: 'VIT University', location: 'Vellore', desc: 'High placement rates, exceptional labs, robust industry curriculum.' },
          { name: 'College of Engineering, Guindy (CEG)', location: 'Chennai', desc: 'One of the oldest technical colleges with highly selective admission.' }
        ],
        safe: [
          { name: 'SRM Institute of Science and Technology', location: 'Chennai', desc: 'Vast infrastructure and flexible research pathways.' },
          { name: 'Amrita Vishwa Vidyapeetham', location: 'Coimbatore', desc: 'Focuses strongly on technical fundamentals and values.' }
        ]
      };
    } else if (stream === 'Commerce' || stream === 'Arts') {
      return {
        dream: [
          { name: 'Shri Ram College of Commerce (SRCC)', location: 'Delhi', desc: 'Premier institution for business studies, economics, and finance.' },
          { name: 'Loyola College', location: 'Chennai', desc: 'Vibrant, highly selective Arts & Commerce institution.' }
        ],
        realistic: [
          { name: 'Christ University', location: 'Bengaluru', desc: 'Highly practical business management and professional arts tracks.' },
          { name: 'Symbiosis College of Arts and Commerce', location: 'Pune', desc: 'Fosters versatile industry-integrated business applications.' }
        ],
        safe: [
          { name: 'Madras Christian College (MCC)', location: 'Chennai', desc: 'Stellar academic reputation with a serene green campus.' },
          { name: 'SRM School of Management', location: 'Chennai', desc: 'Favorable infrastructure and broad corporate connections.' }
        ]
      };
    } else {
      return {
        dream: [
          { name: 'National Institute of Design (NID)', location: 'Ahmedabad', desc: 'India\'s top-tier design school for strategic and industrial design.' },
          { name: 'Christ University', location: 'Bengaluru', desc: 'Comprehensive studies in vocational, creative, and general sciences.' }
        ],
        realistic: [
          { name: 'Symbiosis Institute of Design', location: 'Pune', desc: 'Extensive specialization options in visual communications and design.' },
          { name: 'Pearl Academy', location: 'Mumbai', desc: 'Highly hands-on creative incubator with global industrial exposure.' }
        ],
        safe: [
          { name: 'MIT Art, Design and Technology University', location: 'Pune', desc: 'Modern labs and versatile multi-disciplinary curriculum.' },
          { name: 'SRM Institute of Science & Technology', location: 'Chennai', desc: 'Broad spectrum of design and humanities options.' }
        ]
      };
    }
  };

  const colleges = getColleges();

  // Skill definitions for the Analyzer Widget
  const careerSkillsConfig = {
    'AI & Intelligent Systems': {
      required: ['Logical Reasoning', 'Analytical Thinking', 'Mathematics', 'Computer Science'],
      actionItem: 'Improve data classification algorithms and practice coding foundational statistics.'
    },
    'Software Engineering': {
      required: ['Logical Reasoning', 'Creative Problem Solving', 'Mathematics', 'Computer Science'],
      actionItem: 'Build three responsive full-stack applications and study data structures.'
    },
    'Product Innovation': {
      required: ['Active Curiosity Explorer', 'Creative Problem Solving', 'English', 'Business Studies'],
      actionItem: 'Take a user behavior mapping crash course and analyze everyday digital products.'
    },
    'Cybersecurity': {
      required: ['Logical Reasoning', 'Analytical Thinking', 'Computer Science', 'Physics'],
      actionItem: 'Practice setting up virtual network labs and study basic routing protocols.'
    },
    'UI/UX + Technology': {
      required: ['Active Curiosity Explorer', 'Creative Problem Solving', 'Computer Science', 'English'],
      actionItem: 'Design responsive wireframes for two complex dashboards and study modern color grids.'
    },
    'Data Analytics': {
      required: ['Analytical Thinking', 'Logical Reasoning', 'Mathematics', 'Economics'],
      actionItem: 'Participate in a public database visualization challenge using Python or spreadsheets.'
    }
  };

  // Active Selected Skill analyzer details
  const activeSkillDetails = careerSkillsConfig[selectedGapPathway] || { required: [], actionItem: '' };
  const matchedSkillsForPathway = activeSkillDetails.required.filter(reqSkill => 
    top_strengths.some(strength => strength.toLowerCase().includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(strength.toLowerCase())) ||
    subjects.some(subject => subject.toLowerCase().includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(subject.toLowerCase()))
  );
  const missingSkillsForPathway = activeSkillDetails.required.filter(reqSkill => 
    !matchedSkillsForPathway.includes(reqSkill)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 relative overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* Dynamic Glowing Accents */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full filter blur-[100px] pointer-events-none animate-pulse"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Futuristic Dashboard Header */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[0_0_50px_-12px_rgba(30,41,59,0.3)]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest font-black">
              <Sparkles className="w-4 h-4 animate-spin" /> NEURAL DIAGNOSTICS STABILITY // CALIBRATED
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-none font-mono">
              {username}<span className="text-blue-500 font-sans font-normal text-2xl md:text-3xl">.career_matrix</span>
            </h1>
            <p className="text-slate-400 text-xs md:text-sm font-mono leading-relaxed">
              // DATA INTEGRITY SECURE: ONBOARDING RESULTS LOADED PERSISTENTLY
            </p>
          </div>
          
          <button
            onClick={handleDownloadReport}
            disabled={downloading}
            className="flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black uppercase text-sm tracking-widest rounded-xl transition-all shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] active:scale-95 duration-200 shrink-0"
          >
            <Download className={`w-5 h-5 ${downloading ? 'animate-bounce' : ''}`} />
            {downloading ? 'COMPILING REPORT...' : 'DOWNLOAD MULTI-PAGE PDF'}
          </button>
        </div>

        {/* Dynamic Horizontal Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {[
            { id: 'overview', label: 'OVERVIEW ARCHETYPE', icon: TrendingUp },
            { id: 'pathways', label: 'RECOMMENDED PATHWAYS', icon: Award },
            { id: 'skills', label: 'SKILL GAP ANALYZER', icon: Brain },
            { id: 'roadmap', label: 'HORIZON ROADMAP', icon: Map },
            { id: 'colleges', label: 'TIERED COLLEGES', icon: Building2 }
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
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Box: Archetype & Summary */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Identity Snapshot Card */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)] space-y-6 relative overflow-hidden group">
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 bg-blue-900/40 text-blue-400 border border-blue-800 text-xxs font-black tracking-widest uppercase font-mono rounded">
                    ESTABLISHED EXPLORER IDENTITY
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-white font-mono uppercase tracking-tight mt-1">
                    {results.explorationType || 'ACTIVE EXPLORER'}
                  </h2>
                </div>

                <div className="p-6 bg-slate-950/80 border border-slate-800 rounded-2xl relative shadow-inner">
                  <div className="absolute top-2 left-2 text-xxs text-slate-600 font-mono uppercase">AI PROFILE SYNTHESIS</div>
                  <p className="text-slate-300 text-sm md:text-base font-medium font-mono leading-relaxed mt-3 uppercase">
                    "{personalized_summary}"
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl text-center">
                    <div className="text-xxs text-slate-500 font-mono uppercase">STREAM</div>
                    <div className="text-sm md:text-base font-black text-white uppercase mt-1 leading-tight">{stream}</div>
                  </div>
                  <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl text-center">
                    <div className="text-xxs text-slate-500 font-mono uppercase">MARKS LEVEL</div>
                    <div className="text-sm md:text-base font-black text-blue-400 mt-1 leading-tight">{marks}</div>
                  </div>
                  <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl text-center">
                    <div className="text-xxs text-slate-500 font-mono uppercase">CONFIDENCE</div>
                    <div className="text-sm md:text-base font-black text-orange-400 mt-1 leading-tight">{confidence} / 5</div>
                  </div>
                  <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl text-center">
                    <div className="text-xxs text-slate-500 font-mono uppercase">STRENGTHS</div>
                    <div className="text-sm md:text-base font-black text-emerald-400 mt-1 leading-tight">{top_strengths.length} ITEMS</div>
                  </div>
                </div>
              </div>

              {/* Academic Insights */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-lg space-y-6">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                  <h3 className="text-xl font-bold uppercase font-mono text-white tracking-wider">ACADEMIC JOURNEY PROFILE</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black tracking-widest text-slate-400 uppercase font-mono border-b border-slate-800 pb-2">FAVORITE FIELDS</h4>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map(subj => (
                        <span key={subj} className="px-3 py-1.5 bg-blue-900/30 text-blue-300 border border-blue-800 text-xs font-bold uppercase font-mono rounded-lg">
                          {subj}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-black tracking-widest text-slate-400 uppercase font-mono border-b border-slate-800 pb-2">ACADEMIC CONFIDENCE RATING</h4>
                    <div className="space-y-2">
                      <div className="w-full bg-slate-950 border border-slate-800 h-6 p-1 rounded-full overflow-hidden flex">
                        {[1, 2, 3, 4, 5].map((step) => (
                          <div 
                            key={step} 
                            className={`flex-1 h-full mr-1 rounded-full transition-all duration-300 ${
                              step <= confidence 
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                                : 'bg-slate-800'
                            }`}
                          ></div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xxs font-mono uppercase text-slate-500">
                        <span>FOUNDATIONAL EXPLORER</span>
                        <span>ADVANCED RESEARCH MASTER</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Box: Radar Chart */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.3)]">
              <div>
                <h3 className="text-lg font-black font-mono text-white uppercase tracking-wider mb-2">BEHAVIORAL SPECTRUM</h3>
                <p className="text-slate-500 text-xxs font-mono uppercase leading-relaxed mb-6">// DEDUCTED FROM LATENCY, PERSISTENCE AND ACCURACY</p>
              </div>

              <div className="w-full h-80 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="85%" data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 9, fontWeight: 'bold', fontFamily: 'monospace' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fontSize: 8, fill: '#64748b' }} />
                    <Radar
                      name="Behavioral Score"
                      dataKey="score"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.25}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="border-t border-slate-800 pt-4 mt-4 space-y-2 text-xxs font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>LOGICAL DECISIONS:</span>
                  <span className="font-bold text-white uppercase">{behavior.learning_style_pattern || 'Adaptive'}</span>
                </div>
                <div className="flex justify-between">
                  <span>TRY PERSISTENCE:</span>
                  <span className="font-bold text-blue-400 uppercase">LEVEL {behavior.retry_behavior_score || 0}</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'pathways' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-white font-mono uppercase tracking-wider">AI RECOMMENDATION CORE</h2>
              <p className="text-slate-500 text-xs font-mono uppercase mt-1">// STREAMS, COGNITION AND PREFERENCE SYNTHESIS COMPLETED</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommended_pathways.map((pathway, index) => {
                const isTop = index === 0;
                return (
                  <div 
                    key={pathway.name}
                    className={`bg-slate-900/60 backdrop-blur-xl border rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-lg ${
                      isTop 
                        ? 'border-blue-500/45 shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-blue-500' 
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isTop && (
                      <div className="absolute top-0 right-0 bg-blue-500 text-slate-950 px-4 py-1 text-xxs font-black uppercase font-mono tracking-widest rounded-bl-xl shadow-lg">
                        TOP RECOMMENDATION
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <span className="text-xxs font-mono text-blue-400 font-bold uppercase tracking-wider">CAREER SECTOR 0{index + 1}</span>
                          <h3 className="text-xl md:text-2xl font-black text-white uppercase font-mono tracking-tight group-hover:text-blue-400 transition-colors">
                            {pathway.name}
                          </h3>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-mono">
                            {pathway.matchScore}%
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">MATCH</span>
                        </div>
                      </div>

                      {/* Glowing fit progress meter */}
                      <div className="w-full bg-slate-950 border border-slate-900 h-2 p-0.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500" 
                          style={{ width: `${pathway.matchScore}%` }}
                        ></div>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed mt-2 uppercase font-mono">
                        {pathway.description}
                      </p>

                      <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-2xl">
                        <span className="text-[10px] font-mono text-slate-500 font-black uppercase tracking-widest">FIT LOGIC</span>
                        <p className="text-slate-400 text-xs mt-1.5 leading-relaxed font-mono uppercase">
                          {pathway.matchReason}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-slate-900 pt-4 mt-6 flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-500 uppercase">STARTING COURSES:</span>
                      <span className="text-white font-bold uppercase tracking-wide">B.Tech / B.Sc / Professional Certificates</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white font-mono uppercase tracking-wider">SKILL GAP ANALYZER</h2>
              <p className="text-slate-500 text-xs font-mono uppercase">// SELECT YOUR DREAM TARGET CAREER TO INTERACTIVELY COMPILE MISSING SPECIALIZED SKILLS</p>
            </div>

            {/* Selector Widget */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-lg space-y-8">
              <div className="space-y-3 max-w-md">
                <label className="block text-xxs font-black text-slate-400 uppercase tracking-widest font-mono">
                  [CHOOSE TARGET CAREER PATHWAY]
                </label>
                <select
                  value={selectedGapPathway}
                  onChange={(e) => {
                    audioSynth.playTap();
                    setSelectedGapPathway(e.target.value);
                  }}
                  className="w-full bg-slate-950 border-2 border-slate-800 text-white font-mono font-bold uppercase tracking-wider px-5 py-4 focus:border-blue-500 outline-none rounded-xl transition-colors cursor-pointer"
                >
                  {recommended_pathways.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-800">
                {/* Matched Skills List */}
                <div className="space-y-4">
                  <span className="flex items-center gap-2 text-xs font-black text-emerald-400 uppercase tracking-widest font-mono">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-ping"></span>
                    VALIDATED STRENGTHS MATCH ({matchedSkillsForPathway.length})
                  </span>
                  
                  <div className="space-y-2">
                    {matchedSkillsForPathway.map(skill => (
                      <div key={skill} className="flex items-center gap-3 p-4 bg-emerald-950/20 border border-emerald-900/40 text-emerald-300 rounded-xl font-mono text-xs font-bold uppercase">
                        <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                        {skill}
                      </div>
                    ))}
                    {matchedSkillsForPathway.length === 0 && (
                      <p className="text-slate-500 text-xs italic font-mono uppercase">No strengths matched for this specific path. Target basic subjects first.</p>
                    )}
                  </div>
                </div>

                {/* Missing Skills List */}
                <div className="space-y-4">
                  <span className="flex items-center gap-2 text-xs font-black text-orange-400 uppercase tracking-widest font-mono">
                    <span className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></span>
                    SKILL DEVELOPMENT GAPS ({missingSkillsForPathway.length})
                  </span>
                  
                  <div className="space-y-2">
                    {missingSkillsForPathway.map(skill => (
                      <div key={skill} className="flex items-center justify-between p-4 bg-slate-950 border border-slate-900 rounded-xl text-slate-400 font-mono text-xs uppercase">
                        <span>{skill}</span>
                        <span className="text-[10px] font-bold text-orange-400 bg-orange-950/40 border border-orange-900/40 px-2 py-0.5 rounded">REQUIRED</span>
                      </div>
                    ))}
                    {missingSkillsForPathway.length === 0 && (
                      <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 text-emerald-300 text-center font-bold text-xs uppercase font-mono rounded-xl">
                        🏆 ALL FOUNDATIONAL SKILLS VALIDATED PERFECTLY!
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Item Box */}
              {missingSkillsForPathway.length > 0 && (
                <div className="p-6 bg-slate-950 border-2 border-dashed border-blue-500/30 rounded-2xl space-y-3 shadow-inner">
                  <span className="text-xxs font-black text-blue-400 uppercase tracking-widest font-mono block">GROWTH ACTION STEPS</span>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    TARGET: {activeSkillDetails.actionItem}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-mono uppercase">
                    CurveUrCareer recommends enrolling in the introductory micro-learning modules to systematically balance these gaps and establish basic projects.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white font-mono uppercase tracking-wider">HORIZON ROADMAP</h2>
              <p className="text-slate-500 text-xs font-mono uppercase">// CHRONOLOGICAL DEVELOPMENT STAGES FROM CADET TO INDUSTRY LEADER</p>
            </div>

            <div className="relative">
              {/* Vertical Connector Line */}
              <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-orange-500 opacity-30"></div>

              <div className="space-y-8">
                {[
                  {
                    step: 'STAGE 01',
                    title: 'ACADEMIC FOUNDATION',
                    icon: BookOpen,
                    color: 'text-blue-400',
                    bg: 'bg-blue-950/20 border-blue-900/40',
                    desc: `Strengthen core subjects selected during onboarding: ${subjects.join(', ') || 'Mathematics'}. Stabilize marks levels.`
                  },
                  {
                    step: 'STAGE 02',
                    title: 'SPECIALIZATION SKILL BUILDING',
                    icon: Laptop,
                    color: 'text-indigo-400',
                    bg: 'bg-indigo-950/20 border-indigo-900/40',
                    desc: 'Engage in micro-modules to neutralize identified skill gaps. Earn initial fundamental certifications.'
                  },
                  {
                    step: 'STAGE 03',
                    title: 'PRACTICAL REAL PROJECTS',
                    icon: Brain,
                    color: 'text-violet-400',
                    bg: 'bg-violet-950/20 border-violet-900/40',
                    desc: 'Build three real-world capstone projects based on your stream and interests. Establish portfolio repository.'
                  },
                  {
                    step: 'STAGE 04',
                    title: 'COMPETITIVE INTERNSHIPS',
                    icon: Map,
                    color: 'text-orange-400',
                    bg: 'bg-orange-950/20 border-orange-900/40',
                    desc: 'Participate in corporate hackathons, industry networking meets, and secure early career exploration positions.'
                  },
                  {
                    step: 'STAGE 05',
                    title: 'CAREER PEAK READINESS',
                    icon: GraduationCap,
                    color: 'text-emerald-400',
                    bg: 'bg-emerald-950/20 border-emerald-900/40',
                    desc: 'Prepare for placement, finalize resume vectors, optimize portfolios, and transition to technical placements.'
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="relative flex gap-6 items-start group pl-4">
                      {/* Left Dot */}
                      <div className="absolute left-8 w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-950 flex items-center justify-center transform -translate-x-[15px] z-10 group-hover:border-blue-500 transition-colors">
                        <div className="w-3.5 h-3.5 bg-slate-800 group-hover:bg-blue-500 rounded-full transition-colors"></div>
                      </div>

                      <div className={`flex-1 bg-slate-900/60 backdrop-blur-xl border rounded-3xl p-6 ml-6 space-y-2 hover:border-slate-700 transition-colors shadow-lg ${item.bg}`}>
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

        {activeTab === 'colleges' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-white font-mono uppercase tracking-wider">TIERED COLLEGE HIGHLIGHTS</h2>
              <p className="text-slate-500 text-xs font-mono uppercase">// DYNAMIC RECOMMENDATION TAILORED FOR STREAM: {stream}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dream Colleges Tier 1 */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-6 space-y-6 shadow-lg hover:border-emerald-500/40 transition-colors">
                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 bg-emerald-950/40 text-emerald-400 border border-emerald-900/40 text-xxs font-black tracking-widest font-mono rounded">
                    🎯 DREAM TIER 1
                  </span>
                  <h3 className="text-lg font-black text-white uppercase font-mono mt-2">PREMIER AMBITIONS</h3>
                </div>
                
                <div className="space-y-4">
                  {colleges.dream.map(clg => (
                    <div key={clg.name} className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                      <h4 className="font-bold text-slate-100 text-sm uppercase font-mono">{clg.name}</h4>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{clg.location}</span>
                      <p className="text-slate-400 text-xxs mt-1 font-mono uppercase leading-relaxed">{clg.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Realistic Colleges Tier 2 */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-6 space-y-6 shadow-lg hover:border-blue-500/40 transition-colors">
                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 bg-blue-950/40 text-blue-400 border border-blue-800 text-xxs font-black tracking-widest font-mono rounded">
                    ✅ REALISTIC TIER 2
                  </span>
                  <h3 className="text-lg font-black text-white uppercase font-mono mt-2">BALANCED ALIGNMENT</h3>
                </div>
                
                <div className="space-y-4">
                  {colleges.realistic.map(clg => (
                    <div key={clg.name} className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                      <h4 className="font-bold text-slate-100 text-sm uppercase font-mono">{clg.name}</h4>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{clg.location}</span>
                      <p className="text-slate-400 text-xxs mt-1 font-mono uppercase leading-relaxed">{clg.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safe Colleges Tier 3 */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 space-y-6 shadow-lg hover:border-slate-700 transition-colors">
                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 bg-slate-950 text-slate-400 border border-slate-800 text-xxs font-black tracking-widest font-mono rounded">
                    🛡️ SAFE TIER 3
                  </span>
                  <h3 className="text-lg font-black text-white uppercase font-mono mt-2">STABLE SAFEGUARDS</h3>
                </div>
                
                <div className="space-y-4">
                  {colleges.safe.map(clg => (
                    <div key={clg.name} className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                      <h4 className="font-bold text-slate-100 text-sm uppercase font-mono">{clg.name}</h4>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{clg.location}</span>
                      <p className="text-slate-400 text-xxs mt-1 font-mono uppercase leading-relaxed">{clg.desc}</p>
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
