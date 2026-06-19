import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { audioSynth } from '../utils/audioSynth';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  User, 
  GraduationCap, 
  Brain, 
  Sliders, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Play, 
  Volume2, 
  VolumeX,
  Compass,
  Briefcase,
  AlertTriangle,
  Lightbulb,
  Award
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

const AssessmentPage = () => {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();

  // Assessment Stages: 'welcome' -> 'academic_intel' -> 'skills_discovery' -> 'lifestyle_mapping' -> 'synthesis' -> 'results_redirect'
  const [stage, setStage] = useState('welcome');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // --- STAGE 1: ACADEMIC INTELLIGENCE STATE ---
  const [explorerName, setExplorerName] = useState(user?.name || user?.username || '');
  const [academicStep, setAcademicStep] = useState(0);
  const [lifestyleStep, setLifestyleStep] = useState(0);
  const [educationLevel, setEducationLevel] = useState('');
  const [academicStream, setAcademicStream] = useState('');
  const [favoriteSubjects, setFavoriteSubjects] = useState([]);
  const [marksType, setMarksType] = useState('range'); // 'exact' or 'range'
  const [marksRange, setMarksRange] = useState('');
  const [exactMarks, setExactMarks] = useState('');
  const [academicConfidence, setAcademicConfidence] = useState(3); // 1 to 5

  // --- STAGE 2: SKILL DISCOVERY STATE (3 Sim Scenarios) ---
  const [currentMoment, setCurrentMoment] = useState(0);
  const [systemsCrash, setSystemsCrash] = useState({ auth: 0, db: 0, gateway: 0, analytics: 0, ui: 0 });
  const [monolithicDeadlock, setMonolithicDeadlock] = useState(null);
  const [orbitalDebris, setOrbitalDebris] = useState(null);
  const [optionSwitchesCount, setOptionSwitchesCount] = useState(0);
  const [timerPercentage, setTimerPercentage] = useState(0);
  const [chaoticTriggered, setChaoticTriggered] = useState(false);

  // Silent tracking telemetry refs
  const hoverSequencesRef = useRef([]);
  const scrollDepthRef = useRef(0);
  const textSelectionCountRef = useRef(0);
  const middleClickBacktrackRef = useRef(false);
  const skillsStartTimeRef = useRef(Date.now());
  const momentStartTime = useRef(Date.now());

  // --- STAGE 3: CAREER LIFESTYLE MAPPING STATE ---
  const [preferredEnvironments, setPreferredEnvironments] = useState([]);
  const [higherEducation, setHigherEducation] = useState(true);
  const [studyLocation, setStudyLocation] = useState('Within home state');
  const [workAbroad, setWorkAbroad] = useState(false);
  const [lifestylePriorities, setLifestylePriorities] = useState([]);
  const [careerTypeSliders, setCareerTypeSliders] = useState({
    government: 50,
    private: 50,
    entrepreneurship: 50,
    research: 50,
    freelancing: 50,
    emergingTech: 50
  });

  // Hover tracking helper
  const handleHoverElement = (elementId) => {
    if (stage !== 'skills_discovery') return;
    const currentSeq = hoverSequencesRef.current;
    if (currentSeq.length === 0 || currentSeq[currentSeq.length - 1] !== elementId) {
      hoverSequencesRef.current = [...currentSeq, elementId];
    }
  };

  const handleSelectDeadlockOption = (val) => {
    handleTapSound();
    if (monolithicDeadlock && monolithicDeadlock !== val) {
      setOptionSwitchesCount(prev => prev + 1);
    }
    setMonolithicDeadlock(val);
  };

  const handleSelectDebrisOption = (val) => {
    handleTapSound();
    if (orbitalDebris && orbitalDebris !== val) {
      setOptionSwitchesCount(prev => prev + 1);
    }
    setOrbitalDebris(val);
  };

  const handleTextHighlight = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      textSelectionCountRef.current = textSelectionCountRef.current + 1;
    }
  };

  // Telemetry event listeners setup
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const currentDepth = Math.round((window.scrollY / docHeight) * 100);
        if (currentDepth > scrollDepthRef.current) {
          scrollDepthRef.current = currentDepth;
        }
      }
    };

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        textSelectionCountRef.current = textSelectionCountRef.current + 1;
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        middleClickBacktrackRef.current = true;
      }
    };

    const handleAuxClick = (e) => {
      if (e.button === 1) { // Middle click
        middleClickBacktrackRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('selectionchange', handleSelectionChange);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('auxclick', handleAuxClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('selectionchange', handleSelectionChange);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('auxclick', handleAuxClick);
    };
  }, [stage]);

  // Scenario 2: Ambient Progress Bar & Chaotic Event Timer
  useEffect(() => {
    if (stage !== 'skills_discovery' || currentMoment !== 1) {
      setTimerPercentage(0);
      setChaoticTriggered(false);
      return;
    }

    const duration = 15000; // 15 seconds
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setTimerPercentage(pct);

      if (pct >= 50 && !chaoticTriggered) {
        setChaoticTriggered(true);
        if (soundEnabled) {
          audioSynth.playPuzzleCorrect();
        }
      }

      if (pct >= 100) {
        clearInterval(interval);
        // Auto-select option B if user takes too long without selection
        if (!monolithicDeadlock) {
          setMonolithicDeadlock('B');
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [stage, currentMoment, monolithicDeadlock, soundEnabled, chaoticTriggered]);

  // Sound Engine wrappers
  const handleTapSound = () => soundEnabled && audioSynth.playTap();
  const handleChimeSound = () => soundEnabled && audioSynth.playPuzzleCorrect();
  const handleSuccessSound = () => soundEnabled && audioSynth.playSuccess();
  const handleTransitionSound = () => soundEnabled && audioSynth.playTransition();

  // Reset clock for latency tracker
  const resetMomentTimer = () => {
    momentStartTime.current = Date.now();
  };

  // Helper to POST progress to backend
  const saveProgressToBackend = async (phaseId, payloadData) => {
    const token = localStorage.getItem('curveurcareer_token');
    const responseTime = Date.now() - momentStartTime.current;
    
    try {
      const res = await fetch(`${API_URL}/api/discover/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          stage: phaseId,
          data: payloadData,
          metrics: {
            responseTime,
            engagementScore: 1.5,
            hoverSequences: payloadData.telemetry?.hoverSequences || null,
            scrollDepth: payloadData.telemetry?.scrollDepth || null,
            textSelectionCount: payloadData.telemetry?.textSelectionCount || null,
            middleClickBacktrack: payloadData.telemetry?.middleClickBacktrack || null
          }
        })
      });
      return await res.json();
    } catch (e) {
      console.error('Progress sync exception:', e);
      return { success: false, error: 'Database network sync failed. Saved to local backup cache.' };
    }
  };

  // Switch stages cleanly
  const navigateStage = (nextStage) => {
    handleTransitionSound();
    setStage(nextStage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    resetMomentTimer();
    setAcademicStep(0);
    setLifestyleStep(0);
    if (nextStage === 'skills_discovery') {
      setCurrentMoment(0);
      skillsStartTimeRef.current = Date.now();
      hoverSequencesRef.current = [];
      scrollDepthRef.current = 0;
      textSelectionCountRef.current = 0;
      middleClickBacktrackRef.current = false;
      setOptionSwitchesCount(0);
    }
  };

  // --- SUBMISSIONS ---
  
  // Submit Academic Intelligence (Stage 1)
  const submitAcademicStage = async () => {
    if (!explorerName.trim() || !educationLevel || !academicStream || favoriteSubjects.length === 0) {
      setError('Please fill in all academic profile parameters.');
      return;
    }
    setError(null);
    setLoading(true);

    const finalMarks = marksType === 'exact' ? exactMarks : marksRange;
    const academicPayload = {
      name: explorerName,
      educationStage: educationLevel,
      academicStream,
      favoriteSubjects,
      marks: finalMarks,
      academicConfidence
    };

    const res = await saveProgressToBackend('academic_intelligence', academicPayload);
    setLoading(false);
    if (res.success || res.message) {
      navigateStage('skills_discovery');
    } else {
      setError(res.error || 'Calibration error. Please retry.');
    }
  };

  // Submit Skill Discovery (Stage 2)
  const submitSkillsStage = async () => {
    setLoading(true);

    const totalTime = Date.now() - skillsStartTimeRef.current;

    // Determine learning behavior pattern based on option selections and sliders
    let behaviorPattern = 'Adaptive Learner';
    if (systemsCrash.db >= 2 && monolithicDeadlock === 'B') {
      behaviorPattern = 'Active Builder';
    } else if (systemsCrash.analytics >= 2 || monolithicDeadlock === 'A') {
      behaviorPattern = 'Analytical Scholar';
    }

    const skillsPayload = {
      simulationAnswers: {
        systemsCrash,
        monolithicDeadlock,
        orbitalDebris
      },
      learningBehavior: behaviorPattern,
      telemetry: {
        elapsedMs: totalTime,
        optionSwitches: optionSwitchesCount,
        textHighlighted: textSelectionCountRef.current > 0,
        textSelectionCount: textSelectionCountRef.current,
        hoverSequences: hoverSequencesRef.current,
        scrollDepth: scrollDepthRef.current,
        middleClickBacktrack: middleClickBacktrackRef.current
      }
    };

    const res = await saveProgressToBackend('skill_discovery', skillsPayload);
    setLoading(false);
    if (res.success || res.message) {
      navigateStage('lifestyle_mapping');
    } else {
      setError(res.error || 'Failed to sync skill vectors.');
    }
  };

  // Submit Career Lifestyle Mapping (Stage 3)
  const submitLifestyleStage = async () => {
    if (preferredEnvironments.length === 0 || lifestylePriorities.length === 0) {
      setError('Please fill in preferred work environments and core lifestyle priorities.');
      return;
    }
    setError(null);
    setLoading(true);

    const lifestylePayload = {
      preferredEnvironments,
      higherEducation,
      studyLocation: higherEducation ? studyLocation : 'None',
      workAbroad,
      lifestylePriorities,
      careerTypeSliders
    };

    // Save stage progress first
    const progressRes = await saveProgressToBackend('career_lifestyle', lifestylePayload);
    if (!progressRes.success && !progressRes.message) {
      setLoading(false);
      setError(progressRes.error || 'Failed to sync lifestyle metrics.');
      return;
    }

    // Now call /complete to run the cognitive calculation and generate rich recommendations
    navigateStage('synthesis');
    const token = localStorage.getItem('curveurcareer_token');
    try {
      const completeRes = await fetch(`${API_URL}/api/discover/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const completeData = await completeRes.json();
      setLoading(false);
      if (completeData.success) {
        await refreshProfile();
        // Redirect to results dashboard
        navigate('/results');
      } else {
        setError(completeData.error || 'Synthesis computation failed.');
        setStage('lifestyle_mapping');
      }
    } catch (e) {
      console.error('Synthesis error:', e);
      setLoading(false);
      setError('Connection interrupted during cognitive synthesis.');
      setStage('lifestyle_mapping');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden relative">
      {/* Immersive Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-0"></div>
      
      {/* Top Floating Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4 px-6 flex justify-between items-center z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-400/30">
            C
          </div>
          <div>
            <span className="font-mono text-xs font-black uppercase tracking-widest text-slate-400">// CURVEURCAREER</span>
            <h1 className="text-sm font-bold tracking-tight text-white uppercase leading-none">CAREER INTELLIGENCE assessment</h1>
          </div>
        </div>
        
        {/* Sound toggle float */}
        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            audioSynth.playTap();
          }}
          className={`px-4 py-2 border rounded-xl text-xs font-mono font-bold transition-all ${
            soundEnabled 
              ? 'bg-blue-600/20 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
              : 'bg-slate-900 border-slate-850 text-slate-500 hover:border-slate-700'
          }`}
        >
          {soundEnabled ? '🔊 AUDIO ON' : '🔇 AUDIO MUTED'}
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 flex flex-col justify-center relative z-10">
        
        {/* Error panel */}
        {error && (
          <div className="mb-8 p-5 bg-red-950/20 border border-red-500/30 rounded-2xl flex items-center justify-between gap-4 text-sm font-mono text-red-300">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button 
              onClick={() => setError(null)}
              className="text-xs font-bold uppercase border border-red-500/30 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              Dismiss
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* Phase 0: Immersive Welcome */}
          {stage === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 md:p-12 text-center space-y-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                  <Compass className="w-8 h-8 text-blue-400 animate-spin-slow" />
                </div>
              </div>
              
              <div className="space-y-4">
                <span className="px-3 py-1 bg-blue-950 border border-blue-900 text-blue-400 text-xxs font-black tracking-[0.25em] rounded-full font-mono uppercase inline-block">
                  FOUNDATION // SELF-DISCOVERY JOURNEY
                </span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-none font-mono">
                  DISCOVER YOUR <br className="hidden md:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    CAREER ARCHETYPE
                  </span>
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                  Welcome Explorer. This is not an exam, aptitude test, or standard form. You are entering a calibration system designed to map your intellectual background, skills potential, and lifestyle vectors.
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => navigateStage('academic_intel')}
                  className="inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-black text-sm tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 duration-200"
                >
                  START ENGINE DISCOVERY <Play className="w-4 h-4 fill-white" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Phase 1: Academic Intelligence */}
          {stage === 'academic_intel' && (
            <motion.div
              key="academic_intel"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-xl"
            >
              {/* Stepper HUD */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold flex items-center justify-center font-mono text-sm">01</span>
                  <div>
                    <h3 className="font-bold text-white uppercase text-sm leading-none font-mono">ACADEMIC INTELLIGENCE</h3>
                    <span className="text-[10px] text-slate-500 font-mono">STAGE 1 OF 3 // EDUCATIONAL HISTORY</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">STEP {academicStep + 1} OF 3</span>
                  <div className="w-24 bg-slate-850 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${((academicStep + 1) / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="min-h-[300px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={academicStep}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* STEP 0: Codename and Education coordinates */}
                    {academicStep === 0 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Explorer Codename
                          </label>
                          <input
                            type="text"
                            value={explorerName}
                            onChange={(e) => setExplorerName(e.target.value)}
                            placeholder="Enter explorer name..."
                            className="w-full bg-slate-950 border border-slate-800 px-5 py-4 focus:border-blue-500 outline-none rounded-xl text-white font-bold transition-all text-sm uppercase tracking-wide"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Current Educational Coordinates
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {['10th Completed', '11th', '12th', 'College 1st Year', 'College 2nd Year'].map(lvl => (
                              <button
                                key={lvl}
                                onClick={() => {
                                  handleTapSound();
                                  setEducationLevel(lvl);
                                }}
                                className={`p-4 border text-center transition-all rounded-xl font-mono text-xs font-bold ${
                                  educationLevel === lvl 
                                    ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]' 
                                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                                }`}
                              >
                                {lvl}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 1: Stream and Favorite Subjects */}
                    {academicStep === 1 && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Stream / Concentration (Selected after 10th)
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                              { id: 'Computer Science', label: 'Computer Science', desc: 'Tech & Mathematics focus' },
                              { id: 'Biology', label: 'Biology & Science', desc: 'Medical & Chemical focus' },
                              { id: 'Commerce', label: 'Commerce & Finance', desc: 'Economics & Accountancy' },
                              { id: 'Arts & Humanities', label: 'Arts & Humanities', desc: 'Design, Literature & Social studies' },
                              { id: 'Vocational', label: 'Vocational', desc: 'Applied skills & engineering trades' },
                              { id: 'Other', label: 'Other Stream', desc: 'General exploration studies' }
                            ].map(st => (
                              <button
                                key={st.id}
                                onClick={() => {
                                  handleTapSound();
                                  setAcademicStream(st.id);
                                }}
                                className={`p-4 border text-left transition-all rounded-xl flex flex-col justify-between h-24 ${
                                  academicStream === st.id 
                                    ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]' 
                                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                                }`}
                              >
                                <span className="font-bold text-sm font-mono block uppercase">{st.label}</span>
                                <span className={`text-[10px] block mt-1 ${academicStream === st.id ? 'text-blue-100' : 'text-slate-500'}`}>{st.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Favorite subjects (Select multiple cards)
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {[
                              'Mathematics', 'Physics', 'Chemistry', 'Biology', 
                              'Computer Science', 'Economics', 'Accountancy', 
                              'Business Studies', 'English', 'History', 'Geography'
                            ].map(subj => {
                              const isSelected = favoriteSubjects.includes(subj);
                              return (
                                <button
                                  key={subj}
                                  onClick={() => {
                                    handleTapSound();
                                    if (isSelected) {
                                      setFavoriteSubjects(favoriteSubjects.filter(s => s !== subj));
                                    } else {
                                      setFavoriteSubjects([...favoriteSubjects, subj]);
                                    }
                                  }}
                                  className={`p-3.5 border transition-all rounded-xl font-mono text-xs flex items-center justify-between ${
                                    isSelected 
                                      ? 'bg-blue-600 border-blue-500 text-white font-bold' 
                                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                                  }`}
                                >
                                  <span>{subj}</span>
                                  {isSelected ? <Check className="w-4 h-4 text-white" /> : <span className="text-slate-600">+</span>}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Marks and Confidence */}
                    {academicStep === 2 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Performance Selection */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                                10th or 12th Marks Level
                              </label>
                              <div className="flex gap-2 bg-slate-950 border border-slate-850 p-0.5 rounded-lg text-[10px] font-mono font-bold">
                                <button 
                                  onClick={() => { handleTapSound(); setMarksType('range'); }}
                                  className={`px-2 py-1 rounded ${marksType === 'range' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                                >
                                  Range
                                </button>
                                <button 
                                  onClick={() => { handleTapSound(); setMarksType('exact'); }}
                                  className={`px-2 py-1 rounded ${marksType === 'exact' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                                >
                                  Exact %
                                </button>
                              </div>
                            </div>

                            {marksType === 'range' ? (
                              <div className="grid grid-cols-2 gap-2">
                                {[
                                  { id: '90-100', label: '90% - 100%' },
                                  { id: '75-89', label: '75% - 89%' },
                                  { id: '60-74', label: '60% - 74%' },
                                  { id: 'Below 60', label: 'Below 60%' }
                                ].map(opt => (
                                  <button
                                    key={opt.id}
                                    onClick={() => {
                                      handleTapSound();
                                      setMarksRange(opt.id);
                                    }}
                                    className={`p-3 border text-center font-mono text-xs font-bold rounded-xl ${
                                      marksRange === opt.id 
                                        ? 'bg-blue-600 border-blue-500 text-white' 
                                        : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white'
                                    }`}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={exactMarks}
                                onChange={(e) => setExactMarks(e.target.value)}
                                placeholder="Enter exact percentage (e.g. 88)..."
                                className="w-full bg-slate-950 border border-slate-800 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 outline-none rounded-xl text-sm font-bold font-mono"
                              />
                            )}
                          </div>

                          {/* Academic Confidence */}
                          <div className="space-y-3 flex flex-col justify-between">
                            <div>
                              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                                Academic Confidence Rating
                              </label>
                              <p className="text-[10px] text-slate-500 font-mono mt-0.5">Rate how comfortable you are learning new scientific concepts.</p>
                            </div>

                            <div className="space-y-2">
                              <input
                                type="range"
                                min="1"
                                max="5"
                                step="1"
                                value={academicConfidence}
                                onChange={(e) => {
                                  handleTapSound();
                                  setAcademicConfidence(parseInt(e.target.value));
                                }}
                                className="w-full h-2 bg-slate-950 border border-slate-850 rounded-lg appearance-none cursor-pointer accent-blue-500"
                              />
                              <div className="flex justify-between items-center text-xs font-mono">
                                <span className="text-slate-500">Foundational explorer</span>
                                <span className="px-2.5 py-0.5 bg-blue-900/30 text-blue-400 border border-blue-800 text-xxs font-bold rounded">
                                  Level {academicConfidence} / 5
                                </span>
                                <span className="text-slate-500">Advanced Researcher</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation button */}
              <div className="flex justify-between pt-6 border-t border-slate-800">
                <button
                  onClick={() => {
                    handleTapSound();
                    if (academicStep === 0) {
                      navigateStage('welcome');
                    } else {
                      setAcademicStep(prev => prev - 1);
                    }
                  }}
                  className="flex items-center gap-2 px-5 py-3 border border-slate-800 hover:bg-slate-950 text-slate-400 hover:text-white rounded-xl transition-all font-mono text-xs"
                >
                  <ArrowLeft className="w-4 h-4" /> BACK
                </button>

                {academicStep < 2 ? (
                  <button
                    onClick={() => {
                      handleTapSound();
                      setAcademicStep(prev => prev + 1);
                    }}
                    disabled={
                      (academicStep === 0 && (!explorerName.trim() || !educationLevel)) ||
                      (academicStep === 1 && (!academicStream || favoriteSubjects.length === 0))
                    }
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-550 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] text-xs uppercase tracking-wide"
                  >
                    CONTINUE STEPS <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={submitAcademicStage}
                    disabled={loading || (marksType === 'exact' ? !exactMarks : !marksRange)}
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] text-sm uppercase tracking-wide"
                  >
                    {loading ? 'STORING CALIBRATION...' : 'PROCEED TO SKILL DISCOVERY'} <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Phase 2: Skill Discovery */}
          {stage === 'skills_discovery' && (
            <motion.div
              key="skills_discovery"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-xl relative overflow-hidden"
            >
              {/* Stepper HUD */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center font-mono text-sm">02</span>
                  <div>
                    <h3 className="font-bold text-white uppercase text-sm leading-none font-mono">COGNITIVE SIMULATION</h3>
                    <span className="text-[10px] text-slate-500 font-mono uppercase">
                      SCENARIO {currentMoment + 1} OF 3 // {
                        currentMoment === 0 ? 'SYSTEMS CRASH ALLOCATION' :
                        currentMoment === 1 ? 'MONOLITHIC DEADLOCK DEBATE' :
                        'ORBITAL DEBRIS INTERCEPT'
                      }
                    </span>
                  </div>
                </div>
                <div className="w-24 bg-slate-850 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentMoment + 1) / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* SIMULATION SCENARIO 1: SYSTEMS CRASH */}
              {currentMoment === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column: Context Premise */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="p-6 bg-slate-950 border border-slate-900 rounded-2xl space-y-3 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-slate-700">GRID POWER DEPLOYMENT</div>
                        <span className="inline-block px-2.5 py-0.5 bg-rose-900/30 text-rose-400 border border-rose-800 text-[10px] font-mono font-bold rounded">
                          SECTOR: DISTRIBUTED SERVICES
                        </span>
                        <h4 className="text-xl font-black text-white font-mono uppercase leading-snug">
                          CORE SYSTEM OVERLOAD
                        </h4>
                        <p className="text-slate-400 text-xs font-mono leading-relaxed">
                          A sudden traffic spike has overloaded our microservice grid. You have exactly <span className="text-indigo-400 font-bold">3 battery reserve blocks</span> to distribute among 5 systems. Optimize your distribution to stabilise systems.
                        </p>
                      </div>

                      {/* Interactive Sliders */}
                      <div className="space-y-4 bg-slate-950/40 p-6 border border-slate-900 rounded-2xl">
                        <div className="flex justify-between items-center text-xs font-mono uppercase font-bold text-slate-400 mb-2">
                          <span>Microservice Grid</span>
                          <span className={`px-2 py-0.5 rounded ${
                            Object.values(systemsCrash).reduce((a, b) => a + b, 0) === 3
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}>
                            Allocated: {Object.values(systemsCrash).reduce((a, b) => a + b, 0)} / 3 blocks
                          </span>
                        </div>

                        {['auth', 'db', 'gateway', 'analytics', 'ui'].map((service) => {
                          const val = systemsCrash[service] || 0;
                          return (
                            <div 
                              key={service} 
                              className="space-y-1 bg-slate-950/80 p-3.5 border border-slate-900 rounded-xl transition-all hover:border-slate-800"
                              onMouseEnter={() => handleHoverElement(`Scenario1_Slider_${service}`)}
                            >
                              <div className="flex justify-between items-center text-[11px] font-mono uppercase">
                                <span className="text-slate-300 font-bold">{service} Service</span>
                                <span className="text-indigo-400 font-black">{val} Reserve Blocks</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="3"
                                step="1"
                                value={val}
                                onChange={(e) => {
                                  const currentSumWithoutService = Object.entries(systemsCrash)
                                    .filter(([k]) => k !== service)
                                    .reduce((sum, [_, val]) => sum + val, 0);
                                  const maxAllowed = 3 - currentSumWithoutService;
                                  const clampedValue = Math.min(parseInt(e.target.value) || 0, maxAllowed);
                                  setSystemsCrash(prev => ({ ...prev, [service]: clampedValue }));
                                  handleTapSound();
                                }}
                                className="w-full h-1 bg-slate-900 border border-slate-800 rounded appearance-none cursor-pointer accent-indigo-500"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: Ingestion Data Drawer */}
                    <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl space-y-4">
                      <h5 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider border-b border-slate-900 pb-2">
                        📡 Bandwidth Ingestion Drawer
                      </h5>
                      <div className="space-y-3 font-mono text-xxs leading-relaxed text-slate-400">
                        <p>Telemetry stats show current ingress rates under full load:</p>
                        <div className="space-y-2 pt-2">
                          <div className="flex justify-between items-center border-b border-slate-900 pb-1">
                            <span>🔐 AUTH SERVICE</span>
                            <span className="text-slate-200">120 GB/s</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-slate-900 pb-1">
                            <span>🗄️ DATABASE SYSTEM</span>
                            <span className="text-slate-200 font-bold text-indigo-400">200 GB/s</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-slate-900 pb-1">
                            <span>🔌 API GATEWAY</span>
                            <span className="text-slate-200">90 GB/s</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-slate-900 pb-1">
                            <span>📊 ANALYTICS RUNNER</span>
                            <span className="text-slate-200">150 GB/s</span>
                          </div>
                          <div className="flex justify-between items-center pb-1">
                            <span>🖥️ USER INTERFACE</span>
                            <span className="text-slate-200">50 GB/s</span>
                          </div>
                        </div>
                        
                        <div className={`p-3 rounded-lg border text-center font-bold text-[10px] mt-4 uppercase transition-all ${
                          Object.values(systemsCrash).reduce((a, b) => a + b, 0) === 3
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400'
                            : 'bg-amber-950/20 border-amber-500/30 text-amber-400 animate-pulse'
                        }`}>
                          {Object.values(systemsCrash).reduce((a, b) => a + b, 0) === 3
                            ? '✓ Allocation Stabilized'
                            : '⚡ Allocation Calibrating...'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SIMULATION SCENARIO 2: THE MONOLITHIC DEADLOCK */}
              {currentMoment === 1 && (
                <div className="space-y-6">
                  {/* Subtle Ambient Progress Bar Timer */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900 z-10 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                      style={{ width: `${timerPercentage}%` }}
                    ></div>
                  </div>

                  <div className="p-6 bg-slate-950 border border-slate-900 rounded-2xl space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-slate-700">AMBIENT RUNTIME LIMIT</div>
                    <span className="inline-block px-2.5 py-0.5 bg-amber-900/30 text-amber-400 border border-amber-800 text-[10px] font-mono font-bold rounded">
                      SECTOR: DESTRUCTIVE CASCADE
                    </span>
                    <h4 className="text-xl font-black text-white font-mono uppercase leading-snug">
                      THE MONOLITHIC DEADLOCK
                    </h4>
                    <p className="text-slate-400 text-xs font-mono leading-relaxed">
                      A legacy monolith has deadlocked during a traffic spike. Transactions are failing globally. The linear database locks are cascading. Choose your architectural resolution path.
                    </p>
                  </div>

                  {/* Chaotic Alert Banner Trigger */}
                  <AnimatePresence>
                    {chaoticTriggered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, scale: 0.95 }}
                        animate={{ opacity: 1, height: 'auto', scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.95 }}
                        className="p-4 bg-red-950/40 border border-red-500/40 text-red-300 font-mono text-xs rounded-xl flex items-center gap-3 shadow-[0_0_20px_rgba(239,68,68,0.2)] animate-pulse"
                      >
                        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                        <div>
                          <span className="font-bold block text-red-400 uppercase tracking-wider">⚠️ CASCADE CRITICAL ERROR DETECTED</span>
                          <span className="text-[10px]">TRANSACTION RETRIES EXHAUSTED. REDIS QUEUE BUFFER IS FLUSHING! STABILITY DECREASING.</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Options List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Option A */}
                    <button
                      onClick={() => handleSelectDeadlockOption('A')}
                      onMouseEnter={() => handleHoverElement('Scenario2_OptionA')}
                      className={`p-6 border text-left rounded-2xl transition-all flex flex-col justify-between h-48 relative ${
                        monolithicDeadlock === 'A'
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                          : 'bg-slate-950 border-slate-900 text-slate-300 hover:text-white hover:border-slate-800'
                      } ${chaoticTriggered && monolithicDeadlock !== 'A' ? 'border-red-900/30' : ''}`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className={`w-8 h-8 border flex items-center justify-center font-mono font-bold text-sm rounded-lg ${
                          monolithicDeadlock === 'A' ? 'bg-white text-indigo-600 border-white' : 'bg-slate-900 border-slate-850 text-slate-500'
                        }`}>
                          A
                        </span>
                        
                        {chaoticTriggered && (
                          <span className="px-2 py-0.5 bg-red-900/40 text-red-400 border border-red-800 text-[8px] font-mono uppercase font-black tracking-wide rounded">
                            ⚠️ LATENCY CRITICAL
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="font-mono text-xs uppercase font-bold block">
                          Refactor Monolith DB Pools
                        </span>
                        <p className={`text-[10px] leading-relaxed ${monolithicDeadlock === 'A' ? 'text-indigo-100' : 'text-slate-500'}`}>
                          Optimize transaction queue configurations and connections pool limits to resolve locks sequentially.
                        </p>
                      </div>
                    </button>

                    {/* Option B */}
                    <button
                      onClick={() => handleSelectDeadlockOption('B')}
                      onMouseEnter={() => handleHoverElement('Scenario2_OptionB')}
                      className={`p-6 border text-left rounded-2xl transition-all flex flex-col justify-between h-48 relative ${
                        monolithicDeadlock === 'B'
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                          : 'bg-slate-950 border-slate-900 text-slate-300 hover:text-white hover:border-slate-800'
                      } ${chaoticTriggered && monolithicDeadlock !== 'B' ? 'shadow-[0_0_15px_rgba(245,158,11,0.15)] border-amber-500/30' : ''}`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className={`w-8 h-8 border flex items-center justify-center font-mono font-bold text-sm rounded-lg ${
                          monolithicDeadlock === 'B' ? 'bg-white text-indigo-600 border-white' : 'bg-slate-900 border-slate-850 text-slate-500'
                        }`}>
                          B
                        </span>
                        
                        {chaoticTriggered && (
                          <span className="px-2 py-0.5 bg-amber-950 text-amber-400 border border-amber-800 text-[8px] font-mono uppercase font-black tracking-wide rounded animate-pulse">
                            ⚡ RECOMMENDED DECOUPLE
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="font-mono text-xs uppercase font-bold block">
                          Microservices decoupling
                        </span>
                        <p className={`text-[10px] leading-relaxed ${monolithicDeadlock === 'B' ? 'text-indigo-100' : 'text-slate-500'}`}>
                          Decouple locks by partitioning transactions into modular fallback queue runners instantly.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* SIMULATION SCENARIO 3: ORBITAL DEBRIS INTERCEPT */}
              {currentMoment === 2 && (
                <div className="space-y-6">
                  {/* Context Text Box with highlight triggers */}
                  <div 
                    onMouseUp={handleTextHighlight}
                    className="p-6 bg-slate-950 border border-slate-900 rounded-2xl space-y-3 relative overflow-hidden select-text"
                  >
                    <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-slate-700">HIGHLIGHT TARGET telemetry</div>
                    <span className="inline-block px-2.5 py-0.5 bg-cyan-900/30 text-cyan-400 border border-cyan-800 text-[10px] font-mono font-bold rounded">
                      SECTOR: ORBITAL DEFENSE
                    </span>
                    <h4 className="text-xl font-black text-white font-mono uppercase leading-snug">
                      ORBITAL DEBRIS INTERCEPT
                    </h4>
                    <p className="text-slate-400 text-xs font-mono leading-relaxed">
                      A decommissioned satellite has deviated from its trajectory, threatening the communications array. You have milliseconds to intercept or reroute. <span className="text-cyan-400 font-bold border-b border-dashed border-cyan-800 cursor-help" title="Double click or select text to analyze parameters">Highlight the telemetry readings</span> to parse target coordinates and align resolution options:
                    </p>
                    <div className="p-4 bg-slate-900/80 border border-slate-850 text-cyan-400 font-mono text-xxs tracking-wider uppercase rounded-xl leading-relaxed">
                      "Telemetry coordinates locked: Swarm velocity 7,800m/s. Debris Mass Index: 4.2MT. Target coordinates [X: 412.92, Y: 890.11, Z: 12.05]. Communications channel: LOCKED/ACTIVE."
                    </div>
                  </div>

                  {/* 4 resolution options in a 2x2 grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { key: 'A', title: 'Electromagnetic Tether', desc: 'Deploy a physical magnetic wire to hook and capture debris. Focus: Creativity.' },
                      { key: 'B', title: 'Booster Engine Burn', desc: 'Perform a hyper-directional burst to shift communication satellites. Focus: Decision Making.' },
                      { key: 'C', title: 'Dynamic Rerouting', desc: 'Re-compute telemetry orbit vectors to redirect routing nodes. Focus: Logic.' },
                      { key: 'D', title: 'Diagnostic Vaporisation', desc: 'Use high-intensity laser pulses to target micro-debris particles. Focus: Problem Solving.' }
                    ].map(opt => {
                      const isSelected = orbitalDebris === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectDebrisOption(opt.key)}
                          onMouseEnter={() => handleHoverElement(`Scenario3_Option_${opt.key}`)}
                          className={`p-5 border text-left rounded-xl transition-all flex items-start gap-4 ${
                            isSelected 
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.25)]' 
                              : 'bg-slate-950 border-slate-900 text-slate-300 hover:text-white hover:border-slate-850'
                          }`}
                        >
                          <span className={`w-6 h-6 border flex items-center justify-center font-mono font-bold text-xs rounded ${
                            isSelected ? 'bg-white text-indigo-600 border-white' : 'bg-slate-900 border-slate-850 text-slate-500'
                          }`}>
                            {opt.key}
                          </span>
                          <div className="space-y-0.5">
                            <span className="font-mono text-xs uppercase font-bold block">
                              {opt.title}
                            </span>
                            <span className={`text-[10px] leading-normal block ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                              {opt.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Mini-Controls */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-800">
                <button
                  onClick={() => {
                    handleTapSound();
                    if (currentMoment > 0) {
                      setCurrentMoment(currentMoment - 1);
                      resetMomentTimer();
                    } else {
                      navigateStage('academic_intel');
                    }
                  }}
                  className="flex items-center gap-2 px-5 py-3 border border-slate-800 hover:bg-slate-950 text-slate-400 hover:text-white rounded-xl transition-all font-mono text-xs"
                >
                  <ArrowLeft className="w-4 h-4" /> BACK
                </button>

                {currentMoment < 2 ? (
                  <button
                    onClick={() => {
                      handleTapSound();
                      setCurrentMoment(currentMoment + 1);
                      resetMomentTimer();
                    }}
                    disabled={
                      (currentMoment === 0 && Object.values(systemsCrash).reduce((sum, v) => sum + v, 0) !== 3) ||
                      (currentMoment === 1 && !monolithicDeadlock)
                    }
                    className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-550 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all font-mono text-xs font-bold uppercase shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                  >
                    NEXT SCENARIO <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={submitSkillsStage}
                    disabled={loading || !orbitalDebris}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all font-mono text-xs font-bold uppercase shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                  >
                    {loading ? 'ANALYZING PROFILE...' : 'CALIBRATE SKILLS →'}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Phase 3: Career Lifestyle Mapping */}
          {stage === 'lifestyle_mapping' && (
            <motion.div
              key="lifestyle_mapping"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-xl"
            >
              {/* Stepper HUD */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold flex items-center justify-center font-mono text-sm">03</span>
                  <div>
                    <h3 className="font-bold text-white uppercase text-sm leading-none font-mono">CAREER LIFESTYLE MAPPING</h3>
                    <span className="text-[10px] text-slate-500 font-mono">STAGE 3 OF 3 // LIFE OBJECTIVES</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">STEP {lifestyleStep + 1} OF 3</span>
                  <div className="w-24 bg-slate-850 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="h-full bg-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${((lifestyleStep + 1) / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="min-h-[350px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lifestyleStep}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* STEP 0: Preferred Work Environments */}
                    {lifestyleStep === 0 && (
                      <div className="space-y-3">
                        <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                          Preferred Work Environments (Select multiple)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            { id: 'Corporate Office', icon: '🏢' },
                            { id: 'Research Lab', icon: '🔬' },
                            { id: 'Hospital', icon: '🏥' },
                            { id: 'Startup', icon: '🚀' },
                            { id: 'Government Office', icon: '🏛️' },
                            { id: 'Creative Studio', icon: '🎨' },
                            { id: 'Remote Work', icon: '💻' },
                            { id: 'Field-Based Work', icon: '🧭' }
                          ].map(env => {
                            const isSelected = preferredEnvironments.includes(env.id);
                            return (
                              <button
                                key={env.id}
                                onClick={() => {
                                  handleTapSound();
                                  if (isSelected) {
                                    setPreferredEnvironments(preferredEnvironments.filter(e => e !== env.id));
                                  } else {
                                    setPreferredEnvironments([...preferredEnvironments, env.id]);
                                  }
                                }}
                                className={`p-4 border transition-all rounded-xl flex flex-col justify-between items-start h-24 ${
                                  isSelected 
                                    ? 'bg-purple-600 border-purple-500 text-white font-bold' 
                                    : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
                                }`}
                              >
                                <span className="text-2xl">{env.icon}</span>
                                <span className="font-mono text-xs uppercase leading-none mt-2 text-left">{env.id}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 1: Higher Education & Study / Work Location */}
                    {lifestyleStep === 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Higher Studies Ambition
                          </label>
                          <div className="flex gap-2">
                            <button
                              onClick={() => { handleTapSound(); setHigherEducation(true); }}
                              className={`flex-1 p-3 border font-mono text-xs font-bold rounded-xl ${
                                higherEducation 
                                  ? 'bg-purple-600 border-purple-500 text-white' 
                                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white'
                              }`}
                            >
                              YES, EXCEL
                            </button>
                            <button
                              onClick={() => { handleTapSound(); setHigherEducation(false); }}
                              className={`flex-1 p-3 border font-mono text-xs font-bold rounded-xl ${
                                !higherEducation 
                                  ? 'bg-purple-600 border-purple-500 text-white' 
                                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white'
                              }`}
                            >
                              NO, ENTER JOBS
                            </button>
                          </div>
                        </div>

                        {higherEducation && (
                          <div className="space-y-3">
                            <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                              Higher Study Location
                            </label>
                            <select
                              value={studyLocation}
                              onChange={(e) => { handleTapSound(); setStudyLocation(e.target.value); }}
                              className="w-full bg-slate-950 border border-slate-900 text-white font-mono text-xs font-bold uppercase tracking-wider px-4 py-3.5 outline-none rounded-xl cursor-pointer focus:border-purple-500 transition-colors"
                            >
                              <option value="Within home state">Within home state</option>
                              <option value="Outside state, but in India">Outside state</option>
                              <option value="Elsewhere in India">Elsewhere in India</option>
                              <option value="Abroad">Abroad (Global universities)</option>
                            </select>
                          </div>
                        )}

                        <div className="space-y-3">
                          <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Work Abroad Ambition
                          </label>
                          <div className="flex gap-2">
                            <button
                              onClick={() => { handleTapSound(); setWorkAbroad(true); }}
                              className={`flex-1 p-3 border font-mono text-xs font-bold rounded-xl ${
                                workAbroad 
                                  ? 'bg-purple-600 border-purple-500 text-white' 
                                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white'
                              }`}
                            >
                              YES, ASPIRE
                            </button>
                            <button
                              onClick={() => { handleTapSound(); setWorkAbroad(false); }}
                              className={`flex-1 p-3 border font-mono text-xs font-bold rounded-xl ${
                                !workAbroad 
                                  ? 'bg-purple-600 border-purple-500 text-white' 
                                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white'
                              }`}
                            >
                              STAY IN INDIA
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Lifestyle priorities & Career sector calibrations */}
                    {lifestyleStep === 2 && (
                      <div className="space-y-6">
                        {/* Lifestyle priority cards */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                              Core Lifestyle Priorities (Select exactly 3 cards)
                            </label>
                            <span className="text-[10px] text-purple-400 font-mono">
                              {lifestylePriorities.length} / 3 Selected
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {[
                              'Work-life Balance', 'Job Security', 'Leadership Opportunities', 
                              'Innovation', 'Social Impact', 'Financial Growth', 
                              'Flexibility', 'Long-term Stability'
                            ].map(item => {
                              const isSelected = lifestylePriorities.includes(item);
                              return (
                                <button
                                  key={item}
                                  onClick={() => {
                                    handleTapSound();
                                    if (isSelected) {
                                      setLifestylePriorities(lifestylePriorities.filter(i => i !== item));
                                    } else {
                                      if (lifestylePriorities.length < 3) {
                                        setLifestylePriorities([...lifestylePriorities, item]);
                                      }
                                    }
                                  }}
                                  className={`p-4 border transition-all rounded-xl font-mono text-xs uppercase flex items-center justify-between text-left ${
                                    isSelected 
                                      ? 'bg-purple-600 border-purple-500 text-white font-bold' 
                                      : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
                                  }`}
                                >
                                  <span>{item}</span>
                                  {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-1" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Career sector sliders */}
                        <div className="space-y-4 border-t border-slate-900 pt-6">
                          <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Career Sector Interest Calibrations
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              { key: 'government', label: 'Government & Civil Jobs' },
                              { key: 'private', label: 'Private Corporate & Tech' },
                              { key: 'entrepreneurship', label: 'Entrepreneurship & Startups' },
                              { key: 'research', label: 'Scientific Academic Research' },
                              { key: 'freelancing', label: 'Freelancing & Independent Gig' },
                              { key: 'emergingTech', label: 'Emerging Advanced Tech Fields' }
                            ].map(slider => (
                              <div key={slider.key} className="bg-slate-950 border border-slate-900 p-4 rounded-xl space-y-2">
                                <div className="flex justify-between items-center text-xs font-mono uppercase font-bold">
                                  <span className="text-slate-300">{slider.label}</span>
                                  <span className="text-purple-400">{careerTypeSliders[slider.key]}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={careerTypeSliders[slider.key]}
                                  onChange={(e) => {
                                    setCareerTypeSliders({
                                      ...careerTypeSliders,
                                      [slider.key]: parseInt(e.target.value)
                                    });
                                  }}
                                  className="w-full h-1.5 bg-slate-900 border border-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mini-controls */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-800">
                <button
                  onClick={() => {
                    handleTapSound();
                    if (lifestyleStep === 0) {
                      navigateStage('skills_discovery');
                      setCurrentMoment(2);
                    } else {
                      setLifestyleStep(prev => prev - 1);
                    }
                  }}
                  className="flex items-center gap-2 px-5 py-3 border border-slate-800 hover:bg-slate-950 text-slate-400 hover:text-white rounded-xl transition-all font-mono text-xs"
                >
                  <ArrowLeft className="w-4 h-4" /> BACK
                </button>

                {lifestyleStep < 2 ? (
                  <button
                    onClick={() => {
                      handleTapSound();
                      setLifestyleStep(prev => prev + 1);
                    }}
                    disabled={
                      lifestyleStep === 0 && preferredEnvironments.length === 0
                    }
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-550 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] text-xs uppercase tracking-wide"
                  >
                    CONTINUE STEPS <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={submitLifestyleStage}
                    disabled={loading || preferredEnvironments.length === 0 || lifestylePriorities.length < 3}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all font-mono text-xs font-bold uppercase shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  >
                    {loading ? 'FINALIZING...' : 'COMPILE INTEL ENGINE →'}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Phase 4: Dynamic Synthesis Spinner */}
          {stage === 'synthesis' && (
            <motion.div
              key="synthesis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-12 text-center space-y-8 flex flex-col items-center justify-center shadow-xl"
            >
              <div className="relative flex items-center justify-center w-36 h-36">
                <div className="animate-spin rounded-full h-full w-full border-8 border-slate-800 border-t-blue-500 absolute"></div>
                <div className="rounded-full h-28 w-28 bg-slate-950 flex flex-col items-center justify-center text-white border border-slate-850 shadow-inner">
                  <Brain className="w-10 h-10 text-blue-400 animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-mono tracking-widest text-white uppercase">SYNCHRONIZING CAREER INTELLIGENCE</h3>
                <p className="text-slate-500 max-w-sm mx-auto text-xxs font-mono uppercase leading-relaxed">
                  Mapping educational stream cutoff baselines, indexing logic and analytical scores, parsing lifestyle slider inputs, and structuring learning courses...
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
};

export default AssessmentPage;
