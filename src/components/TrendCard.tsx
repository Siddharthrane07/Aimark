// import React from "react";
// import { TrendingUp } from "lucide-react";
// import { TrendingTopic } from "../lib/googleTrends";
// import { cn } from "../lib/utils";

// interface TrendCardProps {
//   trend: TrendingTopic;
// }

// const TrendCard: React.FC<TrendCardProps> = ({ trend }) => {
//   return (
//     <div className="bg-secondary rounded-2xl overflow-hidden hover:bg-secondary/80 transition-all duration-300 hover:shadow-lg border border-border">
//       <div className="relative h-48 w-full overflow-hidden">
//         <img 
//           src={trend.imageUrl || "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80"} 
//           alt={trend.title}
//           className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//         />
//         <div className="absolute top-2 right-2">
//           <span className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-2.5 py-0.5 text-xs font-semibold">
//             <TrendingUp className="w-3 h-3 mr-1" />
//             {trend.value}%
//           </span>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
//           <span className="inline-flex items-center rounded-full bg-accent text-accent-foreground px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm border-none">
//             {trend.category}
//           </span>
//         </div>
//       </div>
      
//       <div className="flex flex-col space-y-1.5 p-6 pb-2">
//         <h3 className="text-xl font-bold line-clamp-2">{trend.title}</h3>
//         <p className="text-sm text-muted-foreground">
//           Source: {trend.source} • {new Date(trend.timestamp).toLocaleDateString()}
//         </p>
//       </div>
      
//       <div className="p-6 pt-0">
//         <p className="text-foreground line-clamp-3">{trend.description}</p>
//       </div>
      
//       <div className="flex items-center flex-wrap gap-2 p-6 pt-0">
//         {trend.keywords.map((keyword, index) => (
//           <span key={index} className="inline-flex items-center rounded-full bg-muted text-muted-foreground px-2.5 py-0.5 text-xs font-semibold hover:bg-muted/80">
//             {keyword}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrendCard;