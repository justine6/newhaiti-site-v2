const fs = require("fs");
const path = require("path");

// ✅ Locales to synchronize
const locales = ["en", "fr", "es", "ht"];
const dictionariesDir = path.join(__dirname, "../lib/i18n/dictionaries");

// ✅ Use English as the source
const baseFile = path.join(dictionariesDir, "en", "vision.json");
if (!fs.existsSync(baseFile)) {
  console.error(`❌ Missing base file: ${baseFile}`);
  process.exit(1);
}

const baseContent = fs.readFileSync(baseFile, "utf8");

locales.forEach((locale) => {
  const targetDir = path.join(dictionariesDir, locale);
  const targetFile = path.join(targetDir, "vision.json");

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`📂 Created folder: ${targetDir}`);
  }

  fs.writeFileSync(targetFile, baseContent, "utf8");
  console.log(`✅ Synced ${locale}/vision.json with English source`);
});

console.log("🎉 All locales harmonized successfully!");
