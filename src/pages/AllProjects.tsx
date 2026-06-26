import { motion } from "motion/react";
import { ProjectTile } from "../components/ProjectTile";
import { projectsData } from "../data/projects";

export default function AllProjects() {
  return (
    <main className="pt-40 pb-24 min-h-screen">
      <section className="max-w-7xl mx-auto px-8 mb-24">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-headline text-5xl md:text-7xl font-bold mb-8 text-gradient-primary"
          >
            All Projects
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-on-surface-variant font-light leading-relaxed"
          >
            A comprehensive collection of my work across Generative AI, Full-Stack Development, and UI/UX Design.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
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
