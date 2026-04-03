import { motion } from "motion/react";
import { ProjectTile } from "../components/ProjectTile";

export default function UiUxProjects() {
  return (
    <main className="pt-40 pb-24 min-h-screen">
      <section className="max-w-7xl mx-auto px-8 mb-24">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-headline text-5xl md:text-7xl font-bold mb-8 text-gradient-primary"
          >
            UI/UX Case Studies
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-on-surface-variant font-light leading-relaxed"
          >
            A collection of my design projects, focusing on user-centric interfaces, design systems, and seamless experiences. I blend aesthetic beauty with functional clarity to solve real-world problems.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProjectTile 
            title="2Gather"
            subtitle="Community & Events"
            imgUrl="/2gather.png"
            delay={0.3}
            tags={["Mobile App", "UI/UX"]}
            siteUrl="https://www.2gather.in/"
            secondaryUrl="https://play.google.com/store/apps/details?id=com.geetbihtech.togather"
            secondaryLabel="Play Store"
          />
          <ProjectTile 
            title="URJA Matrimonial"
            subtitle="UI/UX Case Study"
            imgUrl="/mouryaurja.png"
            delay={0.4}
            tags={["UI/UX"]}
            siteUrl="https://www.behance.net/gallery/246970791/Mourya-URJA-Matrimonial"
          />
          <ProjectTile 
            title="Veliciae"
            subtitle="Behance Case Study ↗"
            imgUrl="/veliciae.png"
            delay={0.5}
            tags={["UI/UX"]}
            siteUrl="https://www.behance.net/gallery/246971903/Veliciae"
          />
          <ProjectTile 
            title="Modern Mahal"
            subtitle="Real Estate Platform"
            imgUrl="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600"
            delay={0.6}
            tags={["UI/UX"]}
          />
        </div>
      </section>
    </main>
  );
}
