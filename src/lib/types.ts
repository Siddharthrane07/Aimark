export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: string;
  thumbnail: string | null;
  deadline: string | null;
  progress: number;
  analytics_enabled: boolean;
  team_size: number;
  last_activity: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectMember {
  id: string;
  project_id: string;
  user_id: string;
  role: string;
  created_at: string;
  profile?: Profile;
}

export interface ProjectAsset {
  id: string;
  project_id: string;
  name: string;
  type: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectAnalytics {
  id: string;
  project_id: string;
  metric_name: string;
  metric_value: any;
  timestamp: string;
  created_at: string;
}

export interface ProjectTimeline {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  status: string;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface TeamCollaboration {
  id: string;
  project_id: string;
  user_id: string;
  action_type: string;
  action_details: any;
  created_at: string;
}

export interface MarketResearch {
  id: string;
  user_id: string;
  keyword: string;
  search_volume: number;
  trend_score: number;
  created_at: string;
  updated_at: string;
}

export interface CompetitorAnalysis {
  id: string;
  user_id: string;
  competitor_name: string;
  website: string | null;
  social_presence: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  strengths: string[];
  weaknesses: string[];
  engagement_metrics: {
    followers?: number;
    engagement_rate?: number;
    post_frequency?: number;
  };
  created_at: string;
  updated_at: string;
}

export interface SEOReport {
  id: string;
  user_id: string;
  url: string;
  score: number;
  recommendations: {
    category: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  created_at: string;
  updated_at: string;
}