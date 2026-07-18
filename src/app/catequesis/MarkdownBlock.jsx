import ReactMarkdown from "react-markdown";
import { TOKENS } from "./theme";

// oxblood (#c37419) is only 3.00:1 against `paper` — below the 4.5:1 AA
// minimum for normal-weight text. oxbloodDeep clears 4.5:1 on every
// background this renders on, so headings stay legible without relying on
// the bold/large-text exception.
const HEADING_SIZE = { 2: 17, 3: 15, 4: 13.5 };

function SectionHeading({ level, children }) {
  return (
    <div
      style={{
        fontFamily: "'Public Sans', sans-serif",
        fontSize: HEADING_SIZE[level],
        fontWeight: 700,
        color: TOKENS.oxbloodDeep,
        margin: level === 4 ? "18px 0 8px" : "24px 0 10px",
      }}
    >
      {children}
    </div>
  );
}

// Renders a lesson's raw markdown (paraCatequistas / paraEstudiantes text) with
// this feature's fonts/colors. Deliberately generic — it renders whatever
// markdown a lesson file contains, it doesn't assume a particular structure.
export default function MarkdownBlock({ children, size = "normal" }) {
  const fontSize = size === "dense" ? 15 : 16.5;

  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => <SectionHeading level={2}>{children}</SectionHeading>,
        h3: ({ children }) => <SectionHeading level={3}>{children}</SectionHeading>,
        h4: ({ children }) => <SectionHeading level={4}>{children}</SectionHeading>,
        p: ({ children }) => (
          <p style={{ fontSize, lineHeight: 1.75, color: TOKENS.ink, margin: "0 0 16px" }}>
            {children}
          </p>
        ),
        strong: ({ children }) => <strong style={{ color: TOKENS.oxbloodDeep }}>{children}</strong>,
        em: ({ children }) => <em>{children}</em>,
        ul: ({ children }) => (
          <ul
            style={{
              margin: "0 0 16px",
              paddingLeft: 20,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {children}
          </ul>
        ),
        li: ({ children }) => (
          <li style={{ fontSize: fontSize - 1, lineHeight: 1.65, color: "#3f4653" }}>{children}</li>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
