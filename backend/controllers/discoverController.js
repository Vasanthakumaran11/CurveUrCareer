import { supabase } from '../config/supabase.js';
import { fallbackCache } from '../config/inMemoryCache.js';

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
            engagement_score: metrics.engagementScore || 1.0
          });
      } catch (logError) {
        console.warn('Interaction log Supabase write failed (RLS blocked), skipping log.', logError.message);
      }
    }

    // 2. Perform progressive saving depending on onboarding phase
    switch (stage) {
      case 'identity': {
        // Save educational stage in-memory
        fallbackCache.setProfile(userId, { 
          education_stage: data.educationStage,
          name: data.name || req.user.user_metadata?.username
        });

        // Try Supabase save
        try {
          const { error: idError } = await req.supabase
            .from('profiles')
            .upsert({ 
              id: userId,
              email: req.user.email,
              username: req.user.user_metadata?.username || req.user.email?.split('@')[0] || 'Explorer',
              name: data.name || req.user.user_metadata?.username,
              education_stage: data.educationStage,
              updated_at: new Date().toISOString()
            }, { onConflict: 'id' });
          if (idError) console.warn('Supabase profile save failed, relying on cache fallback:', idError.message);
        } catch (dbErr) {
          console.warn('Supabase profile save exception, relying on cache fallback:', dbErr.message);
        }
        break;
      }

      case 'academic_journey': {
        // Save academic details in-memory cache
        fallbackCache.setProfile(userId, {
          academic_stream: data.stream,
          favorite_subjects: data.favoriteSubjects,
          marks_range: data.marksRange,
          academic_confidence: data.academicConfidence
        });

        // Try Supabase save
        try {
          const { error: acError } = await req.supabase
            .from('profiles')
            .update({
              academic_stream: data.stream,
              favorite_subjects: data.favoriteSubjects,
              marks_range: data.marksRange,
              academic_confidence: data.academicConfidence,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);
          if (acError) console.warn('Supabase academic save failed, relying on cache fallback:', acError.message);
        } catch (dbErr) {
          console.warn('Supabase academic save exception, relying on cache fallback:', dbErr.message);
        }
        break;
      }

      case 'interests_decided': {
        // Save bulk array of direct interest selections in cache
        const interestRows = (data.interests || []).map(interest => ({
          user_id: userId,
          interest: interest,
          interaction_strength: 1.0,
          confidence_score: 0.9,
          created_at: new Date().toISOString()
        }));
        fallbackCache.setInterests(userId, interestRows);

        // Try Supabase save
        try {
          await req.supabase.from('user_interests').delete().eq('user_id', userId);
          if (interestRows.length > 0) {
            const { error: intError } = await req.supabase
              .from('user_interests')
              .upsert(interestRows);
            if (intError) console.warn('Supabase interests save failed:', intError.message);
          }
        } catch (dbErr) {
          console.warn('Supabase interests exception:', dbErr.message);
        }
        break;
      }

      case 'interests_scenarios': {
        // Calculate dynamic interest profiles from scenario choices
        const interestMap = {};
        if (Array.isArray(data.scenarios)) {
          data.scenarios.forEach(sc => {
            const interest = sc.mappedInterest;
            if (interest) {
              interestMap[interest] = (interestMap[interest] || 0) + 1;
            }
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

        // Try Supabase save
        try {
          await req.supabase.from('user_interests').delete().eq('user_id', userId);
          if (calculatedInterests.length > 0) {
            const { error: scenIntError } = await req.supabase
              .from('user_interests')
              .upsert(calculatedInterests);
            if (scenIntError) console.warn('Supabase scenario interests failed:', scenIntError.message);
          }
        } catch (dbErr) {
          console.warn('Supabase scenario interests exception:', dbErr.message);
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

        // Try Supabase save
        try {
          const { error: skillError } = await req.supabase
            .from('behavior_profile')
            .upsert({
              user_id: userId,
              ...behaviorData,
              updated_at: new Date().toISOString()
            });
          if (skillError) console.warn('Supabase behavior_profile upsert failed:', skillError.message);
        } catch (dbErr) {
          console.warn('Supabase behavior_profile exception:', dbErr.message);
        }
        break;
      }

      case 'mindset': {
        fallbackCache.setProfile(userId, { 
          career_mindset: data.mindset
        });

        // Try Supabase save
        try {
          const { error: mindError } = await req.supabase
            .from('profiles')
            .update({ 
              career_mindset: data.mindset,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);
          if (mindError) console.warn('Supabase profiles mindset save failed:', mindError.message);
        } catch (dbErr) {
          console.warn('Supabase profiles mindset exception:', dbErr.message);
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
      message: `Progress captured in local backup cache for: ${stage}` 
    });
  }
};

export const calculateRichRecommendations = (profile, behavior) => {
  const stream = profile?.academic_stream || 'Other';
  const favSubjects = profile?.favorite_subjects || [];
  const logical = behavior?.logical_reasoning_score ?? 1;
  const creativity = behavior?.creativity_score ?? 1;
  const analytical = behavior?.analytical_score ?? 1;
  const curiosity = behavior?.curiosity_score ?? 1;

  const pathwaysList = [
    {
      name: 'AI & Intelligent Systems',
      description: 'Building next-generation smart agents, neural networks, and automation systems.',
      matchReason: 'Your stream in Computer Science/Science combined with strong Logical Reasoning and Mathematics makes you a perfect fit for deep tech.',
      baseBoost: stream === 'Computer Science' || stream === 'Science' ? 30 : 10,
      subjectBoost: favSubjects.includes('Mathematics') || favSubjects.includes('Computer Science') || favSubjects.includes('Physics') ? 30 : 10,
      behavioralBoost: (logical + analytical) * 15, // max 60
    },
    {
      name: 'Software Engineering',
      description: 'Creating robust applications, algorithms, systems architecture, and web platforms.',
      matchReason: 'Strong technical diagnostic performance combined with Mathematics or Computer Science indicates excellent software design capabilities.',
      baseBoost: stream === 'Computer Science' || stream === 'Science' ? 30 : 15,
      subjectBoost: favSubjects.includes('Computer Science') || favSubjects.includes('Mathematics') ? 30 : 10,
      behavioralBoost: (logical + creativity) * 15, // max 60
    },
    {
      name: 'Product Innovation',
      description: 'Bridging design, strategy, and engineering to build products that solve real customer problems.',
      matchReason: 'A creative problem-solving mindset and strategic perspective are ideal for leadership and product management.',
      baseBoost: stream === 'Commerce' || stream === 'Arts' ? 30 : 15,
      subjectBoost: favSubjects.includes('Business Studies') || favSubjects.includes('Economics') || favSubjects.includes('English') ? 30 : 10,
      behavioralBoost: (creativity + curiosity) * 15, // max 60
    },
    {
      name: 'Cybersecurity',
      description: 'Securing digital infrastructures, networks, and protecting systems from malicious intrusions.',
      matchReason: 'An analytical and structured approach to problem solving matches well with system defense and routing logic.',
      baseBoost: stream === 'Computer Science' || stream === 'Science' ? 30 : 10,
      subjectBoost: favSubjects.includes('Computer Science') || favSubjects.includes('Physics') ? 30 : 10,
      behavioralBoost: (logical + analytical) * 15, // max 60
    },
    {
      name: 'UI/UX + Technology',
      description: 'Designing user interfaces, human-computer interactions, and frontend styling frameworks.',
      matchReason: 'A combination of creative design, user-focused empathy, and frontend tech logic.',
      baseBoost: stream === 'Arts' || stream === 'Computer Science' ? 30 : 15,
      subjectBoost: favSubjects.includes('English') || favSubjects.includes('Computer Science') || favSubjects.includes('History') ? 30 : 10,
      behavioralBoost: (creativity + curiosity) * 15, // max 60
    },
    {
      name: 'Data Analytics',
      description: 'Extracting patterns from vast datasets, statistical modeling, and business intelligence.',
      matchReason: 'Your solid mathematical grounding and high analytical score align seamlessly with quantitative reasoning and economics.',
      baseBoost: stream === 'Commerce' || stream === 'Science' ? 30 : 15,
      subjectBoost: favSubjects.includes('Mathematics') || favSubjects.includes('Economics') || favSubjects.includes('Business Studies') ? 30 : 10,
      behavioralBoost: (analytical + logical) * 15, // max 60
    }
  ];

  return pathwaysList.map(p => {
    const rawScore = p.baseBoost + p.subjectBoost + p.behavioralBoost;
    const matchScore = Math.min(100, Math.max(50, rawScore));
    return {
      name: p.name,
      description: p.description,
      matchReason: p.matchReason,
      matchScore
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
};

/**
 * Finalize onboarding, evaluate weighted analytics, and save complete profile
 * POST /api/discover/complete
 */
export const completeDiscovery = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Retrieve educational identity from profile
    let profile = null;
    try {
      const { data: dbProfile } = await req.supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      profile = dbProfile;
    } catch (e) {
      console.warn('Supabase profiles read failed in completeDiscovery:', e.message);
    }

    // Fall back to cache
    const cachedProfile = fallbackCache.getProfile(userId);
    profile = profile || cachedProfile;

    if (!profile) {
      console.log(`💡 Profile completely missing. Auto-creating fallback in cache...`);
      const defaultUsername = req.user.user_metadata?.username || req.user.email?.split('@')[0] || 'Explorer';
      profile = fallbackCache.setProfile(userId, {
        id: userId,
        email: req.user.email,
        username: defaultUsername,
        name: defaultUsername,
        education_stage: 'college',
        onboarding_completed: false,
        career_mindset: 'forest'
      });
    }

    // 2. Retrieve interests data
    let interests = [];
    try {
      const { data: dbInterests } = await req.supabase
        .from('user_interests')
        .select('interest, interaction_strength')
        .eq('user_id', userId);
      interests = dbInterests || [];
    } catch (e) {
      console.warn('Supabase interests read failed in completeDiscovery:', e.message);
    }

    // Fall back to cached interests
    if (interests.length === 0) {
      interests = fallbackCache.getInterests(userId);
    }

    // 3. Retrieve skills diagnostics from behavior profile
    let behavior = null;
    try {
      const { data: dbBehavior } = await req.supabase
        .from('behavior_profile')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      behavior = dbBehavior;
    } catch (e) {
      console.warn('Supabase behavior_profile read failed in completeDiscovery:', e.message);
    }

    // Fall back to cached behavior
    behavior = behavior || fallbackCache.getBehaviorProfile(userId);

    // 4. Synthesize final strengths, pathways, and identify beginner skill gaps
    const topStrengths = [];
    const skillGaps = [];
    const detectedPatterns = [];

    // Analyze skills and record strengths/gaps
    if (behavior) {
      // Logical Reasoning Check
      if (behavior.logical_reasoning_score >= 2) {
        topStrengths.push('Logical Reasoning');
      } else {
        skillGaps.push('Logical Reasoning');
      }

      // Analytical Thinking Check
      if (behavior.analytical_score >= 2) {
        topStrengths.push('Analytical Thinking');
      } else {
        skillGaps.push('Analytical Thinking');
      }

      // Creative Problem Solving Check (maps to technical score/creativity in puzzles)
      if (behavior.creativity_score >= 2) {
        topStrengths.push('Creative Problem Solving');
      } else {
        skillGaps.push('Creative Problem Solving');
      }

      // Dynamic Explorer Patterns
      if (behavior.logical_reasoning_score >= 2 && behavior.analytical_score >= 2) {
        detectedPatterns.push('Pattern Solver');
      }
      if (behavior.creativity_score >= 2) {
        detectedPatterns.push('Imaginative Creator');
      }

      // Curiosity / Exploration
      if (behavior.curiosity_score >= 2 || behavior.exploration_level >= 2) {
        topStrengths.push('Active Curiosity Explorer');
        detectedPatterns.push('Deep Observer');
      }

      // Adaptability / Retry Persistence
      if (behavior.retry_behavior_score > 2) {
        topStrengths.push('Resilience & High Persistence');
      }
    } else {
      // Fallback gaps if profile missing
      skillGaps.push('Logical Reasoning', 'Analytical Thinking', 'Creative Problem Solving');
    }

    // Compute rich pathway recommendation matrix using academic stream, favorite subjects, and behavioral scores
    const richPathways = calculateRichRecommendations(profile, behavior);
    const recommendedPathways = richPathways.map(p => p.name);

    // Default summaries based on career mindset scenery
    let summaryText = 'You are a foundational builder starting an immersive career journey.';
    if (profile.career_mindset === 'forest') {
      summaryText = 'You approach your future as an unexplored forest—filled with curiosity, actively seeking to map out new ideas and discover paths that match your diverse skills.';
    } else if (profile.career_mindset === 'galaxy') {
      summaryText = 'You envision your career as an open galaxy—brimming with boundless creative ideas and seeking futuristic systems where your imagination can scale.';
    } else if (profile.career_mindset === 'highway') {
      summaryText = 'You view your pathway as a structured highway—focused on building a clear, robust roadmap with stable milestones and actionable skills.';
    } else if (profile.career_mindset === 'maze') {
      summaryText = 'You approach your development as a glowing maze—highly analytical, observing structural elements, and finding the most optimized and tactical solutions.';
    }

    // Compile dynamic exploration pattern label
    let finalExplorationType = 'Active Explorer';
    if (behavior) {
      if (behavior.curiosity_score > behavior.analytical_score) {
        finalExplorationType = 'Curiosity-Driven Experimenter';
      } else {
        finalExplorationType = 'Structured Logical Observer';
      }
    }

    const confidenceLevel = behavior?.emotional_confidence_score > 1 ? 'High Confidence' : 'Foundational Explorer';
    const learningBehavior = behavior?.learning_style_pattern || 'Adaptive Learner';

    // 5. Save results to cache profile first
    fallbackCache.setProfile(userId, {
      onboarding_completed: true,
      exploration_type: finalExplorationType,
      confidence_level: confidenceLevel,
      learning_behavior: learningBehavior
    });

    const finalResultsObject = {
      top_strengths: topStrengths,
      detected_patterns: detectedPatterns,
      recommended_pathways: recommendedPathways,
      skill_gaps: skillGaps,
      personalized_summary: summaryText,
    };

    fallbackCache.setDiscoverResults(userId, finalResultsObject);

    // 6. Try to write completion state back to Supabase
    try {
      const { error: profileFinalError } = await req.supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          exploration_type: finalExplorationType,
          confidence_level: confidenceLevel,
          learning_behavior: learningBehavior,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (profileFinalError) console.warn('Supabase profiles complete update failed:', profileFinalError.message);
    } catch (e) {
      console.warn('Supabase profiles complete update exception:', e.message);
    }

    try {
      const { error: resError } = await req.supabase
        .from('discover_yourself_results')
        .upsert({
          user_id: userId,
          top_strengths: topStrengths,
          detected_patterns: detectedPatterns,
          recommended_pathways: recommendedPathways,
          skill_gaps: skillGaps,
          personalized_summary: summaryText,
          completion_timestamp: new Date().toISOString()
        });

      if (resError) console.warn('Supabase discover_yourself_results upsert failed:', resError.message);
    } catch (e) {
      console.warn('Supabase discover_yourself_results upsert exception:', e.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Self-discovery completed successfully!',
      results: {
        topStrengths,
        detectedPatterns,
        recommendedPathways: richPathways, // return rich detailed array!
        skillGaps,
        personalizedSummary: summaryText,
        explorationType: finalExplorationType
      }
    });

  } catch (err) {
    console.error('Discovery completion error:', err);
    return res.status(500).json({ success: false, error: 'Failed to synthesize self-discovery results' });
  }
};

/**
 * Fetch results of completed self-discovery
 * GET /api/discover/results
 */
export const getDiscoveryResults = async (req, res) => {
  const userId = req.user.id;

  try {
    let results = null;
    try {
      const { data, error } = await req.supabase
        .from('discover_yourself_results')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      if (!error && data) results = data;
    } catch (e) {
      console.warn('Supabase results read failed:', e.message);
    }

    // Fall back to cache results
    results = results || fallbackCache.getDiscoverResults(userId);

    if (!results) {
      return res.status(404).json({ 
        success: false, 
        error: 'Self-discovery results not found or onboarding is incomplete' 
      });
    }

    let profile = null;
    try {
      const { data, error } = await req.supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      if (!error && data) profile = data;
    } catch (e) {
      console.warn('Supabase profiles read failed in results page:', e.message);
    }
    profile = profile || fallbackCache.getProfile(userId);

    let behavior = null;
    try {
      const { data: dbBehavior } = await req.supabase
        .from('behavior_profile')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      if (dbBehavior) behavior = dbBehavior;
    } catch (e) {
      console.warn('Supabase behavior_profile read failed in results page:', e.message);
    }
    behavior = behavior || fallbackCache.getBehaviorProfile(userId);

    const richPathways = calculateRichRecommendations(profile, behavior);

    return res.status(200).json({
      success: true,
      results: {
        ...results,
        recommended_pathways: richPathways, // return rich detailed array!
        profile,
        behavior
      }
    });

  } catch (err) {
    console.error('Fetch discovery results error:', err);
    return res.status(500).json({ success: false, error: 'Database query exception' });
  }
};
