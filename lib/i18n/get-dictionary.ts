import { locales } from '@/i18n/settings';

// 👇 Define the type based on those locales
export type Locale = (typeof locales)[number];

// ✅ Now you can use it like:
export const getDictionary = async (locale: Locale) => {
  const dictionaries: Record<Locale, () => Promise<any>> = {
    en: () => import('./dictionaries/en.json').then((m) => m.default),
    fr: () => import('./dictionaries/fr.json').then((m) => m.default),
    ht: () => import('./dictionaries/ht.json').then((m) => m.default),
  };

  return await dictionaries[locale]();
};
