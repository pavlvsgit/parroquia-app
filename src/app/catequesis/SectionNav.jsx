import { TOKENS } from "./theme";

// Sticky mini table-of-contents for the "Para catequistas" sections — stays
// visible while scrolling so a catequista can jump straight to a section
// (e.g. Desarrollo) mid-class instead of scrolling past everything else.
export default function SectionNav({ sections }) {
  if (!sections.length) return null;

  return (
    <nav
      aria-label="Secciones de la clase"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: TOKENS.paper,
        border: `1px solid ${TOKENS.paperDeep}`,
        borderRadius: 10,
        marginTop: 20,
        padding: "10px 12px",
        display: "flex",
        gap: 8,
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        boxShadow: "0 2px 6px rgba(38,52,74,0.06)",
      }}
    >
      {sections.map((section) => (
        <a
          key={section.slug}
          href={`#${section.slug}`}
          style={{
            flex: "0 0 auto",
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 12.5,
            fontWeight: 600,
            color: TOKENS.oxbloodDeep,
            background: TOKENS.paperDeep,
            border: "1px solid rgba(38,52,74,0.12)",
            borderRadius: 999,
            padding: "6px 13px",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          {section.shortTitle}
        </a>
      ))}
    </nav>
  );
}
