
// i18n/settings.ts

export const languages = ['en', 'fr', 'ht', 'es'] as const;

export type Locale = (typeof languages)[number];
