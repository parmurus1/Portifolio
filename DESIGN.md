---
name: Murilo Neves Teixeira · Portfólio
description: Classic developer portfolio at product-grade polish. Deep black ground, graphite surfaces, one electric-indigo light, real screenshots of shipped work.
colors:
  electric-indigo: "#7c8cff"
  indigo-wash: "rgba(124, 140, 255, 0.16)"
  trophy-gold: "#ffc83d"
  signal-green: "#4ade80"
  aurora-indigo: "#4f46e5"
  aurora-teal: "#0e7490"
  deep-black: "#09090b"
  graphite: "#111114"
  graphite-raised: "#17171b"
  hairline: "rgba(255, 255, 255, 0.08)"
  hairline-strong: "rgba(255, 255, 255, 0.14)"
  zinc-white: "#f4f4f5"
  zinc-muted: "#a1a1aa"
  zinc-faint: "#8b8b95"
  separator-graphite: "#3f3f46"
  gutter-gray: "#52525b"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.9rem, 6vw, 4.6rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.1rem, 4.4vw, 3.2rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  lede:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.08rem, 1.5vw, 1.22rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.97rem"
    fontWeight: 550
    lineHeight: 1
    letterSpacing: "-0.005em"
  mono:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  focus: "8px"
  inset: "12px"
  tile: "16px"
  panel: "20px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "24px"
  xl: "48px"
  gutter: "clamp(16px, 4vw, 40px)"
  section: "clamp(88px, 12vw, 140px)"
components:
  button-primary:
    backgroundColor: "{colors.zinc-white}"
    textColor: "{colors.deep-black}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 1.25rem"
    height: "46px"
  button-primary-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.deep-black}"
  button-ghost:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    textColor: "{colors.zinc-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 1.25rem"
    height: "46px"
  button-ghost-hover:
    backgroundColor: "rgba(255, 255, 255, 0.08)"
    textColor: "{colors.zinc-white}"
  button-small:
    rounded: "{rounded.pill}"
    padding: "0 1rem"
    height: "38px"
  nav-bar-scrolled:
    backgroundColor: "rgba(17, 17, 20, 0.72)"
    rounded: "{rounded.pill}"
    height: "60px"
  nav-link:
    textColor: "{colors.zinc-muted}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  nav-link-active:
    backgroundColor: "rgba(255, 255, 255, 0.07)"
    textColor: "{colors.zinc-white}"
  card-project:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.zinc-white}"
    rounded: "{rounded.panel}"
    padding: "22px 24px 24px"
  card-project-shot:
    backgroundColor: "{colors.graphite-raised}"
    rounded: "{rounded.inset}"
  list-row:
    backgroundColor: "rgba(255, 255, 255, 0.02)"
    rounded: "{rounded.tile}"
    padding: "18px 20px"
  list-row-hover:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
  chip:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    textColor: "{colors.zinc-muted}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  chip-hover:
    backgroundColor: "{colors.indigo-wash}"
    textColor: "{colors.zinc-white}"
  badge-status:
    backgroundColor: "rgba(74, 222, 128, 0.08)"
    textColor: "#bbf7d0"
    rounded: "{rounded.pill}"
    padding: "8px 14px 8px 12px"
  window-editor:
    backgroundColor: "{colors.graphite-raised}"
    textColor: "{colors.zinc-white}"
    typography: "{typography.mono}"
    rounded: "{rounded.panel}"
  window-terminal:
    backgroundColor: "#0c0c0f"
    textColor: "{colors.zinc-white}"
    typography: "{typography.mono}"
    rounded: "{rounded.panel}"
  input-terminal:
    backgroundColor: "transparent"
    textColor: "{colors.zinc-white}"
    typography: "{typography.mono}"
    padding: "6px 0"
  panel-group:
    backgroundColor: "{colors.graphite}"
    rounded: "{rounded.panel}"
    padding: "24px"
---

# Design System: Murilo Neves Teixeira · Portfólio

## Overview

**Creative North Star: "The Midnight Workbench"**

A developer's desk at night: the room is deep black, the furniture is graphite, and the only light in it is an electric-indigo glow that falls on whatever is being worked on. The system is the classic developer-portfolio canon (dark ground, clean grotesque type, large project cards with real screenshots) executed at product polish, Vercel and Linear in finish, Brittany Chiang in clarity. Its tools are part of the furniture: a code editor that types, a terminal that answers, a timeline that fills as you scroll. Programming shows up as working instruments, never as costume.

Density is calm and generous: one centered 1160px column, big type with tight tracking, wide section breathing room, cards that hold a full screenshot. Surfaces are near-flat graphite separated from the black by 8% white hairlines; depth comes from soft, deep, negative-spread shadows and from light that follows the pointer. Motion is constant but quiet: a slow aurora drift behind everything, blur-to-sharp reveals on scroll, a pointer-tracked glow on cards, all of it collapsed under reduced motion.

The owner rejected the earlier bespoke "git log graph on cobalt" world on color and layout and chose this canon deliberately. The names in this file (North Star, color names) were derived from the build's direction contract, not confirmed with the owner. One divergence from the contract is recorded as built: the contract allows a single indigo accent, while the build also lets each project card wear its own hue, uses gold for achievement and green for availability. Those are written down below as scoped rules.

**Key Characteristics:**
- Dark-only (color-scheme: dark): deep black ground, two graphite surface steps, white-alpha hairlines.
- One electric-indigo light for focus, glow, caret, prompt and emphasis; never a filled button.
- Near-white pill as the primary action; translucent pill as the secondary.
- Geist for everything human, Geist Mono for everything machine (code, dates, tags, stacks).
- Real screenshots of shipped work inside large 20px-radius cards with a pointer-lit border.
- Working dev instruments as signature pieces: typing editor, interactive terminal, scroll-filled timeline.
- Atmospheric backdrop: fixed indigo and teal aurora over a masked 64px grid.

## Colors

A near-monochrome zinc-and-black palette carrying a single cool light, with two small semantic hues held in reserve.

### Primary
- **Electric Indigo** (`electric-indigo`): the light source. Focus rings, the typing caret, the terminal prompt, the hero role line, active timeline dots and the filled timeline rail, the nav logo glyph, about-card icons, text selection, and the radial glows on the editor, cards and contact panel. Contrast on the deep-black ground is about 6.7:1, so it is legible as text.
- **Indigo Wash** (`indigo-wash`): the same indigo at 16% alpha. Hover fill for chips, the outer ring around the primary button on hover, the halo around an active timeline dot.

### Secondary
- **Trophy Gold** (`trophy-gold`): achievement and progress only. The starred timeline milestone (the championship), the Frangão mascot's stage name and XP bar.

### Tertiary
- **Signal Green** (`signal-green`): availability. The pinging dot of the "available for work" badge, with its pale-green text and 8% green fill.

### Atmosphere
- **Aurora Indigo** (`aurora-indigo`) and **Aurora Teal** (`aurora-teal`): two heavily blurred (90px) drifting blobs fixed behind the top of the viewport at 50% and 38% opacity. Aurora Indigo also tints the top of the contact panel at 28% alpha. They are backdrop light, never applied to UI elements.

### Neutral
- **Deep Black** (`deep-black`): page ground, primary-button text, theme-color.
- **Graphite** (`graphite`): first surface step. Project cards, skill groups, about cards, the contact panel.
- **Raised Graphite** (`graphite-raised`): second surface step. Screenshot frames inside cards, the editor body, the nav logo tile.
- **Hairline** (`hairline`) and **Strong Hairline** (`hairline-strong`): 8% and 14% white borders. Hairline separates surfaces from the ground and splits window bars; Strong Hairline outlines windows, ghost buttons, chips in the terminal, and the contact panel.
- **Zinc White** (`zinc-white`): headings, body emphasis, primary-button fill.
- **Muted Zinc** (`zinc-muted`): body prose, ledes, card descriptions, inactive nav links, the second line of the hero name.
- **Faint Zinc** (`zinc-faint`): metadata. Dates, stack lists, hero facts, marquee, footer, window language labels. About 5.9:1 on the ground.
- **Separator Graphite** (`separator-graphite`): non-text marks. Marquee separator dots, the scrollbar thumb.
- **Gutter Gray** (`gutter-gray`): code line numbers only. It is decorative and below text contrast; never set readable text in it.

### Named Rules
**The Light-Only Indigo Rule.** Electric Indigo is light, focus and emphasis. It glows, outlines, underlines a prompt and colors a short line of text; it never fills a button, a card or a section. The primary action is near-white, not indigo.

**The Project Owns Its Hue Rule.** Inside a project card the accent is reassigned to that project's own hue (sky for Quintal, pink for Nexus, orange for Bram, gold for Frangão, green for Banco, lilac for Bacon Burguer). The card's tag pills, pointer-lit border and inner wash take that hue; outside cards the accent is always indigo. One hue per card, never two.

**The Earned Gold Rule.** Trophy Gold marks something achieved or leveled up. It does not decorate.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui, -apple-system, Segoe UI fallback), variable 300 to 800
**Body Font:** Geist, same stack
**Label/Mono Font:** Geist Mono (with ui-monospace, SFMono-Regular, Menlo), 400 to 600

**Character:** A single neutral grotesque used with conviction: heavy 700 headings pulled tight, quiet 400 prose, and an in-between 550 to 650 for controls and card titles that the variable font makes possible. Its monospace sibling handles every machine-shaped string so code and metadata read as one family with the prose.

### Hierarchy
- **Display** (700, clamp(2.9rem, 6vw, 4.6rem), 0.98, -0.04em): the hero name only, set on two lines; the second line drops to Muted Zinc. Each line rises out of a clipping mask on load.
- **Headline** (700, clamp(2.1rem, 4.4vw, 3.2rem), 1.05, -0.035em): section titles. The contact panel's question runs one step larger (up to 3.6rem, -0.04em, balanced, max 18ch).
- **Title** (650, 1.45rem, 1.2, -0.025em): project card titles; wide cards scale to clamp(1.7rem, 2.6vw, 2.2rem). Smaller titles in the same register: timeline entries (600, 1.15rem, -0.015em), "other projects" heading (600, 1.2rem).
- **Lede** (400, clamp(1.08rem, 1.5vw, 1.22rem), 1.6): hero lede, max 34rem, in Muted Zinc. Section ledes sit at 1.1rem.
- **Body** (400, 1.0625rem / 17px, 1.65): all prose, in Muted Zinc with `strong` lifted to 600 Zinc White. About text caps at 36rem; card descriptions at 0.98rem.
- **Label** (550, 0.97rem, -0.005em): buttons and text links (0.95rem). Nav links run 0.92rem at 400.
- **Mono** (400, 0.72 to 0.86rem, 1.7 to 1.75): editor code (0.86rem), terminal (0.82rem), dates (0.78rem), stack lists (0.76rem), tag pills (0.74rem), status bar (0.72rem), marquee (0.95rem).

### Named Rules
**The Mono Is Machine Rule.** Geist Mono carries code, commands, dates, file names, tech stacks and tags. It never sets a heading or a sentence of prose.

**The Tight Heavy Heading Rule.** Every heading is 600 to 700 with negative tracking (-0.015em for small titles up to -0.04em for display). Body text keeps normal tracking and never goes bold for emphasis beyond 600.

## Layout

One centered column, max 1160px, with a fluid side gutter of clamp(16px, 4vw, 40px). Sections stack with clamp(88px, 12vw, 140px) of top padding; a section head (title plus lede, max 40rem) sits 48px above its content. The footer sits clamp(80px, 10vw, 120px) below the last section behind a hairline.

- **Hero:** full small-viewport height, two columns (1.12fr text, 1fr editor) with clamp(32px, 5vw, 72px) gap; collapses to one column under 960px with the editor below the text.
- **Marquee:** full-bleed tech ribbon between hairlines, edge-faded with a mask, 38s loop, pauses on hover.
- **Projects:** two-column grid with 20px gaps. Wide cards span both columns and split into screenshot plus body (1.25fr / 1fr); the flipped variant mirrors it. The "other projects" list is a two-column grid of rows with 12px gaps. Everything goes single column under 860px.
- **About:** two equal columns, text and a sticky terminal (top 100px); one column under 900px.
- **Trajectory:** asymmetric two columns (0.8fr sticky head, 1.4fr timeline); one column under 900px.
- **Stack:** three equal skill groups, 20px gaps; one column under 860px.
- **Contact:** one centered panel.

Spacing rhythm is small and repeated: 8px between chips and tags, 12px between buttons and stacked rows, 20px between cards, 24px inside panels, 48px under section heads. Breakpoints in use: 400, 520, 760, 860, 900, 960px. On phones the nav keeps only the logo, two or three links and the Contact pill; hero buttons stretch to share the row; contact buttons go full width under 520px.

## Elevation & Depth

A hybrid: surfaces are tonal (graphite steps on black, separated by white-alpha hairlines), and shadows are reserved for floating windows and for state. Shadows are always deep black with a negative spread so they pool beneath an object rather than outlining it, plus an inset 4% white top highlight that gives windows a machined edge. The only colored shadows are indigo glows: around the code editor at rest and around the primary button on hover. Additional depth comes from light: a 640px indigo spotlight follows the cursor across the page, and cards, the editor and the contact panel each carry a radial glow positioned at the pointer.

### Shadow Vocabulary
- **Window** (`box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 60px -24px rgba(0,0,0,0.7)`): the editor and the terminal, the two floating instruments.
- **Editor Glow** (`box-shadow: 0 0 80px -30px rgba(124,140,255,0.45)`): added to Window on the hero editor only.
- **Card Lift** (`box-shadow: 0 30px 60px -30px rgba(0,0,0,0.9)`): project cards on hover, together with a 4px rise.
- **Nav Float** (`box-shadow: 0 10px 30px -14px rgba(0,0,0,0.8)`): the nav pill once the page has scrolled past 24px, with 14px backdrop blur.
- **Primary Hover Ring** (`box-shadow: 0 0 0 4px rgba(124,140,255,0.16), 0 10px 30px -10px rgba(124,140,255,0.6)`): the near-white button on hover.

### Named Rules
**The Flat Until Touched Rule.** Cards, rows and panels are flat at rest. They lift, glow or brighten their border only in response to the pointer. Only the two windows float at rest.

**The Light Follows The Hand Rule.** Glows track the pointer (cards, editor, contact panel, page spotlight) and the editor tilts up to 6 degrees toward it, only on fine pointers and only without reduced motion. Touch and reduced-motion users get the same surfaces, still and complete.

## Shapes

Soft, consistent, concentric. Containers use a 20px panel radius (cards, windows, skill groups); inner frames step down to 12px so the screenshot sits concentrically inside its 12px-inset card; list rows and about cards use 16px. Every control is a full pill (999px): buttons, nav bar, nav links, chips, tags, the status badge. The contact panel alone opens up to 28px. Small square-ish tiles (nav logo) use 10px, and the focus ring rounds to 8px. Borders are always 1px white-alpha hairlines; there are no thick strokes, no hard corners, no clipped or angled silhouettes. Round marks recur as a motif: window dots, timeline nodes, the status dot, marquee separators.

## Components

### Buttons
Confident pills; near-white leads, translucent follows.
- **Shape:** full pill (999px), min height 46px, 0 1.25rem padding; small variant 38px tall at 0.9rem.
- **Primary:** Zinc White fill, Deep Black text, Label type, optional trailing arrow icon.
- **Hover / Focus:** primary brightens to pure white and gains the Primary Hover Ring; the trailing icon slides 3px right; press scales to 0.97. Focus shows a 2px indigo outline at 3px offset. Transitions 0.25 to 0.35s on the house ease.
- **Ghost:** 3% white fill, Strong Hairline border, Zinc White text; hover raises the fill to 8% and the border to 28% white. Used for the second action and for "copy e-mail", which swaps its icon to a check and its label to "Copiado!" for 2.2s.

### Text Links
- **Style:** Label type, Zinc White, trailing 1em icon (arrow, play or GitHub mark). A 1px underline wipes in from left to full width on hover (0.35s). Muted variant starts in Muted Zinc and brightens on hover. Used as the "Visit / Code" pair at the foot of every project card.

### Chips
- **Style:** pill, 6px 12px, 0.88rem, Muted Zinc on 3% white with a Hairline border.
- **State:** hover turns text Zinc White, border Electric Indigo, fill Indigo Wash, and lifts 2px. Terminal suggestion chips are the same shape in Geist Mono at 0.76rem with a Strong Hairline border, and run their command when pressed.

### Cards / Containers
- **Corner Style:** panel radius (20px); inner screenshot frame 12px, inset 12px from the card edge.
- **Background:** Graphite card, Raised Graphite screenshot frame with its own Hairline border.
- **Shadow Strategy:** flat at rest; Card Lift plus a 4px rise on hover (see Elevation & Depth).
- **Border:** Hairline at rest; on hover a 1px gradient border, masked to the edge, lights up in the card's accent at the pointer position, with a 10% accent wash inside.
- **Internal Padding:** 22px 24px 24px; wide cards 36px 40px with the body vertically centered.
- **Anatomy:** 16:10 screenshot (top-aligned, scales to 1.04 on hover over 0.9s), then title, description, a Faint Zinc mono stack list, and the link pair pinned to the bottom. The build also places small mono category pills, tinted in the card's accent, above the title; that placement is carried, not canonized (see Do's and Don'ts).
- **Other projects row:** a lighter list card, 16px radius, 2% white fill, Hairline border, 18px 20px padding; name, one-line description, mono tech line, and a corner arrow that nudges up-right on hover while the row lifts 2px.

### Inputs / Fields
- **Style:** the only input is the terminal prompt: transparent, borderless, Geist Mono 0.82rem, Zinc White text, indigo caret, preceded by an indigo "~/murilo $" prompt label.
- **Focus:** no box; the indigo caret is the focus signal. History on arrow keys, Tab completion.
- **Error:** unknown commands answer in pale red inside the output, never on the field.

### Navigation
- **Style:** fixed, 16px from the top, a 60px pill as wide as the content column. Transparent at rest; after 24px of scroll it becomes a 72% Graphite glass pill with 14px blur, a Hairline border and Nav Float.
- **Brand:** 32px Raised Graphite tile (10px radius, Strong Hairline) holding the indigo code glyph, then the name in 650.
- **Links:** Muted Zinc 0.92rem pills (8px 14px); hover to Zinc White; the section in view gets a 7% white pill fill and Zinc White text.
- **Action:** a small primary button, "Contato", closes the bar.
- **Mobile:** 54px tall, 10px from the top; the name hides behind the logo tile, link padding tightens, Stack drops under 760px and Trajetória under 400px.

### Code Editor Window (signature)
The hero's right column: a floating Window with Editor Glow and a pointer-following inner light. A 46px title bar holds three traffic-light dots (red, amber, green), a filename tab (8px radius, 6% white) and a faint language label. The body types a JavaScript object describing Murilo line by line, with a blinking indigo block caret, CSS-counter line numbers in Gutter Gray, and a Palenight-style syntax set (keywords lilac, identifiers blue, strings green, numbers orange, functions yellow, comments italic gray). A mono status bar at the foot shows the branch in indigo and the latest public GitHub push. Tilts up to 6 degrees toward the pointer.

### Terminal Window (signature)
Same window family as the editor, on a slightly darker body: a 44px bar with dots and a "terminal" label, a 300px scrolling output in Geist Mono 0.82rem (commands prefixed by the indigo prompt, dim lines in Faint Zinc, links underlined in indigo), the prompt input, and a row of suggestion chips. It types its first command by itself when it scrolls into view. Sticky beside the about text on desktop.

### Status Badge
A pill with an 8% green fill, a 25% green border and pale-green 0.88rem text, led by an 8px Signal Green dot that pings outward every 2s. Used once per page for availability; it is the only green UI element.

### Timeline
A 2px Strong Hairline rail with an indigo-to-cyan fill that scales down the rail with scroll progress. Each entry has a 16px hollow node that turns indigo with an Indigo Wash halo as it reveals; a mono Faint Zinc date; a 600 title; a Muted Zinc line. The one starred entry gets a solid Trophy Gold node and a gold title.

## Do's and Don'ts

### Do:
- **Do** keep the ground Deep Black and build depth with the two graphite steps and 8% / 14% white hairlines.
- **Do** use Electric Indigo for light, focus and emphasis only: focus rings, carets, prompts, glows, active states, one short line of hero text.
- **Do** make the near-white pill the primary action and the translucent hairline pill the secondary.
- **Do** show every project as a real screenshot (or a live animated piece of the product) in a 16:10 frame inside a 20px Graphite card, with a "visit" link and a "code" link.
- **Do** reassign the accent per project card to that project's own hue, one hue per card.
- **Do** set code, dates, file names, stacks and commands in Geist Mono; everything else in Geist.
- **Do** use the house ease (cubic-bezier(0.16, 1, 0.3, 1)): 0.2 to 0.35s for state, 0.5 to 0.9s for lifts and reveals, with reveals combining fade, a 24px rise and a 4px blur clearing, staggered 0.08s.
- **Do** collapse every animation, typing effect and pointer effect to its finished state under prefers-reduced-motion, and gate pointer effects to fine pointers.
- **Do** keep focus visible: 2px indigo outline, 3px offset.

### Don't:
- **Don't** fill buttons, cards or sections with Electric Indigo; it is a light, not a paint.
- **Don't** add a light theme or light sections; the system is dark-only by the owner's choice.
- **Don't** use Trophy Gold or Signal Green outside achievement and availability.
- **Don't** put two accent hues in one card or let a project hue leak outside its card.
- **Don't** set headings or prose in Geist Mono, or body text in weights above 600.
- **Don't** use hard offset, colored-outline or light-colored drop shadows; shadows are deep black with negative spread, plus the two indigo glows named above.
- **Don't** add square corners or thick borders; containers are 16 to 20px, controls are pills, borders are 1px hairlines.
- **Don't** set readable text in Gutter Gray or Separator Graphite.
- **Don't** put a label, kicker or eyebrow above section titles; a section head is title plus lede. The category pills above project-card titles are a carried exception in the current build, not a pattern to repeat on new surfaces.
- **Don't** bring back the discarded "git log graph on cobalt" world: no cobalt ground, no commit-graph layout.
