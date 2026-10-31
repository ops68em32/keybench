# Keybench
A single-user PWA that teaches piano from zero using the curriculum in GUIDE.md.
SPEC.md is the product spec; follow its sections for architecture, drill types,
mastery rules, data model and roadmap. Build phase by phase; never start a phase
before the previous gate passes.

## Stack
TypeScript, React 18, Vite, Tailwind, Zustand, React Router, Dexie, webmidi,
Tone.js, pitchy, OpenSheetMusicDisplay, vite-plugin-pwa, Vitest, Playwright.
No backend. No other runtime dependencies without asking.

## Input
The microphone is the default and primary input on every device. Web MIDI is an
optional upgrade that switches on automatically when a MIDI device is present.
Never require MIDI for any feature; label scores that need polyphonic timing as
"approximate" when they come from the mic, as SPEC.md describes.

## Rules
- theory/ and planner/ and every drills/*/grade.ts are pure functions with
  Vitest tests. Write the test first.
- The curriculum is data: units live in curriculum/units/*.json and are validated
  against each drill's Zod schema at build time. Never hard-code a lesson in a component.
- All note input flows through the NoteEvent stream in input/. Drills never touch
  MIDI or the mic directly.
- Colours and type come from tailwind.config tokens taken from GUIDE.md: right hand
  #C4841A, left hand #1E8C82, root/landmark #B23A48, ink #1B2130, bg #F3F5F8.
- Keyboard diagrams use the ported SVG renderer from GUIDE.md so the app matches the book.
- Mobile first: every screen works at 390 px wide; the on-screen keyboard spans
  two octaves on a phone and scrolls.
- After each phase: run `npm test`, `npm run build`, and write a short VERIFY.md
  telling a non-developer exactly what to click to confirm the gate.
- The user is not a developer. Explain choices in one line, not essays. When
  something needs a decision, ask one question with a recommended default.

## Commands
npm run dev / npm test / npm run build / npm run preview
