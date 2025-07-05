// i18n/settings.ts

export const fallbackLng = 'en'; // Default fallback
export const languages = ['en', 'fr', 'ht', 'es']; // Supported locales
export const defaultNS = 'translation'; // Optional: default namespace if using i18next namespaces

export function getOptions(lng: string = fallbackLng) {
  return {
    // If using i18next
    lng,
    fallbackLng,
    supportedLngs: languages,
    defaultNS,
  };
}
