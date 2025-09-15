import * as fs from "fs";
import * as path from "path";

// ✅ Project root
const projectRoot = path.join(process.cwd(), "");

// ✅ File extensions to scan
const extensions = [".ts", ".tsx"];

// ✅ Directories to skip entirely
const skipDirs = ["node_modules", ".next", "scripts/build"];

// ✅ CLI flag: pass `--apply` to actually fix
const dryRun = !process.argv.includes("--apply");

// ✅ Helper: recursively collect files
function getAllFiles(dir: string, allFiles: string[] = []): string[] {
  if (skipDirs.some((skip) => dir.includes(skip))) {
    return allFiles;
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, allFiles);
    } else if (extensions.includes(path.extname(file))) {
      allFiles.push(filePath);
    }
  });

  return allFiles;
}

// ✅ Fix imports
function fixImports(filePath: string) {
  if (skipDirs.some((skip) => filePath.includes(skip))) return;

  const content = fs.readFileSync(filePath, "utf8");
  let updated = content;

  const regex =
    /import\s+(type\s+)?{([^}]+)}\s+from\s+["'](\.{1,2}\/)+types["'];?/g;

  updated = updated.replace(regex, (match, typeKeyword, imports) => {
    const newImport = `import ${typeKeyword || ""}{ ${imports.trim()} } from "@/lib/i18n/types";`;

    if (dryRun) {
      console.log(`📝 [Preview] ${filePath}`);
      console.log(`   Old: ${match}`);
      console.log(`   New: ${newImport}`);
    } else {
      console.log(`✔ Fixed in: ${filePath}`);
    }

    return newImport;
  });

  if (!dryRun && updated !== content) {
    fs.writeFileSync(filePath, updated, "utf8");
  }
}

// ✅ Run cleanup
function run() {
  console.log(
    dryRun
      ? "🔍 Running in DRY-RUN mode (no changes will be written)…"
      : "🔧 Applying fixes to files…"
  );

  const allFiles = getAllFiles(projectRoot);
  allFiles.forEach((file) => fixImports(file));

  console.log(
    dryRun
      ? "✅ Dry-run complete. No files were modified."
      : "✅ Import cleanup complete!"
  );
}

run();
