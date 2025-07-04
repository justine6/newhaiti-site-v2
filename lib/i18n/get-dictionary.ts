import { locales } from '@/i18n/settings';
export type Locale = (typeof locales)[number];

export const getDictionary = async (locale: string) => {
  const dictionaries: Record<Locale, () => Promise<any>> = {
    en: () => import('./dictionaries/en.json').then((m) => m.default),
    fr: () => import('./dictionaries/fr.json').then((m) => m.default),
    ht: () => import('./dictionaries/ht.json').then((m) => m.default),
    es: () => import('./dictionaries/es.json').then((m) => m.default),
  };

  if (!(locale in dictionaries)) {
    console.warn(`Skipping unsupported locale: ${locale}`);
    return dictionaries.en(); // fallback
  }

  return await dictionaries[locale as Locale]();
};
