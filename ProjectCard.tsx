
import React from 'react';

type ProjectCardProps = {
  title: string;
  description: string;
};

export default function ProjectCard({ title, description }: ProjectCardProps) {
  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-center text-gray-700">{description}</p>
    </div>
  );
}
