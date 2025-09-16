import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'lib', 'i18n', 'dictionaries');

// ✅ Master English version (used as template for others)
const projects = {
  title: "Our Projects",
  intro: "Discover our key initiatives to restore dignity, rebuild hope, and renew vision across Haiti.",
  motto: "Each project is a promise to the future.",
  items: [
    {
      title: "Healthcare for All",
      description: "Community clinics providing accessible care for everyone."
    },
    {
      title: "Quality Education",
      description: "Well-equipped schools preparing the next generation."
    },
    {
      title: "National Reforestation",
      description: "Planting millions of trees to combat deforestation."
    },
    {
      title: "Youth Empowerment",
      description: "Mentorship programs for personal and professional growth."
    },
    {
      title: "Resilient Infrastructure",
      description: "Building durable roads, bridges, and housing."
    },
    {
      title: "Community Leadership",
      description: "Encouraging civic engagement and local governance."
    }
  ]
};

// 📝 Localized versions
const translations = {
  fr: {
    title: "Nos Projets",
    intro: "Découvrez nos initiatives clés pour restaurer la dignité, reconstruire l'espoir et renouveler la vision à travers Haïti.",
    motto: "Chaque projet est une promesse pour l'avenir.",
    items: [
      { title: "Soins de Santé pour Tous", description: "Des cliniques communautaires offrant des soins accessibles à tous." },
      { title: "Éducation de Qualité", description: "Des écoles bien équipées préparant la prochaine génération." },
      { title: "Reboisement National", description: "Planter des millions d'arbres pour lutter contre la déforestation." },
      { title: "Autonomisation des Jeunes", description: "Des programmes de mentorat pour la croissance personnelle et professionnelle." },
      { title: "Infrastructures Résilientes", description: "Construire des routes, ponts et logements durables." },
      { title: "Leadership Communautaire", description: "Encourager l'engagement civique et la gouvernance locale." }
    ]
  },
  ht: {
    title: "Pwojè Nou yo",
    intro: "Dekouvri inisyativ kle nou yo pou retabli diyite, rebati espwa, epi renouvle vizyon atravè Ayiti.",
    motto: "Chak pwojè se yon pwomès pou lavni.",
    items: [
      { title: "Swen Sante pou Tout Moun", description: "Klinik kominotè k ap bay swen ki aksesib pou tout moun." },
      { title: "Edikasyon Kalite", description: "Lekòl byen ekipe k ap prepare pwochen jenerasyon an." },
      { title: "Rebwasman Nasyonal", description: "Plante dè milyon pyebwa pou konbat deforestasyon." },
      { title: "Otonomi Jèn yo", description: "Pwogram mentorat pou devlopman pèsonèl ak pwofesyonèl." },
      { title: "Enfrastrikti Rezilyan", description: "Konstriksyon wout, pon, ak kay ki dire lontan." },
      { title: "Lidèchip Kominotè", description: "Ankouraje patisipasyon sitwayen ak bon gouvènans lokal." }
    ]
  },
  es: {
    title: "Nuestros Proyectos",
    intro: "Descubre nuestras iniciativas clave para restaurar la dignidad, reconstruir la esperanza y renovar la visión en toda Haití.",
    motto: "Cada proyecto es una promesa para el futuro.",
    items: [
      { title: "Atención Médica para Todos", description: "Clínicas comunitarias que brindan atención accesible para todos." },
      { title: "Educación de Calidad", description: "Escuelas bien equipadas que preparan a la próxima generación." },
      { title: "Reforestación Nacional", description: "Plantar millones de árboles para combatir la deforestación." },
      { title: "Empoderamiento Juvenil", description: "Programas de mentoría para el crecimiento personal y profesional." },
      { title: "Infraestructura Resiliente", description: "Construcción de carreteras, puentes y viviendas duraderas." },
      { title: "Liderazgo Comunitario", description: "Fomentar la participación cívica y la gobernanza local." }
    ]
  }
};

function writeFile(locale, content) {
  const filePath = path.join(basePath, locale, 'projects.json');
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
  console.log(`✅ Updated ${locale}/projects.json`);
}

// ✨ Update all locales
writeFile('en', projects);
Object.entries(translations).forEach(([locale, content]) => {
  writeFile(locale, content);
});

console.log("🎉 All project dictionaries updated successfully!");
