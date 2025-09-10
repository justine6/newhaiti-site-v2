
'use client';

import React from 'react';

const projects = [
  { title: 'Community Cleaning & Sanitation', description: 'Improving public health through clean environments' },
  { title: 'Youth Education Programs', description: 'Investing in the future through knowledge' },
  { title: 'Infrastructure Rebuilding', description: 'Restoring essential services and structures' },
  { title: 'Healthcare Access', description: 'Bringing medical care to all communities' },
  { title: 'Agricultural Development', description: 'Ensuring food security and sustainability' },
  { title: 'Vocational Training', description: 'Building skills for economic independence' },
  { title: 'Cultural Preservation', description: 'Celebrating and protecting Haitian heritage' },
  { title: 'Conflict Resolution', description: 'Creating peaceful dialogue between communities' },
  { title: 'Women’s Empowerment', description: 'Supporting gender equality and opportunity' },
  { title: 'Environmental Protection', description: 'Safeguarding Haiti’s natural resources' },
  { title: 'Digital Inclusion', description: 'Bridging the technology gap for all Haitians' },
];

export default function PeaceProjects() {
  return (
    <section id="projects" className="py-20 px-6 text-center bg-white text-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Peace Restoration Projects</h2>
      <p className="max-w-3xl mx-auto mb-10 text-gray-600">
        This is not about politics. It’s about peace, healing, and giving our children a better tomorrow.
        <br />
        We don’t seek power — we’re restoring it to the people.
        <br />
        Our vision encompasses all of Haiti, from north to south, east to west.
        We are working to restore peace and prosperity across the entire nation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all bg-white"
          >
            <h3 className="font-semibold text-lg text-black mb-1">{project.title}</h3>
            <p className="text-sm text-gray-500">{project.description}</p>
          </div>
        ))}
      </div>

      <p className="mt-12 italic text-gray-700">“Put down your weapons and pick up your tools.”</p>
    </section>
  );
}
