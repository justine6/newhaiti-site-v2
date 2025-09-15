import fs from "fs";
import path from "path";

const locales = ["en", "fr", "ht", "es"];
const baseDir = path.join(process.cwd(), "lib/i18n/dictionaries");

// Get all keys in nested JSON
function getKeys(obj, prefix = "") {
  return Object.keys(obj).flatMap((key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return typeof obj[key] === "object" && obj[key] !== null
      ? getKeys(obj[key], fullKey)
      : fullKey;
  });
}

// Set value at nested path
function setValue(obj, pathStr, value) {
  const keys = pathStr.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

function validateAndFixHomeFiles() {
  const allContent = {};
  const allKeys = {};

  for (const locale of locales) {
    const filePath = path.join(baseDir, locale, "home.json");
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing file: ${filePath}`);
      continue;
    }

    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    allContent[locale] = content;
    allKeys[locale] = getKeys(content);
  }

  // Use English as reference
  const reference = allKeys["en"];

  for (const locale of locales) {
    if (!allContent[locale]) continue;
    const missing = reference.filter((k) => !allKeys[locale].includes(k));

    if (missing.length) {
      console.warn(`⚠️ Fixing ${locale}/home.json — adding ${missing.length} missing keys`);
      missing.forEach((key) => setValue(allContent[locale], key, ""));
      const filePath = path.join(baseDir, locale, "home.json");
      fs.writeFileSync(filePath, JSON.stringify(allContent[locale], null, 2), "utf8");
    }
  }

  console.log("✅ Validation complete. Missing keys auto-filled with empty strings.");
}

validateAndFixHomeFiles();
