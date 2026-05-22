import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { audioSynth } from '../utils/audioSynth';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

const AssessmentPage = () => {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();

  // Onboarding Phase state: 'welcome' -> 'identity' -> 'interest_choice' -> 'direct_interests' | 'scenarios' -> 'skills_game' -> 'mindset' -> 'synthesis' -> 'results'
  const [phase, setPhase] = useState('welcome');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState(user?.displayName || '');
  const [educationStage, setEducationStage] = useState('');
  
  // Academic Journey State Variables
  const [academicStream, setAcademicStream] = useState('');
  const [favoriteSubjects, setFavoriteSubjects] = useState([]);
  const [marksRange, setMarksRange] = useState('');
  const [academicConfidence, setAcademicConfidence] = useState(3);
  const [selectionOrder, setSelectionOrder] = useState([]);
  const [changesOfMind, setChangesOfMind] = useState(0);
  
  // Latency & Metrics Tracking
  const phaseStartTime = useRef(Date.now());
  const resetPhaseTime = () => {
    phaseStartTime.current = Date.now();
  };

  // Sound Engine activation state
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 1. Direct Interests choice
  const availableInterests = [
    { name: 'Technology', desc: 'Software engineering, hardware, and coding', icon: '💻' },
    { name: 'AI & Future Tech', desc: 'Neural networks, automation, robotics', icon: '🤖' },
    { name: 'Creative Arts', desc: 'Digital painting, creative writing, music production', icon: '🎨' },
    { name: 'Design', desc: 'User experience design, graphics, architecture', icon: '📐' },
    { name: 'Business', desc: 'Marketing, sales, entrepreneurship, and economics', icon: '📈' },
    { name: 'Leadership', desc: 'Public speaking, organization management, strategy', icon: '👑' },
    { name: 'Science', desc: 'Physics, biology, space exploration research', icon: '🔬' },
    { name: 'Problem Solving', desc: 'Algorithms, mathematical modeling, analytics', icon: '🧩' },
    { name: 'Gaming', desc: 'Game development, virtual worlds, e-sports', icon: '🎮' }
  ];
  const [selectedInterests, setSelectedInterests] = useState([]);

  // 2. Scenario-based Interests Diagnostic (Simplified everyday relatable scenarios)
  const scenarios = [
    {
      id: 1,
      title: 'Planning a Hangout',
      question: 'Your friends are planning a weekend hangout but cannot agree on what to do. What role do you naturally assume?',
      options: [
        { text: 'Suggesting a cool arcade, virtual reality arena, or setting up a shared online music playlist.', interest: 'Technology', value: 'A' },
        { text: 'Choosing a spot with the best visual aesthetic and making a customized digital invite for the group.', interest: 'Design', value: 'B' },
        { text: 'Taking charge of the chat, organizing the transport, and making sure everyone is included and on time.', interest: 'Leadership', value: 'C' },
        { text: 'Comparing budgets, analyzing travel distances, and selecting the most efficient, logical location.', interest: 'Problem Solving', value: 'D' }
      ]
    },
    {
      id: 2,
      title: 'Choosing a Game',
      question: 'Your friends decide to play a game together. What kind of game do you advocate for?',
      options: [
        { text: 'A technical game with cool building mechanics, sci-fi systems, or coding features like Minecraft.', interest: 'Technology', value: 'A' },
        { text: 'A highly visual game where you customize characters, build beautiful houses, or style environments.', interest: 'Design', value: 'B' },
        { text: 'A team strategy game where you can lead your squad, call out tactics, and win as a coordinated unit.', interest: 'Leadership', value: 'C' },
        { text: 'A tactical puzzle game, chess, or a tricky logic quiz game that challenges your reasoning.', interest: 'Problem Solving', value: 'D' }
      ]
    },
    {
      id: 3,
      title: 'The Charity Bake Sale',
      question: 'Your club is hosting a charity bake sale. Which job do you eagerly raise your hand for?',
      options: [
        { text: 'Setting up the digital payment QR codes and managing the live online sales tracking spreadsheet.', interest: 'Technology', value: 'A' },
        { text: 'Designing beautiful poster banners, frosting the pastries artistically, and arranging the display table.', interest: 'Design', value: 'B' },
        { text: 'Greeting customers, running the checkout register, and coordinating shifts for all other volunteers.', interest: 'Business', value: 'C' },
        { text: 'Calculating the recipe costs against pricing to ensure you raise the maximum possible donation.', interest: 'Problem Solving', value: 'D' }
      ]
    },
    {
      id: 4,
      title: 'The Cafeteria Queue',
      question: 'The school cafeteria queue is extremely slow every day. How would you solve this daily bottleneck?',
      options: [
        { text: 'Proposing a simple mobile pre-ordering web page so students can select their meals in advance.', interest: 'Technology', value: 'A' },
        { text: 'Redesigning the cafeteria queue layout with clear color-coded floor arrows and visual signage.', interest: 'Design', value: 'B' },
        { text: 'Organizing a student helper brigade to guide students, hand out trays early, and coordinate lines.', interest: 'Leadership', value: 'C' },
        { text: 'Analyzing service times at different counters to find where workers should be logically reallocated.', interest: 'Problem Solving', value: 'D' }
      ]
    }
  ];
  
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [scenarioAnswers, setScenarioAnswers] = useState([]);

  // Question bank: 24 questions across 3 fields (Logical, Technical, Analytical)
  const logicalQuestions = [
    { id: 'log1', field: 'logical', question: 'If all ducks are yellow, and a toy is not yellow, is the toy a duck?', options: [{ val: 'A', text: 'Yes, it is a duck.' }, { val: 'B', text: 'No, it is not a duck.' }, { val: 'C', text: 'It is impossible to determine.' }], correctAnswer: 'B' },
    { id: 'log2', field: 'logical', question: 'Decipher the missing number in this sequence: 3, 6, 12, 24, [ ? ]', options: [{ val: 'A', text: '30' }, { val: 'B', text: '36' }, { val: 'C', text: '48' }, { val: 'D', text: '40' }], correctAnswer: 'C' },
    { id: 'log3', field: 'logical', question: 'If a clock strikes 6 times in 5 seconds, how many times will it strike in 10 seconds?', options: [{ val: 'A', text: '12 times' }, { val: 'B', text: '11 times' }, { val: 'C', text: '10 times' }, { val: 'D', text: '9 times' }], correctAnswer: 'B' },
    { id: 'log4', field: 'logical', question: 'All apples are fruits. Some fruits are sweet. Therefore, are some apples sweet?', options: [{ val: 'A', text: 'Yes, absolutely' }, { val: 'B', text: 'No, definitely not' }, { val: 'C', text: 'Not necessarily true' }], correctAnswer: 'C' },
    { id: 'log5', field: 'logical', question: 'A is older than B. C is older than A. B is older than C. Is this statement logically consistent?', options: [{ val: 'A', text: 'Yes' }, { val: 'B', text: 'No' }, { val: 'C', text: 'Needs more information' }], correctAnswer: 'B' },
    { id: 'log6', field: 'logical', question: 'What comes next in the letter sequence: A, C, F, J, [ ? ]', options: [{ val: 'A', text: 'O' }, { val: 'B', text: 'N' }, { val: 'C', text: 'P' }, { val: 'D', text: 'M' }], correctAnswer: 'A' },
    { id: 'log7', field: 'logical', question: 'If a turtle travels at 5m/hour, and a snail travels at 3m/hour, how far apart are they after 3 hours if they crawl in opposite directions?', options: [{ val: 'A', text: '15 meters' }, { val: 'B', text: '9 meters' }, { val: 'C', text: '24 meters' }, { val: 'D', text: '18 meters' }], correctAnswer: 'C' },
    { id: 'log8', field: 'logical', question: 'Which word does NOT belong with the others: Pear, Apple, Potato, Banana, Grape?', options: [{ val: 'A', text: 'Pear' }, { val: 'B', text: 'Potato' }, { val: 'C', text: 'Grape' }, { val: 'D', text: 'Banana' }], correctAnswer: 'B' }
  ];

  const technicalQuestions = [
    { id: 'tech1', field: 'technical', question: 'A logic gate outputs TRUE only when BOTH of its inputs are FALSE. What kind of logic gate is this?', options: [{ val: 'A', text: 'AND Gate' }, { val: 'B', text: 'OR Gate' }, { val: 'C', text: 'NOR Gate' }, { val: 'D', text: 'NAND Gate' }], correctAnswer: 'C' },
    { id: 'tech2', field: 'technical', question: 'You write a loop that starts at 1, doubles the number at each step, and stops when the number exceeds 50. How many times does the loop run?', options: [{ val: 'A', text: '5 times' }, { val: 'B', text: '6 times' }, { val: 'C', text: '7 times' }, { val: 'D', text: '8 times' }], correctAnswer: 'B' },
    { id: 'tech3', field: 'technical', question: 'A heavy supply transport carrying critical server racks is exactly 1 inch too tall to pass under a concrete bridge. How do you cross within 60 seconds without unloading?', options: [{ val: 'A', text: 'Deflate the tires slightly to lower the vehicle clearance.' }, { val: 'B', text: 'Drive fast to force it under.' }, { val: 'C', text: 'Take off the roof rack using heavy machinery.' }], correctAnswer: 'A' },
    { id: 'tech4', field: 'technical', question: 'A system has three servers. Server A can process 10 req/s, B can process 20 req/s, and C can process 30 req/s. If working together, how long to process 120 requests?', options: [{ val: 'A', text: '2 seconds' }, { val: 'B', text: '3 seconds' }, { val: 'C', text: '4 seconds' }, { val: 'D', text: '6 seconds' }], correctAnswer: 'A' },
    { id: 'tech5', field: 'technical', question: 'What is the primary function of a router in a computer network?', options: [{ val: 'A', text: 'To store databases.' }, { val: 'B', text: 'To direct data packets to their destination.' }, { val: 'C', text: 'To display web pages on a monitor.' }], correctAnswer: 'B' },
    { id: 'tech6', field: 'technical', question: 'If a computer program keeps repeating the same task forever without stopping, it is experiencing:', options: [{ val: 'A', text: 'A buffer overflow' }, { val: 'B', text: 'An infinite loop' }, { val: 'C', text: 'A syntax error' }, { val: 'D', text: 'A compile failure' }], correctAnswer: 'B' },
    { id: 'tech7', field: 'technical', question: 'To find a specific word in an alphabetical dictionary, which approach is technically the fastest?', options: [{ val: 'A', text: 'Reading page-by-page from the front.' }, { val: 'B', text: 'Opening the middle, splitting the dictionary, and repeating on that half.' }, { val: 'C', text: 'Scanning random pages until you find it.' }], correctAnswer: 'B' },
    { id: 'tech8', field: 'technical', question: 'Which of the following represents a secure way to store a user\'s password in a database?', options: [{ val: 'A', text: 'Save it as plain text.' }, { val: 'B', text: 'Save it as a cryptographically hashed value.' }, { val: 'C', text: 'Save it inside an unencrypted text file.' }], correctAnswer: 'B' }
  ];

  const analyticalQuestions = [
    { id: 'anal1', field: 'analytical', question: 'Your colony requires at least 15W of backup grid voltage. Grid A requires twice Grid B, and Grid C requires exactly 3W. How much voltage do you supply Grid A and B to exactly hit 15W? [A + B + C = 15W, C = 3W, A = 2B]', options: [{ val: 'A', text: 'A = 8W, B = 4W' }, { val: 'B', text: 'A = 6W, B = 3W' }, { val: 'C', text: 'A = 10W, B = 5W' }], correctAnswer: 'A' },
    { id: 'anal2', field: 'analytical', question: 'If a store offers a "Buy 2 Get 1 Free" deal, what is the effective percentage discount on three items?', options: [{ val: 'A', text: '50% off' }, { val: 'B', text: '33.3% off' }, { val: 'C', text: '25% off' }, { val: 'D', text: '20% off' }], correctAnswer: 'B' },
    { id: 'anal3', field: 'analytical', question: 'A container is filled with bacteria. The bacteria doubles in volume every minute. If it takes 60 minutes to fill it completely, when was it half full?', options: [{ val: 'A', text: '30 minutes' }, { val: 'B', text: '45 minutes' }, { val: 'C', text: '59 minutes' }, { val: 'D', text: '58 minutes' }], correctAnswer: 'C' },
    { id: 'anal4', field: 'analytical', question: 'If 5 machines take 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?', options: [{ val: 'A', text: '100 minutes' }, { val: 'B', text: '50 minutes' }, { val: 'C', text: '5 minutes' }, { val: 'D', text: '20 minutes' }], correctAnswer: 'C' },
    { id: 'anal5', field: 'analytical', question: 'A project requires three phases: Research (3 days), Writing (4 days), and Review (2 days). Writing starts after Research, and Review starts after Writing. Minimum project duration?', options: [{ val: 'A', text: '7 days' }, { val: 'B', text: '9 days' }, { val: 'C', text: '6 days' }, { val: 'D', text: '5 days' }], correctAnswer: 'B' },
    { id: 'anal6', field: 'analytical', question: 'A water tank has a leak draining 2 liters/hour. A tap fills it at 5 liters/hour. If the tank starts empty, how much water will be in it after 4 hours?', options: [{ val: 'A', text: '12 liters' }, { val: 'B', text: '20 liters' }, { val: 'C', text: '8 liters' }, { val: 'D', text: '15 liters' }], correctAnswer: 'A' },
    { id: 'anal7', field: 'analytical', question: 'You invest $1000 at a 10% annual simple interest rate. How much interest will you earn in 2 years?', options: [{ val: 'A', text: '$100' }, { val: 'B', text: '$200' }, { val: 'C', text: '$210' }, { val: 'D', text: '$50' }], correctAnswer: 'B' },
    { id: 'anal8', field: 'analytical', question: 'A team of 4 software developers can complete a project in 12 days. If we add 2 more developers with the same skill level, how many days will it take?', options: [{ val: 'A', text: '6 days' }, { val: 'B', text: '8 days' }, { val: 'C', text: '10 days' }, { val: 'D', text: '9 days' }], correctAnswer: 'B' }
  ];

  // Selected randomized questions for the active session (exactly 6 total: 2 log, 2 tech, 2 anal)
  const [selectedPuzzles, setSelectedPuzzles] = useState([]);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [puzzleAnswers, setPuzzleAnswers] = useState({});
  const [skillGameAttempts, setSkillGameAttempts] = useState(0);

  // 4. Mindset Landscape Scenery
  const mindsets = [
    {
      id: 'forest',
      title: 'Unexplored Forest',
      desc: 'You treat your future as a vibrant, breathing ecosystem. You seek diverse pathways, exploring different subjects and matching natural concepts.',
      icon: '🌲'
    },
    {
      id: 'galaxy',
      title: 'Glowing Galaxy',
      desc: 'You treat your career as an open universe. You look for boundless creative options, dreaming up futuristic, scaled systems where imagination thrives.',
      icon: '🌌'
    },
    {
      id: 'highway',
      title: 'Structured Highway',
      desc: 'You view your pathway as a robust, high-speed road. You seek clear directions, stable milestones, and actionable, direct technical skills.',
      icon: '🛣️'
    },
    {
      id: 'maze',
      title: 'Glowing Maze',
      desc: 'You see your development as a tactical, glowing puzzle. You are analytical, observing complex pathways to find the most optimized solution.',
      icon: '🌀'
    }
  ];
  const [selectedMindset, setSelectedMindset] = useState('');

  // Final synthesized data from backend
  const [synthesisResults, setSynthesisResults] = useState(null);

  // Sound triggers
  const handleTapSound = () => soundEnabled && audioSynth.playTap();
  const handleSuccessSound = () => soundEnabled && audioSynth.playSuccess();
  const handleChimeSound = () => soundEnabled && audioSynth.playPuzzleCorrect();
  const handleTransitionSound = () => soundEnabled && audioSynth.playTransition();

  // Helper to POST progress to backend
  const submitProgress = async (stage, data) => {
    const token = localStorage.getItem('curveurcareer_token');
    const responseTime = Date.now() - phaseStartTime.current;
    
    try {
      const res = await fetch(`${API_URL}/api/discover/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          stage,
          data,
          metrics: {
            responseTime,
            engagementScore: 1.2
          }
        })
      });
      return await res.json();
    } catch (e) {
      console.error('Progress save error:', e);
      return { success: false, error: 'Network offline or database schema cache is uninitialized. Please run db_schema.sql in your Supabase SQL Editor.' };
    }
  };

  // Phase transition router
  const transitionToPhase = (nextPhase) => {
    handleTransitionSound();
    resetPhaseTime();
    if (nextPhase === 'skills_game') {
      initializeSkillsGame();
    }
    setPhase(nextPhase);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Submit Welcome/Identity Stage
  const handleIdentitySubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !educationStage) return;
    
    setLoading(true);
    setError(null);
    handleTapSound();
    
    const res = await submitProgress('identity', {
      name: userName,
      educationStage
    });

    setLoading(true); // Keep loading true during route transition state
    if (res.success) {
      transitionToPhase('academic_journey');
    } else {
      setError(res.error || 'Failed to update neural profile parameters. Check your server connection or database tables.');
    }
    setLoading(false);
  };

  // Submit Academic Journey Stage
  const handleAcademicJourneySubmit = async (e) => {
    e.preventDefault();
    if (!academicStream || favoriteSubjects.length === 0 || !marksRange) return;

    setLoading(true);
    setError(null);
    handleTapSound();

    const hesitationTime = Date.now() - phaseStartTime.current;

    const res = await submitProgress('academic_journey', {
      stream: academicStream,
      favoriteSubjects,
      marksRange,
      academicConfidence,
      tracking: {
        hesitationTime,
        selectionOrder,
        changesOfMind
      }
    });

    if (res.success) {
      transitionToPhase('interest_choice');
    } else {
      setError(res.error || 'Failed to update academic profile parameters. Check your server connection.');
    }
    setLoading(false);
  };

  // 2a. Direct Interests selection submit
  const handleDirectInterestsSubmit = async () => {
    if (selectedInterests.length === 0) return;
    
    setLoading(true);
    setError(null);
    handleTapSound();

    const res = await submitProgress('interests_decided', {
      interests: selectedInterests
    });

    if (res.success) {
      transitionToPhase('skills_game');
    } else {
      setError(res.error || 'Failed to save interest vectors. Please verify database tables connection.');
    }
    setLoading(false);
  };

  // 2b. Scenario Answers Submission
  const handleScenarioAnswerSelect = (option) => {
    handleTapSound();
    const newAnswers = [...scenarioAnswers, {
      scenarioId: scenarios[currentScenarioIndex].id,
      selectedAnswer: option.value,
      mappedInterest: option.interest
    }];
    setScenarioAnswers(newAnswers);

    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      submitScenarios(newAnswers);
    }
  };

  const submitScenarios = async (answers) => {
    setLoading(true);
    setError(null);
    const res = await submitProgress('interests_scenarios', {
      scenarios: answers
    });
    if (res.success) {
      transitionToPhase('skills_game');
    } else {
      setError(res.error || 'Failed to sync scenario responses. Please try again.');
    }
    setLoading(false);
  };

  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const initializeSkillsGame = () => {
    const selectedLogical = shuffleArray([...logicalQuestions]).slice(0, 2);
    const selectedTechnical = shuffleArray([...technicalQuestions]).slice(0, 2);
    const selectedAnalytical = shuffleArray([...analyticalQuestions]).slice(0, 2);
    
    const combined = [
      ...selectedLogical,
      ...selectedTechnical,
      ...selectedAnalytical
    ];
    setSelectedPuzzles(combined);
    setPuzzleAnswers({});
    setCurrentPuzzleIndex(0);
  };

  // 3. Skills Mini-game puzzles submit
  const handleSkillsSubmit = async () => {
    setLoading(true);
    setError(null);
    handleTapSound();

    let correctLogical = 0;
    let correctTechnical = 0;
    let correctAnalytical = 0;

    selectedPuzzles.forEach((puzzle, idx) => {
      const userAnswer = puzzleAnswers[idx];
      const isCorrect = userAnswer === puzzle.correctAnswer;
      if (puzzle.field === 'logical') {
        if (isCorrect) correctLogical++;
      } else if (puzzle.field === 'technical') {
        if (isCorrect) correctTechnical++;
      } else if (puzzle.field === 'analytical') {
        if (isCorrect) correctAnalytical++;
      }
    });

    const logicalReasoningScore = correctLogical; // max 2
    const creativityScore = correctTechnical; // max 2 (maps to technical problem solving)
    const analyticalScore = correctAnalytical; // max 2
    
    if (logicalReasoningScore === 2 && analyticalScore === 2 && creativityScore === 2) {
      handleChimeSound();
    }

    const res = await submitProgress('skills_game', {
      logicalReasoningScore,
      analyticalScore,
      creativityScore,
      explorationLevel: 3,
      retryCount: skillGameAttempts,
      curiosityScore: 3,
      confidenceScore: 3,
      learningStylePattern: logicalReasoningScore >= 2 && analyticalScore >= 2 ? 'Structured Logical Observer' : 'Curiosity-Driven Experimenter'
    });

    if (res.success) {
      transitionToPhase('mindset');
    } else {
      setError(res.error || 'Failed to save foundational diagnostic skills matrix.');
    }
    setLoading(false);
  };

  // 4. Submit Mindset
  const handleMindsetSubmit = async (mindsetId) => {
    setLoading(true);
    setError(null);
    handleTapSound();
    setSelectedMindset(mindsetId);

    const res = await submitProgress('mindset', {
      mindset: mindsetId
    });

    if (res.success) {
      transitionToPhase('synthesis');
    } else {
      setError(res.error || 'Failed to save career mindset landscape scenery.');
    }
    setLoading(false);
  };

  // 5. Final Dynamic Synthesis Evaluation
  const triggerSynthesis = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('curveurcareer_token');
    
    try {
      const res = await fetch(`${API_URL}/api/discover/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setSynthesisResults(data.results);
        await refreshProfile(); // Refresh Auth Context to sync onboarding_completed status!
        handleSuccessSound();
        transitionToPhase('results');
      } else {
        console.error('Synthesis failed:', data.error);
        setError(data.error || 'Dynamic profile synthesis failed. Make sure your database tables are created.');
        transitionToPhase('skills_game'); // retry fallback
      }
    } catch (e) {
      console.error('Synthesis server exception:', e);
      setError('Connection failure during dynamic synthesis. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (phase === 'synthesis') {
      triggerSynthesis();
    }
  }, [phase]);

  const activePuzzle = selectedPuzzles[currentPuzzleIndex];

  return (
    <div className="min-h-screen bg-zinc-100 text-black flex flex-col font-sans selection:bg-black selection:text-white overflow-x-hidden relative">
      {/* Stark monochrome Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.08] pointer-events-none z-0"></div>
      
      {/* Premium Stark Header */}
      <header className="bg-black text-white py-5 px-8 border-b-4 border-black flex justify-between items-center relative z-20 font-mono shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white text-black font-black flex items-center justify-center text-xl border-2 border-white">
            C
          </div>
          <span className="font-black tracking-widest text-sm uppercase">CURVEURCAREER // NEURAL DIAGNOSTICS</span>
        </div>
        
        {/* Sound toggle float */}
        <button
          onClick={() => {
            audioSynth.playTap();
            setSoundEnabled(!soundEnabled);
          }}
          className={`px-4 py-2 border-2 text-xs font-black uppercase tracking-wider transition-all duration-150 ${soundEnabled ? 'bg-white text-black border-white hover:bg-black hover:text-white hover:border-white shadow-[2px_2px_0px_rgba(0,0,0,0.15)]' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-white'}`}
          title={soundEnabled ? 'Mute Interface Sounds' : 'Unmute Interface Sounds'}
        >
          {soundEnabled ? '🔊 SOUND: ON' : '🔇 SOUND: MUTED'}
        </button>
      </header>

      <div className="flex-1 max-w-3xl w-full mx-auto px-6 py-12 flex flex-col justify-center relative z-10">
        
        {/* Error notification banner */}
        {error && (
          <div className="mb-8 p-6 border-4 border-black bg-white shadow-[8px_8px_0px_#000000] text-black text-sm flex items-start gap-4 relative z-50">
            <span className="text-2xl font-black">⚠️</span>
            <div className="flex-1">
              <span className="block font-black uppercase tracking-widest text-sm text-black">NEURAL LINK INTERRUPTION</span>
              <span className="block text-black text-xs mt-2 font-mono leading-relaxed">{error}</span>
            </div>
            <button 
              onClick={() => setError(null)}
              className="text-xs font-black uppercase border-2 border-black hover:bg-black hover:text-white px-4 py-2 transition-colors font-mono"
            >
              Dismiss
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* Phase: Cinematic Welcome */}
          {phase === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4 }}
              className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] text-black overflow-hidden rounded-none"
            >
              <div className="bg-black text-white p-6 border-b-4 border-black font-mono flex justify-between items-center">
                <span className="font-bold tracking-widest text-xs uppercase">SYSTEM INITIALIZATION // V2.0</span>
                <span className="w-3.5 h-3.5 rounded-full bg-red-600 animate-pulse"></span>
              </div>
              <div className="p-8 md:p-12 text-center space-y-8">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none text-black">
                  DISCOVER YOUR <br />
                  <span className="bg-black text-white px-4 py-2 inline-block mt-3 border-2 border-black">
                    TRUE MINDSET
                  </span>
                </h1>
                <p className="text-black max-w-xl mx-auto text-sm md:text-base font-semibold font-mono leading-relaxed uppercase">
                  // WARNING: THIS IS NOT A STANDARD QUESTIONNAIRE.<br />
                  ENTER AN IMMERSIVE DIAGNOSTICS WORLD TO UNLOCK YOUR MENTAL ECOSYSTEM, SKILLS VECTORS, AND PATHWAYS.
                </p>
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => transitionToPhase('identity')}
                    className="px-8 py-5 font-black uppercase text-white bg-black border-4 border-black hover:bg-white hover:text-black shadow-[6px_6px_0px_#000000] active:translate-y-1 active:shadow-[2px_2px_0px_#000000] transition-all tracking-widest text-sm font-mono"
                  >
                    INITIATE SYSTEM EXPLORATION →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Phase: Identity Selection */}
          {phase === 'identity' && (
            <motion.div
              key="identity"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] rounded-none overflow-hidden"
            >
              <div className="bg-black text-white p-6 border-b-4 border-black font-mono flex justify-between items-center">
                <span className="font-bold tracking-widest text-xs uppercase">SECURE LINK CALIBRATION [01//06]</span>
                <span className="font-bold text-xs">STATUS: PENDING</span>
              </div>
              <div className="p-8 space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                    ESTABLISH CODENAME & STATION
                  </h2>
                  <p className="text-zinc-600 font-mono text-xs uppercase">
                    Define identification parameters to synchronize behavioral algorithms.
                  </p>
                </div>

                <form onSubmit={handleIdentitySubmit} className="space-y-8 max-w-xl mx-auto">
                  <div className="space-y-3">
                    <label htmlFor="name-input" className="block text-xs font-black uppercase tracking-widest font-mono text-black">
                      [CODENAME / EXPLORER NAME]
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name..."
                      className="w-full bg-white border-4 border-black px-5 py-4 focus:bg-zinc-50 text-black placeholder:text-zinc-400 outline-none font-bold uppercase tracking-wider transition-all"
                    />
                  </div>

                  <div className="space-y-4">
                    <span className="block text-xs font-black uppercase tracking-widest font-mono text-black">
                      [ACADEMIC STATION COORDINATES]
                    </span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'school', title: 'CADET', level: 'High School', icon: '🎒' },
                        { id: 'college', title: 'SCHOLAR', level: 'University', icon: '🏛️' },
                        { id: 'professional', title: 'EXPLORER', level: 'Professional', icon: '🚀' }
                      ].map((stageOption) => (
                        <button
                          key={stageOption.id}
                          type="button"
                          onClick={() => {
                            handleTapSound();
                            setEducationStage(stageOption.id);
                          }}
                          className={`p-5 border-4 text-left flex flex-col justify-between h-40 transition-all ${educationStage === stageOption.id ? 'bg-black border-black text-white shadow-[4px_4px_0px_#e2e8f0]' : 'bg-white border-black text-black hover:bg-zinc-50'}`}
                        >
                          <span className="text-3xl">{stageOption.icon}</span>
                          <div className="space-y-1">
                            <span className="block font-black text-sm uppercase leading-none font-mono">{stageOption.title}</span>
                            <span className="block text-xxs font-bold uppercase tracking-wider opacity-60 mt-1">{stageOption.level}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t-4 border-dashed border-black">
                    <button
                      type="submit"
                      disabled={loading || !userName.trim() || !educationStage}
                      className="px-8 py-4 font-black uppercase bg-black text-white hover:bg-white hover:text-black border-4 border-black disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm tracking-widest font-mono"
                    >
                      {loading ? 'CALIBRATING...' : 'CONFIRM COORDINATES →'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* Phase: Academic Journey */}
          {phase === 'academic_journey' && (
            <motion.div
              key="academic_journey"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] rounded-none overflow-hidden"
            >
              <div className="bg-black text-white p-6 border-b-4 border-black font-mono flex justify-between items-center">
                <span className="font-bold tracking-widest text-xs uppercase">ACADEMIC ALIGNMENT COORDINATES [02//06]</span>
                <span className="font-bold text-xs">STATUS: PENDING</span>
              </div>
              <div className="p-8 space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                    ESTABLISH ACADEMIC FOOTPRINT
                  </h2>
                  <p className="text-zinc-600 font-mono text-xs uppercase">
                    Map your educational trajectory, strengths, academic confidence level.
                  </p>
                </div>

                <form onSubmit={handleAcademicJourneySubmit} className="space-y-8 max-w-xl mx-auto">
                  {/* Stream Selection */}
                  <div className="space-y-3">
                    <span className="block text-xs font-black uppercase tracking-widest font-mono text-black">
                      [01] SELECT CURRENT STREAM / CONCENTRATION
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { id: 'Computer Science', label: 'COMP. SCIENCE', icon: '💻' },
                        { id: 'Biology', label: 'BIOLOGY', icon: '🧬' },
                        { id: 'Commerce', label: 'COMMERCE', icon: '📈' },
                        { id: 'Arts', label: 'ARTS & DESIGN', icon: '🎨' },
                        { id: 'Vocational', label: 'VOCATIONAL', icon: '🛠️' },
                        { id: 'Other', label: 'OTHER', icon: '🌐' }
                      ].map(streamOpt => (
                        <button
                          key={streamOpt.id}
                          type="button"
                          onClick={() => {
                            handleTapSound();
                            if (academicStream) setChangesOfMind(prev => prev + 1);
                            setAcademicStream(streamOpt.id);
                          }}
                          className={`p-4 border-4 text-center flex flex-col items-center justify-center gap-2 transition-all ${academicStream === streamOpt.id ? 'bg-black border-black text-white shadow-[2px_2px_0px_rgba(255,255,255,0.15)]' : 'bg-white border-black text-black hover:bg-zinc-50'}`}
                        >
                          <span className="text-2xl">{streamOpt.icon}</span>
                          <span className="font-black text-xs font-mono uppercase">{streamOpt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subject Chips */}
                  <div className="space-y-3">
                    <span className="block text-xs font-black uppercase tracking-widest font-mono text-black">
                      [02] CHOOSE FAVORITE ACADEMIC SUBJECTS (MIN 1)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Mathematics', 'Physics', 'Computer Science', 'Economics',
                        'Biology', 'Business Studies', 'English', 'History'
                      ].map(subj => {
                        const isSelected = favoriteSubjects.includes(subj);
                        return (
                          <button
                            key={subj}
                            type="button"
                            onClick={() => {
                              handleTapSound();
                              setChangesOfMind(prev => prev + 1);
                              if (isSelected) {
                                setFavoriteSubjects(favoriteSubjects.filter(s => s !== subj));
                              } else {
                                setFavoriteSubjects([...favoriteSubjects, subj]);
                                setSelectionOrder([...selectionOrder, subj]);
                              }
                            }}
                            className={`px-4 py-2 border-2 text-xs font-mono font-black uppercase transition-all ${isSelected ? 'bg-black border-black text-white shadow-[2px_2px_0px_rgba(255,255,255,0.15)]' : 'bg-white border-black text-black hover:bg-zinc-50'}`}
                          >
                            {isSelected ? `[✓] ${subj}` : `[ ] ${subj}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Marks Selector */}
                  <div className="space-y-3">
                    <span className="block text-xs font-black uppercase tracking-widest font-mono text-black">
                      [03] MAP AVERAGE PERFORMANCE TIER (PERCENTAGE)
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: '90-100', label: '90% - 100%' },
                        { id: '75-89', label: '75% - 89%' },
                        { id: '60-74', label: '60% - 74%' },
                        { id: 'Below 60', label: 'BELOW 60%' }
                      ].map(marksOpt => (
                        <button
                          key={marksOpt.id}
                          type="button"
                          onClick={() => {
                            handleTapSound();
                            if (marksRange) setChangesOfMind(prev => prev + 1);
                            setMarksRange(marksOpt.id);
                          }}
                          className={`p-3 border-4 text-center transition-all font-mono font-black text-xs ${marksRange === marksOpt.id ? 'bg-black border-black text-white shadow-[2px_2px_0px_rgba(255,255,255,0.15)]' : 'bg-white border-black text-black hover:bg-zinc-50'}`}
                        >
                          {marksOpt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Confidence Slider */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest font-mono text-black">
                      <span>[04] RATE ACADEMIC CONFIDENCE LEVEL</span>
                      <span className="bg-black text-white px-2 py-0.5">{academicConfidence} / 5</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={academicConfidence}
                      onChange={(e) => {
                        handleTapSound();
                        setChangesOfMind(prev => prev + 1);
                        setAcademicConfidence(parseInt(e.target.value));
                      }}
                      className="w-full h-3 bg-zinc-200 border-2 border-black rounded-none appearance-none cursor-pointer accent-black"
                    />
                    <div className="flex justify-between text-xxs font-mono uppercase text-zinc-400">
                      <span>Foundational Explorer</span>
                      <span>High Confidence Master</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-between items-center pt-6 border-t-4 border-dashed border-black">
                    <button
                      type="button"
                      onClick={() => transitionToPhase('identity')}
                      className="px-5 py-3 font-bold border-2 border-black hover:bg-black hover:text-white text-black transition-all font-mono text-xs tracking-wider"
                    >
                      ← BACK
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !academicStream || favoriteSubjects.length === 0 || !marksRange}
                      className="px-8 py-4 font-black uppercase bg-black text-white hover:bg-white hover:text-black border-4 border-black disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm tracking-widest font-mono"
                    >
                      {loading ? 'CALIBRATING...' : 'CONFIRM ACADEMIC COORDINATES →'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* Phase: Choose Interest Discovery Pathway */}
          {phase === 'interest_choice' && (
            <motion.div
              key="interest_choice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] rounded-none overflow-hidden"
            >
              <div className="bg-black text-white p-6 border-b-4 border-black font-mono flex justify-between items-center">
                <span className="font-bold tracking-widest text-xs uppercase">INTEREST VECTOR PROFILING [03//06]</span>
                <span className="font-bold text-xs">STATUS: PENDING</span>
              </div>
              <div className="p-8 space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                    INTEREST CALIBRATION PATHWAY
                  </h2>
                  <p className="text-zinc-600 font-mono text-xs uppercase max-w-md mx-auto">
                    Choose between direct vector injection (manual choice) or scenario-based behavioral calibration (gamified dilemmas).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-4">
                  {/* Pathway 1: Direct choice */}
                  <button
                    onClick={() => transitionToPhase('direct_interests')}
                    className="p-8 border-4 border-black bg-white hover:bg-black hover:text-white text-black transition-all text-left flex flex-col justify-between shadow-[6px_6px_0px_#000000] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000000] h-64 group"
                  >
                    <div className="space-y-4">
                      <span className="w-12 h-12 border-2 border-black flex items-center justify-center text-2xl bg-zinc-100 group-hover:bg-white group-hover:text-black">⚡</span>
                      <div className="space-y-1">
                        <h3 className="text-xl font-black uppercase font-mono">I DECIDED MYSELF</h3>
                        <p className="text-xs font-mono leading-relaxed opacity-80">Select from established technology, creative, and leadership fields to speed up calibration.</p>
                      </div>
                    </div>
                    <span className="text-xs font-black uppercase flex items-center gap-1.5 self-end tracking-widest border-b-2 border-current font-mono mt-4">
                      DIRECT SELECTION →
                    </span>
                  </button>

                  {/* Pathway 2: Dynamic scenarios */}
                  <button
                    onClick={() => transitionToPhase('scenarios')}
                    className="p-8 border-4 border-black bg-white hover:bg-black hover:text-white text-black transition-all text-left flex flex-col justify-between shadow-[6px_6px_0px_#000000] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000000] h-64 group"
                  >
                    <div className="space-y-4">
                      <span className="w-12 h-12 border-2 border-black flex items-center justify-center text-2xl bg-zinc-100 group-hover:bg-white group-hover:text-black">🎮</span>
                      <div className="space-y-1">
                        <h3 className="text-xl font-black uppercase font-mono">INTEREST DILEMMAS</h3>
                        <p className="text-xs font-mono leading-relaxed opacity-80">Resolve friendly everyday dilemma simulations. Let our engine map your choices to career vectors.</p>
                      </div>
                    </div>
                    <span className="text-xs font-black uppercase flex items-center gap-1.5 self-end tracking-widest border-b-2 border-current font-mono mt-4">
                      GAMIFIED TEST →
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Phase 2a: Direct Interests Selector Grid */}
          {phase === 'direct_interests' && (
            <motion.div
              key="direct_interests"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] rounded-none overflow-hidden"
            >
              <div className="bg-black text-white p-6 border-b-4 border-black font-mono flex justify-between items-center">
                <span className="font-bold tracking-widest text-xs uppercase">DIRECT CHIPS SELECTOR [03//06]</span>
                <span className="font-bold text-xs">LIMIT: UP TO 4</span>
              </div>
              <div className="p-8 space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                    SELECT CUSTOM VECTORS
                  </h2>
                  <p className="text-zinc-600 font-mono text-xs uppercase">
                    Choose up to 4 major vector areas that align with your career interest aspirations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4">
                  {availableInterests.map((interest) => {
                    const isSelected = selectedInterests.includes(interest.name);
                    return (
                      <button
                        key={interest.name}
                        onClick={() => {
                          handleTapSound();
                          if (isSelected) {
                            setSelectedInterests(selectedInterests.filter(i => i !== interest.name));
                          } else {
                            if (selectedInterests.length < 4) {
                              setSelectedInterests([...selectedInterests, interest.name]);
                            }
                          }
                        }}
                        className={`p-6 border-4 text-left h-44 flex flex-col justify-between transition-all ${isSelected ? 'bg-black border-black text-white shadow-[4px_4px_0px_#e2e8f0]' : 'bg-white border-black text-black hover:bg-zinc-50'}`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-3xl">{interest.icon}</span>
                          {isSelected && <span className="text-xxs font-black uppercase tracking-widest text-black bg-white px-2.5 py-1 border-2 border-black font-mono">SELECTED</span>}
                        </div>
                        <div className="space-y-1">
                          <span className="block font-black text-base uppercase leading-none font-mono">{interest.name}</span>
                          <span className="block text-xxs font-semibold leading-tight mt-1 opacity-70">{interest.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-6 border-t-4 border-dashed border-black">
                  <button
                    onClick={() => transitionToPhase('interest_choice')}
                    className="px-5 py-3 font-bold border-2 border-black hover:bg-black hover:text-white text-black transition-all font-mono text-xs tracking-wider"
                  >
                    ← BACK
                  </button>

                  <button
                    onClick={handleDirectInterestsSubmit}
                    disabled={loading || selectedInterests.length === 0}
                    className="px-8 py-4 font-black uppercase bg-black text-white hover:bg-white hover:text-black border-4 border-black disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs tracking-widest font-mono shadow-[4px_4px_0px_#000000]"
                  >
                    {loading ? 'STORING VECTOR...' : 'INJECT VECTORS & PROCEED →'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Phase 2b: Interactive Scenario Game */}
          {phase === 'scenarios' && (
            <motion.div
              key="scenarios"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] rounded-none overflow-hidden"
            >
              <div className="bg-black text-white p-6 border-b-4 border-black font-mono flex justify-between items-center">
                <span className="font-bold tracking-widest text-xs uppercase">INTEREST SCENARIO GAME [03//06]</span>
                <span className="font-bold text-xs font-mono">SCENARIO {currentScenarioIndex + 1} // {scenarios.length}</span>
              </div>
              <div className="p-8 space-y-8">
                {/* Stepper Progress bar */}
                <div className="space-y-2">
                  <div className="w-full bg-zinc-200 h-3 border-2 border-black rounded-none overflow-hidden">
                    <div 
                      className="bg-black h-full transition-all duration-300" 
                      style={{ width: `${((currentScenarioIndex) / scenarios.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="space-y-2">
                    <span className="text-xxs font-black text-zinc-500 uppercase tracking-widest font-mono">CHAPTER 0{currentScenarioIndex + 1} // {scenarios[currentScenarioIndex].title}</span>
                    <h3 className="text-xl md:text-2xl font-black text-black uppercase leading-snug">
                      {scenarios[currentScenarioIndex].question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4 pt-4">
                    {scenarios[currentScenarioIndex].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleScenarioAnswerSelect(option)}
                        className="p-5 border-4 border-black bg-white hover:bg-black hover:text-white text-black text-left transition-all group flex items-start gap-4 shadow-[4px_4px_0px_#000000]"
                      >
                        <span className="w-7 h-7 border-2 border-black bg-zinc-100 text-black flex items-center justify-center font-bold text-xs font-mono group-hover:bg-white group-hover:text-black">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1 text-sm font-bold uppercase group-hover:text-white leading-relaxed font-mono">
                          {option.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t-4 border-dashed border-black">
                  <button
                    onClick={() => {
                      handleTapSound();
                      if (currentScenarioIndex > 0) {
                        setCurrentScenarioIndex(currentScenarioIndex - 1);
                        setScenarioAnswers(scenarioAnswers.slice(0, -1));
                      } else {
                        transitionToPhase('interest_choice');
                      }
                    }}
                    className="px-5 py-3 font-bold border-2 border-black hover:bg-black hover:text-white text-black transition-all font-mono text-xs tracking-wider"
                  >
                    ← BACK
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Phase 3: Mini-puzzle Skills Game (6 Step Stepper!) */}
          {phase === 'skills_game' && activePuzzle && (
            <motion.div
              key="skills_game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] rounded-none overflow-hidden"
            >
              <div className="bg-black text-white p-6 border-b-4 border-black font-mono flex justify-between items-center">
                <span className="font-bold tracking-widest text-xs uppercase">FOUNDATIONAL SKILLS DIAGNOSTIC [04//06]</span>
                <span className="font-bold text-xs">PUZZLE {currentPuzzleIndex + 1} OF 6</span>
              </div>
              <div className="p-8 space-y-8">
                {/* Stepper Progress Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between text-xxs font-black uppercase text-zinc-500 font-mono">
                    <span>TASK PROGRESS</span>
                    <span className="tracking-widest">
                      {activePuzzle.field === 'logical' && 'LOGICAL REASONING'}
                      {activePuzzle.field === 'technical' && 'TECHNICAL PROBLEM SOLVING'}
                      {activePuzzle.field === 'analytical' && 'ANALYTICAL THINKING'}
                    </span>
                  </div>
                  <div className="w-full bg-zinc-200 h-3 border-2 border-black rounded-none overflow-hidden">
                    <div 
                      className="bg-black h-full transition-all duration-300" 
                      style={{ width: `${((currentPuzzleIndex) / 6) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Puzzle Card */}
                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="space-y-2">
                    <span className="text-xxs font-black text-zinc-500 uppercase tracking-widest font-mono">TASK 0{currentPuzzleIndex + 1} // DIAGNOSTIC QUERY</span>
                    <h3 className="text-lg md:text-xl font-black text-black leading-snug uppercase font-mono">
                      {activePuzzle.question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-4">
                    {activePuzzle.options.map((opt) => {
                      const isSelected = puzzleAnswers[currentPuzzleIndex] === opt.val;
                      return (
                        <button
                          key={opt.val}
                          onClick={() => {
                            handleTapSound();
                            setPuzzleAnswers({
                              ...puzzleAnswers,
                              [currentPuzzleIndex]: opt.val
                            });
                          }}
                          className={`p-4 border-4 text-left transition-all font-bold text-sm flex items-center gap-4 shadow-[3px_3px_0px_#000000] ${isSelected ? 'bg-black border-black text-white shadow-[3px_3px_0px_#e2e8f0]' : 'bg-white border-black text-black hover:bg-zinc-50'}`}
                        >
                          <span className={`w-7 h-7 border-2 border-black flex items-center justify-center text-xs font-mono font-bold ${isSelected ? 'bg-white text-black border-white' : 'bg-zinc-100 text-black'}`}>
                            {opt.val}
                          </span>
                          <span className="font-mono uppercase">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t-4 border-dashed border-black">
                  <button
                    onClick={() => {
                      handleTapSound();
                      if (currentPuzzleIndex > 0) {
                        setCurrentPuzzleIndex(currentPuzzleIndex - 1);
                      } else {
                        transitionToPhase('interest_choice');
                      }
                    }}
                    className="px-5 py-3 font-bold border-2 border-black hover:bg-black hover:text-white text-black transition-all font-mono text-xs tracking-wider"
                  >
                    ← BACK
                  </button>

                  {currentPuzzleIndex < 5 ? (
                    <button
                      onClick={() => {
                        handleTapSound();
                        setCurrentPuzzleIndex(currentPuzzleIndex + 1);
                      }}
                      disabled={!puzzleAnswers[currentPuzzleIndex]}
                      className="px-6 py-3.5 font-black uppercase bg-black text-white border-4 border-black disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs tracking-widest font-mono shadow-[4px_4px_0px_#000000]"
                    >
                      NEXT PUZZLE →
                    </button>
                  ) : (
                    <button
                      onClick={handleSkillsSubmit}
                      disabled={loading || !puzzleAnswers[currentPuzzleIndex]}
                      className="px-8 py-4 font-black uppercase bg-black text-white border-4 border-black disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs tracking-widest font-mono shadow-[4px_4px_0px_#000000]"
                    >
                      {loading ? 'COMPILING VECTOR...' : 'ANALYZE FOUNDATIONAL MATRIX →'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Phase 4: Mindset Scenery landscape selection */}
          {phase === 'mindset' && (
            <motion.div
              key="mindset"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] rounded-none overflow-hidden"
            >
              <div className="bg-black text-white p-6 border-b-4 border-black font-mono flex justify-between items-center">
                <span className="font-bold tracking-widest text-xs uppercase">SELECT MINDSET SCENERY [05//06]</span>
                <span className="font-bold text-xs">STATUS: CALIBRATING</span>
              </div>
              <div className="p-8 space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                    SELECT CAREER MINDSET SCENERY
                  </h2>
                  <p className="text-zinc-600 font-mono text-xs uppercase max-w-sm mx-auto">
                    If your future career was a glowing environment, which one speaks to you most?
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {mindsets.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleMindsetSubmit(m.id)}
                      className="p-6 border-4 border-black bg-white hover:bg-black hover:text-white text-black transition-all flex flex-col justify-between h-64 shadow-[6px_6px_0px_#000000] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000000] group"
                    >
                      <div className="space-y-4 w-full">
                        <div className="flex justify-between items-center w-full">
                          <span className="text-4xl">{m.icon}</span>
                          <span className="text-xxs font-black uppercase text-zinc-400 font-mono group-hover:text-white">SELECT SCENERY</span>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-black uppercase font-mono group-hover:text-white">{m.title}</h3>
                          <p className="text-zinc-600 text-xs font-semibold leading-relaxed font-mono opacity-80 group-hover:text-white transition-colors">
                            {m.desc}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-black uppercase group-hover:translate-x-1.5 transition-transform self-end tracking-wider border-b-2 border-current mt-4 font-mono">
                        CHOOSE {m.title} →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Phase: Dynamic Synthesis Loading Screen */}
          {phase === 'synthesis' && (
            <motion.div
              key="synthesis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] rounded-none overflow-hidden"
            >
              <div className="bg-black text-white p-6 border-b-4 border-black font-mono flex justify-between items-center">
                <span className="font-bold tracking-widest text-xs uppercase">EVALUATIVE SYNTHESIS [06//06]</span>
                <span className="w-3.5 h-3.5 rounded-full bg-yellow-500 animate-ping"></span>
              </div>
              <div className="p-12 md:p-20 text-center space-y-8 flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-8 border-zinc-200 border-t-black absolute"></div>
                  <div className="rounded-full h-24 w-24 bg-black flex items-center justify-center text-white border-4 border-black shadow-md">
                    <span className="text-3xl animate-pulse">⚙️</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-black tracking-widest uppercase font-mono">COMPILING PROFILE PARAMETERS...</h3>
                  <p className="text-zinc-600 max-w-sm mx-auto text-xs font-mono uppercase leading-relaxed">
                    Compiling interaction latencies, diagnostic puzzle correctness matrices, interests choice pathways, and landscape vectors into your profile...
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Phase: Synth results panel */}
          {phase === 'results' && synthesisResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-8 w-full max-w-2xl mx-auto"
            >
              <div className="text-center space-y-4">
                <span className="px-4 py-2 border-4 border-black bg-black text-white text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_#000000] inline-block font-mono">
                  ONBOARDING COMPLETE // SYSTEM CALIBRATED
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black uppercase leading-none">
                  WELCOME, {userName}!
                </h2>
                <p className="text-zinc-600 font-mono text-xs uppercase">
                  Your multidimensional discovery results have been compiled. Below is your AI synthesized career ecosystem matrix.
                </p>
              </div>

              {/* Grid matrix of strengths & pathways */}
              <div className="space-y-6 pt-4">
                
                {/* Panel 1: Explorer Identity Card */}
                <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000000] rounded-none flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-6">
                    <div className="space-y-2 border-b-4 border-dashed border-black pb-4">
                      <span className="text-xxs tracking-widest text-zinc-400 font-black uppercase block font-mono">AI DIAGNOSTICS SUMMARY</span>
                      <h3 className="text-3xl font-black text-black uppercase font-mono leading-none">
                        {synthesisResults.explorationType || 'ACTIVE EXPLORER'}
                      </h3>
                      <p className="text-xs text-zinc-500 font-mono font-bold uppercase tracking-wider mt-1">
                        COORDINATES: {educationStage === 'school' ? 'HIGH SCHOOL CADET' : educationStage === 'college' ? 'CAMPUS SCHOLAR' : 'PROFESSIONAL EXPLORER'}
                      </p>
                    </div>

                    <p className="text-sm font-bold text-black leading-relaxed font-mono italic bg-zinc-100 p-6 border-2 border-black">
                      "{synthesisResults.personalizedSummary}"
                    </p>
                  </div>

                  <div className="pt-6 border-t-4 border-dashed border-black mt-6 flex justify-between items-center text-xs font-mono">
                    <span className="font-bold text-zinc-400">SYSTEM ID: SECURE_LINK_OK</span>
                    <span className="font-black uppercase tracking-widest text-black flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span> SYSTEM STATUS: ACTIVE
                    </span>
                  </div>
                </div>

                {/* Panel 2: Recommended Pathways */}
                <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000000] rounded-none space-y-6">
                  <div className="space-y-4">
                    <span className="text-xxs tracking-widest text-zinc-400 font-black uppercase block font-mono">RECOMMENDED CAREER ECOSYSTEMS</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {synthesisResults.recommendedPathways && synthesisResults.recommendedPathways.map((pathway, index) => (
                        <div 
                          key={index}
                          className="px-4 py-3 rounded-none border-4 border-black text-xs font-black uppercase text-black flex items-center gap-3 bg-zinc-50 font-mono"
                        >
                          <span className="w-6 h-6 border-2 border-black bg-black text-white flex items-center justify-center text-xs font-mono font-bold">0{index + 1}</span>
                          {pathway}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Full-width Strengths & Gaps matrix with improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                
                {/* Top Strengths Panel */}
                <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000000] rounded-none space-y-4">
                  <span className="text-xxs tracking-widest text-zinc-400 font-black uppercase block font-mono">VALIDATED STRENGTHS</span>
                  <div className="space-y-3">
                    {synthesisResults.topStrengths && synthesisResults.topStrengths.length > 0 ? (
                      synthesisResults.topStrengths.map((str, idx) => (
                        <div key={idx} className="p-4 border-2 border-black bg-zinc-50 text-black flex items-start gap-3">
                          <span className="text-black font-black text-lg">✓</span>
                          <div>
                            <span className="block font-black text-xs uppercase font-mono">{str}</span>
                            <span className="block text-xxs font-mono text-zinc-400 mt-1 uppercase">Validated during diagnostics and game vectors.</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-zinc-400 text-xs italic font-mono uppercase">COMPILING FOUNDATIONAL TRAITS...</p>
                    )}
                  </div>
                </div>

                {/* CRITICAL IMPROVEMENTS PANEL */}
                <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000000] rounded-none space-y-4">
                  <span className="text-xxs tracking-widest text-zinc-400 font-black uppercase block font-mono">GROWTH & IMPROVEMENTS</span>
                  
                  <div className="space-y-3">
                    {synthesisResults.skillGaps && synthesisResults.skillGaps.length > 0 ? (
                      synthesisResults.skillGaps.map((gap, idx) => {
                        let action = '';
                        let description = '';
                        if (gap === 'Logical Reasoning') {
                          action = 'PRACTICE ALGORITHMIC PUZZLES & GLYPH SEQUENCING';
                          description = 'Deciphering sequential glyph patterns is critical to software engineering, research, and analysis.';
                        } else if (gap === 'Creative Problem Solving') {
                          action = 'ENGAGE IN LATERAL-THINKING BRAINSTORMS';
                          description = 'Out-of-the-box lateral riddles prepare you for high-pressure technical troubleshooting and product management.';
                        } else if (gap === 'Analytical Thinking') {
                          action = 'COMPLETE DATA INTERPRETATION MICRO-COURSES';
                          description = 'Balancing complex mathematical arrays forms the basis of business operations, finance, and system operations.';
                        } else {
                          action = 'REVIEW GENERAL FOUNDATIONAL DEVELOPMENT';
                          description = 'Continuous growth across all fields ensures versatile adaptability.';
                        }

                        return (
                          <div key={idx} className="p-4 border-2 border-black bg-zinc-50 text-black flex items-start gap-3">
                            <span className="text-black font-black text-lg">💡</span>
                            <div className="space-y-2">
                              <span className="block font-black text-xs uppercase font-mono">{gap}</span>
                              <p className="text-xxs font-mono text-zinc-500 leading-relaxed uppercase">{description}</p>
                              <span className="inline-block px-2.5 py-1.5 bg-black text-white font-bold text-xxs tracking-wider uppercase mt-1 font-mono">
                                ACTION: {action}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-4 border-2 border-black bg-zinc-50 text-black flex items-center gap-3">
                        <span className="text-black text-lg">💎</span>
                        <div>
                          <span className="block font-black text-xs uppercase font-mono">All Foundational Skills Mastered!</span>
                          <span className="block text-xxs font-mono text-zinc-400 mt-1 uppercase">You satisfied all diagnostic puzzles perfectly. Proceed to advance learning pathways.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Action navigation to Learning Dashboard */}
              <div className="flex justify-center pt-8 border-t-4 border-dashed border-black">
                <button
                  onClick={() => {
                    handleTapSound();
                    navigate('/results');
                  }}
                  className="px-10 py-5 font-black uppercase text-white bg-black border-4 border-black hover:bg-white hover:text-black shadow-[8px_8px_0px_#000000] active:translate-y-1 active:shadow-[2px_2px_0px_#000000] transition-all tracking-widest text-sm font-mono"
                >
                  ENTER CAREER DASHBOARD →
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssessmentPage;
