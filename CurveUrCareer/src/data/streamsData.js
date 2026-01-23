export const streamsData = {
  streams: [
    {
      id: 'science',
      name: 'Science',
      icon: '🔬',
      color: 'blue',
      description: 'Explore careers in technology, research, healthcare, and innovation',
      popularity: 'High',
      totalCourses: 45,
      trendingCourses: ['Computer Science', 'Medicine', 'Biotechnology', 'Data Science'],
      careerPaths: [
        {
          name: 'Engineering',
          icon: '⚙️',
          careers: ['Software Engineer', 'Mechanical Engineer', 'Civil Engineer', 'Electrical Engineer']
        },
        {
          name: 'Medicine',
          icon: '🏥',
          careers: ['Doctor', 'Surgeon', 'Dentist', 'Pharmacist']
        },
        {
          name: 'Research',
          icon: '🔍',
          careers: ['Research Scientist', 'Lab Technician', 'Academic Researcher']
        },
        {
          name: 'Technology',
          icon: '💻',
          careers: ['Data Scientist', 'AI Engineer', 'Cybersecurity Analyst']
        }
      ]
    },
    {
      id: 'commerce',
      name: 'Commerce',
      icon: '💼',
      color: 'green',
      description: 'Dive into business, finance, accounting, and management careers',
      popularity: 'Very High',
      totalCourses: 38,
      trendingCourses: ['Chartered Accountancy', 'Business Management', 'Finance', 'Marketing'],
      careerPaths: [
        {
          name: 'Finance',
          icon: '💰',
          careers: ['Investment Banker', 'Financial Analyst', 'Accountant', 'Stock Broker']
        },
        {
          name: 'Business',
          icon: '📊',
          careers: ['Business Analyst', 'Entrepreneur', 'Management Consultant']
        },
        {
          name: 'Marketing',
          icon: '📈',
          careers: ['Marketing Manager', 'Digital Marketer', 'Brand Manager']
        },
        {
          name: 'Banking',
          icon: '🏦',
          careers: ['Bank Manager', 'Loan Officer', 'Investment Advisor']
        }
      ]
    },
    {
      id: 'arts',
      name: 'Arts/Humanities',
      icon: '🎨',
      color: 'purple',
      description: 'Discover creative, social sciences, and communication careers',
      popularity: 'Medium',
      totalCourses: 52,
      trendingCourses: ['Psychology', 'Journalism', 'Law', 'Design'],
      careerPaths: [
        {
          name: 'Creative Arts',
          icon: '🎭',
          careers: ['Graphic Designer', 'Writer', 'Actor', 'Musician']
        },
        {
          name: 'Social Sciences',
          icon: '🌍',
          careers: ['Psychologist', 'Sociologist', 'Historian', 'Political Scientist']
        },
        {
          name: 'Communication',
          icon: '📢',
          careers: ['Journalist', 'Public Relations Officer', 'Content Writer']
        },
        {
          name: 'Law',
          icon: '⚖️',
          careers: ['Lawyer', 'Judge', 'Legal Advisor', 'Paralegal']
        }
      ]
    }
  ],

  courses: {
    science: [
      {
        id: 'cs-engineering',
        title: 'Computer Science Engineering',
        stream: 'Science',
        category: 'Engineering',
        duration: '4 Years',
        difficulty: 'High',
        demand: 'Very High',
        avgSalary: '₹6-20 LPA',
        description: 'Design, develop, and maintain software applications and systems',
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&auto=format&fit=crop',
        skills: ['Programming', 'Algorithms', 'Data Structures', 'System Design', 'Mathematics'],
        entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE'],
        topColleges: ['IITs', 'NITs', 'IIITs', 'BITS Pilani'],
        eligibility: '12th Science with Physics, Chemistry, Mathematics',
        roadmap: [
          { year: '1-2', focus: 'Foundation subjects, programming basics' },
          { year: '3', focus: 'Specialization, internships' },
          { year: '4', focus: 'Advanced topics, final project, placements' }
        ]
      },
      {
        id: 'mbbs',
        title: 'MBBS (Medicine)',
        stream: 'Science',
        category: 'Medical',
        duration: '5.5 Years',
        difficulty: 'Very High',
        demand: 'High',
        avgSalary: '₹8-25 LPA',
        description: 'Medical degree to become a doctor and healthcare professional',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop',
        skills: ['Anatomy', 'Physiology', 'Clinical Skills', 'Patient Care', 'Diagnosis'],
        entranceExams: ['NEET', 'AIIMS', 'JIPMER'],
        topColleges: ['AIIMS', 'CMC Vellore', 'MAMC', 'KGMU'],
        eligibility: '12th Science with Physics, Chemistry, Biology',
        roadmap: [
          { year: '1-2', focus: 'Pre-clinical subjects (Anatomy, Physiology)' },
          { year: '3-4', focus: 'Clinical subjects, hospital rotations' },
          { year: '5', focus: 'Internship, specialization preparation' }
        ]
      },
      {
        id: 'data-science',
        title: 'Data Science',
        stream: 'Science',
        category: 'Technology',
        duration: '3-4 Years',
        difficulty: 'High',
        demand: 'Very High',
        avgSalary: '₹8-25 LPA',
        description: 'Analyze and interpret complex data to drive business decisions',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
        skills: ['Statistics', 'Python', 'Machine Learning', 'Data Visualization', 'SQL'],
        entranceExams: ['IIT JAM', 'CUET', 'University Entrance'],
        topColleges: ['IITs', 'IISc', 'ISI Kolkata', 'DU'],
        eligibility: '12th Science with Mathematics',
        roadmap: [
          { year: '1', focus: 'Mathematics, Statistics, Programming' },
          { year: '2', focus: 'Machine Learning, Database Management' },
          { year: '3', focus: 'Specialization, Projects, Internships' }
        ]
      },
      {
        id: 'biotech',
        title: 'Biotechnology',
        stream: 'Science',
        category: 'Research',
        duration: '4 Years',
        difficulty: 'High',
        demand: 'Medium-High',
        avgSalary: '₹5-15 LPA',
        description: 'Apply biological processes to develop products and technologies',
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop',
        skills: ['Lab Techniques', 'Genetic Engineering', 'Bioinformatics', 'Research'],
        entranceExams: ['JEE', 'State CETs', 'University Entrance'],
        topColleges: ['IITs', 'JNU', 'DU', 'BHU'],
        eligibility: '12th Science with Physics, Chemistry, Biology',
        roadmap: [
          { year: '1-2', focus: 'Basic Sciences, Introduction to Biotechnology' },
          { year: '3', focus: 'Specialization, Lab Work' },
          { year: '4', focus: 'Research Project, Industrial Training' }
        ]
      }
    ],
    commerce: [
      {
        id: 'ca',
        title: 'Chartered Accountancy',
        stream: 'Commerce',
        category: 'Finance',
        duration: '4-5 Years',
        difficulty: 'Very High',
        demand: 'High',
        avgSalary: '₹8-30 LPA',
        description: 'Professional accounting, auditing, and financial advisory',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop',
        skills: ['Accounting', 'Taxation', 'Auditing', 'Financial Analysis', 'Business Law'],
        entranceExams: ['CA Foundation'],
        topColleges: ['ICAI (Institute)', 'Top Commerce Colleges'],
        eligibility: '12th Commerce/Any stream',
        roadmap: [
          { stage: 'Foundation', focus: 'Basic accounting, business laws' },
          { stage: 'Intermediate', focus: 'Advanced accounting, taxation' },
          { stage: 'Final', focus: 'Strategic management, audit' }
        ]
      },
      {
        id: 'bcom',
        title: 'Bachelor of Commerce (B.Com)',
        stream: 'Commerce',
        category: 'Business',
        duration: '3 Years',
        difficulty: 'Medium',
        demand: 'High',
        avgSalary: '₹4-10 LPA',
        description: 'Comprehensive understanding of commerce, business, and finance',
        image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&auto=format&fit=crop',
        skills: ['Accounting', 'Economics', 'Business Studies', 'Taxation'],
        entranceExams: ['CUET', 'University Entrance'],
        topColleges: ['SRCC Delhi', 'Loyola Chennai', 'St. Xavier\'s Mumbai'],
        eligibility: '12th Commerce/Any stream',
        roadmap: [
          { year: '1', focus: 'Basic commerce subjects' },
          { year: '2', focus: 'Specialization subjects' },
          { year: '3', focus: 'Advanced topics, projects' }
        ]
      },
      {
        id: 'bba',
        title: 'Bachelor of Business Administration',
        stream: 'Commerce',
        category: 'Management',
        duration: '3 Years',
        difficulty: 'Medium',
        demand: 'High',
        avgSalary: '₹5-12 LPA',
        description: 'Develop business management and leadership skills',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
        skills: ['Management', 'Marketing', 'Finance', 'Human Resources'],
        entranceExams: ['SET', 'IPU CET', 'University Entrance'],
        topColleges: ['NMIMS Mumbai', 'Christ University', 'Symbiosis Pune'],
        eligibility: '12th Any stream',
        roadmap: [
          { year: '1', focus: 'Business fundamentals' },
          { year: '2', focus: 'Specialization selection' },
          { year: '3', focus: 'Internship, final project' }
        ]
      },
      {
        id: 'finance',
        title: 'Finance & Investment',
        stream: 'Commerce',
        category: 'Finance',
        duration: '3-4 Years',
        difficulty: 'High',
        demand: 'Very High',
        avgSalary: '₹6-20 LPA',
        description: 'Financial analysis, investment management, and banking',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
        skills: ['Financial Analysis', 'Investment Banking', 'Risk Management', 'Excel'],
        entranceExams: ['CAT', 'MAT', 'XAT', 'University Entrance'],
        topColleges: ['Top B-Schools', 'University Finance Departments'],
        eligibility: '12th Commerce with Mathematics',
        roadmap: [
          { year: '1-2', focus: 'Financial fundamentals, mathematics' },
          { year: '3', focus: 'Specialization, certifications' },
          { year: '4', focus: 'Internship, industry exposure' }
        ]
      }
    ],
    arts: [
      {
        id: 'psychology',
        title: 'Bachelor of Arts (Psychology)',
        stream: 'Arts',
        category: 'Social Sciences',
        duration: '3 Years',
        difficulty: 'Medium',
        demand: 'High',
        avgSalary: '₹3-8 LPA',
        description: 'Study of human mind, behavior, and mental processes',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&auto=format&fit=crop',
        skills: ['Counseling', 'Research', 'Communication', 'Empathy', 'Analysis'],
        entranceExams: ['CUET', 'University Entrance'],
        topColleges: ['Lady Shri Ram College', 'St. Xavier\'s', 'Fergusson College'],
        eligibility: '12th Any stream',
        roadmap: [
          { year: '1', focus: 'Introduction to psychology, basic theories' },
          { year: '2', focus: 'Specialized branches, research methods' },
          { year: '3', focus: 'Applied psychology, internship' }
        ]
      },
      {
        id: 'law',
        title: 'Bachelor of Laws (LLB)',
        stream: 'Arts',
        category: 'Law',
        duration: '3-5 Years',
        difficulty: 'High',
        demand: 'High',
        avgSalary: '₹5-15 LPA',
        description: 'Study of legal systems, laws, and judicial processes',
        image: 'https://images.unsplash.com/photo-1589391886085-8b6b0ac72a1a?w=800&auto=format&fit=crop',
        skills: ['Legal Research', 'Argumentation', 'Case Analysis', 'Communication'],
        entranceExams: ['CLAT', 'AILET', 'LSAT'],
        topColleges: ['NLSIU Bangalore', 'NALSAR Hyderabad', 'NLU Delhi'],
        eligibility: '12th Any stream',
        roadmap: [
          { year: '1-2', focus: 'Core law subjects, legal theory' },
          { year: '3-5', focus: 'Specialization, moot courts, internships' }
        ]
      },
      {
        id: 'journalism',
        title: 'Journalism & Mass Communication',
        stream: 'Arts',
        category: 'Communication',
        duration: '3 Years',
        difficulty: 'Medium',
        demand: 'Medium',
        avgSalary: '₹3-10 LPA',
        description: 'News reporting, media production, and communication',
        image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800&auto=format&fit=crop',
        skills: ['Writing', 'Reporting', 'Editing', 'Media Production', 'Research'],
        entranceExams: ['IPU CET', 'JMI Entrance', 'University Entrance'],
        topColleges: ['IIMC Delhi', 'Xavier\'s Mumbai', 'MCRC Jamia'],
        eligibility: '12th Any stream',
        roadmap: [
          { year: '1', focus: 'Media basics, writing skills' },
          { year: '2', focus: 'Specialization (print/electronic/digital)' },
          { year: '3', focus: 'Internship, portfolio development' }
        ]
      },
      {
        id: 'design',
        title: 'Bachelor of Design',
        stream: 'Arts',
        category: 'Creative Arts',
        duration: '4 Years',
        difficulty: 'Medium-High',
        demand: 'High',
        avgSalary: '₹5-12 LPA',
        description: 'Creative design in various domains like graphic, fashion, interior',
        image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&auto=format&fit=crop',
        skills: ['Creativity', 'Design Software', 'Visual Communication', 'Sketching'],
        entranceExams: ['NID', 'NIFT', 'UCEED'],
        topColleges: ['NID Ahmedabad', 'NIFT Delhi', 'IIT Bombay'],
        eligibility: '12th Any stream',
        roadmap: [
          { year: '1', focus: 'Foundation, design principles' },
          { year: '2', focus: 'Specialization selection' },
          { year: '3-4', focus: 'Advanced projects, portfolio, internships' }
        ]
      }
    ]
  },

  categories: [
    { id: 'all', name: 'All', icon: '📚' },
    { id: 'engineering', name: 'Engineering', icon: '⚙️' },
    { id: 'medical', name: 'Medical', icon: '🏥' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'finance', name: 'Finance', icon: '💰' },
    { id: 'business', name: 'Business', icon: '📊' },
    { id: 'management', name: 'Management', icon: '👔' },
    { id: 'creative', name: 'Creative', icon: '🎨' },
    { id: 'law', name: 'Law', icon: '⚖️' },
    { id: 'communication', name: 'Communication', icon: '📢' }
  ]
};