'use client';

import { motion } from 'framer-motion';
import { HomeDictionary } from '@/lib/i18n/types';
import { Droplet, GraduationCap, Stethoscope, Building, Leaf, Cpu } from 'lucide-react';

type Props = {
  dictionary: HomeDictionary['projects'];
};

// ✅ Map JSON `icon` keys to Lucide icons + colors
const iconMap: Record<string, { component: React.ElementType; color: string }> = {
  droplet: { component: Droplet, color: 'text-blue-500 group-hover:text-blue-600' },          // Clean Water
  'graduation-cap': { component: GraduationCap, color: 'text-yellow-500 group-hover:text-yellow-600' }, // Education
  hospital: { component: Stethoscope, color: 'text-red-500 group-hover:text-red-600' },      // Healthcare
  building: { component: Building, color: 'text-gray-500 group-hover:text-gray-600' },       // Infrastructure
  leaf: { component: Leaf, color: 'text-green-600 group-hover:text-green-700' },             // Agriculture
  cpu: { component: Cpu, color: 'text-purple-500 group-hover:text-purple-600' },             // Technology
};

export default function ProjectsSection({ dictionary }: Props) {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {dictionary.title}
        </motion.h2>

        <motion.p
          className="text-muted-foreground max-w-3xl mx-auto mb-8 whitespace-pre-line"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {dictionary.intro}
        </motion.p>

        <motion.blockquote
          className="italic font-medium text-xl text-primary mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {dictionary.motto}
        </motion.blockquote>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 text-left">
          {dictionary.items.map((item, index) => {
            const iconData = iconMap[item.icon] || iconMap['cpu']; // fallback
            const Icon = iconData.component;
            const color = iconData.color;

            return (
              <motion.div
                key={item.title}
                className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 hover:scale-105 transition-transform group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex items-center mb-3">
                  <Icon className={`w-6 h-6 transition-colors duration-300 ${color}`} />
                  <h3 className="text-lg font-semibold ml-2">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
