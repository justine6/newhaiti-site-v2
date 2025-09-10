'use client';

import { motion } from 'framer-motion';
import { HomeDictionary } from '@/lib/i18n/types';
import { Lightbulb, Heart, Globe, School, Users } from 'lucide-react';

type Props = {
  dictionary: HomeDictionary['projects'];
};

const icons = [
  <Lightbulb key="lightbulb" className="w-6 h-6 text-primary" />,
  <Heart key="heart" className="w-6 h-6 text-red-500" />,
  <Globe key="globe" className="w-6 h-6 text-green-500" />,
  <School key="school" className="w-6 h-6 text-yellow-500" />,
  <Users key="users" className="w-6 h-6 text-blue-500" />,
];

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
          {dictionary.items.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex items-center mb-3">
                {icons[index % icons.length]}
                <h3 className="text-lg font-semibold ml-2">{item.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
