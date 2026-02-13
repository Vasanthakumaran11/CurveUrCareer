import { ASSESSMENT_ITEMS, SKILL_DIMENSIONS } from '../data/assessmentData';

/**
 * Calculates raw scores for each dimension based on user responses
 * @param {Array} responses - List of objects { itemId, value,? choiceId }
 */
export const calculateRawScores = (responses) => {
  const scores = {};
  
  // Initialize scores
  SKILL_DIMENSIONS.forEach(dim => {
    scores[dim.id] = 0;
  });

  responses.forEach(resp => {
    const item = ASSESSMENT_ITEMS.find(i => i.id === resp.itemId);
    if (!item) return;

    if (item.type === 'scenario-sim' || item.type === 'social-sim') {
      const choice = item.options.find(o => o.id === resp.choiceId);
      if (choice && choice.dimensions) {
        Object.keys(choice.dimensions).forEach(dim => {
          scores[dim] += choice.dimensions[dim];
        });
      }
    } else if (item.correctAnswer || item.correctSequence) {
      // Binary scoring for correct/incorrect
      const isCorrect = item.type === 'sequence-order' || item.type === 'drag-drop-build'
        ? JSON.stringify(resp.value) === JSON.stringify(item.correctSequence)
        : resp.value === item.correctAnswer;

      if (isCorrect && item.dimensions) {
        Object.keys(item.dimensions).forEach(dim => {
          scores[dim] += item.dimensions[dim];
        });
      }
    } else if (item.type === 'creative-prompt') {
      // Basic scoring for presence of content
      if (resp.value && resp.value.length > 10) {
        Object.keys(item.dimensions).forEach(dim => {
          scores[dim] += item.dimensions[dim];
        });
      }
    }
  });

  return scores;
};

/**
 * Normalizes scores to 0-100 percentage
 */
export const normalizeScores = (rawScores) => {
  const normalized = {};
  const maxPossible = {};

  // Calculate max possible for each dimension
  SKILL_DIMENSIONS.forEach(dim => {
    maxPossible[dim.id] = 0;
  });

  ASSESSMENT_ITEMS.forEach(item => {
    if (item.dimensions) {
      Object.keys(item.dimensions).forEach(dim => {
        maxPossible[dim] += item.dimensions[dim];
      });
    } else if (item.options) {
      // For scenario sims, take the max weight across all choices
      const dimWeights = {};
      item.options.forEach(opt => {
        if (opt.dimensions) {
          Object.keys(opt.dimensions).forEach(dim => {
            dimWeights[dim] = Math.max(dimWeights[dim] || 0, opt.dimensions[dim]);
          });
        }
      });
      Object.keys(dimWeights).forEach(dim => {
        maxPossible[dim] += dimWeights[dim];
      });
    }
  });

  SKILL_DIMENSIONS.forEach(dim => {
    const max = maxPossible[dim.id] || 1;
    normalized[dim.id] = Math.min(100, Math.round((rawScores[dim.id] / max) * 100));
  });

  return normalized;
};

/**
 * Maps skill profile to career clusters
 */
export const getCareerMapping = (normalizedScores) => {
  const clusters = [
    { 
      id: 'entrepreneur', 
      name: 'Entrepreneurship', 
      core: ['leadership', 'moneyManagement', 'problemSolving'],
      description: 'Building businesses and making strategic financial decisions.'
    },
    { 
      id: 'tech', 
      name: 'Tech & AI', 
      core: ['logicalReasoning', 'technicalSkills', 'analyticalThinking'],
      description: 'Building the digital future through code and systems.'
    },
    { 
      id: 'creative', 
      name: 'Creative Arts', 
      core: ['creativity', 'problemSolving', 'socialInteraction'],
      description: 'Expressing ideas through visual and interactive media.'
    },
    { 
      id: 'management', 
      name: 'Business Management', 
      core: ['leadership', 'socialInteraction', 'empathyEI'],
      description: 'Leading teams and optimizing organizational success.'
    },
    { 
      id: 'healthcare', 
      name: 'Healthcare', 
      core: ['empathyEI', 'technicalSkills', 'logicalReasoning'],
      description: 'Combining compassion with specialized medical expertise.'
    },
    { 
      id: 'research', 
      name: 'Research & Science', 
      core: ['researchAnalysis', 'analyticalDepth', 'logicalReasoning'],
      description: 'Discovering knowledge and solving complex mysteries.'
    }
  ];

  return clusters.map(cluster => {
    const score = Math.round(
      cluster.core.reduce((acc, dim) => acc + (normalizedScores[dim] || 0), 0) / cluster.core.length
    );
    return { ...cluster, matchScore: score };
  })
  .sort((a, b) => b.matchScore - a.matchScore);
};
