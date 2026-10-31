# Core 1 quizzes — project context

Read with `/root/.claude/CLAUDE.md`, which sets the rules and wins over this
file: push to GitHub after each verified change, AAA contrast on painted
pixels, objectives from the owner's Google Doc, 20+ questions per topic.

## What this is

`index.html` holds the whole A+ Core 1 (220-1201) practice exam: the app, the
styles, and the question bank as JSON in `<script id="question-data">`. There
is no build step. GitHub Pages serves `main`.

## Topics (30 September 2026)

- **Source:** the 15 topics come from the owner's "All updated Objectives"
  doc (Core 1 V15), numbered in its order. The owner chose "use the list in
  the document that I provided you" over the 27-objective list in Shane's
  Retake Planner. So these numbers are not CompTIA's official ones.
- **The remap:** before this, the quiz had 25 home-made labels. All 668
  questions were refiled; 46 moved individually because their old label was
  wrong for them. The owner saw the full remap preview first.
- **The floor:** at least 20 questions per topic, the owner's rule for every
  quiz. Four topics were short: 1.1, 2.3, 4.2 and 5.2. Each got questions
  to reach 20, plus the standing "5 additional scenarios", so each now has 25.
  That's 50 new questions, `q0669`–`q0718`, each with the field
  `"source": "Added 30 Sept 2026 ..."`.

## Score card, question map and filters (31 October 2026)

Built to the owner's decisions in the doc "Test banks: score card, question
map and filters (plan)" (https://claude.ai/artifact/6vcGwyvSsrwfHBWaKp6rq5).
The owner saw the preview (the colours, a quiz, the filters, Reset, results,
"Study these first", Easier reading, a phone) and approved it: "I like Core 1,
push it." Live on `main` the same day. Still open: the CertMaster Learn
address students use, and the lesson list for linking each topic.
- **Topic colours:** `TOPIC_COLOR`, the owner's rainbow, one per topic (outside
  the royal six, so previewed first). Dark lettering on each is over 7:1. A
  colour always goes with the topic's number and name.
- **Quiz screen:** the parts bar (one part per topic, as wide as its share),
  the filter chips (All, each topic by number, "New for the updated
  objectives" for the `source: "Added 30 Sept 2026..."` questions, Missed),
  Shuffle order, the "Jump to any question" map (border is the topic colour;
  right and wrong told by fill, a tick or cross and words; a wrong number
  struck through; the current one ringed in white), and beside them the score
  card, "Study these first" and the two buttons.
- **The lasting Missed list:** `core1_missed_v1`, `{id: {n, at}}`. A wrong
  answer goes on and a right answer comes off, in any quiz. "Study these
  first" lists its topics, most missed first, each with "Practise this topic"
  (up to 25 of that topic, its missed ones included) and "Review in CertMaster
  Learn". "Retake all missed" is the whole list; "Retake the N I missed" (this
  quiz) stays as it was.
- **CertMaster Learn:** `CERTMASTER_URL` is CompTIA's sign-in page
  (learn.comptia.org/login) until the owner confirms the address students
  use. No lesson numbers: the 220-1201 lesson list isn't public.
- **Reset** clears this quiz only, after asking; the Missed list stays.
  Leaving a quiz part-way and finishing with questions left also ask first.
- **Shuffle order** (`core1_shuffle_v1`, on by default) shuffles the questions
  and their answers; off gives the bank's order and the answers as written.
  Switching part-way keeps every answer.
- **Easier reading:** the button at the top, remembered under
  `cwp-easier-reading`. All five test banks share the origin
  rafikiscyent888.github.io, so they should all use that key.
- **Review:** a square on the results map opens that question, locked.

## Light or dark (31 October 2026)

The owner asked for a dark/light switch on every test bank ("we need to keep
things easy for my students to read"). None of the five quiz repos had ever
had one; the acronym sites do. The owner saw the preview (both sets of topic
colours, a quiz in each mode, the dashboard, results, the dialog, Easier
reading, a phone) and approved it: "Push it and do the rest". Live on `main`
the same day. Decided by the owner before building:
- **One choice for the whole program:** the key is `cwp:theme` ("light" or
  "dark"), the same key the acronym sites use, so a choice made there holds
  here. Nothing is saved until the student presses the button.
- **Core 1 starts dark** when nothing is chosen, whatever the device is set
  to (the owner's choice; the other test banks follow the device).
- Previewed on Core 1 first, then Core 2, Network+, Security+, CySA+.

How it works:
- A script in the head stamps `data-theme` on `<html>` before the page
  paints, so it never flashes.
- `#themeBtn` sits beside Easier reading and names where it goes ("Light
  mode" on the dark page), with a sun or moon; its label says both ("Switch
  to light mode. Currently dark mode."), as on the acronym sites.
- **Light mode** is one block, `<style id="light-theme">`, every rule under
  `:root[data-theme="light"]`: slate text on white and silver, royal navy
  buttons with white lettering, focus ring purple.
- **Topic colours in light mode:** `TOPIC_DEEP`, a deep shade of each
  topic's own hue, white lettering over 7:1, neighbours alternating in depth
  so they stay apart. `tc(id)` carries both (`--tc` bright, `--tcd` deep).
- **Dark mode is unchanged.** Every new rule is scoped to light; the only
  other change is the button in `.topline`.

## AAA on gradients (fixed 31 October 2026)

The contrast check only took a background colour that covered 8% of a text's
box, so on a gradient it found none and passed the text unmeasured. Fixed in
`verify/contrast.mjs`: the darkest and lightest parts of a gradient are now
measured too. It found white on the bright tiles at 2.9:1 (orange) and 4.3:1
(purple), in both modes. `<style id="aaa-gradients">` deepens them, same
hues: the fire tile is now deep red, the lightning tile deep purple, white
lettering over 7:1. A planted old orange tile is caught.

## Checks: `verify/` (needs Playwright; not needed to run the site)

- `node verify/objectives.mjs` checks topics against
  `verify/objectives-core1-2026-09-30.md` (the doc, verbatim), that every
  question is filed and well formed, the 20 floor, the setup counts, and a
  one-topic quiz. `--plant` runs 10 plants.
- `node verify/retake.mjs` drives "Retake the ones I missed" end to end, with
  contrast on painted pixels. `--plant` runs 7 plants.
- `node verify/scorecard.mjs` drives the score card, map, chips, parts bar,
  Missed list, Reset, the prompts, Shuffle order, review, Easier reading and
  light or dark (starts dark on a light or dark device, nothing saved until
  chosen, the button's words, `cwp:theme`, a choice from another site, the
  deep shades). `--plant` runs 29 plants.

## Contrast (fixed 30 September 2026)

Every student-facing screen meets AAA on painted pixels. The owner approved
the before/after preview: "I like all of the changes in all of the quizzes".
- The approved colours are in a block marked "AAA contrast" (`<style id="aaa-contrast">` at the end of the head in `index.html`).
- Colour changes stay in the royal palette, with no new hues.
- Disabled buttons are no longer faded out. They're solid silver with a dashed
  border and readable text.
- `node verify/contrast.mjs` drives every screen (dashboard, setup, question
  before and after answering, results, paused-quiz banner; since 31 October
  also a chip and a part chosen, the confirm dialog, Easier reading on every
  screen, and a phone) and fails on
  anything under 7:1 (4.5:1 for large text). `--plant` puts back the old
  sky-blue buttons and must fail.
- Since 31 October it drives every screen twice, dark then light, each in a
  fresh browser, and fails if a sweep finds the page in the other theme.
  `--theme=light` runs one. Calibrated with plants: faint light-only text,
  an unreadable light chip, the light hover fix removed, and the theme
  setting ignored; all were caught. Text on gradients is measured too
  (above).

Run it after any colour or layout change.
