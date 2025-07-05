
'use client';

import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="text-center py-20 bg-background text-foreground">
      <h1 className="text-4xl font-extrabold">{t('heroTitle')}</h1>
      <p className="mt-4 text-lg">{t('tagline')}</p>
    </section>
  );
}
