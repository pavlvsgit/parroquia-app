// Splits the raw "Para catequistas" markdown into the structure the
// catequista view renders as distinct blocks: top-level `### ` sections,
// and (for Desarrollo-style bodies) the `#### ` numbered steps and any
// `**a) Label.**` lettered sub-arguments inside them.
export function parseCatequistaSections(markdown) {
  if (!markdown) return { intro: "", sections: [] };

  const chunks = markdown.split(/\n(?=### )/);
  let intro = "";
  const sections = [];

  for (const chunk of chunks) {
    const match = chunk.match(/^### (.+)\n([\s\S]*)$/);
    if (match) {
      const title = match[1].trim();
      sections.push({
        title,
        shortTitle: title.replace(/\s*\(.*?\)\s*$/, "").trim(),
        slug: slugify(title),
        body: match[2].trim(),
      });
    } else if (!sections.length) {
      intro = chunk.trim();
    }
  }

  return { intro, sections };
}

export function parseSteps(body) {
  const chunks = body.split(/\n(?=#### )/);
  const introParts = [];
  const steps = [];

  for (const chunk of chunks) {
    const match = chunk.match(/^#### (.+)\n([\s\S]*)$/);
    if (match) {
      steps.push({
        title: match[1].trim().replace(/^\d+\.\s*/, ""),
        body: match[2].trim(),
      });
    } else if (!steps.length) {
      introParts.push(chunk);
    }
  }

  return { intro: introParts.join("\n\n").trim(), steps };
}

// Pulls out paragraphs shaped like "**a) Label.** rest of text" — the
// lettered sub-arguments/analogies used inside some Desarrollo steps.
export function splitLetteredItems(body) {
  const paragraphs = body.split(/\n\n+/);
  const leading = [];
  const items = [];

  for (const para of paragraphs) {
    const match = para.match(/^\*\*([a-záéíóúñ])\)\s*([^*]+?)\*\*\s*([\s\S]*)$/i);
    if (match) {
      items.push({ letter: match[1], label: match[2].trim(), body: match[3].trim() });
    } else if (!items.length) {
      leading.push(para);
    } else {
      items[items.length - 1].body += "\n\n" + para;
    }
  }

  return { leading: leading.join("\n\n").trim(), items };
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
