"use client";

import { motion } from "framer-motion";
import ProjectCard, { type ProjectCardProps } from "./ProjectCard";

type ProjectItem = ProjectCardProps;

type ProjectsDictionary = {
  title?: string;
  intro?: string;
  motto?: string;
  items?: ProjectItem[];
};

type ProjectsSectionProps = {
  dictionary?: ProjectsDictionary;
};

// Container animation for the grid
const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function ProjectsSection({ dictionary }: ProjectsSectionProps) {
  const title = dictionary?.title ?? "Our Projects";

  const intro =
    dictionary?.intro ??
    "Discover our key initiatives to restore dignity, rebuild hope, and renew vision across Haiti.";

  const motto =
    dictionary?.motto ?? "Each project is a promise to the future.";

  const items: ProjectItem[] = Array.isArray(dictionary?.items)
    ? dictionary!.items
    : [];

  return (
    <section id="projects" className="bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading block */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
          <p className="text-base text-slate-600">{intro}</p>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            {motto}
          </p>
        </div>

        {/* ✨ Animated grid using ProjectCard */}
        {items.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 text-left"
          >
            {items.map((item, index) => (
              <ProjectCard
                key={index}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </motion.div>
        ) : (
          <p className="col-span-full text-center text-sm text-slate-500">
            Project details are coming soon. Stay tuned.
          </p>
        )}
      </div>
    </section>
  );
}
