// Career progression paths for different fields
export const careerPaths = {
  engineering: {
    title: 'Engineering Career Path',
    preparation: {
      step: 'Immediate Next Step (Class 11-12)',
      tasks: ['Focus on Physics, Chemistry, and Mathematics (PCM)', 'Prepare for Entrance Exams (JEE Main/Advanced, BITSAT, State CETs)', 'Maintain high academic performance (>75%)']
    },
    education: {
      step: 'Bachelor\'s Degree (4 Years)',
      degree: 'B.Tech / B.E. in relevant specialization',
      focus: ['Fundamentals of Engineering', 'Programming / Domain Skills', 'Internships & Projects']
    },
    progression: [
      {
        level: 'Entry (0-2 years)',
        roles: ['Junior Engineer', 'Associate Engineer', 'Trainee'],
        salary: '3-6 LPA',
        skills: ['Technical basics', 'Problem solving', 'Team collaboration']
      },
      {
        level: 'Mid (3-5 years)',
        roles: ['Software Engineer', 'Senior Engineer', 'Team Lead'],
        salary: '8-15 LPA',
        skills: ['Advanced technical', 'Project management', 'Mentoring']
      },
      {
        level: 'Senior (6-10 years)',
        roles: ['Tech Lead', 'Engineering Manager', 'Architect'],
        salary: '18-35 LPA',
        skills: ['System design', 'Leadership', 'Strategic planning']
      },
      {
        level: 'Leadership (10+ years)',
        roles: ['Director', 'VP Engineering', 'CTO'],
        salary: '40+ LPA',
        skills: ['Business strategy', 'Organization building', 'Vision setting']
      }
    ],
    alternatives: ['Product Management', 'Data Science', 'Entrepreneurship', 'Consulting']
  },
  
  medical: {
    title: 'Medical Career Path',
    preparation: {
      step: 'Immediate Next Step (Class 11-12)',
      tasks: ['Focus on Physics, Chemistry, and Biology (PCB)', 'Prepare for NEET (UG) entrance exam', 'Aim for high score (>550/720) for Govt. colleges']
    },
    education: {
      step: 'Bachelor\'s Degree (5.5 Years)',
      degree: 'MBBS / BDS / BAMS / BHMS',
      focus: ['Clinical Rotations', 'Anatomy & Physiology', 'Internship Year']
    },
    progression: [
      {
        level: 'Foundation (0-2 years)',
        roles: ['Intern', 'Junior Resident'],
        salary: '5-8 LPA',
        skills: ['Clinical practice', 'Patient care', 'Medical procedures']
      },
      {
        level: 'Specialization (3-5 years)',
        roles: ['Senior Resident', 'Specialist (MD/MS)'],
        salary: '10-20 LPA',
        skills: ['Specialized knowledge', 'Advanced procedures', 'Research']
      },
      {
        level: 'Expert (6-10 years)',
        roles: ['Consultant', 'Associate Professor'],
        salary: '25-50 LPA',
        skills: ['Expert diagnosis', 'Teaching', 'Research publications']
      },
      {
        level: 'Leadership (10+ years)',
        roles: ['Head of Department', 'Medical Director', 'Professor'],
        salary: '50+ LPA',
        skills: ['Department management', 'Policy making', 'Academic leadership']
      }
    ],
    alternatives: ['Medical Research', 'Healthcare Administration', 'Public Health', 'Medical Writing']
  },

  commerce: {
    title: 'Commerce/Finance Career Path',
    preparation: {
      step: 'Immediate Next Step (Class 11-12)',
      tasks: ['Focus on Accountancy, Economics, and Business Studies', 'Optionally take Mathematics for better prospects', 'Prepare for CUET or professional entrance exams (CA Foundation)']
    },
    education: {
      step: 'Bachelor\'s Degree (3 Years)',
      degree: 'B.Com / BBA / BMS / Eco (Hons)',
      focus: ['Financial Accounting', 'Business Law', 'Professional Certifications (CA/CS/CMA)']
    },
    progression: [
      {
        level: 'Entry (0-2 years)',
        roles: ['Junior Accountant', 'Financial Analyst', 'Tax Associate'],
        salary: '3-6 LPA',
        skills: ['Accounting', 'Financial analysis', 'Compliance']
      },
      {
        level: 'Mid (3-5 years)',
        roles: ['Senior Accountant', 'Finance Manager', 'Tax Manager'],
        salary: '8-15 LPA',
        skills: ['Financial planning', 'Team management', 'Strategic analysis']
      },
      {
        level: 'Senior (6-10 years)',
        roles: ['Finance Controller', 'CFO (small firms)', 'Partner (CA firms)'],
        salary: '18-40 LPA',
        skills: ['Financial strategy', 'Risk management', 'Business partnering']
      },
      {
        level: 'Leadership (10+ years)',
        roles: ['CFO', 'Finance Director', 'Managing Partner'],
        salary: '50+ LPA',
        skills: ['Corporate strategy', 'Investor relations', 'M&A']
      }
    ],
    alternatives: ['Investment Banking', 'Consulting', 'Entrepreneurship', 'Financial Planning']
  },

  law: {
    title: 'Legal Career Path',
    preparation: {
      step: 'Immediate Next Step (Class 11-12)',
      tasks: ['Focus on humanities/social sciences', 'Prepare for CLAT, AILET, LSAT', 'Develop strong reading and analytical skills']
    },
    education: {
      step: 'Integrated Law Degree (5 Years)',
      degree: 'BA LLB / BBA LLB / B.Com LLB',
      focus: ['Constitutional Law', 'Moot Courts', 'Legal Internships']
    },
    progression: [
      {
        level: 'Entry (0-2 years)',
        roles: ['Junior Associate', 'Legal Intern'],
        salary: '4-8 LPA',
        skills: ['Legal research', 'Drafting', 'Court procedures']
      },
      {
        level: 'Mid (3-5 years)',
        roles: ['Associate', 'Senior Associate'],
        salary: '10-20 LPA',
        skills: ['Case management', 'Client handling', 'Negotiation']
      },
      {
        level: 'Senior (6-10 years)',
        roles: ['Partner', 'Senior Counsel', 'Judge (Judicial Services)'],
        salary: '25-60 LPA',
        skills: ['Expert advocacy', 'Business development', 'Team leadership']
      },
      {
        level: 'Leadership (10+ years)',
        roles: ['Managing Partner', 'Senior Advocate', 'High Court Judge'],
        salary: '75+ LPA',
        skills: ['Firm management', 'Thought leadership', 'Judicial expertise']
      }
    ],
    alternatives: ['Corporate Law', 'Judiciary', 'Legal Consulting', 'Academia']
  },

  media: {
    title: 'Media & Journalism Career Path',
    preparation: {
      step: 'Immediate Next Step (Class 11-12)',
      tasks: ['Focus on English/Languages', 'Start a blog or social media portfolio', 'Participate in debating and writing competitions']
    },
    education: {
      step: 'Bachelor\'s Degree (3 Years)',
      degree: 'BJMC / BMM / BA in Mass Comm',
      focus: ['Reporting & Editing', 'Digital Media', 'Broadcast Internships']
    },
    progression: [
      {
        level: 'Entry (0-2 years)',
        roles: ['Content Writer', 'Junior Journalist', 'Social Media Executive'],
        salary: '3-5 LPA',
        skills: ['Writing', 'Research', 'Social media']
      },
      {
        level: 'Mid (3-5 years)',
        roles: ['Senior Journalist', 'Content Manager', 'News Anchor'],
        salary: '6-12 LPA',
        skills: ['Investigative journalism', 'Team management', 'On-camera presence']
      },
      {
        level: 'Senior (6-10 years)',
        roles: ['Editor', 'Bureau Chief', 'Creative Director'],
        salary: '15-30 LPA',
        skills: ['Editorial strategy', 'Team leadership', 'Brand building']
      },
      {
        level: 'Leadership (10+ years)',
        roles: ['Editor-in-Chief', 'Media Director', 'Publisher'],
        salary: '35+ LPA',
        skills: ['Media strategy', 'Business management', 'Industry influence']
      }
    ],
    alternatives: ['Digital Marketing', 'PR & Communications', 'Content Entrepreneurship', 'Film Making']
  },

  design: {
    title: 'Design Career Path',
    preparation: {
      step: 'Immediate Next Step (Class 11-12)',
      tasks: ['Focus on creative arts/drawing', 'Build a portfolio of original work', 'Prepare for NID, NIFT, UCEED entrance exams']
    },
    education: {
      step: 'Bachelor\'s Degree (4 Years)',
      degree: 'B.Des / BFA',
      focus: ['Design Thinking', 'Software proficiency (Adobe/Figma)', 'Industry Projects']
    },
    progression: [
      {
        level: 'Entry (0-2 years)',
        roles: ['Junior Designer', 'UI/UX Designer', 'Graphic Designer'],
        salary: '3-6 LPA',
        skills: ['Design tools', 'Visual communication', 'User research']
      },
      {
        level: 'Mid (3-5 years)',
        roles: ['Senior Designer', 'Lead Designer', 'Design Specialist'],
        salary: '8-15 LPA',
        skills: ['Advanced design', 'Design systems', 'Mentoring']
      },
      {
        level: 'Senior (6-10 years)',
        roles: ['Design Manager', 'Principal Designer', 'Creative Director'],
        salary: '18-35 LPA',
        skills: ['Design strategy', 'Team leadership', 'Business impact']
      },
      {
        level: 'Leadership (10+ years)',
        roles: ['Head of Design', 'VP Design', 'Chief Design Officer'],
        salary: '40+ LPA',
        skills: ['Design vision', 'Organization building', 'Industry thought leadership']
      }
    ],
    alternatives: ['Product Design', 'Brand Consulting', 'Design Entrepreneurship', 'Teaching']
  },

  science: {
    title: 'Research & Science Career Path',
    preparation: {
      step: 'Immediate Next Step (Class 11-12)',
      tasks: ['Focus on Core Sciences (PCM/PCB)', 'Prepare for IAT (IISER), NEST, CUET', 'Engage in science fairs and projects']
    },
    education: {
      step: 'Bachelor\'s Degree (3-5 Years)',
      degree: 'B.Sc (Hons) / BS-MS Integrated',
      focus: ['Laboratory work', 'Core scientific principles', 'Minor Research Projects']
    },
    progression: [
      {
        level: 'Entry (0-2 years)',
        roles: ['Research Assistant', 'Lab Technician', 'Junior Scientist'],
        salary: '3-5 LPA',
        skills: ['Lab techniques', 'Data analysis', 'Research methodology']
      },
      {
        level: 'Mid (3-5 years)',
        roles: ['Scientist', 'Research Associate', 'PhD Scholar'],
        salary: '6-10 LPA',
        skills: ['Independent research', 'Publications', 'Grant writing']
      },
      {
        level: 'Senior (6-10 years)',
        roles: ['Senior Scientist', 'Assistant Professor', 'Research Lead'],
        salary: '12-25 LPA',
        skills: ['Research leadership', 'Teaching', 'Collaboration']
      },
      {
        level: 'Leadership (10+ years)',
        roles: ['Principal Scientist', 'Professor', 'Research Director'],
        salary: '30+ LPA',
        skills: ['Research vision', 'Team building', 'Industry impact']
      }
    ],
    alternatives: ['Data Science', 'Biotech Industry', 'Science Communication', 'Policy Making']
  },

  civilServices: {
    title: 'Civil Services Career Path',
    preparation: {
      step: 'Immediate Next Step (Class 11-12)',
      tasks: ['Focus on Social Sciences/Humanities', 'Start reading daily newspapers (The Hindu/Express)', 'Develop diverse knowledge across subjects']
    },
    education: {
      step: 'Bachelor\'s Degree (3-4 Years)',
      degree: 'Any Graduation (B.A/B.Sc/B.Com/B.Tech)',
      focus: ['UPSC/State PSC Preparation', 'General Studies', 'Optional Subject specialization']
    },
    progression: [
      {
        level: 'Entry (0-5 years)',
        roles: ['Sub-Divisional Magistrate', 'Assistant Superintendent of Police'],
        salary: '7-10 LPA',
        skills: ['Administration', 'Public policy', 'Leadership']
      },
      {
        level: 'Mid (6-15 years)',
        roles: ['District Magistrate', 'Superintendent of Police', 'Joint Secretary'],
        salary: '12-18 LPA',
        skills: ['Policy implementation', 'Crisis management', 'Stakeholder management']
      },
      {
        level: 'Senior (16-25 years)',
        roles: ['Divisional Commissioner', 'Additional Secretary', 'Inspector General'],
        salary: '20-25 LPA',
        skills: ['Strategic planning', 'Multi-sector coordination', 'Reform implementation']
      },
      {
        level: 'Leadership (25+ years)',
        roles: ['Chief Secretary', 'Cabinet Secretary', 'Director General'],
        salary: '30+ LPA',
        skills: ['Governance', 'Policy formulation', 'National impact']
      }
    ],
    alternatives: ['International Organizations', 'Think Tanks', 'Politics', 'Social Entrepreneurship']
  },
  cyberSecurity: {
    title: 'Cyber Security Career Path',
    preparation: {
      step: 'Immediate Next Step (Class 11-12)',
      tasks: ['Focus on Mathematics and Computer Science', 'Learn basics of networking and Linux', 'Participate in CTF (Capture The Flag) competitions']
    },
    education: {
      step: 'Bachelor\'s Degree (4 Years)',
      degree: 'B.Tech in Cyber Security / CSE',
      focus: ['Cryptography & Network Security', 'Ethical Hacking', 'Digital Forensics']
    },
    progression: [
      {
        level: 'Entry (0-2 years)',
        roles: ['Security Analyst', 'Junior Penetration Tester'],
        salary: '6-10 LPA',
        skills: ['Network security', 'Scripting', 'Vulnerability assessment']
      },
      {
        level: 'Mid (3-5 years)',
        roles: ['Security Consultant', 'Incident Responder'],
        salary: '12-20 LPA',
        skills: ['Cloud security', 'Malware analysis', 'Compliance']
      },
      {
        level: 'Senior (6-10 years)',
        roles: ['Security Architect', 'Lead Auditor'],
        salary: '25-45 LPA',
        skills: ['System architecture', 'Risk management', 'Team leadership']
      },
      {
        level: 'Leadership (10+ years)',
        roles: ['CISO', 'Director of Security'],
        salary: '50+ LPA',
        skills: ['Security strategy', 'Legal compliance', 'Business resilience']
      }
    ],
    alternatives: ['Forensics', 'Cloud Security', 'DevSecOps', 'Security Research']
  },
  aiRobotics: {
    title: 'AI & Robotics Career Path',
    preparation: {
      step: 'Immediate Next Step (Class 11-12)',
      tasks: ['Focus on Physics and Advanced Mathematics', 'Start learning Python and AI basics', 'Join a robotics club or build DIY projects']
    },
    education: {
      step: 'Bachelor\'s Degree (4 Years)',
      degree: 'B.Tech in AI & Robotics / Mechanical (with AI focus)',
      focus: ['Machine Learning', 'Control Systems', 'Computer Vision']
    },
    progression: [
      {
        level: 'Entry (0-2 years)',
        roles: ['Robotics Engineer', 'ML Associate'],
        salary: '8-12 LPA',
        skills: ['C++/Python', 'ROS (Robot OS)', 'Linear Algebra']
      },
      {
        level: 'Mid (3-5 years)',
        roles: ['Automation Engineer', 'Computer Vision Specialist'],
        salary: '15-25 LPA',
        skills: ['Deep learning', 'Sensor fusion', 'Motion planning']
      },
      {
        level: 'Senior (6-10 years)',
        roles: ['AI Architect', 'Robotics Research Lead'],
        salary: '30-55 LPA',
        skills: ['Algorithm design', 'Project leadership', 'Hardware-Software integration']
      },
      {
        level: 'Leadership (10+ years)',
        roles: ['CTO (Robotics)', 'Head of AI'],
        salary: '60+ LPA',
        skills: ['Product vision', 'R&D strategy', 'Market analysis']
      }
    ],
    alternatives: ['Drone Tech', 'Industrial Automation', 'Ethical AI', 'Aerospace']
  },
  fintech: {
    title: 'Fintech Career Path',
    preparation: {
      step: 'Immediate Next Step (Class 11-12)',
      tasks: ['Focus on Commerce/Finance and Mathematics', 'Follow digital banking and crypto trends', 'Learn basic SQL or Python']
    },
    education: {
      step: 'Bachelor\'s Degree (3 Years)',
      degree: 'BBA in Fintech / B.Com (with Tech focus)',
      focus: ['Digital Payments', 'Blockchain in Finance', 'Financial Analytics']
    },
    progression: [
      {
        level: 'Entry (0-2 years)',
        roles: ['Fintech Analyst', 'Operations Associate'],
        salary: '5-9 LPA',
        skills: ['Data analysis', 'Finance basics', 'Product understanding']
      },
      {
        level: 'Mid (3-5 years)',
        roles: ['Product Manager (Fintech)', 'Risk Analyst'],
        salary: '12-22 LPA',
        skills: ['Agile methodology', 'RegTech knowledge', 'SQL/Python']
      },
      {
        level: 'Senior (6-10 years)',
        roles: ['Fintech Strategist', 'Compliance Lead'],
        salary: '25-45 LPA',
        skills: ['Market strategy', 'Partnership management', 'Financial regulations']
      },
      {
        level: 'Leadership (10+ years)',
        roles: ['Head of Payments', 'Chief Strategy Officer'],
        salary: '50+ LPA',
        skills: ['Global strategy', 'Innovation leadership', 'Ecosystem building']
      }
    ],
    alternatives: ['Crypto Strategy', 'Neobanking', 'InsureTech', 'WealthTech']
  },
  digitalMarketing: {
    title: 'Digital Marketing Career Path',
    preparation: {
      step: 'Immediate Next Step (Class 11-12)',
      tasks: ['Focus on Communication and Creative Arts', 'Start a niche blog or YouTube channel', 'Follow marketing influencers and trends']
    },
    education: {
      step: 'Bachelor\'s Degree (3 Years)',
      degree: 'B.Voc in Digital Marketing / BBA (Marketing)',
      focus: ['SEO & SEM', 'Social Media Marketing', 'Performance Analytics']
    },
    progression: [
      {
        level: 'Entry (0-2 years)',
        roles: ['Digital Marketing Executive', 'SEO Associate'],
        salary: '4-7 LPA',
        skills: ['Content creation', 'Basic SEO', 'Tool proficiency (AdWords/Meta)']
      },
      {
        level: 'Mid (3-5 years)',
        roles: ['Marketing Manager', 'Content Strategist'],
        salary: '8-15 LPA',
        skills: ['Campaign planning', 'Data analytics', 'Team management']
      },
      {
        level: 'Senior (6-10 years)',
        roles: ['Growth Head', 'Director of Marketing'],
        salary: '18-35 LPA',
        skills: ['Brand strategy', 'Revenue optimization', 'Stakeholder management']
      },
      {
        level: 'Leadership (10+ years)',
        roles: ['CMO', 'VP Marketing'],
        salary: '40+ LPA',
        skills: ['Global brand vision', 'Business strategy', 'Industry influence']
      }
    ],
    alternatives: ['E-commerce', 'Brand Consulting', 'Influencer Marketing', 'PR']
  },
  psychology: {
    title: 'Psychology Career Path',
    preparation: {
      step: 'Immediate Next Step (Class 11-12)',
      tasks: ['Focus on Humanities and Psychology', 'Volunteer for social causes or mental health awareness', 'Develop strong empathy and listening skills']
    },
    education: {
      step: 'Bachelor\'s Degree (3 Years)',
      degree: 'B.A. / B.Sc in Psychology',
      focus: ['Abnormal Psychology', 'Clinical Foundations', 'Counseling Basics']
    },
    progression: [
      {
        level: 'Entry (0-2 years)',
        roles: ['Counselor Assistant', 'School Counselor'],
        salary: '3-6 LPA',
        skills: ['Active listening', 'Report writing', 'Assessment tools']
      },
      {
        level: 'Mid (3-5 years)',
        roles: ['Clinical Psychologist (Post Master\'s)', 'Industrial Psychologist'],
        salary: '7-15 LPA',
        skills: ['Therapeutic techniques', 'Testing & Evaluation', 'Case management']
      },
      {
        level: 'Senior (6-10 years)',
        roles: ['Consultant Psychologist', 'Mental Health Lead'],
        salary: '18-35 LPA',
        skills: ['Expert supervision', 'Program development', 'Research leadership']
      },
      {
        level: 'Leadership (10+ years)',
        roles: ['Head of Clinical Services', 'Founder (Psychology Firm)'],
        salary: '40+ LPA',
        skills: ['Healthcare policy', 'Organization building', 'Public impact']
      }
    ],
    alternatives: ['UX Research', 'Human Resources', 'Forensic Psychology', 'Corporate Training']
  },
  uxDesign: {
    title: 'UX/UI Design Career Path',
    preparation: {
      step: 'Immediate Next Step (Class 11-12)',
      tasks: ['Focus on Creative Arts and Technology', 'Build a portfolio with Figma/Adobe XD', 'Analyze user experience in daily apps']
    },
    education: {
      step: 'Bachelor\'s Degree (4 Years)',
      degree: 'B.Des in UX/UI Design / Interaction Design',
      focus: ['User Research', 'Information Architecture', 'Visual Design Systems']
    },
    progression: [
      {
        level: 'Entry (0-2 years)',
        roles: ['Junior UX Designer', 'UI Designer'],
        salary: '5-9 LPA',
        skills: ['Prototyping', 'Design tools', 'Empathy mapping']
      },
      {
        level: 'Mid (3-5 years)',
        roles: ['Senior UX Designer', 'Interaction Designer'],
        salary: '12-22 LPA',
        skills: ['User testing', 'Design systems', 'Stakeholder management']
      },
      {
        level: 'Senior (6-10 years)',
        roles: ['Design Lead', 'Product Designer'],
        salary: '25-45 LPA',
        skills: ['Product strategy', 'Design leadership', 'Mentorhip']
      },
      {
        level: 'Leadership (10+ years)',
        roles: ['Head of Product Design', 'VP Design'],
        salary: '50+ LPA',
        skills: ['Design vision', 'Organizational growth', 'Business strategy']
      }
    ],
    alternatives: ['Product Management', 'Motion Design', 'AR/VR Design', 'UX Writing']
  }
};

export default careerPaths;
