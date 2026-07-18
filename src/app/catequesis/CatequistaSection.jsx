import { TOKENS } from "./theme";
import { SectionIcon } from "./sectionIcons";

// One `### ` section of the "Para catequistas" body (Objetivo, Apertura,
// Desarrollo, ...), given its own left-border + tint band + icon so a
// catequista can spot section boundaries at a glance, not just by heading
// color. `scrollMarginTop` keeps the sticky SectionNav from covering the
// heading when a jump-link lands here.
export default function CatequistaSection({ slug, title, children }) {
  return (
    <section
      id={slug}
      style={{
        marginTop: 22,
        scrollMarginTop: 64,
        borderLeft: `3px solid ${TOKENS.oxblood}`,
        background: "rgba(195, 116, 25, 0.055)",
        borderRadius: "0 10px 10px 0",
        padding: "16px 20px 18px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <SectionIcon title={title} size={17} color={TOKENS.oxbloodDeep} strokeWidth={2.25} />
        <h3
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 15.5,
            fontWeight: 700,
            color: TOKENS.oxbloodDeep,
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}
