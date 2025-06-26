'use client';

import React from 'react';
import ProjectCard from './ProjectCard.tsx';

const projects = [
  {
    title: 'Community Cleaning & Sanitation',
    description: 'Improving public health through clean environments',
  },
  {
    title: 'Reforestation Efforts',
    description: 'Planting trees to combat erosion and restore nature',
  },
  {
    title: 'Youth Empowerment Program',
    description: 'Training and engaging youth in leadership and tech skills',
  },
];

export default function ProjectsGrid() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-800">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
