// lib/i18n/get-dictionary.ts
import fs from "fs";
import path from "path";
import type { Locale } from "../types";



const basePath = path.join(process.cwd(), "lib", "i18n", "dictionaries");

export async function getDictionary(locale: Locale, section: string) {
  const filePath = path.join(basePath, locale, `${section}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`❌ Missing translation file: ${locale}/${section}.json`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}
