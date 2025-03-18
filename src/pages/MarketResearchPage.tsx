import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  TrendingUp,
  Users,
  Globe,
  Loader2,
  Plus,
  Trash2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { useMarketResearchStore } from '../stores/marketResearchStore';
import { useAuthStore } from '../stores/authStore';
import type { CompetitorAnalysis, SEOReport } from '../lib/types';

const MarketResearchPage = () => {
  const {
    keywords,
    competitors,
    seoReports,
    loading,
    error,
    fetchKeywords,
    fetchCompetitors,
    fetchSEOReports,
    addKeyword,
    addCompetitor,
    generateSEOReport
  } = useMarketResearchStore();

  const user = useAuthStore(state => state.user);

  const [newKeyword, setNewKeyword] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCompetitor, setNewCompetitor] = useState({
    competitor_name: '',
    website: '',
    social_presence: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    }
  });

  useEffect(() => {
    if (user) {
      fetchKeywords();
      fetchCompetitors();
      fetchSEOReports();
    }
  }, [user, fetchKeywords, fetchCompetitors, fetchSEOReports]);

  const handleAddKeyword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim() || !user) return;
    await addKeyword(newKeyword);
    setNewKeyword('');
  };

  const handleAddCompetitor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompetitor.competitor_name || !user) return;
    
    try {
      await addCompetitor({
        ...newCompetitor,
        user_id: user.id // Add the user_id here
      });
      setNewCompetitor({
        competitor_name: '',
        website: '',
        social_presence: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: ''
        }
      });
    } catch (error) {
      console.error('Error adding competitor:', error);
    }
  };

  const handleGenerateSEOReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !user) return;
    await generateSEOReport(newUrl);
    setNewUrl('');
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-secondary/80 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Please Sign In</h2>
            <p className="text-muted-foreground">
              You need to be signed in to access market research features.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading && !keywords.length && !competitors.length && !seoReports.length) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Market Research & Analysis</h1>
          <p className="text-muted-foreground">
            Track keywords, analyze competitors, and optimize your SEO strategy
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 text-red-500 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Keyword Tracking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Keyword Tracking</h2>
            <form onSubmit={handleAddKeyword} className="mb-6">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Enter keyword to track"
                  className="flex-1 px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!newKeyword.trim() || loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  Track
                </button>
              </div>
            </form>
            <div className="space-y-4">
              {keywords.map((keyword) => (
                <div
                  key={keyword.id}
                  className="flex items-center justify-between p-4 bg-background rounded-lg"
                >
                  <div>
                    <p className="font-medium">{keyword.keyword}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Search className="h-4 w-4 mr-1" />
                        {keyword.search_volume} searches
                      </span>
                      <span className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {keyword.trend_score}% trending
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => useMarketResearchStore.getState().removeKeyword(keyword.id)}
                    className="p-2 text-red-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SEO Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-secondary rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-4">SEO Analysis</h2>
            <form onSubmit={handleGenerateSEOReport} className="mb-6">
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="Enter URL to analyze"
                  className="flex-1 px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!newUrl.trim() || loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  Analyze
                </button>
              </div>
            </form>
            <div className="space-y-4">
              {seoReports.map((report) => (
                <SEOReportCard key={report.id} report={report} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Competitor Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-secondary rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Competitor Analysis</h2>
          <form onSubmit={handleAddCompetitor} className="mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={newCompetitor.competitor_name}
                onChange={(e) => setNewCompetitor(prev => ({
                  ...prev,
                  competitor_name: e.target.value
                }))}
                placeholder="Competitor name"
                className="px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                value={newCompetitor.website}
                onChange={(e) => setNewCompetitor(prev => ({
                  ...prev,
                  website: e.target.value
                }))}
                placeholder="Website URL"
                className="px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="url"
                value={newCompetitor.social_presence.facebook}
                onChange={(e) => setNewCompetitor(prev => ({
                  ...prev,
                  social_presence: {
                    ...prev.social_presence,
                    facebook: e.target.value
                  }
                }))}
                placeholder="Facebook URL"
                className="px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                value={newCompetitor.social_presence.twitter}
                onChange={(e) => setNewCompetitor(prev => ({
                  ...prev,
                  social_presence: {
                    ...prev.social_presence,
                    twitter: e.target.value
                  }
                }))}
                placeholder="Twitter URL"
                className="px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                value={newCompetitor.social_presence.instagram}
                onChange={(e) => setNewCompetitor(prev => ({
                  ...prev,
                  social_presence: {
                    ...prev.social_presence,
                    instagram: e.target.value
                  }
                }))}
                placeholder="Instagram URL"
                className="px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                value={newCompetitor.social_presence.linkedin}
                onChange={(e) => setNewCompetitor(prev => ({
                  ...prev,
                  social_presence: {
                    ...prev.social_presence,
                    linkedin: e.target.value
                  }
                }))}
                placeholder="LinkedIn URL"
                className="px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={!newCompetitor.competitor_name || loading}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              Add Competitor
            </button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitors.map((competitor) => (
              <CompetitorCard key={competitor.id} competitor={competitor} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CompetitorCard = ({ competitor }: { competitor: CompetitorAnalysis }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-background rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{competitor.competitor_name}</h3>
          {competitor.website && (
            <a
              href={competitor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-500"
            >
              {new URL(competitor.website).hostname}
            </a>
          )}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 hover:bg-secondary rounded-lg transition-colors"
        >
          {expanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex space-x-2 mb-4">
        {competitor.social_presence.facebook && (
          <a
            href={competitor.social_presence.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-secondary rounded-lg text-blue-400 hover:text-blue-500 transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </a>
        )}
        {competitor.social_presence.twitter && (
          <a
            href={competitor.social_presence.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-secondary rounded-lg text-blue-400 hover:text-blue-500 transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </a>
        )}
        {competitor.social_presence.instagram && (
          <a
            href={competitor.social_presence.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-secondary rounded-lg text-blue-400 hover:text-blue-500 transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>
        )}
        {competitor.social_presence.linkedin && (
          <a
            href={competitor.social_presence.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-secondary rounded-lg text-blue-400 hover:text-blue-500 transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        )}
      </div>

      {expanded && competitor.engagement_metrics && (
        <div className="space-y-2 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Followers</span>
            <span className="font-medium">{competitor.engagement_metrics.followers?.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Engagement Rate</span>
            <span className="font-medium">{competitor.engagement_metrics.engagement_rate}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Posts/Week</span>
            <span className="font-medium">{competitor.engagement_metrics.post_frequency}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const SEOReportCard = ({ report }: { report: SEOReport }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-background rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{new URL(report.url).hostname}</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">SEO Score:</span>
            </div>
            <span className="text-sm font-medium">{report.score}/100</span>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 hover:bg-secondary rounded-lg transition-colors"
        >
          {expanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>

      {expanded && (
        <div className="space-y-4 pt-4 border-t border-border">
          {report.recommendations.map((rec, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{rec.title}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  rec.priority === 'high'
                    ? 'bg-red-500/10 text-red-500'
                    : rec.priority === 'medium'
                    ? 'bg-yellow-500/10 text-yellow-500'
                    : 'bg-green-500/10 text-green-500'
                }`}>
                  {rec.priority}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketResearchPage;