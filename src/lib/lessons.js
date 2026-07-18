import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Server-only: reads content/catequesis/*.md from disk. Do not import from client components.
const LESSONS_DIR = path.join(process.cwd(), "content", "catequesis");

function splitSections(body) {
  const sections = {};
  const chunks = body.split(/\n(?=## )/);
  for (const chunk of chunks) {
    const match = chunk.match(/^## (.+)\n([\s\S]*)$/);
    if (match) {
      const heading = match[1].trim().toLowerCase();
      sections[heading] = match[2].trim();
    }
  }
  return sections;
}

function splitReflection(studentBody) {
  const match = studentBody.match(/^([\s\S]*?)\n### para pensar\n([\s\S]*)$/i);
  if (match) {
    return { resumen: match[1].trim(), paraPensar: match[2].trim() };
  }
  return { resumen: studentBody.trim(), paraPensar: "" };
}

export function getLessonSlugs() {
  if (!fs.existsSync(LESSONS_DIR)) return [];
  return fs
    .readdirSync(LESSONS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getLessonBySlug(slug) {
  const filePath = path.join(LESSONS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const sections = splitSections(content);
  const paraCatequistas = sections["para catequistas"] ?? "";
  const { resumen, paraPensar } = splitReflection(sections["para estudiantes"] ?? "");

  if (!sections["para catequistas"] || !sections["para estudiantes"]) {
    console.warn(
      `[lessons] "${slug}.md" is missing the "## Para catequistas" or "## Para estudiantes" section.`
    );
  }

  return {
    slug,
    lesson: data.lesson,
    title: data.title,
    tags: data.tags ?? [],
    videoUrl: data.videoUrl,
    image: data.image ?? null,
    scriptureRefs: data.scriptureRefs ?? [],
    paraCatequistas,
    paraEstudiantes: { resumen, paraPensar },
  };
}

export function getAllLessons() {
  return getLessonSlugs()
    .map(getLessonBySlug)
    .sort((a, b) => (a.lesson ?? 0) - (b.lesson ?? 0));
}
