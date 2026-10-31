# Piano From the Ground Up

*Self-taught piano, visual edition. Every keyboard and staff diagram below is rendered by the JavaScript at the end of this file (`keyboard()`, `staff()`, `grandStaff()`); the app should port that renderer so lessons look identical to the book. A `[FIGURE id]` marker shows where each diagram sits and which render call produces it.*

Everything you skipped, in the order that makes each piece easier than the last. Every idea has a picture of the keys.

## 0 · Why you got stuck

You learned a song the way you'd memorize a phone number: a list of finger positions with no meaning behind them. That works for one intro and collapses on the second song, because nothing transfers.

People who learn fast see the keyboard in **patterns**. A C major chord isn't "these three keys" — it's "a root, skip a key, skip a key," and that same shape works on every white key. A melody isn't 40 positions — it's "start on G, walk up the scale, jump a third." Once you own about six patterns (the 12-note layout, scales, intervals, triads, inversions, and the staff), a new song is *recognizing* things you already know instead of memorizing new ones.

This guide builds those patterns one at a time. Don't skip ahead; each section assumes the one before it is in your hands, not only in your head.

## 1 · Posture & finger numbers

*Phase 0 · day one*

Bench centered on **middle C** (the C nearest the middle of the keyboard, usually under the brand name). Sit on the front half of the bench, far enough back that your elbows are slightly in front of your body. Forearms level with the keys or a touch above. Shoulders down. Fingers curved as if holding a tennis ball; you play with the pads, not the flat fingertips.

[FIGURE hands]
*Seen from above, palms down on the keys. Thumbs are **1**, pinkies are **5**, on both hands — so the thumbs point at each other.*

Every exercise, chord chart and method book uses these numbers. Thumb is always 1, pinky is always 5, on both hands. Say them out loud during the first week until "3" instantly means a specific finger without thinking.

> **Habit to build now.** Keep the wrist level and loose. A collapsed wrist or a flat "typing" hand is the #1 self-taught injury and speed limiter. Check it every time you sit down.

## 2 · Keyboard geography

*Phase 1 · weeks 1–2*

The whole keyboard is **one 12-key pattern repeated**: 7 white keys and 5 black keys, then it starts over. The black keys come in a group of two and a group of three. That grouping is your map.

[FIGURE kb-octave]
*One octave, the 12-key pattern. Seven white keys, five black keys in a **two** group and a **three** group. This exact picture repeats across the whole piano.*

Two rules find every note:

- **C** is the white key immediately *left* of the group of **two** black keys.
- **F** is the white key immediately *left* of the group of **three** black keys.

From C, the white keys go C D E F G A B and then C again. That distance from one C to the next is an **octave**; the two notes sound like the "same" note, higher or lower. Octaves are numbered: middle C is `C4`, the C above it is `C5`, below is `C3`.

[FIGURE kb-two-oct]
*Two octaves. Every C is left of a two-group. **C4 is middle C.** The octave number changes at each C, not at each A.*

### Black keys have two names

A black key is named relative to its neighbors. The key right of C is **C♯** (C sharp, "C raised"). That same key is also **D♭** (D flat, "D lowered"). Both names are correct; which one you use depends on the key of the music. For now, learn both.

[FIGURE kb-black]
*Each black key has a sharp name (from the key to its left) and a flat name (from the key to its right). Same key, two labels.*

### Drill (5 min/day, week 1)

1. Close your eyes, put a finger on any key, open your eyes and name it. Use the 2-group / 3-group rule. Repeat 20 times.
2. Say a random note ("A!") and touch every A on the keyboard as fast as you can. Then the next note.
3. Find C4, then C3, C5, C2, C6. You should never have to count keys — you jump by the shape of the black groups.

Done when naming any key takes under one second. Nothing after this works if this is slow.

## 3 · Half steps & whole steps

All of music theory measures distance in **half steps**. A half step is the very next key, black or white, with nothing between. A **whole step** is two half steps.

[FIGURE kb-steps]
*H = half step (adjacent key), W = whole step (two half steps). **E–F and B–C are half steps** with no black key between them; the other white-key neighbors are whole steps.*

The tricky part: between E and F, and between B and C, there is no black key. Those are already half steps. Everywhere else, two adjacent white keys are a whole step (the black key in between is the half step).

Say it at the keyboard: "C to D — whole step, there's a black key between. E to F — half step, nothing between." Every scale and chord formula in this guide is built from counting these.

## 4 · Rhythm, rests & time signatures

Rhythm is independent of the keys, so learn it away from the piano first. Music is divided into **beats** (a steady pulse, what you tap your foot to) grouped into **measures** (bars). The most common grouping is **4/4**: four beats per measure, and a quarter note gets one beat.

[FIGURE notevals]
*Each row fills exactly one measure of 4/4. Two halves = one whole; two quarters = one half; two eighths = one quarter. Hollow heads are long notes; a flag on the stem halves the value.*

Counting aloud is the fastest way to internalize this. In 4/4 you count "1 2 3 4" evenly. Eighth notes split each beat in half; count them "1 and 2 and 3 and 4 and." The grid below shows one measure: the row of boxes is the pulse, filled boxes are where you play.

```
Quarter notes — one per beat. Count: 1 · 2 · 3 · 4
[X] [ ] [ ] [ ] [X] [ ] [ ] [ ] [X] [ ] [ ] [ ] [X] [ ] [ ] [ ]
Eighth notes — two per beat. Count: 1 and 2 and 3 and 4 and
[X] [ ] [X] [ ] [X] [ ] [X] [ ] [X] [ ] [X] [ ] [X] [ ] [X] [ ]
Half notes — held for two beats each. Count: 1 (2) 3 (4)
[X] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [X] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
A typical mix — quarter, two eighths, half. Count: 1 · 2 and 3 (4)
[X] [ ] [ ] [ ] [X] [ ] [X] [ ] [X] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
```

*Each small box is a sixteenth of the measure. Filled = strike a key. "–" = keep holding.*

### Metronome

A metronome clicks the beat at a fixed tempo measured in BPM (beats per minute). Any free phone app works, or search "metronome" in Google. Start everything at **60 BPM**. Clap the four patterns above with the click until you never drift. Then, and only then, play them on a single key.

> **Rule for life.** If you can't clap it, you can't play it. Rhythm problems are almost never finger problems; fix them away from the keys.

### Rests — silence has a length too

Every note value has a matching **rest**: a symbol that means "don't play, for exactly this long." Rests are counted with the same numbers; you keep the pulse going in your head and lift your hand. Beginners rush through rests — treat them as notes you play with silence.

[FIGURE rests]
*Each note value and its rest, same length. The **whole rest** hangs *below* the fourth line (a hole in the ground); the **half rest** sits *on top of* the middle line (a hat). The quarter rest is the zigzag; the eighth rest has one flag like the eighth note.*

### Ties and dots — making notes longer

A **tie** is a curved line joining two notes of the *same pitch*: play the first and hold it for the combined length; don't strike the second. A **dot** after a note adds half its value: a dotted half is 2 + 1 = 3 beats; a dotted quarter is 1 + ½ = 1½ beats.

[FIGURE tiesdots]
*Bar 1: two half notes **tied** — one sound lasting four beats; strike once, hold through. Bar 2: a **dotted half** (2 + 1 = 3 beats) then a quarter rest. Bar 3: a **dotted quarter** (1½ beats) followed by an eighth on the "and," then a half note. The thick double line at the end means the piece is over.*

### Time signatures beyond 4/4

The top number says how many beats per measure; the bottom says which note gets one beat (4 = quarter note). **3/4** is waltz time — three beats, count "1 2 3," with a natural emphasis on 1. **2/4** is march time, "1 2." You'll meet both in the first pages of any method book.

```
3/4 — three quarter notes per measure. Count: **1** 2 3 | **1** 2 3
[X] [ ] [X] [ ] [X] [ ] [X] [ ] [X] [ ] [X] [ ]
3/4 — dotted half note fills the whole measure. Count: 1 (2) (3)
[X] [ ] [ ] [ ] [ ] [ ] [X] [ ] [ ] [ ] [ ] [ ]
2/4 — two quarter notes per measure, or one half note. Count: **1** 2 | **1** (2)
[X] [ ] [ ] [X] [ ] [ ] [X] [ ] [ ] [ ] [ ] [ ]
```

*Two measures per row. The first beat of each measure is naturally a little heavier — that's what makes a waltz sound like a waltz.*

### Pickups, repeats and road signs

- **Pickup (upbeat)**: A short incomplete measure before the first full one — the song starts on beat 3 or 4 instead of 1. The missing beats are usually made up in the last measure. "Amazing Grace" and "Happy Birthday" both start with a pickup.
- **Repeat sign 𝄆 𝄇**: Two dots beside a double bar line: go back to the matching sign (or the beginning) and play the section again.
- **1st / 2nd ending**: Brackets numbered 1 and 2 over the last bars of a repeated section: play the 1st ending the first time, skip it and play the 2nd ending on the repeat.
- **D.C. al Fine**: "Da capo al fine" — go back to the start and play until the word *Fine*.
- **Fermata 𝄐**: Hold this note longer than written; the pulse pauses.
- **8va**: Play these notes one octave higher (or lower, if written below) than printed.

## 5 · The C major scale

*Phase 1 · weeks 1–2*

A **scale** is the set of notes a piece is built from, played in order. The **major scale** is a fixed recipe of whole (W) and half (H) steps starting on any note:

W · W · H · W · W · W · H

Start on C and follow it, and you land on every white key: C D E F G A B C. That's why C major is first — no black keys, so you can focus on your hands.

[FIGURE kb-cmaj-steps]
*C major scale. Numbers in the circles are **scale degrees** (1st note, 2nd note…), not fingers. The step pattern W W H W W W H lands exactly on the white keys.*

### Fingering

You have 5 fingers and 8 notes, so somewhere the thumb has to **tuck under** (going up) or a finger has to **cross over** (coming down). Where that happens is fixed and must be memorized — it's the same in dozens of other scales.

[FIGURE kb-cmaj-rh]
***Right hand, going up.** 1 2 3 · 1 2 3 4 5. After E (finger 3), the thumb passes under to F.*

[FIGURE kb-cmaj-lh]
***Left hand, going up.** 5 4 3 2 1 · 3 2 1. After G (thumb), finger 3 crosses over to A.*

Right hand up: 1 2 3 then thumb tucks under to 1 2 3 4 5. Coming down, reverse: 5 4 3 2 1, then finger 3 crosses over the thumb, 3 2 1.

Left hand up: 5 4 3 2 1 then finger 3 crosses over to 3 2 1. Coming down: 1 2 3, thumb tucks under, 1 2 3 4 5.

### How to practice it

1. **Right hand alone**, one octave up and down, 60 BPM, one note per click. Say the finger numbers out loud. 5 repetitions, perfectly.
2. **Left hand alone**, same.
3. **Hands together**, starting on C4 (right) and C3 (left). Both thumbs and both crossing points land on different notes — that's normal and is exactly the coordination you need.
4. Once 5 perfect runs in a row at 60 BPM: move to 72, then 84, then 100. Never speed up a scale you're still fumbling.

> **Watch for.** The thumb tuck should be silent and smooth. If your hand "jumps" at the tuck, slow down and let the thumb move under while finger 3 is still holding its key.

## 6 · Intervals

An **interval** is the distance between two notes. Musicians name it by counting letter names (inclusive) and refine it by counting half steps. Intervals are how you'll read music by shape instead of letter-by-letter, and how chords are built.

| Name | Half steps | From C | Sounds like |
| --- | --- | --- | --- |
| Minor 2nd (half step) | 1 | C → C♯/D♭ | Jaws theme |
| Major 2nd (whole step) | 2 | C → D | "Happy Birthday," first two notes |
| Minor 3rd | 3 | C → E♭ | "Greensleeves" opening |
| **Major 3rd** | 4 | C → E | "Oh When the Saints" |
| Perfect 4th | 5 | C → F | "Here Comes the Bride" |
| **Perfect 5th** | 7 | C → G | Star Wars main theme |
| Major 6th | 9 | C → A | NBC chimes |
| Major 7th | 11 | C → B | "Take On Me" chorus leap |
| Octave | 12 | C → C | "Somewhere Over the Rainbow" |

[FIGURE kb-intervals]
*The chord-building intervals from C. On white keys a 3rd skips one key and a 5th skips three.*

The two you need immediately are the **3rd** and the **5th**, because a chord is just a root plus a 3rd plus a 5th. Notice a 3rd on white keys is "skip one key" and a 5th is "skip three keys." Play C–E, then D–F, then E–G, up the keyboard: every pair is a 3rd, but some are major (4 half steps) and some minor (3 half steps). That difference is the whole secret of major vs minor chords.

## 7 · Chords

*Phase 2 · weeks 3–6*

A **chord** is three or more notes played together. The basic one is the **triad**: a root, the note a 3rd above it, and the note a 5th above it. On white keys: *play a key, skip a key, play, skip, play.*

### Major vs minor — the formula

Don't memorize chord shapes. Memorize **two numbers** and build every chord yourself:

- **Major**: **4** half steps up to the 3rd, then **3** more to the 5th. Sounds bright, resolved.
- **Minor**: **3** half steps up to the 3rd, then **4** more to the 5th. Sounds darker, sadder.
- **Diminished**: **3** then **3**. Tense. Rare as a home chord; you'll meet it as B diminished in C.

[FIGURE kb-c]
*Root, then **4** half steps, then **3**. Circles show right-hand fingers.*

[FIGURE kb-cm]
*Same root and 5th. Only the middle note drops one half step: **3** then **4**.*

Do this now: build a major triad on every white key using the 4+3 count. You'll discover some need a black key (D major needs F♯, E major needs G♯, A major needs C♯). That's correct — the formula is the truth, the white keys are a coincidence.

### The seven chords that live in C major

Build a triad on each note of the C scale using only scale notes (play–skip–play–skip–play on white keys). You get seven chords. This is the family every song in C major is made from. Roman numerals name them by position; uppercase is major, lowercase is minor.

| Degree | Chord | Notes | Quality | Role |
| --- | --- | --- | --- | --- |
| I | **C** | C E G | major | Home. Songs start and end here. |
| ii | Dm | D F A | minor | Leads toward V. |
| iii | Em | E G B | minor | Color; less common. |
| IV | **F** | F A C | major | "Away from home." Very common. |
| V | **G** | G B D | major | Tension that pulls back to I. |
| vi | **Am** | A C E | minor | The sad cousin of C. Very common. |
| vii° | Bdim | B D F | diminished | Rare; skip for now. |

The four in bold — **C, F, G, Am** (I, IV, V, vi) — are in the majority of pop songs ever written. Learn those four cold before anything else.

### How to practice chords

1. Right hand, root position, fingers 1–3–5. Play C, hold 4 beats, F, hold 4, G, hold 4, Am, hold 4. 60 BPM. Look at your hand: the shape barely changes, it just slides.
2. Left hand: play only the **root note** with finger 5 (C3, F3, G3, A3). Then the root as an octave (5 and 1). Left hand roots + right hand triads is a complete accompaniment for hundreds of songs.
3. Hands together, one chord per measure, counting "1 2 3 4" aloud.
4. Then change the rhythm: left hand root on beat 1, right hand triad on beats 1, 2, 3, 4. Then triad on 2 and 4 only. You're now "playing piano."

## 8 · Hand positions & left-hand chords

*Phase 2 · weeks 3–6*

Method books teach early pieces from fixed **hand positions**: five fingers resting on five neighboring keys, so you read and play without looking down. Two positions cover almost every beginner piece.

[FIGURE kb-cpos]
***C position.** Both thumbs sit on a C an octave apart (C3 left, C4 right); each hand covers C D E F G. Most first pieces never leave this.*

[FIGURE kb-gpos]
***G position.** Same shape moved up to G: each hand covers G A B C D. Same finger numbers, different notes — this is why you learn positions rather than "finger 3 = E."*

In a position, finger number and note are locked together — in C position, "finger 3" *is* E in the right hand and A in the left. That's why method books print finger numbers so heavily at first: they're teaching your hand to feel the position. When a piece needs a note outside the five, it either **extends** (stretch finger 5 or 1 one key further) or **shifts** the whole hand to a new position, usually marked with a finger number.

### The three left-hand chords that play a thousand songs

Alfred's, Faber and every other method start with the same three left-hand chords in C position, voiced so the hand never moves: the **I chord** (C), the **IV chord** (F) with C kept on the bottom, and the **V7 chord** (G7) squeezed into three notes with B on the bottom. Your pinky stays on or next to C the whole time.

[FIGURE kb-lh-c]
*C E G — fingers 5 3 1. Root position.*

[FIGURE kb-lh-f]
*C F A — fingers 5 2 1. F chord in 2nd inversion so the pinky stays on C.*

[FIGURE kb-lh-g7]
*B F G — fingers 5 2 1. A three-note G7 (the D is left out); pinky slides down one key to B.*

Practice: C – F – C – G7 – C, one chord per measure, left hand alone, 60 BPM, eyes closed after the first week. Then play the C-position right-hand melody of "Ode to Joy" (section 12) over it: bars 1–2 want C, the D in bar 2 wants G7, bar 3 goes C – G7, bar 4 G7 – C. That's your first complete two-hand piece with harmony.

## 9 · Inversions & smooth hands

Here's why other people's hands barely move while yours leap around. A chord's notes can be stacked in any order. C E G is C major; so is E G C and G C E. Same three notes, same chord, different **inversion**.

[FIGURE kb-inv0]
*C on the bottom. Fingers 1 3 5.*

[FIGURE kb-inv1]
*E on the bottom, C moved up an octave. Fingers 1 2 5.*

[FIGURE kb-inv2]
*G on the bottom. Fingers 1 3 5.*

Practice each chord through its three inversions, up and down: C–E–G, E–G–C, G–C–E, then back. Right-hand fingering: root position 1 3 5, first inversion 1 2 5, second inversion 1 3 5.

### Choosing the closest inversion

When you move from one chord to the next, pick the inversion of the new chord whose notes are *closest* to where your hand already is. Compare the two ways to play C → F → G → C:

[FIGURE kb-voicelead-bad]
*C (C E G) → F (F A C) → G (G B D). The hand jumps three or four keys at every change. Here orange marks the C and G chords and teal marks the F chord, all on one keyboard for comparison.*

[FIGURE kb-voicelead-good]
*C (C E G) → F as **C F A** (2nd inversion — the C stays put) → G as **B D G** (1st inversion — the G stays put) → back to C. No finger moves more than two keys.*

In the second version, every finger moves at most two keys and one note is often shared. This is called **voice leading**, and it's the single most visible difference between a beginner and someone who "just knows" piano. Work out the smooth version for every progression you learn; write the inversions down until it's automatic.

## 10 · Progressions & real songs

A **progression** is a repeating sequence of chords. Learn these four in C and you can play along with an enormous amount of music:

| Numerals | In C | Heard in |
| --- | --- | --- |
| I – V – vi – IV | C – G – Am – F | "Let It Be," "No Woman No Cry," "With or Without You," countless others |
| I – vi – IV – V | C – Am – F – G | "Stand By Me," 1950s doo-wop, "Every Breath You Take" |
| vi – IV – I – V | Am – F – C – G | "Zombie," "Africa," "Save Tonight" |
| ii – V – I | Dm – G – C | The backbone of jazz standards |

[FIGURE kb-prog]
*C – G – Am – F, the way it sits under the hands. **Left**: pinky on each root (C3, G3, A3, F3). **Right**: the triads stay inside B3–A4 by choosing the closest inversion each time — C E G, then B D G, then C E A, then C F A.*

### Playing an actual song this week

1. Search "*song name* chords" — sites like Ultimate Guitar show the chord names above the lyrics for free. Ignore the guitar diagrams.
2. If the song isn't in C, either use the site's transpose button to shift it to C, or play it as written once you've learned other keys (section 14).
3. Left hand: root note. Right hand: triad, closest inversion. Change on the chord changes, one strike per beat.
4. Sing or hum the melody over it. That's how most singer-pianists actually play.

Tell me the intro you already know and I'll show you the chords underneath it — you'll likely find it's one of the progressions above with the notes spread out.

## 11 · Accompaniment patterns

A chord can be played all at once (**blocked**) or one note at a time (**broken**). How the left hand breaks the chord up is most of what makes a piece sound like a waltz, a ballad, or a classical sonatina. These four patterns, all on a C chord in the left hand, cover the majority of beginner and intermediate music. Once you can do each on C, do it on F and G7 without stopping.

[FIGURE pat-blocked]
*All three notes together. Bar 1: one strike held four beats. Bar 2: restruck every two beats. The simplest accompaniment — hymns, ballads, slow pop.*

[FIGURE pat-broken]
*One note at a time, bottom to top, fingers 5 3 2 1. Reaching C4 with the thumb is the stretch to practice. Ballads, film music, "Let It Be"–style playing.*

[FIGURE pat-waltz]
*"Oom-pah-pah": root alone on beat 1 (pinky), the two upper notes together on beats 2 and 3 (fingers 3 and 1). Every waltz, most 3/4 folk songs.*

[FIGURE pat-alberti]
*Low – high – middle – high in steady eighth notes, fingers 5 1 3 1. The engine under Mozart and Clementi sonatinas; keep it quiet and even, the melody sits on top.*

Practice each one hands-alone until it runs on autopilot, then put a slow right-hand melody or single held notes over it. The moment the left hand can keep a pattern going while your attention is on the right hand, you've crossed the biggest coordination hurdle in piano.

## 12 · Reading music

*Phase 3 · weeks 5–10, alongside chords*

Sheet music is a graph: **up the page is higher pitch, left to right is time.** Notes sit on a **staff** of five lines. A **clef** at the left tells you which notes the lines are. Piano uses two staves at once — treble (right hand, usually) on top and bass (left hand) below — joined by a brace. That pair is the **grand staff**, and middle C sits in the gap between them.

[FIGURE grand]
*The grand staff. **Middle C** appears twice — on a ledger line below the treble staff and on a ledger line above the bass staff. Same key. Pitch rises as notes go up the page; the two staves are one continuous ladder with middle C in the gap.*

### Treble clef

Bottom line to top line: **E G B D F** ("Every Good Boy Does Fine"). Spaces bottom to top: **F A C E**. Middle C hangs just below the staff on a short extra line called a **ledger line**.

[FIGURE treble]
*Treble clef. Lines E G B D F, spaces F A C E. Each line-to-space or space-to-line move is one letter. Middle C hangs below on its ledger line.*

### Bass clef

Lines bottom to top: **G B D F A** ("Good Boys Do Fine Always"). Spaces: **A C E G** ("All Cows Eat Grass"). Middle C sits on a ledger line just *above* this staff.

[FIGURE bass]
*Bass clef. Lines G B D F A, spaces A C E G. Middle C sits on a ledger line **above** this staff — the mirror of where it sits under the treble.*

### Read by landmarks and intervals, not letter names

Mnemonics are training wheels. What fluent readers actually do: memorize a few **landmark notes** cold, then read everything else as a distance from the nearest landmark. Next-door note = a step (line to space, or space to line). Skip one = a third (line to line, or space to space).

[FIGURE landmarks]
***Landmark notes** to memorize cold: the treble clef curls around G4; the bass clef's two dots straddle F3; middle C sits between the staves; C5 and C3 sit in the third space of each staff. Everything else is "one step above…" or "a third below…" a landmark.*

[FIGURE stepskip]
*Reading by shape. A **step** moves line→space or space→line (next-door key). A **skip** moves line→line or space→space (a 3rd: skip one key). Two skips stacked is a 5th. Your hand already knows these distances from the keyboard.*

So when you see a note two lines above treble G, you don't recite "G, A, B, C, D." You see "landmark G, up a 5th" and your hand already knows what a 5th feels like from section 6. The keyboard and the page use the same distances — that's the connection that makes reading fast.

### Accidentals and key signatures

A **♯** or **♭** in front of a note raises or lowers it a half step for the rest of that measure. A **♮** (natural) cancels it. Sharps or flats printed at the very start of each line are the **key signature**: they apply to every note of that letter for the whole piece. One sharp (F♯) means G major; one flat (B♭) means F major. No sharps or flats means C major — which is why you're starting there.

### Your first melody

Beethoven's "Ode to Joy," right hand, C major, 4/4. It uses only five notes (C D E F G), fingers 1–5 with the thumb on C, and never moves your hand. Count aloud. The dotted note in bar 4 lasts a beat and a half.

[FIGURE ode]
*"Ode to Joy," first phrase. Orange numbers above the staff are **fingers**; the row under the letters is the **count**. The hand sits with thumb on C4 and never moves. In bar 4 the dotted quarter lasts 1½ beats, the eighth falls on the "and" of beat 2, and the half note holds beats 3–4.*

### Your second melody — 3/4 time, a pickup, and a hand shift

"Amazing Grace," right hand, C major. It starts on a **pickup** (a lone beat 3 before the first bar), lives in 3/4, and uses dotted half notes and eighth-note pairs. It also asks your hand to open wider than a five-key position: thumb on G4, finger 3 on C5, finger 5 reaching E5. In bar 7, finger 5 jumps up to G5 — your first hand shift. Count "1 2 3" aloud, heavy on 1.

[FIGURE grace]
*"Amazing Grace," first half. The lone G before the first bar line is the **pickup** — count "3" and land on the C on beat 1. Every bar has three beats. The last G5 is a dotted half: hold it for the whole bar, and notice finger 5 has to jump from D5 to G5 — do that shift slowly and deliberately.*

### Sight-reading routine (10 min/day)

1. Pick music *easier* than what you can play. Reading practice is about the eyes, not the fingers.
2. Before playing: check the time signature, key signature, find the first note of each hand, and scan for the highest and lowest notes.
3. Set the metronome slow. Play through **once, without stopping**. Mistakes are allowed; stopping is not. Keep the pulse.
4. Move to the next piece. Do not polish. Sight reading is volume.

Free graded reading material: IMSLP has Bach's *Notebook for Anna Magdalena*, Czerny Op. 599, and Burgmüller Op. 100 — all public domain, all sequenced from very easy upward. Musictheory.net's note-identification exercise is a free flashcard drill for the staff.

## 13 · Expression & the pedal

*Phase 3 · from week 5, in every piece*

Notes and rhythm are only half of what's printed on a page. The other half — how loud, how connected, how fast, when to pedal — is what makes playing sound like music instead of a typing test. Method books introduce these in the first ten pages; start applying them to "Ode to Joy" now.

[FIGURE expr]
*Everything on a page besides pitch and rhythm. **Andante** = walking tempo. **<i>p</i>** = soft, with a **crescendo hairpin** growing into **<i>f</i>** = loud. The curve over bar 1 is a **slur**: play legato, connected. The dots on bar 2 are **staccato**: short and detached; the wedge on the first G is an **accent**. The teal brackets underneath are **pedal** marks: press at the start, lift at the end, re-press for the next bracket.*

### Dynamics — how loud

- ***pp***: pianissimo — very soft
- ***p***: piano — soft (yes, the instrument is named after this word: "pianoforte," soft-loud)
- ***mp***: mezzo piano — medium soft
- ***mf***: mezzo forte — medium loud. The default if nothing is marked.
- ***f***: forte — loud
- ***ff***: fortissimo — very loud
- **< / >**: crescendo (gradually louder) and decrescendo or diminuendo (gradually softer), drawn as long hairpins under the notes.

Loudness on a piano comes from key *speed*, not pressure. Pressing harder after the key is down does nothing. To play louder, drop the finger faster; to play softer, slower and closer to the key.

### Articulation — how notes connect

- **Legato**: Smooth and connected: the next key goes down at the exact moment the previous one comes up, no gap and no overlap. Shown by a **slur** — a curved line over a group of *different* notes (a tie joins two of the same note; a slur covers several different ones).
- **Staccato**: Short and detached: a dot above or below the note head. Release quickly — roughly half the written length — but keep the pulse the same.
- **Accent >**: Play this note noticeably louder than its neighbors.
- **Phrase**: A long slur over a whole musical "sentence." Shape it like speech: a little louder toward the middle, softer at the end, a tiny breath before the next one.

### Tempo — how fast

- **Largo / Adagio**: very slow / slow, roughly 40–70 BPM
- **Andante**: walking pace, ~75–100 BPM
- **Moderato**: moderate, ~100–115 BPM
- **Allegro**: fast and lively, ~120–160 BPM
- **rit. / ritardando**: gradually slow down (usually at an ending)
- **a tempo**: back to the original speed

### The damper pedal

The right-hand pedal lifts every damper off the strings so notes keep ringing after you release the keys. It's marked `Ped.` with a bracket, or ⌐‾‾‾‾¬ under the bass staff. Two rules that keep it from turning into mud:

1. **Change it when the chord changes.** Lift and re-press the pedal exactly as you play the first note of the new chord — up-down in one quick motion (called syncopated or legato pedaling). Holding one pedal across two chords blurs them together.
2. **Heel on the floor, ball of the foot on the pedal.** Never stomp; the pedal should move silently. Press it about two-thirds of the way — it doesn't need to go to the floor.

Practice with the C – F – G7 – C left-hand chords from section 8: one chord per measure, change pedal on every beat 1. Listen for the previous chord disappearing cleanly. Don't use the pedal on scales or Hanon — it hides your finger legato and you need to hear that honestly.

## 14 · Other keys

*Phase 4 · months 3–6*

Same W-W-H-W-W-W-H recipe, new starting note. Add one key every two weeks, in this order — each adds only one accidental:

[FIGURE kb-gmaj]
*Same W W H W W W H recipe from G. The seventh note must be F♯ to keep the pattern. Right-hand fingering identical to C.*

[FIGURE kb-fmaj]
*The fourth note becomes B♭. Right hand uses 1 2 3 4 · 1 2 3 4 so the thumb never lands on the black key.*

[FIGURE kb-dmaj]
*Each new key in this order adds exactly one sharp. Fingering still 1 2 3 · 1 2 3 4 5.*

The right-hand fingering for C, G, D, A and E major is identical (1 2 3 1 2 3 4 5). F major changes because the thumb should avoid black keys: right hand is 1 2 3 4 1 2 3 4. Left hand for F is the standard 5 4 3 2 1 3 2 1.

For each new key, build its seven diatonic triads the same way you did in C (play–skip–play on scale notes), then run the I–V–vi–IV progression in that key. G major: G – D – Em – C. F major: F – C – Dm – B♭. D major: D – A – Bm – G.

### Relative minor

Every major key has a minor key that uses the exact same notes, starting from its 6th degree. C major's relative minor is **A minor** (A B C D E F G A). Same white keys, different home. When a song "sounds sad but has no sharps or flats," it's in A minor.

### Seventh chords

Add one more 3rd on top of a triad and you get a **seventh chord** — the richer sound in jazz, soul, and gospel. Start with these three in C:

[FIGURE kb-cmaj7]
*Major triad + major 7th. Dreamy, "finished" sound.*

[FIGURE kb-g7]
*Major triad + minor 7th. The F wants to fall to E and the B wants to rise to C — it pulls hard toward C major.*

[FIGURE kb-am7]
*Minor triad + minor 7th. Soft, soulful.*

**G7** is the most important: it's the V chord with extra pull toward C. Play Dm – G7 – C (ii – V7 – I) and you've played the most common cadence in Western music.

## 15 · Hands together

The coordination problem is real but solvable with a fixed procedure. Never try to learn a piece hands-together from the start.

1. **Chunk it.** Cut the piece into 2–4 bar pieces. Pencil in the bar numbers.
2. **Right hand alone**, one chunk, slow, until 3 clean runs in a row. Say the counts aloud.
3. **Left hand alone**, same chunk, same standard.
4. **Together, half speed.** Slow enough that it's boring. Focus on which notes land *at the same time* — that's the only new information.
5. 3 clean runs in a row → raise the metronome by 8–10 BPM. Stumble → drop it back 10 and do 3 more.
6. Next chunk. Then join two chunks, overlapping by one bar so the seam gets practiced.

> **Why slow is faster.** Every fast, sloppy repetition teaches your hands the sloppy version. Ten slow perfect reps beat fifty fast approximate ones — you're programming muscle memory, and it records exactly what you do.

## 16 · Practice system

30–40 minutes a day, six days a week. Daily beats long. Structure every session the same way so you never sit down wondering what to do:

| Block | Time | What | Standard |
| --- | --- | --- | --- |
| Technique | 5 min | Scale of the week, hands separate then together, with metronome. Later add Hanon No. 1–5. | Even tone, silent thumb tucks, no wrist collapse. |
| Chords | 10 min | Progression of the week through all inversions; closest-inversion version hands together. | No hesitation between chords at 60 BPM. |
| Reading | 10 min | New, easy material. Once through, no stopping, next piece. | Pulse never breaks. |
| Repertoire | 10–15 min | Current piece or song, chunked, hands separate → together. | 3 clean runs before any speed increase. |

Rules that aren't optional: slow before fast, hands separate before together, small chunks before whole pieces, stop before you're tired or frustrated. Play something you already know and enjoy for the last two minutes so you leave the bench happy.

Keep a one-line log: date, scale + BPM, progression, piece + bar reached. Progress in piano is invisible day to day and obvious month to month; the log is how you'll see it.

## 17 · The 12-week plan

| Week | Technique | Chords | Reading | Play |
| --- | --- | --- | --- | --- |
| 1 | Key naming drill; posture; finger numbers | — | Clap note values, metronome 60 | C scale RH alone |
| 2 | C scale RH and LH, then together, 60 BPM | — | Treble lines & spaces; landmark C4, G4 | C scale together 72 BPM |
| 3 | C scale 84 BPM; C position both hands | Triad formula; LH C – F – G7 voicings | Bass lines & spaces; landmark F3; rests | "Ode to Joy" RH over LH C/F/G7 |
| 4 | C scale 100 BPM; G position | All 7 diatonic chords in C; C F G Am in RH | Steps vs skips; ties, dots, 3/4 | "Amazing Grace"; first chord-chart song |
| 5 | A minor scale (same notes as C) | C inversions; F, G, Am inversions | First sight-reading pieces (Czerny 599 No. 1–5); dynamics *p* / *f* | Same song, closest inversions; add pedal on chord changes |
| 6 | Hanon No. 1, slow; blocked → broken chords | Closest-inversion voice leading for all 4 progressions | Daily sight reading begins; slurs & staccato | Second song with waltz bass or Alberti bass in LH |
| 7 | G major scale | Diatonic chords in G; I–V–vi–IV in G | Key signatures; ledger lines | A song in G |
| 8 | G scale together 84 BPM; Hanon 2 | Dm–G7–C cadence; G7 inversions | Bach Minuet in G (Anna Magdalena), RH | Minuet in G, chunked |
| 9 | F major scale (new RH fingering) | Diatonic chords in F | Minuet LH; eighth-note reading | Minuet hands together, slow |
| 10 | F scale together; Hanon 3 | Cmaj7, Am7, Dm7; ii–V7–I | Burgmüller Op. 100 No. 1 | Minuet at tempo; song in F |
| 11 | D major scale | Diatonic chords in D | Reading in G and F | Satie Gymnopédie No. 1, first page |
| 12 | All four scales, 100 BPM together | Any progression in C, G, F, D on demand | New piece daily | Record yourself playing everything. Compare to week 1. |

If a week's target isn't clean, repeat the week. The plan is a sequence, not a deadline.

## 18 · Free resources

- **imslp.org**: Public-domain sheet music. Search Czerny Op. 599, Burgmüller Op. 100, Bach BWV Anh. 114 (Minuet in G), Clementi Op. 36, Satie Gymnopédies, Hanon *The Virtuoso Pianist*.
- **musictheory.net**: Free lessons and drills: note identification, interval identification, chord identification. Use the exercises daily.
- **MuseScore**: Free notation software. Type in any melody and it plays it back and shows the notes on the staff — a self-checking reading tool.
- **Ultimate Guitar / Chordify**: Chord charts for nearly any song. Use the transpose feature to move songs into C, G or F while you learn.
- **Public library**: Faber *Adult Piano Adventures* and Alfred's *Adult All-in-One* are the standard method books; both are sequenced almost exactly like this guide.
- **Phone**: Any free metronome app; your voice recorder to hear yourself honestly once a week.

## 19 · Glossary

- **Accidental**: A ♯, ♭ or ♮ written next to a note, changing it for that measure.
- **Alberti bass**: Left-hand pattern low–high–middle–high (C G E G) in eighth notes; the classical-era engine.
- **Articulation**: How notes connect or separate: legato, staccato, accents.
- **Bar / measure**: One group of beats, marked off by vertical lines on the staff.
- **Blocked / broken**: A chord played all at once / one note at a time.
- **Damper pedal**: The right pedal; lets notes ring after the keys are released. Change it when the chord changes.
- **Dynamics**: Loudness markings: *pp p mp mf f ff*, crescendo, decrescendo.
- **Hand position**: Five fingers resting on five neighboring keys (C position, G position); the home base for early pieces.
- **BPM**: Beats per minute; the tempo.
- **Cadence**: A chord sequence that feels like an ending, especially V → I.
- **Diatonic**: Using only the notes of the current key.
- **Half step**: The smallest distance between two keys; adjacent keys.
- **Interval**: The distance between two notes.
- **Inversion**: A chord with a note other than the root on the bottom.
- **Key**: The scale a piece is built on, and its "home" chord.
- **Key signature**: Sharps or flats at the start of each line telling you the key.
- **Ledger line**: A short extra line for notes above or below the staff.
- **Octave**: The distance from one letter name to the same letter name higher or lower; 12 half steps.
- **Pickup**: An incomplete measure before the first full one; the piece starts mid-count.
- **Progression**: A sequence of chords.
- **Rest**: A symbol for measured silence, one per note value.
- **Root**: The note a chord is named for and built from.
- **Scale**: The notes of a key played in order.
- **Slur**: A curve over several different notes: play them legato.
- **Tie**: A curve joining two notes of the same pitch: hold, don't restrike.
- **Time signature**: Top number: beats per measure. Bottom: which note gets one beat.
- **Triad**: A three-note chord: root, 3rd, 5th.
- **Voice leading**: Moving between chords so each finger travels as little as possible.
- **Whole step**: Two half steps.


## Appendix: diagram renderer

The app must port this. Each `keyboard(id, opts)` / `staff(id, opts)` / `grandStaff(id, opts)` call at the bottom is one figure; the `id` matches the `[FIGURE id]` markers above. Colours are CSS variables: `--rh` right hand #C4841A, `--lh` left hand #1E8C82, `--root` #B23A48, keys and staff per the CSS.

```css
:root{
  --bg:#F3F5F8; --surface:#FFFFFF; --ink:#1B2130; --muted:#5D6677; --rule:#D7DCE4; --soft:#E9EDF2;
  --rh:#C4841A; --rh-ink:#FFFFFF; --lh:#1E8C82; --lh-ink:#FFFFFF; --root:#B23A48;
  --wkey:#FFFFFF; --wkey-line:#8E96A5; --bkey:#262B36; --bkey-text:#E8ECF2;
  --staff:#1B2130; --note:#1B2130; --tip:#FBF3E3; --tip-edge:#C4841A;
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --bg:#141924; --surface:#1B2230; --ink:#E8ECF2; --muted:#9AA4B5; --rule:#2D3543; --soft:#232B3A;
    --rh:#E4A83A; --rh-ink:#1B1100; --lh:#3FBFB2; --lh-ink:#00211E; --root:#E26B78;
    --wkey:#EEF1F5; --wkey-line:#6B7382; --bkey:#0B0E14; --bkey-text:#C9D0DB;
    --staff:#E8ECF2; --note:#E8ECF2; --tip:#2A2418; --tip-edge:#E4A83A;
  }
}
:root[data-theme="dark"]{
  --bg:#141924; --surface:#1B2230; --ink:#E8ECF2; --muted:#9AA4B5; --rule:#2D3543; --soft:#232B3A;
  --rh:#E4A83A; --rh-ink:#1B1100; --lh:#3FBFB2; --lh-ink:#00211E; --root:#E26B78;
  --wkey:#EEF1F5; --wkey-line:#6B7382; --bkey:#0B0E14; --bkey-text:#C9D0DB;
  --staff:#E8ECF2; --note:#E8ECF2; --tip:#2A2418; --tip-edge:#E4A83A;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font-family:"Source Sans 3",system-ui,"Segoe UI",sans-serif;font-size:17px;line-height:1.6}
.wrap{display:grid;grid-template-columns:230px minmax(0,760px);gap:56px;max-width:1100px;margin:0 auto;padding:40px 24px 96px}
main{min-width:0}
@media (max-width:900px){.wrap{grid-template-columns:minmax(0,1fr);gap:24px;padding:24px 16px 80px}nav.toc{position:static;border-right:0;padding:0 0 12px;border-bottom:1px solid var(--rule)}nav.toc ol{flex-direction:row;flex-wrap:wrap;gap:6px 16px}}
nav.toc{position:sticky;top:24px;align-self:start;font-size:14px;line-height:1.45;border-right:1px solid var(--rule);padding-right:20px}
nav.toc .eyebrow{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:0 0 10px}
nav.toc ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
nav.toc a{color:var(--ink);text-decoration:none;display:flex;gap:8px}
nav.toc a:hover{color:var(--rh)}
nav.toc a .n{font-family:"JetBrains Mono",monospace;color:var(--muted);font-size:12px;min-width:2ch;padding-top:2px}
h1,h2,h3{font-family:"Young Serif",Georgia,serif;font-weight:400;line-height:1.15;text-wrap:balance;margin:0}
h1{font-size:44px;letter-spacing:-.01em}
h2{font-size:30px;margin-top:72px;padding-top:28px;border-top:1px solid var(--rule)}
h3{font-size:21px;margin-top:36px}
.lede{font-size:20px;color:var(--muted);margin:14px 0 0;max-width:60ch}
p{margin:14px 0;max-width:68ch}
ul,ol{max-width:68ch}
li{margin:6px 0}
strong{font-weight:700}
.phase{font-family:"JetBrains Mono",monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--rh);margin:0 0 6px;display:block}
h2 + .phase{margin-top:10px}
.fig{background:var(--surface);border:1px solid var(--rule);border-radius:6px;padding:16px 16px 12px;margin:22px 0;overflow-x:auto}
.fig svg{display:block;max-width:100%;height:auto}
.fig .cap{font-size:14px;color:var(--muted);margin:10px 0 0;line-height:1.45;max-width:none}
.fig .cap b{color:var(--ink);font-weight:600}
.row{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px}
.row .fig{margin:0}
.row-wrap{margin:22px 0}
.mono{font-family:"JetBrains Mono",monospace;font-size:.92em}
.legend{display:flex;gap:18px;flex-wrap:wrap;font-size:14px;color:var(--muted);margin:16px 0 0}
.legend span{display:inline-flex;align-items:center;gap:6px}
.legend i{width:14px;height:14px;border-radius:50%;display:inline-block}
.tip{background:var(--tip);border-left:3px solid var(--tip-edge);padding:12px 16px;margin:20px 0;border-radius:0 6px 6px 0;max-width:68ch}
.tip p{margin:0}
.tip .t{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--rh);display:block;margin-bottom:4px}
table{border-collapse:collapse;width:100%;font-size:15px;font-variant-numeric:tabular-nums}
th,td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--rule);vertical-align:top}
th{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:500}
.tblwrap{overflow-x:auto;margin:18px 0}
.rh{color:var(--rh);font-weight:700}.lh{color:var(--lh);font-weight:700}
.steps{counter-reset:s;list-style:none;padding:0;margin:14px 0}
.steps li{counter-increment:s;display:grid;grid-template-columns:34px 1fr;gap:10px;margin:10px 0}
.steps li::before{content:counter(s);font-family:"JetBrains Mono",monospace;font-size:13px;color:var(--rh);border:1px solid var(--rule);border-radius:50%;width:28px;height:28px;display:grid;place-items:center;margin-top:2px}
.kv{display:grid;grid-template-columns:max-content 1fr;gap:6px 18px;font-size:15px;margin:12px 0}
.kv dt{font-family:"JetBrains Mono",monospace;font-size:13px;color:var(--muted);padding-top:2px}
.kv dd{margin:0}
.rhythm{display:grid;grid-template-columns:repeat(16,1fr);gap:4px;margin-top:4px}
.rhythm .cell{background:var(--soft);border-radius:3px;height:38px;display:grid;place-items:center;font-family:"JetBrains Mono",monospace;font-size:12px;color:var(--muted)}
.rhythm .cell.on{background:var(--rh);color:var(--rh-ink);font-weight:700}
.rhythm .lab{grid-column:1/-1;font-size:13px;color:var(--muted);margin-top:10px;margin-bottom:-2px}
a{color:var(--lh)}
:focus-visible{outline:2px solid var(--rh);outline-offset:2px}
footer{margin-top:64px;color:var(--muted);font-size:14px;border-top:1px solid var(--rule);padding-top:16px}
```

```javascript
(function(){
const NOTE_IDX={C:0,D:1,E:2,F:3,G:4,A:5,B:6};
const HAS_SHARP={C:1,D:1,F:1,G:1,A:1};
const SHARP_NAMES={C:['C♯','D♭'],D:['D♯','E♭'],F:['F♯','G♭'],G:['G♯','A♭'],A:['A♯','B♭']};
const WHITE=['C','D','E','F','G','A','B'];
const FLAT2SHARP={'Db':'C#','Eb':'D#','Gb':'F#','Ab':'G#','Bb':'A#'};
const MONO='JetBrains Mono,Consolas,monospace', SANS='Source Sans 3,Segoe UI,sans-serif', MUSIC='Segoe UI Symbol,Noto Music,Bravura,serif';
function parse(n){
  const m=n.match(/^([A-G])(#|b)?(\d)$/); let l=m[1],a=m[2]||'',o=+m[3];
  if(a==='b'){const s=FLAT2SHARP[l+'b']; l=s[0]; a='#';}
  return {letter:l,acc:a,oct:o};
}
function whiteIndex(letter,oct){return oct*7+NOTE_IDX[letter];}
function whiteName(wi){return WHITE[wi%7]+Math.floor(wi/7);}

// ---------- Keyboard renderer ----------
function keyboard(id,o){
  const el=typeof id==='string'?document.getElementById(id):id; if(!el) return;
  const W=o.w||44,H=o.h||132,BW=Math.round(W*0.6),BH=Math.round(H*0.62),pad=6;
  const f=parse(o.from),t=parse(o.to);
  const w0=whiteIndex(f.letter,f.oct),w1=whiteIndex(t.letter,t.oct);
  const nW=w1-w0+1;
  const nBr=(o.brackets||[]).length;
  const topPad=nBr*34+(o.groups?26:0)+(o.title?26:0);
  const hasSub=(o.marks||[]).some(m=>m.sub);
  const botPad=(o.steps&&o.steps.length?34:0)+(hasSub?22:0);
  const width=nW*W+pad*2,height=H+topPad+botPad+pad*2;
  let s=`<svg viewBox="0 0 ${width} ${height}" width="${width}" role="img" aria-label="${o.aria||'Piano keyboard diagram'}">`;
  const y0=pad+topPad;
  if(o.title){s+=`<text x="${pad}" y="${pad+16}" font-family="${MONO}" font-size="13" fill="var(--muted)" letter-spacing="1">${o.title}</text>`;}
  const whites=[];
  for(let i=0;i<nW;i++){const wi=w0+i;whites.push({x:pad+i*W,letter:WHITE[wi%7],oct:Math.floor(wi/7),name:whiteName(wi)});}
  whites.forEach(k=>{s+=`<rect x="${k.x}" y="${y0}" width="${W}" height="${H}" fill="var(--wkey)" stroke="var(--wkey-line)" stroke-width="1"/>`;});
  const blacks=[];
  whites.forEach((k,i)=>{ if(HAS_SHARP[k.letter]&&i<nW-1){blacks.push({x:k.x+W-BW/2,name:k.letter+'#'+k.oct,letter:k.letter});} });
  blacks.forEach(b=>{s+=`<rect x="${b.x}" y="${y0}" width="${BW}" height="${BH}" fill="var(--bkey)" rx="2"/>`;});
  if(o.names) whites.forEach(k=>{s+=`<text x="${k.x+W/2}" y="${y0+H-10}" text-anchor="middle" font-family="${MONO}" font-size="${W<34?11:13}" font-weight="500" fill="var(--muted)">${o.octaves?k.name:k.letter}</text>`;});
  if(o.blackNames) blacks.forEach(b=>{const nm=SHARP_NAMES[b.letter];s+=`<text x="${b.x+BW/2}" y="${y0+BH-26}" text-anchor="middle" font-family="${MONO}" font-size="10" fill="var(--bkey-text)">${nm[0]}</text><text x="${b.x+BW/2}" y="${y0+BH-12}" text-anchor="middle" font-family="${MONO}" font-size="10" fill="var(--bkey-text)">${nm[1]}</text>`;});
  if(o.groups){
    blacks.forEach((b,i)=>{
      if(b.letter==='C'&&blacks[i+1]){const b2=blacks[i+1];s+=`<path d="M${b.x} ${y0-8} v-6 H${b2.x+BW} v6" fill="none" stroke="var(--muted)" stroke-width="1.2"/><text x="${(b.x+b2.x+BW)/2}" y="${y0-18}" text-anchor="middle" font-size="12" font-family="${SANS}" fill="var(--muted)">two</text>`;}
      if(b.letter==='F'&&blacks[i+2]){const b3=blacks[i+2];s+=`<path d="M${b.x} ${y0-8} v-6 H${b3.x+BW} v6" fill="none" stroke="var(--muted)" stroke-width="1.2"/><text x="${(b.x+b3.x+BW)/2}" y="${y0-18}" text-anchor="middle" font-size="12" font-family="${SANS}" fill="var(--muted)">three</text>`;}
    });
  }
  function center(n){const p=parse(n);if(p.acc==='#'){const b=blacks.find(b=>b.name===p.letter+'#'+p.oct);return b?{x:b.x+BW/2,y:y0+BH-16}:null;}const k=whites.find(k=>k.name===p.letter+p.oct);return k?{x:k.x+W/2,y:y0+H-34}:null;}
  (o.brackets||[]).forEach((br,bi)=>{
    const a=center(br.a),b=center(br.b);if(!a||!b)return;const yy=y0-10-bi*34-(o.groups?26:0);
    s+=`<path d="M${a.x} ${yy} v-8 H${b.x} v8" fill="none" stroke="var(--rh)" stroke-width="1.5"/><text x="${(a.x+b.x)/2}" y="${yy-13}" text-anchor="middle" font-size="12" font-family="${MONO}" fill="var(--rh)">${br.label}</text>`;
  });
  (o.marks||[]).forEach(m=>{
    const c=center(m.n);if(!c)return;
    const col=m.hand==='L'?'var(--lh)':m.hand==='root'?'var(--root)':'var(--rh)';
    const ink=m.hand==='L'?'var(--lh-ink)':m.hand==='root'?'#fff':'var(--rh-ink)';
    const cy=(m.hand==='L'&&o.dual)?c.y-30:c.y;
    s+=`<circle cx="${c.x}" cy="${cy}" r="12" fill="${col}"/>`;
    if(m.label!==undefined) s+=`<text x="${c.x}" y="${cy+4.5}" text-anchor="middle" font-family="${MONO}" font-size="${String(m.label).length>2?9:12}" font-weight="700" fill="${ink}">${m.label}</text>`;
    if(m.sub) s+=`<text x="${c.x}" y="${y0+H+16}" text-anchor="middle" font-family="${MONO}" font-size="11" fill="var(--muted)">${m.sub}</text>`;
  });
  (o.steps||[]).forEach(st=>{
    const a=center(st.a),b=center(st.b);if(!a||!b)return;const yy=y0+H+8;const col=st.color||'var(--lh)';
    s+=`<path d="M${a.x} ${yy} v6 H${b.x} v-6" fill="none" stroke="${col}" stroke-width="1.5"/><text x="${(a.x+b.x)/2}" y="${yy+20}" text-anchor="middle" font-size="12" font-weight="700" font-family="${MONO}" fill="${col}">${st.label}</text>`;
  });
  s+='</svg>';
  if(o.cap) s+=`<p class="cap">${o.cap}</p>`;
  el.innerHTML=s;
}

// ---------- Staff renderer ----------
const SP=9;
function stepOf(n){const p=parse(n);return p.oct*7+NOTE_IDX[p.letter];}
function drawStaff(s,x,y,w,clef){
  for(let i=0;i<5;i++) s.push(`<line x1="${x}" y1="${y+i*SP*2}" x2="${x+w}" y2="${y+i*SP*2}" stroke="var(--staff)" stroke-width="1"/>`);
  if(clef==='treble') s.push(`<text x="${x+6}" y="${y+SP*2*3+SP+2}" font-size="${SP*2*3.55}" font-family="${MUSIC}" fill="var(--staff)">𝄞</text>`);
  if(clef==='bass') s.push(`<text x="${x+6}" y="${y+SP*2*3+2}" font-size="${SP*2*3.4}" font-family="${MUSIC}" fill="var(--staff)">𝄢</text>`);
}
function noteAt(s,x,yTop,bottomStep,note,opts){
  const col=note.color||'var(--note)';
  if(note.rest){
    const mid=yTop+SP*4;
    if(note.rest==='w') s.push(`<rect x="${x-8}" y="${yTop+SP*2}" width="16" height="${SP}" fill="${col}"/>`);
    else if(note.rest==='h') s.push(`<rect x="${x-8}" y="${yTop+SP*4-SP}" width="16" height="${SP}" fill="${col}"/>`);
    else if(note.rest==='q') s.push(`<path d="M${x-3} ${mid-16} l7 8 -6 8 7 9 c-6 -3 -10 0 -7 6 c-6 -4 -7 -9 -2 -12 l-6 -8 6 -7 z" fill="${col}"/>`);
    else if(note.rest==='e') s.push(`<circle cx="${x-4}" cy="${mid-6}" r="3.2" fill="${col}"/><path d="M${x-2} ${mid-5} q6 3 8 -4 l-6 20" fill="none" stroke="${col}" stroke-width="1.6"/>`);
    if(note.label) s.push(`<text x="${x}" y="${opts.labelY}" text-anchor="middle" font-family="${MONO}" font-size="12" fill="var(--muted)">${note.label}</text>`);
    if(note.count) s.push(`<text x="${x}" y="${opts.labelY+16}" text-anchor="middle" font-family="${SANS}" font-size="12" fill="var(--muted)">${note.count}</text>`);
    return mid;
  }
  const st=stepOf(note.n);const y=yTop+SP*2*4-(st-bottomStep)*SP;
  if(st<bottomStep){for(let k=bottomStep-2;k>=st;k-=2){const ly=yTop+SP*2*4-(k-bottomStep)*SP;s.push(`<line x1="${x-14}" y1="${ly}" x2="${x+14}" y2="${ly}" stroke="var(--staff)" stroke-width="1"/>`);}}
  if(st>bottomStep+8){for(let k=bottomStep+10;k<=st;k+=2){const ly=yTop+SP*2*4-(k-bottomStep)*SP;s.push(`<line x1="${x-14}" y1="${ly}" x2="${x+14}" y2="${ly}" stroke="var(--staff)" stroke-width="1"/>`);}}
  const dur=note.dur||'q';const hollow=dur==='w'||dur==='h'||dur==='dh';
  s.push(`<ellipse cx="${x}" cy="${y}" rx="7.5" ry="5.5" transform="rotate(-20 ${x} ${y})" fill="${hollow?'none':col}" stroke="${col}" stroke-width="${hollow?2.2:1}"/>`);
  const up=note.stemUp!==undefined?note.stemUp:(st-bottomStep<4);
  if(dur!=='w'&&!note.noStem){const sx=up?x+7:x-7;const sy2=up?y-30:y+30;s.push(`<line x1="${sx}" y1="${y}" x2="${sx}" y2="${sy2}" stroke="${col}" stroke-width="1.5"/>`);if(dur==='e'){s.push(`<path d="M${sx} ${sy2} q10 ${up?6:-6} 8 ${up?18:-18}" fill="none" stroke="${col}" stroke-width="2"/>`);}}
  if(dur==='dq'||dur==='dh') s.push(`<circle cx="${x+12}" cy="${y-3}" r="2" fill="${col}"/>`);
  if(note.stac) s.push(`<circle cx="${x}" cy="${up?y+11:y-11}" r="2.2" fill="${col}"/>`);
  if(note.accent){const ay=up?y+16:y-22;s.push(`<path d="M${x-6} ${ay} l12 4 -12 4" fill="none" stroke="${col}" stroke-width="1.6"/>`);}
  if(note.acc) s.push(`<text x="${x-20}" y="${y+5}" font-size="16" font-family="${MUSIC}" fill="${col}">${note.acc}</text>`);
  if(note.label) s.push(`<text x="${x}" y="${opts.labelY}" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="500" fill="${note.color||'var(--muted)'}">${note.label}</text>`);
  if(note.finger) s.push(`<text x="${x}" y="${opts.fingerY}" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="700" fill="var(--rh)">${note.finger}</text>`);
  if(note.count) s.push(`<text x="${x}" y="${opts.labelY+16}" text-anchor="middle" font-family="${SANS}" font-size="12" fill="var(--muted)">${note.count}</text>`);
  return y;
}
function staff(id,o){
  const el=document.getElementById(id);if(!el)return;
  const gap=o.gap||34,x0=80;
  const cols=o.notes.filter(n=>!n.stack).length;
  const width=Math.max(x0+cols*gap+30,320);
  const top=o.top||40;const bottomStep=o.clef==='bass'?stepOf('G2'):stepOf('E4');
  const extra=o.extraBottom||0;
  const height=top+SP*2*4+78+extra;
  const s=[`<svg viewBox="0 0 ${width} ${height}" width="${width}" role="img" aria-label="${o.aria||'Music staff'}">`];
  drawStaff(s,10,top,width-20,o.clef);
  if(o.time) s.push(`<text x="54" y="${top+SP*2*2-2}" font-size="20" font-weight="700" font-family="${SANS}" fill="var(--staff)">${o.time[0]}</text><text x="54" y="${top+SP*2*4-2}" font-size="20" font-weight="700" font-family="${SANS}" fill="var(--staff)">${o.time[1]}</text>`);
  (o.bars||[]).forEach(bi=>{const bx=x0+bi*gap-gap/2;s.push(`<line x1="${bx}" y1="${top}" x2="${bx}" y2="${top+SP*8}" stroke="var(--staff)" stroke-width="1.2"/>`);});
  if(o.endBar){const bx=x0+cols*gap-gap/2;s.push(`<line x1="${bx-4}" y1="${top}" x2="${bx-4}" y2="${top+SP*8}" stroke="var(--staff)" stroke-width="1.2"/><line x1="${bx}" y1="${top}" x2="${bx}" y2="${top+SP*8}" stroke="var(--staff)" stroke-width="3"/>`);}
  if(o.repeatEnd){const bx=x0+cols*gap-gap/2;s.push(`<line x1="${bx-6}" y1="${top}" x2="${bx-6}" y2="${top+SP*8}" stroke="var(--staff)" stroke-width="1.2"/><line x1="${bx}" y1="${top}" x2="${bx}" y2="${top+SP*8}" stroke="var(--staff)" stroke-width="3"/><circle cx="${bx-12}" cy="${top+SP*3}" r="2.2" fill="var(--staff)"/><circle cx="${bx-12}" cy="${top+SP*5}" r="2.2" fill="var(--staff)"/>`);}
  const X=[],Y=[];let cx=x0,col=-1;
  o.notes.forEach((nt,i)=>{if(!nt.stack){col++;cx=x0+col*gap;}X[i]=cx;Y[i]=noteAt(s,cx,top,bottomStep,nt,{labelY:top+SP*8+42,fingerY:top-14});});
  const curve=(a,b,above)=>{const x1=X[a],x2=X[b];const y1=Y[a],y2=Y[b];const yy=above?Math.min(y1,y2)-14:Math.max(y1,y2)+14;const cy=above?yy-12:yy+12;s.push(`<path d="M${x1} ${above?y1-9:y1+9} Q${(x1+x2)/2} ${cy} ${x2} ${above?y2-9:y2+9}" fill="none" stroke="var(--note)" stroke-width="1.6"/>`);};
  (o.ties||[]).forEach(t=>curve(t[0],t[1],t[2]==='above'));
  (o.slurs||[]).forEach(t=>curve(t[0],t[1],t[2]!=='below'));
  (o.dyn||[]).forEach(d=>{s.push(`<text x="${X[d.i]-6}" y="${top+SP*8+22}" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="17" fill="var(--rh)">${d.text}</text>`);});
  (o.hairpins||[]).forEach(h=>{const x1=X[h.a],x2=X[h.b],yy=top+SP*8+18;if(h.dir==='<')s.push(`<path d="M${x2} ${yy-6} L${x1} ${yy} L${x2} ${yy+6}" fill="none" stroke="var(--rh)" stroke-width="1.4"/>`);else s.push(`<path d="M${x1} ${yy-6} L${x2} ${yy} L${x1} ${yy+6}" fill="none" stroke="var(--rh)" stroke-width="1.4"/>`);});
  (o.words||[]).forEach(w=>{s.push(`<text x="${X[w.i]-8}" y="${top-18}" font-family="${SANS}" font-style="italic" font-size="14" fill="var(--ink)">${w.text}</text>`);});
  (o.pedal||[]).forEach(p=>{const x1=X[p.a]-8,x2=X[p.b]+10,yy=top+SP*8+extra+2;s.push(`<path d="M${x1} ${yy-8} V${yy} H${x2} V${yy-8}" fill="none" stroke="var(--lh)" stroke-width="1.6"/>`);if(p.text)s.push(`<text x="${x1}" y="${yy+14}" font-family="Georgia,serif" font-style="italic" font-size="12" fill="var(--lh)">${p.text}</text>`);});
  s.push('</svg>');
  el.innerHTML=s.join('')+(o.cap?`<p class="cap">${o.cap}</p>`:'');
}
function grandStaff(id,o){
  const el=document.getElementById(id);if(!el)return;
  const width=560,top=36,gapY=SP*2*4+SP*6;
  const height=top+gapY+SP*8+52;
  const s=[`<svg viewBox="0 0 ${width} ${height}" width="${width}" role="img" aria-label="Grand staff">`];
  drawStaff(s,30,top,width-40,'treble');drawStaff(s,30,top+gapY,width-40,'bass');
  const tot=gapY+SP*8;
  s.push(`<line x1="30" y1="${top}" x2="30" y2="${top+tot}" stroke="var(--staff)" stroke-width="1.5"/>`);
  s.push(`<path d="M24 ${top} q-14 ${tot/4} 0 ${tot/2} q-14 ${tot/4} 0 ${tot/2}" fill="none" stroke="var(--staff)" stroke-width="2.5"/>`);
  const trebleBottom=stepOf('E4'),bassBottom=stepOf('G2');
  o.notes.forEach((nt,i)=>{const x=110+i*(o.gap||44);if(nt.staff==='t')noteAt(s,x,top,trebleBottom,nt,{labelY:top+tot+34,fingerY:top-10});else noteAt(s,x,top+gapY,bassBottom,nt,{labelY:top+tot+34,fingerY:top-10});});
  s.push(`<text x="${width-14}" y="${top-10}" text-anchor="end" font-family="${MONO}" font-size="11" fill="var(--rh)">RIGHT HAND · TREBLE</text>`);
  s.push(`<text x="${width-14}" y="${top+gapY+SP*8+16}" text-anchor="end" font-family="${MONO}" font-size="11" fill="var(--lh)">LEFT HAND · BASS</text>`);
  s.push('</svg>');
  el.innerHTML=s.join('')+(o.cap?`<p class="cap">${o.cap}</p>`:'');
}

// ---------- Hands ----------
function hands(id){
  const el=document.getElementById(id);if(!el)return;
  function hand(x,mirror,col,ink,label){
    // local coords 0..170 ; right hand: thumb on the left
    const tips=[[44,34],[72,20],[100,26],[128,46]]; // fingers 2,3,4,5 : [x,topY]
    let g=`<g transform="translate(${x},0)${mirror?' scale(-1,1) translate(-170,0)':''}">`;
    g+=`<rect x="38" y="112" width="116" height="84" rx="26" fill="var(--soft)" stroke="var(--rule)"/>`;
    tips.forEach(t=>{g+=`<rect x="${t[0]}" y="${t[1]}" width="24" height="${124-t[1]}" rx="12" fill="var(--soft)" stroke="var(--rule)"/>`;});
    g+=`<rect x="0" y="100" width="24" height="62" rx="12" fill="var(--soft)" stroke="var(--rule)" transform="rotate(-38 12 162)"/>`;
    g+='</g>';
    const local=[[8,96,'1'],[56,44,'2'],[84,30,'3'],[112,36,'4'],[140,56,'5']];
    local.forEach(p=>{const cx=mirror?x+170-p[0]:x+p[0];const cy=p[1];g+=`<circle cx="${cx}" cy="${cy}" r="12" fill="${col}"/><text x="${cx}" y="${cy+4.5}" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="700" fill="${ink}">${p[2]}</text>`;});
    g+=`<text x="${x+85}" y="222" text-anchor="middle" font-family="${MONO}" font-size="12" letter-spacing="1.5" fill="${col}">${label}</text>`;
    return g;
  }
  let s=`<svg viewBox="-10 0 460 236" width="460" role="img" aria-label="Finger numbering for both hands">`;
  s+=hand(10,true,'var(--lh)','var(--lh-ink)','LEFT HAND');
  s+=hand(250,false,'var(--rh)','var(--rh-ink)','RIGHT HAND');
  s+='</svg>';
  el.innerHTML=s+`<p class="cap">Seen from above, palms down on the keys. Thumbs are <b>1</b>, pinkies are <b>5</b>, on both hands — so the thumbs point at each other.</p>`;
}

// ---------- Note values ----------
function noteVals(id){
  const el=document.getElementById(id);if(!el)return;
  const rows=[['Whole note','4 beats','w',1],['Half note','2 beats','h',2],['Quarter note','1 beat','q',4],['Eighth note','½ beat','e',8]];
  const width=560;let s=`<svg viewBox="0 0 ${width} 256" width="${width}" role="img" aria-label="Note values in 4/4">`;
  rows.forEach((r,i)=>{const y=30+i*56;
    s+=`<text x="0" y="${y+6}" font-family="${SANS}" font-size="15" font-weight="600" fill="var(--ink)">${r[0]}</text>`;
    s+=`<text x="0" y="${y+24}" font-family="${MONO}" font-size="12" fill="var(--muted)">${r[1]}</text>`;
    const count=r[3],segW=380/count;
    for(let k=0;k<count;k++){const x=170+k*segW;
      s+=`<rect x="${x+1}" y="${y-18}" width="${segW-2}" height="44" fill="var(--soft)" rx="3"/>`;
      const cx=x+segW/2,cy=y+8;const hollow=r[2]==='w'||r[2]==='h';
      s+=`<ellipse cx="${cx}" cy="${cy}" rx="7" ry="5" transform="rotate(-20 ${cx} ${cy})" fill="${hollow?'none':'var(--note)'}" stroke="var(--note)" stroke-width="${hollow?2:1}"/>`;
      if(r[2]!=='w'){s+=`<line x1="${cx+6.5}" y1="${cy}" x2="${cx+6.5}" y2="${cy-22}" stroke="var(--note)" stroke-width="1.5"/>`;}
      if(r[2]==='e'){s+=`<path d="M${cx+6.5} ${cy-22} q9 5 7 16" fill="none" stroke="var(--note)" stroke-width="2"/>`;}
    }
  });
  ['1','2','3','4'].forEach((b,i)=>{s+=`<text x="${170+i*95+47}" y="250" text-anchor="middle" font-family="${MONO}" font-size="12" fill="var(--muted)">beat ${b}</text>`;});
  s+='</svg>';
  el.innerHTML=s+`<p class="cap">Each row fills exactly one measure of 4/4. Two halves = one whole; two quarters = one half; two eighths = one quarter. Hollow heads are long notes; a flag on the stem halves the value.</p>`;
}

// ================= RENDER =================
hands('hands');
noteVals('notevals');

keyboard('kb-octave',{from:'C4',to:'B4',names:true,groups:true,cap:'One octave, the 12-key pattern. Seven white keys, five black keys in a <b>two</b> group and a <b>three</b> group. This exact picture repeats across the whole piano.'});
keyboard('kb-two-oct',{from:'C3',to:'C5',names:true,octaves:true,w:36,marks:[{n:'C3',hand:'root',label:'C'},{n:'C4',hand:'root',label:'C'},{n:'C5',hand:'root',label:'C'}],cap:'Two octaves. Every C is left of a two-group. <b>C4 is middle C.</b> The octave number changes at each C, not at each A.'});
keyboard('kb-black',{from:'C4',to:'B4',names:true,blackNames:true,cap:'Each black key has a sharp name (from the key to its left) and a flat name (from the key to its right). Same key, two labels.'});
keyboard('kb-steps',{from:'C4',to:'C5',names:true,steps:[{a:'C4',b:'C#4',label:'H'},{a:'C#4',b:'D4',label:'H'},{a:'E4',b:'F4',label:'H',color:'var(--root)'},{a:'B4',b:'C5',label:'H',color:'var(--root)'}],brackets:[{a:'C4',b:'D4',label:'W'},{a:'D4',b:'E4',label:'W'}],cap:'H = half step (adjacent key), W = whole step (two half steps). <b>E–F and B–C are half steps</b> with no black key between them; the other white-key neighbors are whole steps.'});
keyboard('kb-cmaj-steps',{from:'C4',to:'C5',names:true,marks:'CDEFGABC'.split('').map((l,i)=>({n:l+(i===7?5:4),hand:'R',label:i+1})),steps:[{a:'C4',b:'D4',label:'W'},{a:'D4',b:'E4',label:'W'},{a:'E4',b:'F4',label:'H',color:'var(--root)'},{a:'F4',b:'G4',label:'W'},{a:'G4',b:'A4',label:'W'},{a:'A4',b:'B4',label:'W'},{a:'B4',b:'C5',label:'H',color:'var(--root)'}],cap:'C major scale. Numbers in the circles are <b>scale degrees</b> (1st note, 2nd note…), not fingers. The step pattern W W H W W W H lands exactly on the white keys.'});
keyboard('kb-cmaj-rh',{from:'B3',to:'D5',names:true,marks:[{n:'C4',hand:'R',label:'1'},{n:'D4',hand:'R',label:'2'},{n:'E4',hand:'R',label:'3'},{n:'F4',hand:'R',label:'1'},{n:'G4',hand:'R',label:'2'},{n:'A4',hand:'R',label:'3'},{n:'B4',hand:'R',label:'4'},{n:'C5',hand:'R',label:'5'}],brackets:[{a:'E4',b:'F4',label:'thumb tucks under'}],cap:'<b>Right hand, going up.</b> 1 2 3 · 1 2 3 4 5. After E (finger 3), the thumb passes under to F.'});
keyboard('kb-cmaj-lh',{from:'B2',to:'D4',names:true,marks:[{n:'C3',hand:'L',label:'5'},{n:'D3',hand:'L',label:'4'},{n:'E3',hand:'L',label:'3'},{n:'F3',hand:'L',label:'2'},{n:'G3',hand:'L',label:'1'},{n:'A3',hand:'L',label:'3'},{n:'B3',hand:'L',label:'2'},{n:'C4',hand:'L',label:'1'}],brackets:[{a:'G3',b:'A3',label:'finger 3 crosses over'}],cap:'<b>Left hand, going up.</b> 5 4 3 2 1 · 3 2 1. After G (thumb), finger 3 crosses over to A.'});
keyboard('kb-intervals',{from:'C4',to:'C5',names:true,marks:[{n:'C4',hand:'root',label:'C'},{n:'E4',hand:'R',label:'3rd'},{n:'G4',hand:'R',label:'5th'},{n:'C5',hand:'R',label:'8ve'}],brackets:[{a:'C4',b:'E4',label:'major 3rd · 4 half steps'},{a:'C4',b:'G4',label:'perfect 5th · 7 half steps'}],cap:'The chord-building intervals from C. On white keys a 3rd skips one key and a 5th skips three.'});
keyboard('kb-c',{from:'C4',to:'B4',names:true,w:38,marks:[{n:'C4',hand:'root',label:'1'},{n:'E4',hand:'R',label:'3'},{n:'G4',hand:'R',label:'5'}],steps:[{a:'C4',b:'E4',label:'4 half steps',color:'var(--rh)'},{a:'E4',b:'G4',label:'3',color:'var(--rh)'}],title:'C major  ·  C E G',cap:'Root, then <b>4</b> half steps, then <b>3</b>. Circles show right-hand fingers.'});
keyboard('kb-cm',{from:'C4',to:'B4',names:true,w:38,marks:[{n:'C4',hand:'root',label:'1'},{n:'Eb4',hand:'R',label:'3'},{n:'G4',hand:'R',label:'5'}],steps:[{a:'C4',b:'Eb4',label:'3 half steps',color:'var(--rh)'},{a:'Eb4',b:'G4',label:'4',color:'var(--rh)'}],title:'C minor  ·  C E♭ G',cap:'Same root and 5th. Only the middle note drops one half step: <b>3</b> then <b>4</b>.'});

// seven diatonic chords as a grid
(function(){
  const row=document.getElementById('diatonic-row');if(!row)return;
  const chords=[['I','C','C4','E4','G4','major'],['ii','Dm','D4','F4','A4','minor'],['iii','Em','E4','G4','B4','minor'],['IV','F','F4','A4','C5','major'],['V','G','G4','B4','D5','major'],['vi','Am','A4','C5','E5','minor'],['vii°','Bdim','B4','D5','F5','dim']];
  chords.forEach(c=>{
    const d=document.createElement('div');d.className='fig';row.appendChild(d);
    const p=parse(c[2]);const wi=whiteIndex(p.letter,p.oct);
    keyboard(d,{from:whiteName(wi),to:whiteName(wi+5),names:true,w:30,h:110,title:`${c[0]}  ·  ${c[1]}`,marks:[{n:c[2],hand:'root'},{n:c[3],hand:'R'},{n:c[4],hand:'R'}],cap:`${c[2][0]} ${c[3][0]} ${c[4][0]} — ${c[5]}`});
  });
})();

keyboard('kb-inv0',{from:'C4',to:'B4',names:true,w:34,marks:[{n:'C4',hand:'root',label:'1'},{n:'E4',hand:'R',label:'3'},{n:'G4',hand:'R',label:'5'}],title:'Root position',cap:'C on the bottom. Fingers 1 3 5.'});
keyboard('kb-inv1',{from:'C4',to:'C5',names:true,w:32,marks:[{n:'E4',hand:'R',label:'1'},{n:'G4',hand:'R',label:'2'},{n:'C5',hand:'root',label:'5'}],title:'1st inversion',cap:'E on the bottom, C moved up an octave. Fingers 1 2 5.'});
keyboard('kb-inv2',{from:'C4',to:'E5',names:true,w:30,marks:[{n:'G4',hand:'R',label:'1'},{n:'C5',hand:'root',label:'3'},{n:'E5',hand:'R',label:'5'}],title:'2nd inversion',cap:'G on the bottom. Fingers 1 3 5.'});
keyboard('kb-voicelead-bad',{from:'C4',to:'D5',names:true,w:40,title:'Beginner version — every chord in root position',dual:true,marks:[{n:'C4',hand:'root',label:'C'},{n:'E4',hand:'R'},{n:'G4',hand:'R'},{n:'F4',hand:'L',label:'F'},{n:'A4',hand:'L'},{n:'C5',hand:'L'},{n:'G4',hand:'R',label:'G'},{n:'B4',hand:'R'},{n:'D5',hand:'R'}],cap:'C (C E G) → F (F A C) → G (G B D). The hand jumps three or four keys at every change. Here orange marks the C and G chords and teal marks the F chord, all on one keyboard for comparison.'});
keyboard('kb-voicelead-good',{from:'B3',to:'C5',names:true,w:40,title:'Smooth version — closest inversions',dual:true,marks:[{n:'C4',hand:'root',label:'C'},{n:'E4',hand:'R'},{n:'G4',hand:'R'},{n:'C4',hand:'L',label:'F'},{n:'F4',hand:'L'},{n:'A4',hand:'L'},{n:'B3',hand:'R'},{n:'D4',hand:'R'},{n:'G4',hand:'R',label:'G'}],cap:'C (C E G) → F as <b>C F A</b> (2nd inversion — the C stays put) → G as <b>B D G</b> (1st inversion — the G stays put) → back to C. No finger moves more than two keys.'});
keyboard('kb-prog',{from:'C3',to:'C5',names:true,octaves:true,w:32,h:120,marks:[{n:'C3',hand:'L',label:'5'},{n:'G3',hand:'L',label:'5'},{n:'A3',hand:'L',label:'5'},{n:'F3',hand:'L',label:'5'},{n:'B3',hand:'R'},{n:'C4',hand:'R'},{n:'D4',hand:'R'},{n:'E4',hand:'R'},{n:'F4',hand:'R'},{n:'G4',hand:'R'},{n:'A4',hand:'R'}],cap:'C – G – Am – F, the way it sits under the hands. <b>Left</b>: pinky on each root (C3, G3, A3, F3). <b>Right</b>: the triads stay inside B3–A4 by choosing the closest inversion each time — C E G, then B D G, then C E A, then C F A.'});
keyboard('kb-gmaj',{from:'G3',to:'G4',names:true,blackNames:true,marks:[{n:'G3',hand:'R',label:'1'},{n:'A3',hand:'R',label:'2'},{n:'B3',hand:'R',label:'3'},{n:'C4',hand:'R',label:'1'},{n:'D4',hand:'R',label:'2'},{n:'E4',hand:'R',label:'3'},{n:'F#4',hand:'root',label:'4'},{n:'G4',hand:'R',label:'5'}],title:'G major  ·  one sharp (F♯)',cap:'Same W W H W W W H recipe from G. The seventh note must be F♯ to keep the pattern. Right-hand fingering identical to C.'});
keyboard('kb-fmaj',{from:'F3',to:'F4',names:true,blackNames:true,marks:[{n:'F3',hand:'R',label:'1'},{n:'G3',hand:'R',label:'2'},{n:'A3',hand:'R',label:'3'},{n:'Bb3',hand:'root',label:'4'},{n:'C4',hand:'R',label:'1'},{n:'D4',hand:'R',label:'2'},{n:'E4',hand:'R',label:'3'},{n:'F4',hand:'R',label:'4'}],title:'F major  ·  one flat (B♭)',cap:'The fourth note becomes B♭. Right hand uses 1 2 3 4 · 1 2 3 4 so the thumb never lands on the black key.'});
keyboard('kb-dmaj',{from:'D4',to:'D5',names:true,blackNames:true,marks:[{n:'D4',hand:'R',label:'1'},{n:'E4',hand:'R',label:'2'},{n:'F#4',hand:'root',label:'3'},{n:'G4',hand:'R',label:'1'},{n:'A4',hand:'R',label:'2'},{n:'B4',hand:'R',label:'3'},{n:'C#5',hand:'root',label:'4'},{n:'D5',hand:'R',label:'5'}],title:'D major  ·  two sharps (F♯, C♯)',cap:'Each new key in this order adds exactly one sharp. Fingering still 1 2 3 · 1 2 3 4 5.'});
keyboard('kb-cmaj7',{from:'C4',to:'C5',names:true,w:32,marks:[{n:'C4',hand:'root',label:'1'},{n:'E4',hand:'R',label:'2'},{n:'G4',hand:'R',label:'3'},{n:'B4',hand:'R',label:'5'}],title:'Cmaj7  ·  C E G B',cap:'Major triad + major 7th. Dreamy, "finished" sound.'});
keyboard('kb-g7',{from:'G3',to:'G4',names:true,w:32,marks:[{n:'G3',hand:'root',label:'1'},{n:'B3',hand:'R',label:'2'},{n:'D4',hand:'R',label:'3'},{n:'F4',hand:'R',label:'5'}],title:'G7  ·  G B D F',cap:'Major triad + minor 7th. The F wants to fall to E and the B wants to rise to C — it pulls hard toward C major.'});
keyboard('kb-am7',{from:'A3',to:'A4',names:true,w:32,marks:[{n:'A3',hand:'root',label:'1'},{n:'C4',hand:'R',label:'2'},{n:'E4',hand:'R',label:'3'},{n:'G4',hand:'R',label:'5'}],title:'Am7  ·  A C E G',cap:'Minor triad + minor 7th. Soft, soulful.'});

grandStaff('grand',{notes:[{n:'C4',staff:'t',label:'C4',color:'var(--root)',dur:'w'},{n:'E4',staff:'t',label:'E4',dur:'w'},{n:'G4',staff:'t',label:'G4',dur:'w'},{n:'C5',staff:'t',label:'C5',dur:'w'},{n:'C4',staff:'b',label:'C4',color:'var(--root)',dur:'w'},{n:'A3',staff:'b',label:'A3',dur:'w'},{n:'F3',staff:'b',label:'F3',dur:'w'},{n:'C3',staff:'b',label:'C3',dur:'w'}],cap:'The grand staff. <b>Middle C</b> appears twice — on a ledger line below the treble staff and on a ledger line above the bass staff. Same key. Pitch rises as notes go up the page; the two staves are one continuous ladder with middle C in the gap.'});
staff('treble',{clef:'treble',gap:38,notes:[{n:'C4',label:'C',dur:'w',color:'var(--root)'},{n:'D4',label:'D',dur:'w'},{n:'E4',label:'E',dur:'w'},{n:'F4',label:'F',dur:'w'},{n:'G4',label:'G',dur:'w'},{n:'A4',label:'A',dur:'w'},{n:'B4',label:'B',dur:'w'},{n:'C5',label:'C',dur:'w'},{n:'D5',label:'D',dur:'w'},{n:'E5',label:'E',dur:'w'},{n:'F5',label:'F',dur:'w'},{n:'G5',label:'G',dur:'w'}],cap:'Treble clef. Lines E G B D F, spaces F A C E. Each line-to-space or space-to-line move is one letter. Middle C hangs below on its ledger line.'});
staff('bass',{clef:'bass',gap:38,notes:[{n:'E2',label:'E',dur:'w'},{n:'F2',label:'F',dur:'w'},{n:'G2',label:'G',dur:'w'},{n:'A2',label:'A',dur:'w'},{n:'B2',label:'B',dur:'w'},{n:'C3',label:'C',dur:'w'},{n:'D3',label:'D',dur:'w'},{n:'E3',label:'E',dur:'w'},{n:'F3',label:'F',dur:'w'},{n:'G3',label:'G',dur:'w'},{n:'A3',label:'A',dur:'w'},{n:'B3',label:'B',dur:'w'},{n:'C4',label:'C',dur:'w',color:'var(--root)'}],cap:'Bass clef. Lines G B D F A, spaces A C E G. Middle C sits on a ledger line <b>above</b> this staff — the mirror of where it sits under the treble.'});
grandStaff('landmarks',{gap:60,notes:[{n:'G4',staff:'t',label:'treble G',color:'var(--root)',dur:'w'},{n:'C4',staff:'t',label:'middle C',color:'var(--root)',dur:'w'},{n:'C5',staff:'t',label:'high C',color:'var(--root)',dur:'w'},{n:'F3',staff:'b',label:'bass F',color:'var(--root)',dur:'w'},{n:'C4',staff:'b',label:'middle C',color:'var(--root)',dur:'w'},{n:'C3',staff:'b',label:'low C',color:'var(--root)',dur:'w'}],cap:'<b>Landmark notes</b> to memorize cold: the treble clef curls around G4; the bass clef\'s two dots straddle F3; middle C sits between the staves; C5 and C3 sit in the third space of each staff. Everything else is "one step above…" or "a third below…" a landmark.'});
staff('stepskip',{clef:'treble',gap:48,notes:[{n:'G4',label:'G',color:'var(--root)'},{n:'A4',label:'step'},{n:'B4',label:'step'},{n:'G4',label:'G',color:'var(--root)'},{n:'B4',label:'skip · 3rd'},{n:'D5',label:'skip · 3rd'},{n:'G4',label:'G',color:'var(--root)'},{n:'D5',label:'5th'},{n:'G5',label:'octave'}],cap:'Reading by shape. A <b>step</b> moves line→space or space→line (next-door key). A <b>skip</b> moves line→line or space→space (a 3rd: skip one key). Two skips stacked is a 5th. Your hand already knows these distances from the keyboard.'});
staff('ode',{clef:'treble',gap:34,time:['4','4'],bars:[4,8,12],notes:[
 {n:'E4',label:'E',finger:'3',count:'1'},{n:'E4',label:'E',finger:'3',count:'2'},{n:'F4',label:'F',finger:'4',count:'3'},{n:'G4',label:'G',finger:'5',count:'4'},
 {n:'G4',label:'G',finger:'5',count:'1'},{n:'F4',label:'F',finger:'4',count:'2'},{n:'E4',label:'E',finger:'3',count:'3'},{n:'D4',label:'D',finger:'2',count:'4'},
 {n:'C4',label:'C',finger:'1',count:'1'},{n:'C4',label:'C',finger:'1',count:'2'},{n:'D4',label:'D',finger:'2',count:'3'},{n:'E4',label:'E',finger:'3',count:'4'},
 {n:'E4',label:'E',finger:'3',dur:'dq',count:'1 2'},{n:'D4',label:'D',finger:'2',dur:'e',count:'&amp;'},{n:'D4',label:'D',finger:'2',dur:'h',count:'3 4'}],
 cap:'"Ode to Joy," first phrase. Orange numbers above the staff are <b>fingers</b>; the row under the letters is the <b>count</b>. The hand sits with thumb on C4 and never moves. In bar 4 the dotted quarter lasts 1½ beats, the eighth falls on the "and" of beat 2, and the half note holds beats 3–4.'});

// ---- Rests, ties & dots ----
staff('rests',{clef:'treble',gap:62,notes:[
 {n:'C5',dur:'w',label:'whole note',count:'4 beats'},{rest:'w',label:'whole rest',count:'4 beats'},
 {n:'C5',dur:'h',label:'half note',count:'2 beats'},{rest:'h',label:'half rest',count:'2 beats'},
 {n:'C5',dur:'q',label:'quarter',count:'1 beat'},{rest:'q',label:'quarter rest',count:'1 beat'},
 {n:'C5',dur:'e',label:'eighth',count:'½ beat'},{rest:'e',label:'eighth rest',count:'½ beat'}],
 cap:'Each note value and its rest, same length. The <b>whole rest</b> hangs <em>below</em> the fourth line (a hole in the ground); the <b>half rest</b> sits <em>on top of</em> the middle line (a hat). The quarter rest is the zigzag; the eighth rest has one flag like the eighth note.'});
staff('tiesdots',{clef:'treble',gap:44,time:['4','4'],bars:[2,4,7],endBar:true,ties:[[0,1,'above']],notes:[
 {n:'C5',dur:'h',label:'C',count:'1 2'},{n:'C5',dur:'h',label:'(C)',count:'(3 4)'},
 {n:'G4',dur:'dh',label:'G',count:'1 2 3'},{rest:'q',label:'rest',count:'4'},
 {n:'E4',dur:'dq',label:'E',count:'1 2'},{n:'F4',dur:'e',label:'F',count:'&amp;'},{n:'G4',dur:'h',label:'G',count:'3 4'}],
 cap:'Bar 1: two half notes <b>tied</b> — one sound lasting four beats; strike once, hold through. Bar 2: a <b>dotted half</b> (2 + 1 = 3 beats) then a quarter rest. Bar 3: a <b>dotted quarter</b> (1½ beats) followed by an eighth on the "and," then a half note. The thick double line at the end means the piece is over.'});

// ---- Second melody: Amazing Grace ----
staff('grace',{clef:'treble',gap:36,time:['3','4'],bars:[1,4,6,8,10,13,15],endBar:true,notes:[
 {n:'G4',finger:'1',label:'G',count:'3'},
 {n:'C5',dur:'h',finger:'3',label:'C',count:'1 2'},{n:'E5',dur:'e',finger:'5',label:'E',count:'3'},{n:'C5',dur:'e',finger:'3',label:'C',count:'&amp;'},
 {n:'E5',dur:'h',finger:'5',label:'E',count:'1 2'},{n:'D5',finger:'4',label:'D',count:'3'},
 {n:'C5',dur:'h',finger:'3',label:'C',count:'1 2'},{n:'A4',finger:'2',label:'A',count:'3'},
 {n:'G4',dur:'h',finger:'1',label:'G',count:'1 2'},{n:'G4',finger:'1',label:'G',count:'3'},
 {n:'C5',dur:'h',finger:'3',label:'C',count:'1 2'},{n:'E5',dur:'e',finger:'5',label:'E',count:'3'},{n:'C5',dur:'e',finger:'3',label:'C',count:'&amp;'},
 {n:'E5',dur:'h',finger:'5',label:'E',count:'1 2'},{n:'D5',finger:'4',label:'D',count:'3'},
 {n:'G5',dur:'dh',finger:'5',label:'G',count:'1 2 3'}],
 cap:'"Amazing Grace," first half. The lone G before the first bar line is the <b>pickup</b> — count "3" and land on the C on beat 1. Every bar has three beats. The last G5 is a dotted half: hold it for the whole bar, and notice finger 5 has to jump from D5 to G5 — do that shift slowly and deliberately.'});

// ---- Expression figure ----
staff('expr',{clef:'treble',gap:40,time:['4','4'],bars:[4],endBar:true,extraBottom:30,
 slurs:[[0,3]],dyn:[{i:0,text:'p'},{i:4,text:'f'}],hairpins:[{a:1,b:3,dir:'<'}],words:[{i:0,text:'Andante'}],
 pedal:[{a:0,b:3,text:'Ped.'},{a:4,b:7}],
 notes:[{n:'C5'},{n:'D5'},{n:'E5'},{n:'F5'},{n:'G5',stac:true,accent:true},{n:'F5',stac:true},{n:'E5',stac:true},{n:'D5',stac:true}],
 cap:'Everything on a page besides pitch and rhythm. <b>Andante</b> = walking tempo. <b><i>p</i></b> = soft, with a <b>crescendo hairpin</b> growing into <b><i>f</i></b> = loud. The curve over bar 1 is a <b>slur</b>: play legato, connected. The dots on bar 2 are <b>staccato</b>: short and detached; the wedge on the first G is an <b>accent</b>. The teal brackets underneath are <b>pedal</b> marks: press at the start, lift at the end, re-press for the next bracket.'});

// ---- Hand positions & LH chords ----
keyboard('kb-cpos',{from:'B2',to:'A4',names:true,w:30,title:'C position',marks:[{n:'C3',hand:'L',label:'5'},{n:'D3',hand:'L',label:'4'},{n:'E3',hand:'L',label:'3'},{n:'F3',hand:'L',label:'2'},{n:'G3',hand:'L',label:'1'},{n:'C4',hand:'R',label:'1'},{n:'D4',hand:'R',label:'2'},{n:'E4',hand:'R',label:'3'},{n:'F4',hand:'R',label:'4'},{n:'G4',hand:'R',label:'5'}],cap:'<b>C position.</b> Both thumbs sit on a C an octave apart (C3 left, C4 right); each hand covers C D E F G. Most first pieces never leave this.'});
keyboard('kb-gpos',{from:'F3',to:'E5',names:true,w:30,title:'G position',marks:[{n:'G3',hand:'L',label:'5'},{n:'A3',hand:'L',label:'4'},{n:'B3',hand:'L',label:'3'},{n:'C4',hand:'L',label:'2'},{n:'D4',hand:'L',label:'1'},{n:'G4',hand:'R',label:'1'},{n:'A4',hand:'R',label:'2'},{n:'B4',hand:'R',label:'3'},{n:'C5',hand:'R',label:'4'},{n:'D5',hand:'R',label:'5'}],cap:'<b>G position.</b> Same shape moved up to G: each hand covers G A B C D. Same finger numbers, different notes — this is why you learn positions rather than "finger 3 = E."'});
keyboard('kb-lh-c',{from:'B2',to:'A3',names:true,w:34,title:'I  ·  C',marks:[{n:'C3',hand:'root',label:'5'},{n:'E3',hand:'L',label:'3'},{n:'G3',hand:'L',label:'1'}],cap:'C E G — fingers 5 3 1. Root position.'});
keyboard('kb-lh-f',{from:'B2',to:'A3',names:true,w:34,title:'IV  ·  F',marks:[{n:'C3',hand:'L',label:'5'},{n:'F3',hand:'root',label:'2'},{n:'A3',hand:'L',label:'1'}],cap:'C F A — fingers 5 2 1. F chord in 2nd inversion so the pinky stays on C.'});
keyboard('kb-lh-g7',{from:'B2',to:'A3',names:true,w:34,title:'V7  ·  G7',marks:[{n:'B2',hand:'L',label:'5'},{n:'F3',hand:'L',label:'2'},{n:'G3',hand:'root',label:'1'}],cap:'B F G — fingers 5 2 1. A three-note G7 (the D is left out); pinky slides down one key to B.'});

// ---- Accompaniment patterns (bass clef, C chord) ----
staff('pat-blocked',{clef:'bass',gap:70,time:['4','4'],bars:[1],endBar:true,words:[{i:0,text:'Blocked chord'}],notes:[
 {n:'C3',dur:'w',count:'1 2 3 4'},{n:'E3',dur:'w',stack:true},{n:'G3',dur:'w',stack:true},
 {n:'C3',dur:'h',count:'1 2'},{n:'E3',dur:'h',stack:true},{n:'G3',dur:'h',stack:true},
 {n:'C3',dur:'h',count:'3 4'},{n:'E3',dur:'h',stack:true},{n:'G3',dur:'h',stack:true}],
 cap:'All three notes together. Bar 1: one strike held four beats. Bar 2: restruck every two beats. The simplest accompaniment — hymns, ballads, slow pop.'});
staff('pat-broken',{clef:'bass',gap:44,time:['4','4'],bars:[4],endBar:true,words:[{i:0,text:'Broken chord (arpeggio)'}],notes:[
 {n:'C3',label:'C',count:'1'},{n:'E3',label:'E',count:'2'},{n:'G3',label:'G',count:'3'},{n:'C4',label:'C',count:'4'},
 {n:'C3',label:'C',count:'1'},{n:'E3',label:'E',count:'2'},{n:'G3',label:'G',count:'3'},{n:'C4',label:'C',count:'4'}],
 cap:'One note at a time, bottom to top, fingers 5 3 2 1. Reaching C4 with the thumb is the stretch to practice. Ballads, film music, "Let It Be"–style playing.'});
staff('pat-waltz',{clef:'bass',gap:44,time:['3','4'],bars:[3],endBar:true,words:[{i:0,text:'Waltz bass'}],notes:[
 {n:'C3',label:'C',count:'1'},{n:'E3',label:'E G',count:'2'},{n:'G3',stack:true},{n:'E3',label:'E G',count:'3'},{n:'G3',stack:true},
 {n:'C3',label:'C',count:'1'},{n:'E3',label:'E G',count:'2'},{n:'G3',stack:true},{n:'E3',label:'E G',count:'3'},{n:'G3',stack:true}],
 cap:'"Oom-pah-pah": root alone on beat 1 (pinky), the two upper notes together on beats 2 and 3 (fingers 3 and 1). Every waltz, most 3/4 folk songs.'});
staff('pat-alberti',{clef:'bass',gap:40,time:['4','4'],bars:[8],endBar:true,words:[{i:0,text:'Alberti bass'}],notes:[
 {n:'C3',dur:'e',label:'C',count:'1'},{n:'G3',dur:'e',label:'G',count:'&amp;'},{n:'E3',dur:'e',label:'E',count:'2'},{n:'G3',dur:'e',label:'G',count:'&amp;'},
 {n:'C3',dur:'e',label:'C',count:'3'},{n:'G3',dur:'e',label:'G',count:'&amp;'},{n:'E3',dur:'e',label:'E',count:'4'},{n:'G3',dur:'e',label:'G',count:'&amp;'}],
 cap:'Low – high – middle – high in steady eighth notes, fingers 5 1 3 1. The engine under Mozart and Clementi sonatinas; keep it quiet and even, the melody sits on top.'});
})();
```
