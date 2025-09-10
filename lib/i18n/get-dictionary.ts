// lib/i18n/get-dictionary.ts

import fs from 'fs';
import path from 'path';
import { languages, type Locale } from './settings';
import type {
  Section,
  DictionaryBySection,
} from './types';

const supportedLocales: readonly Locale[] = languages;

export const getDictionary = async <T extends Section>(
  locale: Locale,
  section: T
): Promise<DictionaryBySection[T] | null> => {
  if (!supportedLocales.includes(locale)) {
    console.warn(`❌ Skipping invalid locale: "${locale}"`);
    return null;
  }

  const filePath = path.join(
    process.cwd(),
    'content',
    'articles',
    locale,
    `${section}.json`
  );

  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`❌ Dictionary not found: ${filePath}`);
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    try {
      return JSON.parse(fileContent) as DictionaryBySection[T];
    } catch (parseError) {
      console.error(`❌ Failed to parse JSON for ${locale}/${section}:`, parseError);
      return null;
    }
  } catch (error) {
    console.error(`❌ Failed to load dictionary for ${locale}/${section}:`, error);
    return null;
  }
};
