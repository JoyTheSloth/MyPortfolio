import { motion } from "motion/react";
import { ProjectTile } from "../components/ProjectTile";
import { projectsData } from "../data/projects";

export default function GenAIProjects() {
  const genAIProjects = projectsData.filter(project => project.categories.includes("AI Automation"));

  return (
    <main className="pt-40 pb-24 min-h-screen">
      <section className="max-w-7xl mx-auto px-8 mb-24">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-headline text-5xl md:text-7xl font-bold mb-8 text-gradient-primary"
          >
            Gen AI Developer
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-on-surface-variant font-light leading-relaxed"
          >
            Computer Science undergraduate with hands-on experience in Generative AI, LLM integration, RAG architectures, 
            and full-stack web engineering. Proficient with LangChain, LangServe, Ollama (Gemma, LLaMA 3), and the Google 
            Gemini API. Builder of <span className="text-white font-medium">MediRAG</span> — a clinical-grade hallucination-detection system for medical AI. Seeking to 
            contribute to forward-thinking teams building intelligent, scalable AI products.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {genAIProjects.map((project, index) => (
            <ProjectTile 
              key={project.title}
              title={project.title}
              subtitle={project.subtitle}
              imgUrl={project.imgUrl}
              delay={(index % 4) * 0.1}
              tags={project.tags}
              githubUrl={project.githubUrl}
              siteUrl={project.siteUrl}
              secondaryUrl={project.secondaryUrl}
              secondaryLabel={project.secondaryLabel}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
