// components/MissionSection.tsx

type MissionSectionProps = {
  dictionary: {
    title?: string;
    points?: string[];
  };
};

export default function MissionSection({ dictionary }: MissionSectionProps) {
  if (!dictionary?.points || !Array.isArray(dictionary.points)) return null;

  return (
    <section className="py-10 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">
        {dictionary.title || "Our Mission"}
      </h2>

      <ul className="list-disc list-inside space-y-2 text-lg">
        {dictionary.points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </section>
  );
}
