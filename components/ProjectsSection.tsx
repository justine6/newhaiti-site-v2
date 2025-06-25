
// components/ProjectsSection.tsx
'use client';

type ProjectsSectionProps = {
  t: (key: string) => string;
};

export default function ProjectsSection({ t }: ProjectsSectionProps) {
  return (
    <section className="py-20 px-4 bg-gray-100 text-black text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('projectsTitle')}</h2>
      <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10">
        {t('projectsDescription')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="p-6 border rounded-lg shadow bg-white">{t('project1')}</div>
        <div className="p-6 border rounded-lg shadow bg-white">{t('project2')}</div>
        <div className="p-6 border rounded-lg shadow bg-white">{t('project3')}</div>
        <div className="p-6 border rounded-lg shadow bg-white">{t('project4')}</div>
        <div className="p-6 border rounded-lg shadow bg-white">{t('project5')}</div>
        <div className="p-6 border rounded-lg shadow bg-white">{t('project6')}</div>
      </div>
    </section>
  );
}
