"use client";

import { motion } from "framer-motion";
import { Cpu, Droplets, Stethoscope, Hammer, Sprout, Wifi } from "lucide-react";

type IconKey = "cpu" | "water" | "health" | "build" | "grow" | "connect";

const iconMap: Record<IconKey, any> = {
  cpu: Cpu,
  water: Droplets,
  health: Stethoscope,
  build: Hammer,
  grow: Sprout,
  connect: Wifi,
};

export type ProjectCardProps = {
  title?: string;
  description?: string;
  icon?: IconKey;
};

export default function ProjectCard({
  title = "Project",
  description = "",
  icon = "cpu",
}: ProjectCardProps) {
  const Icon = iconMap[icon] ?? Cpu;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        rounded-xl bg-white shadow-sm border border-slate-100
        p-5 flex flex-col gap-3
        hover:shadow-lg hover:-translate-y-1
        transition-transform transition-shadow duration-200
      "
    >
      <div className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <h3 className="font-semibold text-slate-900">
        {title}
      </h3>

      <p className="text-sm text-slate-600">
        {description}
      </p>
    </motion.article>
  );
}

