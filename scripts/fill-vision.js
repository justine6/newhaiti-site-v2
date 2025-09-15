// scripts/harmonize-vision.js
const fs = require('fs');
const path = require('path');

// ✅ Locales to synchronize
const locales = ['en', 'fr', 'es', 'ht'];
const dictionariesDir = path.join(__dirname, '../lib/i18n/dictionaries');

// ✅ CLI flag: node scripts/harmonize-vision.js --translate
const useTranslations = process.argv.includes('--translate');

// ✅ Translations for each locale (only used with --translate)
const translations = {
  en: {
    title: 'Ayiti 2075 — Our Shared Vision',
    intro: 'A future grounded in dignity, resilience, and collective progress.',
    sections: [
      { heading: 'Dignity', content: 'Center people in every decision we make.' },
      {
        heading: 'Resilience',
        content: 'Build communities and systems that thrive through change.',
      },
      { heading: 'Unity', content: 'Mobilize Haitians at home and across the diaspora.' },
    ],
    videos: [
      {
        title: 'Welcome to Ayiti 2075',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        caption: 'A brief introduction to our long-term vision.',
      },
      {
        title: 'Community Resilience',
        url: 'https://vimeo.com/123456789',
        caption: 'Stories of local leadership and collective action.',
      },
    ],
  },
  fr: {
    title: 'Ayiti 2075 — Une Vision Partagée',
    intro:
      'D’ici 2075, Haïti se tient comme une nation de dignité, de résilience et de prospérité partagée—bâtie par les communautés au pays et dans la diaspora.',
    sections: [
      {
        heading: 'La Dignité d’Abord',
        content:
          'Nous plaçons la dignité humaine au cœur des décisions—justice, sécurité et accès aux services essentiels pour chacun.',
      },
      {
        heading: 'Opportunité & Éducation',
        content:
          'De la petite enfance aux compétences techniques et à l’université, chaque Haïtien peut apprendre, construire et diriger.',
      },
      {
        heading: 'Résilience & Infrastructures',
        content:
          'Nous investissons dans les routes, le logement, l’eau potable, les cliniques et le numérique—des systèmes qui résistent aux chocs et servent tous.',
      },
      {
        heading: 'Une Économie Verte et Prospère',
        content:
          'Agriculture locale, reboisement et entrepreneuriat alimentent l’emploi, les exportations et une croissance sobre en carbone.',
      },
      {
        heading: 'Unité avec la Diaspora',
        content:
          'Les Haïtiens d’ici et d’ailleurs co-investissent, co-créent et co-gouvernent—reliant talents, capitaux et espoir.',
      },
    ],
    videos: [
      {
        title: 'Bienvenue à Ayiti 2075',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        caption: 'Une brève introduction à notre vision à long terme.',
      },
      {
        title: 'Résilience Communautaire',
        url: 'https://vimeo.com/76979871',
        caption: 'Histoires de leadership local et d’action collective.',
      },
    ],
  },
  es: {
    title: 'Ayiti 2075 — Una Visión Compartida',
    intro:
      'Para 2075, Haití será una nación de dignidad, resiliencia y prosperidad compartida—construida por comunidades en el país y en la diáspora.',
    sections: [
      {
        heading: 'La Dignidad Primero',
        content:
          'Ponemos la dignidad humana en el centro de todas las decisiones—justicia, seguridad y servicios esenciales para todos.',
      },
      {
        heading: 'Oportunidad y Educación',
        content:
          'Desde la infancia hasta las habilidades técnicas y universitarias, cada haitiano puede aprender, construir y liderar.',
      },
      {
        heading: 'Resiliencia e Infraestructura',
        content:
          'Invertimos en carreteras, viviendas, agua potable, clínicas y lo digital—sistemas que resisten los choques y sirven a todos.',
      },
      {
        heading: 'Una Economía Verde y Próspera',
        content:
          'La agricultura local, la reforestación y el emprendimiento impulsan empleos, exportaciones y un crecimiento bajo en carbono.',
      },
      {
        heading: 'Unidad con la Diáspora',
        content:
          'Los haitianos dentro y fuera co-invierten, co-crean y co-gobiernan—uniendo talentos, capital y esperanza.',
      },
    ],
    videos: [
      {
        title: 'Bienvenidos a Ayiti 2075',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        caption: 'Una breve introducción a nuestra visión a largo plazo.',
      },
      {
        title: 'Resiliencia Comunitaria',
        url: 'https://vimeo.com/76979871',
        caption: 'Historias de liderazgo local y acción colectiva.',
      },
    ],
  },
  ht: {
    title: 'Ayiti 2075 — Vizyon Nou Pataje',
    intro:
      'Nan 2075, Ayiti kanpe kòm yon nasyon diyite, rezilyans ak pwosperite pataje—bati pa kominote yo lakay ak nan dyaspora a.',
    sections: [
      {
        heading: 'Diyite Premye',
        content:
          'Nou mete diyite moun nan sant tout desizyon—jisitis, sekirite ak sèvis esansyèl pou chak moun.',
      },
      {
        heading: 'Oportunite ak Edikasyon',
        content:
          'Depi nan timoun rive nan ladrès teknik ak inivèsite, chak Ayisyen ka aprann, konstwi ak dirije.',
      },
      {
        heading: 'Rezilyans ak Enfrastrikti',
        content:
          'Nou envesti nan wout, lojman, dlo pwòp, klinik ak dijital—sistèm ki ka kenbe chòk epi sèvi tout moun.',
      },
      {
        heading: 'Yon Ekonomi Vèt ak Pwospè',
        content:
          'Agrikilti lokal, rebwazman ak antreprenarya ap bay travay, ekspòtasyon ak yon kwasans ki respekte klima.',
      },
      {
        heading: 'Inite ak Dyaspora',
        content:
          'Ayisyen lakay ak aletranje ap ko-envèsti, ko-kreye ak ko-gouvène—mete talan, kapital ak espwa ansanm.',
      },
    ],
    videos: [
      {
        title: 'Byenveni nan Ayiti 2075',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        caption: 'Yon ti entwodiksyon sou vizyon long tèm nou.',
      },
      {
        title: 'Rezilyans Kominotè',
        url: 'https://vimeo.com/76979871',
        caption: 'Istwa lidèchip lokal ak aksyon kolektif.',
      },
    ],
  },
};

// ✅ Use English as the fallback source
const baseFile = path.join(dictionariesDir, 'en', 'vision.json');

if (!fs.existsSync(baseFile)) {
  console.error(`❌ Missing base file: ${baseFile}`);
  process.exit(1);
}

const baseContent = fs.readFileSync(baseFile, 'utf8');

// ✅ Apply updates
locales.forEach(locale => {
  const targetDir = path.join(dictionariesDir, locale);
  const targetFile = path.join(targetDir, 'vision.json');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`📂 Created folder: ${targetDir}`);
  }

  const content = useTranslations ? JSON.stringify(translations[locale], null, 2) : baseContent;

  fs.writeFileSync(targetFile, content, 'utf8');
  console.log(
    useTranslations
      ? `🌍 Updated ${locale}/vision.json with translations`
      : `✅ Synced ${locale}/vision.json with English source`
  );
});

console.log(
  useTranslations
    ? '🎉 All locales updated with translations!'
    : '🎉 All locales harmonized with English!'
);
