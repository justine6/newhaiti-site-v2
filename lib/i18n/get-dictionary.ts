import fs from 'fs';
import path from 'path';
import type { Section, JoinDictionary, AboutDictionary, BlogDictionary, HomeDictionary, ProjectsDictionary } from './types';

const supportedLocales = ['en', 'fr', 'ht', 'es'];

export const getDictionary = async (
  locale: string,
  section: Section
):
  Promise<
    | JoinDictionary
    | AboutDictionary
    | BlogDictionary
    | HomeDictionary
    | ProjectsDictionary
    | null
  > => {
  if (!supportedLocales.includes(locale)) {
    console.warn(`❌ Skipping invalid locale: "${locale}"`);
    return null;
  }

  const isHome = section === 'home';

  const filePath = isHome
    ? path.join(process.cwd(), 'content', 'home', `${locale}.json`)
    : path.join(process.cwd(), 'content', 'articles', locale, `${section}.json`);

  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`❌ Dictionary not found: ${filePath}`);
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`❌ Failed to load dictionary for ${locale}/${section}:`, error);
    return null;
  }
};
