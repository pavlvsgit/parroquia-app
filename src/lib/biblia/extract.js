import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

// Server-only. process.cwd() is the project root under both `next dev`/`next
// build` and this repo's own scripts, so no import.meta.url gymnastics needed.
const PROJECT_ROOT = process.cwd();

const DEFAULT_EPUB_PATH = "/home/pavlvs/Books/La Sagrada Biblia -- Juan Straubinger -- 1951.epub";
const CACHE_DIR = path.join(PROJECT_ROOT, ".cache", "biblia-epub");

// Unzips the EPUB into a gitignored cache dir (once) and returns the path to
// its OEBPS folder, which is what the parser actually reads from.
export function ensureExtracted() {
  const epubPath = process.env.BIBLIA_EPUB_PATH || DEFAULT_EPUB_PATH;
  const oebpsDir = path.join(CACHE_DIR, "OEBPS");

  if (!existsSync(oebpsDir)) {
    if (!existsSync(epubPath)) {
      throw new Error(
        `No se encontró el EPUB en "${epubPath}". Configurá BIBLIA_EPUB_PATH si está en otra ubicación.`
      );
    }
    mkdirSync(CACHE_DIR, { recursive: true });
    execFileSync("unzip", ["-o", epubPath, "-d", CACHE_DIR], { stdio: "ignore" });
  }

  return oebpsDir;
}
