// Premium Modern Landing Page - AI-Powered Student Growth Ecosystem
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, Sparkles, Trophy, Flame, Target, BookOpen, Compass, Shield, CheckCircle2, AlertTriangle, Play, ChevronRight, Zap, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { coursesData } from '../data/coursesData';
import useLearning from '../hooks/useLearning';

// Animated Particle Background
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, delay: 2 }}
        className="absolute top-1/2 -right-40 w-80 h-80 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, delay: 4 }}
        className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
    </div>
  );
};

const STATIC_PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  return {
    id: i,
    left: `${seededRandom(i * 1.5) * 100}%`,
    top: `${seededRandom(i * 2.7) * 100}%`,
    duration: 8 + seededRandom(i * 3.9) * 4,
    delay: seededRandom(i * 4.2) * 2,
    xAnimation: seededRandom(i * 5.1) > 0.5 ? [0, 30, 0] : [0, -30, 0]
  };
});

// Floating Particles
const Particles = () => {
  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      {STATIC_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: p.left,
            top: p.top,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            x: p.xAnimation,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

// Premium Glassmorphism Card Component
const GlassCard = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    viewport={{ once: true, margin: '-100px' }}
    className={`group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-300 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

// Section Title Component
const SectionTitle = ({ title, subtitle, highlight }) => (
  <div className="text-center mb-16">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold mb-4"
    >
      <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
        {highlight}
      </span>
      {' '}{title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="text-gray-400 text-lg max-w-2xl mx-auto"
    >
      {subtitle}
    </motion.p>
  </div>
);

// Hero CTA Buttons
const CTAButtons = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.6 }}
    viewport={{ once: true }}
    className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-3xl mx-auto px-4"
  >
    <Link to="/learning" className="w-full sm:flex-1">
      <button className="w-full h-14 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 text-sm md:text-base whitespace-nowrap">
        Start Exploring
      </button>
    </Link>
    <Link to="/discover-yourself" className="w-full sm:flex-1">
    <button 
      className="w-full sm:flex-1 h-14 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 text-sm md:text-base whitespace-nowrap"
    >
      Begin Your Journey & Discover Yourself
    </button>
   </Link>
  </motion.div>
);

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // --- Live Onboarding States ---
  const [onboardingData, setOnboardingData] = useState(null);
  const [loadingOnboarding, setLoadingOnboarding] = useState(false);

  const { getCourseProgress } = useLearning();

  // --- States for Interactive Widgets ---
  
  // 1. Discover Yourself Widget States
  const [xp, setXp] = useState(12450);
  const [streak, setStreak] = useState(47);
  const [badgeUnlocked, setBadgeUnlocked] = useState(false);
  const [floatingXPs, setFloatingXPs] = useState([]);

  // 2. Skill Gap Analyzer States
  const [selectedRole, setSelectedRole] = useState('Full-Stack Developer');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

  // Resume Upload and Dynamic Parser States
  const [resumeText, setResumeText] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [uploadingResume, setUploadingResume] = useState(false);
  const [inputMode, setInputMode] = useState('upload'); // 'upload' or 'text'
  const [gapReport, setGapReport] = useState(null);

  const roleRequiredSkills = {
    'Full-Stack Developer': [
      'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MySQL', 'Python', 'C Programming', 'Pointers & Memory', 'OOP', 'Java'
    ],
    'Data Scientist': [
      'Python', 'SQL', 'MySQL', 'Statistics', 'Machine Learning', 'Data Pipeline', 'R Programming', 'Data Analytics', 'Excel'
    ],
    'AI Researcher': [
      'Python', 'Machine Learning', 'AI', 'Neural Architectures', 'C Programming', 'Calculus', 'Pointers', 'OOP', 'Java'
    ]
  };

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

  // Determine onboarding state
  const isOnboarded = user && (user.profile?.onboarding_completed === true || onboardingData);

  // Fetch live self-discovery results for onboarded users
  useEffect(() => {
    const fetchOnboardingResults = async () => {
      const token = localStorage.getItem('curveurcareer_token');
      if (!user || !token) {
        setOnboardingData(null);
        return;
      }
      
      setLoadingOnboarding(true);
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';
        const res = await fetch(`${API_URL}/api/discover/results`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.results) {
            setOnboardingData(data.results);
            
            // Set dynamic live metrics based on user performance
            const baseXP = 500 + (data.results.top_strengths?.length || 0) * 250;
            setXp(baseXP);
            setStreak(1); // 1st active day streak since completed today
            setBadgeUnlocked(true);
          }
        }
      } catch (err) {
        console.warn('Failed to fetch onboarding results:', err);
      } finally {
        setLoadingOnboarding(false);
      }
    };

    fetchOnboardingResults();
  }, [user]);

  // Calculate dynamic heights for weekly analytics graph
  const getGraphHeights = () => {
    if (!onboardingData || !onboardingData.completion_timestamp) {
      return [0, 0, 0, 0, 0, 0, 0];
    }
    const date = new Date(onboardingData.completion_timestamp);
    const dayIndex = date.getDay(); // 0 (Sun) - 6 (Sat)
    
    // Map standard week ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    let mappedIndex = dayIndex - 1;
    if (mappedIndex < 0) mappedIndex = 6; // Sunday mapped to 6

    const heights = [0, 0, 0, 0, 0, 0, 0];
    heights[mappedIndex] = 85; // Highlight today's onboarding milestone as 85% analytical intensity
    return heights;
  };

  // 3. Testimonial State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Floating Particle Generator for XP Clicks
  const triggerFloatingXP = (amount = 15, text = "+15 XP") => {
    setXp(prev => prev + amount);
    const id = Date.now() + Math.random();
    setFloatingXPs(prev => [...prev, { id, text, x: Math.random() * 80 - 40, y: -20 }]);
    setTimeout(() => {
      setFloatingXPs(prev => prev.filter(item => item.id !== id));
    }, 1500);
  };

  // Run Gap Scanner using parsed resume text
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
            
            // Compute real skill gap analysis based on resumeText
            const required = roleRequiredSkills[selectedRole] || [];
            const textToSearch = resumeText.toLowerCase();
            const present = [];
            const missing = [];
            
            required.forEach(skill => {
              // Extract main keywords for matching (e.g. "C Programming" -> "c", "React" -> "react")
              let keyword = skill.toLowerCase();
              if (keyword === 'pointers & memory') keyword = 'pointer';
              else if (keyword === 'c programming') keyword = ' c '; // avoid matching inside words
              else if (keyword === 'oop') keyword = 'object';
              
              const isPresent = textToSearch.includes(keyword) || 
                                (keyword === ' c ' && (textToSearch.includes('\nc\n') || textToSearch.startsWith('c ') || textToSearch.includes(' c,')));
                                
              if (isPresent) {
                present.push(skill);
              } else {
                missing.push(skill);
              }
            });

            // If nothing matched, but we have text, keep it authentic or give default if very empty
            const matchScore = Math.max(0, Math.round((present.length / required.length) * 100));
            
            let recommendation = '';
            if (missing.length > 0) {
              recommendation = `Master ${missing.slice(0, 2).join(' & ')} to raise your match score by ${Math.round((missing.slice(0, 2).length / required.length) * 100)}%!`;
            } else {
              recommendation = `Excellent! Your resume covers all required skills for ${selectedRole}. You are industry-ready!`;
            }

            setGapReport({
              match: matchScore,
              present,
              missing,
              recommendation
            });

            setScanComplete(true);
            triggerFloatingXP(150, "Scan Complete! +150 XP 🚀");
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
    return () => clearInterval(timer);
  }, [scanning, selectedRole, resumeText]);

  // Platform Features
  const features = [
    {
      title: 'Behavioral Understanding',
      desc: 'AI learns your unique strengths, personality, and growth patterns through active micro-scenarios.',
      icon: <Compass className="w-6 h-6 text-cyan-400" />
    },
    {
      title: 'Gamified Learning',
      desc: 'Earn XP, unlock premium badges, and build streaks with momentum-driven learning paths.',
      icon: <Flame className="w-6 h-6 text-orange-400" />
    },
    {
      title: 'Personalized Growth',
      desc: 'Customized educational pathways that dynamically adapt with your active progress and career goals.',
      icon: <Target className="w-6 h-6 text-blue-400" />
    },
    {
      title: 'AI-Guided Direction',
      desc: 'Smart predictive recommendations based on your evolving cognitive profile, interests, and aspirations.',
      icon: <Sparkles className="w-6 h-6 text-purple-400" />
    },
    {
      title: 'Career Evolution',
      desc: 'Seamless progression roadmap from early curiosity and skill gap analysis to absolute industry readiness.',
      icon: <Trophy className="w-6 h-6 text-emerald-400" />
    },
    {
      title: 'Secure Space',
      desc: 'A judgment-free environment designed to help you fail, learn, and grow at your own comfortable pace.',
      icon: <Shield className="w-6 h-6 text-pink-400" />
    },
  ];

  // Dynamic Courses mapping from coursesData (Core Coding Languages)
  const homeCourseIds = ['python', 'c', 'cplusplus', 'java', 'mysql'];
  const courses = coursesData.filter(c => homeCourseIds.includes(c.id)).map(course => {
    const gradients = {
      python: 'from-blue-600 to-cyan-600',
      c: 'from-orange-500 to-red-600',
      cplusplus: 'from-indigo-600 to-purple-600',
      java: 'from-purple-600 to-pink-600',
      mysql: 'from-green-600 to-emerald-600'
    };
    const progressInfo = getCourseProgress(course.id);
    const progressVal = progressInfo ? progressInfo.progress : 0;
    const isStarted = progressInfo ? true : false;
    return {
      id: course.id,
      title: course.name,
      level: 'Ecosystem Core Course',
      desc: course.description,
      progress: progressVal,
      started: isStarted,
      gradient: gradients[course.id] || 'from-slate-600 to-slate-800',
      difficulty: 'Core Coding'
    };
  });

  // Growth Journey Steps
  const journeySteps = [
    { step: '01', title: 'Exploration', desc: 'Engage with playful story-based scenarios to explore your natural interests and potential.' },
    { step: '02', title: 'Foundation Learning', desc: 'Build rock-solid coding principles in core languages (C, Java, Python, SQL) with instant feedback.' },
    { step: '03', title: 'Cognitive Discovery', desc: 'Identify your personality traits, EQ indicators, and optimal learning styles using AI models.' },
    { step: '04', title: 'Skill Gap Analysis', desc: 'Locate precise deficiencies in your current skillset compared against standard global job profiles.' },
    { step: '05', title: 'Career Direction', desc: 'Obtain dynamically generated pathways detailing roles, salary scales, and matched universities.' },
    { step: '06', title: 'Continuous Growth', desc: 'Maintain streaks, gather achievements, and scale up your weekly experience score (XP).' },
    { step: '07', title: 'Life Readiness', desc: 'Launch into professional internships, college listings, and high-clarity career opportunities.' },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Rahul Krishnan",
      role: "Engineering Student at Anna University",
      from: "Confused & Overwhelmed",
      to: "Full-Stack Clarity",
      text: "I was completely lost in coding. I tried web dev, app dev, and C programming but felt like I was memorizing code. CurveUrCareer showed me my behavioral profile leaned toward systems architecture. The pointer modules in C clicked, and now I am clear on my Software Engineer roadmap!",
      avatar: "R"
    },
    {
      name: "Priyanka Sen",
      role: "Aspirant at IIT Madras",
      from: "Fear of Databases",
      to: "Data Engineer Analyst",
      text: "SQL always terrified me. I hated writing long database joins. The gamified MySQL dashboard made it feel like solving puzzles! Completing daily streaks gave me massive confidence, and the AI Skill Gap analyzer showed me exactly which indices I needed to optimize next.",
      avatar: "P"
    },
    {
      name: "Abhishek Sharma",
      role: "Fresh Graduate",
      from: "Aimless Job Hunting",
      to: "AI Systems Specialist",
      text: "Every website just tells you to build a resume. CurveUrCareer actually scanned my skills, identified my lack of low-level pointers knowledge, and guided me through a 12-week challenge. The clarity transition from fear to complete self-trust was incredible.",
      avatar: "A"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-cyan-500 selection:text-slate-950 w-full">
      {/* Background Glows */}
      <FloatingParticles />
      <Particles />

      {/* Floating XP particle renderer */}
      <div className="fixed bottom-10 right-10 z-50 pointer-events-none">
        <AnimatePresence>
          {floatingXPs.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: item.y - 100, x: item.x, scale: 1.2 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 1.2 }}
              className="absolute bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black px-4 py-2 rounded-full shadow-lg shadow-orange-500/20 text-sm whitespace-nowrap"
            >
              {item.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* HERO SECTION */}
      <section className="relative py-24 md:py-36 px-6 sm:px-12 lg:px-20 min-h-[85vh] flex flex-col justify-center items-center" id="discover-yourself">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center flex flex-col items-center justify-center w-full max-w-4xl mx-auto"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/35 rounded-full text-cyan-300 text-xs font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
              Next-Gen AI Growth Ecosystem
            </motion.div>

            <h1 className="text-4xl md:text-6xl xl:text-7xl font-black mb-6 leading-tight tracking-tight text-center">
              Discover Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Strengths.
              </span>
              <br className="hidden sm:inline" />
              {' '}Build Your{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Future.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto text-center">
              We don't just throw generic career suggestions at you. CurveUrCareer is a highly personalized, gamified growth ecosystem that helps you learn core skills, map your strengths, and navigate toward meaningful success.
            </p>
            <CTAButtons />
          </motion.div> 
        </div>
      </section>

      {/* WHY THIS PLATFORM IS DIFFERENT */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            highlight="Why This Platform"
            title="is Different"
            subtitle="Most platforms just print a certificate or suggest a random job. We nurture your complete cognitive and skill lifecycle."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <GlassCard key={idx} delay={idx * 0.1} className="relative overflow-hidden group hover:scale-[1.02]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-3xl -z-10 group-hover:bg-cyan-500/5 transition-colors" />
                <div className="mb-6 p-3 bg-white/5 border border-white/10 w-fit rounded-2xl group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE SKILLS & COURSES SECTION */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent" id="explore-skills">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            highlight="Explore"
            title="Skills & Core Courses"
            subtitle="Build a bulletproof foundation in core logic. Master C, Java, Python, and SQL with micro-rewards."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true, margin: '-100px' }}
                className="group"
              >
                {/* Course Container card with glow */}
                <div className={`relative h-full bg-gradient-to-br ${course.gradient} p-[1px] rounded-2xl shadow-xl hover:shadow-${course.gradient.split(' ')[1]}/30 transition-all duration-300`}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30" />
                  
                  <div className="relative bg-slate-950 rounded-2xl p-6 h-full flex flex-col group-hover:bg-slate-900/80 transition-colors duration-300">
                    {/* Badge header */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-black tracking-widest uppercase bg-white/10 text-cyan-300 px-3 py-1 rounded-full border border-white/5">
                        {course.difficulty}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">{course.title}</h3>
                    <p className="text-slate-400 text-xs mb-4 leading-relaxed line-clamp-3">{course.desc}</p>

                    {/* Progress representation */}
                    {user && course.progress > 0 && (
                      <div className="mb-6">
                        <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                          <span>Foundation progress</span>
                          <span className="font-bold text-white">{course.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${course.progress}%` }}
                            transition={{ duration: 1.2, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                          />
                        </div>
                      </div>
                    )}

                    

                    {/* Action link */}
                    <Link to={`/learning/${course.id}`} className="mt-5">
                      <button className="w-full py-2 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 rounded-lg text-xs font-bold transition-all duration-300 border border-white/10 hover:border-transparent flex items-center justify-center gap-1.5 group/btn">
                        {course.started ? 'Continue Syllabus' : 'Explore Syllabus'}
                        <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GROWTH JOURNEY TIMELINE */}
      <section className="relative py-32 px-6" id="growth-journey">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            highlight="Your"
            title="Evolving Growth Journey"
            subtitle="The dynamic 7-step timeline mapping how students scale up their clarity, skills, and opportunities."
          />

          <div className="relative">
            {/* Curved background line */}
            <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-orange-500 -z-10 opacity-30" />

            <div className="space-y-12">
              {journeySteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.6 }}
                  viewport={{ once: true, margin: '-100px' }}
                  className={`flex flex-col md:flex-row gap-6 relative ${idx % 2 === 0 ? 'md:text-right md:flex-row-reverse' : ''}`}
                >
                  {/* Spacer or content side */}
                  <div className="flex-1 md:w-1/2" />

                  {/* Dot Indicator */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-[9px] md:-translate-x-1/2 w-[20px] h-[20px] rounded-full bg-slate-950 border-4 border-cyan-400 flex items-center justify-center z-10">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 3, delay: idx * 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                    />
                  </div>

                  {/* Card Side */}
                  <div className="flex-1 md:w-1/2 pl-10 md:pl-0">
                    <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 hover:bg-slate-900 transition-all duration-300">
                      <div className={`flex items-center gap-3 mb-2 justify-start ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <span className="text-xs font-black text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                          STAGE {step.step}
                        </span>
                        <h4 className="text-xl font-bold text-white">{step.title}</h4>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

         {/* SKILL GAP ANALYZER SIMULATOR */}
      <section className="relative py-32 px-6 border-b border-white/5" id="skill-gap">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            highlight="Skill Gap"
            title="Predictive AI Analyzer"
            subtitle="Upload your resume or paste your skills to run a real-time dynamic AI scan against high-demand futuristic target careers."
          />

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Scanner controls */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-3xl p-8 shadow-2xl space-y-6">
                <div>
                  <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-400" />
                    Target Role Selector
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Choose a specialized career route to scan deficiencies.
                  </p>
                </div>

                {/* Role Toggles */}
                <div className="space-y-2">
                  {Object.keys(roleRequiredSkills).map(role => (
                    <button
                      key={role}
                      onClick={() => {
                        setSelectedRole(role);
                        setScanComplete(false);
                      }}
                      className={`w-full p-3.5 rounded-xl border text-sm font-bold text-left transition-all duration-300 flex justify-between items-center ${selectedRole === role ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 border-orange-500/50 text-white' : 'bg-slate-950/80 border-white/5 text-slate-400 hover:border-white/15'}`}
                    >
                      {role}
                      <ChevronRight className={`w-4 h-4 text-orange-400 transition-transform ${selectedRole === role ? 'translate-x-1' : ''}`} />
                    </button>
                  ))}
                </div>

                {/* Resume Upload / Input Mode */}
                <div className="space-y-3 pt-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Your Resume Credentials
                  </label>
                  
                  <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-white/5">
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
                    <div className="border border-dashed border-white/20 rounded-xl p-4 text-center hover:border-orange-500/50 transition-colors relative cursor-pointer group">
                      <input
                        type="file"
                        accept=".txt,.pdf"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="space-y-1">
                        <div className="text-slate-300 text-xs font-semibold group-hover:text-orange-400 transition-colors">
                          {resumeFileName ? `Selected: ${resumeFileName}` : 'Drag & Drop or Click to Upload'}
                        </div>
                        <p className="text-[10px] text-slate-500">Supports PDF or TXT formats</p>
                      </div>
                    </div>
                  ) : (
                    <textarea
                      rows={3}
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder="Paste your resume text or listing of skills here..."
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-orange-500/50 outline-none transition-colors resize-none font-semibold"
                    />
                  )}

                  {uploadingResume && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Parsing resume...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
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
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-slate-950 font-black rounded-xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                >
                  {scanning ? 'Running AI Diagnostics...' : 'Launch Skill Gap Scan'}
                  {!scanning && <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />}
                </button>
              </div>
            </div>

            {/* Right Scanner Feedback Display */}
            <div className="lg:col-span-7">
              <div className="relative border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-3xl p-8 shadow-2xl min-h-[400px] flex flex-col justify-center overflow-hidden">
                {/* Active scan pulsing line */}
                {scanning && (
                  <motion.div
                    animate={{ y: [-100, 300, -100] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-lg shadow-orange-500/50 z-20 pointer-events-none"
                  />
                )}

                <AnimatePresence mode="wait">
                  {!scanning && !scanComplete && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center space-y-4 py-8"
                    >
                      <div className="w-14 h-14 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-slate-500 mx-auto">
                        <Play className="w-5 h-5 ml-1 animate-pulse text-orange-400" />
                      </div>
                      <h4 className="text-xl font-bold">Diagnostics Scanner Ready</h4>
                      <p className="text-slate-400 text-xs max-w-xs mx-auto">
                        Upload your resume file or paste text details on the left, then click the scan trigger to perform real-time gap analysis.
                      </p>
                    </motion.div>
                  )}

                  {scanning && (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 text-center"
                    >
                      <h4 className="text-lg font-bold text-orange-400 flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          className="inline-block"
                        >
                          ⚙️
                        </motion.span>
                        Scanning Profile Assets...
                      </h4>
                      <div className="h-4 bg-white/5 rounded-full overflow-hidden max-w-md mx-auto border border-white/10">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400" style={{ width: `${scanProgress}%` }} />
                      </div>
                      <p className="text-xs text-slate-500 font-mono">Loading data schemas: {scanProgress}%</p>
                    </motion.div>
                  )}

                  {scanComplete && gapReport && (
                    <motion.div
                      key="complete"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/5">
                        <div>
                          <h4 className="text-2xl font-black text-white">{selectedRole} Gap Report</h4>
                          <p className="text-xs text-slate-400">Target matches calculated dynamically from resume</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Clarity Score</p>
                          <p className="text-3xl font-black text-orange-400">
                            {gapReport.match}%
                          </p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        {/* Present skills */}
                        <div className="bg-slate-950/60 p-4 rounded-xl border border-green-500/10">
                          <p className="text-xs font-bold text-green-400 flex items-center gap-1.5 mb-3">
                            <CheckCircle2 className="w-4 h-4" /> Strong Foundation
                          </p>
                          <ul className="space-y-2 text-xs text-slate-300">
                            {gapReport.present.map(item => (
                              <li key={item} className="flex items-center gap-1">
                                <span className="text-green-500">✓</span> {item}
                              </li>
                            ))}
                            {gapReport.present.length === 0 && (
                              <span className="text-slate-500 uppercase italic">No matching skills identified</span>
                            )}
                          </ul>
                        </div>

                        {/* Deficiencies */}
                        <div className="bg-slate-950/60 p-4 rounded-xl border border-orange-500/10">
                          <p className="text-xs font-bold text-orange-400 flex items-center gap-1.5 mb-3">
                            <AlertTriangle className="w-4 h-4 animate-bounce" /> Missing Core Skills
                          </p>
                          <ul className="space-y-2 text-xs text-slate-300">
                            {gapReport.missing.map(item => (
                              <li key={item} className="flex items-center gap-1">
                                <span className="text-orange-500 font-bold">•</span> {item}
                              </li>
                            ))}
                            {gapReport.missing.length === 0 && (
                              <span className="text-green-400 font-bold">✓ None! You meet all criteria</span>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Action block */}
                      <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                        <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> AI Recommended Priority
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                          {gapReport.recommendation}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STUDENT PROGRESS DASHBOARD PREVIEW */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-blue-950/15 to-transparent" id="growth-dashboard">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            highlight="Interactive"
            title="Gamified Student Dashboard"
            subtitle="Click on any metric card to dynamically gain XP. Build consistency and streaks!"
          />

          <div className="relative">
            {!isOnboarded && (
              <div 
                onClick={() => navigate('/discover-yourself')}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/75 backdrop-blur-md rounded-3xl border border-white/10 p-8 text-center cursor-pointer group/lock transition-all duration-300 hover:bg-slate-950/70"
              >
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', duration: 0.8 }}
                  className="max-w-md space-y-6 flex flex-col items-center"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full scale-150 animate-pulse" />
                    <div className="relative w-16 h-16 rounded-2xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover/lock:border-cyan-400 group-hover/lock:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300">
                      <Lock className="w-8 h-8 animate-bounce" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent uppercase tracking-wider">
                      Growth Dashboard Encrypted
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Your gamified active learning analytics, experience XP registers, and neural achievements are locked. Complete the <strong>Discover Yourself</strong> onboarding to unlock your live performance metrics.
                    </p>
                  </div>

                  <button className="h-12 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/45 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 fill-white animate-pulse" />
                    Activate Growth Dashboard
                  </button>
                </motion.div>
              </div>
            )}

            <div className={`transition-all duration-500 ${!isOnboarded ? 'blur-md opacity-25 pointer-events-none select-none' : ''}`}>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { 
                    key: 'xp', 
                    title: 'Total Experience XP', 
                    value: isOnboarded ? xp : '----', 
                    label: isOnboarded ? 'Click to boost +25' : 'Unlock via self-discovery', 
                    icon: <Trophy className={`w-5 h-5 ${isOnboarded ? 'text-amber-400' : 'text-slate-500'}`} />, 
                    amount: isOnboarded ? 25 : 0, 
                    text: "+25 XP Boost!" 
                  },
                  { 
                    key: 'streak', 
                    title: 'Momentum Streak Days', 
                    value: isOnboarded ? streak : '--', 
                    label: isOnboarded ? 'Click to fuel streak' : 'Unlock via self-discovery', 
                    icon: <Flame className={`w-5 h-5 ${isOnboarded ? 'text-orange-500 fill-orange-500' : 'text-slate-500'}`} />, 
                    amount: isOnboarded ? 1 : 0, 
                    text: "+1 Day streak fueled! 🔥" 
                  },
                  { 
                    key: 'badges', 
                    title: 'Achievements Unlocked', 
                    value: isOnboarded && onboardingData ? `${(onboardingData.top_strengths?.length || 0)}/10` : '--/--', 
                    label: isOnboarded ? 'Complete more challenges' : 'Unlock via self-discovery', 
                    icon: <Sparkles className={`w-5 h-5 ${isOnboarded ? 'text-purple-400' : 'text-slate-500'}`} />, 
                    amount: 0, 
                    text: "" 
                  },
                  { 
                    key: 'courses', 
                    title: 'Completed Courses', 
                    value: isOnboarded ? '0/4' : '--/--', 
                    label: isOnboarded ? 'Start your first course!' : 'Unlock via self-discovery', 
                    icon: <BookOpen className={`w-5 h-5 ${isOnboarded ? 'text-cyan-400' : 'text-slate-500'}`} />, 
                    amount: isOnboarded ? 10 : 0, 
                    text: "+10 XP Study Bonus!" 
                  }
                ].map(stat => (
                  <motion.div
                    key={stat.key}
                    whileHover={isOnboarded ? { scale: 1.03 } : {}}
                    onClick={() => {
                      if (isOnboarded && stat.amount > 0) {
                        triggerFloatingXP(stat.amount, stat.text);
                        if (stat.key === 'streak') setStreak(prev => prev + 1);
                      }
                    }}
                    className={isOnboarded ? 'cursor-pointer' : ''}
                  >
                    <GlassCard className={`p-6 border-white/5 ${isOnboarded ? 'hover:border-cyan-500/30' : ''}`}>
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.title}</p>
                        {stat.icon}
                      </div>
                      <p className="text-3xl font-black text-white">{stat.value}</p>
                      <p className="text-[10px] text-cyan-400 font-semibold mt-2 animate-pulse">{stat.label}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Weekly Active Analytics Graph */}
                <div className="lg:col-span-8">
                  <div className="border border-white/10 bg-slate-900/60 backdrop-blur-md rounded-3xl p-6">
                    <h4 className="text-lg font-black text-white mb-4">Weekly Learning Analytics</h4>
                    <div className="grid grid-cols-7 gap-3 pt-4 mx-7">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                        const heights = isOnboarded ? getGraphHeights() : [0, 0, 0, 0, 0, 0, 0];
                        const isTodayActive = isOnboarded && heights[idx] > 0;
                        return (
                          <div key={idx} className="text-center flex flex-col justify-end items-center h-48">
                            <div className="flex-1 w-full flex items-end justify-center">
                              <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: `${heights[idx]}%` }}
                                transition={{ delay: idx * 0.05, duration: 1 }}
                                viewport={{ once: true }}
                                className={`w-6 sm:w-8 rounded-t-lg bg-gradient-to-t ${isTodayActive ? 'from-orange-500 to-amber-400 shadow-md shadow-orange-500/20' : 'from-blue-600 to-cyan-500'}`}
                              />
                            </div>
                            <p className="text-xs text-slate-400 mt-3 font-semibold">{day}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAREER & COLLEGE GUIDANCE */}
      <section className="relative py-32 px-6 border-t border-white/5" id="colleges">
        <div id="career-direction" className="absolute -top-24" />
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            highlight="Futuristic"
            title="Career & College Guidance"
            subtitle="Explore high-growth career sectors and premium institutions matched algorithmically to your personality strengths."
          />

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'AI Systems Architect',
                match: 94,
                salary: '₹12-25L',
                growth: 'Hyper High',
                path: 'C Core → Python Systems → ML Pipelines',
                skills: ['Low-level optimization', 'Memory Registers', 'Python']
              },
              {
                title: 'Data Solutions Architect',
                match: 86,
                salary: '₹10-18L',
                growth: 'Very High',
                path: 'MySQL Relational → Indexing → Java OOP',
                skills: ['SQL normalization', 'Schema Design', 'Data structures']
              },
              {
                title: 'Strategic Tech Lead',
                match: 79,
                salary: '₹15-28L',
                growth: 'High Momentum',
                path: 'Behavioral Discovery → Agile Systems → Java Core',
                skills: ['Emotional IQ', 'System structures', 'Strategic planning']
              }
            ].map((career, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-6 relative overflow-hidden h-full flex flex-col justify-between">
                  <div className="absolute top-0 right-0 text-7xl opacity-5 font-black pointer-events-none select-none">
                    {career.title[0]}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{career.title}</h3>
                    
                    <div className="mb-6 p-3 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center text-xs mb-1.5 font-semibold">
                        <span className="text-slate-400">Ecosystem Fit Match</span>
                        <span className="text-cyan-400">{career.match}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${career.match}%` }} />
                      </div>
                    </div>

                    <div className="space-y-2 text-xs mb-6 text-slate-300">
                      <div className="flex justify-between pb-1 border-b border-white/5">
                        <span className="text-slate-500">Average Salary scale:</span>
                        <span className="font-semibold text-green-400">{career.salary}</span>
                      </div>
                      <div className="flex justify-between pb-1 border-b border-white/5">
                        <span className="text-slate-500">Growth trajectory:</span>
                        <span className="font-semibold text-orange-400">{career.growth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Required Pathway:</span>
                        <span className="font-semibold text-purple-300">{career.path}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Priority Strengths</p>
                    <div className="flex flex-wrap gap-1.5">
                      {career.skills.map(sk => (
                        <span key={sk} className="text-[10px] font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Premium matched colleges layout */}
          <div className="border border-white/10 bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
            <h4 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              Dynamic Matched Institutions Preview
            </h4>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "IIT Madras (Direct ML Route)", match: "94% Match", tags: ["Systems Core", "Python ML"] },
                { name: "Anna University (Strategic Engineering)", match: "88% Match", tags: ["Java OOP", "MySQL relational"] },
                { name: "BITS Pilani (Low-Level Systems Core)", match: "82% Match", tags: ["C pointers", "Embedded Architectures"] }
              ].map((clg, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-white/5 rounded-2xl p-5 hover:border-cyan-500/35 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-500">RANKED MATCH</span>
                    <span className="text-xs font-black text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">{clg.match}</span>
                  </div>
                  <h5 className="font-bold text-white mb-3 text-sm">{clg.name}</h5>
                  <div className="flex gap-1.5 flex-wrap">
                    {clg.tags.map(t => (
                      <span key={t} className="text-[9px] font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* FINAL CALL TO ACTION */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent to-cyan-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Ready to Navigate Your{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Career Roadmap?
              </span>
            </h2>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Don't leave your potential to luck. Run assessments, clear foundation gaps, earn XP, and unlock your true capabilities.
            </p>
            
            <div className="pt-6">
              <CTAButtons />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FUTURISTIC FOOTER */}
      <footer className="relative border-t border-white/10 py-16 px-6 bg-slate-950 text-slate-400">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
            
            {/* Mission statement */}
            <div className="col-span-2 space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded rotate-45 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-blue-600 -rotate-45 translate-x-1/2 translate-y-1/2 scale-150" />
                  </div>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">CurveUrCareer</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                Empowering academic minds through gamified core-logic learning, emotional intelligence modeling, and predictive skill-gap analysis. Learn, explore, improve, and evolve.
              </p>
            </div>

            {/* Quick links */}
            <div className="text-left">
              <h4 className="font-bold text-white mb-4 text-sm tracking-wider uppercase">Platform</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="/" className="hover:text-cyan-400 transition-colors">Home</a></li>
                <li><a href="/discover-yourself" className="hover:text-cyan-400 transition-colors font-semibold">Explore Skills</a></li>
                <li><a href="/learning" className="hover:text-cyan-400 transition-colors">Learning Paths</a></li>
                <li><a href="/#discover-yourself" className="hover:text-cyan-400 transition-colors">Discover Yourself</a></li>
                <li><a href="/#skill-gap" className="hover:text-cyan-400 transition-colors">Skill Gap Analyzer</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="text-left">
              <h4 className="font-bold text-white mb-4 text-sm tracking-wider uppercase">Resources</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="/#about" className="hover:text-cyan-400 transition-colors">Student Testimonials</a></li>
                <li><a href="/#growth-dashboard" className="hover:text-cyan-400 transition-colors">Journey Roadmap</a></li>
                <li><a href="/" className="hover:text-cyan-400 transition-colors">C foundation Core</a></li>
                <li><a href="/" className="hover:text-cyan-400 transition-colors">MySQL joins Guide</a></li>
              </ul>
            </div>

            {/* Support/Contact */}
            <div className="text-left">
              <h4 className="font-bold text-white mb-4 text-sm tracking-wider uppercase">Contact</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-1.5">📧 support@curveUrcareer.com</li>
                <li className="flex items-center gap-1.5">💬 Community Forum</li>
                <li className="flex gap-2 pt-2">
                  <a href="/" className="p-2 bg-white/5 hover:bg-white/10 hover:text-cyan-400 rounded-lg transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="/" className="p-2 bg-white/5 hover:bg-white/10 hover:text-cyan-400 rounded-lg transition-colors">
                    <Mail className="w-4 h-4" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

          

        </div>
      </footer>

    </div>
  );
};

export default HomePage;
