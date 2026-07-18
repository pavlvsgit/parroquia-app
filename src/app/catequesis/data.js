import { getAllLessons, getLessonBySlug, getLessonSlugs } from "@/lib/lessons";
import { resolveCitations } from "@/lib/biblia/citations";

// Shared by both the student and catechist detail pages so slug validation,
// scripture resolution, and the lesson count aren't each reimplemented twice.
export function loadLessonPage(slug) {
  if (!getLessonSlugs().includes(slug)) return null;

  const lesson = getLessonBySlug(slug);
  const citas = resolveCitations(lesson.scriptureRefs);
  const totalLessons = getAllLessons().length;

  return { lesson, citas, totalLessons };
}
