
import React from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'Community Cleaning & Sanitation',
    description: 'Improving public health through clean environments',
  },
  {
    title: 'Youth Education Programs',
    description: 'Investing in the future through knowledge',
  },
  {
    title: 'Food & Water Security',
    description: 'Ensuring access to safe water and sustainable agriculture',
  },
  {
    title: 'Peacebuilding Dialogues',
    description: 'Creating spaces for reconciliation and healing',
  },
  {
    title: 'Safe Shelters & Housing',
    description: 'Providing secure homes for vulnerable families',
  },
  {
    title: 'Mental Health Support',
    description: 'Addressing trauma and promoting emotional wellness',
  },
];

export default function ProjectsGrid() {
  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Peace Restoration Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
          />
        ))}
      </div>
    </section>
  );
}
