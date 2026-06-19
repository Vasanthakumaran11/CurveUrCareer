-- ==========================================
-- CURVEURCAREER: GAMIFIED SELF-DISCOVERY SCHEMA
-- Run this in your Supabase SQL Editor to initialize/update public tables.
-- ==========================================

-- 1. Create or extend the public.profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure all progressive columns exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS education_stage TEXT,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS career_mindset TEXT,
ADD COLUMN IF NOT EXISTS learning_behavior TEXT,
ADD COLUMN IF NOT EXISTS exploration_type TEXT,
ADD COLUMN IF NOT EXISTS confidence_level TEXT,
ADD COLUMN IF NOT EXISTS academic_stream TEXT,
ADD COLUMN IF NOT EXISTS favorite_subjects TEXT[],
ADD COLUMN IF NOT EXISTS marks_range TEXT,
ADD COLUMN IF NOT EXISTS academic_confidence INTEGER,
ADD COLUMN IF NOT EXISTS lifestyle_preferences JSONB,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Create User Interests Table (stores captured interest weights)
CREATE TABLE IF NOT EXISTS public.user_interests (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  interest TEXT NOT NULL,
  interaction_strength NUMERIC DEFAULT 1.0, -- capture engagement strength
  confidence_score NUMERIC DEFAULT 0.5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, interest)
);

-- 3. Create Behavioral Profile Table (silent, weighted beginner skills score matrix)
CREATE TABLE IF NOT EXISTS public.behavior_profile (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  analytical_score INTEGER DEFAULT 0,
  creativity_score INTEGER DEFAULT 0,
  exploration_level INTEGER DEFAULT 0,
  communication_tendency INTEGER DEFAULT 0,
  curiosity_score INTEGER DEFAULT 0,
  logical_reasoning_score INTEGER DEFAULT 0,
  retry_behavior_score INTEGER DEFAULT 0,
  emotional_confidence_score INTEGER DEFAULT 0,
  learning_style_pattern TEXT, -- e.g., 'Analytic Observer', 'Adaptive Experimenter'
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Interaction Logs (captures click response latency, retries & analytics)
CREATE TABLE IF NOT EXISTS public.interaction_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL, -- e.g., 'interest_choice', 'logic_puzzle_attempt'
  response_time INTEGER, -- capture millisecond latency 
  choice_pattern JSONB, -- store specific choices
  engagement_score NUMERIC DEFAULT 0.0,
  hover_sequences JSONB, -- Timeline records of option cursor hovers
  scroll_depth INTEGER, -- Tracks reader pacing & vertical traversal
  text_selection_count INT, -- Occurrences of text highlighting (Analytical Trait)
  middle_click_backtrack BOOLEAN, -- Flags page escape signals or forced updates
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Telemetry Blueprint V2 SQL Migrations (run if database already exists):
-- ALTER TABLE public.interaction_logs ADD COLUMN IF NOT EXISTS hover_sequences JSONB;
-- ALTER TABLE public.interaction_logs ADD COLUMN IF NOT EXISTS scroll_depth INTEGER;
-- ALTER TABLE public.interaction_logs ADD COLUMN IF NOT EXISTS text_selection_count INT;
-- ALTER TABLE public.interaction_logs ADD COLUMN IF NOT EXISTS middle_click_backtrack BOOLEAN;

-- 5. Create Discover Yourself Results Table (captures completed analysis summaries)
CREATE TABLE IF NOT EXISTS public.discover_yourself_results (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  top_strengths TEXT[],
  detected_patterns TEXT[],
  recommended_pathways TEXT[],
  skill_gaps TEXT[], -- identified beginner skill gaps for improvements
  personalized_summary TEXT,
  dashboard_data JSONB,
  completion_timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.behavior_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interaction_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discover_yourself_results ENABLE ROW LEVEL SECURITY;

-- Setup RLS Policies (Users can only touch/modify their own documents)
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id OR auth.uid() IS NULL);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can access own interests" ON public.user_interests 
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can access own behavior" ON public.behavior_profile 
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can access own logs" ON public.interaction_logs 
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can access own results" ON public.discover_yourself_results 
  FOR ALL USING (auth.uid() = user_id);

-- =========================================================================
-- OPTIONAL: IF YOU ENCOUNTER ROW LEVEL SECURITY (RLS) ERRORS LOCALLY:
-- You can run the following statements in your Supabase SQL editor to fully
-- disable RLS on these tables. This will resolve all permission errors.
--
-- ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.user_interests DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.behavior_profile DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.interaction_logs DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.discover_yourself_results DISABLE ROW LEVEL SECURITY;
-- =========================================================================

