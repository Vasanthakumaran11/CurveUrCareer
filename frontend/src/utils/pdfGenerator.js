// PDF Report Generation using jsPDF
const loadJsPDF = async () => {
  const module = await import('jspdf');
  return module.default || module;
};

/**
 * Generate comprehensive career guidance PDF report
 */
export const generatePDFReport = (jsPDF, resultsOrFormData, recommendations, analysis) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);

  // Gracefully adapt to single results object OR multi-parameter format
  let profile = {};
  let behavior = {};
  let topStrengths = [];
  let recommendedPathways = [];
  let skillGaps = [];
  let personalizedSummary = '';
  let explorationType = 'Active Explorer';
  
  if (resultsOrFormData && resultsOrFormData.profile) {
    // Single results object format
    const results = resultsOrFormData;
    profile = results.profile || {};
    behavior = results.behavior || {};
    topStrengths = results.top_strengths || [];
    recommendedPathways = results.recommended_pathways || [];
    skillGaps = results.skill_gaps || [];
    personalizedSummary = results.personalized_summary || '';
    explorationType = results.explorationType || 'Active Explorer';
  } else {
    // Legacy / fallback format
    const formData = resultsOrFormData || {};
    profile = formData.academic || {};
    behavior = formData.assessmentResults?.skillProfile || {};
    topStrengths = Object.entries(behavior).sort(([, a], [, b]) => b - a).slice(0, 5).map(([k]) => k) || [];
    recommendedPathways = recommendations || [];
    skillGaps = formData.assessmentResults?.careerMatches || [];
    personalizedSummary = formData.assessmentResults?.personalizedSummary || '';
    explorationType = formData.assessmentResults?.explorationType || 'Active Explorer';
  }

  const stream = profile.academic_stream || 'General';
  const subjects = profile.favorite_subjects || [];
  const marks = profile.marks_range || 'N/A';
  const confidence = profile.academic_confidence || 3;
  const username = profile.name || profile.username || 'Cadet';

  // Skill definitions for the Analyzer
  const careerSkillsConfig = {
    'AI & Intelligent Systems': {
      required: ['Logical Reasoning', 'Analytical Thinking', 'Mathematics', 'Computer Science'],
      actionItem: 'Improve data classification algorithms and practice coding foundational statistics.'
    },
    'Software Engineering': {
      required: ['Logical Reasoning', 'Creative Problem Solving', 'Mathematics', 'Computer Science'],
      actionItem: 'Build three responsive full-stack applications and study data structures.'
    },
    'Product Innovation': {
      required: ['Active Curiosity Explorer', 'Creative Problem Solving', 'English', 'Business Studies'],
      actionItem: 'Take a user behavior mapping crash course and analyze everyday digital products.'
    },
    'Cybersecurity': {
      required: ['Logical Reasoning', 'Analytical Thinking', 'Computer Science', 'Physics'],
      actionItem: 'Practice setting up virtual network labs and study basic routing protocols.'
    },
    'UI/UX + Technology': {
      required: ['Active Curiosity Explorer', 'Creative Problem Solving', 'Computer Science', 'English'],
      actionItem: 'Design responsive wireframes for two complex dashboards and study modern color grids.'
    },
    'Data Analytics': {
      required: ['Analytical Thinking', 'Logical Reasoning', 'Mathematics', 'Economics'],
      actionItem: 'Participate in a public database visualization challenge using Python or spreadsheets.'
    }
  };

  // Dynamic College Recommendations based on Stream
  const getColleges = () => {
    if (stream === 'Computer Science' || stream === 'Science') {
      return {
        dream: [
          { name: 'Indian Institute of Technology (IIT) Madras', location: 'Chennai', desc: 'Renowned for computer science and technological research.' },
          { name: 'BITS Pilani', location: 'Rajasthan', desc: 'Premier private institute offering exceptional technical education.' }
        ],
        realistic: [
          { name: 'VIT University', location: 'Vellore', desc: 'High placement rates, exceptional labs, robust industry curriculum.' },
          { name: 'College of Engineering, Guindy (CEG)', location: 'Chennai', desc: 'One of the oldest technical colleges with highly selective admission.' }
        ],
        safe: [
          { name: 'SRM Institute of Science and Technology', location: 'Chennai', desc: 'Vast infrastructure and flexible research pathways.' },
          { name: 'Amrita Vishwa Vidyapeetham', location: 'Coimbatore', desc: 'Focuses strongly on technical fundamentals and values.' }
        ]
      };
    } else if (stream === 'Commerce' || stream === 'Arts') {
      return {
        dream: [
          { name: 'Shri Ram College of Commerce (SRCC)', location: 'Delhi', desc: 'Premier institution for business studies, economics, and finance.' },
          { name: 'Loyola College', location: 'Chennai', desc: 'Vibrant, highly selective Arts & Commerce institution.' }
        ],
        realistic: [
          { name: 'Christ University', location: 'Bengaluru', desc: 'Highly practical business management and professional arts tracks.' },
          { name: 'Symbiosis College of Arts and Commerce', location: 'Pune', desc: 'Fosters versatile industry-integrated business applications.' }
        ],
        safe: [
          { name: 'Madras Christian College (MCC)', location: 'Chennai', desc: 'Stellar academic reputation with a serene green campus.' },
          { name: 'SRM School of Management', location: 'Chennai', desc: 'Favorable infrastructure and broad corporate connections.' }
        ]
      };
    } else {
      return {
        dream: [
          { name: 'National Institute of Design (NID)', location: 'Ahmedabad', desc: 'India\'s top-tier design school for strategic and industrial design.' },
          { name: 'Christ University', location: 'Bengaluru', desc: 'Comprehensive studies in vocational, creative, and general sciences.' }
        ],
        realistic: [
          { name: 'Symbiosis Institute of Design', location: 'Pune', desc: 'Extensive specialization options in visual communications and design.' },
          { name: 'Pearl Academy', location: 'Mumbai', desc: 'Highly hands-on creative incubator with global industrial exposure.' }
        ],
        safe: [
          { name: 'MIT Art, Design and Technology University', location: 'Pune', desc: 'Modern labs and versatile multi-disciplinary curriculum.' },
          { name: 'SRM Institute of Science & Technology', location: 'Chennai', desc: 'Broad spectrum of design and humanities options.' }
        ]
      };
    }
  };

  const colleges = getColleges();

  // Helper for drawing repeating page headers
  const drawPageHeader = (doc, title, subtitle) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(title, 20, 20);
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(subtitle, 20, 25);
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.5);
    doc.line(20, 28, 190, 28);
  };

  // =========================================================================
  // PAGE 1: CINEMATIC COVER PAGE
  // =========================================================================
  // Fill background with a dark solid navy color
  doc.setFillColor(10, 15, 30); // slate-950/navy equivalent
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Glowing title top line in electric blue
  doc.setDrawColor(2, 132, 199); // blue-600
  doc.setLineWidth(1.5);
  doc.line(20, 30, 190, 30);

  // Subtitle
  doc.setTextColor(2, 132, 199);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text("CURVEURCAREER // NEURAL DIAGNOSTICS & PATHWAY DISCOVERY", 20, 25);

  // Big titles
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text("NEURAL CAREER", 20, 75);
  
  doc.setTextColor(249, 115, 22); // orange-500
  doc.text("DIAGNOSTICS REPORT", 20, 88);

  // Thin separator line
  doc.setDrawColor(30, 41, 59); // slate-800
  doc.setLineWidth(0.5);
  doc.line(20, 100, 190, 100);

  // Student Identity Box
  doc.setFillColor(15, 23, 42); // slate-900
  doc.setDrawColor(30, 58, 138); // blue-900 border
  doc.rect(20, 115, 170, 55, 'FD');

  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFontSize(8);
  doc.text("CODENAME / STUDENT IDENTITY:", 25, 125);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.text(username.toUpperCase(), 25, 132);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.text("ACADEMIC STREAM PROFILE:", 25, 144);
  doc.setTextColor(59, 130, 246); // blue-500
  doc.setFontSize(11);
  doc.text(stream.toUpperCase(), 25, 150);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.text("NEURAL EXPLORATION ARCHETYPE:", 25, 162);
  doc.setTextColor(249, 115, 22); // orange-500
  doc.setFontSize(11);
  doc.text(explorationType.toUpperCase(), 25, 168);

  // Archetype Snapshot Box
  doc.setFillColor(30, 41, 59); // slate-700
  doc.setDrawColor(71, 85, 105);
  doc.rect(20, 182, 170, 52, 'FD');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.text("SYNTHESIZED ARCHETYPE SNAPSHOT", 25, 192);

  // Orange accent line under title
  doc.setDrawColor(249, 115, 22);
  doc.setLineWidth(1);
  doc.line(25, 195, 95, 195);

  doc.setTextColor(203, 213, 225); // slate-300
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const personalizedSummaryText = personalizedSummary || 'Dynamic cognitive mapping complete. This profile showcases balanced operational capability and curiosity-driven exploration metrics across major test phases.';
  const summaryLines = doc.splitTextToSize(personalizedSummaryText, 160);
  doc.text(summaryLines, 25, 204);

  // Bottom watermark
  doc.setTextColor(71, 85, 105); // slate-600
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text("SECURE NEURAL DIAGNOSTICS INDEX // AUTHENTICATED SYSTEM ACCESS", 20, 275);


  // =========================================================================
  // PAGE 2: COGNITIVE DIAGNOSTIC MATRIX
  // =========================================================================
  doc.addPage();
  drawPageHeader(doc, "COGNITIVE DIAGNOSTIC MATRIX", "PAGE 02 // PERFORMANCE & BEHAVIOR PROFILE");

  // Section 1 Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("1. ACADEMIC TRAJECTORY DETAILED ANALYSIS", 20, 38);

  // Academic Info Box
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.rect(20, 42, 170, 34, 'FD');

  // Left Column
  doc.setTextColor(100, 116, 139); // slate-500
  doc.setFontSize(8);
  doc.text("ACADEMIC STREAM PROFILE", 25, 50);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.text(stream, 25, 55);

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.text("AVERAGE MARKS RANGE", 25, 64);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.text(marks, 25, 69);

  // Right Column
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.text("ACADEMIC CONFIDENCE LEVEL", 100, 50);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.text(String(confidence) + " / 5 Index Rating", 100, 55);

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.text("FAVORITE DISCIPLINES", 100, 64);
  doc.setTextColor(59, 130, 246); // blue-500
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  const favSubText = subjects.join(', ') || 'General Science';
  const favSubLines = doc.splitTextToSize(favSubText, 80);
  doc.text(favSubLines, 100, 69);

  // Section 2 Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("2. BEHAVIORAL DIMENSION DIAGNOSTICS", 20, 88);

  // Radar metrics definitions
  const radarData = [
    { name: 'CURIOSITY', score: (behavior.curiosity_score || 3) * 20, desc: 'Measures intellectual drive, research affinity, and eagerness to experiment with new domains.' },
    { name: 'CONFIDENCE', score: (behavior.emotional_confidence_score || 3) * 20, desc: 'Measures decision-making stability, self-assurance, and emotional resilience under challenge.' },
    { name: 'ANALYTICAL', score: (behavior.analytical_score || 1) * 50, desc: 'Reflects systematic data decomposition, pattern checking, and attention to structural details.' },
    { name: 'CREATIVITY', score: (behavior.creativity_score || 1) * 50, desc: 'Measures imaginative ideation, visual styling interest, and original concept generation.' },
    { name: 'LOGICAL', score: (behavior.logical_reasoning_score || 1) * 50, desc: 'Gauges structural math-logic, algorithmic thinking, and rule-based problem-solving capability.' },
  ];

  let yOffset = 94;
  radarData.forEach(dim => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${dim.name} LEVEL`, 20, yOffset);

    // Draw standard score bar
    doc.setFillColor(241, 245, 249); // slate-100
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.rect(20, yOffset + 3, 130, 5, 'FD');

    // Filled bar
    doc.setFillColor(59, 130, 246); // blue-500
    doc.rect(20, yOffset + 3, 130 * (dim.score / 100), 5, 'F');

    // Score Text
    doc.setTextColor(59, 130, 246);
    doc.setFontSize(9);
    doc.text(`${dim.score}%`, 155, yOffset + 7);

    // Description
    doc.setTextColor(100, 116, 139); // slate-500
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(dim.desc, 20, yOffset + 12);

    yOffset += 32;
  });


  // =========================================================================
  // PAGE 3: PATHWAYS & ROADMAPS
  // =========================================================================
  doc.addPage();
  drawPageHeader(doc, "PERSONALIZED PATHWAYS & HORIZON ROADMAP", "PAGE 03 // FUTURISTIC STREAMS & ACTION PLAN");

  // Section 1 Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("1. TOP RECOMMENDED CAREER PATHWAYS", 20, 38);

  const topRecs = recommendedPathways.slice(0, 3);
  let pathwayY = 43;

  topRecs.forEach(rec => {
    // Card box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.rect(20, pathwayY, 170, 26, 'FD');

    // Details Left
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(rec.name, 25, pathwayY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(doc.splitTextToSize(rec.description, 115), 25, pathwayY + 11);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(59, 130, 246);
    doc.text("Fit Reasoning: " + doc.splitTextToSize(rec.matchReason, 115), 25, pathwayY + 20);

    // Compatibility Badge Right
    doc.setFillColor(240, 253, 250); // teal-50
    doc.setDrawColor(16, 185, 129); // emerald-500 border
    doc.rect(148, pathwayY + 3, 36, 20, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(16, 185, 129);
    doc.text(`${rec.matchScore}%`, 166, pathwayY + 11, { align: 'center' });

    doc.setFontSize(7);
    doc.text("MATCH RATING", 166, pathwayY + 17, { align: 'center' });

    pathwayY += 30;
  });

  // Section 2 Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("2. 5-STAGE HORIZON ROADMAP TIMELINE", 20, 138);

  // Timeline connectors
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(1);
  doc.line(26, 150, 26, 265);

  const stages = [
    {
      step: 'STAGE 01',
      title: 'ACADEMIC FOUNDATION',
      desc: `Strengthen core subjects selected during onboarding: ${subjects.join(', ') || 'Core Disciplines'}. Stabilize marks levels.`
    },
    {
      step: 'STAGE 02',
      title: 'SPECIALIZATION SKILL BUILDING',
      desc: 'Engage in micro-modules to neutralize identified skill gaps. Earn initial fundamental certifications.'
    },
    {
      step: 'STAGE 03',
      title: 'PRACTICAL REAL PROJECTS',
      desc: 'Build three real-world capstone projects based on your stream and interests. Establish portfolio repository.'
    },
    {
      step: 'STAGE 04',
      title: 'COMPETITIVE INTERNSHIPS',
      desc: 'Participate in corporate hackathons, industry networking meets, and secure early career exploration positions.'
    },
    {
      step: 'STAGE 05',
      title: 'CAREER PEAK READINESS',
      desc: 'Prepare for placement, finalize resume vectors, optimize portfolios, and transition to technical placements.'
    }
  ];

  let roadmapY = 146;
  stages.forEach(stage => {
    // Draw Timeline Dot
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(59, 130, 246);
    doc.circle(26, roadmapY + 3, 3.5, 'FD');

    doc.setFillColor(59, 130, 246);
    doc.circle(26, roadmapY + 3, 1.8, 'F');

    // Content Block
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(59, 130, 246);
    doc.text(`${stage.step} // ${stage.title}`, 34, roadmapY + 3);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(doc.splitTextToSize(stage.desc, 150), 34, roadmapY + 7);

    roadmapY += 24;
  });


  // =========================================================================
  // PAGE 4: GAPS & COLLEGES
  // =========================================================================
  doc.addPage();
  drawPageHeader(doc, "GAP ANALYSIS & ACADEMIC ALIGNMENT", "PAGE 04 // DEVELOPMENT MATRIX & TARGET INSTITUTIONS");

  // Section 1 Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("1. PRIMARY PATHWAY SKILL GAP ANALYSIS", 20, 38);

  const topPathway = recommendedPathways[0] || { name: 'AI & Intelligent Systems' };

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Analyzing capabilities for the primary career direction: ${topPathway.name}`, 20, 43);

  const activeSkillDetails = careerSkillsConfig[topPathway.name] || { required: ['Logical Reasoning', 'Analytical Thinking', 'Mathematics', 'Computer Science'], actionItem: 'Engage in baseline coding practices and research core subjects.' };
  
  // Calculate strengths & gaps
  const matchedSkillsForPathway = activeSkillDetails.required.filter(reqSkill => 
    topStrengths.some(strength => strength.toLowerCase().includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(strength.toLowerCase())) ||
    subjects.some(subject => subject.toLowerCase().includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(subject.toLowerCase()))
  );
  const missingSkillsForPathway = activeSkillDetails.required.filter(reqSkill => 
    !matchedSkillsForPathway.includes(reqSkill)
  );

  // Side-by-side gap grid boxes
  // Left Column (Strengths)
  doc.setFillColor(240, 253, 250); // teal-50
  doc.setDrawColor(204, 251, 241);
  doc.rect(20, 48, 82, 38, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(13, 148, 136); // teal-600
  doc.text("VALIDATED PATHWAY STRENGTHS", 24, 54);

  let strY = 61;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(20, 110, 100);
  matchedSkillsForPathway.slice(0, 4).forEach(skill => {
    doc.text(`[x] ${skill}`, 25, strY);
    strY += 6;
  });
  if (matchedSkillsForPathway.length === 0) {
    doc.text("No exact stream strengths mapped.", 25, strY);
  }

  // Right Column (Gaps)
  doc.setFillColor(255, 247, 237); // orange-50
  doc.setDrawColor(254, 215, 170);
  doc.rect(108, 48, 82, 38, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(234, 88, 12); // orange-600
  doc.text("SKILL DEVELOPMENT GAPS", 112, 54);

  let gapY = 61;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(194, 65, 12);
  missingSkillsForPathway.slice(0, 4).forEach(skill => {
    doc.text(`[!] ${skill} (Required)`, 113, gapY);
    gapY += 6;
  });
  if (missingSkillsForPathway.length === 0) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(13, 148, 136);
    doc.text("🏆 All requirements fully met!", 113, gapY);
  }

  // Action box below
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(20, 92, 170, 18, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(59, 130, 246);
  doc.text("RECOMMENDED IMMEDIATE DEVELOPMENT TARGET:", 24, 98);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(activeSkillDetails.actionItem, 24, 104);

  // Section 2 Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("2. DYNAMIC TIERED HIGHER EDUCATION TARGETS", 20, 122);

  // Render tiered colleges
  // Dream Tier 1 Box
  doc.setFillColor(240, 253, 250); // teal-50
  doc.setDrawColor(204, 251, 241);
  doc.rect(20, 127, 170, 39, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(13, 148, 136);
  doc.text("🎯 DREAM TIER 1 // PREMIER AMBITIONS & BENCHMARKS", 24, 134);

  let clgY = 141;
  colleges.dream.forEach(clg => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(`${clg.name} (${clg.location})`, 25, clgY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(clg.desc, 25, clgY + 4);
    clgY += 13;
  });

  // Realistic Tier 2 Box
  doc.setFillColor(239, 246, 255); // blue-50
  doc.setDrawColor(191, 219, 254);
  doc.rect(20, 172, 170, 39, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(29, 78, 216); // blue-700
  doc.text("✅ REALISTIC TIER 2 // BALANCED PLACEMENT PATHWAYS", 24, 179);

  clgY = 186;
  colleges.realistic.forEach(clg => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(`${clg.name} (${clg.location})`, 25, clgY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(clg.desc, 25, clgY + 4);
    clgY += 13;
  });

  // Safe Tier 3 Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(20, 217, 170, 39, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text("🛡️ SAFE TIER 3 // STABLE PREPARATORY ALIGNMENT", 24, 224);

  clgY = 231;
  colleges.safe.forEach(clg => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(`${clg.name} (${clg.location})`, 25, clgY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(clg.desc, 25, clgY + 4);
    clgY += 13;
  });


  // =========================================================================
  // GLOBAL FOOTER AND PAGE NUMBER INJECTION
  // =========================================================================
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    if (i === 1) {
      doc.setTextColor(71, 85, 105);
      doc.text(
        `Generated via CurveUrCareer Core Diagnostics | Secure Neural Analytics | Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    } else {
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text(
        `Generated via CurveUrCareer Core Diagnostics | Authorized Client Report | Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }
  }

  return doc;
};

/**
 * Download PDF report
 */
export const downloadPDFReport = async (formData, recommendations, analysis) => {
  const jsPDF = await loadJsPDF();
  const doc = generatePDFReport(jsPDF, formData, recommendations, analysis);
  const fileName = `Career_Guidance_Report_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

/**
 * Preview PDF in new tab
 */
export const previewPDFReport = async (formData, recommendations, analysis) => {
  const jsPDF = await loadJsPDF();
  const doc = generatePDFReport(jsPDF, formData, recommendations, analysis);
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
};

export default {
  generatePDFReport,
  downloadPDFReport,
  previewPDFReport
};
