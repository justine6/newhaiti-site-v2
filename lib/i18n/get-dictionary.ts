// ✅ lib/i18n/get-dictionary.ts

import type { Section } from './types';

export const getDictionary = async (locale: string, section: Section) => {
  const validLocales = ['en', 'fr', 'ht', 'es']; // your supported locales
  if (!validLocales.includes(locale)) {
    console.warn(`❌ Skipping invalid locale: "${locale}"`);
    return null;
  }

  try {
    const dictionary = await import(`@/lib/i18n/dictionaries/${locale}/${section}`);
    return dictionary.default;
  } catch (error) {
    console.error(`❌ Failed to load dictionary: locale="${locale}", section="${section}"`);
    return null;
  }
};
