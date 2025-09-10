
'use client';

import { useEffect } from 'react';

export default function TeamDocsPage() {
  useEffect(() => {
    document.title = 'Sant Dokiman Ekip – Nouvo Ayiti 2075';
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4 text-center">📂 Sant Dokiman Ekip</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Aksè epi kolabore sou dosye pataje pou mouvman Nouvo Ayiti 2075 la.
      </p>

      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <iframe
          src="https://drive.google.com/embeddedfolderview?id=1pGyWOT2nNHxfw7VY7VF_VCuik9hlp7ck#grid"
          width="100%"
          height="600"
          frameBorder="0"
        ></iframe>
      </div>
    </main>
  );
}
