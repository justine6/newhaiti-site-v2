import fs from "fs";
import path from "path";

export type Locale = "en" | "fr" | "ht" | "es";

const basePath = path.join(process.cwd(), "lib", "i18n", "dictionaries");


// 🔑 Required sections (optional but helpful for sanity checks)
const requiredSections = ["topbar", "hero", "mission", "newsletter", "projects"];

export async function getDictionary(locale: Locale, section: string) {
  const filePath = path.join(basePath, locale, `${section}.json`);

  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing translation file: ${locale}/${section}.json`);
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object") {
      throw new Error(`Invalid JSON in: ${locale}/${section}.json`);
    }

    // 🔎 Extra check: verify required sections exist in `home.json`
    if (section === "home") {
      const missingKeys = requiredSections.filter((k) => !(k in parsed));
      if (missingKeys.length > 0) {
        console.warn(
          `⚠️ ${locale}/${section}.json is missing keys → ${missingKeys.join(", ")}`
        );
      }
    }

    return parsed;
  } catch (err: any) {
    console.error(
      `🚨 Error loading ${locale}/${section}.json → ${err.message}`
    );
    if (process.env.NODE_ENV !== "production") {
  (global as any).__setTranslationWarning?.(
    `Error in ${locale}/${section}.json → ${err.message}`
  );
}


    // Fallback: try English dictionary instead of empty object
    if (locale !== "en") {
      const fallbackPath = path.join(basePath, "en", `${section}.json`);
      if (fs.existsSync(fallbackPath)) {
        console.warn(`👉 Falling back to en/${section}.json`);
        return JSON.parse(fs.readFileSync(fallbackPath, "utf-8"));
      }
    }

    return {}; // minimal fallback so app still renders
  }
}
