#!/usr/bin/env node
// scripts/fix-projects-merge.js
// Merge-based fixer for projects.json across locales
// - preserves translations already present in each locale (by index)
// - fills missing slots from English template with TODO placeholders
// - creates a .bak backup before writing

import fs from 'fs';
import path from 'path';

const locales = ['en', 'fr', 'ht', 'es']; // adjust if you have more
const basePath = path.join(process.cwd(), 'lib', 'i18n', 'dictionaries');
const templateLocale = 'en';
const templatePath = path.join(basePath, templateLocale, 'projects.json');

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`❌ Failed to read/parse ${filePath}: ${err.message}`);
    return null;
  }
}

function writeBackup(filePath) {
  const bak = `${filePath}.bak`;
  try {
    if (fs.existsSync(filePath)) {
      fs.copyFileSync(filePath, bak);
    }
    return bak;
  } catch (err) {
    console.warn(`⚠️ Could not create backup ${bak}: ${err.message}`);
    return null;
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function mergeProjects(template, target, locale) {
  const templateItems = Array.isArray(template.items) ? template.items : [];
  const targetItems = Array.isArray(target.items) ? target.items : [];

  const merged = templateItems.map((tplItem, idx) => {
    const existing = targetItems[idx];

    // base result - copy tpl to ensure icon, etc
    const result = { ...tplItem };

    if (existing && typeof existing === 'object') {
      // preserve translated title/description if provided, else fallback to tpl with TODO marker
      result.title = existing.title && existing.title.trim().length
        ? existing.title
        : `[${locale}] TODO: translate title for "${tplItem.title}"`;

      result.description = existing.description && existing.description.trim().length
        ? existing.description
        : `[${locale}] TODO: translate description for "${tplItem.title}"`;

      // preserve any other fields (icon, extra metadata) from existing if present
      Object.keys(existing).forEach(k => {
        if (k !== 'title' && k !== 'description') {
          result[k] = existing[k];
        }
      });
    } else {
      // target missing item at this index -> create TODO placeholders using template
      result.title = `[${locale}] TODO: translate title for "${tplItem.title}"`;
      result.description = `[${locale}] TODO: translate description for "${tplItem.title}"`;
    }

    return result;
  });

  return { ...target, items: merged, title: target.title ?? template.title, intro: target.intro ?? template.intro, motto: target.motto ?? template.motto };
}

function run() {
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ English template not found at ${templatePath}. Aborting.`);
    process.exit(1);
  }

  const template = readJson(templatePath);
  if (!template) process.exit(1);

  let changedFiles = [];

  for (const locale of locales) {
    if (locale === templateLocale) continue; // skip template itself

    const localeDir = path.join(basePath, locale);
    ensureDir(localeDir);
    const filePath = path.join(localeDir, 'projects.json');

    let target = {};
    if (fs.existsSync(filePath)) {
      target = readJson(filePath) || {};
    } else {
      // if file doesn't exist, create a minimal target object so merge works
      target = {};
    }

    // If the language already has exactly the same items as template and
    // every item appears to have non-empty title & description, skip.
    const targetItems = Array.isArray(target.items) ? target.items : [];
    const allPresent = targetItems.length === (template.items?.length ?? 0)
      && targetItems.every(item => item && item.title && item.title.trim().length && item.description && item.description.trim().length);

    if (allPresent) {
      console.log(`✅ ${locale}/projects.json already has ${targetItems.length} translated projects — skipping.`);
      continue;
    }

    // create backup
    const backup = writeBackup(filePath);

    // build merged content
    const merged = mergeProjects(template, target, locale);

    // write out
    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2) + '\n', 'utf-8');
    console.log(`🔧 Synced ${locale}/projects.json projects with English template.` + (backup ? ` Backup: ${path.basename(backup)}` : ''));
    changedFiles.push(filePath);
  }

  if (changedFiles.length) {
    console.log(`\n✨ Updated ${changedFiles.length} files.`);
  } else {
    console.log(`\n🎉 No changes necessary — all locales already have complete projects.`);
  }
}

run();
