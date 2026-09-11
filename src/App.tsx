import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Palette, Download, FileText, ArrowLeft, Sparkles, Eye, ArrowUpRight, Zap, Linkedin, Github, Instagram, Mail, ArrowUp } from "lucide-react";
const Home = React.lazy(() => import("./pages/Home"));
const GenAIProjects = React.lazy(() => import("./pages/GenAIProjects"));
const UiUxProjects = React.lazy(() => import("./pages/UiUxProjects"));
const AllProjects = React.lazy(() => import("./pages/AllProjects"));

function PageLoader() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-white/40 text-xs tracking-widest uppercase font-mono">Loading...</span>
    </div>
  );
}
import RotatingText from "./components/RotatingText";
import { motion, AnimatePresence } from "motion/react";
import { ThemeRevolver, themes, applyTheme } from "./components/ThemeRevolver";

function DocxPreviewModal({ 
  isOpen, 
  fileUrl, 
  title, 
  onClose 
}: { 
  isOpen: boolean; 
  fileUrl: string | null; 
  title: string; 
  onClose: () => void 
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Escape key handler
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  React.useEffect(() => {
    if (!isOpen || !fileUrl) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    Promise.all([
      fetch(fileUrl).then((res) => {
        if (!res.ok) throw new Error("Failed to load DOCX document");
        return res.arrayBuffer();
      }),
      import("docx-preview")
    ])
      .then(([buffer, { renderAsync }]) => {
        if (!isMounted || !containerRef.current) return;
        containerRef.current.innerHTML = "";
        return renderAsync(buffer, containerRef.current, undefined, {
          className: "docx-viewer",
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: true,
          useBase64URL: true,
          experimental: false
        });
      })
      .then(() => {
        if (isMounted) setLoading(false);
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Docx render error:", err);
          setError("Unable to render DOCX preview in browser. Please download to view.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, fileUrl]);

  if (!isOpen || !fileUrl) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-2 md:p-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-4xl h-[92vh] relative z-10 flex flex-col bg-[#121212] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#181818]/90 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border border-primary/30">
                DOCX
              </div>
              <div>
                <h3 className="text-white font-bold text-xs md:text-sm">{title}</h3>
                <p className="text-[10px] text-white/40">In-Browser DOCX Preview</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={fileUrl}
                download
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-background font-bold text-xs hover:bg-primary/90 transition-all shadow"
              >
                <Download className="w-3.5 h-3.5" /> Download DOCX
              </a>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Viewer Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#181818] flex justify-center relative no-scrollbar">
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#121212]/90 z-20">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-white/70 text-xs font-medium tracking-wide">Rendering DOCX document...</span>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center bg-[#121212]/90 z-20">
                <p className="text-red-400 text-sm">{error}</p>
                <a
                  href={fileUrl}
                  download
                  className="px-4 py-2 rounded-xl bg-primary text-background font-bold text-xs"
                >
                  Download DOCX
                </a>
              </div>
            )}
            <div 
              ref={containerRef} 
              className="docx-preview-wrapper w-full max-w-3xl min-h-full" 
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function ResumeDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeDocxPreview, setActiveDocxPreview] = React.useState<{ url: string; title: string } | null>(null);

  // Escape key handler
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen || activeDocxPreview) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => { 
      document.body.style.overflow = ''; 
      document.documentElement.style.overflow = ''; 
    };
  }, [isOpen, activeDocxPreview]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-3xl relative z-10 pointer-events-none max-h-[95vh] overflow-y-auto no-scrollbar scroll-smooth"
            >
              <div className="glass-card border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-[0_0_100px_rgba(0,0,0,0.8)] pointer-events-auto bg-[#080808]/95 backdrop-blur-3xl relative overflow-hidden my-4">
                 {/* Background Glows */}
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />
                 <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/4" />

                 <button 
                   onClick={onClose}
                   className="absolute top-6 right-6 md:top-8 md:right-8 p-2.5 md:p-3 rounded-lg md:rounded-xl bg-white/5 hover:bg-white/10 transition-all text-white/50 hover:text-white z-20 border border-white/5 hover:border-white/20 active:scale-90"
                   aria-label="Close"
                 >
                   <X className="w-4 h-4 md:w-5 md:h-5" />
                 </button>

                 <div className="relative z-10 text-center mb-6 md:mb-10 px-2 md:px-0 mt-4 md:mt-0">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-3 md:mb-5">
                     <FileText className="w-3 md:w-3.5 h-3 md:h-3.5" /> Portal
                   </div>
                   <h2 className="text-2xl md:text-4xl font-headline font-bold mb-2 md:mb-3 tracking-tight text-gradient-primary leading-none">Resume Hub</h2>
                   <p className="text-white/40 text-xs md:text-sm max-w-[280px] md:max-w-sm mx-auto leading-relaxed">Choose a version of my background to dive deeper.</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto gap-4 md:gap-6 relative z-10 mb-6 md:mb-8">
                   {/* UI/UX Resume Card */}
                   <div className="group relative flex flex-col items-center gap-3 md:gap-4 p-5 md:p-6 rounded-[1.2rem] md:rounded-[1.8rem] bg-white/5 border border-white/5 hover:border-primary/45 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden shadow-xl">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/15 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-[#111] border border-white/5 flex items-center justify-center text-primary group-hover:scale-105 group-hover:bg-primary z-10 group-hover:text-background transition-all duration-500 relative shadow-inner">
                         <Palette className="w-6 h-6 md:w-8 md:h-8" />
                      </div>

                      <div className="text-center z-10">
                         <h3 className="font-bold text-white text-md md:text-lg mb-0.5">UI/UX Resume</h3>
                         <p className="text-[7px] md:text-[9px] text-white/30 font-medium tracking-[0.2em] uppercase">Visual & Product Focus</p>
                      </div>

                      <div className="flex gap-2 w-full pt-1.5 md:pt-3 z-10">
                         <button 
                           onClick={() => setActiveDocxPreview({ url: "/UIUX_Resume.docx", title: "UI/UX Resume" })}
                           className="flex-1 py-2.5 rounded-lg md:rounded-xl bg-primary text-background font-bold text-[8px] md:text-[9px] uppercase tracking-[0.1em] hover:bg-primary/90 transition-all text-center flex items-center justify-center gap-1.5 shadow active:scale-95 cursor-pointer"
                         >
                           <Eye className="w-3.5 h-3.5" /> Preview
                         </button>
                         <a 
                           href="/UIUX_Resume.docx" 
                           download="UIUX_Resume.docx"
                           className="flex-1 py-2.5 rounded-lg md:rounded-xl bg-white/5 text-white/80 hover:text-white text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] hover:bg-white/10 transition-all text-center border border-white/10 flex items-center justify-center gap-1.5 active:scale-95 shadow"
                         >
                           <Download className="w-3.5 h-3.5" /> Download
                         </a>
                      </div>
                   </div>

                   {/* Dev CV Card */}
                   <div className="group relative flex flex-col items-center gap-3 md:gap-4 p-5 md:p-6 rounded-[1.2rem] md:rounded-[1.8rem] bg-white/5 border border-white/5 hover:border-secondary/45 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden shadow-xl">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/15 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-[#111] border border-white/5 flex items-center justify-center text-secondary group-hover:scale-105 group-hover:bg-secondary z-10 group-hover:text-background transition-all duration-500 relative shadow-inner">
                         <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
                      </div>

                      <div className="text-center z-10">
                         <h3 className="font-bold text-white text-md md:text-lg mb-0.5">Dev Resume</h3>
                         <p className="text-[7px] md:text-[9px] text-white/30 font-medium tracking-[0.2em] uppercase">Engineering Focus</p>
                      </div>

                      <div className="flex gap-2 w-full pt-1.5 md:pt-3 z-10">
                         <button 
                           onClick={() => setActiveDocxPreview({ url: "/DEV_Resume.docx", title: "Dev Resume" })}
                           className="flex-1 py-2.5 rounded-lg md:rounded-xl bg-secondary text-background font-bold text-[8px] md:text-[9px] uppercase tracking-[0.1em] hover:bg-secondary/90 transition-all text-center flex items-center justify-center gap-1.5 shadow active:scale-95 cursor-pointer"
                         >
                           <Eye className="w-3.5 h-3.5" /> Preview
                         </button>
                         <a 
                           href="/DEV_Resume.docx" 
                           download="DEV_Resume.docx"
                           className="flex-1 py-2.5 rounded-lg md:rounded-xl bg-white/5 text-white/80 hover:text-white text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] hover:bg-white/10 transition-all text-center border border-white/10 flex items-center justify-center gap-1.5 active:scale-95 shadow"
                         >
                           <Download className="w-3.5 h-3.5" /> Download
                         </a>
                      </div>
                   </div>
                 </div>

                 <div className="relative z-10 flex justify-center pb-2 md:pb-0">
                   <button 
                     onClick={onClose}
                     className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] group"
                   >
                     <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" /> 
                     Keep Browsing
                   </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <DocxPreviewModal
        isOpen={Boolean(activeDocxPreview)}
        fileUrl={activeDocxPreview?.url || null}
        title={activeDocxPreview?.title || ""}
        onClose={() => setActiveDocxPreview(null)}
      />
    </>
  );
}



function Navbar({ onResumeOpen, activeTheme, onThemeChange }: { onResumeOpen: () => void; activeTheme: string; onThemeChange: (id: string) => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    setIsOpen(false);
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-outline-variant/5">
      <div className="flex justify-between items-center px-6 md:px-12 py-6 max-w-screen-2xl mx-auto">
        <Link to="/" className="text-xl md:text-2xl font-headline font-bold flex items-center gap-2">
          Joydeep Das
          <span className="hidden md:block">,</span>
          <div className="hidden md:block">
            <RotatingText
              texts={['UI/UX Designer', 'Product Designer', 'AI Engineer', 'Gen AI Developer', 'Front-end Developer']}
              mainClassName="text-white/40 font-normal"
              staggerDuration={0.025}
              splitBy="characters"
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              rotationInterval={3000}
            />
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="/#portfolio" onClick={(e) => handleNavClick(e, '#portfolio')} className="font-headline font-medium text-white/70 hover:text-white transition-colors">Portfolio</a>
          <a href="/#skills" onClick={(e) => handleNavClick(e, '#skills')} className="font-headline font-medium text-white/70 hover:text-white transition-colors">Skills</a>
          <a href="/#contact" onClick={(e) => handleNavClick(e, '#contact')} className="font-headline font-medium text-white/70 hover:text-white transition-colors">Contact</a>
          <Link to="/projects" className="font-headline font-medium text-white/70 hover:text-white transition-colors">Project Gallery</Link>
          <button 
            onClick={onResumeOpen}
            className="group relative inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#3b4ff6] hover:bg-[#3245e8] text-white font-extrabold text-sm tracking-tight shadow-[0_5px_0_#000000] hover:shadow-[0_6px_0_#000000] hover:-translate-y-0.5 active:translate-y-[4px] active:shadow-[0_1px_0_#000000] transition-all duration-150 cursor-pointer select-none"
          >
            <span>Resume / CV</span>
            {/* Top-right floating lightning badge */}
            <span className="absolute -top-2.5 -right-2 w-6 h-6 rounded-full bg-[#ffcc00] border-2 border-black flex items-center justify-center shadow-[0_2px_0_#000000] pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200">
              <Zap className="w-3.5 h-3.5 fill-black text-black stroke-[2.5]" />
            </span>
          </button>
          <ThemeRevolver activeTheme={activeTheme} onThemeChange={onThemeChange} />
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              <a href="/#portfolio" onClick={(e) => handleNavClick(e, '#portfolio')} className="text-2xl font-headline font-bold text-white/70 hover:text-white">Portfolio</a>
              <a href="/#skills" onClick={(e) => handleNavClick(e, '#skills')} className="text-2xl font-headline font-bold text-white/70 hover:text-white">Skills</a>
              <a href="/#contact" onClick={(e) => handleNavClick(e, '#contact')} className="text-2xl font-headline font-bold text-white/70 hover:text-white">Contact</a>
              <Link to="/projects" onClick={() => setIsOpen(false)} className="text-2xl font-headline font-bold text-white/70 hover:text-white">Project Gallery</Link>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onResumeOpen();
                }}
                className="group relative inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#3b4ff6] hover:bg-[#3245e8] text-white font-extrabold text-base tracking-tight shadow-[0_5px_0_#000000] active:translate-y-[4px] active:shadow-[0_1px_0_#000000] transition-all duration-150 cursor-pointer select-none w-full mt-2"
              >
                <span>Resume / CV</span>
                <span className="absolute -top-2.5 -right-1 w-6 h-6 rounded-full bg-[#ffcc00] border-2 border-black flex items-center justify-center shadow-[0_2px_0_#000000] pointer-events-none">
                  <Zap className="w-3.5 h-3.5 fill-black text-black stroke-[2.5]" />
                </span>
              </button>
              <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                <span className="text-xs font-bold text-white/40 uppercase tracking-[0.15em]">Accent Theme</span>
                <div className="flex gap-4 items-center mt-1">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => onThemeChange(t.id)}
                      className="w-9 h-9 rounded-full border flex items-center justify-center relative cursor-pointer active:scale-90 transition-all"
                      style={{
                        backgroundColor: t.primaryColor === "#ffffff" ? "#111" : t.primaryColor,
                        boxShadow: activeTheme === t.id ? `0 0 12px ${t.primaryColor}` : "none",
                        borderColor: activeTheme === t.id ? "var(--theme-primary, #ffb68d)" : "rgba(255,255,255,0.1)"
                      }}
                      title={t.name}
                    >
                      <div 
                        className="w-3.5 h-3.5 rounded-full" 
                        style={{ 
                          backgroundColor: t.id === "default" ? "#eb7e37" : t.id === "blue" ? "#219ebc" : t.id === "wine" ? "#c9184a" : t.id === "pink" ? "#ff49db" : "#fff" 
                        }} 
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    // Disable browser scroll restoration so it doesn't jump to previous position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Use instant scroll on route change to prevent flash of wrong position
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [location]);

  return null;
}

function Footer({ onResumeOpen }: { onResumeOpen?: () => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full relative pt-12 pb-4 px-4 sm:px-8 overflow-hidden">
      {/* Floating Modern Slab Card */}
      <div className="max-w-7xl mx-auto rounded-3xl md:rounded-[2.5rem] bg-[#141419]/90 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl p-8 sm:p-12 lg:p-14 relative overflow-hidden z-10">
        {/* Subtle Ambient Radial Highlights */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-secondary/10 blur-[90px] rounded-full pointer-events-none" />

        {/* Top Grid: Brand & Multi-Column Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-10 border-b border-white/[0.08] relative z-10">
          
          {/* Left Column: Brand, Bio, and Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-flex items-center gap-3 group mb-4">
                <div className="w-10 h-10 rounded-2xl bg-primary text-background font-black flex items-center justify-center text-lg font-headline shadow-lg group-hover:scale-105 transition-transform">
                  JD
                </div>
                <div>
                  <span className="text-2xl font-headline font-extrabold text-white tracking-tight">
                    Joydeep Das<span className="text-primary font-black">.</span>
                  </span>
                </div>
              </Link>
              <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed max-w-sm mb-6">
                Architecting intelligent autonomous AI systems, high-converting product UI/UX, and production-grade web applications.
              </p>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <a
                href="https://x.com/JoyTheSloth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                title="X / Twitter"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/pixeldeck.design"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/joydeep-das-78123522a"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/JoyTheSloth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.behance.net/joythesloth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                title="Behance"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M22 7h-7v-2h7v2zm.4 4.5s-.1-4.2-3.8-4.2c-3.1 0-4 2.1-4 4.1 0 2.2.8 4.4 4.2 4.4 3 0 3.7-1.8 3.7-1.8l-2.1-.9s-.3 1-1.6 1c-1.3 0-1.6-.9-1.6-1.5h5.2v-.1zm-5.2-1.1c0-1 1-1.2 1.6-1.2.9 0 1.5.5 1.5 1.2h-3.1zm-8.3 1.9c.7 0 1.2-.4 1.2-.4s.3 1.7 2.1 1.7c1.7 0 2.3-1.4 2.3-3.4 0-2.4-.8-3.7-2.6-3.7-1.7 0-1.9 1.4-1.9 1.4s-.4-1.4-2.1-1.4c-1.5 0-2 1.1-2 1.1V7.5H3.9v8.9h2.1v-3.7c0-1 1-1.1 1.3-1.1.5 0 .8.4.8.9v3.9h2.1l-.1-3.6z"/>
                </svg>
              </a>
              <a
                href="mailto:joy.thesloth@gmail.com"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                title="Email Me"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Columns: Navigation, Focus, Connect */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Navigation */}
            <div>
              <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-white/90 mb-4">
                Explore
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/50">
                <li><a href="/#portfolio" className="hover:text-primary transition-colors">Featured Works</a></li>
                <li><a href="/#skills" className="hover:text-primary transition-colors">Core Expertise</a></li>
                <li><Link to="/projects" className="hover:text-primary transition-colors">Project Archive</Link></li>
                <li><Link to="/ui-ux" className="hover:text-primary transition-colors">UI/UX Studies</Link></li>
                <li><Link to="/gen-ai" className="hover:text-primary transition-colors">Gen AI Systems</Link></li>
              </ul>
            </div>

            {/* Column 2: Focus Areas */}
            <div>
              <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-white/90 mb-4">
                Core Stack
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/50">
                <li><span className="hover:text-white transition-colors cursor-default">Autonomous Agents</span></li>
                <li><span className="hover:text-white transition-colors cursor-default">Next.js & React</span></li>
                <li><span className="hover:text-white transition-colors cursor-default">RAG Pipelines</span></li>
                <li><span className="hover:text-white transition-colors cursor-default">Design Systems</span></li>
                <li><span className="hover:text-white transition-colors cursor-default">LangChain & Python</span></li>
              </ul>
            </div>

            {/* Column 3: Direct Connect */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-white/90 mb-4">
                Contact
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/50">
                <li>
                  <a href="mailto:joy.thesloth@gmail.com" className="text-primary hover:underline break-all">
                    joy.thesloth@gmail.com
                  </a>
                </li>
                {onResumeOpen && (
                  <li>
                    <button 
                      onClick={onResumeOpen}
                      className="hover:text-white text-left transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Resume Hub</span>
                      <ArrowUpRight className="w-3 h-3 text-primary" />
                    </button>
                  </li>
                )}
                <li>
                  <a href="https://www.linkedin.com/in/joydeep-das-78123522a" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 opacity-50" />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/JoyTheSloth" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3 opacity-50" />
                  </a>
                </li>
                <li>
                  <a href="https://www.behance.net/joythesloth" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>Behance</span>
                    <ArrowUpRight className="w-3 h-3 opacity-50" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Rights, Location, Back to Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-white/40 relative z-10">
          <p>© 2026 Joydeep Das. All rights reserved.</p>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Work
            </span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="hidden md:inline">Kolkata, India</span>
            <span className="text-white/20">|</span>
            <button 
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1 font-bold cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Massive Architectural Ghost Watermark (like ZenEstate) */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none -mt-4 sm:-mt-8 md:-mt-12 pb-2">
        <div className="text-[14vw] font-black text-white/[0.028] tracking-tight uppercase leading-none text-center font-headline whitespace-nowrap">
          JOYDEEP DAS
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = React.useState(false);
  const [activeTheme, setActiveTheme] = React.useState("default");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") || "default";
    setActiveTheme(saved);
    applyTheme(saved);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setActiveTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="min-h-screen soul-gradient selection:bg-primary selection:text-background overflow-x-hidden flex flex-col">
        <Navbar 
          onResumeOpen={() => setIsResumeOpen(true)} 
          activeTheme={activeTheme} 
          onThemeChange={handleThemeChange} 
        />
        <div className="flex-1">
          <React.Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gen-ai" element={<GenAIProjects />} />
              <Route path="/ui-ux" element={<UiUxProjects />} />
              <Route path="/projects" element={<AllProjects />} />
            </Routes>
          </React.Suspense>
        </div>
        <Footer onResumeOpen={() => setIsResumeOpen(true)} />
        
        {/* Global Modal Layer */}
        <ResumeDialog isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
