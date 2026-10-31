// Monophonic note tracker for the microphone. Pure and synchronous so it can run
// inside the AudioWorklet and be tested in Node with synthetic signals.
//
// How it works, per 256-sample hop (~5 ms):
//  1. Onset: loudness over the last ~21 ms jumps well above its recent level (a key was
//     struck). The onset time is then refined to within a millisecond or so.
//  2. Pitch: once enough sound has arrived after the onset, McLeod pitch detection
//     (pitchy) runs on the newest samples. Short windows for high notes (fast),
//     longer ones for low notes (they need several cycles). A note is reported when
//     two looks agree, or one look is very clear.
//  3. Note-off when the sound fades below the threshold; legato changes of pitch
//     without a clear attack are caught by re-checking the pitch while a note sounds.
import { PitchDetector } from 'pitchy';

export interface TrackerOptions {
  sampleRate: number;
  /** RMS level (0..1) below which input is treated as silence. */
  threshold?: number;
  /** Minimum McLeod clarity (0..1) to trust a pitch. */
  minClarity?: number;
  minMidi?: number;
  maxMidi?: number;
}

export interface TrackerNote {
  type: 'on' | 'off';
  midi: number;
  /** Seconds, on the clock passed to push(). */
  time: number;
  velocity: number;
  confidence: number;
  /** For 'on': ms between the onset and the moment the pitch was known. */
  delayMs: number;
}

// Sample counts below are for 44.1/48 kHz and are scaled up at higher sample rates
// (many laptops run at 96 kHz), so every window keeps the same length in time.
const HOP = 256;
const SIZES = [1024, 2048, 3072];
// Onset detection uses two loudness measures over the last 1024 samples (~21 ms, at least
// one cycle of a C2): plain energy, and high-frequency energy (first difference of the
// signal), which a hammer strike floods while beating between ringing notes barely moves it.
// A strike is a jump well above both the recent minimum and the level from just before
// the attack entered the window.
const ONSET_WINDOW = 1024;
const ONSET_RATIO = 3;
const LOOKBACK = 4; // hops: ONSET_WINDOW / HOP
const SPAN = 32; // samples per step when refining the onset
const RESTRIKE_RATIO = 4; // the same pitch again needs a bigger jump to count as a re-strike
const HISTORY = 8; // hops of history (~43 ms)
const MIN_PERIODS = 3.5; // cycles a window must hold to trust its pitch
const GIVE_UP_SEC = 0.15; // no stable pitch by then: not a note

interface Pending {
  onset: number; // sample index
  peak: number; // peak hop energy so far
  cand: { midi: number; clarity: number } | null;
  /** Jump big enough to count even if the pitch matches the note already sounding. */
  strong: boolean;
  /** Loudness measures from before the strike, to keep judging how big the jump is. */
  preHf: number;
  preE: number;
}

interface Active {
  midi: number;
  lowHops: number;
  hopsSinceCheck: number;
  change: { midi: number; count: number; sample: number } | null;
}

export class PitchTracker {
  private sr: number;
  threshold: number;
  private minClarity: number;
  private minMidi: number;
  private maxMidi: number;

  /** Window sizes in samples at this sample rate. */
  private hopN: number;
  private sizes: number[];
  private onsetN: number;
  private spanN: number;
  private ringN: number;
  private ring: Float32Array;
  private written = 0;
  private hopFill = 0;
  private blockTime = 0;
  private blockStart = 0;
  // Loudness history; starts as silence so a note at the very start is still caught.
  private flux: number[] = new Array(HISTORY).fill(0);
  private energies: number[] = new Array(HISTORY).fill(0);
  private lastOnset = -Infinity;
  private pending: Pending | null = null;
  private active: Active | null = null;
  private detectors = new Map<number, PitchDetector<Float32Array>>();
  private windows = new Map<number, Float32Array>();
  /** Latest hop RMS, for level meters. */
  level = 0;

  constructor(o: TrackerOptions) {
    this.sr = o.sampleRate;
    this.threshold = o.threshold ?? 0.008;
    this.minClarity = o.minClarity ?? 0.88;
    this.minMidi = o.minMidi ?? 21;
    this.maxMidi = o.maxMidi ?? 108;
    const k = Math.max(1, Math.round(this.sr / 48000));
    this.hopN = HOP * k;
    this.sizes = SIZES.map((n) => n * k);
    this.onsetN = ONSET_WINDOW * k;
    this.spanN = SPAN * k;
    this.ringN = 8192 * k;
    this.ring = new Float32Array(this.ringN);
    for (const n of this.sizes) {
      const d = PitchDetector.forFloat32Array(n);
      d.clarityThreshold = 0.9;
      this.detectors.set(n, d);
      this.windows.set(n, new Float32Array(n));
    }
  }

  /** Feed one block of samples; `blockTime` is the time (s) of its first sample. */
  push(block: Float32Array, blockTime: number): TrackerNote[] {
    const out: TrackerNote[] = [];
    this.blockTime = blockTime;
    this.blockStart = this.written;
    for (let i = 0; i < block.length; i++) {
      this.ring[this.written % this.ringN] = block[i];
      this.written++;
      if (++this.hopFill === this.hopN) {
        this.hopFill = 0;
        this.hop(out);
      }
    }
    return out;
  }

  private timeOf(sample: number): number {
    return this.blockTime + (sample - this.blockStart) / this.sr;
  }

  private sample(i: number): number {
    return i < 0 ? 0 : this.ring[i % this.ringN];
  }

  private hop(out: TrackerNote[]) {
    const end = this.written;
    let e = 0;
    for (let i = end - this.hopN; i < end; i++) e += this.sample(i) ** 2;
    e /= this.hopN;
    this.level = Math.sqrt(e);
    const thrSq = this.threshold ** 2;

    let eL = 0;
    let hfL = 0;
    for (let i = end - this.onsetN; i < end; i++) {
      const x = this.sample(i);
      eL += x * x;
      hfL += (x - this.sample(i - 1)) ** 2;
    }
    eL /= this.onsetN;
    hfL /= this.onsetN;
    const jump = (v: number, h: number[], ratio: number) =>
      v > ratio * Math.min(...h) && v > ratio * h[h.length - LOOKBACK];
    const hfJump = jump(hfL, this.flux, ONSET_RATIO);
    const eJump = jump(eL, this.energies, ONSET_RATIO);
    const hfFloor = Math.min(...this.flux);
    const eFloor = Math.min(...this.energies);
    for (const [h, v] of [[this.flux, hfL], [this.energies, eL]] as const) {
      h.push(v);
      if (h.length > HISTORY) h.shift();
    }

    if (e > thrSq && (hfJump || eJump) && end - this.hopN - this.lastOnset > 0.06 * this.sr) {
      const onset = this.refineOnset(end, hfJump, hfJump ? hfFloor : eFloor);
      this.lastOnset = onset;
      this.pending = { onset, peak: e, cand: null, strong: false, preHf: hfFloor, preE: eFloor };
    }
    if (this.pending) {
      // The attack takes a few hops to fill the window, so keep measuring the jump.
      const p = this.pending;
      p.strong ||= hfL > RESTRIKE_RATIO * p.preHf || eL > RESTRIKE_RATIO * p.preE;
      this.resolvePending(out, e);
    } else if (this.active) {
      this.followActive(out, e, thrSq);
    }
  }

  /** First point in the onset window where a 32-sample RMS stands clearly above the old level. */
  private refineOnset(end: number, useHf: boolean, floorEnergy: number): number {
    const span = this.spanN;
    const limit = 9 * Math.max(floorEnergy, 1e-12) * span; // (3x RMS)^2 summed over the span
    const v = (i: number) => (useHf ? (this.sample(i) - this.sample(i - 1)) ** 2 : this.sample(i) ** 2);
    let sum = 0;
    const start = end - this.onsetN;
    for (let i = start; i < start + span; i++) sum += v(i);
    for (let i = start; i + span < end; i++) {
      if (sum > limit) return i;
      sum += v(i + span) - v(i);
    }
    return end - this.hopN;
  }

  private detect(size: number): { midi: number; clarity: number; periods: number } | null {
    const w = this.windows.get(size)!;
    const start = this.written - size;
    for (let i = 0; i < size; i++) w[i] = this.sample(start + i);
    const [freq, clarity] = this.detectors.get(size)!.findPitch(w, this.sr);
    if (!(freq > 0)) return null;
    const midi = Math.round(69 + 12 * Math.log2(freq / 440));
    return { midi, clarity, periods: (size * freq) / this.sr };
  }

  private resolvePending(out: TrackerNote[], e: number) {
    const p = this.pending!;
    p.peak = Math.max(p.peak, e);
    const since = this.written - p.onset;
    if (since > GIVE_UP_SEC * this.sr) {
      this.pending = null;
      return;
    }
    // Largest window that fits entirely after the onset.
    let size = 0;
    for (const n of this.sizes) if (n <= since) size = n;
    if (!size) return;
    const r = this.detect(size);
    const ok =
      r && r.clarity >= this.minClarity && r.periods >= MIN_PERIODS && r.midi >= this.minMidi && r.midi <= this.maxMidi;
    if (!ok) {
      // A short window may simply be too short for a low note; wait for a longer one.
      if (r && r.periods < MIN_PERIODS) p.cand = null;
      return;
    }
    const agree = p.cand && p.cand.midi === r.midi;
    if (agree || r.clarity >= 0.97) {
      if (this.active && this.active.midi === r.midi && !p.strong) {
        this.pending = null; // just the sounding note swelling (e.g. beating), not a new strike
        return;
      }
      const clarity = agree ? Math.max(p.cand!.clarity, r.clarity) : r.clarity;
      this.emitOn(out, r.midi, p.onset, p.peak, clarity);
      this.pending = null;
    } else {
      p.cand = { midi: r.midi, clarity: r.clarity };
    }
  }

  private followActive(out: TrackerNote[], e: number, thrSq: number) {
    const a = this.active!;
    if (e < thrSq * 0.5) {
      if (++a.lowHops >= 3) {
        out.push({ type: 'off', midi: a.midi, time: this.timeOf(this.written), velocity: 0, confidence: 1, delayMs: 0 });
        this.active = null;
      }
      return;
    }
    a.lowHops = 0;
    // Legato: a new pitch that arrived without a clear attack.
    if (++a.hopsSinceCheck < 3) return;
    a.hopsSinceCheck = 0;
    const r = this.detect(this.sizes[1]);
    if (!r || r.clarity < 0.95 || r.periods < MIN_PERIODS || r.midi === a.midi) {
      a.change = null;
      return;
    }
    if (a.change && a.change.midi === r.midi) {
      if (++a.change.count >= 2) this.emitOn(out, r.midi, a.change.sample, e, r.clarity);
    } else {
      a.change = { midi: r.midi, count: 1, sample: this.written - this.sizes[0] };
    }
  }

  private emitOn(out: TrackerNote[], midi: number, onset: number, peakEnergy: number, clarity: number) {
    const time = this.timeOf(onset);
    if (this.active) {
      out.push({ type: 'off', midi: this.active.midi, time, velocity: 0, confidence: 1, delayMs: 0 });
    }
    const db = 10 * Math.log10(Math.max(peakEnergy, 1e-10));
    const velocity = Math.max(1, Math.min(127, Math.round(((db + 60) / 60) * 127)));
    out.push({
      type: 'on',
      midi,
      time,
      velocity,
      confidence: Math.min(1, clarity),
      delayMs: ((this.written - onset) / this.sr) * 1000,
    });
    this.active = { midi, lowHops: 0, hopsSinceCheck: 0, change: null };
  }
}
