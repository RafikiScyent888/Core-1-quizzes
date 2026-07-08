# CompTIA A+ Core 1 Practice Exam

A self-contained, single-file practice exam app for CompTIA A+ Core 1
(220-1201), built from a bank of 403 multiple-choice questions pulled from
this repo's original day-by-day quizzes.

**[Open `index.html`](./index.html)** — no install, no server, no build step.
Download it and double-click, or host it anywhere (GitHub Pages, S3, a local
file server) and it just works.

## Features

- **403 questions** covering all 5 official CompTIA A+ Core 1 (220-1201)
  objective domains:
  - Mobile Devices
  - Networking
  - Hardware
  - Virtualization and Cloud Computing
  - Hardware and Network Troubleshooting
- **Filter by domain** — study one objective area or mix any combination.
- **Choose 45–245 questions** per attempt, clamped to however many are
  available for your current domain selection.
- **Every choice is explained** — not just why the correct answer is right,
  but a specific reason *each* wrong choice is wrong, so a missed question
  is still a learning moment.
- **Scored out of 100**, plus a per-domain breakdown so you can see which
  objective areas need more work.
- **Pause and resume** — progress is saved to your browser's local storage,
  so you can close the tab and pick up exactly where you left off, even
  after a full page reload.
- **Missed-question review** at the end of every attempt.

## How it works

Everything — the app, the styling, and the full question bank — lives in
one HTML file (`index.html`). There's no backend and no external requests;
progress is stored only in your browser's `localStorage`, on your own
device.

## Source data

The question bank was consolidated and cleaned up from the individual quiz
files in this repo:

| File | Topic |
|---|---|
| `A+ Core 1 Day 1.html` | Troubleshooting methodology, mobile devices |
| `A+ Core 1 Day 2.html` | Storage devices |
| `A+ Core 1 Day 3.html` | Motherboards, BIOS/UEFI |
| `A+ Core 1 Day 4.html` | Hardware components |
| `A+ Core 1 Day 5.html` | Printers |
| `A+ Core 1 Day 6.html` | Network devices |
| `A+ Core 1 Day 7.html` | Networking protocols & tools |
| `A+ Core 1 Day 8.html` | Networking commands & troubleshooting |
| `A+ Core 1 Review.html` | Mixed review |
| `CompTIA_MFD_Printers_Quiz_30Q_WITH_Answers.html` | Multifunction printers |
| `comp_tia_subnetting_networking_concepts_quiz_30_questions.html` | Subnetting |

During consolidation, each question was tagged with its CompTIA objective
domain and given a genuine explanation for every wrong answer choice (the
originals only explained the correct answer). A handful of answer-key
errors found in the source files (mainly in the subnetting quiz) were
corrected along the way.

## Disclaimer

This is a community-built study aid, not official CompTIA material.
