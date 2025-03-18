// // Google Trends API service

// // API key from your parameter
// const API_KEY = "00e8998145f5081072482a1a2cdeb5dc0abac2f56042";

// // Interface for trending topic
// export interface TrendingTopic {
//   id: string;
//   title: string;
//   description: string;
//   value: number;
//   source: string;
//   timestamp: string;
//   keywords: string[];
//   category: string;
//   imageUrl?: string;
// }

// // Fetch trending topics based on a keyword search
// export const fetchTrendingTopics = async (keyword: string = ""): Promise<TrendingTopic[]> => {
//   try {
//     // We'll simulate API request since we don't have actual Google Trends API endpoint
//     // In real implementation, you would call a real endpoint like:
//     // const response = await fetch(`https://api.example.com/trends?keyword=${keyword}&api_key=${API_KEY}`);
    
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 800));
    
//     // Mock data to simulate API response
//     const mockData = generateMockTrendingData(keyword);
    
//     return mockData;
//   } catch (error) {
//     console.error("Error fetching trending topics:", error);
//     throw new Error("Failed to fetch trending topics");
//   }
// };

// // Function to get random categories
// const getRandomCategory = () => {
//   const categories = ["Technology", "Business", "Entertainment", "Health", "Science", "Marketing", "Social Media"];
//   return categories[Math.floor(Math.random() * categories.length)];
// };

// // Function to get mock trending data based on keyword
// const generateMockTrendingData = (keyword: string): TrendingTopic[] => {
//   // Base trends that always appear
//   const baseTrends = [
//     {
//       id: "1",
//       title: "AI Automation in Marketing",
//       description: "How AI is revolutionizing marketing automation and improving ROI for businesses worldwide.",
//       value: 92,
//       source: "Google Trends",
//       timestamp: new Date().toISOString(),
//       keywords: ["AI", "Marketing", "Automation"],
//       category: "Technology",
//       imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80"
//     },
//     {
//       id: "2",
//       title: "Social Media Algorithms Update",
//       description: "Recent changes to social media algorithms and how they impact brand visibility.",
//       value: 87,
//       source: "Google Trends",
//       timestamp: new Date().toISOString(),
//       keywords: ["Social Media", "Algorithm", "Digital Marketing"],
//       category: "Social Media",
//       imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80"
//     },
//     {
//       id: "3",
//       title: "Brand Evolution Strategies",
//       description: "Effective strategies for evolving your brand in the digital age without losing customer loyalty.",
//       value: 81,
//       source: "Google Trends",
//       timestamp: new Date().toISOString(),
//       keywords: ["Brand", "Evolution", "Strategy"],
//       category: "Business",
//       imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
//     }
//   ];
  
//   // If there's a keyword, add some keyword-specific trends
//   if (keyword && keyword.trim() !== "") {
//     const keywordTrends = Array(5).fill(null).map((_, index) => ({
//       id: `k${index + 1}`,
//       title: `${keyword} ${["Impact", "Innovation", "Strategy", "Forecast", "Analysis"][index % 5]} ${new Date().getFullYear()}`,
//       description: `Latest ${keyword} trends and insights for marketers and business leaders.`,
//       value: Math.floor(Math.random() * 30) + 70,
//       source: "Google Trends",
//       timestamp: new Date().toISOString(),
//       keywords: [keyword, "Trending", getRandomCategory()],
//       category: getRandomCategory(),
//       imageUrl: `https://source.unsplash.com/random/300x200?${keyword.replace(" ", ",")}`
//     }));
    
//     // Combine base trends with keyword-specific trends
//     return [...keywordTrends, ...baseTrends];
//   }
  
//   // If no keyword, add more generic trends
//   const additionalTrends = [
//     {
//       id: "4",
//       title: "Video Marketing Effectiveness",
//       description: "Studies show increasing ROI for businesses using video marketing in their campaigns.",
//       value: 78,
//       source: "Google Trends",
//       timestamp: new Date().toISOString(),
//       keywords: ["Video", "Marketing", "ROI"],
//       category: "Marketing",
//       imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
//     },
//     {
//       id: "5",
//       title: "Influencer Marketing Shift",
//       description: "How brands are shifting from mega-influencers to micro-influencers for better engagement.",
//       value: 75,
//       source: "Google Trends",
//       timestamp: new Date().toISOString(),
//       keywords: ["Influencer", "Marketing", "Engagement"],
//       category: "Social Media",
//       imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80"
//     },
//     {
//       id: "6",
//       title: "Sustainable Branding",
//       description: "Consumers increasingly value brands with sustainable practices and transparent messaging.",
//       value: 72,
//       source: "Google Trends",
//       timestamp: new Date().toISOString(),
//       keywords: ["Sustainable", "Branding", "Transparency"],
//       category: "Business",
//       imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80"
//     },
//     {
//       id: "7",
//       title: "Voice Search Optimization",
//       description: "How to optimize your brand content for voice search as it continues to grow.",
//       value: 68,
//       source: "Google Trends",
//       timestamp: new Date().toISOString(),
//       keywords: ["Voice Search", "SEO", "Optimization"],
//       category: "Technology",
//       imageUrl: "https://images.unsplash.com/photo-1512446387836-1e15eb257224?auto=format&fit=crop&q=80"
//     }
//   ];
  
//   return [...baseTrends, ...additionalTrends];
// };
