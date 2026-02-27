import { BEHAVIORAL_TAGS, ASSESSMENT_MOMENTS, CAREER_CLUSTERS } from '../data/assessmentData';

/**
 * Calculates scores for behavioral tags with weight amplification
 * @param {Array} responses - List of objects { momentId, choiceId }
 */
export const calculateEngineScores = (responses) => {
  const scores = {};
  
  // Initialize scores for all tags
  BEHAVIORAL_TAGS.forEach(tag => {
    scores[tag] = 0;
  });

  // Calculate base scores (+1 per tag in chosen option)
  responses.forEach(resp => {
    const moment = ASSESSMENT_MOMENTS.find(m => m.id === resp.momentId);
    if (!moment) return;

    const chosenOption = moment.options.find(o => o.id === resp.choiceId);
    if (chosenOption && chosenOption.tags) {
      chosenOption.tags.forEach(tag => {
        if (Object.prototype.hasOwnProperty.call(scores, tag)) {
          scores[tag] += 1;
        }
      });
    }
  });

  // Apply Weight Amplification Logic
  // If tag count ≥ 3 → multiply by 1.5
  // If ≥ 5 → multiply by 1.8
  const amplifiedScores = { ...scores };
  Object.keys(amplifiedScores).forEach(tag => {
    const count = amplifiedScores[tag];
    if (count >= 5) {
      amplifiedScores[tag] = Math.round(count * 1.8 * 10) / 10;
    } else if (count >= 3) {
      amplifiedScores[tag] = Math.round(count * 1.5 * 10) / 10;
    }
  });

  return amplifiedScores;
};

/**
 * Identifies Top 3 Dominant Tags
 */
export const getTopTags = (scores) => {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([tag, score]) => ({ tag, score }));
};

/**
 * Maps top tags to Career Clusters
 */
export const getClusterMatches = (topTags) => {
  const tagNames = topTags.map(t => t.tag);
  
  return CAREER_CLUSTERS.map(cluster => {
    // Calculate match strength based on how many of the cluster's tags are in user's top tags
    const matchingTags = cluster.tags.filter(tag => tagNames.includes(tag));
    const strength = matchingTags.length / cluster.tags.length;
    
    return {
      ...cluster,
      matchStrength: strength,
      isPrimary: strength >= 0.5 // If at least one tag matches (since clusters have 2 tags)
    };
  })
  .sort((a, b) => b.matchStrength - a.matchStrength);
};

/**
 * Generates Dynamic Pattern Insight
 */
export const generatePatternInsight = (topTags) => {
  if (topTags.length < 2) return "You have a unique way of processing the world around you.";

  const [tag1, tag2] = topTags;
  
  const insights = {
    'Analytical+StabilityOriented': "You prefer clarity before action. You’re comfortable when systems are structured.",
    'Creative+Exploratory': "You see possibilities where others see walls. You thrive on innovation and new perspectives.",
    'Leadership+Empathetic': "You naturally guide others with understanding. You value the human element in every project.",
    'Strategic+BigPicture': "You look at the horizon, not just the path. You're a natural at navigating complex futures.",
    'Systematic+DetailFocused': "You find beauty in order and precision. You ensure that every piece of the puzzle fits perfectly.",
    'Execution+RiskFriendly': "You are a bias-to-action person. You'd rather try and fail than wait and wonder."
  };

  const key1 = `${tag1.tag}+${tag2.tag}`;
  const key2 = `${tag2.tag}+${tag1.tag}`;

  return insights[key1] || insights[key2] || `Your profile combines ${tag1.tag} thinking with a ${tag2.tag} approach, making you a versatile problem solver.`;
};

/**
 * Generates 7-Day Exploration Plan Template
 */
export const generateExplorationPlan = () => {
  const basePlan = [
    { day: 1, task: "Watch a real-world project video or documentary related to this field." },
    { day: 2, task: "Reach out to a senior or professional in this domain for a quick chat." },
    { day: 3, task: "Try a 'mini-skill' challenge (e.g., a 15-min tutorial or exercise)." },
    { day: 4, task: "Research top colleges and learning pathways for this direction." },
    { day: 5, task: "Reflect on how your natural strengths (top tags) apply here." },
    { day: 6, task: "Compare this direction with one other interesting field." },
    { day: 7, task: "Journal your clarity: Does this feel like a 'yes', 'maybe', or 'no'?" }
  ];

  // We can customize tasks slightly based on cluster if needed, but for now, the template works well
  return basePlan;
};

