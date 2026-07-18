import { TOKENS } from "./theme";

// Pulled out of LessonHeader so it can render as a sticky desktop sidebar
// (see lessonGridCss in theme.js) instead of stacking under the title.
export default function LessonTags({ tags, className }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={className} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: TOKENS.green,
            background: "#fff",
            border: `1px solid ${TOKENS.paperDeep}`,
            borderRadius: 999,
            padding: "4px 12px",
            height: "fit-content",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
