import { notFound } from "next/navigation";
import Link from "next/link";
import { PlayCircle, HelpCircle, BookOpen } from "lucide-react";
import { TOKENS, FONT_IMPORT, lessonGridCss } from "../theme";
import LessonHeader from "../LessonHeader";
import LessonTags from "../LessonTags";
import ScriptureCitation from "../ScriptureCitation";
import MarkdownBlock from "../MarkdownBlock";
import { loadLessonPage } from "../data";

export default async function LeccionEstudiantePage({ params }) {
  const { lesson: slug } = await params;
  const data = loadLessonPage(slug);
  if (!data) notFound();

  const { lesson, citas, totalLessons } = data;
  const hasVideo = typeof lesson.videoUrl === "string" && lesson.videoUrl.startsWith("http");

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
      <style>{lessonGridCss(560)}</style>

      <main className="lesson-shell">
        <LessonHeader lesson={lesson} totalLessons={totalLessons} className="lesson-header" />
        <LessonTags tags={lesson.tags} className="lesson-tags" />

        <div className="lesson-main">
          <section style={{ marginTop: 32 }}>
            <MarkdownBlock>{lesson.paraEstudiantes.resumen}</MarkdownBlock>
          </section>

          {citas.length > 0 && (
            <section style={{ marginTop: 8, marginBottom: 24 }}>
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
                  Palabra de Dios
                </span>
              </div>
              {citas.map((cita) => (
                <ScriptureCitation key={cita.referencia} cita={cita} />
              ))}
            </section>
          )}

          {lesson.paraEstudiantes.paraPensar && (
            <section
              style={{
                marginTop: 8,
                background: "#fff",
                border: `1px solid ${TOKENS.paperDeep}`,
                borderRadius: 14,
                padding: "20px 20px 22px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <HelpCircle size={18} color={TOKENS.oxblood} />
                <span
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 600,
                    fontSize: 17,
                    color: TOKENS.ink,
                  }}
                >
                  Para pensar
                </span>
              </div>
              <p
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.7,
                  color: "#3f4653",
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                {lesson.paraEstudiantes.paraPensar}
              </p>
            </section>
          )}

          <div style={{ marginTop: 28 }}>
            {hasVideo ? (
              <a
                href={lesson.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  width: "100%",
                  boxSizing: "border-box",
                  background: TOKENS.oxblood,
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: 12,
                  padding: "16px 20px",
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'Public Sans', sans-serif",
                }}
              >
                <PlayCircle size={20} /> Ver el video de la clase
              </a>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  width: "100%",
                  boxSizing: "border-box",
                  background: TOKENS.paperDeep,
                  color: "#6b7280",
                  borderRadius: 12,
                  padding: "16px 20px",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                <PlayCircle size={20} /> Video: enlace pendiente
              </div>
            )}
          </div>

          <p style={{ textAlign: "center", marginTop: 22 }}>
            <Link
              href={`/catequesis/${slug}/catequista`}
              style={{ fontSize: 13, color: TOKENS.green, fontWeight: 600 }}
            >
              Ver notas para catequistas →
            </Link>
          </p>

          <p style={{ textAlign: "center", marginTop: 12 }}>
            <Link href="/catequesis" style={{ fontSize: 12.5, color: "#9ca3af", fontWeight: 600 }}>
              ← Todas las lecciones
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
