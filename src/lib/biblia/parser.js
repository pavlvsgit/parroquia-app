import { readFileSync } from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

// Structural assumptions this parser is built on (confirmed by inspecting the
// unzipped EPUB directly — see the chat that produced this file):
//
// - One XHTML file per Bible book (not per chapter). toc.ncx maps book
//   labels ("ÉXODO", "PRIMERA CARTA DEL APÓSTOL SAN PEDRO", ...) to files.
// - Within a book file, <body> is a FLAT list of sibling elements (no
//   wrapping <div>s). Chapters start at <h6 class="Capitulo"> headings and
//   run until the next such heading.
// - Verses are NOT individually tagged. A chapter's <p> elements contain
//   running text with inline <sup>N</sup> verse-number markers; a verse's
//   content is everything between one <sup> and the next, which can cross
//   a </p><p> boundary.
// - A verse's footnote, if any, is an inline <a href="fileNN.xhtml#fXXXX"
//   id="rXXXX">[XXXX]</a> marker (position varies: start, middle, or end of
//   the verse). The actual note lives in the target file as
//   <p class="ftn"><a id="fXXXX">[XXXX]</a> &lt;note text&gt;</p>.

const domCache = new Map();

function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const ORDINAL_WORDS = { 1: "PRIMERA", 2: "SEGUNDA", 3: "TERCERA", I: "PRIMERA", II: "SEGUNDA", III: "TERCERA" };

function essentialWords(bookQuery) {
  const parts = normalize(bookQuery).split(" ");
  if (ORDINAL_WORDS[parts[0]]) parts[0] = ORDINAL_WORDS[parts[0]];
  return parts.filter(Boolean);
}

function loadToc(oebpsDir) {
  const xml = readFileSync(path.join(oebpsDir, "toc.ncx"), "utf8");
  const $ = cheerio.load(xml, { xmlMode: true });
  const points = [];
  $("navPoint").each((_, el) => {
    const $el = $(el);
    const label = $el.children("navLabel").first().children("text").first().text().trim();
    const src = $el.children("content").first().attr("src");
    if (!label || !src) return;
    const [file] = src.split("#");
    points.push({ label, file, normLabel: normalize(label) });
  });
  return points;
}

export function resolveBookFile(oebpsDir, bookQuery) {
  const words = essentialWords(bookQuery);
  const navPoints = loadToc(oebpsDir);

  const exact = navPoints.find((n) => n.normLabel === words.join(" "));
  if (exact) return exact;

  const match = navPoints.find((n) => words.every((w) => n.normLabel.includes(w)));
  if (match) return match;

  throw new Error(`No pude resolver el libro "${bookQuery}" en el índice del EPUB (toc.ncx).`);
}

function loadDom(oebpsDir, file) {
  if (domCache.has(file)) return domCache.get(file);
  const html = readFileSync(path.join(oebpsDir, file), "utf8");
  const $ = cheerio.load(html);
  domCache.set(file, $);
  return $;
}

// Returns the flat array of <body> child elements belonging to chapter N:
// from its "Capitulo" heading up to (excluding) the next one.
function getChapterSlice($, chapterNumber) {
  const children = $("body").children().toArray();
  const chapterHeadings = children.filter((el) => $(el).hasClass("Capitulo"));

  if (chapterNumber < 1 || chapterNumber > chapterHeadings.length) {
    throw new Error(`Capítulo ${chapterNumber} fuera de rango (el libro tiene ${chapterHeadings.length}).`);
  }

  const startEl = chapterHeadings[chapterNumber - 1];
  const endEl = chapterHeadings[chapterNumber]; // undefined => last chapter, goes to end of body
  const startIdx = children.indexOf(startEl);
  const endIdx = endEl ? children.indexOf(endEl) : children.length;

  return children.slice(startIdx, endIdx);
}

const FOOTNOTE_HREF = /^(file\d+\.xhtml)#(f\d+)$/;

function finalizeVerse($, number, nodes) {
  let text = "";
  const footnotes = [];

  for (const node of nodes) {
    if (node.type === "text") {
      text += node.data;
      continue;
    }
    if (node.type !== "tag") continue;

    const $node = $(node);
    const href = node.tagName === "a" ? $node.attr("href") || "" : "";
    const footnoteMatch = href.match(FOOTNOTE_HREF);

    if (footnoteMatch) {
      // A footnote marker, e.g. <a href="file85.xhtml#f452">[452]</a> —
      // record it, but don't fold its own "[452]" label into the verse text.
      footnotes.push({ file: footnoteMatch[1], noteId: footnoteMatch[2] });
    } else {
      // Everything else (e.g. <i>(que es)</i> translator insertions) is part
      // of the running verse text.
      text += $node.text();
    }
  }

  return {
    number,
    text: text.replace(/\s+/g, " ").trim(),
    footnotes,
  };
}

// Splits a chapter's <p> content into verses using inline <sup>N</sup>
// markers as boundaries. All <p> elements in the chapter are flattened into
// one ordered node stream first, so a verse can span a </p><p> boundary.
export function parseVersesFromChapter($, chapterSlice) {
  const paragraphs = chapterSlice.filter((el) => el.tagName === "p");

  const flatNodes = [];
  for (const p of paragraphs) {
    flatNodes.push(...$(p).contents().toArray());
    flatNodes.push({ type: "text", data: " " }); // avoid word-mashing across </p><p>
  }

  const verses = [];
  let current = null;

  for (const node of flatNodes) {
    if (node.type === "tag" && node.tagName === "sup") {
      current = { number: Number($(node).text().trim()), nodes: [] };
      verses.push(current);
      continue;
    }
    if (current) current.nodes.push(node);
  }

  return verses.map((v) => finalizeVerse($, v.number, v.nodes));
}

export function resolveFootnote(oebpsDir, file, noteId) {
  const $ = loadDom(oebpsDir, file);
  const $marker = $(`a#${noteId}`);
  if ($marker.length === 0) return null;

  const $note = $marker.closest("p.ftn");
  const $clone = $note.clone();
  $clone.find(`a#${noteId}`).remove(); // strip the leading "[452]" marker itself
  return $clone.text().replace(/\s+/g, " ").trim();
}

const REFERENCE_RE = /^(.+?)\s+(\d+)[:,]\s*(\d+)$/;

export function parseReference(reference) {
  const match = reference.trim().match(REFERENCE_RE);
  if (!match) {
    throw new Error(`No pude interpretar la referencia "${reference}" (esperaba algo como "Éxodo 3:14").`);
  }
  const [, book, chapter, verse] = match;
  return { book: book.trim(), chapter: Number(chapter), verse: Number(verse) };
}

export function getVerse(oebpsDir, reference) {
  const { book, chapter, verse: verseNumber } = parseReference(reference);
  const bookFile = resolveBookFile(oebpsDir, book);
  const $ = loadDom(oebpsDir, bookFile.file);

  const slice = getChapterSlice($, chapter);
  const verses = parseVersesFromChapter($, slice);
  const verse = verses.find((v) => v.number === verseNumber);

  if (!verse) {
    throw new Error(`No encontré el versículo ${verseNumber} en ${bookFile.label} ${chapter}.`);
  }

  const footnotes = verse.footnotes
    .map(({ file, noteId }) => resolveFootnote(oebpsDir, file, noteId))
    .filter(Boolean);

  return {
    book: bookFile.label,
    chapter,
    verse: verse.number,
    text: verse.text,
    footnotes,
  };
}
