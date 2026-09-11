import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Globe } from "lucide-react";

export const ProjectTile = ({ 
  title, 
  subtitle, 
  imgUrl, 
  delay,
  tags = [],
  githubUrl,
  siteUrl,
  secondaryUrl,
  secondaryLabel = "View GitHub"
}: { 
  key?: string | number;
  title: string; 
  subtitle: string; 
  imgUrl: string;
  delay: number;
  tags?: string[];
  githubUrl?: string;
  siteUrl?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative overflow-hidden rounded-[2rem] aspect-[16/10.5] bg-[#0c0c0e] border border-white/5 hover:border-white/15 cursor-pointer shadow-2xl transition-all duration-500 hover:shadow-primary/5"
    >
      {/* Background Project Image */}
      <img 
        src={imgUrl} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        referrerPolicy="no-referrer"
      />
      
      {/* Dark Ambient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-500" />
      
      {/* Dynamic Glow Highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Floating Action Button (Top-Right Link List) */}
      <div className="absolute top-5 right-5 flex gap-2.5 z-20">
        {siteUrl && siteUrl !== "#" && (
          <a 
            href={siteUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 rounded-full bg-black/60 hover:bg-primary border border-white/10 hover:border-transparent text-white hover:text-black backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            title="Visit Live Website"
          >
            <Globe className="w-4.5 h-4.5" />
          </a>
        )}
        {secondaryUrl && secondaryUrl !== "#" ? (
          <a 
            href={secondaryUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 rounded-full bg-black/60 hover:bg-primary border border-white/10 hover:border-transparent text-white hover:text-black backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            title={secondaryLabel}
          >
            <ArrowUpRight className="w-4.5 h-4.5" />
          </a>
        ) : (
          githubUrl && githubUrl !== "#" && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 rounded-full bg-black/60 hover:bg-primary border border-white/10 hover:border-transparent text-white hover:text-black backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              title="View Source on GitHub"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
          )
        )}
      </div>

      {/* Card Info Section */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10 pointer-events-none">
        {/* Dynamic Category/Tag Pills */}
        <div className="flex flex-wrap gap-1.5 mb-3 opacity-90 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[-4px]">
          {tags.slice(0, 4).map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-white/70 tracking-widest uppercase select-none"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Project Title & Description */}
        <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[-4px]">
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-white/60 text-xs md:text-sm font-medium leading-relaxed max-w-md line-clamp-2">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Card Border Hover Ring */}
      <div className="absolute inset-0 rounded-[2rem] border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};
