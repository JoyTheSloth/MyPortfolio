/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Palette, Sparkles, Download, FileText, ArrowLeft } from "lucide-react";
import Home from "./pages/Home";
import GenAIProjects from "./pages/GenAIProjects";
import UiUxProjects from "./pages/UiUxProjects";
import AllProjects from "./pages/AllProjects";
import RotatingText from "./components/RotatingText";
import { motion, AnimatePresence } from "motion/react";


function ResumeDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
            className="w-full max-w-2xl relative z-10 pointer-events-none max-h-[95vh] overflow-y-auto no-scrollbar scroll-smooth"
          >
            <div className="glass-card border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-14 shadow-[0_0_100px_rgba(0,0,0,0.8)] pointer-events-auto bg-[#080808]/95 backdrop-blur-3xl relative overflow-hidden my-4">
               {/* Background Glows */}
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/4" />

               <button 
                 onClick={onClose}
                 className="absolute top-6 right-6 md:top-10 md:right-10 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-white/50 hover:text-white z-20 border border-white/5 hover:border-white/20 active:scale-90"
                 aria-label="Close"
               >
                 <X className="w-5 h-5 md:w-6 md:h-6" />
               </button>

               <div className="relative z-10 text-center mb-8 md:mb-14 px-2 md:px-0 mt-4 md:mt-0">
                 <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-4 md:mb-6">
                   <FileText className="w-3 md:w-3.5 h-3 md:h-3.5" /> Portal
                 </div>
                 <h2 className="text-3xl md:text-6xl font-headline font-bold mb-3 md:mb-5 tracking-tight text-gradient-primary leading-none">Resume Hub</h2>
                 <p className="text-white/40 text-xs md:text-base max-w-[280px] md:max-w-sm mx-auto leading-relaxed">Choose a version of my background to dive deeper.</p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 relative z-10 mb-8 md:mb-14">
                 {/* UI/UX Resume Card */}
                 <div className="group relative flex flex-col items-center gap-4 md:gap-6 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-white/10 transition-all duration-700 hover:-translate-y-2 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-[#111] border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary z-10 group-hover:text-background transition-all duration-700 relative shadow-inner">
                       <Palette className="w-8 h-8 md:w-10 md:h-10" />
                    </div>

                    <div className="text-center z-10">
                       <h3 className="font-bold text-white text-lg md:text-2xl mb-0.5 md:mb-1">UI/UX</h3>
                       <p className="text-[8px] md:text-[10px] text-white/30 font-medium tracking-[0.2em] uppercase">Visual Focus</p>
                    </div>

                    <div className="flex gap-2 md:gap-3 w-full pt-2 md:pt-4 z-10">
                       <a 
                         href="/Joydeep_Das_UIUX_Resume.pdf" 
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white/5 text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] hover:bg-primary hover:text-background transition-all text-center border border-white/10 hover:border-primary shadow-lg"
                       >
                         Preview
                       </a>
                       <a 
                         href="/Joydeep_Das_UIUX_Resume.pdf" 
                         download="Joydeep_Das_UIUX_Resume.pdf"
                         className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 text-white/50 hover:text-white hover:bg-primary hover:text-background transition-all relative group/dl border border-white/10 hover:border-primary shadow-lg"
                       >
                         <Download className="w-4 h-4 md:w-5 md:h-5" />
                       </a>
                    </div>
                 </div>

                 {/* Gen AI Resume Card */}
                 <div className="group relative flex flex-col items-center gap-4 md:gap-6 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-secondary/40 hover:bg-white/10 transition-all duration-700 hover:-translate-y-2 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-[#111] border border-white/5 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary z-10 group-hover:text-background transition-all duration-700 relative shadow-inner">
                       <Sparkles className="w-8 h-8 md:w-10 md:h-10" />
                    </div>

                    <div className="text-center z-10">
                       <h3 className="font-bold text-white text-lg md:text-2xl mb-0.5 md:mb-1">Resume</h3>
                       <p className="text-[8px] md:text-[10px] text-white/30 font-medium tracking-[0.2em] uppercase">Tech Focus</p>
                    </div>

                    <div className="flex gap-2 md:gap-3 w-full pt-2 md:pt-4 z-10">
                       <a 
                         href="/Joydeep_Das_Dev_Resume.pdf" 
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white/5 text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] hover:bg-secondary hover:text-background transition-all text-center border border-white/10 hover:border-secondary shadow-lg"
                       >
                         Preview
                       </a>
                       <a 
                         href="/Joydeep_Das_Dev_Resume.pdf" 
                         download="Joydeep_Das_Dev_Resume.pdf"
                         className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 text-white/50 hover:text-white hover:bg-secondary hover:text-background transition-all relative group/dl border border-white/10 hover:border-secondary shadow-lg"
                       >
                         <Download className="w-4 h-4 md:w-5 md:h-5" />
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
  );
}

function Navbar({ onResumeOpen }: { onResumeOpen: () => void }) {
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
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold hover:bg-primary/20 transition-all text-sm"
          >
            Resume / CV
          </button>
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

  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="min-h-screen soul-gradient selection:bg-primary selection:text-background overflow-x-hidden flex flex-col">
        <Navbar onResumeOpen={() => setIsResumeOpen(true)} />
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
