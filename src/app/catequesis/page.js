import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllLessons } from "@/lib/lessons";
import { TOKENS, FONT_IMPORT } from "./theme";

export default function CatequesisPage() {
  const lessons = getAllLessons();

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

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "36px 20px 56px" }}>
        <div
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: TOKENS.oxbloodDeep,
            marginBottom: 8,
          }}
        >
          Catecismo para bárbaros
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 5vw, 38px)",
            color: TOKENS.ink,
            margin: "0 0 28px 0",
            lineHeight: 1.15,
          }}
        >
          Lecciones de catequesis
        </h1>

        {lessons.length === 0 ? (
          <p style={{ fontSize: 15, color: "#6b7280" }}>
            Todavía no hay lecciones en <code>content/catequesis</code>.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {lessons.map((lesson) => (
              <Link
                key={lesson.slug}
                href={`/catequesis/${lesson.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  background: "#fff",
                  border: `1px solid ${TOKENS.paperDeep}`,
                  borderRadius: 12,
                  padding: "16px 18px",
                  textDecoration: "none",
                  color: TOKENS.ink,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: TOKENS.oxbloodDeep,
                      marginBottom: 4,
                    }}
                  >
                    Clase {lesson.lesson}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontWeight: 600,
                      fontSize: 17,
                      marginBottom: lesson.tags.length ? 8 : 0,
                    }}
                  >
                    {lesson.title}
                  </div>
                  {lesson.tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {lesson.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 11.5,
                            fontWeight: 600,
                            color: TOKENS.green,
                            background: TOKENS.paper,
                            border: `1px solid ${TOKENS.paperDeep}`,
                            borderRadius: 999,
                            padding: "3px 10px",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <ChevronRight size={18} color="#9ca3af" style={{ flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
