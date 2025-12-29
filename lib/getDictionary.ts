import fs from "fs";
import path from "path";
import { Locale } from "./settings";

const basePath = path.join(process.cwd(), "lib", "i18n", "dictionaries");

export async function getDictionary(locale: Locale, section: string) {
  const filePath = path.join(basePath, locale, `${section}.json`);

  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing translation file: ${locale}/${section}.json`);
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err: any) {
    console.error(`Error loading ${locale}/${section}.json → ${err.message}`);

    // fallback
    const fallbackPath = path.join(basePath, "en", `${section}.json`);
    if (fs.existsSync(fallbackPath)) {
      return JSON.parse(fs.readFileSync(fallbackPath, "utf-8"));
    }

    return {};
  }
}

