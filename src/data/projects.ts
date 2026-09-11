export interface Project {
  title: string;
  subtitle: string;
  imgUrl: string;
  tags: string[];
  githubUrl?: string;
  siteUrl?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
  categories: string[];
}

export const projectsData: Project[] = [
  // ── Tier 1: Flagship Live Production Platforms ──────────────────────
  {
    title: "ZenEstate",
    subtitle: "Architectural Pavilions & Luxury Real Estate",
    imgUrl: "/zenestate.png",
    tags: ["Next.js", "Full Stack", "TypeScript", "Tailwind", "UI/UX"],
    siteUrl: "https://zen-estate.vercel.app/",
    categories: ["Full Stack", "Frontend", "UI/UX Design"]
  },
  {
    title: "Flatzy",
    subtitle: "Kolkata's Hassle-Free Rental Discovery",
    imgUrl: "/flatzy.png",
    tags: ["React", "Tailwind CSS", "Frontend", "Real Estate", "UI/UX"],
    siteUrl: "https://flatzy.vercel.app/",
    categories: ["Frontend", "Full Stack", "UI/UX Design"]
  },
  {
    title: "Stash",
    subtitle: "Your ChatGPT for Ctrl + C",
    imgUrl: "/stash-thumbnail.png",
    tags: ["Gen AI", "LLMs", "Chrome Ext", "React", "Founder"],
    siteUrl: "https://whynotstash.netlify.app/",
    categories: ["AI Automation", "Full Stack", "Frontend", "UI/UX Design"]
  },
  {
    title: "Researcix",
    subtitle: "Autonomous Academic Research & Synthesis",
    imgUrl: "/researcix.png",
    tags: ["Gen AI", "LLM Agents", "Python", "RAG", "Academic AI"],
    githubUrl: "https://github.com/JoyTheSloth/Researcix",
    siteUrl: "https://researcix.vercel.app/",
    categories: ["AI Automation", "Full Stack", "Frontend"]
  },
  {
    title: "2Gather",
    subtitle: "Community & Event Platform",
    imgUrl: "/2gather.png",
    tags: ["React Native", "Mobile App", "Play Store", "Events", "UI/UX"],
    siteUrl: "https://www.2gather.in/",
    secondaryUrl: "https://play.google.com/store/apps/details?id=com.geetbihtech.togather",
    secondaryLabel: "Play Store",
    categories: ["UI/UX Design", "Full Stack", "Frontend"]
  },

  // ── Tier 2: Advanced Autonomous AI & Multi-Agent Systems ─────────────
  {
    title: "Multi-Agent Bug Analysis",
    subtitle: "Autonomous Bug Triage & RCA",
    imgUrl: "/mabas-thumbnail.png",
    tags: ["Gen AI", "Multi-Agent", "LangChain", "Autonomous RCA", "Python"],
    githubUrl: "https://github.com/JoyTheSloth/Multi-Agent-Bug-Analysis-System-MABAS-",
    categories: ["AI Automation", "Full Stack"]
  },
  {
    title: "Multi-Agent Launch Decision",
    subtitle: "War Room Rollout Orchestration",
    imgUrl: "/mlds-thumbnail.png",
    tags: ["Gen AI", "Multi-Agent", "Consensus AI", "War Room", "Python"],
    githubUrl: "https://github.com/JoyTheSloth/Multi-Agent-Launch-Decision-System-MLDS-",
    categories: ["AI Automation", "Full Stack"]
  },
  {
    title: "MediRAG",
    subtitle: "Clinical-grade Hallucination Detection",
    imgUrl: "/medirag-thumbnail.png",
    tags: ["Gen AI", "RAG Pipeline", "Hallucination Eval", "Healthcare", "Python"],
    githubUrl: "https://github.com/JoyTheSloth/MediRAG-3.0",
    siteUrl: "#",
    categories: ["AI Automation", "Full Stack"]
  },
  {
    title: "Fitness Bunny",
    subtitle: "AI Calorie Measurer & Recipe Creator",
    imgUrl: "/fitnessbunny-thumbnail.png",
    tags: ["Gen AI", "Computer Vision", "Calorie AI", "Web App", "FastAPI"],
    siteUrl: "https://fitnessbunny.vercel.app/",
    categories: ["AI Automation", "Full Stack", "Frontend"]
  },
  {
    title: "Bacsense",
    subtitle: "IoT Biosensor Dashboard",
    imgUrl: "/bacsense-thumbnail.png",
    tags: ["IoT", "Biosensors", "Real-Time", "Dashboard", "Data Viz"],
    githubUrl: "https://github.com/JoyTheSloth/BacSense-2.0",
    siteUrl: "#",
    categories: ["Full Stack", "Frontend"]
  },

  // ── Tier 3: High-Fidelity UI/UX & Design Systems ─────────────────────
  {
    title: "TripEva",
    subtitle: "Figma UI/UX Travel Booking & Planner Platform",
    imgUrl: "/tripeva.jpg",
    tags: ["UI/UX", "Figma", "Design System", "Travel Booking", "Prototyping"],
    siteUrl: "https://www.figma.com/design/8AHoD7LescfFfyybKVT9xl/Portfolio?node-id=66-1002&t=f85Be63LMbWInUiT-1",
    categories: ["UI/UX Design"]
  },
  {
    title: "ValueAxis",
    subtitle: "Figma UI/UX Investment & Portfolio Tracker",
    imgUrl: "/valueaxis.png",
    tags: ["UI/UX", "Fintech", "Investment", "Figma", "Data Dashboard"],
    siteUrl: "https://www.figma.com/design/8AHoD7LescfFfyybKVT9xl/Portfolio?node-id=69-3879&t=f85Be63LMbWInUiT-1",
    categories: ["UI/UX Design"]
  },
  {
    title: "Mourya URJA Matrimonial",
    subtitle: "Behance Case Study ↗",
    imgUrl: "/mouryaurja.png",
    tags: ["UI/UX", "Behance", "Case Study", "Design Research", "Mobile UI"],
    siteUrl: "https://www.behance.net/gallery/246970791/Mourya-URJA-Matrimonial",
    categories: ["UI/UX Design", "Graphic Design"]
  },
  {
    title: "Veliciae",
    subtitle: "Behance Case Study ↗",
    imgUrl: "/veliciae.png",
    tags: ["UI/UX", "Behance", "E-Commerce", "Luxury Brand", "Case Study"],
    siteUrl: "https://www.behance.net/gallery/246971903/Veliciae",
    categories: ["UI/UX Design", "Graphic Design"]
  },

  // ── Tier 4: Interactive Web Apps & Community Tools ───────────────────
  {
    title: "2Gather Web",
    subtitle: "Where Exceptional Minds Converge",
    imgUrl: "/2gather-web.vercel.app-gather Where Exceptional Minds Converge-cvscreenshot.png",
    tags: ["React", "Frontend", "Vite", "Tailwind CSS", "Community"],
    siteUrl: "https://2gather-web.vercel.app/",
    categories: ["Frontend"]
  },
  {
    title: "Ask Joy Bhaiya",
    subtitle: "Honest Mentorship for Amity Kolkata",
    imgUrl: "/ask-joybhaiya.vercel.app-Ask Joy Bhaiya Honest Amity University Kolkata Mentorship-cvscreenshot.png",
    tags: ["Frontend", "Interactive", "React", "Mentorship", "Community"],
    siteUrl: "https://ask-joybhaiya.vercel.app/",
    categories: ["Frontend"]
  },
  {
    title: "Modern Mahal",
    subtitle: "Real Estate Platform",
    imgUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600",
    tags: ["UI/UX", "Architecture", "Luxury Estates", "Concept UI", "3D Web"],
    categories: ["UI/UX Design", "Graphic Design"]
  }
];
