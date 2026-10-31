// Metronome scheduler. Beat times are computed from a fixed anchor (anchor + k × period),
// never accumulated, so they cannot drift. A coarse timer wakes up every ~25 ms and hands
// every click due in the next 120 ms to the audio clock, which plays it sample-accurately
// ("lookahead scheduling"). All times are on the shared audio clock.

export interface ClockDeps {
  /** Current audio clock time, seconds. */
  now: () => number;
  /** Play a click at audio time `time` (seconds). */
  click: (time: number, accent: boolean, beat: number) => void;
  startTimer: (fn: () => void, ms: number) => unknown;
  stopTimer: (handle: unknown) => void;
}

export interface MetronomeOptions {
  bpm: number;
  beatsPerBar: number;
  countInBars: number;
  /** Seconds of clicks to schedule ahead (default 0.12). */
  lookahead?: number;
  /** How often the scheduler wakes up, ms (default 25). */
  tickMs?: number;
}

/** What graders need to know about the beat grid. Times in ms on the audio clock. */
export interface ClockRef {
  bpm: number;
  beatsPerBar: number;
  countInBeats: number;
  /** Time of beat 0, the first beat after the count-in. */
  t0: number;
  beatTime: (beat: number) => number;
  /** Nearest grid point (beats, or 1/subdivision beats) and the signed error: + is late. */
  nearestBeat: (tMs: number, subdivision?: number) => { beat: number; errorMs: number };
}

export class Metronome {
  private deps: ClockDeps;
  private opts: Required<MetronomeOptions>;
  private anchorTime = 0; // seconds
  private anchorBeat = 0;
  private period = 0.5;
  private nextBeat = 0;
  private timer: unknown = null;
  running = false;
  stats = { scheduled: 0, late: 0 };
  private listeners = new Set<(beat: number, time: number, accent: boolean) => void>();

  constructor(deps: ClockDeps, opts: MetronomeOptions) {
    this.deps = deps;
    this.opts = { lookahead: 0.12, tickMs: 25, ...opts };
    this.period = 60 / opts.bpm;
  }

  get bpm() {
    return this.opts.bpm;
  }

  /** Called as each click is scheduled (before it sounds); use the time to animate. */
  onBeat(fn: (beat: number, time: number, accent: boolean) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  start(): ClockRef {
    this.stop();
    const countIn = this.opts.countInBars * this.opts.beatsPerBar;
    this.period = 60 / this.opts.bpm;
    this.nextBeat = -countIn;
    this.anchorBeat = -countIn;
    this.anchorTime = this.deps.now() + 0.1; // a little room before the first click
    this.stats = { scheduled: 0, late: 0 };
    this.running = true;
    this.tick();
    this.timer = this.deps.startTimer(() => this.tick(), this.opts.tickMs);
    return this.ref();
  }

  stop() {
    if (this.timer !== null) this.deps.stopTimer(this.timer);
    this.timer = null;
    this.running = false;
  }

  /**
   * Change tempo from the next unscheduled beat on. The grid is re-anchored there, so
   * ClockRef times for beats before the change are no longer meaningful; graded runs
   * keep one tempo and change it between runs.
   */
  setBpm(bpm: number) {
    if (this.running) {
      this.anchorTime = this.beatTimeSec(this.nextBeat);
      this.anchorBeat = this.nextBeat;
    }
    this.opts.bpm = bpm;
    this.period = 60 / bpm;
  }

  private beatTimeSec(k: number): number {
    return this.anchorTime + (k - this.anchorBeat) * this.period;
  }

  private tick() {
    if (!this.running) return;
    const now = this.deps.now();
    while (this.beatTimeSec(this.nextBeat) < now + this.opts.lookahead) {
      const k = this.nextBeat;
      const time = this.beatTimeSec(k);
      if (time < now) this.stats.late++;
      const accent = ((k % this.opts.beatsPerBar) + this.opts.beatsPerBar) % this.opts.beatsPerBar === 0;
      this.deps.click(time, accent, k);
      this.stats.scheduled++;
      this.listeners.forEach((fn) => fn(k, time, accent));
      this.nextBeat++;
    }
  }

  /** A snapshot of the grid for graders (follows later tempo changes via the same anchor). */
  ref(): ClockRef {
    const beatTime = (k: number) => this.beatTimeSec(k) * 1000;
    return {
      bpm: this.opts.bpm,
      beatsPerBar: this.opts.beatsPerBar,
      countInBeats: this.opts.countInBars * this.opts.beatsPerBar,
      t0: beatTime(0),
      beatTime,
      nearestBeat: (tMs, subdivision = 1) => {
        const pos = this.anchorBeat + (tMs / 1000 - this.anchorTime) / this.period;
        const beat = Math.round(pos * subdivision) / subdivision;
        return { beat, errorMs: Math.round((tMs - beatTime(beat)) * 100) / 100 };
      },
    };
  }
}
