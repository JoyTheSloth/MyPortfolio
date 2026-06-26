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
  {
    title: "2Gather Web",
    subtitle: "Where Exceptional Minds Converge",
    imgUrl: "/2gather-web.vercel.app-gather Where Exceptional Minds Converge-cvscreenshot.png",
    tags: ["Frontend", "React"],
    siteUrl: "https://2gather-web.vercel.app/",
    categories: ["Frontend"]
  },
  {
    title: "Ask Joy Bhaiya",
    subtitle: "Honest Mentorship for Amity Kolkata",
    imgUrl: "/ask-joybhaiya.vercel.app-Ask Joy Bhaiya Honest Amity University Kolkata Mentorship-cvscreenshot.png",
    tags: ["Frontend", "Interactive"],
    siteUrl: "https://ask-joybhaiya.vercel.app/",
    categories: ["Frontend"]
  },
  {
    title: "Fitness Bunny",
    subtitle: "AI Calorie Measurer & Recipe Creator",
    imgUrl: "/fitnessbunny-thumbnail.png",
    tags: ["Gen AI", "Web App"],
    siteUrl: "https://fitnessbunny.vercel.app/",
    categories: ["Full Stack", "Frontend"]
  },
  {
    title: "MediRAG",
    subtitle: "Clinical-grade hallucination detection",
    imgUrl: "/medirag-thumbnail.png",
    tags: ["Gen AI"],
    githubUrl: "https://github.com/JoyTheSloth/MediRAG-3.0",
    siteUrl: "#",
    categories: ["Full Stack"]
  },
  {
    title: "Researcix",
    subtitle: "Autonomous Academic Research & Synthesis",
    imgUrl: "/researcix.png",
    tags: ["Gen AI"],
    githubUrl: "https://github.com/JoyTheSloth/Researcix",
    siteUrl: "https://researcix.vercel.app/",
    categories: ["AI Automation", "Frontend"]
  },
  {
    title: "Multi-Agent Bug Analysis",
    subtitle: "Autonomous Bug Triage & RCA",
    imgUrl: "/mabas-thumbnail.png",
    tags: ["Gen AI", "Multi-Agent"],
    githubUrl: "https://github.com/JoyTheSloth/Multi-Agent-Bug-Analysis-System-MABAS-",
    categories: ["AI Automation"]
  },
  {
    title: "Multi-Agent Launch Decision",
    subtitle: "War Room Rollout Orchestration",
    imgUrl: "/mlds-thumbnail.png",
    tags: ["Gen AI", "Multi-Agent"],
    githubUrl: "https://github.com/JoyTheSloth/Multi-Agent-Launch-Decision-System-MLDS-",
    categories: ["AI Automation"]
  },
  {
    title: "Bacsense",
    subtitle: "IoT Biosensor Dashboard",
    imgUrl: "/bacsense-thumbnail.png",
    tags: ["Gen AI"],
    githubUrl: "https://github.com/JoyTheSloth/BacSense-2.0",
    siteUrl: "#",
    categories: ["Full Stack", "Frontend"]
  },
  {
    title: "2Gather",
    subtitle: "Community & Events",
    imgUrl: "/2gather.png",
    tags: ["Mobile App", "UI/UX"],
    siteUrl: "https://www.2gather.in/",
    secondaryUrl: "https://play.google.com/store/apps/details?id=com.geetbihtech.togather",
    secondaryLabel: "Play Store",
    categories: ["UI/UX Design"]
  },
  {
    title: "Mourya URJA Matrimonial",
    subtitle: "Behance Case Study ↗",
    imgUrl: "/mouryaurja.png",
    tags: ["UI/UX"],
    siteUrl: "https://www.behance.net/gallery/246970791/Mourya-URJA-Matrimonial",
    categories: ["UI/UX Design"]
  },
  {
    title: "Veliciae",
    subtitle: "Behance Case Study ↗",
    imgUrl: "/veliciae.png",
    tags: ["UI/UX"],
    siteUrl: "https://www.behance.net/gallery/246971903/Veliciae",
    categories: ["UI/UX Design"]
  },
  {
    title: "Modern Mahal",
    subtitle: "Real Estate Platform",
    imgUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600",
    tags: ["UI/UX"],
    categories: ["UI/UX Design"]
  }
];
