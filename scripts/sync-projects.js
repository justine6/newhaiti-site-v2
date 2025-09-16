import fs from "fs";
import path from "path";

const baseDir = path.join(process.cwd(), "lib", "i18n", "dictionaries");
const locales = ["fr", "ht", "es"];

// Load English as the source of truth
const enPath = path.join(baseDir, "en", "projects.json");
const enData = JSON.parse(fs.readFileSync(enPath, "utf8"));

// Hardcoded defaults for FR, HT, ES
const existingTranslations = {
  fr: {
    title: "Nos Projets",
    intro:
      "Découvrez nos principales initiatives pour restaurer la dignité, reconstruire l'espoir et renouveler la vision en Haïti.",
    motto: "Chaque projet est une promesse pour l'avenir.",
    items: [
      { title: "Eau potable", description: "Fournir de l'eau potable sûre.", icon: "droplet" },
      { title: "Éducation", description: "Des écoles pour la prochaine génération.", icon: "graduation-cap" },
      { title: "Santé", description: "Accès aux centres de santé.", icon: "hospital" },
      { title: "Infrastructures", description: "Reconstruire routes et ponts.", icon: "building" },
      { title: "Agriculture", description: "Soutenir les agriculteurs locaux.", icon: "leaf" },
      { title: "Technologie", description: "Programmes d'inclusion numérique.", icon: "cpu" }
    ]
  },
  ht: {
    title: "Pwojè Nou yo",
    intro:
      "Dekouvri prensipal inisyativ nou yo pou retabli diyite, rebati espwa, ak renouvle vizyon nan Ayiti.",
    motto: "Chak pwojè se yon pwomès pou lavni.",
    items: [
      { title: "Dlo Pwòp", description: "Bay dlo pou bwè ki an sekirite.", icon: "droplet" },
      { title: "Edikasyon", description: "Lekòl pou pwochen jenerasyon an.", icon: "graduation-cap" },
      { title: "Sante", description: "Aksè nan sant medikal yo.", icon: "hospital" },
      { title: "Enfrastrikti", description: "Rebati pon ak wout.", icon: "building" },
      { title: "Agrikilti", description: "Sipòte kiltivatè lokal yo.", icon: "leaf" },
      { title: "Teknoloji", description: "Pwogram enklizyon dijital.", icon: "cpu" }
    ]
  },
  es: {
    title: "Nuestros Proyectos",
    intro:
      "Descubre nuestras principales iniciativas para restaurar la dignidad, reconstruir la esperanza y renovar la visión en Haití.",
    motto: "Cada proyecto es una promesa para el futuro.",
    items: [
      { title: "Agua potable", description: "Proveer agua segura para beber.", icon: "droplet" },
      { title: "Educación", description: "Escuelas para la próxima generación.", icon: "graduation-cap" },
      { title: "Salud", description: "Acceso a centros médicos.", icon: "hospital" },
      { title: "Infraestructura", description: "Reconstruir carreteras y puentes.", icon: "building" },
      { title: "Agricultura", description: "Apoyar a los agricultores locales.", icon: "leaf" },
      { title: "Tecnología", description: "Programas de inclusión digital.", icon: "cpu" }
    ]
  }
};

// Sync each locale against English
locales.forEach((locale) => {
  const filePath = path.join(baseDir, locale, "projects.json");

  // Start with actual file content if available
  let data = {};
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  // Overlay existing translations as defaults
  data = { ...existingTranslations[locale], ...data };

  // Ensure top-level fields
  ["title", "intro", "motto"].forEach((key) => {
    if (!(key in data)) {
      data[key] = `[${locale}] MISSING TRANSLATION`;
    }
  });

  // Handle items array
  if (Array.isArray(enData.items)) {
    if (!Array.isArray(data.items)) data.items = [];
    enData.items.forEach((enItem, idx) => {
      if (!data.items[idx]) {
        data.items[idx] = {
          title: `[${locale}] MISSING TITLE`,
          description: `[${locale}] MISSING DESCRIPTION`,
          icon: enItem.icon,
        };
      } else if (!data.items[idx].icon) {
        data.items[idx].icon = enItem.icon;
      }
    });
  }

  // Handle categories (alternative structure)
  if (enData.categories) {
    if (!data.categories) data.categories = {};
    Object.keys(enData.categories).forEach((key) => {
      if (!(key in data.categories)) {
        data.categories[key] = `[${locale}] MISSING TRANSLATION`;
      }
    });
  }

  // Handle callToAction
  if (enData.callToAction && !data.callToAction) {
    data.callToAction = `[${locale}] MISSING TRANSLATION`;
  }

  // Save back to file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  console.log(`✅ Synced ${locale}/projects.json with English template (kept manual edits + defaults)`);
});
