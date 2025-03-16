import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, MessageSquare, Megaphone, BarChart, Bot } from 'lucide-react';

const services = [
  {
    icon: <Bot className="h-8 w-8" />,
    title: "AI Branding Assistant",
    description: "Get instant branding suggestions powered by advanced AI algorithms.",
    features: ["Logo Design", "Color Palette", "Brand Voice", "Visual Identity"]
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Brand Design",
    description: "Professional brand design services with AI-enhanced creativity.",
    features: ["Custom Logos", "Brand Guidelines", "Visual Assets", "Brand Strategy"]
  },
  {
    icon: <Megaphone className="h-8 w-8" />,
    title: "Social Media Management",
    description: "AI-powered social media content and campaign management.",
    features: ["Content Creation", "Scheduling", "Analytics", "Engagement"]
  },
  {
    icon: <BarChart className="h-8 w-8" />,
    title: "Marketing Analytics",
    description: "Data-driven insights to optimize your marketing strategy.",
    features: ["Performance Tracking", "ROI Analysis", "Competitor Analysis", "Trend Reports"]
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Content Strategy",
    description: "Strategic content planning with AI-powered insights.",
    features: ["Content Calendar", "SEO Optimization", "Topic Research", "Performance Analysis"]
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: "Digital Integration",
    description: "Seamless integration of your brand across digital platforms.",
    features: ["Website Design", "Social Media", "Email Marketing", "Digital Ads"]
  }
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive AI-powered branding and marketing solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary rounded-2xl p-6 hover:bg-secondary/80 transition-colors"
            >
              <div className="text-blue-400 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;