---
name: Murilo Neves Teixeira · portfólio
description: A git log --graph printed on cobalt; every project is a branch that forks from main, takes real commits and merges back.
colors:
  cobalt-ground: "#141d8a"
  graph-ink: "#0a0f3d"
  chalk: "#f5f3ee"
  periwinkle-muted: "#bcc4f6"
  hairline: "rgba(196, 204, 255, 0.16)"
  paper: "#eef0f8"
  ink-muted: "#3a4280"
  yolk: "#ffd23f"
  ember: "#ff6a3d"
  mint: "#3ddc84"
  pink: "#ff4fa3"
  sky: "#44d7ff"
  lilac: "#b49bff"
  ember-deep: "#c2410c"
  mint-deep: "#0b6b37"
  yolk-umber: "#4b3d07"
typography:
  display-hero:
    fontFamily: "Bricolage Grotesque, Arial Narrow, sans-serif"
    fontSize: "clamp(3.4rem, 10.5vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 75"
  display:
    fontFamily: "Bricolage Grotesque, Arial Narrow, sans-serif"
    fontSize: "clamp(3rem, 8vw, 5.75rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 75"
  headline:
    fontFamily: "Bricolage Grotesque, Arial Narrow, sans-serif"
    fontSize: "clamp(2.4rem, 4.6vw, 4rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 75"
  title:
    fontFamily: "Bricolage Grotesque, Arial Narrow, sans-serif"
    fontSize: "1.55rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 80"
  lede:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 2.1vw, 1.55rem)"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Bricolage Grotesque, Arial Narrow, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.005em"
  mono-label:
    fontFamily: "Martian Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.74rem"
    fontWeight: 400
    lineHeight: 1.7
    fontVariation: "'wdth' 87.5"
  mono-ref:
    fontFamily: "Martian Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1.2
    fontVariation: "'wdth' 87.5"
rounded:
  pill: "999px"
  plate: "22px"
  terminal: "20px"
  panel: "16px"
  inset: "12px"
  row: "10px"
  focus: "6px"
spacing:
  gutter: "128px"
  gutter-compact: "46px"
  edge: "clamp(16px, 4vw, 64px)"
  section: "clamp(96px, 14vh, 150px)"
  nav: "60px"
  nav-compact: "54px"
  stack-sm: "12px"
  stack-md: "22px"
components:
  button-primary:
    backgroundColor: "{colors.yolk}"
    textColor: "{colors.graph-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.85em 1.4em"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.graph-ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.chalk}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.85em 1.4em"
    height: "52px"
  button-ghost-hover:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.graph-ink}"
  button-ink:
    backgroundColor: "{colors.graph-ink}"
    textColor: "{colors.chalk}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.85em 1.4em"
    height: "52px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.graph-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.85em 1.4em"
    height: "52px"
  button-outline-hover:
    backgroundColor: "{colors.graph-ink}"
    textColor: "{colors.chalk}"
  ref-head:
    backgroundColor: "{colors.yolk}"
    textColor: "{colors.graph-ink}"
    typography: "{typography.mono-ref}"
    rounded: "{rounded.pill}"
    padding: "0.28em 0.75em 0.3em"
  ref-open:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.graph-ink}"
    typography: "{typography.mono-ref}"
    rounded: "{rounded.pill}"
    padding: "0.28em 0.75em 0.3em"
  ref-remote:
    backgroundColor: "transparent"
    textColor: "{colors.chalk}"
    typography: "{typography.mono-ref}"
    rounded: "{rounded.pill}"
    padding: "0.28em 0.75em 0.3em"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.periwinkle-muted}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  nav-link-active:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.graph-ink}"
  terminal:
    backgroundColor: "{colors.graph-ink}"
    textColor: "{colors.chalk}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.terminal}"
  terminal-chip:
    backgroundColor: "transparent"
    textColor: "{colors.periwinkle-muted}"
    rounded: "{rounded.pill}"
    padding: "7px 12px"
  terminal-chip-hover:
    backgroundColor: "{colors.yolk}"
    textColor: "{colors.graph-ink}"
  config-panel:
    backgroundColor: "{colors.graph-ink}"
    textColor: "{colors.chalk}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.panel}"
    padding: "18px 20px"
  oneline-row-hover:
    backgroundColor: "{colors.graph-ink}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.inset}"
    padding: "20px 14px"
  stat-row-hover:
    backgroundColor: "{colors.graph-ink}"
    textColor: "{colors.yolk}"
    rounded: "{rounded.row}"
    padding: "12px 14px"
---

# Design System: Murilo Neves Teixeira · portfólio

## Overview

**Creative North Star: "The Log Printed on Cobalt"**

The whole site is one `git log --graph` that prints itself as you scroll. A thick, ink-cased rail runs down a fixed left gutter; the HEAD marker (a yolk node with a `HEAD` tag) rides it with the scroll position; each featured project forks off `main` on its own colored lane, collects its feature list as commits, and merges back with a literal `Merge branch 'feat/…' into main` line. The hero is a live canvas graph the visitor can grow by moving and clicking. Programming is the material, not a costume: hashes are real commits, the nav carries a typed shell prompt and a `HEAD → <section>` readout, and the about section holds a working terminal.

The world sits on a deep cobalt floor (never black), printed in chalk and ink, and lit by six saturated lane colors borrowed from the graph. Three sections leave the cobalt and become full-bleed bands of paper, yolk and ember, so the scroll reads as a printout changing stock. Type is a two-voice system: Bricolage Grotesque condensed to 75% width at weight 800 shouts names and headings, and Martian Mono reports everything the machine would print (hashes, refs, commands, counts, dates). Density is generous: big section padding, long single columns of log lines, one project per screen-and-a-half.

The direction contract explicitly refuses the "black terminal + glowing cards" portfolio. The build honors that: terminals exist, but as ink objects sitting on cobalt, and there are no glows, glass cards or gradient fills anywhere outside the hero's legibility veil.

**Key Characteristics:**
- Cobalt ground with an ink-cased commit rail in a fixed left gutter on every section.
- One lane color per project branch, carried by every lane-colored element of that project.
- Full-bleed paper, yolk and ember bands as section grounds.
- Condensed 800-weight Bricolage display against Martian Mono machine output.
- Pills for every ref, button, nav link and chip; generously rounded plates for screenshots.
- Motion that prints: nodes scale in, log lines light up as HEAD passes, plates unroll top-down, `+` bars type out.

## Colors

A cobalt-and-ink ground lit by a six-color lane palette, with yolk reserved for "where you are now".

### Primary
- **Yolk** (#ffd23f): HEAD. The HEAD node and its pulsing ring, the `HEAD → main` ref, the primary button, the second line of the hero name, every hash on cobalt, the focus ring, text selection, the scrollbar thumb, the typing caret, terminal commands. Also the full-bleed ground of the "O que eu uso" band.

### Secondary
- **Ember** (#ff6a3d): the closing band. The full-bleed ground of the contact section ("Bora dar merge?") and the Bram lane; the second node in the logo mark.
- **Mint** (#3ddc84): "alive and open". The `open-to-work` ref, the pulsing status dot, the shell path in the prompt and terminal; the Banco do Murilo lane.

### Tertiary (lane palette)
- **Sky** (#44d7ff), **Pink** (#ff4fa3), **Lilac** (#b49bff): lane colors for Quintal, Nexus and Bacon Burguer; sky also marks config keys and links inside the terminal. Together with yolk, ember and mint they form the six-color lane set the hero canvas cycles through.

### Deep variants (accent text on light bands)
- **Ember Deep** (#c2410c): commit hashes on the paper band, where yolk would vanish.
- **Mint Deep** (#0b6b37): the `+` stat bars and the totals on the yolk band.
- **Yolk Umber** (#4b3d07): secondary copy and the total line on the yolk band.

### Neutral
- **Cobalt Ground** (#141d8a): the page floor, the nav (at 94% opacity), the hero veil. Also the `theme-color`.
- **Graph Ink** (#0a0f3d): the casing stroke around every rail and node, text on every light ground and on every lane-colored fill, and the body of ink objects (terminal, config panel, footer, ink button).
- **Chalk** (#f5f3ee): primary text on cobalt and ink, the `main` rail, fork/merge nodes, the hover sweep inside buttons, the active nav pill.
- **Periwinkle Muted** (#bcc4f6): secondary text on cobalt and ink (meta lines, command sublines, captions, inactive nav).
- **Hairline** (rgba(196, 204, 255, 0.16)): dashed log dividers, nav underline, the HEAD readout border.
- **Paper** (#eef0f8): the full-bleed ground of the "Mais no log" band.
- **Ink Muted** (#3a4280): secondary text on paper.

### Named Rules
**The Cobalt Floor Rule.** The page ground is cobalt (#141d8a), never black or near-black. Ink (#0a0f3d) is for objects placed on the floor (terminal, config, footer, casings), never for the floor itself.

**The One Lane, One Color Rule.** Each project branch sets a single `--lane` color, and every lane-colored element of that project (its rail, its commit nodes, its ref pill, its `+` marks, its screenshot plate, its primary button, its merge line) uses it. Text on a lane fill is always ink.

**The Yolk Is HEAD Rule.** Yolk marks the current position and the main action: HEAD, primary button, focus, selection, caret. Do not spend it on decoration.

**The Full-Bleed Band Rule.** Paper, yolk and ember appear as whole section grounds edge to edge, flat. They are never gradients, tinted cards or partial panels. On those bands, text is ink and accent text drops to its deep variant.

## Typography

**Display Font:** Bricolage Grotesque (variable: opsz 12–96, wdth 75–100, wght 300–800), falling back to Arial Narrow, sans-serif
**Body Font:** Bricolage Grotesque, falling back to system-ui, sans-serif
**Label/Mono Font:** Martian Mono (variable: wdth 87.5–112.5, wght 300–700), set at 87.5% width, falling back to ui-monospace, SFMono-Regular, Menlo

**Character:** A loud, squeezed grotesque that sounds like a hand-painted sign, paired with a crisp, slightly narrowed mono that sounds like the terminal. The grotesque carries personality; the mono carries proof.

### Hierarchy
- **Display Hero** (800, wdth 75, clamp(3.4rem, 10.5vw, 6rem), line-height 0.88, -0.025em): the hero name (two lines, the second in yolk) and the contact title "Bora dar merge?" (which tightens to -0.03em and clamp up to 11vw). Balanced wrap.
- **Display** (800, wdth 75, clamp(3rem, 8vw, 5.75rem), 0.9): section headings ("Projetos", "Mais no log", "O que eu uso", "Sobre mim").
- **Headline** (800, wdth 75, clamp(2.4rem, 4.6vw, 4rem), 0.95, -0.02em): project titles and "Trajetória".
- **Title** (800, wdth 80, 1.35–1.55rem, 1.05–1.1): row names in the oneline list and stat table; the nav wordmark at 1.25rem.
- **Lede** (500, clamp(1.2rem, 2.1vw, 1.55rem), 1.35, -0.01em): the hero message (max 34ch) and the contact lede (max 40ch).
- **Body** (400, 1.0625rem, 1.6): running copy; project descriptions and about paragraphs step up to 1.1rem. Measure 46ch for project descriptions, 58ch for about copy.
- **Button** (700, 1.05rem, -0.005em): all buttons; the contact link list uses the same face at 700, wdth 85, clamp(1.15rem, 3vw, 2.1rem).
- **Mono Label** (400, 0.72–0.78rem, wdth 87.5, line-height 1.7): hashes, command sublines, meta lines, stack lines, nav links, terminal output, dates, footer.
- **Mono Ref** (700, 0.72rem): text inside filled ref pills.

### Named Rules
**The Two Voices Rule.** Bricolage speaks (names, headings, prose, buttons); Martian Mono reports (anything git or a shell would print: hashes, refs, commands, counts, dates, URLs, config keys). Never set a prose sentence in mono, and never set a hash or ref in Bricolage.

**The Condensed Shout Rule.** Every heading from Title up is weight 800 at 75–80% width with negative tracking and line-height under 1.1. Headings are never light, never wide, never letter-spaced open.

**The Command Subline Rule.** A section heading is followed (never preceded) by the mono git command that would produce it, with a dimmer plain-language gloss after a middle dot: `git diff --stat · quantos dos meus 16 repositórios públicos usam cada coisa`.

## Layout

The spatial model is a fixed left rail plus a content column. A 128px gutter (46px at 760px and below) is reserved on every section for the SVG commit graph; all content starts at `padding-left: var(--gutter)` and ends at a fluid right edge of clamp(16px, 4vw, 64px). The fixed nav is 60px tall (54px compact) and hides on scroll down; anchors scroll with a nav-height-plus-16px offset.

Sections breathe vertically at clamp(96px, 14vh, 150px); the contact band opens at clamp(110px, 16vh, 180px). Project articles are a 5fr/7fr grid (text left, sticky screenshot plate right, gap clamp(32px, 5vw, 80px)) that collapses to one column at 960px. "Mais no log" and "O que eu uso" are full-width row tables whose columns fold progressively at 1100px, 960px and 760px. The about section is a 1fr/1fr split (copy and config left, sticky terminal right) with the timeline spanning both columns below.

Inner rhythm: 8–12px between inline items (refs, meta), 18–22px between a heading and its first follower, 26–36px before action rows and lists. At 760px the hero centers vertically, its buttons go full width, the screenshot plates tighten, and secondary chrome (nav prompt, HEAD readout, hero hint, Frangão stage chips, the cursor preview) is removed rather than shrunk.

### Named Rules
**The Rail Gutter Rule.** Nothing but the graph lives in the left gutter. Every section, band and footer indents its content by the gutter so the rail never collides with copy.

**The Breakpoint Ladder Rule.** The system's breakpoints are 1100px (fold wide tables, drop the nav prompt), 960px (single-column projects and about), 760px (compact gutter and nav, mobile hero) and 360px (tightest nav links). New surfaces fold at the same steps.

## Elevation & Depth

The page is flat; depth belongs only to objects lifted off the printout. Bands and rows have no shadow. Floating objects (screenshot plates, the phone inset, the terminal, the cursor-following preview) share one deep, cobalt-tinted drop shadow, and buttons carry a short contact shadow that deepens on hover. Plates also tilt in 3D toward the pointer (perspective 1200px, rotateX/rotateY driven by `--rx`/`--ry`), which is the only perspective in the system. Layering in the graph comes from the ink casing drawn under each colored stroke, not from shadow.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 30px 60px -24px rgba(4, 7, 40, 0.65), 0 12px 24px -12px rgba(4, 7, 40, 0.45)`): plates, phone inset, terminal, preview.
- **Button rest** (`box-shadow: 0 10px 24px -14px rgba(4, 7, 40, 0.9)`): filled buttons at rest.
- **Button lift** (`box-shadow: 0 18px 30px -16px rgba(4, 7, 40, 0.95)`): filled buttons on hover, paired with a 2px rise.

### Named Rules
**The Flat Printout Rule.** Sections, bands, list rows and panels inside the flow are flat. A shadow means "this object sits on top of the page", and only plates, the terminal, the preview and buttons qualify.

## Shapes

Two silhouettes dominate: the full pill (999px) for every ref, button, nav link, terminal chip, stage chip and the XP bar; and the generously rounded plate (22px desktop, 16px mobile) that frames screenshots, with its image inset at 12px (9px mobile). Ink panels are softer rectangles: terminal 20px, config 16px, the starred timeline entry 14px, oneline hover fills 12px, stat hover fills 10px. Rails and nodes are round-capped strokes: a 4px colored lane over a 9px ink casing (3px over 6.5px compact), nodes at radius 7 (5 compact) with a 3.5px ink stroke. Rules are 1px dashed hairlines on cobalt, 1.5px solid ink at 14% on light bands, and 2px solid ink in the contact link list.

## Components

### Buttons
Tactile pills that fill from the bottom up.
- **Shape:** full pill (999px), minimum 52px tall, 2px border in the fill color, padding 0.85em 1.4em, icon gap 0.6em.
- **Primary:** yolk fill, ink text, button-rest shadow.
- **Hover / Focus:** a chalk layer sweeps up from below (`translateY(102%)` to 0, 0.45s), the button rises 2px with the lift shadow, the trailing arrow nudges up-right 2px; pressed state scales to 0.98. Focus is the global 2.5px yolk outline at 3px offset.
- **Ghost:** transparent with a 55% chalk border and chalk text; the chalk sweep turns the text ink.
- **Lane:** the project's lane color as fill, ink text, chalk sweep. One per project, always "Ver o site / Abrir o app / Jogar agora".
- **Ink / Outline (on ember):** ink fill with a lighter-cobalt sweep, and transparent with an ink border and an ink sweep. Used as the pair on the contact band.
- **Text link:** Bricolage 600, chalk, underline at 35% chalk that turns to the lane (or yolk) on hover; paired with a lane button as the secondary "Código no GitHub".

### Ref pills (signature)
Git decorations as UI. Mono, 0.72rem, pill, 1.5px border in currentColor. **HEAD** is yolk-filled, **lane** refs are lane-filled, **open-to-work** is mint-filled, all with ink text at 700; remote refs (`origin/main`) are outline only. A ref always sits beside a yolk hash in a mono meta line.

### Commit rail and HEAD marker (signature)
A fixed-gutter SVG drawn from the DOM: a chalk `main` rail, colored project lanes that curve out at the project title and back at the merge line, nodes that scale in from 0 as they are reached, and a yolk HEAD node with a pulsing ring. A yolk marker with an ink-outlined `HEAD` tag follows the scroll position along whichever lane is current, while the nav's `HEAD → …` readout names the current section's ref. Log lines ahead of HEAD sit at 22% opacity, shifted 6px left, and light up as HEAD passes.

### Screenshot plate
A lane-colored frame (22px radius, 12px side and bottom padding) with a mono ink URL bar on top and the screenshot inset at 12px radius on an ink backing. It unrolls top-down via clip-path on entry (1.2s), tilts toward the pointer, and carries the float shadow. A phone screenshot may overlap its lower-right corner at 27% width, rotated 4°, with a 5px ink border. The figure caption below is periwinkle at 0.86rem.

### Log list
The project feature list as commits: a 1rem column holding a lane-colored mono `+`, then the line at 0.98rem/1.45, separated by 1px dashed hairlines top and bottom.

### Oneline rows (paper band)
A five-column row (hash, name, description, tech, arrow) between 1.5px ink-14% rules. On hover or focus an ink fill wipes in from the left (`scaleX` 0 to 1, 0.5s), text turns chalk, the ember-deep hash turns yolk, and the arrow nudges up-right. On fine pointers a screenshot preview (340px, 6px ink border, rotated -3°) follows the cursor.

### Stat rows (yolk band)
A `git diff --stat` table: Title-size name, right-aligned tabular count, a mono bar of mint-deep `+` characters (one per repository) that types in with a 45ms stagger, and a yolk-umber gloss. Hover inverts the row to ink with yolk text and a mint bar.

### Terminal
An ink panel (20px radius, 1.5px white-8% border, float shadow) with a slightly lifted ink title bar (`bash` in mint, host in periwinkle), a scrolling mono output area, a prompt-led input with a yolk caret, and a row of pill suggestion chips (outline periwinkle, filling yolk on hover). Commands print in yolk behind a mint `visitante@portfolio:~$` prompt; links are sky; errors are a soft red.

### Inputs / Fields
The only field is the terminal input: borderless, transparent, inheriting the mono face, with a yolk caret. Focus is shown on the whole form row as an inset 2px yolk-40% top line.

### Navigation
A fixed 60px cobalt shell at 94% opacity with a hairline bottom border that slides away on scroll down. Left: the logo mark (two nodes on a forking rail, yolk and ember) and the condensed `murilo` wordmark; then a typed mono prompt `~/portfolio $ git log --graph --all` with a blinking yolk caret. Right: mono section links as pills (periwinkle at rest, 8% white on hover, chalk fill with ink text when current) and the outlined `HEAD → <ref>` readout with a yolk dot. Compact: the wordmark, prompt and readout are removed, links tighten to 0.7rem.

### Contact link list
Full-width rows between 2px ink rules: brand icon, the handle in Bricolage 700 at up to 2.1rem, and a trailing arrow. Hover slides the row 14px right and pushes the arrow up-right.

### Motion
One easing for everything, `cubic-bezier(0.16, 1, 0.3, 1)` (a fast-out, long-settle curve). State changes run 0.25–0.6s; entrances run 0.9–1.2s with staggered delays (the hero name rises line by line, then meta, message, refs, actions and status follow from 0.45s to 1s). Ambient loops are limited to the caret blink, the HEAD ring, the status pulse and the Frangão mascot hop. Under `prefers-reduced-motion` every animation and transition collapses, all hidden-until-reached content is shown, and the hero canvas stops ticking.

## Do's and Don'ts

### Do:
- **Do** keep the page on Cobalt Ground (#141d8a) and switch section grounds only to full-bleed Paper, Yolk or Ember bands.
- **Do** give every new project exactly one lane color from the six-color set (ember, yolk, mint, pink, sky, lilac) and route it through `--lane` to its rail, nodes, ref, `+` marks, plate and button.
- **Do** set ink (#0a0f3d) text on every yolk, ember, paper, mint and lane-colored fill.
- **Do** indent all content by the gutter (128px, 46px at 760px and below) so the commit rail stays clear.
- **Do** follow every section heading with its mono git command subline, and put hashes and refs in Martian Mono at 87.5% width.
- **Do** use the single easing `cubic-bezier(0.16, 1, 0.3, 1)` and make every reveal print, light up or unroll; provide a reduced-motion path that shows the final state.
- **Do** keep mono labels at 0.7rem or larger.

### Don't:
- **Don't** put the page on black or near-black, or build "black terminal + glowing cards"; the direction contract refuses it.
- **Don't** add glows, neon text-shadows, glassmorphism or gradient fills; the only gradient in the system is the hero's legibility veil.
- **Don't** give a project two lane colors, or use a lane color outside its own project article.
- **Don't** spend yolk on decoration; it means HEAD, primary action and focus.
- **Don't** put shadows on bands, list rows or in-flow panels; only plates, the terminal, the preview and buttons float.
- **Don't** set prose in mono or hashes and refs in Bricolage.
- **Don't** set light-band accent text in the bright accent; use the deep variant (ember-deep on paper, mint-deep or yolk-umber on yolk).
- **Don't** place anything but the graph in the left gutter.
