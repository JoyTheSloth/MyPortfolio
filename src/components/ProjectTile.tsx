import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, Globe } from "lucide-react";

export const ProjectTile = ({ 
  title, 
  subtitle, 
  imgUrl, 
  delay,
  tags = [],
  githubUrl,
  siteUrl
}: { 
  title: string; 
  subtitle: string; 
  imgUrl: string;
  delay: number;
  tags?: string[];
  githubUrl?: string;
  siteUrl?: string;
}) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onClick={() => setIsClicked(!isClicked)}
      className="group relative overflow-hidden rounded-[2.5rem] aspect-[4/3] bg-surface-container-low border border-outline-variant/10 cursor-pointer"
    >
      <img 
        src={imgUrl} 
        alt={title} 
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isClicked ? 'scale-110 blur-md' : 'group-hover:scale-105'}`}
        referrerPolicy="no-referrer"
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ${isClicked ? 'opacity-90 bg-black/40' : 'opacity-80'}`} />
      
      {/* Tags */}
      {tags.length > 0 && (
        <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
          {tags.map(tag => (
            <span key={tag} className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white tracking-wider uppercase">
              {tag}
            </span>
          ))}
        </div>
      )}

      <AnimatePresence>
        {!isClicked ? (
          <motion.div 
            key="info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end z-10"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
              <p className="text-white/70 font-medium flex items-center gap-2 group-hover:text-primary transition-colors">
                {subtitle}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="buttons"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20"
          >
            {siteUrl && (
              <a 
                href={siteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-3 px-8 py-4 bg-primary text-background rounded-full font-bold hover:scale-105 transition-transform w-48 justify-center"
              >
                <Globe className="w-5 h-5" /> Visit Site
              </a>
            )}
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-colors w-48 justify-center backdrop-blur-md"
              >
                <Github className="w-5 h-5" /> View GitHub
              </a>
            )}
            {!siteUrl && !githubUrl && (
              <p className="text-white font-medium bg-black/50 px-6 py-3 rounded-full backdrop-blur-md">Links coming soon</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
