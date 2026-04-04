/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Palette, Sparkles } from "lucide-react";
import Home from "./pages/Home";
import GenAIProjects from "./pages/GenAIProjects";
import UiUxProjects from "./pages/UiUxProjects";
import AllProjects from "./pages/AllProjects";
import RotatingText from "./components/RotatingText";
import { motion, AnimatePresence } from "motion/react";


function ResumeDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-8 z-[70] pointer-events-none"
          >
            <div className="glass-card border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl pointer-events-auto bg-[#0A0A0A]/90 backdrop-blur-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
               <button 
                 onClick={onClose}
                 className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white"
               >
                 <X className="w-5 h-5" />
               </button>

               <div className="relative z-10 text-center mb-10">
                 <h2 className="text-3xl font-headline font-bold mb-3">Choose Your Focus</h2>
                 <p className="text-white/40 text-sm">Select the resume that best fits your inquiry.</p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                 <a 
                   href="/Joydeep_Das_UIUX_Resume.pdf" 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
                 >
                   <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                     <Palette className="w-8 h-8" />
                   </div>
                   <div className="text-center">
                     <span className="block font-bold text-white text-lg">UI/UX</span>
                     <span className="text-xs text-white/40 font-medium tracking-widest uppercase">Resume</span>
                   </div>
                 </a>

                 <a 
                   href="/Joydeep_Das_GenAI_Resume.pdf" 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-secondary/50 hover:bg-white/10 transition-all duration-300"
                 >
                   <div className="w-16 h-16 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                     <Sparkles className="w-8 h-8" />
                   </div>
                   <div className="text-center">
                     <span className="block font-bold text-white text-lg">Gen AI</span>
                     <span className="text-xs text-white/40 font-medium tracking-widest uppercase">Resume</span>
                   </div>
                 </a>
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isResumeOpen, setIsResumeOpen] = React.useState(false);

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
              texts={['UI/UX Designer', 'Gen AI Developer', 'Front-end Developer']}
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
            onClick={() => setIsResumeOpen(true)}
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
                  setIsResumeOpen(true);
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-primary text-background font-bold text-lg"
              >
                Resume / CV
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Selection Modal */}
      <ResumeDialog isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </nav>
  );
}

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="min-h-screen soul-gradient selection:bg-primary selection:text-background overflow-x-hidden flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gen-ai" element={<GenAIProjects />} />
            <Route path="/ui-ux" element={<UiUxProjects />} />
            <Route path="/projects" element={<AllProjects />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
