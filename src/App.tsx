import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Palette, Download, FileText, ArrowLeft, Sparkles, Eye } from "lucide-react";
import { renderAsync } from "docx-preview";
import Home from "./pages/Home";
import GenAIProjects from "./pages/GenAIProjects";
import UiUxProjects from "./pages/UiUxProjects";
import AllProjects from "./pages/AllProjects";
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

  React.useEffect(() => {
    if (!isOpen || !fileUrl) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(fileUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load DOCX document");
        return res.arrayBuffer();
      })
      .then((buffer) => {
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
          <Link to="/projects" className="font-headline font-medium text-white/70 hover:text-white transition-colors">Projects</Link>
          <button 
            onClick={onResumeOpen}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-background font-extrabold hover:bg-primary/95 hover:scale-105 active:scale-95 transition-all text-sm shadow-[0_0_15px_rgba(255,182,141,0.35)] hover:shadow-[0_0_25px_rgba(255,182,141,0.6)]"
          >
            Resume / CV
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
              <Link to="/projects" onClick={() => setIsOpen(false)} className="text-2xl font-headline font-bold text-white/70 hover:text-white">Projects</Link>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onResumeOpen();
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-primary text-background font-bold text-lg"
              >
                Resume / CV
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

function Footer() {
  return (
    <footer className="bg-background w-full py-12 px-6 md:px-12 border-t border-outline-variant/5">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/40 text-sm">© 2026 Joydeep Das. Crafted with Intentional Asymmetry.</p>
        <div className="flex flex-wrap justify-center gap-8">
          <a href="https://www.linkedin.com/in/joydeep-das-78123522a" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all text-sm">LinkedIn</a>
          <a href="https://github.com/JoyTheSloth" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all text-sm">GitHub</a>
          <a href="https://www.behance.net/joythesloth" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all text-sm">Behance</a>
          <a href="https://www.instagram.com/pixeldeck.design?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all text-sm">@pixeldeck.design</a>
        </div>
        <div className="text-primary-container font-headline font-bold text-lg">
          Stay Curious.
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gen-ai" element={<GenAIProjects />} />
            <Route path="/ui-ux" element={<UiUxProjects />} />
            <Route path="/projects" element={<AllProjects />} />
          </Routes>
        </div>
        <Footer />
        
        {/* Global Modal Layer */}
        <ResumeDialog isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
