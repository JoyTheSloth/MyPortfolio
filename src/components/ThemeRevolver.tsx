import React, { useEffect, useRef, useState } from "react";
import { Palette, Atom, Laptop, Sun, Flame, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const themes = [
  {
    id: "default",
    name: "Default Peach",
    primaryColor: "#ffb68d",
    icon: Atom,
    variables: {
      "--theme-background": "#131313",
      "--theme-primary": "#ffb68d",
      "--theme-primary-container": "#eb7e37",
      "--theme-secondary": "#d9b9ff",
      "--theme-secondary-container": "#6c42a1",
      "--theme-surface": "#20201f",
      "--theme-surface-bright": "#393939",
      "--theme-on-surface": "#e5e2e1",
      "--theme-on-surface-variant": "#ddc1b3",
      "--theme-outline-variant": "#564338",
    }
  },
  {
    id: "blue",
    name: "Ocean Breeze",
    primaryColor: "#8ecae6",
    icon: Laptop,
    variables: {
      "--theme-background": "#0a1128",
      "--theme-primary": "#8ecae6",
      "--theme-primary-container": "#219ebc",
      "--theme-secondary": "#a8dadc",
      "--theme-secondary-container": "#457b9d",
      "--theme-surface": "#111d4a",
      "--theme-surface-bright": "#1e3a8a",
      "--theme-on-surface": "#f1faee",
      "--theme-on-surface-variant": "#cbd5e1",
      "--theme-outline-variant": "#3b82f6",
    }
  },
  {
    id: "black",
    name: "Mono Void",
    primaryColor: "#ffffff",
    icon: Sun,
    variables: {
      "--theme-background": "#050505",
      "--theme-primary": "#ffffff",
      "--theme-primary-container": "#cccccc",
      "--theme-secondary": "#aaaaaa",
      "--theme-secondary-container": "#444444",
      "--theme-surface": "#121212",
      "--theme-surface-bright": "#242424",
      "--theme-on-surface": "#ffffff",
      "--theme-on-surface-variant": "#999999",
      "--theme-outline-variant": "#333333",
    }
  },
  {
    id: "wine",
    name: "Black Cherry",
    primaryColor: "#ffb3c1",
    icon: Flame,
    variables: {
      "--theme-background": "#180b0f",
      "--theme-primary": "#ffb3c1",
      "--theme-primary-container": "#c9184a",
      "--theme-secondary": "#ffccd5",
      "--theme-secondary-container": "#800f2f",
      "--theme-surface": "#251218",
      "--theme-surface-bright": "#3a1c25",
      "--theme-on-surface": "#fff0f3",
      "--theme-on-surface-variant": "#ffccd5",
      "--theme-outline-variant": "#591a2b",
    }
  },
  {
    id: "pink",
    name: "Cyber Pink",
    primaryColor: "#ffc2eb",
    icon: Sparkles,
    variables: {
      "--theme-background": "#1c0e18",
      "--theme-primary": "#ffc2eb",
      "--theme-primary-container": "#ff49db",
      "--theme-secondary": "#e8a7f5",
      "--theme-secondary-container": "#8b2685",
      "--theme-surface": "#2b1625",
      "--theme-surface-bright": "#422039",
      "--theme-on-surface": "#fff0fa",
      "--theme-on-surface-variant": "#ffc2eb",
      "--theme-outline-variant": "#6b1b54",
    }
  }
];

export const applyTheme = (themeId: string) => {
  const selected = themes.find(t => t.id === themeId) || themes[0];
  Object.entries(selected.variables).forEach(([key, val]) => {
    document.documentElement.style.setProperty(key, val);
  });
  localStorage.setItem("portfolio-theme", themeId);
};

export function ThemeRevolver({ activeTheme, onThemeChange }: { activeTheme: string; onThemeChange: (id: string) => void }) {
  const [showPopover, setShowPopover] = useState(false);
  const timerRef = useRef<number | null>(null);
  const isLongPressRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cycle through themes on standard click
  const cycleTheme = () => {
    const currentIndex = themes.findIndex(t => t.id === activeTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    onThemeChange(themes[nextIndex].id);
  };

  // Detect long press
  const handleStart = (e: React.PointerEvent) => {
    isLongPressRef.current = false;
    // Only handle primary click
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    
    timerRef.current = window.setTimeout(() => {
      isLongPressRef.current = true;
      setShowPopover(true);
    }, 450); // 450ms hold time
  };

  const handleEnd = (e: React.PointerEvent) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Short press -> cycle color theme
    if (!isLongPressRef.current) {
      cycleTheme();
    }
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowPopover(false);
      }
    };
    if (showPopover) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPopover]);

  const getThemeHighlightColor = (id: string) => {
    switch (id) {
      case "default": return "#ffb68d";
      case "blue": return "#8ecae6";
      case "black": return "#ffffff";
      case "wine": return "#ffb3c1";
      case "pink": return "#ffc2eb";
      default: return "#ffb68d";
    }
  };

  return (
    <div ref={containerRef} className="relative flex items-center justify-center select-none">
      <motion.button
        onPointerDown={handleStart}
        onPointerUp={handleEnd}
        onPointerCancel={() => timerRef.current && clearTimeout(timerRef.current)}
        onPointerLeave={() => timerRef.current && clearTimeout(timerRef.current)}
        onContextMenu={(e) => e.preventDefault()} // Disable context menu so hold works perfectly on mobile
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-full bg-white/5 border hover:bg-white/10 text-white flex items-center justify-center cursor-pointer relative shadow-md active:scale-95 transition-all"
        style={{
          borderColor: showPopover ? "var(--theme-primary, #ffb68d)" : "rgba(255, 255, 255, 0.1)",
          boxShadow: showPopover ? "0 0 12px var(--theme-primary, #ffb68d)30" : "none"
        }}
        title="Click to cycle theme, hold to see list"
      >
        <Palette className="w-5 h-5 transition-colors duration-300" style={{ color: getThemeHighlightColor(activeTheme) }} />
        
        {/* Subtle active color badge */}
        <span 
          className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-[#131313] transition-all duration-300 shadow-sm"
          style={{ 
            backgroundColor: getThemeHighlightColor(activeTheme),
            boxShadow: `0 0 5px ${getThemeHighlightColor(activeTheme)}`
          }}
        />
      </motion.button>

      {/* Floating horizontal dialog box overlay */}
      <AnimatePresence>
        {showPopover && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute top-12 right-0 bg-[#0d0d12]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 flex flex-row gap-2 items-center z-50 shadow-[0_12px_40px_rgba(0,0,0,0.7)] whitespace-nowrap"
          >
            {themes.map((theme) => {
              const isCurrent = activeTheme === theme.id;
              const ThemeIcon = theme.icon;

              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme.id);
                    setShowPopover(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer border ${
                    isCurrent 
                      ? "bg-white/10 border-white/20 text-white font-extrabold" 
                      : "bg-transparent border-transparent text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div 
                    className="w-4 h-4 rounded-full flex items-center justify-center shadow-inner"
                    style={{ 
                      backgroundColor: theme.primaryColor,
                      boxShadow: isCurrent ? `0 0 8px ${theme.primaryColor}` : "none"
                    }}
                  >
                    <ThemeIcon className={`w-2.5 h-2.5 ${theme.id === "black" ? "text-black" : "text-white"}`} />
                  </div>
                  <span className="text-xs tracking-tight font-headline">{theme.name}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
