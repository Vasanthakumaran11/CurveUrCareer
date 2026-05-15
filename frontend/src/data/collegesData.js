// Comprehensive colleges data categorized by tiers
export const collegesData = [
  // Tier 1 - Top Institutions
  {
    id: 'iit-delhi',
    name: 'IIT Delhi',
    tier: 1,
    type: 'Government',
    location: 'Delhi',
    streams: ['Science'],
    courses: ['btech'],
    ranking: 1,
    cutoff: {
      percentile: 99.5,
      marks: 95
    },
    fees: '2-3 LPA',
    placements: {
      average: '18 LPA',
      highest: '1.8 Cr'
    },
    facilities: ['World-class labs', 'Research centers', 'International collaborations'],
    description: 'Premier engineering institution with excellent research and placement opportunities.'
  },
  {
    id: 'iit-bombay',
    name: 'IIT Bombay',
    tier: 1,
    type: 'Government',
    location: 'Mumbai',
    streams: ['Science'],
    courses: ['btech'],
    ranking: 2,
    cutoff: {
      percentile: 99.5,
      marks: 95
    },
    fees: '2-3 LPA',
    placements: {
      average: '20 LPA',
      highest: '2 Cr'
    },
    facilities: ['State-of-art infrastructure', 'Innovation labs', 'Startup incubator'],
    description: 'Top IIT with strong industry connections and entrepreneurship culture.'
  },
  {
    id: 'aiims-delhi',
    name: 'AIIMS Delhi',
    tier: 1,
    type: 'Government',
    location: 'Delhi',
    streams: ['Science'],
    courses: ['mbbs'],
    ranking: 1,
    cutoff: {
      percentile: 99.9,
      marks: 98
    },
    fees: 'Minimal',
    placements: {
      average: 'N/A - Medical',
      highest: 'N/A'
    },
    facilities: ['Super-specialty hospital', 'Research facilities', 'International exposure'],
    description: 'India\'s premier medical institution with world-class healthcare training.'
  },
  {
    id: 'bits-pilani',
    name: 'BITS Pilani',
    tier: 1,
    type: 'Private',
    location: 'Pilani, Rajasthan',
    streams: ['Science'],
    courses: ['btech', 'bpharm'],
    ranking: 3,
    cutoff: {
      percentile: 98,
      marks: 90
    },
    fees: '4-5 LPA',
    placements: {
      average: '15 LPA',
      highest: '1.2 Cr'
    },
    facilities: ['Modern campus', 'Industry partnerships', 'Global exchange programs'],
    description: 'Top private engineering college with strong academic reputation.'
  },
  {
    id: 'iisc-bangalore',
    name: 'IISc Bangalore',
    tier: 1,
    type: 'Government',
    location: 'Bangalore',
    streams: ['Science'],
    courses: ['bsc'],
    ranking: 1,
    cutoff: {
      percentile: 99,
      marks: 92
    },
    fees: '1-2 LPA',
    placements: {
      average: '12 LPA',
      highest: '50 LPA'
    },
    facilities: ['Research excellence', 'Nobel laureate faculty', 'Cutting-edge labs'],
    description: 'India\'s top research institution for pure sciences.'
  },

  // Tier 2 - Excellent Institutions
  {
    id: 'nit-trichy',
    name: 'NIT Trichy',
    tier: 2,
    type: 'Government',
    location: 'Tiruchirappalli',
    streams: ['Science'],
    courses: ['btech'],
    ranking: 8,
    cutoff: {
      percentile: 97,
      marks: 85
    },
    fees: '1-2 LPA',
    placements: {
      average: '12 LPA',
      highest: '40 LPA'
    },
    facilities: ['Good infrastructure', 'Industry tie-ups', 'Active clubs'],
    description: 'Top NIT with strong engineering programs and placements.'
  },
  {
    id: 'du-srcc',
    name: 'SRCC, Delhi University',
    tier: 2,
    type: 'Government',
    location: 'Delhi',
    streams: ['Commerce'],
    courses: ['bcom'],
    ranking: 1,
    cutoff: {
      percentile: 99,
      marks: 98
    },
    fees: 'Minimal',
    placements: {
      average: '8 LPA',
      highest: '25 LPA'
    },
    facilities: ['Excellent faculty', 'Corporate connections', 'Active societies'],
    description: 'India\'s top commerce college with excellent placement record.'
  },
  {
    id: 'nlsiu',
    name: 'NLSIU Bangalore',
    tier: 2,
    type: 'Government',
    location: 'Bangalore',
    streams: ['Arts'],
    courses: ['llb'],
    ranking: 1,
    cutoff: {
      percentile: 99,
      marks: 95
    },
    fees: '2-3 LPA',
    placements: {
      average: '15 LPA',
      highest: '50 LPA'
    },
    facilities: ['Moot court', 'Legal aid clinic', 'International collaborations'],
    description: 'Premier law school with excellent judicial and corporate placements.'
  },
  {
    id: 'christ-university',
    name: 'Christ University',
    tier: 2,
    type: 'Private',
    location: 'Bangalore',
    streams: ['Science', 'Commerce', 'Arts'],
    courses: ['bca', 'bba', 'bjmc'],
    ranking: 15,
    cutoff: {
      percentile: 85,
      marks: 75
    },
    fees: '2-3 LPA',
    placements: {
      average: '6 LPA',
      highest: '20 LPA'
    },
    facilities: ['Modern campus', 'Industry exposure', 'Cultural activities'],
    description: 'Well-rounded private university with diverse programs.'
  },
  {
    id: 'symbiosis',
    name: 'Symbiosis International',
    tier: 2,
    type: 'Private',
    location: 'Pune',
    streams: ['Commerce', 'Arts', 'Science'],
    courses: ['bba', 'bjmc', 'bca'],
    ranking: 20,
    cutoff: {
      percentile: 85,
      marks: 75
    },
    fees: '3-4 LPA',
    placements: {
      average: '7 LPA',
      highest: '18 LPA'
    },
    facilities: ['International campus', 'Exchange programs', 'Industry mentorship'],
    description: 'Reputed private university with strong industry connections.'
  },

  // Tier 3 - Good State/Private Colleges
  {
    id: 'state-engg',
    name: 'State Engineering Colleges',
    tier: 3,
    type: 'Government',
    location: 'Various',
    streams: ['Science'],
    courses: ['btech', 'bca'],
    ranking: 50,
    cutoff: {
      percentile: 75,
      marks: 65
    },
    fees: '50k-1 LPA',
    placements: {
      average: '4 LPA',
      highest: '12 LPA'
    },
    facilities: ['Basic infrastructure', 'Local placements', 'Affordable'],
    description: 'Affordable government colleges with decent placement opportunities.'
  },
  {
    id: 'private-engg',
    name: 'Private Engineering Colleges',
    tier: 3,
    type: 'Private',
    location: 'Various',
    streams: ['Science'],
    courses: ['btech', 'bca', 'bpharm'],
    ranking: 100,
    cutoff: {
      percentile: 60,
      marks: 55
    },
    fees: '2-4 LPA',
    placements: {
      average: '3.5 LPA',
      highest: '10 LPA'
    },
    facilities: ['Modern facilities', 'Industry visits', 'Placement cell'],
    description: 'Private colleges with varying quality and placement records.'
  },
  {
    id: 'state-university',
    name: 'State Universities',
    tier: 3,
    type: 'Government',
    location: 'Various',
    streams: ['Science', 'Commerce', 'Arts'],
    courses: ['bsc', 'bcom', 'ba'],
    ranking: 75,
    cutoff: {
      percentile: 70,
      marks: 60
    },
    fees: 'Minimal',
    placements: {
      average: '3 LPA',
      highest: '8 LPA'
    },
    facilities: ['Affordable', 'Local connections', 'Basic facilities'],
    description: 'State-run universities offering affordable education.'
  },
  {
    id: 'private-arts',
    name: 'Private Arts/Commerce Colleges',
    tier: 3,
    type: 'Private',
    location: 'Various',
    streams: ['Commerce', 'Arts'],
    courses: ['bcom', 'bba', 'ba'],
    ranking: 120,
    cutoff: {
      percentile: 60,
      marks: 55
    },
    fees: '1-3 LPA',
    placements: {
      average: '3 LPA',
      highest: '8 LPA'
    },
    facilities: ['Good infrastructure', 'Industry exposure', 'Internship support'],
    description: 'Private colleges with focus on holistic development.'
  },
  {
    id: 'open-university',
    name: 'Open Universities (IGNOU, etc.)',
    tier: 3,
    type: 'Government',
    location: 'Distance',
    streams: ['Science', 'Commerce', 'Arts'],
    courses: ['bsc', 'bcom', 'ba', 'bca'],
    ranking: 150,
    cutoff: {
      percentile: 50,
      marks: 50
    },
    fees: 'Very Low',
    placements: {
      average: 'Self-driven',
      highest: 'N/A'
    },
    facilities: ['Flexible learning', 'Affordable', 'Work-study balance'],
    description: 'Distance learning option for flexible education.'
  }
];

export default collegesData;
