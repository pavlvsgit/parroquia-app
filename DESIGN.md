# Parroquia App — Design System

> Category: House style (custom, not a starter)
> A warm, editorial parish site. Cream paper, navy titles, a rust/orange
> accent, serif display type. Built for long-form catechesis content first,
> parish-notice content second. Scope: public-facing pages only (home,
> `/catequesis` list, lesson views, student/catequista views). The admin
> panel (`/admin`) is a separate utilitarian surface and does not use this
> system.

## Visual Theme & Atmosphere
Warm and unhurried, like a well-kept parish bulletin crossed with a small
devotional book. Generous whitespace, long-form readability, serif display
type for warmth and gravity. Never corporate, never novelty.

## Color Palette & Roles
- **Background:** `#EFEAE0` (cream paper)
- **Background (deep):** `#E2DBC9` — tinted panels, dividers, hover fills
- **Foreground / titles:** `#26344A` (navy — the site's signature)
- **Accent (primary):** `#C37419` (rust/orange) — labels, eyebrows, hour
  markers, primary CTAs
- **Accent (text-safe):** `#8A4F12` — same hue, darkened for AA contrast
  (≥4.5:1) whenever the accent colors *text* rather than a background chip
- **Accent (secondary):** `#3F5142` (deep green) — WhatsApp/contact CTAs,
  secondary tags
- **Gold:** `#C9A227` — sparingly, ornamental only (not yet load-bearing;
  don't expand its role without a reason)
- **Muted text:** `#6B7280` — metadata, secondary copy, "todas las
  lecciones" links
- **Surface:** `#FFFFFF` — elevated cards only (e.g. scripture citation
  blocks)
Never use pure black. Pure white is reserved for elevated surface cards.

## Typography Rules
- **Display / headings:** `'Fraunces', serif` (opsz 9–144, weights
  400/600/700) — the signature typeface, used for H1–H3 and any numeral
  that should feel warm (hour markers, class numbers)
- **Body / UI:** `'Public Sans', sans-serif` (weights 400–700) — labels,
  nav, body copy, buttons
- Scale (px): 12 · 13 · 15 · 15.5 · 17 · 20 · clamp(26,4vw,34) · 40
- Line-height: ~1.7 for dense body copy, ~1.15–1.4 for headings
- Letter-spacing: 0.04–0.14em on uppercase eyebrows/labels only; default
  elsewhere
- Eyebrows/labels: uppercase, 12–13px, weight 600, letter-spacing ~0.14em,
  colored with the accent

## Component Stylings
- **Buttons:** solid fill for primary actions (rust or green depending on
  intent), 10–12px radius, generous horizontal padding. Ghost/outline
  variant for secondary actions (1px border, transparent fill).
- **Cards / tinted sections:** cream-deep or low-alpha accent tint
  background (e.g. `rgba(195,116,25,0.055)`), left-border accent stripe on
  content blocks that need a boundary marker (catequista section blocks),
  10–14px radius on the open corners.
- **Tags/chips:** pill radius (999px), white background, 1px
  `paperDeep` border, 12px text, weight 600, colored `green`.
- **Links:** accent-colored, weight 600, no underline by default.
- **Sticky rails:** `position: sticky` for side navigation (tags, table of
  contents) — `top: 32px` desktop.

## Layout Principles
- Reading column: 720px (catequista view) / 560px (student view) max width
  at desktop, single column below 1024px.
- Desktop (≥1024px): 720px reading column + 220px sticky right rail
  (tags, table of contents), 48px column gap.
- Section rhythm: ~32px between stacked blocks in the reading column; more
  (48–56px) between major page sections on the home page.
- One accent color leads per screen region — don't mix rust and green as
  equal-weight accents in the same block.

## Depth & Elevation
Minimal, matching warm-editorial's restraint:
- **Flat (0):** everything by default.
- **Raised (1):** cards, dropdown/expandable menus. Soft shadow only
  (e.g. `0 2px 6px rgba(38,52,74,0.06)` resting, slightly stronger on
  open dropdowns `0 8px 20px rgba(38,52,74,0.12–0.14)`).
No shadows on inputs or hero art.

## Do's and Don'ts
- ✅ Navy for titles, rust for eyebrows/labels/accents — don't swap these
  roles.
- ✅ Fraunces for anything that should feel warm and human (headings,
  hour numerals); Public Sans for everything structural (nav, labels,
  buttons, body).
- ✅ Keep the admin panel (`/admin`) on its own utilitarian palette — it
  is explicitly out of scope for this system.
- ❌ No pure black.
- ❌ No gradients, no glassmorphism, no neumorphism.
- ❌ Don't introduce a second display typeface — Fraunces is the one
  serif voice of the site.
- ❌ Don't let `gold` become a primary accent — it's ornamental.

## Responsive Behavior
- **Desktop ≥ 1024px:** reading column + sticky right rail, full section
  spacing.
- **Tablet/Phone < 1024px:** single column, sticky elements that would
  otherwise live in a side rail collapse into inline dropdowns/expandable
  controls at the top of content instead of horizontal-scrolling bars.

## Agent Prompt Guide
When generating or editing UI against this design system:
- This is the *actual, current* visual language of the site — codify and
  extend it, don't reinvent it.
- Preserve the navy/rust/cream identity above all else; it's the site's
  signature and has been iterated on deliberately across several passes.
- The admin panel is intentionally excluded from this system.
- If a new pattern needs a color outside this palette, reuse the closest
  existing token rather than inventing a new hex value.
