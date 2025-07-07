// i18n/settings.ts

export const languages = ['en', 'fr', 'ht', 'es'] as const;

export const defaultLocale = 'fr'; // ✅ French now set as default

export type Locale = (typeof languages)[number];
