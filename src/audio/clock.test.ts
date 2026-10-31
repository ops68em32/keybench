import { describe, expect, it } from 'vitest';
import { Metronome, type ClockDeps } from './clock';

/** A fake audio clock plus a timer that fires late and irregularly, like a busy browser tab. */
function fakeDeps(jitter: (i: number) => number) {
  let now = 10; // audio clocks do not start at zero
  const clicks: { time: number; accent: boolean; beat: number }[] = [];
  let fn: (() => void) | null = null;
  const deps: ClockDeps = {
    now: () => now,
    click: (time, accent, beat) => clicks.push({ time, accent, beat }),
    startTimer: (f) => {
      fn = f;
      return 1;
    },
    stopTimer: () => {
      fn = null;
    },
  };
  /** Advance the clock by `sec`, firing the timer every ~25 ms plus jitter. */
  const advance = (sec: number) => {
    const target = now + sec;
    let i = 0;
    while (now < target && fn) {
      now += 0.025 + jitter(i++);
      fn();
    }
  };
  return { deps, clicks, advance, getNow: () => now };
}

describe('Metronome', () => {
  it('does not drift: after 5 minutes at 120 BPM every click is exactly on the grid', () => {
    const f = fakeDeps((i) => ((i * 7919) % 13) / 1000); // 0..12 ms of timer jitter
    const m = new Metronome(f.deps, { bpm: 120, beatsPerBar: 4, countInBars: 0 });
    const ref = m.start();
    f.advance(300);
    const beats = f.clicks.filter((c) => c.time <= ref.t0 / 1000 + 300);
    expect(beats.length).toBe(601); // beats 0..600
    beats.forEach((c, k) => expect(c.time).toBeCloseTo(ref.t0 / 1000 + k * 0.5, 9));
    expect(m.stats.late).toBe(0);
  });

  it('accents the first beat of each bar', () => {
    const f = fakeDeps(() => 0);
    const m = new Metronome(f.deps, { bpm: 90, beatsPerBar: 3, countInBars: 0 });
    m.start();
    f.advance(5);
    expect(f.clicks.slice(0, 7).map((c) => c.accent)).toEqual([true, false, false, true, false, false, true]);
  });

  it('plays a count-in before beat 0', () => {
    const f = fakeDeps(() => 0);
    const m = new Metronome(f.deps, { bpm: 60, beatsPerBar: 4, countInBars: 1 });
    const ref = m.start();
    f.advance(6);
    expect(f.clicks.slice(0, 5).map((c) => c.beat)).toEqual([-4, -3, -2, -1, 0]);
    expect(f.clicks[4].time * 1000).toBeCloseTo(ref.t0, 6);
    expect(ref.countInBeats).toBe(4);
  });

  it('schedules ahead so a click is never late when the timer stalls briefly', () => {
    const f = fakeDeps((i) => (i % 40 === 39 ? 0.08 : 0)); // an 80 ms stall every second
    const m = new Metronome(f.deps, { bpm: 150, beatsPerBar: 4, countInBars: 0 });
    m.start();
    f.advance(30);
    expect(m.stats.late).toBe(0);
  });

  it('counts clicks it could not schedule in time (tab asleep)', () => {
    const f = fakeDeps((i) => (i === 10 ? 2 : 0)); // the timer stops for 2 seconds
    const m = new Metronome(f.deps, { bpm: 120, beatsPerBar: 4, countInBars: 0 });
    m.start();
    f.advance(5);
    expect(m.stats.late).toBeGreaterThan(0);
  });

  it('changes tempo on the next beat without a jump in the grid', () => {
    const f = fakeDeps(() => 0);
    const m = new Metronome(f.deps, { bpm: 60, beatsPerBar: 4, countInBars: 0 });
    m.start();
    f.advance(2.05);
    m.setBpm(120);
    f.advance(3);
    const times = f.clicks.map((c) => c.time);
    const gaps = times.slice(1).map((t, i) => +(t - times[i]).toFixed(6));
    expect(gaps.slice(0, 2)).toEqual([1, 1]);
    expect(gaps.slice(-3)).toEqual([0.5, 0.5, 0.5]);
    // the clock reference used for grading follows the change
    const k = f.clicks.length - 1;
    expect(m.ref().beatTime(k)).toBeCloseTo(times[k] * 1000, 6);
  });

  it('stops clicking when stopped', () => {
    const f = fakeDeps(() => 0);
    const m = new Metronome(f.deps, { bpm: 120, beatsPerBar: 4, countInBars: 0 });
    m.start();
    f.advance(1);
    m.stop();
    const n = f.clicks.length;
    f.advance(1);
    expect(f.clicks.length).toBe(n);
    expect(m.running).toBe(false);
  });
});

describe('ClockRef', () => {
  it('finds the nearest beat and the signed error in ms', () => {
    const f = fakeDeps(() => 0);
    const m = new Metronome(f.deps, { bpm: 120, beatsPerBar: 4, countInBars: 0 });
    const ref = m.start();
    expect(ref.nearestBeat(ref.t0 + 1000 + 30)).toEqual({ beat: 2, errorMs: 30 });
    expect(ref.nearestBeat(ref.t0 + 1500 - 45)).toEqual({ beat: 3, errorMs: -45 });
    // half-beat grid (eighth notes)
    expect(ref.nearestBeat(ref.t0 + 260, 2)).toEqual({ beat: 0.5, errorMs: 10 });
  });
});
