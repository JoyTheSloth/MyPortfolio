import { motion } from "motion/react";
import { ProjectTile } from "../components/ProjectTile";

export default function GenAIProjects() {
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
          <ProjectTile 
            title="MediRAG"
            subtitle="Clinical-grade hallucination detection"
            imgUrl="/medirag-thumbnail.png"
            delay={0.1}
            tags={["Gen AI"]}
            githubUrl="https://github.com/JoyTheSloth/MediRAG-3.0"
            siteUrl="#"
          />
          <ProjectTile 
            title="Bacsense"
            subtitle="IoT Biosensor Dashboard"
            imgUrl="/bacsense-thumbnail.png"
            delay={0.2}
            tags={["Gen AI"]}
            githubUrl="https://github.com/JoyTheSloth/BacSense-2.0"
            siteUrl="#"
          />
          <ProjectTile 
            title="Agentic Framework"
            subtitle="Autonomous LLM workflows"
            imgUrl="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600"
            delay={0.3}
            tags={["Gen AI"]}
          />
        </div>
      </section>
    </main>
  );
}
