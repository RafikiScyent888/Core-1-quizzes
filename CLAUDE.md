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

## Known, not yet fixed (owner told 30 Sept 2026)

These colours predate this work and fall under 7:1: the Quick Quiz tiles
(2.9–4.1:1), the "Your answer was wrong" tag (5.5:1) and the disabled Prev
button (2.2:1). The fix is a colour change, so it needs a preview first.
