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

## Checks: `verify/` (needs Playwright; not needed to run the site)

- `node verify/objectives.mjs` checks topics against
  `verify/objectives-core1-2026-09-30.md` (the doc, verbatim), that every
  question is filed and well formed, the 20 floor, the setup counts, and a
  one-topic quiz. `--plant` runs 10 plants.
- `node verify/retake.mjs` drives "Retake the ones I missed" end to end, with
  contrast on painted pixels. `--plant` runs 7 plants.

## Contrast (fixed 30 September 2026)

Every student-facing screen meets AAA on painted pixels. The owner approved
the before/after preview: "I like all of the changes in all of the quizzes".
- The approved colours are in a block marked "AAA contrast" (`<style id="aaa-contrast">` at the end of the head in `index.html`).
- Colour changes stay in the royal palette, with no new hues.
- Disabled buttons are no longer faded out. They're solid silver with a dashed
  border and readable text.
- `node verify/contrast.mjs` drives every screen (dashboard, setup, question
  before and after answering, results, paused-quiz banner) and fails on
  anything under 7:1 (4.5:1 for large text). `--plant` puts back the old
  sky-blue buttons and must fail.

Run it after any colour or layout change.
