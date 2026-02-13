// Comprehensive Assessment Data with new dimensions and pictorial support
export const SKILL_DIMENSIONS = [
  { id: 'logicalReasoning', name: 'Logical Reasoning' },
  { id: 'analyticalThinking', name: 'Analytical thinking' },
  { id: 'technicalSkills', name: 'Technical Skills' },
  { id: 'problemSolving', name: 'Creative Problem Solving' },
  { id: 'creativity', name: 'Creativity' },
  { id: 'empathyEI', name: 'Empathy & Emotional Intelligence' },
  { id: 'socialInteraction', name: 'Social Interaction' },
  { id: 'researchAnalysis', name: 'Research & Analysis' },
  { id: 'analyticalDepth', name: 'Analytical Depth' },
  { id: 'leadership', name: 'Business Leadership' },
  { id: 'moneyManagement', name: 'Money Management' }
];

export const ASSESSMENT_PHASES = [
  { id: 'mind-works', title: 'How Your Mind Works', theme: 'indigo' },
  { id: 'decision-lab', title: 'Real-Life Decision Lab', theme: 'blue' },
  { id: 'build-fix', title: 'Build & Fix Challenge', theme: 'purple' },
  { id: 'leadership-hq', title: 'Leadership HQ', theme: 'amber' },
  { id: 'finance-zone', title: 'Financial Intelligence', theme: 'emerald' },
  { id: 'future-zone', title: 'Future Thinking Zone', theme: 'rose' }
];

export const ASSESSMENT_ITEMS = [
  // Phase 1: Mind Works
  {
    id: 'mind-1',
    phase: 'mind-works',
    type: 'pattern-grid',
    question: 'Identify the next logical pattern in the sequence.',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000&auto=format&fit=crop',
    options: ['Pattern A', 'Pattern B', 'Pattern C', 'Pattern D'],
    correctAnswer: 'Pattern B',
    dimensions: { logicalReasoning: 3, analyticalThinking: 2 }
  },
  {
    id: 'mind-2',
    phase: 'mind-works',
    type: 'logic-puzzle',
    question: 'If all A are B and all B are C, which is definitely true?',
    options: ['All A are C', 'Some C are A', 'No C are A', 'None of these'],
    correctAnswer: 'All A are C',
    dimensions: { logicalReasoning: 4, analyticalDepth: 1 }
  },
  {
    id: 'mind-3',
    phase: 'mind-works',
    type: 'pattern-grid',
    question: 'Which shape completes the symmetry of this neural network model?',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000&auto=format&fit=crop',
    options: ['Type Alpha', 'Type Beta', 'Type Gamma', 'Type Delta'],
    correctAnswer: 'Type Alpha',
    dimensions: { logicalReasoning: 2, technicalSkills: 3 }
  },

  // Phase 2: Decision Lab
  {
    id: 'dec-1',
    phase: 'decision-lab',
    type: 'scenario-sim',
    question: 'A critical system fails during a live demonstration. What is your immediate response?',
    options: [
      { id: 'a', text: 'Calmly explain the technical limitation and offer a workaround.', dimensions: { socialInteraction: 4, empathyEI: 2, leadership: 1 } },
      { id: 'b', text: 'Quickly debug the code on-stage while maintaining engagement.', dimensions: { technicalSkills: 5, problemSolving: 4 } },
      { id: 'c', text: 'Transition to a recorded backup video of the system.', dimensions: { analyticalThinking: 3, problemSolving: 2 } },
      { id: 'd', text: 'Ask for a 5-minute break to fix the issue privately.', dimensions: { analyticalDepth: 2, leadership: 3 } }
    ]
  },
  {
    id: 'dec-2',
    phase: 'decision-lab',
    type: 'scenario-sim',
    question: 'You have two months of budget left but four months of work. You Choose:',
    options: [
      { id: 'a', text: 'Ship a minimal version and start generating revenue.', dimensions: { moneyManagement: 5, analyticalThinking: 2 } },
      { id: 'b', text: 'Seek immediate venture funding to bridge the gap.', dimensions: { leadership: 4, socialInteraction: 2 } },
      { id: 'c', text: 'Cut non-essential features and work double time.', dimensions: { problemSolving: 4, technicalSkills: 1 } },
      { id: 'd', text: 'Collaborate with a partner for shared resources.', dimensions: { socialInteraction: 3, empathyEI: 3, leadership: 2 } }
    ]
  },

  // Phase 3: Build & Fix
  {
    id: 'build-1',
    phase: 'build-fix',
    type: 'sequence-order',
    question: 'Rank the priority of fixing these issues in a production app:',
    items: ['Security Breach (Active)', 'UI Typo in Footer', 'Mobile Layout Alignment', '500 Error on Signup', 'Slow Page Loading (5s)'],
    correctSequence: [0, 3, 4, 2, 1],
    dimensions: { analyticalDepth: 4, analyticalThinking: 4 }
  },
  {
    id: 'build-2',
    phase: 'build-fix',
    type: 'scenario-sim',
    question: 'The application is slow during peak hours. Where do you look first?',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda5466b7a?q=80&w=1000&auto=format&fit=crop',
    options: [
      { id: 'a', text: 'Database query execution times.', dimensions: { technicalSkills: 4, analyticalThinking: 3 } },
      { id: 'b', text: 'Server CPU and RAM usage spikes.', dimensions: { technicalSkills: 3, analyticalDepth: 2 } },
      { id: 'c', text: 'Client-side JavaScript bundle size.', dimensions: { technicalSkills: 2, problemSolving: 2 } },
      { id: 'd', text: 'Network Latency in specific regions.', dimensions: { technicalSkills: 3, researchAnalysis: 2 } }
    ]
  },

  // Phase 4: Leadership HQ
  {
    id: 'lead-1',
    phase: 'leadership-hq',
    type: 'scenario-sim',
    question: 'Your most productive developer is feeling burnt out. Your strategy:',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
    options: [
      { id: 'a', text: 'Mandate a 3-day paid break immediately.', dimensions: { empathyEI: 5, leadership: 3 } },
      { id: 'b', text: 'Reduce their workload and hire a junior to assist.', dimensions: { leadership: 4, moneyManagement: 2 } },
      { id: 'c', text: 'Discuss long-term career goals and align tasks to them.', dimensions: { empathyEI: 4, socialInteraction: 3, leadership: 2 } },
      { id: 'd', text: 'Offer a performance-based bonus for the final sprint.', dimensions: { leadership: 1, moneyManagement: 3 } }
    ]
  },
  {
    id: 'lead-2',
    phase: 'leadership-hq',
    type: 'scenario-sim',
    question: 'Identify the most effective way to communicate a major change in strategy:',
    options: [
      { id: 'a', text: 'An All-Hands meeting with interactive Q&A.', dimensions: { socialInteraction: 5, leadership: 4 } },
      { id: 'b', text: 'A detailed, data-backed email to the entire firm.', dimensions: { analyticalThinking: 4, researchAnalysis: 3 } },
      { id: 'c', text: 'Small group sessions for personalized alignment.', dimensions: { empathyEI: 4, socialInteraction: 4, leadership: 3 } },
      { id: 'd', text: 'Updating the internal wiki and notifying via Slack.', dimensions: { technicalSkills: 2, analyticalThinking: 1 } }
    ]
  },

  // Phase 5: Financial Intelligence
  {
    id: 'fin-1',
    phase: 'finance-zone',
    type: 'logic-puzzle',
    question: 'A company has $1M in revenue and $800K in expenses. If they double revenue and expenses grow by 50%, what is the new profit?',
    options: ['$200,000', '$400,000', '$800,000', '$1,200,000'],
    correctAnswer: '$800,000',
    dimensions: { moneyManagement: 5, analyticalThinking: 4 }
  },
  {
    id: 'fin-2',
    phase: 'finance-zone',
    type: 'scenario-sim',
    question: 'Which investment profile ensures the highest sustainability for a 10-year research project?',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop',
    options: [
      { id: 'a', text: 'A diversified mix of index funds and bonds.', dimensions: { moneyManagement: 4, analyticalDepth: 3 } },
      { id: 'b', text: 'Real-estate assets with steady rental yields.', dimensions: { moneyManagement: 3, analyticalThinking: 2 } },
      { id: 'c', text: 'Strategic stakes in emerging tech startups.', dimensions: { moneyManagement: 5, researchAnalysis: 4 } },
      { id: 'd', text: 'Cryptocurrency holding for explosive growth.', dimensions: { moneyManagement: 1, creativity: 2 } }
    ]
  },

  // Phase 6: Future Thinking
  {
    id: 'fut-1',
    phase: 'future-zone',
    type: 'scenario-sim',
    question: 'Identify the most likely societal impact of widespread Automation by 2040:',
    imageUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a07a7e8e?q=80&w=1000&auto=format&fit=crop',
    options: [
      { id: 'a', text: 'Universal Basic Income and a Creative Renaissance.', dimensions: { creativity: 5, researchAnalysis: 4 } },
      { id: 'b', text: 'Hyper-specialization in Emotional Intelligence roles.', dimensions: { empathyEI: 5, socialInteraction: 4 } },
      { id: 'c', text: 'Global migration to VR-first economic zones.', dimensions: { creativity: 3, technicalSkills: 4 } },
      { id: 'd', text: 'A return to artisanal, human-only manufacturing.', dimensions: { empathyEI: 3, analyticalDepth: 2 } }
    ]
  },
  {
    id: 'fut-2',
    phase: 'future-zone',
    type: 'creative-prompt',
    question: 'Describe one innovation you would build to solve the urban isolation crisis in megacities.',
    dimensions: { creativity: 5, problemSolving: 4, socialInteraction: 3 }
  }
];

export const INTEREST_PROBE_QUESTIONS = [
  {
    id: 'probe-1',
    question: 'You have a free weekend. What are you most likely to do?',
    imageUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a07a7e8e?q=80&w=1000&auto=format&fit=crop',
    options: [
      { id: 'code', text: 'Hack together a new app or tool', mapping: 'Technology' },
      { id: 'paint', text: 'Binge-watch a docu-series on art history', mapping: 'Creative' },
      { id: 'help', text: 'Volunteer for a community crisis line', mapping: 'Healthcare' },
      { id: 'trade', text: 'Analyze the stock market trends', mapping: 'Business' }
    ]
  },
  {
    id: 'probe-2',
    question: 'Which of these workspace objects inspires you?',
    options: [
      { id: 'stat', text: 'A multi-monitor setup with code', mapping: 'Technology' },
      { id: 'sketch', text: 'A messy desk full of prototypes', mapping: 'Creative' },
      { id: 'chart', text: 'A clean whiteboard with strategy maps', mapping: 'Business' },
      { id: 'book', text: 'A shelf of psychology & justice books', mapping: 'Law' }
    ]
  },
  {
    id: 'probe-3',
    question: 'If you were to write a book, what would it be about?',
    options: [
      { id: 'sci', text: 'The Physics of Black Holes', mapping: 'Science' },
      { id: 'med', text: 'The Future of Public Health', mapping: 'Healthcare' },
      { id: 'biz', text: 'The Psychology of Global Trade', mapping: 'Business' },
      { id: 'nov', text: 'A Sci-Fi Novel about AI Ethics', mapping: 'Creative' }
    ]
  },
  {
    id: 'probe-4',
    question: 'Choose a mission for your career:',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    options: [
      { id: 'tech', text: 'Build tools that define the next decade', mapping: 'Technology' },
      { id: 'social', text: 'Solve the most pressing social inequities', mapping: 'Social' },
      { id: 'market', text: 'Optimize the global financial engine', mapping: 'Business' },
      { id: 'bio', text: 'Unlock the secrets of human longevity', mapping: 'Science' }
    ]
  },
  {
    id: 'probe-5',
    question: 'When looking at a beautiful bridge, you wonder:',
    options: [
      { id: 'how', text: 'How do the physics of these cables work?', mapping: 'Science' },
      { id: 'who', text: 'What stories do the people crossing it share?', mapping: 'Social' },
      { id: 'cost', text: 'How was the funding for this project secured?', mapping: 'Business' },
      { id: 'art', text: 'How does the design complement the skyline?', mapping: 'Creative' }
    ]
  },
  {
    id: 'probe-6',
    question: 'Which prize would you rather win?',
    options: [
      { id: 'nobel', text: 'Nobel Prize in Science', mapping: 'Science' },
      { id: 'oscar', text: 'Oscar for Production Design', mapping: 'Creative' },
      { id: 'turing', text: 'Turing Award for Computing', mapping: 'Technology' },
      { id: 'peace', text: 'Nobel Peace Prize', mapping: 'Law' }
    ]
  }
];
