// lib/i18n/settings.ts

// All supported languages
export const languages = ['en', 'fr', 'ht', 'es'] as const;

// Locale type = one of the values from `languages`
export type Locale = typeof languages[number];

// Default locale
export const defaultLocale: Locale = 'en';
