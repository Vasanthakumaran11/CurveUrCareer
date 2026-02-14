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
  { id: 'story-adventure', title: 'Phase 1: Story Adventure', theme: 'indigo', icon: '🎭' },
  { id: 'creators-lab', title: 'Phase 2: Creator\'s Lab', theme: 'purple', icon: '🏗️' },
  { id: 'pattern-detective', title: 'Phase 3: Pattern Detective', theme: 'blue', icon: '🧩' },
  { id: 'quick-fire', title: 'Phase 4: Quick Fire Round', theme: 'rose', icon: '🎲' },
  { id: 'reflection-room', title: 'Phase 5: Reflection Room', theme: 'emerald', icon: '💬' }
];

export const ASSESSMENT_ITEMS = [
  // Phase 1: Interactive Story Adventures
  {
    id: 'story-1',
    phase: 'story-adventure',
    type: 'branching-scenario',
    question: 'Your First Day at Dream School: Morning (7 AM)',
    description: 'You wake up late! You have: Important Math test (1st period), Group project presentation (3rd period), and you forgot to charge your phone.',
    options: [
      { id: 'a', text: 'Rush without breakfast', icon: '🏃', timeCost: 5, consequence: 'You feel hungry but arrive early', dimensions: { logicalReasoning: 2, analyticalThinking: 1 } },
      { id: 'b', text: 'Take 5 min to review math notes', icon: '📚', timeCost: 10, consequence: 'Focused but tight on time', dimensions: { logicalReasoning: 4, analyticalThinking: 2 } },
      { id: 'c', text: 'WhatsApp group about presentation', icon: '👥', timeCost: 7, consequence: 'Coordinated but distracted', dimensions: { empathyEI: 4, socialInteraction: 3 } },
      { id: 'd', text: 'Find phone charger first', icon: '🔋', timeCost: 12, consequence: 'Powered up but very late', dimensions: { analyticalThinking: 3, technicalSkills: 1 } }
    ]
  },

  // Phase 2: Build & Create Challenges
  {
    id: 'build-1',
    phase: 'creators-lab',
    type: 'drag-drop-challenge',
    question: 'Design Your Study Space',
    description: 'Create the perfect study room for exam week. Budget: ₹15,000. Constraints: Productivity is key.',
    items: [
      { id: 'desk-lg', name: 'Large Desk', cost: 5000, tags: ['productivity'] },
      { id: 'chair-erg', name: 'Ergonomic Chair', cost: 4000, tags: ['health', 'focus'] },
      { id: 'lighting-bright', name: 'Bright LED', cost: 1000, tags: ['focus'] },
      { id: 'plants', name: 'Plants 🪴', cost: 500, tags: ['calm'] },
      { id: 'whiteboard', name: 'Whiteboard', cost: 2000, tags: ['organization'] },
      { id: 'speaker', name: 'Music Speaker', cost: 3000, tags: ['vibe'] },
      { id: 'purifier', name: 'Air Purifier', cost: 4500, tags: ['health'] }
    ],
    budget: 15000,
    dimensions: { resourceAllocation: 4, creativity: 3, analyticalThinking: 2 }
  },

  // Phase 3: Pattern Detective
  {
    id: 'detect-1',
    phase: 'pattern-detective',
    type: 'data-infographic',
    question: 'School Canteen Sales - Last Week',
    description: 'Analyze the lunch sales data. Samosas (150-200), Sandwiches (40-60), Juice (75-100).',
    chartData: [
      { day: 'Mon', samosas: 150, sandwiches: 50, juice: 80 },
      { day: 'Tue', samosas: 140, sandwiches: 55, juice: 75 },
      { day: 'Wed', samosas: 180, sandwiches: 40, juice: 90 },
      { day: 'Thu', samosas: 160, sandwiches: 60, juice: 85 },
      { day: 'Fri', samosas: 200, sandwiches: 45, juice: 100 }
    ],
    questions: [
      { query: 'Which day had highest sales overall?', type: 'click-graph', answer: 'Fri' },
      { query: 'Why do you think samosas sell more?', type: 'select', options: ['Cheaper', 'Cultural preference', 'Fried food trend', 'Bad sandwich quality'] }
    ],
    dimensions: { researchAnalysis: 4, analyticalDepth: 3, logicalReasoning: 3 }
  },

  // Phase 4: Quick Fire Round
  {
    id: 'quick-1',
    phase: 'quick-fire',
    type: 'swipe-deck',
    cards: [
      { id: 'q1', text: 'You see a classmate sitting alone every day at lunch', options: { left: 'Mind business', right: 'Talk to them', up: 'Tell teacher', down: 'Observe' }, dimensions: { empathyEI: 1 } },
      { id: 'q2', text: 'Internet crashed 10 min before online exam', options: { left: 'Call teacher', right: 'Mobile hotspot', up: 'Ask neighbor', down: 'Cyber cafe' }, dimensions: { logicalReasoning: 1 } }
    ],
    dimensions: { problemSolving: 4, empathyEI: 3 }
  },

  // Phase 5: Reflection Room
  {
    id: 'reflect-1',
    phase: 'reflection-room',
    type: 'ai-chat',
    question: 'Career Reflection',
    description: 'Help your friend Alex: "Should I take Science or Commerce? Parents want Science, but I love business."',
    options: [
      { id: 'r1', text: 'What do YOU want to do?', dimensions: { empathyEI: 4 } },
      { id: 'r2', text: 'Parents usually know best tbh', dimensions: { socialInteraction: 2 } },
      { id: 'r3', text: 'Let\'s list pros and cons together', dimensions: { logicalReasoning: 4 } }
    ],
    dimensions: { socialInteraction: 4, empathyEI: 2 }
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

