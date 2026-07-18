import Image from "next/image";
import { Cross } from "lucide-react";
import { TOKENS } from "./theme";

export default function LessonHeader({ lesson, totalLessons, className }) {
  const hasImage = Boolean(lesson.image?.src);

  return (
    <header className={className}>
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "60%",
          borderRadius: 14,
          overflow: "hidden",
          background: hasImage
            ? TOKENS.paperDeep
            : `linear-gradient(135deg, ${TOKENS.ink} 0%, ${TOKENS.green} 55%, ${TOKENS.oxblood} 100%)`,
        }}
      >
        {hasImage ? (
          // loading="lazy" is next/image's default (no `preload`/`priority` set),
          // so this stays lazy if several lessons ever render on one page.
          <Image
            src={lesson.image.src}
            alt={lesson.image.alt || lesson.title}
            fill
            sizes="(max-width: 700px) 100vw, 760px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Cross size={48} color="rgba(239,234,224,0.35)" strokeWidth={1.25} />
          </div>
        )}
      </div>
      {lesson.image?.credit && (
        <p
          style={{
            fontSize: 12,
            color: "#8a8f98",
            fontStyle: "italic",
            margin: "8px 2px 0",
            lineHeight: 1.5,
          }}
        >
          {lesson.image.credit}
          {lesson.image.license ? ` · ${lesson.image.license}` : ""}
        </p>
      )}

      <div style={{ marginTop: 24 }}>
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
          Clase {lesson.lesson}
          {totalLessons ? ` de ${totalLessons}` : ""}
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: "clamp(26px, 5vw, 38px)",
            color: TOKENS.ink,
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {lesson.title}
        </h1>
      </div>
    </header>
  );
}
