# Keybench Product Plan

Oct 20, 2026 · Erle

## What we are building

Keybench is a web app that takes one person from "I can find middle C" to playing real pieces with both hands, reading music, and improvising over chord charts, by running the full *Piano From the Ground Up* curriculum (GUIDE.md) as a daily, adaptive practice session that listens to the piano and grades every note.

The one promise: **you never have to decide what to practice.** You open the app, it tells you the four things to do in the next 30 minutes, it hears you play them, and it moves you forward only when you are clean. Everything else, songs, theory, badges, is in service of that loop.

What makes it different from the apps it borrows from:

- It teaches the *why* (formulas, patterns, intervals) before the *where* (finger positions), which is the gap that left Erle memorizing one intro for months.
- Mastery gates, not time gates. A unit unlocks when the drill is clean at tempo three sessions in a row, not when a video ends.
- Spaced repetition on skills, not only on songs. A scale you nailed in week 3 comes back in week 6 at a faster tempo.
- Honest input. The app hears the piano through the device's microphone with nothing to buy; a USB cable is an optional upgrade that makes timing exact.
- Single user, offline first, no account, no subscription. Erle's own data stays on Erle's devices.

Scope of v1: the complete curriculum (20 sections), the drill engine, a song engine with a starter library of public-domain pieces, progress tracking, and spaced review. One user. No cloud, no social features, no content marketplace.

## Hardware and input

**Nothing to buy.** The app listens through the microphone of whatever device is in front of the piano. The Yamaha P-145 has built-in speakers, so a laptop or phone within arm's reach hears every note at a clean, consistent volume, which is the easy case for pitch detection. A 30-second calibration on first run (play C4, then a C major chord) sets the sensitivity.

**Optional upgrade, later or never.** The P-145 also has a **USB TO HOST** port (square USB-B socket on the rear panel). One USB-B to USB-C cable turns on MIDI input: exact note, velocity and timing with no guesswork. The app detects a cable automatically and switches; nothing else changes. Worth it if the mic ever feels unfair on fast two-hand passages, which is around month 3 at the earliest.

Which device gets which input:

| Device | Browser | Input | What it grades well | Where it is weaker |
| --- | --- | --- | --- | --- |
| iPhone or iPad | Safari | Microphone | Single notes, scales, melodies, rhythm, slow chord changes, all theory and reading drills | Fast passages with both hands; notes played very softly; a noisy room |
| Android phone | Chrome | Microphone (MIDI over USB-C if a cable is ever added) | Same as iPhone | Same |
| Windows laptop | Chrome or Edge | Microphone (MIDI over USB if a cable is ever added) | Same; a laptop mic a metre away is slightly better than a phone on the stand | Same |

**How mic grading works, honestly.** For one note at a time (most of the first three months) a modern pitch detector on a piano is accurate well above 95% and fast enough to grade timing to within about 50 ms. For chords the app listens for the expected notes' frequencies and their overtones and checks that all of them are present and nothing else loud is; this reliably tells C major from C minor from F major, but it can be fooled by a wrong note that shares overtones with a right one. So the rule is: single-note drills, rhythm drills and chord *identity* drills gate mastery from the mic alone; the two drills that need millisecond-exact polyphonic timing (hands-together tempo ladders above 100 BPM and the sight-reading score above level 8) are capped at "approximate" from the mic and show a one-line note that a cable would make them exact. Nothing is locked; the score is simply labelled.

Practical setup: phone or laptop on the music stand, speakers on, room reasonably quiet, metronome through earbuds or at low volume so the mic hears mostly piano. The on-screen keyboard is always there too, for theory drills away from the piano.

Latency note: the mic path adds roughly 40 to 80 ms (audio buffer plus detection window). The grader subtracts the measured calibration offset so a note played exactly on the click is scored as on the click, not late.

## Feature audit: what to take from each app

Nine apps dominate the market. Each is excellent at one or two things and weak at the rest; the table lists the feature worth copying and the reason the app itself is not the answer.

| App | Best feature to take | Why we copy it | What to skip |
| --- | --- | --- | --- |
| Simply Piano | **Wait mode**: playback pauses until you play the right note, then continues | Removes time pressure while learning notes; the single most useful beginner mechanic | Song-first with almost no theory |
| Flowkey | **Split view**: video of hands above, sheet music below, synced; loop any bar range; hands separate toggle | Looping a 2-bar chunk slowly is exactly the practice method in the guide | Subscription, no real curriculum gating |
| Yousician | **Real-time note highlighting on a scrolling staff + instant per-note feedback (early/late/wrong)** and a daily challenge loop | Timing feedback drives improvement; the daily loop drives consistency | Gamified XP that rewards time spent, not mastery |
| Skoove | **Listen, then play** lesson shape: hear the phrase, see it, play it, get feedback | Matches how ears and fingers learn together | Thin on technique and theory |
| Pianote | **Structured method path with human-teacher video** and a strong theory track | The path is close to Alfred's; proof that a method-book sequence works in-app | Video-heavy; we use diagrams, not video |
| Playground Sessions | **Bootcamp drills** that isolate one skill, with scored tempo ladders, and a progress graph per skill | Tempo ladders are the mastery gate we want | Desktop-only, closed |
| Piano Marvel | **SASR sight-reading test** (graded pieces that increase in difficulty until you fail) and 1,500+ method exercises | A measurable sight-reading score is the best progress metric there is | Dated UI |
| Synthesia | **Falling-note "piano roll" view** with on-screen keyboard; any MIDI file playable; per-hand practice | Visual learners read falling notes before they read a staff; MIDI file import gives unlimited content | No teaching at all |
| Tenuto / musictheory.net | **Drill-style theory exercises**: note, interval, chord, key-signature identification with configurable ranges | Pure, fast, no fluff; this is our theory engine | Not connected to the instrument |

The combination nobody ships: falling notes **and** real notation side by side (Synthesia + Flowkey), with wait mode (Simply Piano), timing feedback (Yousician), tempo-ladder mastery gates (Playground Sessions), a sight-reading score (Piano Marvel), a theory drill engine (Tenuto), and a method-book spine (Pianote) under one adaptive daily session. That is Keybench.

Two things every one of them gets wrong that we fix: they reward minutes and streaks instead of clean repetitions at tempo, and they teach songs as finger positions instead of as chord progressions plus melody.

## The curriculum engine

The curriculum is data, not code. Every unit, lesson and drill is a JSON file; the engine reads them, tracks mastery per skill, and assembles each day's session. Adding a unit means adding a file.

**Hierarchy**

- **Track** (4): Technique, Harmony, Reading, Repertoire. These are the four blocks of the daily session.
- **Unit** (about 30 in v1): one concept with a diagram page, e.g. "Half steps and whole steps", "The three LH chords", "Alberti bass". Maps roughly one-to-one onto a section or subsection of the guide.
- **Lesson**: a short read (the guide's text and diagrams, chunked to one screen) followed by one or more drills.
- **Drill**: the thing that is graded. A drill has a type (see Drill types), parameters, and a mastery rule.
- **Skill**: the atom that mastery is tracked on, e.g. `scale.C.major.rh`, `chord.triad.build.major`, `read.treble.lines`, `rhythm.dotted-quarter`. A drill exercises one or more skills; a unit is complete when all its skills are mastered.

**Mastery rule (the gate)**

A skill is *mastered* when a drill on it scores at or above its threshold on three separate days. Default thresholds:

| Drill family | Pass threshold |
| --- | --- |
| Identification (name a key, a note, an interval) | 95% correct, median response under 1.5 s |
| Build (play this chord, this scale) | 100% correct notes, timing not graded |
| Tempo ladder (scale, chord changes, pattern at BPM) | 3 clean runs in a row at target BPM, each note within ±80 ms of the click |
| Rhythm (tap or play a pattern against the click) | 90% of onsets within ±60 ms |
| Sight-read (play through once, no stopping) | 85% notes correct, pulse never drops, no restart |
| Piece chunk (hands separate then together) | 3 clean runs at target BPM |

A mastered skill decays. If it is not exercised for 14 days its state drops from Mastered to Review and it reappears in the session.

**Prerequisites**

Each unit lists the skills it needs. The engine never offers a unit whose prerequisites are below Mastered. Main dependency graph (left to right; colour = track):

```
Keyboard geography (H) ──► C major scale (T) ──┬──► Triads, diatonic chords (H) ──► Inversions, progressions (H)
        │                                      │              │
        ▼                                      └──► Positions and LH chords (T) ──► Accompaniment patterns (T)
Half and whole steps (H) ──► Intervals (H) ──┘                                              │
                                                                                            ▼
Rhythm and counting (R) ──► Reading the staff (R) ─────────────────────────────► Pieces, hands together (Rep)
                                                                                            │
                                                                                            ▼
                                                                                  New keys, 7th chords (T/H)
H = Harmony, T = Technique, R = Reading, Rep = Repertoire
```

Three tracks run in parallel from day one; Repertoire opens only once reading and an accompaniment pattern are both mastered, which is why the guide holds pieces back to week 4.

**Mapping the guide to units** (section numbers from GUIDE.md):

| Guide section | Units | Track |
| --- | --- | --- |
| 1 Posture, finger numbers | Finger numbers quiz | Technique |
| 2 Keyboard geography | Find any key; octave numbers; black-key names | Harmony |
| 3 Half and whole steps | Step counting | Harmony |
| 4 Rhythm, rests, time signatures | Note values; rests; ties and dots; 3/4 and 2/4; road signs | Reading |
| 5 C major scale | C scale RH; LH; together; tempo ladder 60 to 100 | Technique |
| 6 Intervals | Interval build; interval ear | Harmony |
| 7 Chords | Triad formula; 7 diatonic chords; C F G Am | Harmony |
| 8 Hand positions, LH chords | C and G position; LH C, F, G7 voicings | Technique |
| 9 Inversions, voice leading | Inversions; closest-inversion changes | Harmony |
| 10 Progressions | I V vi IV and the other three, in C | Harmony |
| 11 Accompaniment patterns | Blocked, broken, waltz, Alberti | Technique |
| 12 Reading | Treble, bass, landmarks, steps and skips, Ode to Joy, Amazing Grace, sight-reading routine | Reading |
| 13 Expression, pedal | Dynamics and articulation recognition; pedal timing drill | Reading |
| 14 Other keys | G, F, D major; A minor; 7th chords | Technique, Harmony |
| 15 Hands together | Chunking workflow applied to a piece | Repertoire |
| 16, 17 Practice system, 12-week plan | Built into the session engine and the default pacing | all |

## Drill types

Twelve drill types cover the whole curriculum. Each is one React component plus one grader function; the curriculum JSON only chooses a type and fills in parameters. Build them in the order listed; the first six cover weeks 1 to 6 of the plan. "Played note" below means a NoteEvent from any source (mic by default, MIDI if present, on-screen tap for theory drills).

| # | Drill type | Prompt shown | Input | What is graded | Example parameters |
| --- | --- | --- | --- | --- | --- |
| 1 | **Key finder** | A note name ("A♭") or a highlighted key | Played note, or tap on-screen keyboard | Correct key within 3 s; response time logged per note | range C3 to C5, include black keys |
| 2 | **Staff flashcard** | One note on treble or bass staff | Played note or tap | Correct pitch and octave; response time; wrong answers weighted for re-ask | clef, ledger-line range, accidentals on/off |
| 3 | **Interval / chord builder** | "Play a major 3rd above E", "Play D minor, 1st inversion" | Played notes (any order, held together) | Exact pitch-class set, correct bass note when inversion is specified | quality, root set, inversion |
| 4 | **Identify** | Play two or three notes (audio), or show a chord on the staff; ask its name | Multiple choice | Correct answer; response time | ear mode vs eye mode |
| 5 | **Rhythm tap** | A notated rhythm over a metronome | Any key or tap | Onset within ±60 ms of the grid; rests respected; count-in of one bar | time signature, note values allowed, BPM |
| 6 | **Tempo ladder** | Scale, arpeggio, chord sequence or pattern shown on keyboard + staff, metronome running | Played notes, one per subdivision | Pitch sequence exact; each onset within ±80 ms; 3 clean runs advances BPM by 8; one miss drops it by 10 | start BPM, target BPM, hands (R/L/both), fingering shown or hidden |
| 7 | **Chord changes** | A progression ("C G Am F"), one chord per bar | Played notes | Right notes on beat 1 of each bar; closest-inversion bonus when voice leading is the lesson | key, progression, voicing rule, bars per chord |
| 8 | **Wait mode** | Falling notes + staff; playback halts until the correct note(s) sound | Played notes | Correct notes only; no timing grade; counts as "learned" not "performed" | piece or chunk, hand |
| 9 | **Play-along** | Same view, playback runs at tempo | Played notes | Per-note: correct / early / late / missed; summary accuracy and timing | BPM percent of target, loop range |
| 10 | **Sight-read** | A never-seen 4 to 8 bar excerpt at a given level; 10 s to scan; then one pass with metronome, no stopping | Played notes | Notes correct, no pulse break; level rises on 85% and falls on 60%; the running level is the sight-reading score | level 1 to 20 |
| 11 | **Pedal timing** | LH chords, pedal change required on each bar | Played notes + sustain detection (MIDI CC64 when available; from the mic, detect the ring-out of the previous chord) | Pedal up-down within 100 ms after the new chord's onset, never before | progression |
| 12 | **Listen and copy** | App plays a 2-bar phrase; user plays it back | Played notes | Pitch sequence match; rhythm within tolerance | key, range, length |

Grading primitives shared by all drills:

- **Note matching**: compare MIDI note numbers; allow enharmonic equivalence always; octave matters only when the drill says so.
- **Timing**: quantize onsets to the metronome grid; report signed error in ms; thresholds are per drill type and tighten as level rises.
- **Clean run**: zero wrong notes, zero missed notes, no onset outside tolerance, no restart.
- **Mic input (default)**: monophonic pitch detection (McLeod via pitchy) on a 2048-sample window in an AudioWorklet, with onset detection for timing; chords are checked by energy at each expected note's fundamental and first two overtones against the calibrated noise floor; results carry a confidence value the grader uses to decide exact vs approximate.

Every drill ends with the same result card: score, what was wrong (with the keyboard diagram highlighting the misses), the BPM or level reached, and the next step (retry, slow down, or move on). A "that was right" button lets the user override one mic misread without changing the stored score.

## Arcade: games that are drills in disguise

Five short games, each built on an existing drill type and grader, each played on the real piano (never by tapping the screen). They live in an Arcade tab and are offered as the optional last five minutes of a session in place of free play. A game's result updates the same skill states as the drill it wraps, so playing games is never wasted practice. Scores are per game, local, with a personal best; no leaderboards.

| Game | Built on | How it plays | Skill it feeds |
| --- | --- | --- | --- |
| **Tiles** | Play-along (9) | Falling tiles on the on-screen keyboard, Piano Tiles style; hit them on the real keys as they land. Speed rises every 8 bars; three misses ends the run. Generated from the current unit's scale, chord or piece | tempo ladders, piece chunks |
| **Note Rush** | Staff flashcard (2) | Notes appear on the staff one at a time; play each before it scrolls off the left edge. Timer tightens as the streak grows | reading |
| **Chord Catch** | Chord builder (3) | A chord name floats down; play it (any inversion unless specified) before it lands. Combo meter for closest-inversion changes | triads, inversions |
| **Beat Keeper** | Rhythm tap (5) | A rhythm pattern loops; play any key on the pattern. Score is how long you stay within tolerance; the pattern mutates every 4 bars | rhythm |
| **Echo** | Listen and copy (12) | The app plays a phrase; play it back. Phrase grows one note longer each round, Simon style, until a miss | ear, intervals |

Build order: Tiles in Phase 4 (it is the play-along view with a scoring skin), the other four in Phase 5. Each game is under 150 lines on top of its drill; if any game takes more than two days it is cut.

## The daily session

The home screen is one button: **Start today's session**. Behind it the planner builds a 30 to 40 minute session from four blocks, in the fixed order the guide prescribes, and fills each block from three queues: review (skills due), current (the unit in progress on that track), and new (the next unlocked unit, offered only when current is mastered).

| Block | Time | Filled from |
| --- | --- | --- |
| Technique | 5 min | Scale or pattern tempo ladder: review item first, then current |
| Harmony | 10 min | One builder or identify drill (review), then the current chord-changes drill |
| Reading | 10 min | 3 min staff flashcards weighted to slowest notes, 2 min rhythm tap, one sight-read excerpt at current level |
| Repertoire | 10 to 15 min | Current piece: the next unmastered chunk, hands separate then together; or, before Repertoire unlocks, a second Harmony drill |

Last five minutes: "play something you like" (a free-play timer with no grading) or one Arcade game, the user's choice, so the session ends well.

**Spaced repetition on skills.** Each skill carries an interval and a due date, SM-2 style with three outcomes instead of five: *clean* (interval × 2.2), *rough* (interval unchanged), *failed* (interval resets to 1 day). First mastery sets the interval to 3 days. A skill due for review takes priority in its block over new material. Review items come back one notch harder than they were mastered at: a scale at +8 BPM, flashcards with one more ledger line, a progression in a new key once that key is unlocked.

**Pacing.** The plan targets the guide's 12 weeks but never forces it. If the user fails a gate three days running, the planner inserts the prerequisite drill for that skill at an easier parameter (slower BPM, smaller range) and says why in one line. If the user clears gates fast, new units arrive sooner; nothing is locked by calendar.

**Streaks and motivation, done honestly.**

- The streak counts *sessions completed*, not minutes; a 15-minute short session (two blocks) still counts.
- The progress screen shows four things only: sight-reading level, scales mastered at target BPM, chords playable on demand, pieces completed. Each is a real capability, not XP.
- Weekly: a 60-second "record yourself" prompt on the current piece, stored locally, with the week-1 recording always one tap away for comparison. Hearing the difference is the motivator that lasts.
- No badges for logging in, no lives, no energy, no leaderboards.

**Session log.** Every drill attempt is stored: timestamp, drill id, parameters, score, per-note errors, BPM, input source. This is the data the planner reads and the data a future coach view (or Claude, via export) can analyze.

## The song engine

A piece is a MusicXML file (or MIDI with a hand split) plus a metadata file: level, key, time signature, target BPM, chunk boundaries, and the chord progression under it. The engine renders one piece in three synchronized views and runs the practice workflow from section 15 of the guide on it.

**Views** (toggle, or stack two on a laptop):

- **Falling notes**: Synthesia-style piano roll descending onto an on-screen keyboard that mirrors the P-145's 88 keys. Right hand orange, left hand teal, matching the guide. The first thing a visual learner can follow.
- **Sheet music**: real notation rendered from the MusicXML (OpenSheetMusicDisplay), cursor moving with playback, played notes coloured green/red as they are hit. This is the view that teaches reading; the planner shifts the default from falling notes to sheet music as the reading level rises.
- **Chord chart**: chord symbols over bar numbers with the LH voicing diagram for each, for songs learned as progression plus melody.

**Practice workflow on a piece** (the engine enforces the order):

1. Listen: full playback at target tempo with the cursor.
2. Chunk: the piece is pre-divided into 2 to 4 bar chunks; the user works one chunk at a time.
3. RH alone, wait mode, then play-along from 50% tempo up a ladder.
4. LH alone, same.
5. Hands together, wait mode, then ladder.
6. Join chunks with a one-bar overlap; ladder the joined section.
7. Full run at target tempo; 3 clean runs completes the piece and triggers the weekly recording prompt.

**Controls**: loop any bar range, hands R/L/both, tempo 40 to 120% in steps of 5, metronome on/off, count-in, pedal marks shown, fingering shown/hidden, transpose (for chord-chart songs only).

**Starter library** (public domain, from IMSLP, encoded as MusicXML). Phase 4 ships eight: Ode to Joy; Amazing Grace; Bach Minuet in G (BWV Anh. 114); Bach Minuet in G minor (Anh. 115); Burgmüller Op. 100 Nos. 1 and 2; Clementi Sonatina Op. 36 No. 1 first movement; Satie Gymnopédie No. 1. Phase 5 adds: Burgmüller Op. 100 No. 5; Czerny Op. 599 Nos. 1 to 20 as sight-reading material; Beethoven Für Elise (first section); Pachelbel Canon in D (simplified); twelve traditional tunes in C, G and F (folk songs, hymns, carols) tagged with their progressions for the chord-chart view.

**Import**: any MIDI file dropped onto the app is split into hands by a pitch-and-overlap heuristic (editable) and becomes a falling-notes piece immediately, a sheet-music piece after quantization. This gives unlimited content without any licensing question, since the user supplies the file.

**Generated material**: sight-reading excerpts (drill 10) and listen-and-copy phrases (drill 12) are generated, not stored: a small rule-based generator picks a key, a position, allowed intervals and rhythm values for the level and produces a fresh 4 to 8 bars every time. This is what makes the sight-reading score meaningful, since the user never sees the same excerpt twice.

## Tech stack and architecture

A single-page PWA, no backend. Everything runs in the browser, data lives in IndexedDB, and the app installs to the home screen on phone and laptop. Chosen for a solo project that Claude Code will build: boring, well-documented, one language.

```
 Input layer                                   Drills (12 types)
 ┌──────────────────────┐                      ┌───────────────────────────────┐
 │ Mic pitch detection  │──┐                   │  View.tsx   +   grade.ts      │
 │ (default)            │  │   ┌───────────┐   │  theory/  pure fns, tested    │
 │ Web MIDI (optional,  │──┼──►│ NoteEvent │──►│  audio/   metronome, sampler  │
 │ auto-detected)       │  │   │ stream    │   └──────────────┬────────────────┘
 │ On-screen keyboard   │──┘   └───────────┘                  │ drill results
 └──────────────────────┘                                     ▼
 ┌─────────────────┐  ┌─────────────────┐   ┌──────────────────────────────────┐
 │ Curriculum JSON │─►│ Song library    │──►│ Planner: mastery gates, spaced   │
 │ units, skills   │  │ MusicXML, MIDI  │   │ review, today's session          │
 └────────┬────────┘  └────────┬────────┘   └────────────────┬─────────────────┘
          ▼                    ▼                             ▼
 ┌────────────────────────────────────────────────────────────────────────────┐
 │ IndexedDB (Dexie): skill states, drill attempts, recordings, settings      │
 │ offline-first, exports to JSON, no server                                  │
 └────────────────────────────────────────────────────────────────────────────┘
```

The only place input hardware is mentioned is the input layer; swapping mic for MIDI changes nothing downstream.

| Layer | Choice | Why |
| --- | --- | --- |
| Language | TypeScript | Catches the kind of bug a non-developer cannot debug |
| Framework | React 18 + Vite | Largest ecosystem, fast dev server |
| Styling | Tailwind CSS + the guide's palette as tokens | Fast to iterate, consistent with the ebook's look |
| State | Zustand | Small; one store per concern (session, input, settings) |
| Routing | React Router | Standard |
| Storage | Dexie (IndexedDB) | Structured, indexed, survives reloads, exports to JSON |
| Pitch detection | `pitchy` (McLeod) in an AudioWorklet | Default input; runs off the main thread |
| MIDI input | Web MIDI API via `webmidi` npm package | Optional; handles device hot-plug, note on/off, velocity, CC64 pedal |
| Audio | Web Audio API + Tone.js | Metronome with sample-accurate scheduling, playback of target lines with a small piano sample set |
| Notation | OpenSheetMusicDisplay (renders MusicXML, exposes cursor) | Most complete MusicXML renderer in JS; VexFlow underneath for generated excerpts |
| Falling notes | Custom Canvas renderer | Simple, 60 fps, full control |
| Keyboard diagrams | Port of the guide's SVG renderer (GUIDE.md appendix) | Already written and visually matches the book |
| PWA | `vite-plugin-pwa` (Workbox) | Offline cache of app and starter library |
| Tests | Vitest for graders and planner; Playwright for two smoke flows | The graders are where correctness matters |
| Hosting | GitHub Pages or Cloudflare Pages, static | Free, HTTPS (required for the mic and Web MIDI) |

**Module layout**

```
src/
  input/        mic.ts, midi.ts, onScreenKeyboard.tsx  -> emits NoteEvent {note, velocity, t, source}
  audio/        clock.ts (metronome, transport), sampler.ts
  theory/       notes.ts, intervals.ts, chords.ts, scales.ts, keys.ts  (pure functions, fully tested)
  notation/     osmd.tsx, vexflow-excerpt.tsx, generator.ts
  drills/       one folder per drill type: View.tsx + grade.ts + params schema
  curriculum/   units/*.json, skills.ts, prerequisites.ts
  planner/      session.ts (builds today's session), srs.ts (spacing), mastery.ts
  songs/        library/*.musicxml + *.meta.json, importer.ts (MIDI -> hands)
  store/        db.ts (Dexie schema), stores (zustand)
  ui/           screens: Home, Session, Drill, Song, Progress, Library, Settings
```

**Key interfaces** (the contracts to write first):

- `NoteEvent { note: number; velocity: number; t: number; on: boolean; source: 'mic' | 'midi' | 'screen'; confidence: number }`
- `Drill { id; type; params; skills: SkillId[]; grade(events: NoteEvent[], clock: ClockRef): DrillResult }`
- `DrillResult { score: 0..1; clean: boolean; approximate: boolean; errors: NoteError[]; bpm?: number; level?: number }`
- `SkillState { id; status: 'locked' | 'learning' | 'mastered' | 'review'; interval: days; due: date; cleanDays: date[]; bestBpm?: number }`
- `SessionPlan { blocks: { track; drills: DrillRef[]; minutes }[] }`

The input layer normalises mic, MIDI and on-screen taps into the same `NoteEvent` stream so every drill and grader is written once.

## Data model

Static content ships with the app as JSON and MusicXML; user state lives in five IndexedDB tables. Everything exports to one JSON file from Settings so a laptop and a phone can be kept in sync by hand until a sync feature exists.

**Static content (in the repo)**

| File | Shape |
| --- | --- |
| `curriculum/units/<id>.json` | `{ id, title, track, guideSection, lesson: { blocks: [text or diagram or audio] }, drills: DrillRef[], skills: SkillId[], requires: SkillId[] }` |
| `curriculum/skills.json` | `{ id, label, family: 'identify' or 'build' or 'tempo' or 'rhythm' or 'sightread' or 'piece', threshold overrides }` |
| `songs/library/<id>.musicxml` + `<id>.meta.json` | `{ id, title, composer, level 1..10, key, time, targetBpm, chunks: [{ bars: [a, b] }], chords: [{ bar, symbol, voicing }], hands: 'both' or 'rh' or 'lh', source: 'IMSLP url' }` |
| `drills/<type>/schema.ts` | Zod schema for that drill's params; the curriculum files are validated against it at build time |

**User state (IndexedDB, Dexie)**

| Table | Key | Fields |
| --- | --- | --- |
| `skills` | skillId | status, interval, due, cleanDays[], bestBpm, bestLevel, lastSeen |
| `attempts` | auto | ts, drillId, unitId, params, score, clean, approximate, bpm, level, errors[] (note, expected, got, dtMs), durationS, inputSource |
| `pieces` | pieceId | chunkStates[] (rh/lh/both: bpm reached, clean runs), completedAt, recordings[] |
| `sessions` | date | planned blocks, completed blocks, minutes, notes |
| `settings` | 'app' | input preference, mic calibration, metronome sound, theme, daily minutes, name |

**Derived, never stored**: sight-reading level (max level with a pass in the last 10 sight-read attempts), streak (consecutive dates in `sessions` with at least two blocks completed), and the progress screen's four counters. Deriving them keeps the stored data honest and avoids drift.

**Export / import**: Settings has one button that writes all five tables to `keybench-export-YYYY-MM-DD.json` and one that merges such a file back in (newest attempt wins; skill states take the higher mastery). Recordings are stored as WebM blobs and included in the export.

## Build roadmap

Six phases, each ending in something Erle can practice with that day. Order is chosen so the app is useful from Phase 1 and so the hardest, riskiest piece (grading played notes against a clock, from the mic) is proven before anything is built on top of it. Durations are estimates; a phase is done when its gate passes, not when its weeks are up.

```
wk 0    1    2    3    4    5    6    7    8    9    10   11   12   13   14   15   16
|P0 |  P1   |     P2 Core drills     |P3 Sess|   P4 Song engine   |  P5 Full curriculum |P6 Polish|
         ◆ mic graded                   ◆ MVP: daily session,              ◆ all 20 sections
           against the click              sections 1-10 usable               as units
```

| Phase | Delivers | Gate (definition of done) |
| --- | --- | --- |
| 0 Foundation | Repo, Vite + React + TS, Tailwind tokens from the guide, Dexie schema, PWA shell, the theory module with tests, the keyboard diagram renderer ported from GUIDE.md | `npm test` green; app installs on phone and laptop; a page shows a C major chord diagram |
| 1 Input and clock | Mic pitch detection with calibration, automatic Web MIDI when a cable is present, on-screen keyboard, metronome with count-in, NoteEvent stream, a debug view showing live notes with timing offsets | Notes played on the P-145 appear from the mic within 100 ms and are the right pitch 95% of the time across C2 to C6; metronome does not drift over 5 minutes; a scale played against the click shows per-note ms error |
| 2 Core drills | Drill types 1 to 7 (key finder, flashcard, builder, identify, rhythm tap, tempo ladder, chord changes); result card; mastery and SRS logic; units for guide sections 1 to 10 | Erle completes week-1 to week-6 content end to end; a skill reaches Mastered after 3 clean days and reappears on its due date |
| 3 Daily session | Planner, Home screen, four-block session, free-play ending, progress screen with the four counters, streak, 2-minute onboarding (calibrate mic, play middle C, set daily minutes) | Open the app, press Start, get a 30-minute session that matches section 16 of the guide, finish it, see it logged |
| 4 Song engine | MusicXML rendering with cursor, falling notes, wait mode, play-along, chunk workflow, loop, hands, tempo; the eight Phase 4 pieces; units for sections 11, 12, 13, 15; Arcade with the Tiles game | Minuet in G learnable start to finish with the workflow; chunk states persist; weekly recording works |
| 5 Full curriculum | Drill types 8 to 12 complete (sight-read generator, pedal, listen-and-copy), remaining units (section 14, other keys, 7ths), full starter library, MIDI import, polyphonic chord recognition tuned on real recordings, export/import, the other four Arcade games | All 20 guide sections present as units; sight-reading level climbs over a week of use; iPhone runs the full session offline |
| 6 Polish and beyond | Settings, accessibility pass, performance on low-end phones; then optional: Capacitor iOS wrapper with CoreMIDI, cloud sync, a second user | Decided after Erle has used v1 for a month |

Phases 0 to 3 are the MVP. If the project stalls after Phase 3 it is still a complete, daily-usable trainer for the first half of the curriculum.

## Risks

| Risk | Likelihood | Mitigation |
| --- | --- | --- |
| Metronome and input timestamps drift apart, so timing grades are wrong | Medium | Phase 1 gate exists for exactly this. Use `performance.now()` for both; schedule clicks with Tone.js lookahead; subtract the calibrated mic latency; compare against a recorded reference before any drill is built |
| Mic grading misreads a chord or a fast passage and feels unfair | High | Phase 1 gate measures mic accuracy on the real P-145 before any drill is built; single-note and rhythm drills gate mastery, fast polyphonic drills are labelled approximate; a "that was right" button lets Erle override one misread without changing the score |
| OpenSheetMusicDisplay cursor and playback sync is fiddly | Medium | Prototype in Phase 4 week 1 with one piece before encoding the library; VexFlow-only fallback for generated excerpts |
| Building the app replaces practising the piano | High | Daily session from Phase 3 onward is the test bed: Erle's own practice is the QA. Rule: no coding session without a practice session that day |
| Curriculum JSON becomes a second codebase nobody wants to edit | Medium | Zod schemas plus a `npm run validate` step; keep units small and copy the guide's text verbatim |
| Scope grows toward a multi-user product before v1 is used | Medium | Phase 6 is explicitly deferred until after a month of real use |

## Decisions made

| Decision | Choice | Why |
| --- | --- | --- |
| Name | **Keybench** | Short, describes a practice bench for keys |
| Input | Mic by default on every device; MIDI switches on automatically if a cable is ever connected | Nothing to buy; the cable is a later, optional upgrade |
| Starter library at Phase 4 | 8 pieces (listed under The song engine) | Covers levels 1 to 6 of the plan; the rest arrives in Phase 5 |
| Playback sound | Salamander Grand subset, one sample per 3 semitones, about 4 MB | Sounds like a piano; a synth tone teaches the ear the wrong thing |
| Metronome sound | Woodblock sample, accent on beat 1 | Cuts through piano sound better than a click |
| Session length | 30 minutes default, adjustable 15 to 60 in Settings | Matches the guide |
| Ear-training drills | In Phase 2 | Cheap once the sampler exists, and ear + eye together is how chords stick |
| First screen after install | A 2-minute onboarding: calibrate the mic, play middle C, set daily minutes, start | Proves the input works before anything else |

**Not in v1, on purpose**: accounts, cloud sync, sharing, teacher view, video lessons, licensed pop songs, social features, payments. Each is a product decision for after the first month of daily use.
