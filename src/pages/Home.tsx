import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, Palette, Brain, Code2, Terminal, Cpu, Wind, ChevronDown, Atom, FileCode2, Figma, Layout, MessageSquare, Sparkles, Link as LinkIcon, ArrowUpRight, Mail, Linkedin, Bot, Instagram, Github, Briefcase, Cloud, Smartphone, Layers, Activity, Smile, Check, Copy } from "lucide-react";
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
  delay,
  doodleNote,
  doodleSvg
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
  doodleNote?: string;
  doodleSvg?: React.ReactNode;
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
          {doodleNote && (
            <div className="mt-4 inline-flex items-center gap-2 font-handwriting text-lg font-bold select-none text-white/80">
              {doodleSvg}
              <span>{doodleNote}</span>
            </div>
          )}
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
  isLast,
  doodle
}: { 
  title: string; 
  company: string; 
  period: string; 
  description: React.ReactNode; 
  colorClass: string; 
  isFirst?: boolean; 
  isLast?: boolean;
  doodle?: React.ReactNode;
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
            <div className="flex items-center gap-3 mt-0.5 mb-1.5 flex-wrap">
              <span className={`font-bold text-xs md:text-sm ${colorClass}`}>{company}</span>
              {doodle}
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

interface ArsenalItem {
  name: string;
  category: "Frontend" | "Gen AI" | "Design";
  icon?: any;
  imgUrl?: string;
  colorClass: string;
  glow: string;
  role: string;
  badge: string;
  animate?: any;
}

const arsenalCategories = ["All", "Frontend", "Gen AI", "Design"] as const;

const arsenalItems: ArsenalItem[] = [
  {
    name: "React",
    category: "Frontend",
    icon: Atom,
    colorClass: "text-[#61DAFB]",
    glow: "rgba(97, 218, 251, 0.3)",
    role: "Reactive UI & Next.js",
    badge: "V19 Core",
    animate: { rotate: 360 }
  },
  {
    name: "TypeScript",
    category: "Frontend",
    icon: FileCode2,
    colorClass: "text-[#3178C6]",
    glow: "rgba(49, 120, 198, 0.3)",
    role: "Type Architecture",
    badge: "Daily Driver",
    animate: { scale: [1, 1.06, 1] }
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    icon: Wind,
    colorClass: "text-[#38BDF8]",
    glow: "rgba(56, 189, 248, 0.3)",
    role: "Fluid Design Tokens",
    badge: "Styling",
    animate: { x: [-2, 2, -2] }
  },
  {
    name: "Flutter",
    category: "Frontend",
    icon: Smartphone,
    colorClass: "text-[#02569B]",
    glow: "rgba(2, 86, 155, 0.3)",
    role: "Cross-Platform Apps",
    badge: "Mobile",
    animate: { scale: [1, 1.08, 1] }
  },
  {
    name: "Gemini & Claude",
    category: "Gen AI",
    icon: Sparkles,
    colorClass: "text-primary",
    glow: "rgba(255, 83, 0, 0.35)",
    role: "Agentic Reasoning",
    badge: "Primary LLM",
    animate: { scale: [1, 1.15, 1] }
  },
  {
    name: "Python",
    category: "Gen AI",
    icon: Terminal,
    colorClass: "text-[#3776AB]",
    glow: "rgba(55, 118, 171, 0.3)",
    role: "AI Pipelines & Flask",
    badge: "Backend",
    animate: { opacity: [1, 0.6, 1] }
  },
  {
    name: "LangChain",
    category: "Gen AI",
    icon: LinkIcon,
    colorClass: "text-[#22c55e]",
    glow: "rgba(34, 197, 94, 0.3)",
    role: "RAG & Agent Chains",
    badge: "Workflows",
    animate: { rotate: [0, 180, 360] }
  },
  {
    name: "Hugging Face",
    category: "Gen AI",
    imgUrl: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Hugging%20Face.png",
    colorClass: "text-[#FFD21E]",
    glow: "rgba(255, 210, 30, 0.3)",
    role: "Models & Transformers",
    badge: "OSS",
    animate: { y: [0, -4, 0] }
  },
  {
    name: "Ollama",
    category: "Gen AI",
    icon: Bot,
    colorClass: "text-secondary",
    glow: "rgba(0, 240, 255, 0.3)",
    role: "Local LLM Inference",
    badge: "On-Prem",
    animate: { rotate: [-8, 8, -8] }
  },
  {
    name: "Prompt Eng.",
    category: "Gen AI",
    icon: Brain,
    colorClass: "text-[#FFD93D]",
    glow: "rgba(255, 217, 61, 0.3)",
    role: "Evals & Metaprompts",
    badge: "Systems",
    animate: { scale: [1, 1.1, 1] }
  },
  {
    name: "Figma",
    category: "Design",
    icon: Figma,
    colorClass: "text-[#F24E1E]",
    glow: "rgba(242, 78, 30, 0.35)",
    role: "Design Systems & UI",
    badge: "Variables",
    animate: { scale: [1, 1.08, 1] }
  },
  {
    name: "Git & GitHub",
    category: "Design",
    icon: Github,
    colorClass: "text-white",
    glow: "rgba(255, 255, 255, 0.25)",
    role: "Version Control & CI",
    badge: "DevOps",
    animate: { y: [0, -2, 0] }
  }
];

const SkillPill = ({ 
  name, 
  sublabel,
  icon: Icon, 
  colorClass = "text-primary",
  glowColor = "rgba(255, 83, 0, 0.25)"
}: { 
  name: string; 
  sublabel?: string;
  icon: any; 
  colorClass?: string;
  glowColor?: string;
}) => (
  <div className="group/pill inline-flex items-center gap-2.5 md:gap-3 px-4 py-2.5 md:px-5 md:py-3 rounded-2xl bg-surface-bright/70 hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg relative overflow-hidden select-none cursor-default mx-1.5 md:mx-2">
    {/* Subtle brand glow on hover */}
    <div 
      className="absolute -right-4 -bottom-4 w-12 h-12 rounded-full blur-lg opacity-0 group-hover/pill:opacity-80 transition-opacity duration-300 pointer-events-none"
      style={{ background: glowColor }}
    />

    {/* Icon */}
    <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/pill:scale-110 transition-transform duration-300 shrink-0">
      <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${colorClass}`} />
    </div>

    {/* Label & Sublabel */}
    <div className="flex items-baseline gap-2">
      <span className="font-headline font-bold text-sm md:text-base text-white/90 group-hover/pill:text-white transition-colors tracking-tight">
        {name}
      </span>
      {sublabel && (
        <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider hidden sm:inline-block">
          {sublabel}
        </span>
      )}
    </div>

    {/* Separator diamond */}
    <span className="text-white/20 text-xs ml-0.5">✦</span>
  </div>
);



export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [arsenalCategory, setArsenalCategory] = useState<string>("All");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const filteredArsenal = arsenalCategory === "All"
    ? arsenalItems
    : arsenalItems.filter(item => item.category === arsenalCategory);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("joy.thesloth@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };
  
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
    <main className="pt-28 md:pt-24 pb-16 md:pb-24 relative overflow-hidden">
      {/* Cool Letter-Like Matrix & Ghost Typography Background Pattern */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Large Architectural Ghost Typography Watermark */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 text-[14vw] font-black text-white/[0.015] tracking-[0.2em] uppercase whitespace-nowrap font-headline leading-none">
          CREATIVE // ARCHITECT
        </div>

        {/* Micro Typographic Matrix Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='15' y='30' fill='%23ffffff' font-family='monospace' font-size='10' font-weight='700'%3E%2B 01 J%3C/text%3E%3Ctext x='95' y='30' fill='%23ffffff' font-family='monospace' font-size='10' font-weight='700'%3E%7B%20%7D%3C/text%3E%3Ctext x='15' y='80' fill='%23ffffff' font-family='monospace' font-size='10' font-weight='700'%3E%2F%2F AI%3C/text%3E%3Ctext x='95' y='80' fill='%23ffffff' font-family='monospace' font-size='10' font-weight='700'%3EUX %C2%B7%3C/text%3E%3Ctext x='15' y='130' fill='%23ffffff' font-family='monospace' font-size='10' font-weight='700'%3E2026%3C/text%3E%3Ctext x='95' y='130' fill='%23ffffff' font-family='monospace' font-size='10' font-weight='700'%3E%3C %2F%3E%3C/text%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat"
          }}
        />
      </div>

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
              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-primary text-background rounded-full font-bold hover:opacity-90 active:scale-95 transition-all w-full text-sm shadow"
                >
                  {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedEmail ? "Copied joy.thesloth@gmail.com!" : "Copy Email Address"}
                </button>
                <a 
                  href="mailto:joy.thesloth@gmail.com" 
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-full font-bold transition-all w-full text-sm"
                >
                  <Mail className="w-4 h-4" /> Direct Mail Client
                </a>
                <a 
                  href="https://www.linkedin.com/in/joydeep-das-78123522a" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 rounded-full font-bold transition-all w-full text-sm"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
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
                    <span className="font-handwriting text-xs text-primary/80 font-bold -rotate-2 inline-flex items-center gap-1 select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      creative studio & lab ✦
                    </span>
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

              <div className="relative inline-block mb-8 max-w-2xl">
                <h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-[-0.04em]">
                  Hi, I'm{" "}
                  <span className="relative inline-block">
                    <span className="animated-gradient-text">Joydeep</span>
                    {/* Hand-Drawn Wavy Underline */}
                    <svg 
                      className="absolute -bottom-2.5 left-0 w-full h-3.5 text-primary/80 overflow-visible pointer-events-none" 
                      viewBox="0 0 120 12" 
                      fill="none" 
                      preserveAspectRatio="none"
                    >
                      <path 
                        d="M 2 8 C 30 1, 65 13, 118 6" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                      />
                    </svg>
                  </span>
                  .
                </h1>

                {/* Floating Starburst Doodle */}
                <motion.svg
                  animate={{ rotate: [0, 180, 360], scale: [1, 1.15, 1] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-8 w-6 h-6 md:w-8 md:h-8 text-secondary/70 pointer-events-none hidden sm:block"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M12 2 L12 22 M2 12 L22 12 M5 5 L19 19 M19 5 L5 19" strokeDasharray="1 2.5" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                </motion.svg>
              </div>
              
              <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed tracking-tight max-w-xl">
                Founder of <a href="https://whynotstash.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Stash</a> (Clipboard Manager). A multidisciplinary <span className="text-white font-semibold">UI/UX Designer</span>, 
                <span className="text-secondary font-semibold"> Gen AI Developer</span>, and 
                <span className="relative inline-block text-[#89CFF0] font-semibold">
                  <span> Front-end Developer</span>
                  <svg className="absolute -bottom-1 left-1 w-full h-2 text-[#89CFF0]/60 overflow-visible pointer-events-none" viewBox="0 0 80 8" fill="none">
                    <path d="M 2 5 Q 40 1 78 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span> crafting high-performance digital experiences.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-4 mt-12">
              <a href="https://www.instagram.com/pixeldeck.design" target="_blank" rel="noopener noreferrer" className="bg-primary text-background px-8 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform shadow-lg">
                Explore More
              </a>
              <button 
                onClick={() => setIsContactOpen(true)} 
                className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </button>

              {/* Hand-Drawn Arrow Annotation */}
              <div className="hidden sm:flex items-center gap-2 ml-2 select-none pointer-events-none">
                <svg className="w-8 h-8 text-primary/70 transform -rotate-12" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M 5 10 Q 15 25, 25 15" />
                  <path d="M 18 13 L 25 15 L 23 23" />
                </svg>
                <span className="font-handwriting text-xl text-primary font-bold -rotate-3">
                  crafted with soul ✦
                </span>
              </div>
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
        <div className="flex flex-col items-center justify-center text-center mb-12 relative">
          <div className="relative inline-block">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-white leading-tight">
              Core{" "}
              <span className="relative inline-block text-gradient-primary">
                Expertise
                {/* Hand-drawn Squiggle */}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/80 overflow-visible pointer-events-none" viewBox="0 0 120 12" fill="none" preserveAspectRatio="none">
                  <path d="M 2 8 C 30 1, 65 13, 118 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            {/* Floating Starburst */}
            <motion.svg
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-7 w-6 h-6 text-secondary/70 pointer-events-none hidden sm:block"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M12 2 L12 22 M2 12 L22 12 M5 5 L19 19 M19 5 L5 19" strokeDasharray="1 3" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </motion.svg>
          </div>
          <p className="font-handwriting text-secondary text-xl font-bold mt-2 -rotate-1 select-none">
            ✦ human-centered design meets agentic workflows ✦
          </p>
        </div>
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
            doodleNote="pixel-perfect craft ✨"
            doodleSvg={
              <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="10" cy="10" r="7" strokeDasharray="2 2" />
                <path d="M10 6v8M6 10h8" />
              </svg>
            }
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
            doodleNote="autonomous agents & LLMs 🤖"
            doodleSvg={
              <svg className="w-4 h-4 text-secondary" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 14 Q10 4 16 14 Q10 10 4 14Z" />
                <circle cx="10" cy="10" r="2" fill="currentColor" />
              </svg>
            }
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
            doodleNote="60fps silky smooth ⚡"
            doodleSvg={
              <svg className="w-4 h-4 text-[#89CFF0]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 8 L3 11 L6 14 M14 8 L17 11 L14 14 M11 6 L9 16" />
              </svg>
            }
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
                  <div className="flex items-baseline gap-3">
                    <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">Experience</h2>
                    <span className="font-handwriting text-primary/80 text-lg hidden sm:inline-block -rotate-3 select-none">
                      proven in production 🚀
                    </span>
                  </div>
                </div>
                <div className="relative mt-2">
                <ExperienceItem 
                  isFirst
                  title="Web Designer"
                  company="TripEva · Freelance"
                  period="Aug 2026 — Present"
                  colorClass="text-primary"
                  doodle={
                    <span className="font-handwriting text-xs text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-full -rotate-2 select-none inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      active now ✦
                    </span>
                  }
                  description={
                    <p className="text-white/70 leading-relaxed text-sm md:text-base">
                      Crafting high-impact, responsive web layouts and landing pages from concept to launch. Working closely with clients and developers, I translate brand goals into clean, fluid digital interfaces with meticulous attention to typography, micro-interactions, and modern design standards.
                    </p>
                  }
                />
                <ExperienceItem 
                  title="Academic Counsellor"
                  company="SkillArbitrage · Full-time"
                  period="Jul 2026 — Present"
                  colorClass="text-secondary"
                  description={
                    <p className="text-white/70 leading-relaxed text-sm md:text-base">
                      Guiding students and working professionals navigating career pivots and tech upskilling. By assessing individual goals and industry trends, I help learners choose suitable professional programs, master emerging tools, and map out sustainable career roadmaps.
                    </p>
                  }
                />
                <ExperienceItem 
                  title="Lead UI/UX Designer"
                  company="GEETBIH Labs Pvt Ltd. · Part-time"
                  period="Apr 2026 — Present"
                  colorClass="text-[#86EFAC]"
                  description={
                    <p className="text-white/70 leading-relaxed text-sm md:text-base">
                      Driving end-to-end design for scalable digital products while building and maintaining cohesive design systems across web and mobile. I partner closely with engineers and product stakeholders to shape user-centric solutions, integrating generative AI and prompt design directly into our design process to accelerate prototyping without compromising craft.
                    </p>
                  }
                />
                <ExperienceItem 
                  title="App Designer"
                  company="Modern Mahal"
                  period="Aug 2025 — Nov 2025"
                  colorClass="text-[#89CFF0]"
                  description={
                    <p className="text-white/70 leading-relaxed text-sm md:text-base">
                      Designed intuitive mobile and web interfaces in Figma aligned with brand identity. Through continuous usability reviews and iterative refinements, I simplified navigation flows and enhanced visual accessibility across primary user touchpoints.
                    </p>
                  }
                />
                <ExperienceItem 
                  title="Generative AI Developer Intern"
                  company="Al Wallah"
                  period="May 2025 — Jul 2025"
                  colorClass="text-secondary"
                  description={
                    <p className="text-white/70 leading-relaxed text-sm md:text-base">
                      Built and shipped full-stack LLM applications powered by the Google Gemini API, handling multi-turn conversational agents with a Flask backend and JavaScript frontend. Through prompt engineering and rapid experimentation, our team cut AI feature prototyping cycles by roughly 50%.
                    </p>
                  }
                />
                <ExperienceItem 
                  title="UI/UX Designer & Social Media Marketing"
                  company="2GatherApp"
                  period="Feb 2025 — Oct 2025"
                  colorClass="text-primary"
                  description={
                    <p className="text-white/70 leading-relaxed text-sm md:text-base">
                      Designed community-first mobile experiences centered on social discovery and event engagement. Along with architecting a unified design system for the core product, I directed creative social media campaigns and Gen-Z-friendly content that drove organic growth and community reach.
                    </p>
                  }
                />
                <ExperienceItem 
                  isLast
                  title="Web Designer"
                  company="YGSD"
                  period="Sep 2024 — Nov 2024"
                  colorClass="text-[#89CFF0]"
                  description={
                    <div className="space-y-3">
                      <p className="text-white/70 leading-relaxed text-sm md:text-base">
                        Designed cohesive, brand-aligned web experiences for established consumer businesses, including matrimonial brand <strong className="text-white font-semibold">Mourya Urja Matrimonial</strong> and luxury jeweler <strong className="text-white font-semibold">Veliciae Jewellery</strong>.
                      </p>
                      <p className="text-white/60 leading-relaxed text-xs md:text-sm">
                        Collaborated with frontend engineering teams to turn Figma design systems and client feedback into polished, responsive, and accessible production sites.
                      </p>
                    </div>
                  }
                />
              </div>

              {/* Sketched continuous shipping footer doodle */}
              <div className="pt-4 flex items-center justify-end gap-2 text-white/40 pointer-events-none select-none">
                <span className="font-handwriting text-base text-primary/70">continuous shipping</span>
                <svg className="w-4 h-4 text-primary/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
              </div>
            </SpotlightGlassCard>
          </div>

          {/* Tech Stack */}
          <div className="lg:col-span-4">
            <div className="glass-card border border-white/10 rounded-3xl p-6 md:p-8 h-full flex flex-col justify-between relative overflow-hidden group/arsenal">
              {/* Subtle background brand illumination */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/5 blur-[100px] rounded-full pointer-events-none group-hover/arsenal:bg-secondary/10 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-6">
                  <div>
                    <div className="relative inline-block">
                      <h2 className="font-headline text-2xl md:text-3xl font-bold">Tech Stack</h2>
                      <svg className="absolute -bottom-1.5 left-0 w-full h-2 text-secondary/70 overflow-visible pointer-events-none" viewBox="0 0 110 8" fill="none">
                        <path d="M2 3 C 35 1, 75 5, 108 3 M4 6 C 38 4, 72 7, 106 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </div>
                    <p className="text-white/40 text-xs mt-1.5 font-medium">Curated production toolchain</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="font-handwriting text-secondary text-base font-bold -rotate-3 select-none">
                      daily drivers ⚡
                    </span>
                    {/* Floating starburst doodle */}
                    <motion.svg
                      animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.1, 1] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 text-secondary/50 pointer-events-none ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" strokeDasharray="2 2" />
                    </motion.svg>
                  </div>
                </div>

                {/* Filter Tabs - Premium Segmented Control */}
                <div className="grid grid-cols-4 gap-1 mb-5 p-1 bg-surface-bright/70 border border-white/10 rounded-2xl shadow-inner backdrop-blur-xl">
                  {arsenalCategories.map((cat) => {
                    const isActive = arsenalCategory === cat;
                    const count = cat === "All" 
                      ? arsenalItems.length 
                      : arsenalItems.filter(i => i.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setArsenalCategory(cat)}
                        className={`group relative flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer select-none ${
                          isActive 
                            ? "text-white font-bold" 
                            : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeArsenalTab"
                            className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl shadow-md backdrop-blur-md"
                            transition={{ type: "spring", stiffness: 450, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10 truncate">{cat}</span>
                        <span className={`relative z-10 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                          isActive 
                            ? "bg-primary text-background shadow-sm" 
                            : "bg-white/5 text-white/40 group-hover:text-white/70 group-hover:bg-white/10"
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Tech Cards Grid */}
                <motion.div 
                  layout
                  className="grid grid-cols-2 gap-2.5"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredArsenal.map((item) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.name}
                          layout
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.92 }}
                          transition={{ duration: 0.2 }}
                          className="group/tile relative p-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-white/20 transition-all duration-300 flex items-center gap-2.5 overflow-hidden cursor-pointer"
                        >
                          {/* Ambient Brand Glow on Hover */}
                          <div 
                            className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full blur-xl opacity-0 group-hover/tile:opacity-70 transition-opacity duration-500 pointer-events-none"
                            style={{ background: item.glow }}
                          />
                          
                          {/* Icon wrapper */}
                          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/tile:scale-110 transition-transform duration-300 shrink-0">
                            <motion.div
                              animate={item.animate}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              className="flex items-center justify-center"
                            >
                              {item.imgUrl ? (
                                <img src={item.imgUrl} alt={item.name} className="w-5 h-5 object-contain drop-shadow" referrerPolicy="no-referrer" />
                              ) : (
                                Icon && <Icon className={`w-5 h-5 ${item.colorClass}`} />
                              )}
                            </motion.div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-bold text-xs text-white/90 group-hover/tile:text-white truncate">{item.name}</span>
                            </div>
                            <span className="text-[10px] text-white/40 group-hover/tile:text-white/70 block truncate transition-colors">{item.role}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Skills Banner Section */}
      <section className="relative my-16 md:my-20 overflow-hidden">
        {/* Editorial Subheader with Doodles */}
        <div className="flex items-center justify-center gap-2 mb-6 pointer-events-none select-none">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/30 font-bold">
            ENGINEERING & DESIGN CAPABILITIES
          </span>
          <span className="font-handwriting text-primary text-base md:text-lg font-bold -rotate-2">
            ✦ stream in motion
          </span>
        </div>

        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-primary/[0.03] blur-[120px] pointer-events-none rounded-full" />

        {/* Left and Right Smooth Edge Fade Masks */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-48 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-48 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        {/* Ribbon track container */}
        <div className="py-4 md:py-6 border-y border-white/[0.06] bg-white/[0.015] backdrop-blur-[2px]">
          <ScrollVelocity 
            velocity={30} 
            texts={[
              (
                <div className="flex px-2 items-center">
                  <SkillPill name="React 19" sublabel="UI Engine" icon={Atom} colorClass="text-[#61DAFB]" glowColor="rgba(97, 218, 251, 0.3)" />
                  <SkillPill name="TypeScript" sublabel="Strict Architecture" icon={FileCode2} colorClass="text-[#3178C6]" glowColor="rgba(49, 120, 198, 0.3)" />
                  <SkillPill name="Gemini 2.0" sublabel="Agentic AI" icon={Sparkles} colorClass="text-primary" glowColor="rgba(255, 83, 0, 0.35)" />
                  <SkillPill name="Figma" sublabel="Design Tokens" icon={Figma} colorClass="text-[#F24E1E]" glowColor="rgba(242, 78, 30, 0.35)" />
                  <SkillPill name="Tailwind CSS" sublabel="Styling" icon={Wind} colorClass="text-[#38BDF8]" glowColor="rgba(56, 189, 248, 0.3)" />
                  <SkillPill name="Next.js" sublabel="App Router" icon={Code2} colorClass="text-white" glowColor="rgba(255, 255, 255, 0.25)" />
                  <SkillPill name="Claude Code" sublabel="CLI & AI" icon={Terminal} colorClass="text-[#D97706]" glowColor="rgba(217, 119, 6, 0.3)" />
                </div>
              ),
              (
                <div className="flex px-2 items-center">
                  <SkillPill name="Generative AI" sublabel="LLM Pipelines" icon={Brain} colorClass="text-[#a855f7]" glowColor="rgba(168, 85, 247, 0.3)" />
                  <SkillPill name="LangChain" sublabel="RAG & Chains" icon={LinkIcon} colorClass="text-[#22c55e]" glowColor="rgba(34, 197, 94, 0.3)" />
                  <SkillPill name="Python" sublabel="Automation" icon={Terminal} colorClass="text-[#3776AB]" glowColor="rgba(55, 118, 171, 0.3)" />
                  <SkillPill name="Hugging Face" sublabel="Open Models" icon={Bot} colorClass="text-[#FFD21E]" glowColor="rgba(255, 210, 30, 0.3)" />
                  <SkillPill name="Flutter" sublabel="Cross-Platform" icon={Smartphone} colorClass="text-[#02569B]" glowColor="rgba(2, 86, 155, 0.3)" />
                  <SkillPill name="Prompt Engineering" sublabel="Evals & System" icon={Sparkles} colorClass="text-[#FFD93D]" glowColor="rgba(255, 217, 61, 0.3)" />
                  <SkillPill name="UI/UX Architecture" sublabel="Human Centered" icon={Layout} colorClass="text-[#ec4899]" glowColor="rgba(236, 72, 153, 0.3)" />
                </div>
              )
            ]} 
          />
        </div>
      </section>

      {/* Projects Section */}
      <section id="portfolio" className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-12">
          <div className="relative">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-center md:text-left">
              Featured{" "}
              <span className="relative inline-block text-gradient-primary">
                Projects
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary/80 overflow-visible pointer-events-none" viewBox="0 0 100 10" fill="none" preserveAspectRatio="none">
                  <path d="M 0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <span className="font-handwriting text-white/60 text-lg block text-center md:text-left mt-1 select-none -rotate-1">
              shipped deliverables & case studies ↓
            </span>
          </div>
          <Link to="/projects" className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors">
            View Project Gallery <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-col items-center justify-center mb-12">
          {/* Hand-drawn filter arrow annotation */}
          <div className="flex items-center justify-center gap-2 mb-3 pointer-events-none select-none">
            <svg className="w-5 h-5 text-secondary/70 -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 8 Q12 18 20 8" />
              <path d="M16 6 L20 8 L18 12" />
            </svg>
            <span className="font-handwriting text-secondary text-lg font-bold -rotate-1">
              filter by domain & stack ✦
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
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
            View Project Gallery <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Contact & About Section */}
      <section id="contact" className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-12 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#2a1b14] to-[#1a100c] rounded-[2.5rem] p-10 md:p-16 border border-white/5 flex flex-col justify-between min-h-[400px] relative overflow-hidden group">
            {/* Hand-drawn sketched lightbulb & spark doodle in the background */}
            <div className="absolute top-6 right-8 opacity-20 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none select-none">
              <svg className="w-24 h-24 text-primary" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 34 C 18 28, 18 18, 26 12 C 34 6, 44 10, 46 20 C 47 26, 42 31, 38 34 L 38 42 L 26 42 Z" />
                <path d="M 28 47 L 36 47" />
                <path d="M 30 52 L 34 52" />
                <path d="M 32 4 L 32 8" strokeDasharray="2 2" />
                <path d="M 14 14 L 18 17" strokeDasharray="2 2" />
                <path d="M 50 14 L 46 17" strokeDasharray="2 2" />
                <path d="M 8 28 L 12 28" strokeDasharray="2 2" />
                <path d="M 56 28 L 52 28" strokeDasharray="2 2" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <p className="text-white/50 font-medium">I constantly try to improve myself</p>
                <span className="font-handwriting text-primary text-xl font-bold -rotate-3 select-none hidden sm:inline-block">
                  never stop exploring 🚀
                </span>
              </div>
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
              {/* Hand-Drawn Paper Airplane Doodle with Flight Loop */}
              <motion.div 
                animate={{ y: [0, -4, 0], x: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="hidden sm:flex items-center gap-2 mb-2 text-white/80 pointer-events-none select-none"
              >
                <svg className="w-24 h-8 text-white/50 overflow-visible" viewBox="0 0 100 30" fill="none" stroke="currentColor">
                  <path d="M 5 22 Q 25 28 35 15 Q 45 2 60 14 Q 75 26 90 10" strokeWidth="1.8" strokeDasharray="3 3" strokeLinecap="round" />
                  <path d="M 90 10 L 100 6 L 96 17 L 92 12 Z" fill="currentColor" />
                </svg>
                <span className="font-handwriting text-xl text-white font-bold -rotate-3">
                  drop a line anytime ✉️
                </span>
              </motion.div>

              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-4xl md:text-5xl font-bold text-white">Contact</h2>
                <span className="font-handwriting text-white/90 text-2xl -rotate-6 select-none">
                  say hello 👋
                </span>
              </div>
              <p className="text-white/80 mb-6">Make a contact via a mail or DM.</p>
              
              {/* Hand-drawn doodle pointer to action buttons */}
              <div className="hidden sm:flex items-center gap-1 text-white/70 font-handwriting text-base font-bold mb-3 select-none">
                <svg className="w-4 h-4 text-white/70 -rotate-45" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 10 Q10 16 16 10" />
                  <path d="M12 9 L16 10 L15 14" />
                </svg>
                <span>one-tap copy or connect ↓</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 relative z-20">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 px-4 h-12 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-medium text-xs md:text-sm transition-all border border-white/20 shadow-lg active:scale-95 cursor-pointer"
                  title="Click to copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? "Copied!" : "joy.thesloth@gmail.com"}</span>
                </button>
                <a href="mailto:joy.thesloth@gmail.com" className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/20 shadow-lg" title="Open Mail App">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/joydeep-das-78123522a" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/20 shadow-lg" title="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com/JoyTheSloth" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/20 shadow-lg" title="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.behance.net/joythesloth" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/20 shadow-lg" title="Behance">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M22 7h-7v-2h7v2zm.4 4.5s-.1-4.2-3.8-4.2c-3.1 0-4 2.1-4 4.1 0 2.2.8 4.4 4.2 4.4 3 0 3.7-1.8 3.7-1.8l-2.1-.9s-.3 1-1.6 1c-1.3 0-1.6-.9-1.6-1.5h5.2v-.1zm-5.2-1.1c0-1 1-1.2 1.6-1.2.9 0 1.5.5 1.5 1.2h-3.1zm-8.3 1.9c.7 0 1.2-.4 1.2-.4s.3 1.7 2.1 1.7c1.7 0 2.3-1.4 2.3-3.4 0-2.4-.8-3.7-2.6-3.7-1.7 0-1.9 1.4-1.9 1.4s-.4-1.4-2.1-1.4c-1.5 0-2 1.1-2 1.1V7.5H3.9v8.9h2.1v-3.7c0-1 1-1.1 1.3-1.1.5 0 .8.4.8.9v3.9h2.1l-.1-3.6z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/pixeldeck.design" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/20 shadow-lg" title="Instagram">
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
