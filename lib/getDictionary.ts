import fs from 'fs';
import path from 'path';
import type { Locale } from './types';

// Base path for home translations
const basePath = path.join(process.cwd(), 'content', 'home');

export async function getDictionary(locale: Locale) {
  // Build path like lib/i18n/dictionaries/en.json, fr.json, ht.json, es.json
  const filePath = path.join(basePath, `${locale}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`❌ Missing translation file: ${locale}.json`);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}
