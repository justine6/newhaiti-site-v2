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

function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function createFile(filePath, section) {
  let template = {};
  if (section === 'join') {
    template = {
      title: 'TODO: translate title',
      description: 'TODO: translate description',
      cta: 'TODO: translate cta',
      form: {
        name: 'TODO: translate name',
        email: 'TODO: translate email',
        phone: 'TODO: translate phone',
        location: 'TODO: translate location',
        message: 'TODO: translate message',
        submit: 'TODO: translate submit',
      },
    };
  } else {
    for (const key of requiredKeys[section] || []) {
      template[key] = `TODO: translate ${key}`;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(template, null, 2));
  const msg = `🆕 Created missing file: ${filePath}`;
  console.log(msg);
  report.push(msg);
}

function checkDictionaries() {
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
          createFile(filePath, section);
        }
        continue;
      }

      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        if (section === 'join') {
          // Top-level keys
          const missingTop = requiredKeys.join.keys.filter(k => !(k in content));
          if (missingTop.length > 0) {
            const msg = `⚠️ Missing top-level keys in ${locale}/${section}.json → ${missingTop.join(', ')}`;
            console.warn(msg);
            report.push(msg);
            allGood = false;
          }

          // Form keys
          if (content.form && typeof content.form === 'object') {
            const missingForm = requiredKeys.join.formKeys.filter(k => !(k in content.form));
            if (missingForm.length > 0) {
              const msg = `⚠️ Missing form keys in ${locale}/${section}.json → ${missingForm.join(', ')}`;
              console.warn(msg);
              report.push(msg);
              allGood = false;

              if (APPLY_FIX) {
                for (const key of missingForm) {
                  content.form[key] = `TODO: translate ${key}`;
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
          }
        } else {
          // Regular sections
          const keys = requiredKeys[section] || [];
          const missingKeys = keys.filter(key => !(key in content));

          if (missingKeys.length > 0) {
            const msg = `⚠️ Missing keys in ${locale}/${section}.json → ${missingKeys.join(', ')}`;
            console.warn(msg);
            report.push(msg);
            allGood = false;

            if (APPLY_FIX) {
              for (const key of missingKeys) {
                content[key] = `TODO: translate ${key}`;
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

  // Write final report to file
  fs.writeFileSync(reportFile, report.join('\n'), 'utf-8');

  if (allGood) {
    console.log('🎉 All dictionaries are complete and valid!');
    report.push('🎉 All dictionaries are complete and valid!');
  } else {
    console.log('⚠️ Some issues found. Run with --apply to auto-fix.');
    report.push('⚠️ Some issues found. Run with --apply to auto-fix.');
  }

  console.log(`📝 Report saved to ${reportFile}`);
}

// Run the check immediately
checkDictionaries();
