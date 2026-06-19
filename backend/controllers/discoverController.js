import { supabase } from '../config/supabase.js';
import { fallbackCache } from '../config/inMemoryCache.js';

/**
 * Parses raw cognitive telemetry metrics into foundational skills & modifiers
 */
function processCognitiveTelemetry(data) {
  let foundationalSkills = {
    logicalThinking: 15,
    analyticalThinking: 15,
    criticalThinking: 15,
    creativity: 15,
    communication: 15,
    curiosity: 15,
    problemSolving: 15,
    observationSkills: 15,
    decisionMaking: 15,
    leadership: 15,
    adaptability: 15
  };
  let profilingModifiers = {
    confidence_weight: 1.0,
    precision_weight: 1.0,
    panic_index: 0.0
  };

  const simAnswers = data.simulationAnswers || {};

  // 1. Systems Crash Simulation (Logical & Analytical)
  const sc1 = simAnswers.systemsCrash || {};
  if (sc1.auth >= 1 && sc1.db >= 1) {
    foundationalSkills.logicalThinking += 10;
    foundationalSkills.analyticalThinking += 5;
  }
  if (sc1.db > sc1.auth) {
    foundationalSkills.analyticalThinking += 10;
  }

  // 2. Monolithic Deadlock Simulation (Critical Thinking & Decision Making)
  const sc2 = simAnswers.monolithicDeadlock;
  if (sc2 === 'A') {
    foundationalSkills.criticalThinking += 12;
    foundationalSkills.decisionMaking += 8;
  } else if (sc2 === 'B') {
    foundationalSkills.criticalThinking += 15;
    foundationalSkills.decisionMaking += 10;
  }

  // 3. Orbital Debris Intercept Simulation (Creativity & Problem Solving)
  const sc3 = simAnswers.orbitalDebris;
  if (sc3 === 'A') {
    foundationalSkills.creativity += 15;
    foundationalSkills.problemSolving += 5;
  } else if (sc3 === 'D') {
    foundationalSkills.problemSolving += 15;
    foundationalSkills.creativity += 8;
  } else {
    foundationalSkills.problemSolving += 10;
    foundationalSkills.creativity += 5;
  }

  // 4. Telemetry matrix evaluation
  const telemetry = data.telemetry || {};
  const elapsedMs = telemetry.elapsedMs || 0;
  const optionSwitches = telemetry.optionSwitches || 0;
  const textHighlighted = telemetry.textHighlighted || false;
  const textSelectionCount = telemetry.textSelectionCount || 0;

  if (elapsedMs > 8000) {
    profilingModifiers.confidence_weight -= 0.15;
    profilingModifiers.precision_weight += 0.20;
  }
  if (optionSwitches > 2) {
    profilingModifiers.panic_index += 0.35;
  }
  if (textHighlighted || textSelectionCount > 2) {
    profilingModifiers.precision_weight += 0.15;
    foundationalSkills.criticalThinking += 3;
  }

  // Scale scores back to fit behavior_profile range (1 to 5) for storage
  const behaviorData = {
    analytical_score: Math.min(5, Math.max(1, Math.round(foundationalSkills.analyticalThinking / 6))),
    creativity_score: Math.min(5, Math.max(1, Math.round(foundationalSkills.creativity / 6))),
    exploration_level: Math.min(5, Math.max(1, Math.round(foundationalSkills.observationSkills / 6))),
    communication_tendency: Math.min(5, Math.max(1, Math.round(foundationalSkills.communication / 6))),
    curiosity_score: Math.min(5, Math.max(1, Math.round(foundationalSkills.curiosity / 6))),
    logical_reasoning_score: Math.min(5, Math.max(1, Math.round(foundationalSkills.logicalThinking / 6))),
    retry_behavior_score: Math.min(5, Math.max(1, Math.round(foundationalSkills.adaptability / 6))),
    emotional_confidence_score: Math.min(5, Math.max(1, Math.round(foundationalSkills.problemSolving / 6))),
    learning_style_pattern: data.learningBehavior || 'Adaptive Learner'
  };

  return { foundationalSkills, profilingModifiers, behaviorData };
}

/**
 * Capture progressive onboarding self-discovery steps
 * POST /api/discover/progress
 */
export const saveProgress = async (req, res) => {
  const { stage, data, metrics } = req.body;
  const userId = req.user.id;

  if (!stage || !data) {
    return res.status(400).json({ success: false, error: 'Stage and data parameters are required' });
  }

  try {
    // 1. Log interaction in interaction_logs for behavioral analytics
    if (metrics) {
      try {
        await req.supabase
          .from('interaction_logs')
          .insert({
            user_id: userId,
            interaction_type: `stage_${stage}`,
            response_time: metrics.responseTime || 0,
            choice_pattern: { data, metrics },
            engagement_score: metrics.engagementScore || 1.0,
            hover_sequences: metrics.hoverSequences || null,
            scroll_depth: metrics.scrollDepth || null,
            text_selection_count: metrics.textSelectionCount || null,
            middle_click_backtrack: metrics.middleClickBacktrack || null
          });
      } catch (logError) {
        console.warn('Interaction log Supabase write failed, skipping log.', logError.message);
      }
    }

    // 2. Perform progressive saving depending on onboarding phase
    switch (stage) {
      case 'identity': {
        fallbackCache.setProfile(userId, { 
          education_stage: data.educationStage,
          name: data.name || req.user.user_metadata?.username
        });
        try {
          await req.supabase
            .from('profiles')
            .upsert({ 
              id: userId,
              email: req.user.email,
              username: req.user.user_metadata?.username || req.user.email?.split('@')[0] || 'Explorer',
              name: data.name || req.user.user_metadata?.username,
              education_stage: data.educationStage,
              updated_at: new Date().toISOString()
            }, { onConflict: 'id' });
        } catch (dbErr) {
          console.warn('Supabase profile identity save error:', dbErr.message);
        }
        break;
      }

      case 'academic_journey':
      case 'academic_intelligence': {
        // Handle new academic intelligence format
        const stream = data.academicStream || data.stream;
        const favSubjects = data.favoriteSubjects || [];
        const marks = data.marks || data.marksRange;
        const confidence = data.academicConfidence || data.confidence;

        fallbackCache.setProfile(userId, {
          name: data.name,
          academic_stream: stream,
          favorite_subjects: favSubjects,
          marks_range: marks,
          academic_confidence: confidence
        });

        try {
          await req.supabase
            .from('profiles')
            .upsert({
              id: userId,
              email: req.user.email,
              username: req.user.user_metadata?.username || req.user.email?.split('@')[0] || 'Explorer',
              name: data.name || req.user.user_metadata?.username,
              academic_stream: stream,
              favorite_subjects: favSubjects,
              marks_range: marks,
              academic_confidence: confidence,
              updated_at: new Date().toISOString()
            }, { onConflict: 'id' });
        } catch (dbErr) {
          console.warn('Supabase academic save error:', dbErr.message);
        }
        break;
      }

      case 'skill_discovery': {
        const { foundationalSkills, profilingModifiers, behaviorData } = processCognitiveTelemetry(data);

        // Cache full skill discovery details
        fallbackCache.setBehaviorProfile(userId, {
          ...behaviorData,
          all_skills: foundationalSkills,
          tracking_metrics: {
            ...profilingModifiers,
            elapsedMs: data.telemetry?.elapsedMs,
            optionSwitches: data.telemetry?.optionSwitches
          }
        });

        try {
          await req.supabase
            .from('behavior_profile')
            .upsert({
              user_id: userId,
              ...behaviorData,
              updated_at: new Date().toISOString()
            });
        } catch (dbErr) {
          console.warn('Supabase behavior profile save error:', dbErr.message);
        }
        break;
      }

      case 'career_lifestyle': {
        fallbackCache.setProfile(userId, {
          lifestyle_preferences: data
        });

        try {
          await req.supabase
            .from('profiles')
            .update({
              lifestyle_preferences: data,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);
        } catch (dbErr) {
          console.warn('Supabase lifestyle save error:', dbErr.message);
        }
        break;
      }

      // Keep legacy cases for safe backwards-compatibility
      case 'interests_decided': {
        const interestRows = (data.interests || []).map(interest => ({
          user_id: userId,
          interest: interest,
          interaction_strength: 1.0,
          confidence_score: 0.9,
          created_at: new Date().toISOString()
        }));
        fallbackCache.setInterests(userId, interestRows);
        try {
          await req.supabase.from('user_interests').delete().eq('user_id', userId);
          if (interestRows.length > 0) {
            await req.supabase.from('user_interests').upsert(interestRows);
          }
        } catch (dbErr) {
          console.warn('Supabase legacy interests save error:', dbErr.message);
        }
        break;
      }

      case 'interests_scenarios': {
        const interestMap = {};
        if (Array.isArray(data.scenarios)) {
          data.scenarios.forEach(sc => {
            const interest = sc.mappedInterest;
            if (interest) interestMap[interest] = (interestMap[interest] || 0) + 1;
          });
        }
        const calculatedInterests = Object.entries(interestMap).map(([interest, score]) => ({
          user_id: userId,
          interest: interest,
          interaction_strength: score,
          confidence_score: 0.7,
          created_at: new Date().toISOString()
        }));
        fallbackCache.setInterests(userId, calculatedInterests);
        try {
          await req.supabase.from('user_interests').delete().eq('user_id', userId);
          if (calculatedInterests.length > 0) {
            await req.supabase.from('user_interests').upsert(calculatedInterests);
          }
        } catch (dbErr) {
          console.warn('Supabase scenario interests error:', dbErr.message);
        }
        break;
      }

      case 'skills_game': {
        const behaviorData = {
          analytical_score: data.analyticalScore || 0,
          creativity_score: data.creativityScore || 0,
          exploration_level: data.explorationLevel || 0,
          logical_reasoning_score: data.logicalReasoningScore || 0,
          retry_behavior_score: data.retryCount || 0,
          curiosity_score: data.curiosityScore || 0,
          communication_tendency: data.communicationScore || 0,
          emotional_confidence_score: data.confidenceScore || 0,
          learning_style_pattern: data.learningStylePattern || 'Observer'
        };
        fallbackCache.setBehaviorProfile(userId, behaviorData);
        try {
          await req.supabase.from('behavior_profile').upsert({ user_id: userId, ...behaviorData, updated_at: new Date().toISOString() });
        } catch (dbErr) {
          console.warn('Supabase legacy skills_game error:', dbErr.message);
        }
        break;
      }

      case 'mindset': {
        fallbackCache.setProfile(userId, { career_mindset: data.mindset });
        try {
          await req.supabase.from('profiles').update({ career_mindset: data.mindset, updated_at: new Date().toISOString() }).eq('id', userId);
        } catch (dbErr) {
          console.warn('Supabase legacy mindset error:', dbErr.message);
        }
        break;
      }

      default:
        return res.status(400).json({ success: false, error: `Invalid discovery stage: ${stage}` });
    }

    return res.status(200).json({ 
      success: true, 
      message: `Progress captured successfully for phase: ${stage}` 
    });

  } catch (err) {
    console.error(`Progress save failure in stage ${stage}:`, err);
    return res.status(200).json({ 
      success: true, 
      message: `Progress saved in memory fallback for stage: ${stage}` 
    });
  }
};

/**
 * Perform Career Analysis calculations & generate the comprehensive Dashboard JSON
 */
export const calculateRichRecommendations = (profile, behavior) => {
  const stream = profile?.academic_stream || 'Other';
  const favSubjects = profile?.favorite_subjects || [];
  const marks = profile?.marks_range || '75-89';
  const confidence = profile?.academic_confidence || 3;
  const lifestyle = profile?.lifestyle_preferences || {};

  // Extract skills from behavior (full all_skills details or defaults)
  const skills = behavior?.all_skills || {
    logicalThinking: (behavior?.logical_reasoning_score || 3) * 6,
    analyticalThinking: (behavior?.analytical_score || 3) * 6,
    criticalThinking: (behavior?.analytical_score || 3) * 6,
    creativity: (behavior?.creativity_score || 3) * 6,
    communication: (behavior?.communication_tendency || 3) * 6,
    curiosity: (behavior?.curiosity_score || 3) * 6,
    problemSolving: (behavior?.emotional_confidence_score || 3) * 6,
    observationSkills: (behavior?.exploration_level || 3) * 6,
    decisionMaking: (behavior?.analytical_score || 3) * 6,
    leadership: (behavior?.communication_tendency || 3) * 6,
    adaptability: (behavior?.retry_behavior_score || 2) * 6,
    learningBehavior: 18
  };

  const telemetry = behavior?.tracking_metrics || {
    confidence_weight: 1.0,
    precision_weight: 1.0,
    panic_index: 0.0
  };
  const confW = telemetry.confidence_weight || 1.0;
  const precW = telemetry.precision_weight || 1.0;
  const panicI = telemetry.panic_index || 0.0;

  const norm = (val) => {
    const v = val || 15;
    return ((v - 15) / 15) * 8 + 2;
  };
  const getBehavioralBoost = (v1, v2, v3) => {
    return (norm(v1) + norm(v2) + norm(v3)) * 1.33;
  };

  // 1. Identify dominant behavioral archetype
  let dominantProfile = 'Resilient Operations Engine';
  let traits = ['Adaptable', 'Decisive', 'Stable'];
  let profileDesc = 'You thrive in unpredictable, high-variable technical environments. With strong adaptability vectors and rapid decisioning under pressure, you are highly suited for Site Reliability Engineering, Solutions Architecture, and scaling complex tech ventures.';

  const pairs = [
    { name: 'Strategic Systems Architect', val: skills.logicalThinking + skills.problemSolving, traits: ['Logical', 'Structured', 'Problem Solver'], desc: 'You approach challenges with structured precision. Your strong capacity for logical sequence reasoning and algorithm analysis makes you excellent at designing robust, scaled backend architectures, DevOps, cloud infrastructure, and security protocols.' },
    { name: 'Imaginative Product Innovator', val: skills.creativity + skills.curiosity, traits: ['Creative', 'Curious', 'Lateral Thinker'], desc: 'You see connections where others see walls. Guided by an insatiable curiosity and a natural creative flair, you excel at prototyping novel solutions, designing human-computer interfaces (UI/UX), and steering frontend engineering projects.' },
    { name: 'Analytical Intelligence Lead', val: skills.analyticalThinking + skills.criticalThinking, traits: ['Analytical', 'Data-Driven', 'Rational'], desc: 'You let data tell the story. Your exceptional analytical reasoning, critical evaluation, and resource allocation decision skills make you highly suited for data science pipelines, ML/DL research, and quantitative logic systems.' },
    { name: 'Coordinating Product Strategist', val: skills.communication + skills.leadership, traits: ['Empathetic', 'Communicator', 'Leader'], desc: 'You thrive in collective structures. By synthesizing communications, coordinating options prioritization, and taking charge of team decisions, you bridge the gap between technical requirements and organizational success in Technical Product Management and Scrum Orchestration.' },
    { name: 'Resilient Operations Engine', val: skills.adaptability + skills.problemSolving, traits: ['Adaptable', 'Decisive', 'Stable'], desc: 'You thrive in unpredictable, high-variable technical environments. With strong adaptability vectors, rapid decisioning, and high stability under variable adjustments, you are highly suited for Site Reliability Engineering, Solutions Architecture, and tech ventures.' }
  ];

  pairs.sort((a, b) => b.val - a.val);
  dominantProfile = pairs[0].name;
  traits = pairs[0].traits;
  profileDesc = pairs[0].desc;

  // 2. Compute Match Scores for Career Paths using the dual-axis telemetry adjustments
  const pathways = [
    {
      name: 'AI & Intelligent Systems',
      description: 'Building next-generation smart agents, neural networks, data modeling, and automation architectures.',
      baseBoost: (stream === 'Computer Science' || stream === 'Science') ? 30 : 10,
      subjectBoost: (favSubjects.includes('Mathematics') || favSubjects.includes('Computer Science') || favSubjects.includes('Physics')) ? 30 : 10,
      behavioralBoost: getBehavioralBoost(skills.logicalThinking, skills.analyticalThinking, skills.problemSolving) * confW * precW,
      salaryPotential: '₹12 - ₹28 LPA',
      demand: 'Exponential',
      competition: 'High',
      stability: 'Medium-High',
      futureOpportunities: 'High growth driven by conversational models, automation tools, and agentic computing.',
      requiredSkills: ['Logical Thinking', 'Analytical Thinking', 'Problem Solving', 'Mathematics'],
      recommendedCourses: ['Python', 'MySQL', 'Problem Solving'],
      certifications: ['AWS Certified Machine Learning Specialist', 'TensorFlow Developer Certificate'],
      projects: ['Build a neural network classifier', 'Implement a secure MySQL data analysis dashboard']
    },
    {
      name: 'Software Engineering',
      description: 'Creating robust mobile applications, complex backend architectures, web solutions, and software systems.',
      baseBoost: (stream === 'Computer Science' || stream === 'Science') ? 30 : 15,
      subjectBoost: (favSubjects.includes('Computer Science') || favSubjects.includes('Mathematics')) ? 30 : 10,
      behavioralBoost: getBehavioralBoost(skills.logicalThinking, skills.problemSolving, skills.adaptability) * confW * precW,
      salaryPotential: '₹8 - ₹20 LPA',
      demand: 'Very High',
      competition: 'High',
      stability: 'High',
      futureOpportunities: 'Continuous expansion in cloud technologies, SaaS platforms, and collaborative development tools.',
      requiredSkills: ['Logical Thinking', 'Problem Solving', 'Adaptability', 'Computer Science'],
      recommendedCourses: ['C', 'Java', 'Python'],
      certifications: ['Oracle Certified Professional Java Developer', 'Google Cloud Associate Cloud Engineer'],
      projects: ['Build a full-stack task manager', 'Create a local compiler helper in C']
    },
    {
      name: 'Product & Design Innovation (UI/UX)',
      description: 'Bridging creative user research with technical logic to define interface systems and beautiful products.',
      baseBoost: (stream === 'Arts & Humanities' || stream === 'Computer Science') ? 30 : 15,
      subjectBoost: (favSubjects.includes('English') || favSubjects.includes('Computer Science') || favSubjects.includes('Geography') || favSubjects.includes('History')) ? 25 : 10,
      behavioralBoost: getBehavioralBoost(skills.creativity, skills.curiosity, skills.communication) * confW * precW,
      salaryPotential: '₹7 - ₹16 LPA',
      demand: 'High',
      competition: 'Medium',
      stability: 'High',
      futureOpportunities: 'Growing relevance in VR interfaces, customer psychology mapping, and creative digital agencies.',
      requiredSkills: ['Creativity', 'Curiosity', 'Communication', 'English'],
      recommendedCourses: ['Communication Skills', 'Problem Solving'],
      certifications: ['Google UX Design Professional Certificate', 'Interaction Design Foundation Cert'],
      projects: ['Design an interactive workspace planner wireframe', 'Conduct user empathy study for elderly users']
    },
    {
      name: 'Data Analytics & FinTech',
      description: 'Mining big datasets, running quantitative statistical models, and automating business financial systems.',
      baseBoost: (stream === 'Commerce' || stream === 'Computer Science') ? 30 : 15,
      subjectBoost: (favSubjects.includes('Mathematics') || favSubjects.includes('Economics') || favSubjects.includes('Accountancy') || favSubjects.includes('Business Studies')) ? 30 : 10,
      behavioralBoost: getBehavioralBoost(skills.analyticalThinking, skills.decisionMaking, skills.logicalThinking) * confW * precW,
      salaryPotential: '₹8 - ₹18 LPA',
      demand: 'Very High',
      competition: 'Medium-High',
      stability: 'High',
      futureOpportunities: 'Essential in digital transactions, cloud analytics, and predictive market models.',
      requiredSkills: ['Analytical Thinking', 'Logical Thinking', 'Decision Making', 'Mathematics'],
      recommendedCourses: ['Python', 'MySQL', 'Problem Solving'],
      certifications: ['Google Data Analytics Professional Certificate', 'Microsoft Certified: Power BI Analyst'],
      projects: ['Analyze transaction anomaly patterns using Python', 'Build a real-time sales reporting database']
    },
    {
      name: 'Biotechnology & Health Informatics',
      description: 'Developing digital systems for healthcare databases, genomic sequencing, and biological lab systems.',
      baseBoost: (stream === 'Biology') ? 30 : 10,
      subjectBoost: (favSubjects.includes('Biology') || favSubjects.includes('Chemistry') || favSubjects.includes('Physics')) ? 30 : 10,
      behavioralBoost: getBehavioralBoost(skills.curiosity, skills.observationSkills, skills.analyticalThinking) * confW * precW,
      salaryPotential: '₹6 - ₹15 LPA',
      demand: 'High',
      competition: 'Low-Medium',
      stability: 'Very High',
      futureOpportunities: 'Pivotal role in automated diagnostic equipment, vaccine research networks, and healthcare app engines.',
      requiredSkills: ['Curiosity', 'Observation Skills', 'Analytical Thinking', 'Biology'],
      recommendedCourses: ['Python', 'MySQL', 'Communication Skills'],
      certifications: ['Certified Health Informatics Professional', 'Bioinformatics Specialization Certificate'],
      projects: ['Model molecular structures using visualization tools', 'Design database to catalog clinical outcomes']
    }
  ];

  // Map and sort recommendations
  const scoredPathways = pathways.map(p => {
    const rawScore = Math.round(p.baseBoost + p.subjectBoost + p.behavioralBoost);
    const matchScore = Math.min(98, Math.max(55, rawScore));
    return {
      ...p,
      matchScore
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const primaryRecommendations = scoredPathways.slice(0, 3);
  const backupRecommendations = scoredPathways.slice(3, 5);

  // 3. College Recommendations
  const isTechStream = stream === 'Computer Science' || stream === 'Science';
  const isCommerceStream = stream === 'Commerce';
  const isBiologyStream = stream === 'Biology';

  let collegeData = {
    dream: [
      { name: 'IIT Madras (Indian Institute of Technology)', location: 'Chennai', desc: 'Renowned globally for research publications, compute servers, and B.Tech algorithms.' },
      { name: 'BITS Pilani (Birla Institute)', location: 'Rajasthan', desc: 'Supreme private institution highlighting high startup placements and flexible degree paths.' }
    ],
    realistic: [
      { name: 'VIT University (Vellore Institute)', location: 'Vellore', desc: 'Vast campus offering exceptional multi-language programming streams and global tie-ups.' },
      { name: 'CEG, Anna University', location: 'Chennai', desc: 'Historic state institution with extremely competitive cutoff lists for CS and engineering.' }
    ],
    safe: [
      { name: 'SRM Institute of Science & Tech', location: 'Chennai', desc: 'Flexible credit system, large modern hackathon infrastructure, and broad placement drives.' },
      { name: 'Amrita School of Engineering', location: 'Coimbatore', desc: 'Strong focus on core engineering fundamentals and values.' }
    ]
  };

  if (isCommerceStream) {
    collegeData = {
      dream: [
        { name: 'SRCC (Shri Ram College of Commerce)', location: 'Delhi', desc: 'Premium Indian college for finance, economics, business analytics, and commerce.' },
        { name: 'Loyola College (Autonomous)', location: 'Chennai', desc: 'Highly esteemed arts and commerce center with excellent corporate internship placements.' }
      ],
      realistic: [
        { name: 'Christ University (Deemed)', location: 'Bengaluru', desc: 'Modern practical curriculum highlighting business cases and presentation skills.' },
        { name: 'Symbiosis College of Arts & Commerce', location: 'Pune', desc: 'Excellent industrial commerce pathways and collaborative internship options.' }
      ],
      safe: [
        { name: 'MCC (Madras Christian College)', location: 'Chennai', desc: 'Iconic lush campus with top-tier history in business administration and economics.' },
        { name: 'SRM School of Management', location: 'Chennai', desc: 'Solid starting corporate tracks and modern digital marketing facilities.' }
      ]
    };
  } else if (isBiologyStream) {
    collegeData = {
      dream: [
        { name: 'AIIMS (All India Institute of Medical Sciences)', location: 'Delhi', desc: 'Elite research institution leading in bioinformatics and diagnostic practices.' },
        { name: 'CMC Vellore (Christian Medical College)', location: 'Vellore', desc: 'Outstanding clinical focus and data research operations.' }
      ],
      realistic: [
        { name: 'JIPMER', location: 'Puducherry', desc: 'Excellent infrastructure for biological research and clinical data systems.' },
        { name: 'PSG College of Technology (Biotech)', location: 'Coimbatore', desc: 'Well-equipped labs for industrial biochemistry and health analytics.' }
      ],
      safe: [
        { name: 'Amrita School of Biotechnology', location: 'Kollam', desc: 'Excellent training in sequencing algorithms and bio-lab processes.' },
        { name: 'Sathyabama University', location: 'Chennai', desc: 'Convenient admission paths with dedicated departments in biotechnology.' }
      ]
    };
  }

  // Study location preferences influence
  const locationPref = lifestyle.study_location || 'Elsewhere in India';
  if (lifestyle.work_abroad || locationPref === 'Abroad') {
    collegeData.dream.unshift({
      name: 'National University of Singapore (NUS)',
      location: 'Singapore',
      desc: 'Top global university for Computer Science, AI, and systems engineering.'
    });
    collegeData.dream = collegeData.dream.slice(0, 2);
  }

  // 4. Learning Ecosystem Recommendations
  const primaryPath = primaryRecommendations[0];
  const targetCourses = primaryPath.recommendedCourses || ['Python', 'MySQL', 'Problem Solving'];
  
  // Skill gaps analyzer (compare target career skills with validated strengths)
  const reqSkills = primaryPath.requiredSkills || ['Logical Thinking', 'Analytical Thinking'];
  
  // Validated strengths are skills >= 22 (representing baseline 15 + high confidence threshold)
  const validatedStrengths = [];
  if (skills.logicalThinking >= 22) validatedStrengths.push('Logical Thinking');
  if (skills.analyticalThinking >= 22) validatedStrengths.push('Analytical Thinking');
  if (skills.criticalThinking >= 22) validatedStrengths.push('Critical Thinking');
  if (skills.creativity >= 22) validatedStrengths.push('Creativity');
  if (skills.communication >= 22) validatedStrengths.push('Communication');
  if (skills.curiosity >= 22) validatedStrengths.push('Curiosity');
  if (skills.problemSolving >= 22) validatedStrengths.push('Problem Solving');
  if (skills.observationSkills >= 22) validatedStrengths.push('Observation Skills');

  const missingSkills = reqSkills.filter(s => !validatedStrengths.includes(s));

  return {
    identitySnapshot: {
      profileName: dominantProfile,
      description: profileDesc,
      traits: traits
    },
    academicInsights: {
      strongestSubjects: favSubjects.slice(0, 3),
      alignmentFeedback: `Your selection of ${favSubjects.join(', ')} aligns extremely well with your current stream ${stream}. This academic baseline establishes a solid platform for professional careers.`,
      streamInfo: `Stream: ${stream} | Potential Performance: ${marks}`
    },
    skillAnalytics: {
      logicalThinking: norm(skills.logicalThinking) * 10,
      analyticalThinking: norm(skills.analyticalThinking) * 10,
      criticalThinking: norm(skills.criticalThinking) * 10,
      creativity: norm(skills.creativity) * 10,
      communication: norm(skills.communication) * 10,
      curiosity: norm(skills.curiosity) * 10,
      problemSolving: norm(skills.problemSolving) * 10,
      observationSkills: norm(skills.observationSkills) * 10,
      decisionMaking: norm(skills.decisionMaking) * 10,
      leadership: norm(skills.leadership) * 10,
      adaptability: norm(skills.adaptability) * 10
    },
    recommendedPathways: primaryRecommendations.map(p => ({
      name: p.name,
      description: p.description,
      matchScore: p.matchScore,
      matchReason: p.matchReason || `Your strong combination of ${p.requiredSkills.slice(0, 2).join(' and ')} combined with your stream ${stream} fuels this direction.`,
      salaryPotential: p.salaryPotential,
      demand: p.demand,
      competition: p.competition,
      stability: p.stability,
      futureOpportunities: p.futureOpportunities
    })),
    backupPathways: backupRecommendations.map(p => ({
      name: p.name,
      description: p.description,
      matchScore: p.matchScore,
      matchReason: `Aligns with your secondary interests in ${p.requiredSkills.slice(0, 2).join(' & ')}.`
    })),
    learningRecommendations: {
      courses: targetCourses,
      certifications: primaryPath.certifications,
      projects: primaryPath.projects,
      priorities: missingSkills.length > 0 
        ? missingSkills.map(s => `Neutralize gap in ${s} through foundational modules`)
        : ['Explore advanced research concepts', 'Begin building high-scale portfolio projects']
    },
    higherEducation: {
      recommendation: lifestyle.higher_education 
        ? `Pursue a specialized Master\'s Degree or Advanced Postgraduate Certificate in ${primaryPath.name}.`
        : `Focus on immediate Career Readiness and Professional Certificates directly after graduation.`,
      locationPreference: locationPref,
      suggestedDegrees: isTechStream 
        ? ['B.Tech Computer Science', 'B.Sc Data Science & AI', 'M.Sc Systems Computing']
        : isCommerceStream 
          ? ['B.Com Honours', 'BBA Finance & FinTech', 'MBA Product Management']
          : ['B.Sc Biotechnology', 'B.Sc Health Informatics', 'M.Sc Bioinformatics']
    },
    colleges: collegeData,
    careerRoadmap: {
      foundations: `Establish strong grasp on ${favSubjects.slice(0, 2).join(' and ')} and begin practicing core programming logic or analytics.`,
      skillDevelopment: `Enroll in CurveUrCareer's target courses (${targetCourses.join(', ')}) to systematically resolve foundational skill gaps.`,
      projects: `Build portfolio projects such as: "${primaryPath.projects[0]}". Host them on a public repository.`,
      internships: `Secure early summer internship placements or coordinate startup project roles to gain practical experience.`,
      advancedLearning: `Complete advanced certifications such as: "${primaryPath.certifications[0]}" to stand out.`,
      careerReadiness: `Refine your resume, practice placement coding tests, record mock interviews, and apply for roles.`
    },
    skillGapAnalyzer: {
      requiredSkills: reqSkills,
      validatedStrengths: reqSkills.filter(s => validatedStrengths.includes(s)),
      missingSkills: missingSkills
    },
    aptitudeFoundation: skills,
    executionProfile: {
      confidenceWeight: confW,
      precisionWeight: precW,
      panicIndex: panicI,
      styleDescription: dominantProfile === 'Strategic Systems Architect' ? 'Low Hesitation / Elevated Precision' :
                        dominantProfile === 'Imaginative Product Innovator' ? 'High Option Traversal & Exploration' :
                        dominantProfile === 'Analytical Intelligence Lead' ? 'High Context Read Times / Continuous Highlighting' :
                        dominantProfile === 'Coordinating Product Strategist' ? 'Collaborative Option Prioritization' :
                        'High Stability under Variable Adjustments'
    }
  };
};

export const completeDiscovery = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Retrieve profile and behavior documents from database
    let profile = null;
    try {
      const { data: dbProfile } = await req.supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      profile = dbProfile;
    } catch (e) {
      console.warn('Supabase profiles read failed, falling back to cache:', e.message);
    }

    const cachedProfile = fallbackCache.getProfile(userId);
    profile = profile || cachedProfile;

    if (!profile) {
      const defaultUsername = req.user.user_metadata?.username || req.user.email?.split('@')[0] || 'Explorer';
      profile = fallbackCache.setProfile(userId, {
        id: userId,
        email: req.user.email,
        username: defaultUsername,
        name: defaultUsername,
        education_stage: 'College 1st Year',
        academic_stream: 'Computer Science',
        favorite_subjects: ['Mathematics', 'Computer Science'],
        marks_range: '90-100',
        academic_confidence: 4,
        onboarding_completed: false
      });
    }

    let behavior = null;
    try {
      const { data: dbBehavior } = await req.supabase
        .from('behavior_profile')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      behavior = dbBehavior;
    } catch (e) {
      console.warn('Supabase behavior read failed, falling back to cache:', e.message);
    }

    const cachedBehavior = fallbackCache.getBehaviorProfile(userId);
    behavior = behavior || cachedBehavior;

    // 2. Perform Career Intelligence calculations
    const dashboardData = calculateRichRecommendations(profile, behavior);

    // Save final completion parameters back to profile
    const profileUpdates = {
      onboarding_completed: true,
      exploration_type: dashboardData.identitySnapshot.profileName,
      confidence_level: profile.academic_confidence >= 4 ? 'High Confidence' : 'Foundational Explorer',
      learning_behavior: behavior?.learning_style_pattern || 'Adaptive Learner',
      updated_at: new Date().toISOString()
    };

    fallbackCache.setProfile(userId, profileUpdates);
    fallbackCache.setDiscoverResults(userId, { dashboard_data: dashboardData });

    // 3. Write to Supabase database
    try {
      await req.supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('id', userId);
    } catch (e) {
      console.warn('Supabase complete profiles update skipped:', e.message);
    }

    try {
      await req.supabase
        .from('discover_yourself_results')
        .upsert({
          user_id: userId,
          top_strengths: dashboardData.skillGapAnalyzer.validatedStrengths,
          detected_patterns: dashboardData.identitySnapshot.traits,
          recommended_pathways: dashboardData.recommendedPathways.map(p => p.name),
          skill_gaps: dashboardData.skillGapAnalyzer.missingSkills,
          personalized_summary: dashboardData.identitySnapshot.description,
          dashboard_data: dashboardData,
          completion_timestamp: new Date().toISOString()
        });
    } catch (e) {
      console.warn('Supabase complete discover results upsert skipped:', e.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Self-discovery synthesis completed successfully!',
      results: dashboardData
    });

  } catch (err) {
    console.error('Discovery completion error:', err);
    return res.status(500).json({ success: false, error: 'Failed to synthesize self-discovery results' });
  }
};

export const getDiscoveryResults = async (req, res) => {
  const userId = req.user.id;

  try {
    let dbResults = null;
    try {
      const { data, error } = await req.supabase
        .from('discover_yourself_results')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      if (!error && data) dbResults = data;
    } catch (e) {
      console.warn('Supabase results read error:', e.message);
    }

    const cachedResults = fallbackCache.getDiscoverResults(userId);
    const results = dbResults || cachedResults;

    if (!results || !results.dashboard_data) {
      // If we have profile data, we can dynamically run completeDiscovery on the fly!
      let profile = fallbackCache.getProfile(userId);
      let behavior = fallbackCache.getBehaviorProfile(userId);

      if (profile && behavior) {
        console.log('Results missing, performing on-the-fly dashboard calculation');
        const dashboardData = calculateRichRecommendations(profile, behavior);
        return res.status(200).json({
          success: true,
          results: {
            dashboard_data: dashboardData,
            profile,
            behavior
          }
        });
      }

      return res.status(404).json({ 
        success: false, 
        error: 'Self-discovery results not found or onboarding is incomplete' 
      });
    }

    let profile = null;
    try {
      const { data } = await req.supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      profile = data;
    } catch (e) {
      console.warn('Supabase profile read error:', e.message);
    }
    profile = profile || fallbackCache.getProfile(userId);

    return res.status(200).json({
      success: true,
      results: {
        ...results,
        profile
      }
    });

  } catch (err) {
    console.error('Fetch discovery results error:', err);
    return res.status(500).json({ success: false, error: 'Database query exception' });
  }
};
