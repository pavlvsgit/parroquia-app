import { TOKENS } from "./theme";

// showNote is on for the catechist view only — the Straubinger footnote is
// dense reference material for class prep, not something a student needs.
export default function ScriptureCitation({ cita, showNote = false }) {
  if (!cita.texto) {
    return (
      <div
        style={{
          borderLeft: `3px solid ${TOKENS.paperDeep}`,
          paddingLeft: 16,
          margin: "0 0 16px",
        }}
      >
        <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>
          {cita.referencia} (texto bíblico no disponible)
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        borderLeft: `3px solid ${TOKENS.gold}`,
        paddingLeft: 16,
        margin: "0 0 16px",
      }}
    >
      <p
        style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: "italic",
          fontSize: 16,
          lineHeight: 1.6,
          color: TOKENS.ink,
          margin: "0 0 6px",
        }}
      >
        “{cita.texto}”
      </p>
      <p
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: TOKENS.oxbloodDeep,
          margin: 0,
        }}
      >
        {cita.referencia}
      </p>
      {cita.contexto && (
        <p style={{ fontSize: 12.5, color: "#6b7280", margin: "4px 0 0", lineHeight: 1.5 }}>
          {cita.contexto}
        </p>
      )}
      {showNote && cita.nota && (
        <p
          style={{
            fontSize: 13.5,
            lineHeight: 1.65,
            color: "#3f4653",
            background: "#fff",
            border: `1px solid ${TOKENS.paperDeep}`,
            borderRadius: 8,
            padding: "10px 12px",
            marginTop: 10,
          }}
        >
          <strong style={{ color: TOKENS.green }}>Nota (Straubinger): </strong>
          {cita.nota}
        </p>
      )}
    </div>
  );
}
