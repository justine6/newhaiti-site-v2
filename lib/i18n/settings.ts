// lib/i18n/settings.ts

export const locales = ["en", "fr", "ht", "es"] as const;
export type Locale = (typeof locales)[number];

// 👇 Add this
export const defaultLocale: Locale = "en";
