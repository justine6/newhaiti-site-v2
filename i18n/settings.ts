export const fallbackLng = 'en';
export const languages = ['en', 'fr', 'ht', 'es']; // ✅

export const defaultNS = 'translation';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns: [defaultNS],
  };
}

// ✅ This must include 'es' now
export const locales = ['en', 'fr', 'ht', 'es'] as const;
