import { ensureExtracted } from "../../src/lib/biblia/extract.js";
import { getVerse } from "../../src/lib/biblia/parser.js";

const references = process.argv.slice(2);

if (references.length === 0) {
  console.error('Uso: node scripts/biblia/lookup.mjs "Éxodo 3:14" "1 Pedro 3:15"');
  process.exit(1);
}

const oebpsDir = ensureExtracted();

for (const reference of references) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(reference);
  console.log("=".repeat(60));
  try {
    const result = getVerse(oebpsDir, reference);
    console.log(`\n${result.book} ${result.chapter}:${result.verse}`);
    console.log(result.text);

    if (result.footnotes.length === 0) {
      console.log("\n(sin nota al pie)");
    } else {
      result.footnotes.forEach((note, i) => {
        console.log(`\n--- Nota ${i + 1} ---`);
        console.log(note);
      });
    }
  } catch (err) {
    console.error(`\nERROR: ${err.message}`);
  }
}
