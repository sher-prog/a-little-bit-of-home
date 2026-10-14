---
name: A Little Bit of Home
description: A Durban family recipe box on a chocolate-brown desk, with ruled apricot index cards, popcorn-yellow tape, taped polaroids and handwriting.
colors:
  chocolate-fondant: "#573A35"
  chocolate-line: "#7A5A52"
  apricot-illusion: "#DFC6AB"
  tan-edge: "#C9AD8F"
  tan-edge-hover: "#D6BB9C"
  popcorn: "#F7E08F"
  popcorn-hover: "#FFEBA6"
  cerulean: "#98B4D4"
  ruled-grey: "#A9AFC0"
  rust-margin: "#A9502F"
  dress-blues: "#2D3446"
  ink-soft: "#4B5068"
  pen-blue: "#3A5A94"
  print-white: "#FFFAF2"
typography:
  display:
    fontFamily: "Nanum Pen Script, Segoe Print, cursive"
    fontSize: "clamp(4.6rem, 13vw, 10.5rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "clamp(2rem, 5.4vw, 2.9rem)"
    fontWeight: 700
    lineHeight: "56px"
  title:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: "28px"
  body:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: "28px"
  feature:
    fontFamily: "Nanum Pen Script, Segoe Print, cursive"
    fontSize: "clamp(2.8rem, 6vw, 4rem)"
    fontWeight: 400
    lineHeight: "84px"
  note:
    fontFamily: "Reenie Beanie, Segoe Print, cursive"
    fontSize: "max(1.6rem, 25px)"
    fontWeight: 400
    lineHeight: "28px"
  label:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "0.95rem"
    fontWeight: 700
    lineHeight: 1
rounded:
  card: "3px"
  tab: "10px 10px 0 0"
  flag: "8px 8px 0 0"
  pin-card: "6px"
  field: "4px"
spacing:
  u: "28px"
  gutter: "clamp(16px, 4vw, 48px)"
  tap: "44px"
  field: "48px"
  seat: "2px"
components:
  index-card:
    backgroundColor: "{colors.apricot-illusion}"
    textColor: "{colors.dress-blues}"
    rounded: "{rounded.card}"
    padding: "42px 22px 28px 90px"
  polaroid:
    backgroundColor: "{colors.print-white}"
    textColor: "{colors.pen-blue}"
    padding: "12px 12px 0"
  tab:
    backgroundColor: "{colors.tan-edge}"
    textColor: "{colors.dress-blues}"
    rounded: "{rounded.tab}"
    height: "44px"
    padding: "0 18px"
  tab-selected:
    backgroundColor: "{colors.apricot-illusion}"
    textColor: "{colors.dress-blues}"
    height: "52px"
  flag-on:
    backgroundColor: "{colors.cerulean}"
    textColor: "{colors.dress-blues}"
    rounded: "{rounded.flag}"
    height: "44px"
    padding: "0 16px"
  flag-on-hover:
    backgroundColor: "{colors.popcorn}"
  field:
    backgroundColor: "{colors.cerulean}"
    textColor: "{colors.dress-blues}"
    rounded: "{rounded.field}"
    height: "48px"
    padding: "11px 13px"
  button-popcorn:
    backgroundColor: "{colors.popcorn}"
    textColor: "{colors.dress-blues}"
    rounded: "{rounded.field}"
    height: "48px"
    padding: "0 21px"
  button-popcorn-hover:
    backgroundColor: "{colors.popcorn-hover}"
  print:
    backgroundColor: "{colors.print-white}"
    textColor: "{colors.pen-blue}"
    padding: "12px"
    width: "340px"
  soon-chip:
    backgroundColor: "{colors.popcorn}"
    textColor: "{colors.dress-blues}"
    rounded: "3px"
    padding: "0 0.55rem"
  task-line:
    textColor: "{colors.dress-blues}"
    height: "28px"
---

# Design System: A Little Bit of Home

## Overview

**Creative North Star: "The Recipe Box on the Desk"**

A dark chocolate-brown desk with a family's recipe box emptied onto it. Everything that carries content is a physical object lying on that brown: ruled apricot index cards with a rust margin line and paper grain, polaroids held down with masking tape, filing-box tabs, a dashed pinned card. Type follows the objects: typed text in a typewriter face, the title and the polaroid captions in handwriting, the family's notes in blue ballpoint. The site reads as one person's kitchen drawer, not a brand.

Density is gentle and unhurried. The page is a loose pile on the left and right of a hero, then a search box and a box of tabbed cards, then a note card and a pin card. Hand-set tilt is the only irregularity; everything typed sits between strict 28px rule lines. Paper is never marked with invented wear: no stains, rings or scuffs. Tilt, tape and handwriting are the only signs of handling.

The palette was extended with two Pantone-derived colours, Popcorn and Cerulean, on the unchanged world. The build diverges from nothing in the direction contract. Where photographs are not yet supplied, labelled placeholders stand in and say exactly which file they are waiting for.

**Key Characteristics:**
- Two grounds only: chocolate desk, apricot paper. Popcorn and Cerulean are small object colours (tape, the search field, the Search button), never grounds.
- Typewriter for everything read, handwriting for everything felt.
- Rule lines, margin line and grain are the texture; shadows are soft and blurred. No stains or invented wear marks.
- Text sits between rule lines: a 28px row with the rule at the bottom of each row.
- Tilts are hand-placed but deterministic.
- One authored motion moment, the pin.

## Colors

A warm, dark chocolate desk with apricot paper on it, one rust margin, one blue-pen accent, and two bright stationery colours: popcorn yellow and cerulean blue. Each colour has a physical source. Names follow the Pantone sources where given (Popcorn and Cerulean are approximate sRGB).

### Primary
- **Chocolate Fondant** (#573A35, `--ground`): the body ground, with paper grain overlaid. Text on it is Apricot Illusion. Also the theme-color. Contrast of paper on ground is 6.21:1.
- **Apricot Illusion** (#DFC6AB, `--paper`): index-card paper, title text, grid panel, selected tab, active country flag, and the text colour for nav and footer on the desk. Dashed outlines on the desk use it at 0.55 alpha. The active country flag is no longer apricot (see Cerulean).

### Secondary
- **Pen Blue** (#3A5A94, `--pen`): the writer's voice. Polaroid captions, handwritten notes, checked ingredient and method-step ticks and the strikethrough, text selection, and the focus ring on paper.
- **Popcorn** (#F7E08F, `--popcorn`; Pantone 12-0825 TCX Popcorn, approximate): the highlighter and the tape. Masking tape (`--tape`, Popcorn at 0.8 alpha, multiplied), the marker highlight behind the blue-pen "start here", the Search button (hover #FFEBA6), and the hover of the active flag. Dress Blues on Popcorn is 9.47:1; Pen Blue on Popcorn is 5.2:1, which clears the small-text bar, so the blue-pen "start here" sits on a Popcorn highlight.
- **Cerulean** (#98B4D4, `--cerulean`; Pantone 15-4020 TCX Cerulean, approximate): the fill of the search field and the active country chip. Text on Cerulean is always Dress Blues (5.8:1; placeholder #2F3A55). Never Pen Blue on Cerulean: it is 3.2:1.
- **Rust Margin** (#A9502F, `--margin`): the vertical margin line on cards and the recipe sheet, at 0.8 opacity, and the 9% alpha hatch on empty photo slots. Never text.

### Neutral
- **Dress Blues** (#2D3446, `--ink`): body text and headings on paper, tab text, credit links, checkbox borders.
- **Ink Soft** (#4B5068, `--ink-soft`): derived from Dress Blues; metadata, sources, "coming" titles, checked ingredient and step text.
- **Tan Edge** (#C9AD8F, `--tan` and `--paper-edge`, one value): unselected filing tabs and empty photo slots. Tab hover is #D6BB9C. It is no longer the tape colour.
- **Chocolate Line** (#7A5A52): the footer hairline and the 1px inset that separates tabs from the apricot box.
- **Ruled Grey** (#A9AFC0, `--rule`): the 1px ruled lines, one per 28px.
- **Print White** (#FFFAF2, `--print`): polaroid frame.

### Contrast facts
- Apricot Illusion on Chocolate Fondant: 6.21:1.
- Dress Blues on Apricot Illusion: 7.57:1.
- Pen Blue on Apricot Illusion: 4.17:1. This passes as large text only, so every Pen Blue handwriting run on paper is 24px or larger (notes max(1.6rem, 25px), captions 1.6rem, hand label 1.9rem, "start here" 2.1rem). Pen Blue never sets small typed text.
- Dress Blues on Popcorn 9.47:1; Pen Blue on Popcorn 5.2:1 (the "start here" highlight); Dress Blues on Cerulean 5.8:1; Pen Blue on Cerulean 3.2:1 (forbidden pairing); Popcorn on Chocolate Fondant 7.77:1.
- The credit link uses Dress Blues (bold), not Pen Blue, for that reason.

### Named Rules
**The Two Grounds Rule.** Every surface is either the chocolate desk or apricot paper. Text on the desk is apricot; text on paper is ink or pen blue. Nothing else is a background. Tan, Popcorn and Cerulean are small object colours: tabs and slots, tape and the button, the field and chips.

**The Real Pen Rule.** Pen Blue appears only where a person wrote something: captions, notes, ticks, strikethroughs (ingredient lines and method steps alike). It is never a button or a decorative accent.

**The Cerulean Ink Rule.** Cerulean always carries Dress Blues text (5.8:1) and never Pen Blue (3.2:1). It is a field and chip colour, not a card or page background.

**The Popcorn Highlight Rule.** Popcorn is what a hand reaches for: tape, a marker highlight, the button you press, active states. Text on it is Dress Blues, or Pen Blue only where it is the blue-pen note over a highlight (5.2:1).

**The Large Pen Rule.** Pen Blue text is 24px or larger because 4.17:1 only passes as large text. Smaller text on paper takes Dress Blues or Ink Soft.

## Typography

**Display Font:** Nanum Pen Script (with Segoe Print, cursive)
**Body Font:** Courier Prime (with Courier New, monospace)
**Note Font:** Reenie Beanie (with Segoe Print, cursive), pen blue only

**Character:** A hand-lettered title (the single word "Durbanite", up to 10.5rem) over typewritten cards, with a second, scrawled hand for the family's marginal notes. All three load locally as woff2 (weights 400 and 700 for Courier Prime); Nanum Pen Script is preloaded. Handwriting carries a 0.3px text stroke and 0.01em tracking so the pen reads thicker.

### Hierarchy
- **Display** (400, clamp(4.6rem, 13vw, 10.5rem), 0.9): the hero title, the single word "Durbanite" in Nanum Pen Script; country titles use a smaller clamp(4rem, 10vw, 7rem)/0.9; pin-card heading clamp(2.6rem, 6vw, 3.6rem)/1; wordmark 2.4rem.
- **Feature** (Nanum Pen Script 400, clamp(2.8rem, 6vw, 4rem), 84px = 3 rows): the featured card heading ("My GO-TO Favorite!"). The 3-row line box, with a -14px top margin, lets its baseline land on a rule.
- **Headline** (Courier Prime 700, clamp(2rem, 5.4vw, 2.9rem), 56px = 2 rows): the recipe title.
- **Title** (700, 1.0625rem, 28px): card headings, ingredient group headings, "Method" at 1.25rem, step titles 1.1rem, tile titles and the featured dish name ("Eggs in tomato chutney") 1.2rem.
- **Body** (400, 1.0625rem, 28px): all prose, max 62ch (70ch in Good to know).
- **Note** (Reenie Beanie 400, max(1.6rem, 25px), 28px line): handwritten notes in pen blue; polaroid and print captions 1.6rem; hand label 1.9rem; "start here" 2.1rem; "soon" notes max(1.6rem, 25px).
- **Label** (700, 0.95rem, 1): filing tabs. The search label is bold body text.

### Named Rules
**The Between the Lines Rule.** Text sits between rule lines. A row is --u (28px) and the rule is drawn at the bottom of each row, with the background offset by --seat (2px) so letters rest just above it. Every line-height on paper, headings included, is a whole multiple of 28px (1u, 2u, 3u); a fractional multiple such as 1.5u is not used. The featured handwriting heading uses a 3-row line box so its baseline sits on a rule. Measured in the browser, the text sits 5-7px above each rule; that measured gap (the nominal --seat is 2px, and glyph descent adds the rest) is the benchmark for new paper surfaces.

**The Hand Is Not Body Rule.** Handwriting is never set for paragraphs the reader must follow; only titles, captions and short notes.

## Layout

The page is a centered 1200px wrap with a fluid gutter (clamp(16px, 4vw, 48px)). The hero is two columns (1.15fr title and letter, 1fr photo pile) that collapses to one column at 880px, in the order title, letter, pile. The featured card, the note and pin pair, and the recipe header all stack at 880px. At 560px recipe steps stack, the recipe grid goes to two columns and the tabs become a single horizontally scrolling row.

The ruled line unit is --u: 1.75rem (28px). Rules are drawn by a repeating gradient on the card background, one per row at the row's bottom edge, offset to start at 1.5u from the top and seated 2px (--seat) above the text baseline; vertical spacing on paper is expressed in multiples of u. The recipe sheet is 1000px max, with its left padding clearing the margin line (left: clamp(2.4rem, 7vw, 4.4rem)). The dish polaroid floats right at 300px beside the title and ingredients, and centres above them below 880px.

The country header (`.country-head`) is two columns: the name, lede and search at 1fr, and the print at up to 340px on the right (aligned to the end, vertically centred), gap clamp(24px, 5vw, 72px), collapsing to one column at 880px with the print aligned to the start. The search row is a flex row with an 8px gap that stacks below 700px. On the home page the hero pile holds two polaroids: the featured recipe (big) and the second live recipe (small, from the site's hero.secondary or the next live recipe); from 881px the small one overhangs the pile by 2rem to the right and 3rem below.

Interactive targets are 44px minimum (nav links including the country back link, tabs, flags); the search field and the Search button are 48px.

## Elevation & Depth

Depth is physical and soft: paper lies on the desk with a faint white inset highlight, a faint brown inner edge shadow, a 2px close shadow and a long diffuse one (0 1px 0 rgb(255 255 255 / .35) inset, 0 0 18px rgb(87 58 53 / .09) inset, 0 2px 3px rgb(0 0 0 / .25), 0 18px 30px -16px rgb(0 0 0 / .55)). Polaroids sit a little higher with a three-layer blurred shadow (0 1px 1px rgb(0 0 0 / .25), 0 10px 16px -6px rgb(0 0 0 / .4), 0 28px 36px -22px rgb(0 0 0 / .5)); grid minis are slightly deeper (0 1px 1px rgb(0 0 0 / .3), 0 12px 18px -6px rgb(0 0 0 / .5), 0 30px 38px -22px rgb(0 0 0 / .55)). The country print uses the grid-mini polaroid shadow. The Popcorn Search button is lit the same way: a soft downward shadow (0 6px 10px -4px rgb(0 0 0 / .45)) that shrinks when pressed (0 2px 4px -2px rgb(0 0 0 / .45)); there is no hard offset shadow anywhere in the build. Tape has a 1px 2px brown shadow (rgb(87 58 53 / .35)) and multiplies into what is under it. The selected tab casts a faint upward shadow (0 -3px 6px -3px rgb(0 0 0 / .35)). The pin card is flat and outlined with a 2px dashed apricot border at 0.55 alpha, as if drawn. Grain (an SVG fractal noise at 0.075 alpha) covers desk and paper. Nothing on the paper is stained or scuffed.

### Named Rules
**The Lying Flat Rule.** Shadows are blurred and offset downward like paper under a lamp. A hard, zero-blur offset shadow is not part of this world.

## Shapes

Paper corners are nearly square (3px). Filing tabs and country flags have rounded tops and square bottoms (tabs 10px 10px 0 0, flags 8px 8px 0 0) so they read as tabs. The box under the tabs has a square top-left corner so the selected tab joins it. Tape is clipped to a ragged torn polygon. The search field and button are 4px. The pin card is 6px with a dashed outline. Ingredient checkboxes are 2px-radius hand-ticked squares. The sheet carries two punched binder holes at the left edge, cut in the desk colour (hidden at 560px).

## Components

### Index Card
Apricot paper, 3px corners, grain, 1px rules at 28px, rust margin line. Left padding clears the margin (clamp(3.4rem, 9vw, 5.6rem)). The hero letter is rotated -0.7deg. Cards present as articles with Title headings.

The featured card is rotated 0.35deg; its heading is the Feature handwriting size on a 3-row line box, and the blue-pen "start here" note with a drawn arrow sits at its top right on a Popcorn marker highlight (a gradient band from 48% to 90% of the line).

### Polaroid
Print White frame, 12px side and top padding, square photo well (aspect-ratio 1, Tan Edge) with an inset 1px hairline (rgb(30 42 45) at 0.12 on photographs; Dress Blues at 0.25 on placeholders), handwritten pen-blue caption in a 3rem-high strip, and a popcorn tape strip centered at the top. Each is rotated by --tilt. On hover in the grid it straightens and lifts 6px.

Tape: Popcorn at 0.8 alpha (`--tape`) with a 0.3 white highlight gradient, mix-blend-mode multiply, ragged clip-path.

Placeholder (slot): a Tan Edge well overlaid with a rust hatch (135deg stripes, Rust Margin at 0.09 alpha, 2px lines every 14px) showing `[photo: what it is]` and the file path it waits for in 0.78rem typewriter, plus a bracketed caption. It is aria-hidden.

### Filing Tabs and Box
Buttons in a row above the box, now Mains, Snacks and Sweets after All (the categories come from the site content). Unselected: Tan Edge, 44px high, with a 1px Chocolate Line inset so adjacent tabs and the apricot box stay separate (hover #D6BB9C). Selected (aria-pressed true): Apricot Illusion, 52px high, no inset, so it merges with the box. The tabs are hidden without JavaScript (`.tabs` is display none; `.js .tabs` shows them, the `js` class being set on the html element by an inline script), because filtering is progressive enhancement. A polite status line announces the count. On the country page the box has a square top-left corner of 3px since no tabs join it.

### Search Box
A "Search the box" bold label over a row of a Cerulean field (48px, 4px corners, 2px transparent border, Dress Blues text, placeholder #2F3A55) and a Popcorn "Search" button (see Popcorn Button), max 640px, above the tabs. Focus on the field is a 3px apricot ring with a Dress Blues border. Below 700px the row stacks. With JavaScript it filters live and the button just applies; without it the form submits as a GET.

### Popcorn Button
The Search button (`.go`): Popcorn fill, Dress Blues bold 1rem typewriter, 4px corners, 48px high, 0 21px padding, hover #FFEBA6, soft shadow (0 6px 10px -4px rgb(0 0 0 / .45)); active presses down 2px and the shadow tightens. It is the only button in the build besides the filing tabs.

### Country Flags
44px dashed-outline tabs on the desk. The active flag is Cerulean with a solid Cerulean border and bold ink text (hover Popcorn); a "[your country]" flag is the open slot.

### Country Print
A polaroid-style frame (Print White, 12px padding, grid-mini shadow, tape on top, tilt 1.6deg) holding a hand-built SVG illustration (the South African flag with a leaping springbok, drawn in code with gradients and a grit filter) with a blue-pen Reenie Beanie caption beneath ("springbok", 1.6rem). Width up to 340px. The SVG has role img and a spoken label. The illustration is its own full-colour artwork; it is the one place colour outside the palette is allowed, because it depicts a real flag.

### Ingredient Line and Task Line
One component (`.ing`) serves ingredients and method steps. A custom 1.15rem checkbox; ticking draws a pen-blue check and strikes the text with a 2px pen-blue `text-decoration: line-through` (skip-ink off), so every wrapped line of an item gets its own strike rather than one bar across the block; ink goes soft (Ink Soft) with a 0.3s colour fade. Method steps (`.ing.tasks`) are checkbox lists with one tick per action, replacing the step paragraph, followed by the pen-blue step note. State is remembered in localStorage per page, keyed by the page path and each box's position among all `.ing` boxes (ingredients first, then steps). Without JavaScript the boxes still tick for the session but are not remembered.

### Coming-soon Tag
In the pin card, a sentence announcing cook-along videos led by a "Coming soon" chip: Popcorn fill, Dress Blues bold text, 3px corners, 0 0.55rem padding, 1rem above. The sentence itself is apricot body text on the desk. A Popcorn chip with ink text is the pattern for any "on the way" announcement on the desk.

### Navigation
Handwritten wordmark on the left, typed lowercase links (recipes, about, countries) on the right, apricot text on the desk, underlined on hover with thicker stroke. The current page link carries aria-current="page" and takes the same thick underline (home marks "recipes", country pages mark "countries"). The recipe page replaces the links with a drawn-SVG "← country" link (a 1.1em stroked arrow in currentColor, then the country name, to the country page) and "Back to the box". Links are nowrap and 44px high; the nav wraps rather than overflowing. The first link has no left padding so it aligns with the wordmark. The footer is apricot text over a 1px Chocolate Line top border.

## Rules

**The Unit Rule (--u).** One unit, --u = 1.75rem (28px), runs the whole system: the rule spacing, body line-height, heading multiples (whole numbers only) and vertical gaps on paper. --seat (2px) lifts text onto its rule.

**The Pin Rule.** One authored motion moment: each polaroid drops in from 22px above, rotated three times its tilt, over 0.9s with the expo-out ease (cubic-bezier(.16, 1, .3, 1)); the small hero polaroid delays 220ms. Hover transforms are 0.5s on the same ease, and a ticked line fades its ink over 0.3s. The strike itself is instant. Under prefers-reduced-motion: reduce, all animation and transition are off and smooth scroll is off, so polaroids appear at rest, tilted.

**The Ground Focus Rule.** The focus ring is 3px solid, 3px offset, with the colour set per ground through --ring: Apricot Illusion on the chocolate desk (default, and on tabs and the active flag), Pen Blue on any paper (cards, sheet, box, letter, note card, and ingredient checkboxes). The search field on the desk uses an apricot ring. Add new paper containers to the Pen Blue list.

**The Same Tilt Rule.** Tilt is a pure function of index: the list [-2.2, 1.6, -1.1, 2.4, -1.8, 1.2] degrees indexed by position modulo 6, set inline as --tilt. Tape counter-rotates by tilt times -2.2. No randomness, so a reload never reshuffles.

**The Named File Rule.** A placeholder names what it is waiting for: its label says the subject (the finished dish, a step) and its path says the exact file to drop in. Never a blank grey box or lorem.

## Do's and Don'ts

### Do:
- **Do** put new content on an apricot card or tape-mounted polaroid over the chocolate desk.
- **Do** set text between the 28px rule lines and keep every heading at a whole multiple of 28px (1u, 2u, 3u).
- **Do** put Dress Blues text on every Cerulean field and the Popcorn button.
- **Do** reach for Popcorn for tape, highlight and press-me states.
- **Do** use Pen Blue only for things a person wrote, at 24px or larger.
- **Do** use Dress Blues for any small text or link on paper.
- **Do** keep tap targets at 44px minimum.
- **Do** pass the tilt through the index function, never random.

### Don't:
- **Don't** add a third background colour or a gradient fill outside paper rules, the slot hatch and the tape highlight.
- **Don't** use blurless hard offset shadows.
- **Don't** add coffee stains, rings, scuffs or any invented wear marks to paper.
- **Don't** set Pen Blue on Cerulean (3.2:1).
- **Don't** show the filing tabs without JavaScript.
- **Don't** set paragraphs in handwriting.
- **Don't** add motion beyond the pin, the hover straighten and the 0.3s tick fade.
- **Don't** ship a placeholder that does not name its file.

Not canonized: the "start here" hand label on the featured card is a small label above the heading (an eyebrow-style pattern) and the hero letter sign-off line; neither is a rule for new surfaces. The earlier unclosed `@media (max-width: 700px)` block is fixed in the build: the two-column country header and the hide-tabs-without-JS rule now apply at every width. Build drift not repaired: dead duplicate `.r-head` grid rules (overridden to block) and an unused `.hand-label`; the literals #D6BB9C, #7A5A52, #FFEBA6 and #2F3A55 are hard-coded rather than custom properties.
