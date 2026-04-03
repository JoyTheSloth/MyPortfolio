/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import Home from "./pages/Home";
import GenAIProjects from "./pages/GenAIProjects";
import UiUxProjects from "./pages/UiUxProjects";
import AllProjects from "./pages/AllProjects";
import RotatingText from "./components/RotatingText";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
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
        <Link to="/" className="text-2xl font-headline font-bold flex items-center gap-2">
          Joydeep Das, 
          <RotatingText
            texts={['UI/UX Designer', 'Gen AI Developer', 'Front-end Developer']}
            mainClassName="text-white/40 font-normal"
            staggerDuration={0.025}
            splitBy="characters"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            rotationInterval={3000}
          />
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <a href="/#portfolio" onClick={(e) => handleNavClick(e, '#portfolio')} className="font-headline font-medium text-white/70 hover:text-white transition-colors">Portfolio</a>
          <a href="/#skills" onClick={(e) => handleNavClick(e, '#skills')} className="font-headline font-medium text-white/70 hover:text-white transition-colors">Skills</a>
          <a href="/#contact" onClick={(e) => handleNavClick(e, '#contact')} className="font-headline font-medium text-white/70 hover:text-white transition-colors">Contact</a>
          <Link to="/projects" className="font-headline font-medium text-white/70 hover:text-white transition-colors">Projects</Link>
        </div>
        <button className="md:hidden text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>
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
        <p className="text-white/40 text-sm">© 2024 Joydeep Das. Crafted with Intentional Asymmetry.</p>
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
