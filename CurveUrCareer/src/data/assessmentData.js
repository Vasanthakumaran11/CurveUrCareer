/**
 * ASSESSMENT ENGINE DATA - ROADMAP V1
 * Core Dimensions (Hidden Evaluation)
 */
export const HIDDEN_DIMENSIONS = [
  { id: 'thinking_pattern', name: 'Thinking Pattern' },
  { id: 'motivation_trigger', name: 'Motivation Trigger' },
  { id: 'work_preference', name: 'Work Preference' },
  { id: 'decision_style', name: 'Decision Style Under Pressure' },
  { id: 'identity_reinforcement', name: 'Identity Reinforcement' }
];

/**
 * Behavioral Tags (10-14 Max)
 */
export const BEHAVIORAL_TAGS = [
  'Analytical',
  'Creative',
  'Strategic',
  'Systematic',
  'Empathetic',
  'Leadership',
  'Execution',
  'Exploratory',
  'RiskFriendly',
  'StabilityOriented',
  'DetailFocused',
  'BigPicture'
];

/**
 * The 10 Moments
 */
export const ASSESSMENT_MOMENTS = [
  // Moment 1-2: Thinking Pattern
  {
    id: 'moment-1',
    dimension: 'thinking_pattern',
    scenario: "You're given a mysterious locked box with no key. What's your first instinct?",
    options: [
      { id: 'a', text: 'Look for serial numbers or manufacturer marks to research its origin.', tags: ['Analytical', 'DetailFocused'] },
      { id: 'b', text: 'Imagine what could be inside and why it was hidden.', tags: ['Creative', 'BigPicture'] },
      { id: 'c', text: 'Try common combinations or feel for internal mechanisms.', tags: ['Systematic', 'Execution'] },
      { id: 'd', text: 'Consider who might have owned it and what it meant to them.', tags: ['Empathetic', 'Exploratory'] }
    ]
  },
  {
    id: 'moment-2',
    dimension: 'thinking_pattern',
    scenario: "A new complex game has arrived. How do you start playing?",
    options: [
      { id: 'a', text: 'Read the entire rulebook carefully from start to finish.', tags: ['Systematic', 'DetailFocused'] },
      { id: 'b', text: 'Start playing immediately and learn as things happen.', tags: ['Exploratory', 'RiskFriendly'] },
      { id: 'c', text: 'Watch others play first to spot winning patterns.', tags: ['Strategic', 'Analytical'] },
      { id: 'd', text: 'Try to find a way to simplify the rules for everyone.', tags: ['BigPicture', 'Leadership'] }
    ]
  },
  // Moment 3-4: Work Preference
  {
    id: 'moment-3',
    dimension: 'work_preference',
    scenario: "In a group project, which role do you naturally gravitate towards?",
    options: [
      { id: 'a', text: 'Setting the deadlines and keeping everyone on track.', tags: ['Leadership', 'Systematic'] },
      { id: 'b', text: 'Polishing the final product to make it look perfect.', tags: ['DetailFocused', 'Creative'] },
      { id: 'c', text: 'Coming up with the "Big Idea" that nobody else thought of.', tags: ['BigPicture', 'Creative'] },
      { id: 'd', text: 'Connecting people and resolving team conflicts.', tags: ['Empathetic', 'Leadership'] }
    ]
  },
  {
    id: 'moment-4',
    dimension: 'work_preference',
    scenario: "Your ideal workspace would be:",
    options: [
      { id: 'a', text: 'A busy hub where I constanty interact with different people.', tags: ['Leadership', 'Exploratory'] },
      { id: 'b', text: 'A quiet, highly organized desk where I can focus on data.', tags: ['Analytical', 'StabilityOriented'] },
      { id: 'c', text: 'A studio filled with tools and materials to experiment with.', tags: ['Creative', 'Exploratory'] },
      { id: 'd', text: 'A command center where I manage various high-level moving parts.', tags: ['Strategic', 'BigPicture'] }
    ]
  },
  // Moment 5: Motivation
  {
    id: 'moment-5',
    dimension: 'motivation_trigger',
    scenario: "What makes you feel most satisfied after a long day?",
    options: [
      { id: 'a', text: 'Knowing exactly how much progress I made on my list.', tags: ['Execution', 'Systematic'] },
      { id: 'b', text: 'Coming up with a solution to a problem that stumped others.', tags: ['Strategic', 'Analytical'] },
      { id: 'c', text: 'Creating something beautiful or unique that didn\'t exist before.', tags: ['Creative', 'BigPicture'] },
      { id: 'd', text: 'Knowing that I helped someone overcome a difficult challenge.', tags: ['Empathetic', 'Leadership'] }
    ]
  },
  // Moment 6: Identity
  {
    id: 'moment-6',
    dimension: 'identity_reinforcement',
    scenario: "If you were a character in a movie, you'd likely be the:",
    options: [
      { id: 'a', text: 'The Architect: Planning the grand design behind the scenes.', tags: ['Strategic', 'BigPicture'] },
      { id: 'b', text: 'The Specialist: The one they call for specific, complex problems.', tags: ['Analytical', 'DetailFocused'] },
      { id: 'c', text: 'The Innovator: Breaking rules to create a new way forward.', tags: ['Creative', 'RiskFriendly'] },
      { id: 'd', text: 'The Guardian: Keeping the team safe and the system stable.', tags: ['StabilityOriented', 'Empathetic'] }
    ]
  },
  // Moment 7-8: Pressure Behavior
  {
    id: 'moment-7',
    dimension: 'decision_style',
    scenario: "The internet goes down 2 hours before a major deadline. Your reaction is:",
    options: [
      { id: 'a', text: 'Immediately switch to offline tasks and look for alternatives.', tags: ['Execution', 'RiskFriendly'] },
      { id: 'b', text: 'Calmly analyze the situation and find the most efficient workaround.', tags: ['Strategic', 'Analytical'] },
      { id: 'c', text: 'Call everyone involved to coordinate a new plan or extension.', tags: ['Leadership', 'Empathetic'] },
      { id: 'd', text: 'Stick to the original plan as much as possible but do it manually.', tags: ['StabilityOriented', 'Systematic'] }
    ]
  },
  {
    id: 'moment-8',
    dimension: 'decision_style',
    scenario: "You have to choose between a guaranteed small win or a risky but huge win.",
    options: [
      { id: 'a', text: 'The guaranteed win. Stability and consistency are better.', tags: ['StabilityOriented', 'Systematic'] },
      { id: 'b', text: 'The risky win. I\'m comfortable with uncertainty for big growth.', tags: ['RiskFriendly', 'Exploratory'] },
      { id: 'c', text: 'I\'ll find a way to bridge the two for a "balanced risk".', tags: ['Strategic', 'Analytical'] },
      { id: 'd', text: 'I\'ll choose the one that benefits the most people involved.', tags: ['Empathetic', 'BigPicture'] }
    ]
  },
  // Moment 9: Value Alignment
  {
    id: 'moment-9',
    dimension: 'identity_reinforcement',
    scenario: "Which of these quotes resonates most with you?",
    options: [
      { id: 'a', text: '"Knowledge is power, but data is its language."', tags: ['Analytical', 'DetailFocused'] },
      { id: 'b', text: '"The best way to predict the future is to create it."', tags: ['Creative', 'RiskFriendly'] },
      { id: 'c', text: '"Logic will get you from A to B. Imagination will take you everywhere."', tags: ['BigPicture', 'Exploratory'] },
      { id: 'd', text: '"Coming together is a beginning; keeping together is progress."', tags: ['Leadership', 'Empathetic'] }
    ]
  },
  // Moment 10: Reflection Instinct
  {
    id: 'moment-10',
    dimension: 'thinking_pattern',
    scenario: "After completing a major task, what do you usually do?",
    options: [
      { id: 'a', text: 'Review every step to see where I could be more efficient next time.', tags: ['Analytical', 'Systematic'] },
      { id: 'b', text: 'Think about how this accomplishment fits into my long-term goals.', tags: ['Strategic', 'BigPicture'] },
      { id: 'c', text: 'Celebrate the win and immediately look for the next creative spark.', tags: ['Exploratory', 'Creative'] },
      { id: 'd', text: 'Ask the people involved how they felt about the whole process.', tags: ['Empathetic', 'Leadership'] }
    ]
  }
];

/**
 * Career Direction Matrix
 */
export const CAREER_CLUSTERS = [
  {
    id: 'A',
    tags: ['Analytical', 'Systematic'],
    environments: 'Structured technical systems',
    domains: ['Engineering', 'Data Science', 'Finance Systems', 'Software Architecture'],
    reasoning: 'You thrive in environments that require logical parsing and systematic organization.'
  },
  {
    id: 'B',
    tags: ['Creative', 'Exploratory'],
    environments: 'Innovation-led studios and media',
    domains: ['UI/UX Design', 'Content Creation', 'Digital Branding', 'Product Innovation'],
    reasoning: 'Your strength lies in seeing possibilities where others see walls, making you ideal for creative evolution.'
  },
  {
    id: 'C',
    tags: ['Empathetic', 'Leadership'],
    environments: 'People-driven organizations and public service',
    domains: ['Management', 'Human Resources', 'Civil Services', 'Psychology & Counseling'],
    reasoning: 'You have a natural ability to guide people and understand the human element behind every system.'
  },
  {
    id: 'D',
    tags: ['Strategic', 'BigPicture'],
    environments: 'Consultancy and high-level decision making',
    domains: ['Business Strategy', 'Entrepreneurship', 'Policy Making', 'Investments'],
    reasoning: 'You naturally look at the horizon, making you a strong candidate for navigating complex futures.'
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
