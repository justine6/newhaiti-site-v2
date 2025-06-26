'use client';

import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
}

export default function ProjectCard({ title, description }: ProjectCardProps) {
  return (
    <div className="border border-blue-200 rounded-lg shadow-md p-6 bg-blue-50 hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
      <p className="text-blue-700">{description}</p>
    </div>
  );
}
