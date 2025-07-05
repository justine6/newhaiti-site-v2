type Section = 'about' | 'blog' | 'projects';

export const getDictionary = async (locale: string, section: Section) => {
  try {
    const dictionary = await import(`@/lib/i18n/dictionaries/${locale}/${section}.ts`);
    return dictionary.default;
  } catch (error) {
    console.error(`Failed to load dictionary for locale "${locale}" and section "${section}":`, error);
    return {};
  }
};
