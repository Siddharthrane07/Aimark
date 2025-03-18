// import React, { useState, useEffect } from "react";
// import { TrendingUp, Search, RefreshCw } from "lucide-react";
// import { motion } from "framer-motion";
// import TrendCard from "../components/TrendCard";
// import { fetchTrendingTopics, TrendingTopic } from "../lib/googleTrends";

// const TrendsPage: React.FC = () => {
//   const [trends, setTrends] = useState<TrendingTopic[]>([]);
//   const [keyword, setKeyword] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     loadTrends();
//   }, []);

//   const loadTrends = async (query: string = "") => {
//     setIsLoading(true);
//     try {
//       const data = await fetchTrendingTopics(query);
//       setTrends(data);
//     } catch (error) {
//       console.error("Error loading trends:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSearchQuery(keyword);
//     loadTrends(keyword);
//   };

//   const handleRefresh = () => {
//     loadTrends(searchQuery);
//   };

//   return (
//     <div className="min-h-screen pt-20 pb-16 px-4">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
//         >
//           <div>
//             <h1 className="text-4xl md:text-5xl font-bold flex items-center mb-4">
//               <TrendingUp className="mr-2 text-blue-400" />
//               Trending Topics
//             </h1>
//             <p className="text-xl text-muted-foreground">
//               Discover the latest trending topics in marketing and branding
//             </p>
//           </div>
          
//           <form onSubmit={handleSearch} className="w-full md:w-auto flex gap-2">
//             <input
//               type="text"
//               placeholder="Search trends by keyword..."
//               value={keyword}
//               onChange={(e) => setKeyword(e.target.value)}
//               className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
//             />
//             <button 
//               type="submit" 
//               className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
//             >
//               <Search className="h-4 w-4 mr-2" />
//               Search
//             </button>
//             <button 
//               type="button" 
//               className="inline-flex items-center justify-center rounded-md border border-input bg-background h-10 px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//               onClick={handleRefresh}
//               disabled={isLoading}
//             >
//               <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
//             </button>
//           </form>
//         </motion.div>
        
//         <div className="h-[1px] w-full bg-border mb-8" />
        
//         {searchQuery && (
//           <div className="mb-6">
//             <p className="text-muted-foreground">
//               Showing results for: <span className="text-foreground font-medium">"{searchQuery}"</span>
//             </p>
//           </div>
//         )}
        
//         {isLoading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
//             {Array(6).fill(null).map((_, index) => (
//               <div key={index} className="bg-secondary rounded-2xl h-96"></div>
//             ))}
//           </div>
//         ) : (
//           <motion.div 
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             {trends.map((trend) => (
//               <motion.div
//                 key={trend.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: Number(trend.id) * 0.05 }}
//               >
//                 <TrendCard trend={trend} />
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
        
//         {trends.length === 0 && !isLoading && (
//           <div className="text-center py-16">
//             <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
//             <h3 className="text-xl font-semibold text-muted-foreground">No trending topics found</h3>
//             <p className="text-muted-foreground mt-2">Try a different search term or check back later</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrendsPage;