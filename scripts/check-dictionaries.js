import fs from 'fs';
import path from 'path';

const locales = ['en', 'fr', 'ht', 'es'];
const sections = ['home', 'about', 'projects', 'blog', 'newsletter', 'contact', 'vision', 'join'];

// ✅ Required keys for each section
const requiredKeys = {
  home: ['topbar', 'hero', 'mission', 'newsletter', 'projects'],
  about: ['title', 'intro', 'sections'],
  projects: ['title', 'intro', 'motto', 'items'],
  blog: ['title', 'intro', 'posts'],
  newsletter: ['title', 'description', 'placeholder', 'subscribe'],
  contact: ['title', 'description'],
  vision: ['title', 'intro', 'sections'],
  join: {
    keys: ['title', 'description', 'cta', 'form'],
    formKeys: ['name', 'email', 'phone', 'location', 'message', 'submit'],
  },
};

// Pass --apply to auto-fix and create missing files
const APPLY_FIX = process.argv.includes('--apply');

const basePath = path.join(process.cwd(), 'lib', 'i18n', 'dictionaries');
const reportFile = path.join(process.cwd(), 'translation-report.txt');

let report = [];
let allGood = true;
let needsProjectFix = false; // 🔧 track if fix-projects.js should run once

function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function createFile(filePath, section, locale) {
  let template = {};
  if (section === 'join') {
    template = {
      title: `[${locale}] TODO: translate title`,
      description: `[${locale}] TODO: translate description`,
      cta: `[${locale}] TODO: translate cta`,
      form: {
        name: `[${locale}] TODO: translate name`,
        email: `[${locale}] TODO: translate email`,
        phone: `[${locale}] TODO: translate phone`,
        location: `[${locale}] TODO: translate location`,
        message: `[${locale}] TODO: translate message`,
        submit: `[${locale}] TODO: translate submit`,
      },
    };
  } else {
    for (const key of requiredKeys[section] || []) {
      template[key] = `[${locale}] TODO: translate ${key}`;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(template, null, 2));
  const msg = `🆕 Created missing file: ${filePath}`;
  console.log(msg);
  report.push(msg);
}

async function checkDictionaries(isRerun = false) {
  allGood = true;
  needsProjectFix = false;
  report = [];

  for (const locale of locales) {
    const localePath = path.join(basePath, locale);
    ensureDirExists(localePath);

    for (const section of sections) {
      const filePath = path.join(localePath, `${section}.json`);

      if (!fs.existsSync(filePath)) {
        const msg = `❌ Missing file: ${locale}/${section}.json`;
        console.error(msg);
        report.push(msg);
        allGood = false;

        if (APPLY_FIX) {
          createFile(filePath, section, locale);
        }
        continue;
      }

      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        if (section === 'join') {
          const missingTop = requiredKeys.join.keys.filter(k => !(k in content));
          if (missingTop.length > 0) {
            const msg = `⚠️ Missing top-level keys in ${locale}/${section}.json → ${missingTop.join(', ')}`;
            console.warn(msg);
            report.push(msg);
            allGood = false;
          }

          if (content.form && typeof content.form === 'object') {
            const missingForm = requiredKeys.join.formKeys.filter(k => !(k in content.form));
            if (missingForm.length > 0) {
              const msg = `⚠️ Missing form keys in ${locale}/${section}.json → ${missingForm.join(', ')}`;
              console.warn(msg);
              report.push(msg);
              allGood = false;

              if (APPLY_FIX) {
                for (const key of missingForm) {
                  content.form[key] = `[${locale}] TODO: translate ${key}`;
                }
                fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
                const fixMsg = `🛠 Fixed ${locale}/${section}.json by adding missing form keys.`;
                console.log(fixMsg);
                report.push(fixMsg);
              }
            }
          } else {
            const msg = `⚠️ Missing 'form' object in ${locale}/${section}.json`;
            console.warn(msg);
            report.push(msg);
            allGood = false;

            if (APPLY_FIX) {
              content.form = {};
              for (const key of requiredKeys.join.formKeys) {
                content.form[key] = `[${locale}] TODO: translate ${key}`;
              }
              fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
              const fixMsg = `🛠 Fixed ${locale}/${section}.json by adding full form object.`;
              console.log(fixMsg);
              report.push(fixMsg);
            }
          }
} else if (section === 'projects') {
  // Special case: projects must include 6 items
  const keys = requiredKeys.projects;
  const missingKeys = keys.filter(key => !(key in content));

  if (missingKeys.length > 0) {
    const msg = `⚠️ Missing keys in ${locale}/${section}.json → ${missingKeys.join(', ')}`;
    console.warn(msg);
    report.push(msg);
    allGood = false;
  }

  if (!Array.isArray(content.items) || content.items.length !== 6) {
    const msg = `⚠️ ${locale}/${section}.json → must include exactly 6 projects, found ${content.items?.length || 0}`;
    console.warn(msg);
    report.push(msg);
    allGood = false;

    if (APPLY_FIX) {
      try {
        // Load English baseline
        const enPath = path.join(basePath, 'en', 'projects.json');
        const enContent = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

        // Sync items with English template
        content.items = enContent.items;

        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        const fixMsg = `🛠 Synced ${locale}/${section}.json projects with English template.`;
        console.log(fixMsg);
        report.push(fixMsg);
      } catch (syncErr) {
        const errMsg = `❌ Failed syncing ${locale}/${section}.json with English template: ${syncErr.message}`;
        console.error(errMsg);
        report.push(errMsg);
      }
    }
  } else {
    const msg = `✅ ${locale}/${section}.json has 6 projects`;
    console.log(msg);
    report.push(msg);
          }
        } else {
          const keys = requiredKeys[section] || [];
          const missingKeys = keys.filter(key => !(key in content));

          if (missingKeys.length > 0) {
            const msg = `⚠️ Missing keys in ${locale}/${section}.json → ${missingKeys.join(', ')}`;
            console.warn(msg);
            report.push(msg);
            allGood = false;

            if (APPLY_FIX) {
              for (const key of missingKeys) {
                content[key] = `[${locale}] TODO: translate ${key}`;
              }
              fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
              const fixMsg = `🛠 Fixed ${locale}/${section}.json by adding placeholders.`;
              console.log(fixMsg);
              report.push(fixMsg);
            }
          } else {
            const msg = `✅ ${locale}/${section}.json is valid`;
            console.log(msg);
            report.push(msg);
          }
        }
      } catch (err) {
        const msg = `❌ Error parsing ${locale}/${section}.json: ${err.message}`;
        console.error(msg);
        report.push(msg);
        allGood = false;
      }
    }
  }

  if (APPLY_FIX && needsProjectFix && !isRerun) {
    console.log(`🛠 Running fix-projects.js once to repair all project files...`);
    try {
      const { execSync } = await import('child_process');
      execSync('node scripts/fix-projects.js', { stdio: 'inherit' });
      console.log(`✅ Auto-fixed all projects.json files via fix-projects.js`);

      // 🔁 Re-run check once after fixing
      await checkDictionaries(true);
      return;
    } catch (err) {
      console.error(`❌ Failed to auto-fix projects.json files: ${err.message}`);
    }
  }

  fs.writeFileSync(reportFile, report.join('\n'), 'utf-8');

  if (allGood) {
    console.log('🎉 All dictionaries are complete and valid!');
  } else {
    console.log('⚠️ Some issues found. Run with --apply to auto-fix.');
  }

  console.log(`📝 Report saved to ${reportFile}`);
  process.exit(allGood ? 0 : 1);
}

// Run the check immediately
(async () => {
  await checkDictionaries();
})();
