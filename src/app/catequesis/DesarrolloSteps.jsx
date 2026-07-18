import MarkdownBlock from "./MarkdownBlock";
import { TOKENS } from "./theme";
import { parseSteps, splitLetteredItems } from "./parseCatequistaSections";

// Desarrollo is the section catequistas most need to scan mid-class: it
// bundles several numbered steps, and some steps bundle several
// sub-arguments/analogies (e.g. the relojero anecdote, the hormiga
// comparison). Flat paragraphs made those hard to locate quickly, so each
// step gets its own card, and each lettered sub-argument gets its own
// nested block inside that card.
export default function DesarrolloSteps({ body }) {
  const { intro, steps } = parseSteps(body);

  if (!steps.length) {
    return <MarkdownBlock size="dense">{body}</MarkdownBlock>;
  }

  return (
    <>
      {intro && <MarkdownBlock size="dense">{intro}</MarkdownBlock>}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: intro ? 6 : 2 }}>
        {steps.map((step, index) => {
          const { leading, items } = splitLetteredItems(step.body);
          return (
            <div
              key={step.title}
              style={{
                background: TOKENS.paper,
                border: "1px solid rgba(38,52,74,0.16)",
                borderRadius: 10,
                padding: "14px 16px 16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 22,
                    height: 22,
                    flexShrink: 0,
                    borderRadius: "50%",
                    background: TOKENS.oxbloodDeep,
                    color: TOKENS.paper,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {index + 1}
                </span>
                <h4
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: 14.5,
                    fontWeight: 700,
                    color: TOKENS.ink,
                    margin: 0,
                  }}
                >
                  {step.title}
                </h4>
              </div>

              {leading && <MarkdownBlock size="dense">{leading}</MarkdownBlock>}

              {items.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: leading ? 4 : 0,
                  }}
                >
                  {items.map((item) => (
                    <div
                      key={item.letter}
                      style={{
                        borderLeft: `2px solid ${TOKENS.gold}`,
                        background: TOKENS.paperDeep,
                        borderRadius: "0 8px 8px 0",
                        padding: "10px 14px 12px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.03em",
                          color: TOKENS.oxbloodDeep,
                          margin: "0 0 4px",
                        }}
                      >
                        {item.letter}) {item.label}
                      </p>
                      <MarkdownBlock size="dense">{item.body}</MarkdownBlock>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
