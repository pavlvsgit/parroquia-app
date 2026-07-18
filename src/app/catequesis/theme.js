// Shared with ParroquiaHome.jsx's palette — kept as a separate copy here so this
// standalone lesson-preview route doesn't create a dependency on that file.
export const TOKENS = {
  ink: "#26344a",
  paper: "#efeae0",
  paperDeep: "#e2dbc9",
  oxblood: "#c37419",
  // Darkened oxblood used for text (headings, labels) — #c37419 is only
  // 3.00:1 against `paper`, below the 4.5:1 WCAG AA minimum for normal-weight
  // text. This shade holds >=4.5:1 against paper, paperDeep, and the
  // low-alpha oxblood tint bands used in the catequista view.
  oxbloodDeep: "#8a4f12",
  gold: "#c9a227",
  green: "#3f5142",
};

export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Public+Sans:wght@400;500;600;700&display=swap');`;

// Desktop-only reading layout: below 1024px this is untouched — a single
// centered column at `mobileMaxWidth`, same as before this pass. At/above
// 1024px it becomes a 720px reading column + a 220px sticky sidebar (tags),
// so the header/tags/body grid areas below just describe visual order, not
// DOM order — the JSX stays header → tags → main either way.
export function lessonGridCss(mobileMaxWidth) {
  return `
    .lesson-shell {
      max-width: ${mobileMaxWidth}px;
      margin: 0 auto;
      padding: 28px 20px 56px;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-areas: "header" "tags" "main";
    }
    .lesson-shell > .lesson-header { grid-area: header; }
    .lesson-shell > .lesson-tags { grid-area: tags; margin-top: 20px; }
    .lesson-shell > .lesson-sidebar { grid-area: tags; margin-top: 20px; }
    .lesson-shell > .lesson-main { grid-area: main; }

    /* Desktop TOC vs. mobile dropdown: same SectionNav component, two
       mounted variants, CSS media queries pick which one paints (avoids
       an SSR/client viewport-detection mismatch). */
    .section-toc-desktop { display: none; }

    @media (min-width: 1024px) {
      .lesson-shell {
        max-width: 988px;
        padding: 48px 40px 80px;
        grid-template-columns: 720px 220px;
        column-gap: 48px;
        row-gap: 0;
        grid-template-areas:
          "header tags"
          "main   tags";
      }
      .lesson-shell > .lesson-tags,
      .lesson-shell > .lesson-sidebar {
        margin-top: 0;
        position: sticky;
        top: 32px;
        align-self: start;
      }
      .lesson-shell > .lesson-sidebar {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .section-toc-desktop { display: block; }
      .section-toc-mobile { display: none; }
    }
  `;
}
