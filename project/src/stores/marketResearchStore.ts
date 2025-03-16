import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { MarketResearch, CompetitorAnalysis, SEOReport } from '../lib/types';

interface MarketResearchState {
  keywords: MarketResearch[];
  competitors: CompetitorAnalysis[];
  seoReports: SEOReport[];
  loading: boolean;
  error: string | null;
  
  // Market Research
  fetchKeywords: () => Promise<void>;
  addKeyword: (keyword: string) => Promise<void>;
  removeKeyword: (id: string) => Promise<void>;
  
  // Competitor Analysis
  fetchCompetitors: () => Promise<void>;
  addCompetitor: (data: Partial<CompetitorAnalysis>) => Promise<void>;
  updateCompetitor: (id: string, data: Partial<CompetitorAnalysis>) => Promise<void>;
  removeCompetitor: (id: string) => Promise<void>;
  
  // SEO Reports
  fetchSEOReports: () => Promise<void>;
  generateSEOReport: (url: string) => Promise<void>;
  deleteSEOReport: (id: string) => Promise<void>;
}

export const useMarketResearchStore = create<MarketResearchState>((set, get) => ({
  keywords: [],
  competitors: [],
  seoReports: [],
  loading: false,
  error: null,

  // Market Research
  fetchKeywords: async () => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('market_research')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ keywords: data || [] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addKeyword: async (keyword: string) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Simulate getting trend data
      const trendScore = Math.floor(Math.random() * 100);
      const searchVolume = Math.floor(Math.random() * 10000);

      const { data, error } = await supabase
        .from('market_research')
        .insert([{
          user_id: user.id,
          keyword,
          trend_score: trendScore,
          search_volume: searchVolume
        }])
        .select()
        .single();

      if (error) throw error;
      set(state => ({ keywords: [data, ...state.keywords] }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  removeKeyword: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('market_research')
        .delete()
        .eq('id', id);

      if (error) throw error;
      set(state => ({
        keywords: state.keywords.filter(k => k.id !== id)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Competitor Analysis
  fetchCompetitors: async () => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('competitor_analysis')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ competitors: data || [] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addCompetitor: async (data: Partial<CompetitorAnalysis>) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: competitor, error } = await supabase
        .from('competitor_analysis')
        .insert([{ ...data, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      set(state => ({ competitors: [competitor, ...state.competitors] }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateCompetitor: async (id: string, data: Partial<CompetitorAnalysis>) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('competitor_analysis')
        .update(data)
        .eq('id', id);

      if (error) throw error;
      set(state => ({
        competitors: state.competitors.map(c =>
          c.id === id ? { ...c, ...data } : c
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  removeCompetitor: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('competitor_analysis')
        .delete()
        .eq('id', id);

      if (error) throw error;
      set(state => ({
        competitors: state.competitors.filter(c => c.id !== id)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // SEO Reports
  fetchSEOReports: async () => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('seo_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ seoReports: data || [] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  generateSEOReport: async (url: string) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Simulate SEO analysis
      const mockRecommendations = [
        {
          category: 'Meta Tags',
          title: 'Optimize Meta Description',
          description: 'Your meta description should be between 150-160 characters.',
          priority: 'high' as const
        },
        {
          category: 'Content',
          title: 'Increase Content Length',
          description: 'Add more relevant content to improve rankings.',
          priority: 'medium' as const
        }
      ];

      const { data, error } = await supabase
        .from('seo_reports')
        .insert([{
          user_id: user.id,
          url,
          score: Math.floor(Math.random() * 100),
          recommendations: mockRecommendations
        }])
        .select()
        .single();

      if (error) throw error;
      set(state => ({ seoReports: [data, ...state.seoReports] }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteSEOReport: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('seo_reports')
        .delete()
        .eq('id', id);

      if (error) throw error;
      set(state => ({
        seoReports: state.seoReports.filter(r => r.id !== id)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  }
}));