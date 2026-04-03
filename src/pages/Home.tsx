import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, Palette, Brain, Code2, Terminal, Cpu, Wind, ChevronDown, Atom, FileCode2, Figma, Layout, MessageSquare, Sparkles, Link as LinkIcon, ArrowUpRight, Mail, Linkedin, Bot, Instagram, Github, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollVelocity from "../components/ScrollVelocity";
import { ProjectTile } from "../components/ProjectTile";
import DinoWidget from "../components/DinoWidget";

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
  const isExternal = linkTo.startsWith('http');
  const linkClasses = `w-fit flex items-center gap-2 font-bold ${colorClass} group/btn cursor-pointer text-sm md:text-base`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative overflow-hidden rounded-2xl h-full min-h-[380px] transition-all duration-500 hover:-translate-y-2 flex flex-col"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-30 group-hover:opacity-50 transition-opacity`} />
      <div className="relative flex-1 p-8 md:p-10 flex flex-col justify-between border border-outline-variant/10 group-hover:border-primary/30 rounded-2xl glass-card">
        <div>
          <div className={`w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
            <Icon className={`w-7 h-7 ${colorClass}`} />
          </div>
          
          {secondaryLinkText && secondaryLinkTo && (
            <div className="absolute top-8 right-8 md:top-10 md:right-10 z-20">
              {secondaryLinkTo.startsWith('http') ? (
                <a href={secondaryLinkTo} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs md:text-sm font-medium hover:bg-white/10 hover:text-white transition-colors backdrop-blur-md">
                  {secondaryLinkText}
                </a>
              ) : (
                <Link to={secondaryLinkTo} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs md:text-sm font-medium hover:bg-white/10 hover:text-white transition-colors backdrop-blur-md">
                  {secondaryLinkText}
                </Link>
              )}
            </div>
          )}

          <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4">{title}</h3>
          <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">{description}</p>
        </div>
        <div className="flex flex-col gap-3">
          {isExternal ? (
            <a href={linkTo} target="_blank" rel="noopener noreferrer" className={linkClasses}>
              {linkText}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
            </a>
          ) : (
            <Link to={linkTo} className={linkClasses}>
              {linkText}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
            </Link>
          )}
        </div>
      </div>
      <div className={`absolute -right-20 -bottom-20 w-64 h-64 ${colorClass.replace('text-', 'bg-')}/10 blur-3xl group-hover:opacity-100 opacity-0 transition-opacity pointer-events-none`} />
    </motion.div>
  );
};

const ExperienceItem = ({ 
  title, 
  company, 
  period, 
  description, 
  colorClass 
}: { 
  title: string; 
  company: string; 
  period: string; 
  description: React.ReactNode; 
  colorClass: string; 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      initial={false}
      className={`group relative pl-8 border-l border-white/5 hover:border-primary/30 transition-all duration-500`}
    >
      {/* Timeline Bullet */}
      <div className={`absolute left-[-5px] top-2 w-[9px] h-[9px] rounded-full bg-white/20 group-hover:bg-primary transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]`} />
      
      <div 
        className="cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="text-xl md:text-2xl font-bold text-white/90 group-hover:text-white transition-colors tracking-tight">{title}</h4>
            <div className="flex items-center gap-3 mt-1 mb-3">
              <span className={`font-bold text-sm md:text-base ${colorClass}`}>{company}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white/40 text-xs md:text-sm font-medium">{period}</span>
            </div>
          </div>
          <button className={`p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all`}>
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

const ArsenalTile = ({ name, icon: Icon, colorClass, imgUrl, animate }: { name: string; icon?: any; colorClass?: string; imgUrl?: string; animate?: any }) => (
  <motion.div 
    whileHover={{ scale: 1.02, y: -2 }}
    className="glass-card rounded-2xl p-4 flex items-center gap-4 border border-white/5 hover:border-white/20 transition-all cursor-default group"
  >
    <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
      <motion.div
        animate={animate}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {imgUrl ? (
          <img src={imgUrl} alt={name} className="w-7 h-7 object-contain drop-shadow-md" referrerPolicy="no-referrer" />
        ) : (
          Icon && <Icon className={`w-7 h-7 ${colorClass}`} />
        )}
      </motion.div>
    </div>
    <span className="text-base font-bold text-white/90 group-hover:text-white transition-colors">{name}</span>
  </motion.div>
);

const SkillPill = ({ name, icon, colorTheme }: { name: string, icon: string, colorTheme: 'primary' | 'secondary' | 'blue' | 'white' }) => {
  const themeClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    blue: "bg-[#89CFF0]/10 text-[#89CFF0] border-[#89CFF0]/20",
    white: "bg-white/5 text-white border-white/10",
  };

  return (
    <span className={`inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-full border text-base md:text-lg lg:text-xl font-bold ${themeClasses[colorTheme]}`}>
      <img src={icon} alt={name} className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 drop-shadow-md" referrerPolicy="no-referrer" />
      {name}
    </span>
  );
};

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  
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
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-9 glass-card border border-white/10 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden flex flex-col justify-between min-h-[400px] md:min-h-[500px]"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
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
                <div className="flex flex-col md:flex-row gap-2">
                  <a href="https://instagram.com/pixeldeck.design" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                    <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a href="https://linkedin.com/in/joydeep-das-78123522a" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                    <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a href="mailto:joy.thesloth@gmail.com" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                </div>
              </div>

              <h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-8 max-w-2xl">
                Hi, I'm <span className="text-primary">Joydeep</span>.
              </h1>
              
              <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-xl">
                A multidisciplinary <span className="text-white font-medium">UI/UX Designer</span>, 
                <span className="text-secondary font-medium"> Gen AI Developer</span>, and 
                <span className="text-[#89CFF0] font-medium"> Front-end Developer</span> crafting high-performance digital experiences.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-4 mt-12">
              <a href="#portfolio" className="bg-primary text-background px-8 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform">
                View Case Studies
              </a>
              <button 
                onClick={() => setIsContactOpen(true)} 
                className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>

          {/* Right Card: Avatar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 rounded-3xl md:rounded-[2.5rem] overflow-hidden relative group min-h-[300px] md:min-h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF4500]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-white/20" />
            
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
            >🦖</motion.div>
            <motion.div 
              animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-1/4 right-8 text-lg opacity-10 pointer-events-none"
            >🌋</motion.div>
            <motion.div 
              animate={{ scale: [0.8, 1, 0.8], rotate: [0, 45, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute top-1/3 right-1/4 text-sm opacity-10 pointer-events-none"
            >🥚</motion.div>

            <div className="absolute inset-0 flex flex-col p-4 md:p-6 lg:p-8">
              <DinoWidget />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Expertise Section */}
      <section id="skills" className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-12 md:mb-16">
        <h2 className="font-headline text-4xl font-bold mb-12 text-center">Core Expertise</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ExpertiseCard 
            title="UI/UX Design"
            description="Creating intuitive, research-driven interfaces that balance aesthetic beauty with functional clarity."
            icon={Palette}
            colorClass="text-primary"
            gradientClass="from-primary-container to-background"
            linkText="View Design Portfolio"
            linkTo="https://www.behance.net/joythesloth"
            secondaryLinkText="View Case Studies"
            secondaryLinkTo="/ui-ux"
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
            <div className="glass-card border border-white/10 rounded-3xl p-8 md:p-10 h-full relative overflow-hidden group/exp">
              {/* Decorative background components */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[100px] rounded-full pointer-events-none group-hover/exp:bg-primary/10 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Experience</h2>
                </div>
                <div className="space-y-10">
                <ExperienceItem 
                  title="App Designer"
                  company="Modern Mahal"
                  period="Aug 2025 — Nov 2025"
                  colorClass="text-[#89CFF0]"
                  description={
                    <ul className="list-disc list-outside ml-5 space-y-2">
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
                    <ul className="list-disc list-outside ml-5 space-y-2">
                      <li>Developed and deployed LLM-powered web applications using Google Gemini API for summarization, Q&A, and multi-turn conversational workflows</li>
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
                    <ul className="list-disc list-outside ml-5 space-y-2">
                      <li>Designed user-centric interfaces that enhance community engagement and streamline event discovery</li>
                      <li>Built a consistent design system to unify app visuals and marketing assets</li>
                      <li>Created and executed social media campaigns to boost reach, downloads, and brand identity</li>
                      <li>Collaborated with the content team to deliver Gen Z-friendly posts, reels, and stories across platforms</li>
                    </ul>
                  }
                />
                <ExperienceItem 
                  title="Web Designer"
                  company="YGSD"
                  period="Sep 2024 — Nov 2024"
                  colorClass="text-[#89CFF0]"
                  description={
                    <div className="space-y-6">
                      <div>
                        <p className="font-medium text-white mb-2">Project: Mourya Urja Matrimonial <span className="text-sm text-white/40 font-normal ml-2">(Oct 2024 — Nov 2024)</span></p>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                          <li>Designed user-friendly, cohesive web layouts in Figma for a trusted matrimonial brand</li>
                          <li>Integrated client feedback to enhance user experience and accessibility</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-white mb-2">Project: Veliciae Jewellery <span className="text-sm text-white/40 font-normal ml-2">(Sep 2024 — Oct 2024)</span></p>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                          <li>Created visually stunning and user-friendly web designs using Figma, ensuring a cohesive brand identity</li>
                          <li>Collaborated with developers to translate project requirements into effective design solutions</li>
                        </ul>
                      </div>
                    </div>
                  }
                />
              </div>
              </div>
            </div>
          </div>

          {/* Arsenal */}
          <div className="lg:col-span-4">
            <div className="glass-card border border-white/10 rounded-3xl p-6 md:p-8 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8">Arsenal</h2>
                <div className="grid grid-cols-2 gap-4">
                  <ArsenalTile 
                    name="React" 
                    icon={Atom}
                    colorClass="text-[#61DAFB]"
                    animate={{ rotate: 360 }}
                  />
                  <ArsenalTile 
                    name="Figma" 
                    icon={Figma}
                    colorClass="text-[#F24E1E]"
                    animate={{ scale: [1, 1.1, 1] }}
                  />
                  <ArsenalTile 
                    name="Python" 
                    icon={Terminal}
                    colorClass="text-[#3776AB]"
                    animate={{ opacity: [1, 0.5, 1] }}
                  />
                  <ArsenalTile 
                    name="Hugging Face" 
                    imgUrl="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Hugging%20Face.png" 
                    animate={{ y: [0, -4, 0] }}
                  />
                  <ArsenalTile name="Ollama" icon={Bot} colorClass="text-secondary" animate={{ rotate: [-10, 10, -10] }} />
                  <ArsenalTile name="Tailwind" icon={Wind} colorClass="text-[#38BDF8]" animate={{ x: [-2, 2, -2] }} />
                  <ArsenalTile name="TypeScript" icon={FileCode2} colorClass="text-[#3178C6]" animate={{ scale: [1, 1.05, 1] }} />
                  <ArsenalTile name="LangChain" icon={LinkIcon} colorClass="text-white" animate={{ rotate: [0, 180, 360] }} />
                  <ArsenalTile name="Prompt Eng." icon={Sparkles} colorClass="text-secondary" animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} />
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
                <SkillPill name="React" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Atom%20Symbol.png" colorTheme="primary" />
                <SkillPill name="Hugging Face" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Hugging%20Face.png" colorTheme="secondary" />
                <SkillPill name="Tailwind CSS" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Dashing%20Away.png" colorTheme="blue" />
                <SkillPill name="TypeScript" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Blue%20Book.png" colorTheme="white" />
                <SkillPill name="Figma" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Artist%20Palette.png" colorTheme="primary" />
                <SkillPill name="Python" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Snake.png" colorTheme="secondary" />
              </div>
            ),
            (
              <div className="flex gap-4 md:gap-6 px-2 md:px-3 items-center">
                <SkillPill name="Generative AI" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Brain.png" colorTheme="white" />
                <SkillPill name="UI/UX Design" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Desktop%20Computer.png" colorTheme="primary" />
                <SkillPill name="LLMs" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Speech%20Balloon.png" colorTheme="secondary" />
                <SkillPill name="Prompt Engineering" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Sparkles.png" colorTheme="blue" />
                <SkillPill name="LangChain" icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Link.png" colorTheme="white" />
              </div>
            )
          ]} 
        />
      </section>

      {/* Projects Section */}
      <section id="portfolio" className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-12 md:mb-16">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Featured Projects</h2>
          <Link to="/projects" className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors">
            View All Projects <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectTile 
            title="MediRAG"
            subtitle="Clinical-grade hallucination detection"
            imgUrl="/medirag-thumbnail.png"
            delay={0.1}
            tags={["Gen AI"]}
            githubUrl="https://github.com/JoyTheSloth/MediRAG-3.0"
            siteUrl="#"
          />
          <ProjectTile 
            title="Bacsense"
            subtitle="IoT Biosensor Dashboard"
            imgUrl="/bacsense-thumbnail.png"
            delay={0.2}
            tags={["Gen AI"]}
            githubUrl="https://github.com/JoyTheSloth/BacSense-2.0"
            siteUrl="#"
          />
          <ProjectTile 
            title="Kryptonpad"
            subtitle="kryptonpad.io ↗"
            imgUrl="https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80&w=1600"
            delay={0.3}
            tags={["Gen AI"]}
          />
          <ProjectTile 
            title="Web3preneur"
            subtitle="www.web3preneur.com ↗"
            imgUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600"
            delay={0.4}
            tags={["Gen AI"]}
          />
          <ProjectTile 
            title="2GatherApp"
            subtitle="Community Engagement"
            imgUrl="/2gather.png"
            delay={0.1}
            tags={["UI/UX"]}
          />
          <ProjectTile 
            title="Mourya Urja Matrimonial"
            subtitle="Matrimonial Platform"
            imgUrl="/mouryaurja.png"
            delay={0.2}
            tags={["UI/UX"]}
          />
          <ProjectTile 
            title="Modern Mahal"
            subtitle="Real Estate Platform"
            imgUrl="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600"
            delay={0.3}
            tags={["UI/UX"]}
          />
          <ProjectTile 
            title="Veliciae"
            subtitle="Jewellery E-commerce"
            imgUrl="/veliciae.png"
            delay={0.4}
            tags={["UI/UX"]}
          />
        </div>
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
