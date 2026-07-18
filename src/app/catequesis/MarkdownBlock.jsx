import ReactMarkdown from "react-markdown";
import { TOKENS } from "./theme";

// Renders a lesson's raw markdown (paraCatequistas / paraEstudiantes text) with
// this feature's fonts/colors. Deliberately generic — it renders whatever
// markdown a lesson file contains, it doesn't assume a particular structure.
export default function MarkdownBlock({ children, size = "normal" }) {
  const fontSize = size === "dense" ? 15 : 16.5;

  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p style={{ fontSize, lineHeight: 1.75, color: TOKENS.ink, margin: "0 0 16px" }}>
            {children}
          </p>
        ),
        strong: ({ children }) => <strong style={{ color: TOKENS.oxblood }}>{children}</strong>,
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
