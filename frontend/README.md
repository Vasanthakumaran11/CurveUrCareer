# CurveUrCareer // Career Intelligence Engine

A production-ready, highly interactive "Discover Yourself" assessment experience and multidimensional Career Intelligence Dashboard built for CurveUrCareer. The platform guides students from educational analysis and behavioral cognitive calibration to concrete learning paths and tiered college highlights.

---

## 🌟 Core Architecture

The platform consists of two main sections: an immersive **3-Stage Assessment Journey** and a **Career Intelligence Dashboard** powered by a Express backend + Supabase database system (with seamless in-memory cache fallbacks).

### 1. 3-Stage Assessment Journey
Takes approximately 8–10 minutes and replaces static forms with interactive visual components:
- **Academic Intelligence**: Calibrates Explorer Codename, Educational level (`10th Completed`, `11th`, `12th`, `College 1st Year`, `College 2nd Year`), selected streams, favorite subjects through card chips, average marks (exact percentages or ranges), and academic confidence level.
- **Skill Discovery Game**: 12 highly engaging interactive mini-game moments (pattern-recognition sequence puzzles, resource allocations, priority evaluations, team conflict coordinates, observation challenges, etc.) evaluating 12 cognitive skills:
  - Logical Thinking & Problem Solving
  - Analytical & Critical Thinking
  - Creativity & Curiosity
  - Communication & Leadership
  - Observation & Adaptability
  - Decision Making & Learning Behavior
  - *Silently tracks interaction click telemetry, retry attempts, and latency (hesitation time) to build a behavioral profile.*
- **Career Lifestyle Mapping**: Visual cards mapping preferred workspaces (`Corporate Office`, `Research Lab`, `Hospital`, `Startup`, `Government Office`, `Creative Studio`, `Remote Work`, `Field-Based Work`), higher studies intent, study locations (home state, abroad, etc.), and lifestyle priorities. Sliders define affinity to government jobs, private sector, entrepreneurship, research, freelancing, and emerging technology.

### 2. Career Intelligence Dashboard
A comprehensive 5-tab analytical dashboard that aggregates all profiling data:
- **Identity Snapshot**: Dominant behavioral archetype (e.g. *Strategic Systems Architect*, *Imaginative Product Innovator*), descriptions, and trait list.
- **Academic Insights**: Stream matching, subject affinity analysis, and academic confidence indicators.
- **Skill Analytics Spectrogram**: A Polar Radar Chart displaying logical, analytical, critical, creativity, communication, curiosity, and problem-solving quotients.
- **Career Directions & Reality Analysis**: Matching percentages, starting salary metrics, demand projections, stability index, competition profiles, backup directions, and future outlook summaries.
- **Skill Gap Analyzer**: Compares career required skills against the student's validated strengths. Suggests projects and certifications. Links gaps directly to CurveUrCareer's internal learning modules (`Python`, `C`, `Java`, `MySQL`, `Communication Skills`, `Problem Solving`).
- **Horizon Roadmap**: A structured 6-stage roadmap tracking growth across Foundations, Skill Development, Projects, Internships, Advanced Specializations, and Placement Readiness.
- **Higher Education & Tiered Colleges**: Suggested degrees and tiered colleges: Tier 1 (Dream), Tier 2 (Realistic), and Tier 3 (Safe).

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, React Router, Recharts (Radar charts), Framer Motion (Animations), Lucide React (Icons).
- **Backend API**: Node.js, Express, Supabase JS client.
- **Database**: PostgreSQL (Supabase) + local in-memory fallback cache.
- **Styling**: Tailwind CSS.

---

## 🗃️ Database Initialization

Initialize the PostgreSQL schema in your Supabase SQL editor:

```sql
-- Profiles extended parameters
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS academic_stream TEXT,
ADD COLUMN IF NOT EXISTS favorite_subjects TEXT[],
ADD COLUMN IF NOT EXISTS marks_range TEXT,
ADD COLUMN IF NOT EXISTS academic_confidence INTEGER,
ADD COLUMN IF NOT EXISTS lifestyle_preferences JSONB,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

-- Discover Yourself Results Table
CREATE TABLE IF NOT EXISTS public.discover_yourself_results (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  top_strengths TEXT[],
  detected_patterns TEXT[],
  recommended_pathways TEXT[],
  skill_gaps TEXT[],
  personalized_summary TEXT,
  dashboard_data JSONB,
  completion_timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🚀 Getting Started

### Installation

1. Navigate to the project directories:
   ```bash
   # Build the backend
   cd backend
   npm install
   
   # Build the frontend
   cd ../frontend
   npm install
   ```

2. Configure environments:
   - Backend `.env`:
     ```env
     PORT=5050
     SUPABASE_URL="https://your-project.supabase.co"
     SUPABASE_ANON_KEY="your-anon-key"
     ```
   - Frontend `.env.local` or `.env`:
     ```env
     VITE_API_URL="http://localhost:5050"
     ```

### Execution

Launch both servers:
```bash
# In backend directory
node index.js

# In frontend directory
npm run dev
```

The application will launch on `http://localhost:5173`. Complete the onboarding sequence to unlock your rich Career Intelligence matrix.

---

## 📑 File Structure

- **[`AssessmentPage.jsx`](file:///c:/Users/Raja/Desktop/CurveUrCareer/frontend/src/pages/AssessmentPage.jsx)**: Immersive 3-stage self-discovery journey with interactive card matrices and stepper coordinates.
- **[`ResultsDashboard.jsx`](file:///c:/Users/Raja/Desktop/CurveUrCareer/frontend/src/components/ResultsDashboard.jsx)**: 5-tab Career Intelligence dashboard rendering snapshot, radar charts, capstones, and course links.
- **[`discoverController.js`](file:///c:/Users/Raja/Desktop/CurveUrCareer/backend/controllers/discoverController.js)**: Profile synthesis and career pathway scoring algorithms.
- **[`db_schema.sql`](file:///c:/Users/Raja/Desktop/CurveUrCareer/backend/db_schema.sql)**: Database structures.
