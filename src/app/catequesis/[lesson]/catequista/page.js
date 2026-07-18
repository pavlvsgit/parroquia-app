import { notFound } from "next/navigation";
import Link from "next/link";
import { GraduationCap, BookOpen } from "lucide-react";
import { TOKENS, FONT_IMPORT, lessonGridCss } from "../../theme";
import LessonHeader from "../../LessonHeader";
import LessonTags from "../../LessonTags";
import ScriptureCitation from "../../ScriptureCitation";
import MarkdownBlock from "../../MarkdownBlock";
import CatequistaSection from "../../CatequistaSection";
import SectionNav from "../../SectionNav";
import DesarrolloSteps from "../../DesarrolloSteps";
import { loadLessonPage } from "../../data";
import { parseCatequistaSections } from "../../parseCatequistaSections";

export default async function LeccionCatequistaPage({ params }) {
  const { lesson: slug } = await params;
  const data = loadLessonPage(slug);
  if (!data) notFound();

  const { lesson, citas, totalLessons } = data;
  const { intro, sections } = parseCatequistaSections(lesson.paraCatequistas);

  return (
    <div
      style={{
        background: TOKENS.paper,
        minHeight: "100%",
        fontFamily: "'Public Sans', sans-serif",
        color: TOKENS.ink,
      }}
    >
      <style>{FONT_IMPORT}</style>
      <style>{lessonGridCss(760)}</style>

      <div
        style={{
          background: TOKENS.ink,
          color: TOKENS.paper,
          textAlign: "center",
          fontSize: 12,
          padding: "8px 12px",
          letterSpacing: "0.04em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <GraduationCap size={14} /> Vista para catequistas — notas completas para preparar la clase
      </div>

      <main className="lesson-shell">
        <LessonHeader lesson={lesson} totalLessons={totalLessons} className="lesson-header" />
        <div className="lesson-sidebar">
          <LessonTags tags={lesson.tags} />
          <SectionNav sections={sections} variant="desktop" />
        </div>

        <div className="lesson-main">
          {citas.length > 0 && (
            <section style={{ marginTop: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <BookOpen size={16} color={TOKENS.oxblood} />
                <span
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: TOKENS.oxbloodDeep,
                  }}
                >
                  Citas bíblicas de la clase
                </span>
              </div>
              {citas.map((cita) => (
                <ScriptureCitation key={cita.referencia} cita={cita} showNote />
              ))}
            </section>
          )}

          <SectionNav sections={sections} variant="mobile" />

          <div style={{ marginTop: 8 }}>
            {intro && <MarkdownBlock size="dense">{intro}</MarkdownBlock>}
            {sections.map((section) => (
              <CatequistaSection key={section.slug} slug={section.slug} title={section.title}>
                {/^desarrollo/i.test(section.title) ? (
                  <DesarrolloSteps body={section.body} />
                ) : (
                  <MarkdownBlock size="dense">{section.body}</MarkdownBlock>
                )}
              </CatequistaSection>
            ))}
          </div>

          <p style={{ marginTop: 20 }}>
            <Link
              href={`/catequesis/${slug}`}
              style={{ fontSize: 13, color: TOKENS.green, fontWeight: 600 }}
            >
              ← Ver vista de estudiante
            </Link>
          </p>

          <p style={{ marginTop: 8 }}>
            <Link href="/catequesis" style={{ fontSize: 12.5, color: "#9ca3af", fontWeight: 600 }}>
              ← Todas las lecciones
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
