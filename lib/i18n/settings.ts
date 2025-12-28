// lib/i18n/settings.ts

export const SUPPORTED_LOCALES = ["en", "fr", "ht", "es"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/**
 * Normalize anything like "en", "en-US", "FR-fr" into a supported locale.
 * Falls back safely to DEFAULT_LOCALE.
 */
export function normalizeLocale(raw?: string | null): Locale {
  if (!raw) return DEFAULT_LOCALE;

  const lowered = raw.toLowerCase();

  // Exact match
  if (SUPPORTED_LOCALES.includes(lowered as Locale)) {
    return lowered as Locale;
  }

  // Handle 'en-US' → 'en'
  const short = lowered.split("-")[0] as Locale;
  if (SUPPORTED_LOCALES.includes(short)) {
    return short;
  }

  return DEFAULT_LOCALE;
}

/** Type guard / helper, if you ever need it */
export function isSupportedLocale(value: string | null | undefined): value is Locale {
  if (!value) return false;
  return SUPPORTED_LOCALES.includes(value.toLowerCase() as Locale);
}
