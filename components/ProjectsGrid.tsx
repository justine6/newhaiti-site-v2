'use client';

type ProjectsGridProps = {
  dictionary: {
    title: string;
    description: string;
    projects: { name: string; summary: string }[];
  };
};

export default function ProjectsGrid({ dictionary }: ProjectsGridProps) {
  return (
    <section className="bg-white py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">{dictionary.title || 'Our Projects'}</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
        {dictionary.description || 'Explore our mission-aligned development tracks.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {dictionary.projects?.map((project, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <p className="text-gray-700">{project.summary}</p>
          </div>
        )) || (
          <p className="text-gray-500 col-span-full">No projects available at this time.</p>
        )}
      </div>
    </section>
  );
}
