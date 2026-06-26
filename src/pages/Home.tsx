import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, Palette, Brain, Code2, Terminal, Cpu, Wind, ChevronDown, Atom, FileCode2, Figma, Layout, MessageSquare, Sparkles, Link as LinkIcon, ArrowUpRight, Mail, Linkedin, Bot, Instagram, Github, Briefcase, Cloud, Smartphone, Layers, Activity, Smile } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollVelocity from "../components/ScrollVelocity";
import { ProjectTile } from "../components/ProjectTile";
import DinoWidget from "../components/DinoWidget";
import { projectsData } from "../data/projects";

const ExpertiseCard = ({ 
  title, 
  description, 
  icon: Icon, 
  colorClass, 
  gradientClass, 
  linkText,
  linkTo,
  secondaryLinkText,
  secondaryLinkTo,
  delay 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  colorClass: string; 
  gradientClass: string; 
  linkText: string;
  linkTo: string;
  secondaryLinkText?: string;
  secondaryLinkTo?: string;
  delay: number;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const isExternal = linkTo.startsWith('http');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-[2rem] h-full min-h-[400px] transition-all duration-500 hover:-translate-y-2 flex flex-col border border-white/5 hover:border-white/10 bg-white/[0.03] backdrop-blur-3xl"
    >
      {/* Interactive Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 80%)`
          ),
        }}
      />

      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`} />
      
      {/* Background Decorative Icon */}
      <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none">
        <Icon size={240} className={colorClass} />
      </div>

      <div className="relative flex-1 p-8 md:p-10 flex flex-col justify-between z-10">
        <div>
          <div className="flex justify-between items-start mb-8">
            <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 shadow-xl overflow-hidden relative`}>
               <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-20`} />
               <Icon className={`w-8 h-8 ${colorClass} relative z-10`} />
            </div>
            
            {secondaryLinkText && secondaryLinkTo && (
                secondaryLinkTo.startsWith('http') ? (
                  <a href={secondaryLinkTo} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all backdrop-blur-md hover:scale-105 active:scale-95">
                    {secondaryLinkText}
                  </a>
                ) : (
                  <Link to={secondaryLinkTo} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all backdrop-blur-md hover:scale-105 active:scale-95">
                    {secondaryLinkText}
                  </Link>
                )
            )}
          </div>

          <h3 className="font-headline text-3xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">{title}</h3>
          <p className="text-white/60 leading-relaxed text-sm md:text-base font-light max-w-[90%]">{description}</p>
        </div>

        <div className="mt-10">
          {isExternal ? (
            <a href={linkTo} target="_blank" rel="noopener noreferrer" className={`group/btn relative inline-flex items-center gap-3 py-3 px-6 rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20`}>
              <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass} opacity-0 group-hover/btn:opacity-10 transition-opacity`} />
              <span className={`font-bold text-sm ${colorClass} group-hover/btn:translate-x-1 transition-transform duration-300`}>{linkText}</span>
              <ArrowRight className={`w-4 h-4 ${colorClass} group-hover/btn:translate-x-2 transition-transform duration-300`} />
            </a>
          ) : (
            <Link to={linkTo} className={`group/btn relative inline-flex items-center gap-3 py-3 px-6 rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20`}>
              <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass} opacity-0 group-hover/btn:opacity-10 transition-opacity`} />
              <span className={`font-bold text-sm ${colorClass} group-hover/btn:translate-x-1 transition-transform duration-300`}>{linkText}</span>
              <ArrowRight className={`w-4 h-4 ${colorClass} group-hover/btn:translate-x-2 transition-transform duration-300`} />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SpotlightGlassCard = ({ 
  children, 
  className = "", 
  delay = 0,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 }
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  initial?: any;
  animate?: any;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      initial={initial}
      whileInView={animate}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-surface/40 backdrop-blur-2xl border border-outline-variant/15 transition-all duration-300 ${className}`}
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl md:rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 182, 141, 0.12), transparent 80%)`
          ),
        }}
      />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

const ExperienceItem = ({ 
  title, 
  company, 
  period, 
  description, 
  colorClass,
  isFirst,
  isLast
}: { 
  title: string; 
  company: string; 
  period: string; 
  description: React.ReactNode; 
  colorClass: string; 
  isFirst?: boolean;
  isLast?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      initial={false}
      className="group relative pl-8 pb-6 last:pb-0 transition-all duration-500"
    >
      {/* Timeline Line Segment */}
      {!isLast && (
        <div className={`absolute left-0 top-[18px] bottom-0 w-[2px] ${
          isFirst 
            ? 'bg-gradient-to-b from-primary to-white/10 group-hover:from-primary group-hover:to-primary/20' 
            : 'bg-gradient-to-b from-white/10 to-white/5 group-hover:from-primary/30 group-hover:to-white/5'
        } transition-all duration-500`} />
      )}

      {/* Timeline Bullet */}
      {isFirst ? (
        <div className="absolute left-[-5.5px] top-[5px] flex items-center justify-center w-[13px] h-[13px] z-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40"></span>
          <div className="relative w-[9px] h-[9px] rounded-full bg-primary shadow-[0_0_12px_rgba(255,152,0,0.9)]" />
        </div>
      ) : isLast ? (
        <div className="absolute left-[-4.5px] top-[6px] w-[11px] h-[11px] rounded-full bg-secondary border border-white/20 shadow-[0_0_10px_rgba(255,87,34,0.6)] z-10" />
      ) : (
        <div className="absolute left-[-3.5px] top-[7px] w-[9px] h-[9px] rounded-full bg-white/20 group-hover:bg-primary/80 group-hover:scale-110 transition-all duration-500 shadow-[0_0_6px_rgba(255,255,255,0.1)] z-10" />
      )}
      
      <div 
        className="cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="text-lg md:text-xl font-bold text-white/90 group-hover:text-white transition-colors tracking-tight">{title}</h4>
            <div className="flex items-center gap-3 mt-0.5 mb-1.5">
              <span className={`font-bold text-xs md:text-sm ${colorClass}`}>{company}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white/40 text-[10px] md:text-xs font-medium">{period}</span>
            </div>
          </div>
          <button className={`p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all`}>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-5 h-5 text-white/40 group-hover:text-primary" />
            </motion.div>
          </button>
        </div>
        
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="text-white/60 leading-relaxed text-sm md:text-base pt-2 pb-4 pr-4">
                {description}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ArsenalTile = ({ 
  name, 
  icon: Icon, 
  colorClass, 
  imgUrl, 
  animate,
  backName,
  backIcon: BackIcon,
  backColorClass,
  backImgUrl,
  backAnimate
}: { 
  name: string; 
  icon?: any; 
  colorClass?: string; 
  imgUrl?: string; 
  animate?: any;
  backName: string;
  backIcon?: any;
  backColorClass?: string;
  backImgUrl?: string;
  backAnimate?: any;
}) => (
  <div className="w-full aspect-square relative" style={{ perspective: '1000px' }}>
    <motion.div 
      className="w-full h-full relative cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ rotateY: 180 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Front Card */}
      <div 
        className="absolute inset-0 w-full h-full glass-card rounded-2xl p-2.5 md:p-3 flex flex-col items-center justify-center text-center border border-white/5 hover:border-white/20 transition-all group"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-2`}>
          <motion.div
            animate={animate}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            {imgUrl ? (
              <img src={imgUrl} alt={name} className="w-6 h-6 md:w-7 md:h-7 object-contain drop-shadow-md" referrerPolicy="no-referrer" />
            ) : (
              Icon && <Icon className={`w-6 h-6 md:w-7 md:h-7 ${colorClass}`} />
            )}
          </motion.div>
        </div>
        <span className="text-[10px] md:text-[11px] font-bold text-white/80 group-hover:text-white transition-colors line-clamp-1">{name}</span>
      </div>

      {/* Back Card */}
      <div 
        className="absolute inset-0 w-full h-full glass-card rounded-2xl p-2.5 md:p-3 flex flex-col items-center justify-center text-center border border-primary/20 bg-primary/[0.02] hover:border-primary/40 transition-all group"
        style={{ 
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)'
        }}
      >
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-2`}>
          <motion.div
            animate={backAnimate}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            {backImgUrl ? (
              <img src={backImgUrl} alt={backName} className="w-6 h-6 md:w-7 md:h-7 object-contain drop-shadow-md" referrerPolicy="no-referrer" />
            ) : (
              BackIcon && <BackIcon className={`w-6 h-6 md:w-7 md:h-7 ${backColorClass}`} />
            )}
          </motion.div>
        </div>
        <span className="text-[10px] md:text-[11px] font-bold text-white/80 group-hover:text-white transition-colors line-clamp-1">{backName}</span>
      </div>
    </motion.div>
  </div>
);

const SkillPill = ({ name, icon: Icon, className, iconColorClass, animate }: { name: string, icon: any, className: string, iconColorClass?: string, animate?: any }) => {
  const isStringIcon = typeof Icon === 'string';
  
  return (
    <span className={`inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-2xl text-base md:text-lg lg:text-xl font-headline font-extrabold shadow-lg transition-all duration-300 ${className}`}>
      <motion.div
        animate={animate}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center justify-center mr-1"
      >
        {isStringIcon ? (
          <img src={Icon} alt={name} className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 object-contain drop-shadow-md" referrerPolicy="no-referrer" />
        ) : (
          Icon && <Icon className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 drop-shadow-md ${iconColorClass || ''}`} />
        )}
      </motion.div>
      {name}
    </span>
  );
};



export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const categories = ["All", "Frontend", "Full Stack", "AI Automation", "UI/UX Design"];

  const filteredProjects = selectedCategory === "All"
    ? projectsData
    : projectsData.filter(project => project.categories.includes(selectedCategory));
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <main className="pt-28 md:pt-24 pb-16 md:pb-24">
      {/* Contact Popup Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsContactOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface-container-low border border-outline-variant/20 p-8 md:p-12 rounded-[2.5rem] max-w-md w-full shadow-2xl flex flex-col items-center text-center relative"
            >
              <button 
                onClick={() => setIsContactOpen(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>
              <h3 className="text-3xl font-bold text-white mb-2">Get in Touch</h3>
              <p className="text-white/60 mb-8">Choose a platform to connect with me.</p>
              <div className="flex flex-col w-full gap-4">
                <a 
                  href="mailto:joy.thesloth@gmail.com" 
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-primary text-background rounded-full font-bold hover:scale-105 transition-transform w-full"
                >
                  <Mail className="w-5 h-5" /> Email Me
                </a>
                <a 
                  href="https://www.linkedin.com/in/joydeep-das-78123522a" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-colors w-full"
                >
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-12 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Card: Info */}
          <SpotlightGlassCard 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-9 pt-8 px-5 pb-6 md:p-12 flex flex-col justify-between min-h-[400px] md:min-h-[500px]"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8 md:mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/20 bg-surface-bright relative group">
                    <div 
                      className="tenor-gif-embed absolute inset-0 scale-[1.3]" 
                      data-postid="2124557923355771903" 
                      data-share-method="host" 
                      data-aspect-ratio="0.921986" 
                      data-width="100%"
                    >
                      <a href="https://tenor.com/view/stan-twt-evil-chihuahua-twt-memes-dog-gif-2124557923355771903">GIF</a>
                    </div>
                    <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
                  </div>
                  <div>
                    <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight">@pixeldeck.design</h2>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-1.5 md:gap-2 scale-90 md:scale-100 origin-right">
                  <a href="https://instagram.com/pixeldeck.design" target="_blank" rel="noopener noreferrer" className="p-1.5 md:p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                    <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a href="https://linkedin.com/in/joydeep-das-78123522a" target="_blank" rel="noopener noreferrer" className="p-1.5 md:p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                    <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a href="mailto:joy.thesloth@gmail.com" className="p-1.5 md:p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                </div>
              </div>

              <h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-[-0.04em] mb-8 max-w-2xl">
                Hi, I'm <span className="animated-gradient-text">Joydeep</span>.
              </h1>
              
              <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed tracking-tight max-w-xl">
                A multidisciplinary <span className="text-white font-semibold">UI/UX Designer</span>, 
                <span className="text-secondary font-semibold"> Gen AI Developer</span>, and 
                <span className="text-[#89CFF0] font-semibold"> Front-end Developer</span> crafting high-performance digital experiences.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-4 mt-12">
              <a href="https://www.instagram.com/pixeldeck.design" target="_blank" rel="noopener noreferrer" className="bg-primary text-background px-8 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform">
                Explore More
              </a>
              <button 
                onClick={() => setIsContactOpen(true)} 
                className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </button>
            </div>
          </SpotlightGlassCard>
          {/* Right Card: Avatar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 rounded-3xl md:rounded-[2.5rem] overflow-hidden relative group min-h-[350px] md:min-h-[450px] lg:min-h-[500px] flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF4500] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-white/20 pointer-events-none" />
            
            {/* Dino-themed illustrations */}
            <motion.div 
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 text-2xl opacity-20 pointer-events-none"
            >🦕</motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-12 right-20 text-2xl opacity-20 pointer-events-none"
            >🌵</motion.div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-8 text-xl opacity-20 pointer-events-none"
            >⚡</motion.div>
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-24 left-1/4 text-xl opacity-10 pointer-events-none"
            >Rex</motion.div>
            <motion.div 
              animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-1/4 right-8 text-lg opacity-10 pointer-events-none"
            >Vol</motion.div>
            <motion.div 
              animate={{ scale: [0.8, 1, 0.8], rotate: [0, 45, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute top-1/3 right-1/4 text-sm opacity-10 pointer-events-none"
            >Egg</motion.div>
 
            <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
              <DinoWidget />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-12 md:mb-16">
        <h2 className="font-headline text-4xl font-bold mb-12 text-center">Core Expertise</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ExpertiseCard 
            title="UI/UX Design"
            description="Creating intuitive, research-driven interfaces that balance aesthetic beauty with functional clarity. I also design 3D award winning websites."
            icon={Palette}
            colorClass="text-primary"
            gradientClass="from-primary-container to-background"
            linkText="View Design Portfolio"
            linkTo="https://www.behance.net/joythesloth"
            secondaryLinkText="Figma Work"
            secondaryLinkTo="https://www.figma.com/design/lzR9XA3fQsXhGqpDNU5Exq/Portfolio--Copy-?node-id=6-19096&t=phHSoA8VxgUax1an-1"
            delay={0.1}
          />
          <ExpertiseCard 
            title="Gen AI Development"
            description="Architecting intelligent systems using LLMs and agentic frameworks to automate complex human tasks."
            icon={Brain}
            colorClass="text-secondary"
            gradientClass="from-secondary-container to-background"
            linkText="View Projects"
            linkTo="/gen-ai"
            delay={0.2}
          />
          <ExpertiseCard 
            title="Front-end Development"
            description="Translating complex designs into pixel-perfect, high-performance React and Next.js applications."
            icon={Code2}
            colorClass="text-[#89CFF0]"
            gradientClass="from-[#0057FF] to-background"
            linkText="Github Explore"
            linkTo="https://github.com/JoyTheSloth"
            delay={0.3}
          />
        </div>
      </section>

      {/* Experience & Arsenal Section */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-12 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Experience */}
          <div className="lg:col-span-8">
            <SpotlightGlassCard className="p-6 md:p-8 h-full group/exp">
              {/* Decorative background components */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[100px] rounded-full pointer-events-none group-hover/exp:bg-primary/10 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">Experience</h2>
                </div>
                <div className="relative mt-2">
                <ExperienceItem 
                  isFirst
                  title="Lead UI/UX Designer"
                  company="GEETBIH Labs Pvt Ltd. · Part-time"
                  period="Apr 2026 — Present"
                  colorClass="text-[#86EFAC]"
                  description={
                    <ul className="list-disc list-outside ml-5 space-y-1">
                      <li>Driving end-to-end design for digital products with a strong focus on usability, scalability, and impactful user experiences</li>
                      <li>Leading the creation of intuitive interfaces while building and maintaining a cohesive design system across web and mobile platforms</li>
                      <li>Collaborating closely with cross-functional teams—including developers and product stakeholders—to transform ideas into seamless, user-centric solutions</li>
                      <li>Leveraging generative AI and prompt design to streamline workflows, enhance creativity, and accelerate the design process</li>
                    </ul>
                  }
                />
                <ExperienceItem 
                  title="App Designer"
                  company="Modern Mahal"
                  period="Aug 2025 — Nov 2025"
                  colorClass="text-[#89CFF0]"
                  description={
                    <ul className="list-disc list-outside ml-5 space-y-1">
                      <li>Designed intuitive, visually appealing web and mobile interfaces in Figma to align with brand identity</li>
                      <li>Conducted usability reviews and implemented design refinements to improve navigation, engagement and accessibility</li>
                    </ul>
                  }
                />
                <ExperienceItem 
                  title="Generative AI Developer Intern"
                  company="Al Wallah"
                  period="May 2025 — Jul 2025"
                  colorClass="text-secondary"
                  description={
                    <ul className="list-disc list-outside ml-5 space-y-1">
                      <li>Developed and deployed LLM-powered web applications using Google Gemini API for Q&A, and multi-turn conversational workflows</li>
                      <li>Built full-stack integration of LLM services with Flask backend and JavaScript frontend through RESTful API architecture</li>
                      <li>Accelerated AI feature development by ∼50% through optimized prompt engineering and rapid prototyping methodologies</li>
                    </ul>
                  }
                />
                <ExperienceItem 
                  title="UI/UX Designer & Social Media Marketing"
                  company="2GatherApp"
                  period="Feb 2025 — Oct 2025"
                  colorClass="text-primary"
                  description={
                    <ul className="list-disc list-outside ml-5 space-y-1">
                      <li>Designed user-centric interfaces that enhance community engagement and streamline event discovery</li>
                      <li>Built a consistent design system to unify app visuals and marketing assets</li>
                      <li>Created and executed social media campaigns to boost reach, downloads, and brand identity</li>
                      <li>Collaborated with the content team to deliver Gen Z-friendly posts, reels, and stories across platforms</li>
                    </ul>
                  }
                />
                <ExperienceItem 
                  isLast
                  title="Web Designer"
                  company="YGSD"
                  period="Sep 2024 — Nov 2024"
                  colorClass="text-[#89CFF0]"
                  description={
                    <div className="space-y-6">
                      <div>
                        <p className="font-medium text-white mb-2">Project: Mourya Urja Matrimonial <span className="text-sm text-white/40 font-normal ml-2">(Oct 2024 — Nov 2024)</span></p>
                        <ul className="list-disc list-outside ml-5 space-y-1">
                          <li>Designed user-friendly, cohesive web layouts in Figma for a trusted matrimonial brand</li>
                          <li>Integrated client feedback to enhance user experience and accessibility</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-white mb-2">Project: Veliciae Jewellery <span className="text-sm text-white/40 font-normal ml-2">(Sep 2024 — Oct 2024)</span></p>
                        <ul className="list-disc list-outside ml-5 space-y-1">
                          <li>Created visually stunning and user-friendly web designs using Figma, ensuring a cohesive brand identity</li>
                          <li>Collaborated with developers to translate project requirements into effective design solutions</li>
                        </ul>
                      </div>
                    </div>
                  }
                />
              </div>
              </div>
            </SpotlightGlassCard>
          </div>

          {/* Arsenal */}
          <div className="lg:col-span-4">
            <div className="glass-card border border-white/10 rounded-3xl p-6 md:p-8 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8">Arsenal</h2>
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  <ArsenalTile 
                    name="React" 
                    icon={Atom}
                    colorClass="text-[#61DAFB]"
                    animate={{ rotate: 360 }}
                    backName="Flutter"
                    backIcon={Smartphone}
                    backColorClass="text-[#02569B]"
                    backAnimate={{ scale: [1, 1.1, 1] }}
                  />
                  <ArsenalTile 
                    name="Figma" 
                    icon={Figma}
                    colorClass="text-[#F24E1E]"
                    animate={{ scale: [1, 1.1, 1] }}
                    backName="Figma Weave"
                    backIcon={Layers}
                    backColorClass="text-[#A259FF]"
                    backAnimate={{ scale: [1, 1.05, 1] }}
                  />
                  <ArsenalTile 
                    name="Python" 
                    icon={Terminal}
                    colorClass="text-[#3776AB]"
                    animate={{ opacity: [1, 0.5, 1] }}
                    backName="Google Stitch"
                    backIcon={Activity}
                    backColorClass="text-[#4285F4]"
                    backAnimate={{ rotate: [0, -10, 10, 0] }}
                  />
                  <ArsenalTile 
                    name="Hugging Face" 
                    imgUrl="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Hugging%20Face.png" 
                    animate={{ y: [0, -4, 0] }}
                    backName="Google Flow"
                    backIcon={Wind}
                    backColorClass="text-[#34A853]"
                    backAnimate={{ x: [-3, 3, -3] }}
                  />
                  <ArsenalTile 
                    name="Ollama" 
                    icon={Bot} 
                    colorClass="text-secondary" 
                    animate={{ rotate: [-10, 10, -10] }} 
                    backName="Gemini API"
                    backIcon={Sparkles}
                    backColorClass="text-primary"
                    backAnimate={{ scale: [1, 1.2, 1] }}
                  />
                  <ArsenalTile 
                    name="Tailwind" 
                    icon={Wind} 
                    colorClass="text-[#38BDF8]" 
                    animate={{ x: [-2, 2, -2] }} 
                    backName="Claude Code"
                    backIcon={Terminal}
                    backColorClass="text-[#D97706]"
                    backAnimate={{ y: [0, -2, 0] }}
                  />
                  <ArsenalTile 
                    name="TypeScript" 
                    icon={FileCode2} 
                    colorClass="text-[#3178C6]" 
                    animate={{ scale: [1, 1.05, 1] }} 
                    backName="UAI"
                    backIcon={Brain}
                    backColorClass="text-[#FFD93D]"
                    backAnimate={{ rotate: [0, 5, -5, 0] }}
                  />
                  <ArsenalTile 
                    name="LangChain" 
                    icon={LinkIcon} 
                    colorClass="text-white" 
                    animate={{ rotate: [0, 180, 360] }} 
                    backName="LlamaIndex"
                    backIcon={LinkIcon}
                    backColorClass="text-white"
                    backAnimate={{ scale: [1, 1.1, 1] }}
                  />
                  <ArsenalTile 
                    name="Prompt Eng." 
                    icon={Sparkles} 
                    colorClass="text-secondary" 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} 
                    backName="Claude"
                    backIcon={Bot}
                    backColorClass="text-[#D97706]"
                    backAnimate={{ rotate: 360 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Skills Section */}
      <section className="mt-12 mb-12 overflow-hidden">
        <ScrollVelocity 
          velocity={40} 
          texts={[
            (
              <div className="flex gap-4 md:gap-6 px-2 md:px-3 items-center">
                <SkillPill name="React" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Atom%20Symbol.png" className="bg-gradient-to-r from-[#9FEFFF] to-[#00D2FF] text-[#004A55] shadow-cyan-500/10" animate={{ rotate: 360 }} />
                <SkillPill name="Hugging Face" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Hugging%20Face.png" className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white shadow-indigo-500/10" animate={{ scale: [1, 1.1, 1] }} />
                <SkillPill name="Tailwind CSS" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Dashing%20away.png" className="bg-gradient-to-r from-[#00B4DB] to-[#0083B0] text-white shadow-teal-500/10" animate={{ x: [-2, 2, -2] }} />
                <SkillPill name="TypeScript" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Blue%20book.png" className="bg-gradient-to-r from-[#1E3C72] to-[#2A5298] text-white shadow-blue-500/10" animate={{ scale: [1, 1.05, 1] }} />
                <SkillPill name="Figma" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Artist%20Palette.png" className="bg-gradient-to-r from-[#FF512F] to-[#DD2476] text-slate-900 shadow-red-500/10" animate={{ rotate: [0, 10, -10, 0] }} />
                <SkillPill name="Python" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Snake.png" className="bg-gradient-to-r from-[#1F4068] to-[#162447] text-white shadow-blue-500/10" animate={{ opacity: [1, 0.7, 1] }} />
              </div>
            ),
            (
              <div className="flex gap-4 md:gap-6 px-2 md:px-3 items-center">
                <SkillPill name="Generative AI" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20and%20body/Brain.png" className="bg-gradient-to-r from-[#11998E] to-[#38EF7D] text-[#0B3512] shadow-green-500/10" animate={{ scale: [1, 1.12, 1] }} />
                <SkillPill name="UI/UX Design" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Desktop%20Computer.png" className="bg-gradient-to-r from-[#FF9a9e] to-[#fecfef] text-[#8C1B4F] shadow-pink-500/10" animate={{ y: [0, -3, 0] }} />
                <SkillPill name="LLMs" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Speech%20balloon.png" className="bg-gradient-to-r from-[#9C75F2] to-[#713FE5] text-white shadow-purple-500/10" animate={{ scale: [1, 1.08, 1] }} />
                <SkillPill name="Prompt Engineering" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Sparkles.png" className="bg-gradient-to-r from-[#FFDF00] to-[#FFA000] text-slate-900 shadow-yellow-500/10" animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} />
                <SkillPill name="LangChain" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Link.png" className="bg-gradient-to-r from-[#4FACFE] to-[#00F2FE] text-[#0E3E5B] shadow-sky-500/10" animate={{ rotate: [0, 180, 360] }} />
              </div>
            )
          ]} 
        />
      </section>

      {/* Projects Section */}
      <section id="portfolio" className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-12">
          <div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-center md:text-left">Featured Projects</h2>
          </div>
          <Link to="/projects" className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors">
            View All Projects <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? "text-background z-10" 
                    : "text-white/60 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 hover:scale-102 active:scale-98"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {category}
              </button>
            );
          })}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 350, 
                  damping: 32,
                  opacity: { duration: 0.2 }
                }}
              >
                <ProjectTile 
                  title={project.title}
                  subtitle={project.subtitle}
                  imgUrl={project.imgUrl}
                  delay={0}
                  tags={project.tags}
                  githubUrl={project.githubUrl}
                  siteUrl={project.siteUrl}
                  secondaryUrl={project.secondaryUrl}
                  secondaryLabel={project.secondaryLabel}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link to="/projects" className="flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors">
            View All Projects <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Contact & About Section */}
      <section id="contact" className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-12 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#2a1b14] to-[#1a100c] rounded-[2.5rem] p-10 md:p-16 border border-white/5 flex flex-col justify-between min-h-[400px]">
            <div>
              <p className="text-white/50 font-medium mb-6">I constantly try to improve myself</p>
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-12 uppercase tracking-tighter">
                Currently, I am learning about<br/>
                <span className="text-primary italic">LLMs and Development</span>
              </h2>
            </div>
            <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-2xl mt-auto">
              I declare that the information presented above is true and accurate to the best of my knowledge. I assure you that my experience, skills, and qualifications meet the requirements of the job role.
            </p>
          </div>

          {/* Right Card */}
          <motion.div 
            className="bg-gradient-to-br from-[#d9651b] to-[#b34d0e] rounded-3xl md:rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden flex flex-col min-h-[400px] border border-white/10 shadow-2xl group"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
          >
            {/* Decorative background components */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="absolute -right-24 -top-24 w-64 h-64 bg-white/10 blur-[80px] rounded-full" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-black/20 blur-[60px] rounded-full" />
            
            <div className="relative z-10 flex-1">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact</h2>
              <p className="text-white/80 mb-8">Make a contact via a mail or DM.</p>
              
              <div className="flex flex-wrap gap-4 relative z-20">
                <a href="mailto:joy.thesloth@gmail.com" className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/20 shadow-lg">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/joydeep-das-78123522a" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/20 shadow-lg">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com/JoyTheSloth" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/20 shadow-lg">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.behance.net/joythesloth" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/20 shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M22 7h-7v-2h7v2zm.4 4.5s-.1-4.2-3.8-4.2c-3.1 0-4 2.1-4 4.1 0 2.2.8 4.4 4.2 4.4 3 0 3.7-1.8 3.7-1.8l-2.1-.9s-.3 1-1.6 1c-1.3 0-1.6-.9-1.6-1.5h5.2v-.1zm-5.2-1.1c0-1 1-1.2 1.6-1.2.9 0 1.5.5 1.5 1.2h-3.1zm-8.3 1.9c.7 0 1.2-.4 1.2-.4s.3 1.7 2.1 1.7c1.7 0 2.3-1.4 2.3-3.4 0-2.4-.8-3.7-2.6-3.7-1.7 0-1.9 1.4-1.9 1.4s-.4-1.4-2.1-1.4c-1.5 0-2 1.1-2 1.1V7.5H3.9v8.9h2.1v-3.7c0-1 1-1.1 1.3-1.1.5 0 .8.4.8.9v3.9h2.1l-.1-3.6z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/pixeldeck.design" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/20 shadow-lg">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* 3D Interactive Avatar */}
            <motion.div 
              className="absolute bottom-0 right-4 w-48 h-48 pointer-events-none overflow-visible z-0"
              style={{
                x: useSpring(useTransform(mouseX, [-200, 200], [-30, 30])),
                y: useSpring(useTransform(mouseY, [-200, 200], [-30, 30])),
                rotate: useSpring(useTransform(mouseX, [-200, 200], [-15, 15])),
                scale: useSpring(useTransform(mouseY, [-200, 200], [1.1, 0.9]))
              }}
            >
              <img 
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Raising%20Hand.png" 
                alt="Avatar Waving" 
                className="w-full h-full object-contain object-bottom drop-shadow-2xl"
              />
            </motion.div>
            
            {/* Decorative circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] aspect-square rounded-full border border-white/10 pointer-events-none" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
