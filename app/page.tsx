'use client';

import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center bg-background text-foreground">
      <h1 className="text-5xl font-extrabold mb-6">
        {t('heroTitle')}
      </h1>
      <p className="max-w-2xl text-lg">
        {t('heroDescription')}
      </p>
    </main>
  );
}
