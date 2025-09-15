import fs from 'fs';
import path from 'path';

const locales = ['fr', 'ht', 'es'];
const basePath = path.join(process.cwd(), 'lib', 'i18n', 'dictionaries');

// ✅ Translations for each locale
const translations = {
  fr: {
    title: 'Nos Projets',
    intro: "Explorez nos projets axés sur l'avenir d'Haïti.",
    motto: "Chaque projet est une promesse pour l'avenir.",
    items: [
      {
        title: 'Éducation pour Tous',
        description: "Élargir l'accès à une éducation de qualité en Haïti.",
      },
      {
        title: 'Accès aux Soins',
        description: 'Améliorer les hôpitaux, les cliniques et les soins médicaux.',
      },
      {
        title: 'Eau Potable et Assainissement',
        description: "Garantir un accès universel à l'eau potable.",
      },
    ],
  },
  ht: {
    title: 'Pwojè Nou yo',
    intro: 'Eksplore pwojè misyon nou yo pou lavni Ayiti.',
    motto: 'Chak pwojè se yon pwomès pou lavni.',
    items: [
      {
        title: 'Edikasyon pou Tout Moun',
        description: 'Bay aksè ak bon jan edikasyon nan tout Ayiti.',
      },
      { title: 'Swen Sante', description: 'Amelyore lopital, klinik, ak sèvis medikal.' },
      { title: 'Dlo Pwòp ak Asenisman', description: 'Asire tout kominote gen dlo potab.' },
    ],
  },
  es: {
    title: 'Nuestros Proyectos',
    intro: 'Explora nuestros proyectos que dan forma al futuro de Haití.',
    motto: 'Cada proyecto es una promesa para el futuro.',
    items: [
      {
        title: 'Educación para Todos',
        description: 'Ampliar el acceso a una educación de calidad en Haití.',
      },
      {
        title: 'Acceso a la Salud',
        description: 'Mejorar hospitales, clínicas y servicios médicos.',
      },
      {
        title: 'Agua Potable y Saneamiento',
        description: 'Garantizar acceso universal a agua potable.',
      },
    ],
  },
};

function updateProjects() {
  for (const locale of locales) {
    const filePath = path.join(basePath, locale, 'projects.json');

    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing file: ${locale}/projects.json`);
      continue;
    }

    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Merge translations into existing structure
    const updated = { ...content, ...translations[locale] };

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf-8');
    console.log(`✅ Updated translations in ${locale}/projects.json`);
  }
}

updateProjects();
