import { ensureExtracted } from "./extract.js";
import { getVerse } from "./parser.js";

// Resolves lesson frontmatter's scriptureRefs (plain reference strings, e.g.
// "Éxodo 3:14") into verse text + a footnote, for <ScriptureCitation>.
// Deliberately fails soft: the EPUB lives at a personal-machine path
// (see extract.js), so any environment where it's missing should still
// render the lesson page — just without resolved scripture text.
export function resolveCitations(scriptureRefs = []) {
  if (scriptureRefs.length === 0) return [];

  let oebpsDir;
  try {
    oebpsDir = ensureExtracted();
  } catch (err) {
    console.warn(`[biblia] No se pudo preparar el EPUB: ${err.message}`);
    return scriptureRefs.map((referencia) => ({ referencia, texto: null, nota: null }));
  }

  return scriptureRefs.map((referencia) => {
    try {
      const verse = getVerse(oebpsDir, referencia);
      return {
        referencia,
        texto: verse.text,
        nota: verse.footnotes[0] ?? null,
      };
    } catch (err) {
      console.warn(`[biblia] No se pudo resolver "${referencia}": ${err.message}`);
      return { referencia, texto: null, nota: null };
    }
  });
}
