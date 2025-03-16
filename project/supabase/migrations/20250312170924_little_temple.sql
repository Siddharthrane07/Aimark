/*
  # Market Research and Competitor Analysis Features

  1. New Tables
    - `market_research`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `keyword` (text)
      - `search_volume` (integer)
      - `trend_score` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `competitor_analysis`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `competitor_name` (text)
      - `website` (text)
      - `social_presence` (jsonb)
      - `strengths` (text[])
      - `weaknesses` (text[])
      - `engagement_metrics` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `seo_reports`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `url` (text)
      - `score` (integer)
      - `recommendations` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create market_research table
CREATE TABLE IF NOT EXISTS market_research (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  keyword text NOT NULL,
  search_volume integer,
  trend_score integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create competitor_analysis table
CREATE TABLE IF NOT EXISTS competitor_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  competitor_name text NOT NULL,
  website text,
  social_presence jsonb DEFAULT '{}',
  strengths text[] DEFAULT '{}',
  weaknesses text[] DEFAULT '{}',
  engagement_metrics jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create seo_reports table
CREATE TABLE IF NOT EXISTS seo_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  url text NOT NULL,
  score integer NOT NULL,
  recommendations jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE market_research ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_reports ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their market research"
  ON market_research
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their competitor analysis"
  ON competitor_analysis
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their SEO reports"
  ON seo_reports
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_market_research_updated_at
  BEFORE UPDATE ON market_research
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_competitor_analysis_updated_at
  BEFORE UPDATE ON competitor_analysis
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seo_reports_updated_at
  BEFORE UPDATE ON seo_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();