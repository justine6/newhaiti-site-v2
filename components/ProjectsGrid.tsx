"use client";

import { motion } from "framer-motion";

type ProjectItem = {
  title: string;
  description?: string;
};

type ProjectsGridProps = {
  items?: ProjectItem[];
};

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

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export default function ProjectsGrid({ items = [] }: ProjectsGridProps) {
  if (!items || items.length === 0) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-5xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item, index) => (
        <motion.article
          key={item.title ?? index}
          variants={cardVariants}
          className="
            rounded-xl border border-slate-100 bg-white/80
            px-4 py-5 shadow-sm backdrop-blur
            transition-transform transition-shadow duration-200
            hover:-translate-y-1 hover:shadow-lg
          "
        >
          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-xs text-slate-600 leading-relaxed">
              {item.description}
            </p>
          )}
        </motion.article>
      ))}
    </motion.div>
  );
}
