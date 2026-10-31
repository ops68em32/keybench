# Verify Phase 1: Input and clock

**The gate:**
1. Notes you play on the P-145 show up from the microphone in under 100 ms. They're the right note at least 95% of the time from C2 to C6.
2. The metronome doesn't drift over 5 minutes.
3. A scale played against the click shows how many milliseconds each note was early or late.

Takes about 20 minutes at the piano. Use the laptop or phone you'll practise with. Put it on the music stand, with the piano's speakers at your normal volume and the room fairly quiet.

---

## Before you start

**Getting the app.** Open `https://<your-github-username>.github.io/keybench/`. If it isn't online yet, follow "Put the app online" at the bottom of this page first.

**Getting the newest version.** The app saves a copy of itself so it works offline. After an update it may show the old version once. If you don't see an **Input** tab at the top, reload the page (or close and reopen the installed app) once or twice.

**Which browser.** Use Chrome or Edge on the laptop, Safari on iPhone, Chrome on Android.

---

## Step 1: Let the app hear the piano

1. Tap **Input** at the top.
2. Under **Listening**, tap **Start listening**. Allow the microphone when the browser asks.
3. Play a few notes. The green bar moves, and each note appears under **Live notes** with its name, e.g. **C4 · mic**.

If the browser says the microphone is blocked, click the icon at the left of the address bar, set Microphone to **Allow**, and try again.

## Step 2: Calibrate (30 seconds)

Tap **Calibrate (30 s)** and follow the four prompts:

1. **Quiet room** for two seconds.
2. **Middle C, four times.** All four should read **C4**.
3. **C major chord** (C E G together), held for two seconds.
4. **Middle C on the clicks.** The metronome counts in for one bar, then clicks 8 times. Play C4 exactly on each of those 8 clicks.

Tap **Save**. The Listening card now says **Calibration: Done · mic delay NN ms**. That delay is taken off every timing score, so a note played on the click counts as on time.

## Step 3: Pitch check (gate part 1)

1. Scroll to **Pitch check** and tap **Start pitch check**.
2. The app shows 20 notes, one at a time, from **C2** (two octaves below middle C) up to **C6**, each with a small keyboard picture. Play each note once, at normal loudness, and wait for the next one.
3. At the end you'll see a result:

✅ Pass if it says **Pass**: at least **19/20 right (95%)** and **slowest under 100 ms**.

If a note was misheard, the box for it turns red and shows what the app heard. Tap **Run again** once to rule out a slip. If the same low notes keep failing, tell Claude which ones and what the app heard.

## Step 4: The on-screen keyboard

Below the Listening card is a keyboard. On a phone about two octaves fit, middle C is labelled in red, and you can swipe sideways for the rest.

- Tap a key. It lights up and appears in **Live notes** as **screen**.
- Play the real piano. The matching on-screen key lights up while the note sounds.

## Step 5: Metronome steadiness (gate part 2)

1. In **Metronome**, set **120** BPM and **4/4**, then tap **Start**.
2. After the one-bar count-in, a line appears: **beat N · m:ss · late clicks 0**.
3. Start a stopwatch on your phone when that line first shows **beat 0**.
4. Leave it running with the screen on and Keybench in front. Don't switch apps.
5. When your stopwatch reaches **5:00**, look at the line.

✅ Pass if it reads close to **beat 600 · 5:00.0** (a beat or two either way is just your stopwatch thumb) and **late clicks 0**, and the click sounded even the whole time.

If "late clicks" isn't 0, the browser paused the page (another app, the screen locking). Keep Keybench in front and try again.

## Step 6: Scale with the click (gate part 3)

1. Scroll to **Scale with the click**. Leave the speed at **60 BPM** and tap **Start**.
2. After one bar of count-in, play **C D E F G A B C B A G F E D C** with the right hand, one note on each click.
3. Each note gets a row:
   - **green**: within 40 ms of the click
   - **orange**: within 80 ms (the limit the drills will use)
   - **red**: further off
   
   Bars to the left of the centre line are early; bars to the right are late. The summary says how far off you were on average and whether you tend to rush or drag.

✅ Pass if you see a millisecond figure for every note you played. It doesn't matter how accurate you were. This step checks that the app *measures* it. A missed or wrong note shows as **missed** or **got X**.

## Step 7 (optional): USB cable

Only if you ever buy a USB-B cable for the P-145's **USB TO HOST** port:
1. Plug it in, and tap **I have a USB cable: turn on MIDI** (Chrome/Edge/Android only; iPhones can't use it).
2. Allow MIDI when asked. **Notes from** switches to **MIDI cable · Digital Piano**, and the mic is ignored while the cable is connected.
3. Unplug it and the app goes back to the microphone by itself.

---

## No piano nearby?

Open `…/keybench/#/input?test=1`. A **Use test tones instead of the mic** button appears. It feeds synthetic piano notes through the same note detector, so Steps 3 and 6 can run with no piano: tap **Play all with test tones** in the pitch check. This only proves the app works. The real gate is your piano.

## What Phase 1 does *not* do yet

There are no lessons or drills yet; those start in Phase 2. Chords from the microphone are only measured for loudness during calibration, and recognising them properly comes later, as planned. The metronome click is a synthesized woodblock; the real woodblock and piano samples come with the sampler in a later phase.

## If something fails

Tell Claude Code which step failed and exactly what the screen said: the pitch-check boxes, or the numbers in the scale rows. Screenshots help.

---

## Put the app online (once only)

Skip this if the app is already at `https://<your-github-username>.github.io/keybench/`.

1. On github.com, click **New repository**. Name it `keybench` and click **Create repository**.
2. Upload this project folder to it. Claude Code can do this for you if you ask.
3. In the repository, open **Settings → Pages**. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Open the **Actions** tab and wait 1–2 minutes for a **green tick** on **Deploy to GitHub Pages**. The tick also means all the automated tests passed. If any test fails, nothing gets published.
5. Every later update to `main` republishes the app by itself.

## Phase 0 checks (already passed)

The Home tab shows the C major chord diagram. **Diagrams** shows all 34 keyboard figures from the guide. The app installs from the browser: the Install button, or Share → Add to Home Screen on iPhone. It opens offline.
