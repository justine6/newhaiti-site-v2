'use client';
import { motion } from 'framer-motion';

const projects = [
  {
    number: 1,
    title: 'Community Cleaning & Sanitation',
    description: 'Improving public health through clean environments',
  },
  {
    number: 2,
    title: 'Youth Education Programs',
    description: 'Investing in the future through knowledge',
  },
  {
    number: 3,
    title: 'Infrastructure Rebuilding',
    description: 'Restoring essential services and structures',
  },
  {
    number: 4,
    title: 'Healthcare Access',
    description: 'Bringing medical care to all communities',
  },
  {
    number: 5,
    title: 'Agricultural Development',
    description: 'Ensuring food security and sustainability',
  },
  {
    number: 6,
    title: 'Vocational Training',
    description: 'Building skills for economic independence',
  },
  {
    number: 7,
    title: 'Cultural Preservation',
    description: 'Celebrating and protecting Haitian heritage',
  },
  {
    number: 8,
    title: 'Conflict Resolution',
    description: 'Creating peaceful dialogue between communities',
  },
  {
    number: 9,
    title: "Women's Empowerment",
    description: 'Supporting gender equality and opportunity',
  },
  {
    number: 10,
    title: 'Environmental Protection',
    description: "Safeguarding Haiti's natural resources",
  },
  {
    number: 11,
    title: 'Digital Inclusion',
    description: 'Bridging the technology gap for all Haitians',
  },
];

export default function ProjectsSection() {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-haiti-blue mb-4">Peace Restoration Projects</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          This is not about politics. It's about peace, healing, and giving our children a better tomorrow. We don't seek power — we're restoring it to the people.
        </p>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-2">
          Our vision encompasses all of Haiti, from north to south, east to west. We are working to restore peace and prosperity across the entire nation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.div
            key={project.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: project.number * 0.05 }}
            className="bg-white border rounded-xl shadow-sm p-6 hover:shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-haiti-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                {project.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-xl font-semibold text-haiti-red">
          "Put down your weapons and pick up your tools."
        </p>
      </div>
    </section>
  );
}
