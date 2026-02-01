// Comprehensive course data for career guidance
export const coursesData = [
  // Science Stream
  // Science Stream - Engineering Branches
  {
    id: 'btech-cse',
    name: 'B.Tech in Computer Science & Engineering (CSE)',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      preferredElectives: ['Computer Science', 'Information Technology'],
      minPercentage: 75,
      entranceExams: ['JEE Main', 'JEE Advanced', 'State CETs']
    },
    description: 'Focuses on computer systems, software development, algorithms, and AI.',
    careerPaths: ['Software Engineer', 'Full Stack Developer', 'System Architect'],
    averageSalary: '8-20 LPA',
    topColleges: ['IITs', 'NITs', 'BITS Pilani', 'IIITs'],
    interests: ['Technology', 'Programming', 'Innovation', 'Problem Solving'],
    skills: ['Technical', 'Analytical', 'Logical', 'Creative'],
    workEnvironment: 'Corporate/Startup',
    futureScope: 'Excellent - High demand in Global IT'
  },
  {
    id: 'btech-it',
    name: 'B.Tech in Information Technology (IT)',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      preferredElectives: ['Computer Science', 'Information Technology'],
      minPercentage: 75,
      entranceExams: ['JEE Main', 'State CETs']
    },
    description: 'Focuses on information systems, networking, and software applications.',
    careerPaths: ['IT Consultant', 'Network Engineer', 'Cloud Architect'],
    averageSalary: '7-18 LPA',
    topColleges: ['NITs', 'IIITs', 'NSUT', 'DTU'],
    interests: ['Technology', 'Innovation', 'Problem Solving'],
    skills: ['Technical', 'Analytical', 'Logical'],
    workEnvironment: 'Corporate',
    futureScope: 'Excellent - backbone of digital economy'
  },
  {
    id: 'btech-aiml',
    name: 'B.Tech in AI & Machine Learning',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      preferredElectives: ['Computer Science', 'Maths'],
      minPercentage: 80,
      entranceExams: ['JEE Main', 'JEE Advanced']
    },
    description: 'Specialized branch focusing on artificial intelligence, neural networks, and automation.',
    careerPaths: ['AI Engineer', 'Machine Learning Researcher', 'Data Scientist'],
    averageSalary: '10-25 LPA',
    topColleges: ['IIT Hyderabad', 'IIT Bombay', 'IIIT Hyderabad'],
    interests: ['Technology', 'Innovation', 'Programming', 'Science'],
    skills: ['Technical', 'Analytical', 'Research', 'Logical'],
    workEnvironment: 'R&D/Tech Labs',
    futureScope: 'Excellent - Fastest growing tech field'
  },
  {
    id: 'btech-ds',
    name: 'B.Tech in Data Science',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      preferredElectives: ['Computer Science', 'Statistics'],
      minPercentage: 78,
      entranceExams: ['JEE Main', 'State CETs']
    },
    description: 'Focuses on extracting insights from large data sets using statistical and computational methods.',
    careerPaths: ['Data Analyst', 'Business Intelligence Developer', 'Data Engineer'],
    averageSalary: '8-22 LPA',
    topColleges: ['IITs', 'NITs', 'BITS Pilani'],
    interests: ['Technology', 'Problem Solving', 'Innovation'],
    skills: ['Analytical', 'Technical', 'Numerical', 'Logical'],
    workEnvironment: 'Corporate/Consulting',
    futureScope: 'Excellent - Data is the new oil'
  },
  {
    id: 'btech-ece',
    name: 'B.Tech in Electronics & Communication (ECE)',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      minPercentage: 75,
      entranceExams: ['JEE Main', 'State CETs']
    },
    description: 'Deals with electronic devices, circuits, communication equipment, and VLSI.',
    careerPaths: ['Electronics Engineer', 'Communication Specialist', 'VLSI Designer'],
    averageSalary: '6-15 LPA',
    topColleges: ['IITs', 'NITs', 'IIITs'],
    interests: ['Technology', 'Innovation', 'Innovation'],
    skills: ['Technical', 'Analytical', 'Numerical'],
    workEnvironment: 'Tech/Semiconductor/Manufacturing',
    futureScope: 'Very Good - Hardware and 5G/6G growth'
  },
  {
    id: 'btech-mech',
    name: 'B.Tech in Mechanical Engineering',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      minPercentage: 70,
      entranceExams: ['JEE Main', 'GATE']
    },
    description: 'Deals with design, construction, and use of machinery.',
    careerPaths: ['Mechanical Engineer', 'Automotive Engineer', 'Production Manager'],
    averageSalary: '5-12 LPA',
    topColleges: ['IITs', 'NITs', 'BIT Mesra'],
    interests: ['Technology', 'Science', 'Innovation'],
    skills: ['Analytical', 'Technical', 'Logical'],
    workEnvironment: 'Industrial/Plant',
    futureScope: 'Good - Core engineering demand'
  },
  {
    id: 'btech-eee',
    name: 'B.Tech in Electrical & Electronics (EEE)',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      minPercentage: 70,
      entranceExams: ['JEE Main', 'State CETs']
    },
    description: 'Covers electrical power systems, electronics, and electromagnetism.',
    careerPaths: ['Electrical Engineer', 'Power Grid Manager', 'Control Systems Engineer'],
    averageSalary: '6-14 LPA',
    topColleges: ['IITs', 'NITs', 'DTU'],
    interests: ['Technology', 'Science', 'Innovation'],
    skills: ['Technical', 'Analytical', 'Numerical'],
    workEnvironment: 'Power/Telecom/Manufacturing',
    futureScope: 'Good - renewable energy push'
  },
  {
    id: 'cyber-security',
    name: 'B.Tech in Cyber Security',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      minPercentage: 75,
      entranceExams: ['JEE Main', 'State CETs']
    },
    description: 'Protection of systems, networks, and programs from digital attacks.',
    careerPaths: ['Security Analyst', 'Ethical Hacker', 'Forensic Expert'],
    averageSalary: '8-22 LPA',
    topColleges: ['IITs', 'NITs', 'IIITs', 'Amity'],
    interests: ['Technology', 'Problem Solving', 'Innovation'],
    skills: ['Technical', 'Analytical', 'Logical'],
    workEnvironment: 'Corporate/Government/Remote',
    futureScope: 'Excellent - High demand for data protection',
    trending: true
  },
  {
    id: 'robotics-ai',
    name: 'B.Tech in Robotics & AI',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      minPercentage: 80,
      entranceExams: ['JEE Main', 'JEE Advanced']
    },
    description: 'Interdisciplinary branch combining mechanical, electrical, and computer science for automation.',
    careerPaths: ['Robotics Engineer', 'Automation Consultant', 'Machine Learning Engineer'],
    averageSalary: '10-25 LPA',
    topColleges: ['IIT Kanpur', 'IIT Madras', 'BITS Pilani'],
    interests: ['Technology', 'Science', 'Innovation'],
    skills: ['Technical', 'Analytical', 'Logical', 'Mathematical'],
    workEnvironment: 'R&D Labs/Manufacturing',
    futureScope: 'Excellent - Future of industry 4.0',
    trending: true
  },
  {
    id: 'mbbs',
    name: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
    stream: 'Science',
    duration: '5.5 years',
    eligibility: {
      subjects: ['PCB'],
      minPercentage: 85,
      entranceExams: ['NEET']
    },
    description: 'Medical degree to become a doctor with various specialization options.',
    careerPaths: ['Doctor', 'Surgeon', 'Medical Researcher', 'Healthcare Administrator'],
    averageSalary: '8-20 LPA',
    topColleges: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER', 'KGMU'],
    interests: ['Healthcare', 'Helping Others', 'Science'],
    skills: ['Empathy', 'Attention to Detail', 'Communication'],
    workEnvironment: 'Hospital/Clinic',
    futureScope: 'Excellent - Always in demand'
  },
  {
    id: 'bsc',
    name: 'B.Sc (Bachelor of Science)',
    stream: 'Science',
    duration: '3 years',
    eligibility: {
      subjects: ['PCM', 'PCB', 'PCMB'],
      minPercentage: 60,
      entranceExams: ['CUET', 'University-specific']
    },
    description: 'Undergraduate science degree with specializations in Physics, Chemistry, Biology, Mathematics, etc.',
    careerPaths: ['Research Scientist', 'Lab Technician', 'Teacher', 'Data Analyst'],
    averageSalary: '3-8 LPA',
    topColleges: ['St. Stephens', 'Loyola College', 'Fergusson College'],
    interests: ['Science', 'Research', 'Teaching'],
    skills: ['Analytical', 'Research', 'Technical'],
    workEnvironment: 'Lab/Academic',
    futureScope: 'Good - Foundation for higher studies'
  },
  {
    id: 'bca',
    name: 'BCA (Bachelor of Computer Applications)',
    stream: 'Science',
    duration: '3 years',
    eligibility: {
      subjects: ['Any with Math'],
      minPercentage: 55,
      entranceExams: ['CUET', 'IPU CET']
    },
    description: 'Computer applications degree focusing on programming and software development.',
    careerPaths: ['Software Developer', 'Web Developer', 'System Administrator', 'IT Consultant'],
    averageSalary: '4-10 LPA',
    topColleges: ['Christ University', 'Symbiosis', 'IGNOU'],
    interests: ['Technology', 'Programming', 'Problem Solving'],
    skills: ['Coding', 'Logical', 'Technical'],
    workEnvironment: 'IT Companies',
    futureScope: 'Very Good - Growing IT sector'
  },
  {
    id: 'bpharm',
    name: 'B.Pharm (Bachelor of Pharmacy)',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCB', 'PCM'],
      minPercentage: 70,
      entranceExams: ['NEET', 'GPAT']
    },
    description: 'Pharmaceutical sciences degree for drug development and healthcare.',
    careerPaths: ['Pharmacist', 'Drug Inspector', 'Medical Representative', 'Research Scientist'],
    averageSalary: '3-8 LPA',
    topColleges: ['NIPER', 'ICT Mumbai', 'JSS Mysore'],
    interests: ['Healthcare', 'Chemistry', 'Research'],
    skills: ['Analytical', 'Attention to Detail', 'Communication'],
    workEnvironment: 'Pharmacy/Lab/Hospital',
    futureScope: 'Good - Healthcare industry growth'
  },
  {
    id: 'sustainable-energy',
    name: 'B.Tech in Sustainable Energy Engineering',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      minPercentage: 75,
      entranceExams: ['JEE Main', 'State CETs']
    },
    description: 'Focuses on renewable energy sources, energy efficiency, and sustainable power systems.',
    careerPaths: ['Renewable Energy Engineer', 'Energy Auditor', 'Sustainability Consultant'],
    averageSalary: '6-15 LPA',
    topColleges: ['IIT Bombay', 'IIT Delhi', 'NIT Trichy'],
    interests: ['Science', 'Technology', 'Innovation', 'Environment'],
    skills: ['Technical', 'Analytical', 'Problem Solving'],
    workEnvironment: 'Office/Field',
    futureScope: 'Excellent - Global shift to green energy',
    trending: true
  },
  {
    id: 'food-tech',
    name: 'B.Tech in Food Technology & Nutrition',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM', 'PCB'],
      minPercentage: 70,
      entranceExams: ['JEE Main', 'ICAR AIEEA']
    },
    description: 'Application of food science to the selection, preservation, processing, and distribution of safe food.',
    careerPaths: ['Food Scientist', 'Quality Control Manager', 'Nutritionist'],
    averageSalary: '5-12 LPA',
    topColleges: ['NIFTEM', 'CFTRI', 'ICT Mumbai'],
    interests: ['Science', 'Healthcare', 'Research'],
    skills: ['Analytical', 'Technical', 'Research'],
    workEnvironment: 'Lab/Factory',
    futureScope: 'Very Good - Expanding food processing sector',
    trending: true
  },

  // Commerce Stream
  {
    id: 'bcom',
    name: 'B.Com (Bachelor of Commerce)',
    stream: 'Commerce',
    duration: '3 years',
    eligibility: {
      subjects: ['Commerce', 'Any'],
      minPercentage: 55,
      entranceExams: ['CUET', 'University-specific']
    },
    description: 'Commerce degree covering accounting, finance, economics, and business.',
    careerPaths: ['Accountant', 'Financial Analyst', 'Tax Consultant', 'Banker'],
    averageSalary: '3-8 LPA',
    topColleges: ['SRCC', 'St. Xaviers', 'Loyola College'],
    interests: ['Finance', 'Business', 'Economics'],
    skills: ['Numerical', 'Analytical', 'Communication'],
    workEnvironment: 'Corporate/Banking',
    futureScope: 'Good - Foundation for CA/MBA'
  },
  {
    id: 'bba',
    name: 'BBA (Bachelor of Business Administration)',
    stream: 'Commerce',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 55,
      entranceExams: ['CUET', 'IPU CET', 'NPAT']
    },
    description: 'Business administration degree focusing on management and entrepreneurship.',
    careerPaths: ['Business Manager', 'Marketing Executive', 'HR Manager', 'Entrepreneur'],
    averageSalary: '4-10 LPA',
    topColleges: ['Shaheed Sukhdev', 'Christ University', 'Symbiosis'],
    interests: ['Business', 'Leadership', 'Management'],
    skills: ['Leadership', 'Communication', 'Strategic Thinking'],
    workEnvironment: 'Corporate',
    futureScope: 'Very Good - Pathway to MBA'
  },
  {
    id: 'ca',
    name: 'CA (Chartered Accountancy)',
    stream: 'Commerce',
    duration: '4-5 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['CA Foundation']
    },
    description: 'Professional accounting qualification with articleship training.',
    careerPaths: ['Chartered Accountant', 'Tax Consultant', 'Auditor', 'Financial Advisor'],
    averageSalary: '8-25 LPA',
    topColleges: ['ICAI Centers'],
    interests: ['Finance', 'Taxation', 'Accounting'],
    skills: ['Numerical', 'Analytical', 'Attention to Detail'],
    workEnvironment: 'Corporate/Practice',
    futureScope: 'Excellent - High prestige and income'
  },
  {
    id: 'cs',
    name: 'CS (Company Secretary)',
    stream: 'Commerce',
    duration: '3-4 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['CS Foundation']
    },
    description: 'Corporate law and governance professional qualification.',
    careerPaths: ['Company Secretary', 'Compliance Officer', 'Legal Advisor', 'Corporate Consultant'],
    averageSalary: '6-15 LPA',
    topColleges: ['ICSI Centers'],
    interests: ['Law', 'Corporate Governance', 'Finance'],
    skills: ['Legal', 'Analytical', 'Communication'],
    workEnvironment: 'Corporate',
    futureScope: 'Good - Corporate sector demand'
  },
  {
    id: 'fintech',
    name: 'BBA in Fintech',
    stream: 'Commerce',
    duration: '3 years',
    eligibility: {
      subjects: ['Math'],
      minPercentage: 65,
      entranceExams: ['CUET', 'IPMAT']
    },
    description: 'Combines finance and technology for modern banking and payment systems.',
    careerPaths: ['Blockchain Analyst', 'Fintech Consultant', 'Risk Manager'],
    averageSalary: '7-18 LPA',
    topColleges: ['NMIMS', 'Symbiosis', 'IIM Indore (IPM)'],
    interests: ['Finance', 'Technology', 'Business'],
    skills: ['Numerical', 'Technical', 'Analytical'],
    workEnvironment: 'Banks/Fintech Startups',
    futureScope: 'Excellent - Digital finance revolution',
    trending: true
  },
  {
    id: 'digital-marketing',
    name: 'B.Voc in Digital Marketing',
    stream: 'Commerce',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 55,
      entranceExams: ['CUET', 'Direct Merit']
    },
    description: 'Focuses on online brand promotion, social media, and data-driven marketing.',
    careerPaths: ['SEO Specialist', 'Content Strategist', 'E-commerce Manager'],
    averageSalary: '5-15 LPA',
    topColleges: ['TISS', 'St. Xaviers', 'DU'],
    interests: ['Business', 'Creative', 'Media'],
    skills: ['Creative', 'Analytical', 'Communication'],
    workEnvironment: 'Agencies/Corporate/Remote',
    futureScope: 'Very Good - Essential for all businesses',
    trending: true
  },
  {
    id: 'data-science-business',
    name: 'B.Sc in Data Science for Business',
    stream: 'Commerce',
    duration: '3 years',
    eligibility: {
      subjects: ['Math'],
      minPercentage: 70,
      entranceExams: ['CUET']
    },
    description: 'Application of data science tools to business decision making.',
    careerPaths: ['Business Intelligence Analyst', 'Data Consultant', 'Marketing Analyst'],
    averageSalary: '6-16 LPA',
    topColleges: ['Christ University', 'Loyola College', 'Symbiosis'],
    interests: ['Finance', 'Technology', 'Analytical'],
    skills: ['Analytical', 'Numerical', 'Technical'],
    workEnvironment: 'Corporate/Consulting',
    futureScope: 'Excellent - High demand for data-driven insights',
    trending: true
  },
  {
    id: 'e-commerce-supply',
    name: 'B.BA in E-commerce & Digital Supply Chain',
    stream: 'Commerce',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 60,
      entranceExams: ['CUET', 'IPU CET']
    },
    description: 'Management of online business operations and digital logistics.',
    careerPaths: ['E-commerce Manager', 'Supply Chain Analyst', 'Logistics Coordinator'],
    averageSalary: '5-14 LPA',
    topColleges: ['IIM Indore (IPM)', 'Symbiosis', 'NMIMS'],
    interests: ['Business', 'Technology', 'Management'],
    skills: ['Analytical', 'Communication', 'Technical'],
    workEnvironment: 'Corporate/Remote',
    futureScope: 'Excellent - Growth of online retail',
    trending: true
  },
  {
    id: 'product-management',
    name: 'B.BA in Product Management',
    stream: 'Commerce',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 65,
      entranceExams: ['CUET', 'NPAT']
    },
    description: 'Focuses on the lifecycle of a product from conception to market success.',
    careerPaths: ['Associate Product Manager', 'Product Analyst', 'Business Analyst'],
    averageSalary: '7-18 LPA',
    topColleges: ['SPJIMR', 'IIM Rohtak', 'Symbiosis'],
    interests: ['Business', 'Technology', 'Leadership'],
    skills: ['Leadership', 'Analytical', 'Communication'],
    workEnvironment: 'Corporate/Startup',
    futureScope: 'Excellent - Critical role in tech companies',
    trending: true
  },

  // Arts/Humanities Stream
  {
    id: 'ba',
    name: 'B.A. (Bachelor of Arts)',
    stream: 'Arts',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['CUET', 'University-specific']
    },
    description: 'Liberal arts degree with specializations in History, Political Science, Psychology, English, etc.',
    careerPaths: ['Civil Services', 'Teacher', 'Content Writer', 'Social Worker'],
    averageSalary: '3-8 LPA',
    topColleges: ['St. Stephens', 'Lady Shri Ram', 'Presidency College'],
    interests: ['Social Sciences', 'Writing', 'Public Service'],
    skills: ['Communication', 'Critical Thinking', 'Research'],
    workEnvironment: 'Government/NGO/Media',
    futureScope: 'Good - Diverse career options'
  },
  {
    id: 'bjmc',
    name: 'BJMC (Bachelor of Journalism and Mass Communication)',
    stream: 'Arts',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 55,
      entranceExams: ['CUET', 'IPU CET']
    },
    description: 'Journalism and media studies degree for communication careers.',
    careerPaths: ['Journalist', 'Content Creator', 'PR Manager', 'News Anchor'],
    averageSalary: '4-12 LPA',
    topColleges: ['IIMC', 'Symbiosis', 'Xavier Institute'],
    interests: ['Media', 'Writing', 'Current Affairs'],
    skills: ['Communication', 'Creative', 'Research'],
    workEnvironment: 'Media Houses/Digital',
    futureScope: 'Good - Growing digital media'
  },
  {
    id: 'llb',
    name: 'LLB (Bachelor of Laws)',
    stream: 'Arts',
    duration: '3 years (after graduation) / 5 years (integrated)',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['CLAT', 'LSAT']
    },
    description: 'Law degree for legal practice and judiciary.',
    careerPaths: ['Lawyer', 'Judge', 'Legal Advisor', 'Corporate Counsel'],
    averageSalary: '5-20 LPA',
    topColleges: ['NLSIU Bangalore', 'NALSAR', 'NLU Delhi'],
    interests: ['Law', 'Justice', 'Debate'],
    skills: ['Analytical', 'Communication', 'Critical Thinking'],
    workEnvironment: 'Courts/Corporate',
    futureScope: 'Excellent - Always in demand'
  },
  {
    id: 'bdes',
    name: 'B.Des (Bachelor of Design)',
    stream: 'Arts',
    duration: '4 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['UCEED', 'NID DAT', 'NIFT']
    },
    description: 'Design degree for creative and visual communication careers.',
    careerPaths: ['UI/UX Designer', 'Graphic Designer', 'Product Designer', 'Fashion Designer'],
    averageSalary: '4-15 LPA',
    topColleges: ['NID', 'NIFT', 'IIT Bombay IDC'],
    interests: ['Art', 'Creativity', 'Visual Design'],
    skills: ['Creative', 'Visual', 'Technical'],
    workEnvironment: 'Studios/Agencies',
    futureScope: 'Very Good - Growing design industry'
  },
  {
    id: 'bfa',
    name: 'BFA (Bachelor of Fine Arts)',
    stream: 'Arts',
    duration: '4 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['University-specific']
    },
    description: 'Fine arts degree for painting, sculpture, and visual arts.',
    careerPaths: ['Artist', 'Art Teacher', 'Illustrator', 'Art Director'],
    averageSalary: '3-10 LPA',
    topColleges: ['JJ School of Art', 'MS University', 'BHU'],
    interests: ['Art', 'Creativity', 'Expression'],
    skills: ['Creative', 'Visual', 'Artistic'],
    workEnvironment: 'Studios/Freelance',
    futureScope: 'Moderate - Niche field'
  },
  {
    id: 'bhotel',
    name: 'B.Sc Hotel Management',
    stream: 'Any',
    duration: '3-4 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['NCHMCT JEE']
    },
    description: 'Hospitality management degree for hotel and tourism industry.',
    careerPaths: ['Hotel Manager', 'Chef', 'Event Manager', 'Tourism Consultant'],
    averageSalary: '4-12 LPA',
    topColleges: ['IHM Delhi', 'IHM Mumbai', 'Welcomgroup'],
    interests: ['Hospitality', 'People Management', 'Travel'],
    skills: ['Communication', 'Management', 'Customer Service'],
    workEnvironment: 'Hotels/Resorts',
    futureScope: 'Good - Growing tourism sector'
  },
  {
    id: 'clinical-psychology',
    name: 'B.A. in Clinical Psychology',
    stream: 'Arts',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 60,
      entranceExams: ['CUET']
    },
    description: 'Study of mental health, behavior, and psychological disorders.',
    careerPaths: ['Counselor', 'Psychologist Assistant', 'Mental Health Support'],
    averageSalary: '4-10 LPA',
    topColleges: ['TISS', 'DU', 'Christ University'],
    interests: ['Healthcare', 'Helping Others', 'Science'],
    skills: ['Empathy', 'Communication', 'Research'],
    workEnvironment: 'Clinics/Hospitals/Private Practice',
    futureScope: 'Excellent - Increasing focus on mental health',
    trending: true
  },
  {
    id: 'ux-ui-design',
    name: 'B.Des in UX/UI Design',
    stream: 'Any',
    duration: '4 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 55,
      entranceExams: ['UCEED', 'NID DAT']
    },
    description: 'Designing digital products with a focus on user experience and interface aesthetics.',
    careerPaths: ['Product Designer', 'UX Researcher', 'UI Developer'],
    averageSalary: '6-18 LPA',
    topColleges: ['NID', 'IIT Bombay', 'Srishti'],
    interests: ['Creative', 'Technology', 'Visual Design'],
    skills: ['Creative', 'Technical', 'Analytical'],
    workEnvironment: 'Tech Companies/Agencies',
    futureScope: 'Excellent - Every digital product needs good design',
    trending: true
  },
  {
    id: 'digital-media-animation',
    name: 'B.A. in Digital Media & Animation',
    stream: 'Arts',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['University-specific']
    },
    description: 'Creating visual content, animations, and special effects for media and gaming.',
    careerPaths: ['Animator', 'VFX Artist', 'Game Designer'],
    averageSalary: '5-15 LPA',
    topColleges: ['Whistling Woods', 'MAAC', 'NID'],
    interests: ['Creative', 'Media', 'Technology'],
    skills: ['Creative', 'Visual', 'Technical'],
    workEnvironment: 'Studios/Gaming Companies',
    futureScope: 'Very Good - Boom in content consumption',
    trending: true
  },
  {
    id: 'creative-writing',
    name: 'B.A. in Creative Writing & Content Strategy',
    stream: 'Arts',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 60,
      entranceExams: ['CUET']
    },
    description: 'Developing professional writing skills for media, advertising, and digital platforms.',
    careerPaths: ['Content Strategist', 'Copywriter', 'Author', 'Editor'],
    averageSalary: '4-12 LPA',
    topColleges: ['Ashoka University', 'FLAME', 'DU'],
    interests: ['Creative', 'Writing', 'Media'],
    skills: ['Creative', 'Communication', 'Research'],
    workEnvironment: 'Remote/Office',
    futureScope: 'Very Good - Content is king in digital era',
    trending: true
  },
  {
    id: 'culinary-arts',
    name: 'B.A. in Culinary Arts & Hospitality Management',
    stream: 'Any',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['NCHMCT JEE']
    },
    description: 'Professional training in cooking, food preparation, and hospitality operations.',
    careerPaths: ['Executive Chef', 'Restaurant Manager', 'Food Stylist'],
    averageSalary: '4-15 LPA',
    topColleges: ['IHM Pusa', 'WGSHA Manipal', 'IHM Mumbai'],
    interests: ['Creative', 'Hospitality', 'Management'],
    skills: ['Creative', 'Leadership', 'Management'],
    workEnvironment: 'Hotels/Restaurants',
    futureScope: 'Good - Premium dining and tourism growth',
    trending: true
  }
];

export default coursesData;
