import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { Search, X, ArrowUpRight, Github, Globe, Sparkles, LayoutGrid, ListFilter, CornerDownRight, ArrowRight, ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { Project, projectsData } from "../data/projects";

const categories = [
  { id: "All", label: "All Works" },
  { id: "UI/UX Design", label: "UI/UX Design" },
  { id: "AI Automation", label: "Gen AI & Automation" },
  { id: "Web Development", label: "Full Stack & Web" },
  { id: "Graphic Design", label: "Brand & Graphic" }
];

// Horizontal Editorial Showcase Card Component
function HorizontalShowcaseCard({
  project,
  index,
  total
}: {
  key?: string;
  project: Project;
  index: number;
  total: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const formattedIndex = String(index + 1).padStart(2, "0");
  const formattedTotal = String(total).padStart(2, "0");
  const isLive = project.siteUrl && project.siteUrl !== "#";
  const isCaseStudy = project.siteUrl && project.siteUrl.includes("behance.net");
  const isFigma = project.siteUrl && project.siteUrl.includes("figma.com");

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#0d0d14] border border-white/[0.08] hover:border-primary/50 shadow-2xl transition-all duration-500 flex flex-col justify-between w-[88vw] sm:w-[560px] md:w-[660px] lg:w-[720px] h-[360px] md:h-[420px] shrink-0 snap-start select-none"
    >
      {/* Background Media Container */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={project.imgUrl}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center filter grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-[#09090d]/65 to-[#09090d]/25 opacity-95 group-hover:opacity-90 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80" />

      {/* Interactive Cursor Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(500px circle at ${x}px ${y}px, rgba(255, 83, 0, 0.18), transparent 75%)`
          )
        }}
      />

      {/* Card Top Metadata Bar */}
      <div className="relative z-20 p-5 md:p-7 pb-2 flex items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 font-mono text-[10px] font-semibold tracking-wider">
            {formattedIndex} / {formattedTotal}
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-wider text-white/80">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isLive
                  ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                  : isCaseStudy || isFigma
                  ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              }`}
            />
            <span className="uppercase font-bold">
              {isCaseStudy ? "Case Study" : isFigma ? "Figma" : isLive ? "Live System" : "Repository"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {project.githubUrl && project.githubUrl !== "#" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/15 backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              title="Inspect Source Code"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.secondaryUrl && project.secondaryUrl !== "#" && (
            <a
              href={project.secondaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black/60 hover:bg-secondary text-white hover:text-black border border-white/15 backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              title={project.secondaryLabel || "External Link"}
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          {project.siteUrl && project.siteUrl !== "#" && (
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn h-10 px-4 rounded-full bg-white/10 hover:bg-primary border border-white/20 hover:border-transparent text-white hover:text-background font-bold text-xs shadow-xl flex items-center gap-1.5 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
              title="Launch Application"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          )}
        </div>
      </div>

      {/* Card Bottom Overview */}
      <div className="relative z-20 p-5 md:p-7 flex flex-col justify-end pointer-events-auto">
        {/* Category and Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white/80 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl md:text-2xl lg:text-3xl font-headline font-bold text-white tracking-tight leading-snug mb-1.5 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed line-clamp-2 max-w-xl">
          {project.subtitle}
        </p>
      </div>

      {/* 1px Edge Border on hover */}
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.article>
  );
}

// Studio Interactive Table Index Mode with Floating Cursor Thumbnail
function StudioIndexTable({
  projects,
  onHoverProject
}: {
  projects: Project[];
  onHoverProject: (project: Project | null) => void;
}) {
  return (
    <div className="w-full overflow-x-auto rounded-3xl border border-white/10 bg-[#0d0d12]/80 backdrop-blur-2xl shadow-2xl">
      <table className="w-full text-left border-collapse min-w-[650px]">
        <thead>
          <tr className="border-b border-white/10 text-[10px] uppercase font-mono tracking-widest text-white/40 bg-white/[0.02]">
            <th className="py-4 px-6 w-16">No.</th>
            <th className="py-4 px-6">Project / Deliverable</th>
            <th className="py-4 px-6">Discipline</th>
            <th className="py-4 px-6">Core Arsenal</th>
            <th className="py-4 px-6 text-right">Access</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {projects.map((project, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            return (
              <tr
                key={project.title}
                onMouseEnter={() => onHoverProject(project)}
                onMouseLeave={() => onHoverProject(null)}
                className="group hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                <td className="py-5 px-6 font-mono text-xs text-white/30 group-hover:text-primary transition-colors">
                  #{num}
                </td>
                <td className="py-5 px-6">
                  <div className="font-bold text-white text-sm md:text-base group-hover:text-primary transition-colors flex items-center gap-2">
                    <span>{project.title}</span>
                    <CornerDownRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-primary transition-all duration-300 transform group-hover:translate-x-1" />
                  </div>
                  <div className="text-white/40 text-xs font-light line-clamp-1 mt-0.5">
                    {project.subtitle}
                  </div>
                </td>
                <td className="py-5 px-6">
                  <div className="flex flex-wrap gap-1">
                    {project.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] text-white/70 uppercase tracking-wider"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-5 px-6">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-white/40 group-hover:text-white/70 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-5 px-6 text-right">
                  <div className="inline-flex items-center gap-2">
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white hover:text-black text-white/60 transition-all"
                        title="GitHub"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.siteUrl && project.siteUrl !== "#" && (
                      <a
                        href={project.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-background border border-primary/30 transition-all font-bold text-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Open</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function AllProjects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"showcase" | "table">("showcase");

  // Horizontal reel scroll container reference & scroll state
  const reelRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Floating cursor preview in table mode
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const cursorX = useMotionValue(-500);
  const cursorY = useMotionValue(-500);
  const springX = useSpring(cursorX, { stiffness: 350, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 350, damping: 28 });

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleWindowMouseMove);
    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, [cursorX, cursorY]);

  // Project count per category calculation
  const categoryCounts = {
    All: projectsData.length,
    "UI/UX Design": projectsData.filter((p) => p.categories.includes("UI/UX Design")).length,
    "AI Automation": projectsData.filter((p) => p.categories.includes("AI Automation")).length,
    "Web Development": projectsData.filter((p) => p.categories.includes("Full Stack") || p.categories.includes("Frontend")).length,
    "Graphic Design": projectsData.filter((p) => p.categories.includes("Graphic Design")).length
  };

  // Category Filtering
  const categoryFiltered = (() => {
    switch (selectedCategory) {
      case "UI/UX Design":
        return projectsData.filter((p) => p.categories.includes("UI/UX Design"));
      case "AI Automation":
        return projectsData.filter((p) => p.categories.includes("AI Automation"));
      case "Web Development":
        return projectsData.filter((p) => p.categories.includes("Full Stack") || p.categories.includes("Frontend"));
      case "Graphic Design":
        return projectsData.filter((p) => p.categories.includes("Graphic Design"));
      default:
        return projectsData;
    }
  })();

  // Real-time Search Filtering
  const filteredProjects =
    searchQuery.trim() === ""
      ? categoryFiltered
      : categoryFiltered.filter((p) => {
          const q = searchQuery.toLowerCase().trim();
          return (
            p.title.toLowerCase().includes(q) ||
            p.subtitle.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q)) ||
            p.categories.some((c) => c.toLowerCase().includes(q))
          );
        });

  // Track horizontal scroll progress
  const handleReelScroll = () => {
    if (reelRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = reelRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollLeft / maxScroll)));
      }
    }
  };

  // Horizontal scroll buttons
  const scrollReel = (direction: "left" | "right") => {
    if (reelRef.current) {
      const scrollStep = Math.min(reelRef.current.clientWidth * 0.75, 580);
      reelRef.current.scrollBy({
        left: direction === "left" ? -scrollStep : scrollStep,
        behavior: "smooth"
      });
    }
  };

  // Enable mouse wheel to scroll horizontally when hovering over the showcase reel
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (reelRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      // If user is scrolling vertically with mouse wheel, smoothly translate to horizontal scroll
      reelRef.current.scrollBy({
        left: e.deltaY * 1.3,
        behavior: "auto"
      });
    }
  };

  return (
    <main className="pt-28 md:pt-36 pb-28 min-h-screen relative all-projects-page selection:bg-primary selection:text-background overflow-x-hidden">
      {/* Cool Letter-Like Matrix & Ghost Typography Background Pattern */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Large Ghost Typography Watermark */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[14vw] font-black text-white/[0.018] tracking-[0.2em] uppercase whitespace-nowrap font-headline leading-none">
          ARCHIVE // 01
        </div>

        {/* Micro Typographic Matrix Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='15' y='30' fill='%23ffffff' font-family='monospace' font-size='10' font-weight='700'%3E%2B 01 J%3C/text%3E%3Ctext x='95' y='30' fill='%23ffffff' font-family='monospace' font-size='10' font-weight='700'%3E%7B%20%7D%3C/text%3E%3Ctext x='15' y='80' fill='%23ffffff' font-family='monospace' font-size='10' font-weight='700'%3E%2F%2F AI%3C/text%3E%3Ctext x='95' y='80' fill='%23ffffff' font-family='monospace' font-size='10' font-weight='700'%3EUX %C2%B7%3C/text%3E%3Ctext x='15' y='130' fill='%23ffffff' font-family='monospace' font-size='10' font-weight='700'%3E2026%3C/text%3E%3Ctext x='95' y='130' fill='%23ffffff' font-family='monospace' font-size='10' font-weight='700'%3E%3C %2F%3E%3C/text%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat"
          }}
        />
      </div>

      {/* Studio Header Masthead */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-8 text-center relative z-30">
        <div className="flex flex-col items-center justify-center relative">

          {/* Floating Spiral Doodle Left */}
          <motion.svg 
            animate={{ y: [0, -6, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="hidden xl:block absolute -left-8 top-4 w-16 h-16 text-primary/30 pointer-events-none"
            viewBox="0 0 50 50" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.8" 
            strokeLinecap="round"
          >
            <path d="M 25 25 A 4 4 0 0 1 21 21 A 8 8 0 0 1 29 17 A 12 12 0 0 1 33 33 A 16 16 0 0 1 13 33 A 20 20 0 0 1 37 9" />
          </motion.svg>

          {/* Clean Main Title with Hand-drawn Squiggle Underline & Starburst */}
          <div className="relative inline-block mb-3">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tight text-white leading-none select-none">
              Project{" "}
              <span className="relative inline-block text-gradient-primary">
                Archive
                {/* Hand-Drawn Wavy Underline Scribble */}
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
            </h1>

            {/* Floating Starburst Doodle */}
            <motion.svg
              animate={{ rotate: [0, 180, 360], scale: [1, 1.15, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -top-5 -right-7 md:-right-9 w-6 h-6 md:w-8 md:h-8 text-secondary/70 pointer-events-none hidden sm:block"
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

          <p className="text-xs md:text-sm text-white/50 font-light max-w-xl leading-relaxed mb-8 flex items-center justify-center gap-1.5 flex-wrap">
            <span>A curated index of production applications, generative AI workflows, and digital interface systems.</span>
            <span className="font-handwriting text-primary text-base font-bold select-none">
              ✨ crafted with intent
            </span>
          </p>

          {/* Unified Studio Controls Bar (Search + View Switcher) */}
          <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 relative">
            {/* Search Input */}
            <div className="w-full sm:w-80 relative">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search works by keyword..."
                className="w-full pl-9 pr-9 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-primary/50 text-white placeholder:text-white/30 text-xs outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-white/40 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Playful Hand-Drawn Annotation Arrow pointing to controls */}
            <div className="hidden lg:flex items-center gap-2 absolute -left-28 -top-7 pointer-events-none select-none">
              <span className="font-handwriting text-xl text-secondary/80 transform -rotate-6">
                swipe sideways ✦
              </span>
              <svg className="w-8 h-8 text-secondary/70 transform rotate-45" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M 5 20 Q 15 5, 25 15" />
                <path d="M 18 12 L 25 15 L 20 22" />
              </svg>
            </div>

            {/* View Mode Toggle (Showcase Horizontal Reel vs Index Table) */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10">
              <button
                onClick={() => setViewMode("showcase")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "showcase"
                    ? "bg-primary text-background font-bold shadow"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <MoveHorizontal className="w-3.5 h-3.5" />
                <span>Showcase (Sideways)</span>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "table"
                    ? "bg-primary text-background font-bold shadow"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Index Table</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-2xl max-w-4xl mx-auto mb-3">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id as keyof typeof categoryCounts];
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="relative px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none flex items-center gap-2"
                  style={{ color: isActive ? "#000000" : "rgba(255,255,255,0.7)" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCleanTab"
                      className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-lg shadow-primary/20"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                  <span
                    className={`relative z-10 font-mono text-[9px] px-1.5 py-0.5 rounded-md transition-colors ${
                      isActive ? "bg-black/20 text-black font-extrabold" : "bg-white/10 text-white/50"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Status Sub-line with Sideways Scroll Hint */}
          <div className="flex items-center justify-center gap-3 text-[11px] font-mono text-white/40">
            <span>
              {filteredProjects.length} deliverables {searchQuery && `for "${searchQuery}"`}
            </span>
            {viewMode === "showcase" && filteredProjects.length > 0 && (
              <>
                <span className="text-white/20">•</span>
                <span className="text-primary/90 flex items-center gap-1">
                  <MoveHorizontal className="w-3 h-3" /> Scroll sideways or swipe to explore
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main Showcase Gallery Area */}
      <section className="relative z-10">
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto py-20 text-center flex flex-col items-center justify-center bg-white/[0.02] border border-white/5 rounded-3xl p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No Matching Projects Found</h3>
              <p className="text-white/40 text-xs md:text-sm max-w-sm mb-6">
                No entries matched &quot;{searchQuery}&quot; in {selectedCategory}.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-5 py-2 rounded-full bg-primary text-background font-bold text-xs hover:opacity-90 transition-opacity"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : viewMode === "showcase" ? (
            <motion.div
              key={`showcase-${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col"
            >
              {/* Sideways Navigation Controls & Progress Track */}
              <div className="max-w-7xl mx-auto px-6 md:px-8 w-full flex items-center justify-between gap-4 mb-4 select-none">
                {/* Visual Progress Bar */}
                <div className="flex-1 max-w-xs flex items-center gap-3">
                  <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-150"
                      style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 shrink-0">
                    {Math.round(scrollProgress * 100)}%
                  </span>
                </div>

                {/* Left/Right Arrow Navigation Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollReel("left")}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all active:scale-90"
                    title="Previous project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollReel("right")}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all active:scale-90"
                    title="Next project"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Horizontal Scrolling Reel */}
              <div
                ref={reelRef}
                onScroll={handleReelScroll}
                onWheel={handleWheel}
                className="flex items-stretch gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory py-4 px-6 md:px-12 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
              >
                {filteredProjects.map((project, index) => (
                  <HorizontalShowcaseCard
                    key={project.title}
                    project={project}
                    index={index}
                    total={filteredProjects.length}
                  />
                ))}
                {/* End spacer for natural overscroll padding */}
                <div className="w-6 md:w-12 shrink-0" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`table-${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-6 md:px-8"
            >
              <StudioIndexTable
                projects={filteredProjects}
                onHoverProject={setHoveredProject}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Floating Cursor Thumbnail Preview (Active only in Table mode hover) */}
      <AnimatePresence>
        {viewMode === "table" && hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            style={{
              left: springX,
              top: springY,
              x: 20,
              y: -110
            }}
            className="fixed pointer-events-none z-50 w-64 h-40 rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-black/90 backdrop-blur-2xl"
          >
            <img
              src={hoveredProject.imgUrl}
              alt={hoveredProject.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
              <span className="text-[9px] font-mono text-primary uppercase font-bold tracking-wider">
                {hoveredProject.tags[0]}
              </span>
              <h4 className="text-xs font-bold text-white leading-tight">
                {hoveredProject.title}
              </h4>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
