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

function cleanupFile(filePath) {
  if (filePath.endsWith(".bak")) {
    fs.unlinkSync(filePath);
    console.log(`🗑️ Deleted backup: ${filePath}`);
  }
}

console.log("🔍 Cleaning up .bak backup files...");
walkDir(projectRoot, cleanupFile);
console.log("🎉 Done! All .bak backups removed.");
