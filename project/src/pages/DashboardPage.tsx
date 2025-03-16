import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Users,
  MessageSquare,
  TrendingUp,
  Calendar,
  Settings,
  Bell,
  FolderKanban,
  User,
  Brain,
  FileText
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useProfileStore } from '../stores/profileStore';

const DashboardPage = () => {
  const user = useAuthStore(state => state.user);
  const profile = useProfileStore(state => state.profile);

  const stats = [
    { icon: <Users />, label: "Total Customers", value: "1,234" },
    { icon: <MessageSquare />, label: "AI Conversations", value: "856" },
    { icon: <Calendar />, label: "Active Projects", value: "12" },
    { icon: <TrendingUp />, label: "Growth Rate", value: "+27%" }
  ];

  const quickActions = [
    {
      icon: <FolderKanban className="h-8 w-8" />,
      title: "Projects",
      description: "Manage your brand projects",
      link: "/projects",
      color: "bg-blue-400/10 text-blue-400"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Assistant",
      description: "Get branding suggestions",
      link: "/ai-assistant",
      color: "bg-purple-400/10 text-purple-400"
    },
    {
      icon: <User className="h-8 w-8" />,
      title: "Profile",
      description: "Update your information",
      link: "/profile",
      color: "bg-green-400/10 text-green-400"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Documents",
      description: "View brand guidelines",
      link: "/documents",
      color: "bg-orange-400/10 text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-6">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {profile?.full_name || 'User'}</h1>
            <p className="text-muted-foreground">Manage your brand assets and projects</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary p-6 rounded-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-400/10 rounded-lg text-blue-400">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-secondary p-6 rounded-xl hover:bg-secondary/80 transition-colors"
                >
                  <div className={`p-3 ${action.color} rounded-lg w-fit mb-4`}>
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                  <p className="text-muted-foreground">{action.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                "Brand analysis completed for TechCorp",
                "New social media campaign scheduled",
                "AI generated 15 content suggestions",
                "Monthly analytics report ready"
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <p className="text-sm">{activity}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
            <div className="space-y-4">
              {[
                "Review brand guidelines",
                "Social media content approval",
                "Team strategy meeting",
                "Client presentation"
              ].map((task, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded border-muted-foreground"
                    />
                    <p className="text-sm">{task}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Tomorrow</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;