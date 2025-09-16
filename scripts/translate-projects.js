import fs from "fs";
import path from "path";

const locales = ["fr", "ht", "es"];
const basePath = path.join(process.cwd(), "lib", "i18n", "dictionaries");

// Load EN template as source of truth
const enPath = path.join(basePath, "en", "projects.json");
const enData = JSON.parse(fs.readFileSync(enPath, "utf-8"));

function updateProjects() {
  for (const locale of locales) {
    const filePath = path.join(basePath, locale, "projects.json");

    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing file: ${locale}/projects.json`);
      continue;
    }

    const existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Merge translations safely
    const updated = {
      title: existing.title || enData.title,
      intro: existing.intro || enData.intro,
      motto: existing.motto || enData.motto,
      items: enData.items.map((item, i) => ({
        title: existing.items?.[i]?.title || item.title,
        description: existing.items?.[i]?.description || item.description,
        icon: item.icon, // always follow EN structure for icons
      })),
    };

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf-8");
    console.log(`✅ Synced ${locale}/projects.json with EN template (kept translations)`);
  }
}

updateProjects();
