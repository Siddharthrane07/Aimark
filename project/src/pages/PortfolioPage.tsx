import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Users } from 'lucide-react';

const projects = [
  {
    title: "TechVision Rebrand",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    category: "Brand Identity",
    results: {
      growth: "+150% Brand Recognition",
      engagement: "+80% Social Engagement",
      conversion: "+45% Conversion Rate"
    }
  },
  {
    title: "EcoLife Marketing",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
    category: "Digital Marketing",
    results: {
      growth: "+200% Online Presence",
      engagement: "+120% Customer Engagement",
      conversion: "+65% Sales Growth"
    }
  },
  {
    title: "FoodieApp Launch",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80",
    category: "Product Launch",
    results: {
      growth: "+300% App Downloads",
      engagement: "+90% User Retention",
      conversion: "+75% Market Share"
    }
  }
];

const PortfolioPage = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-xl text-muted-foreground">
            Showcasing our successful brand transformations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary rounded-2xl overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.category}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm">{project.results.growth}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="text-sm">{project.results.engagement}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="text-sm">{project.results.conversion}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;