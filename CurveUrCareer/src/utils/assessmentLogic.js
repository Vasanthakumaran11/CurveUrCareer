import { ASSESSMENT_ITEMS, SKILL_DIMENSIONS } from '../data/assessmentData';

/**
 * Calculates raw scores for each dimension based on user responses
 * @param {Array} responses - List of objects { itemId, ...data }
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

    // Phase 1: Branching Scenario / Phase 5: AI Chat
    if (item.type === 'branching-scenario' || item.type === 'ai-chat') {
      const choice = item.options.find(o => o.id === resp.choiceId || o.id === resp.value);
      if (choice && choice.dimensions) {
        Object.keys(choice.dimensions).forEach(dim => {
          scores[dim] = (scores[dim] || 0) + choice.dimensions[dim];
        });
      }
    } 
    // Phase 2: Creator's Lab (Drag & Drop)
    else if (item.type === 'drag-drop-challenge') {
      if (resp.selectedItems && item.dimensions) {
        const productivityCount = resp.selectedItems.filter(id => 
          item.items.find(i => i.id === id)?.tags.includes('productivity')
        ).length;
        
        Object.keys(item.dimensions).forEach(dim => {
          scores[dim] = (scores[dim] || 0) + (item.dimensions[dim] * (productivityCount / 2));
        });
      }
    }
    // Phase 3: Pattern Detective
    else if (item.type === 'data-infographic') {
      if (resp.answers) {
        let correctCount = 0;
        item.questions.forEach((q, idx) => {
          if (resp.answers[idx] === q.answer) correctCount++;
        });
        
        if (item.dimensions) {
          Object.keys(item.dimensions).forEach(dim => {
            scores[dim] = (scores[dim] || 0) + (item.dimensions[dim] * (correctCount / item.questions.length));
          });
        }
      }
    }
    // Phase 4: Quick Fire (Swipe Deck)
    else if (item.type === 'swipe-deck') {
      if (resp.swipes && item.dimensions) {
        // Calculate patterns in swipes
        const empatheticCount = resp.swipes.filter(s => ['right', 'up'].includes(s.direction)).length;
        const logicalCount = resp.swipes.filter(s => ['left', 'down'].includes(s.direction)).length;

        scores['empathyEI'] = (scores['empathyEI'] || 0) + (empatheticCount * 2);
        scores['logicalReasoning'] = (scores['logicalReasoning'] || 0) + (logicalCount * 2);
        
        Object.keys(item.dimensions).forEach(dim => {
          scores[dim] = (scores[dim] || 0) + item.dimensions[dim];
        });
      }
    }
    // Legacy support for basic types if any remain
    else if (item.correctAnswer && item.dimensions) {
      if (resp.value === item.correctAnswer) {
        Object.keys(item.dimensions).forEach(dim => {
          scores[dim] = (scores[dim] || 0) + item.dimensions[dim];
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
    }
    
    // Add weights from options/cards for dynamic types
    if (item.options) {
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

    if (item.type === 'swipe-deck') {
      maxPossible['empathyEI'] += (item.cards?.length || 0) * 2;
      maxPossible['logicalReasoning'] += (item.cards?.length || 0) * 2;
    }
  });

  SKILL_DIMENSIONS.forEach(dim => {
    const max = maxPossible[dim.id] || 1;
    normalized[dim.id] = Math.min(100, Math.round(((rawScores[dim.id] || 0) / max) * 100));
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

