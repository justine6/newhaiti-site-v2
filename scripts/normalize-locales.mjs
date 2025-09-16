// scripts/normalize-locales.mjs
import fs from "fs";
import path from "path";

const projectRoot = process.cwd();

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f);

    // 🚫 Skip node_modules and .git
    if (dirPath.includes("node_modules") || dirPath.includes(".git")) return;

    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function normalizeFile(filePath) {
  if (!filePath.match(/\.(ts|tsx|js|mjs)$/)) return;

  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // 1. Fix import { locales }
  content = content.replace(
    /import\s+\{\s*locales\s*\}\s+from\s+["']@\/lib\/i18n\/settings["']/g,
    `import { locales } from "@/lib/i18n/settings"`
  );

  // 2. Fix import { locales as locales }
  content = content.replace(
    /import\s+\{\s*locales\s+as\s+locales\s*\}\s+from\s+["']@\/lib\/i18n\/settings["']/g,
    `import { locales } from "@/lib/i18n/settings"`
  );

  // 3. Replace variable usage of "locales"
  content = content.replace(/\blanguages\b/g, "locales");

  if (content !== original) {
    // 🔒 Backup original file
    fs.writeFileSync(filePath + ".bak", original, "utf8");
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Updated: ${filePath}`);
  }
}

console.log("🔍 Normalizing locales safely...");
walkDir(projectRoot, normalizeFile);
console.log("🎉 Done! All 'locales' replaced with 'locales' (node_modules skipped, backups created).");
