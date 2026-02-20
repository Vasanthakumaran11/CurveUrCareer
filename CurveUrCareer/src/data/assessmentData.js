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
    question: 'You have a school project to complete. You usually:',
    options: [
      { id: 'a', text: 'Organize the plan and tasks', mapping: 'Management' },
      { id: 'b', text: 'Think of creative ideas', mapping: 'Creative' },
      { id: 'c', text: 'Build or make something', mapping: 'Technical' },
      { id: 'd', text: 'Research information and facts', mapping: 'Research' }
    ]
  },
  {
    id: 'probe-2',
    question: 'On a free afternoon, you prefer to:',
    options: [
      { id: 'a', text: 'Learn a new app, coding trick, or experiment', mapping: 'Technical' },
      { id: 'b', text: 'Draw, design, write, or create something', mapping: 'Creative' },
      { id: 'c', text: 'Organize an event or help friends plan', mapping: 'Management' },
      { id: 'd', text: 'Read, explore, or investigate something new', mapping: 'Research' }
    ]
  },
  {
    id: 'probe-3',
    question: 'If a friend asks for help, you usually:',
    options: [
      { id: 'a', text: 'Solve a problem step-by-step', mapping: 'Analytical' },
      { id: 'b', text: 'Suggest creative alternatives', mapping: 'Creative' },
      { id: 'c', text: 'Coordinate or guide them', mapping: 'Social' },
      { id: 'd', text: 'Look for more information before helping', mapping: 'Research' }
    ]
  },
  {
    id: 'probe-4',
    question: 'When working in a group, you prefer to:',
    options: [
      { id: 'a', text: 'Handle technical tasks', mapping: 'Technical' },
      { id: 'b', text: 'Design, decorate, or make things visually appealing', mapping: 'Creative' },
      { id: 'c', text: 'Lead and organize the group', mapping: 'Management' },
      { id: 'd', text: 'Research ideas and provide solutions', mapping: 'Research' }
    ]
  },
  {
    id: 'probe-5',
    question: 'You enjoy learning most when it is about:',
    options: [
      { id: 'a', text: 'How things work or technical skills', mapping: 'Technical' },
      { id: 'b', text: 'Art, music, design, or creative expression', mapping: 'Creative' },
      { id: 'c', text: 'How to plan, lead, or manage', mapping: 'Management' },
      { id: 'd', text: 'Facts, science, or new discoveries', mapping: 'Research' }
    ]
  },
  {
    id: 'probe-6',
    question: 'When you have a difficult problem at school, you:',
    options: [
      { id: 'a', text: 'Break it into small steps', mapping: 'Analytical' },
      { id: 'b', text: 'Try out creative solutions', mapping: 'Creative' },
      { id: 'c', text: 'Ask for input and coordinate with friends', mapping: 'Social' },
      { id: 'd', text: 'Research ideas before attempting', mapping: 'Research' }
    ]
  },
  {
    id: 'probe-7',
    question: 'You imagine your ideal career involves:',
    options: [
      { id: 'a', text: 'Creating or building things', mapping: 'Technical' },
      { id: 'b', text: 'Designing, writing, innovating', mapping: 'Creative' },
      { id: 'c', text: 'Leading, organizing, managing', mapping: 'Management' },
      { id: 'd', text: 'Discovering, learning, analyzing', mapping: 'Research' }
    ]
  },
  {
    id: 'probe-8',
    question: 'You enjoy challenges that:',
    options: [
      { id: 'a', text: 'Test your technical skills', mapping: 'Technical' },
      { id: 'b', text: 'Allow creative solutions', mapping: 'Creative' },
      { id: 'c', text: 'Let you organize or guide others', mapping: 'Management' },
      { id: 'd', text: 'Require investigation or study', mapping: 'Research' }
    ]
  },
  {
    id: 'probe-9',
    question: 'During group activities, you feel happiest:',
    options: [
      { id: 'a', text: 'Handling gadgets, computers, or experiments', mapping: 'Technical' },
      { id: 'b', text: 'Decorating, making visuals, or designing', mapping: 'Creative' },
      { id: 'c', text: 'Assigning roles and managing', mapping: 'Management' },
      { id: 'd', text: 'Exploring ideas and facts', mapping: 'Research' }
    ]
  },
  {
    id: 'probe-10',
    question: 'If a gadget or device breaks, you:',
    options: [
      { id: 'a', text: 'Try to fix it yourself', mapping: 'Technical' },
      { id: 'b', text: 'Think of a new way to use it', mapping: 'Creative' },
      { id: 'c', text: 'Ask someone to help', mapping: 'Social' },
      { id: 'd', text: 'Research solutions online', mapping: 'Research' }
    ]
  },
  {
    id: 'probe-11',
    question: 'You like solving problems by:',
    options: [
      { id: 'a', text: 'Using logic and step-by-step methods', mapping: 'Analytical' },
      { id: 'b', text: 'Trying new and unusual ideas', mapping: 'Creative' },
      { id: 'c', text: 'Coordinating people or resources', mapping: 'Management' },
      { id: 'd', text: 'Collecting data and analyzing', mapping: 'Research' }
    ]
  },
  {
    id: 'probe-12',
    question: 'In free time, you usually:',
    options: [
      { id: 'a', text: 'Build, experiment, or play with tech', mapping: 'Technical' },
      { id: 'b', text: 'Draw, write, craft, or create', mapping: 'Creative' },
      { id: 'c', text: 'Organize activities or help others', mapping: 'Management' },
      { id: 'd', text: 'Read, explore, or investigate', mapping: 'Research' }
    ]
  }
];

