import fs from "fs";
import path from "path";

// Where your dictionaries live
const dictDir = path.join(process.cwd(), "content", "articles");

// Required blogSection keys (no blogPreview)
const requiredBlogKeys = [
  "readMore",
  "fallbackNotice",
  "blogUnavailable",
];

// Collect logs
let report = [];
let allGood = true;

function logMessage(level, msg) {
  const prefix =
    level === "error" ? "❌" : level === "warn" ? "⚠️" : "✅";
  report.push(`${prefix} ${msg}`);
  console.log(`${prefix} ${msg}`);
}


async function checkDictionaries() {
  try {
    const locales = fs.readdirSync(dictDir).filter((f) =>
      fs.statSync(path.join(dictDir, f)).isDirectory()
    );

    for (const locale of locales) {
      logMessage("info", `=== Checking locale: ${locale} ===`);

      const homePath = path.join(dictDir, locale, "home.json");

      try {
        let homeContent = JSON.parse(fs.readFileSync(homePath, "utf-8"));

        // Ensure blogSection exists
        homeContent.blogSection = homeContent.blogSection || {};
        let changed = false;

        for (const key of requiredBlogKeys) {
          if (!(key in homeContent.blogSection)) {
            homeContent.blogSection[key] = `[MISSING ${key}]`;
            logMessage(
              "warn",
              `Added missing key "${key}" in ${locale}/home.json -> blogSection`
            );
            changed = true;
            allGood = false;
          }
        }

        if (changed) {
          fs.writeFileSync(
            homePath,
            JSON.stringify(homeContent, null, 2),
            "utf-8"
          );
        }
      } catch (err) {
        logMessage("error", `Error parsing ${locale}/home.json: ${err.message}`);
        allGood = false;
      }
    }
  } catch (err) {
    logMessage("error", `Unexpected failure: ${err.message}`);
    allGood = false;
  }

  // Save final report
  const reportFile = path.join(process.cwd(), "translation-report.txt");
  fs.writeFileSync(reportFile, report.join("\n"), "utf-8");

  console.log(
    allGood
      ? "🎉 All dictionaries are complete and valid!"
      : "⚠️ Some issues found. Missing keys were auto-fixed where possible."
  );
  console.log(`📝 Detailed report saved to ${reportFile}`);

  process.exit(allGood ? 0 : 1);
}

// Run immediately
(async () => {
  await checkDictionaries();
})();
