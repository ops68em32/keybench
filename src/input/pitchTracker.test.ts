import { describe, expect, it } from 'vitest';
import { PitchTracker, type TrackerNote } from './pitchTracker';
import { pianoLikeSignal, type ToneSpec } from './testSignal';
import { noteToMidi } from '../theory/notes';

const SR = 48000;

/** Feed a signal through the tracker in 128-sample blocks, like an AudioWorklet does. */
function run(signal: Float32Array, opts: Partial<ConstructorParameters<typeof PitchTracker>[0]> = {}, sr = SR) {
  const tracker = new PitchTracker({ sampleRate: sr, ...opts });
  const events: TrackerNote[] = [];
  for (let i = 0; i < signal.length; i += 128) {
    events.push(...tracker.push(signal.subarray(i, i + 128), i / sr));
  }
  return events;
}

const ons = (e: TrackerNote[]) => e.filter((x) => x.type === 'on');

describe('PitchTracker on piano-like tones', () => {
  for (const sr of [48000, 44100, 96000]) {
    it(`names at least 95% of the notes from C2 to C6 correctly at ${sr / 1000} kHz, within 100 ms`, () => {
      const notes: ToneSpec[] = [];
      for (let m = noteToMidi('C2'), k = 0; m <= noteToMidi('C6'); m++, k++) notes.push({ midi: m, start: 0.2 + k * 0.45, dur: 0.38 });
      const sig = pianoLikeSignal(notes, sr, 0.2 + notes.length * 0.45 + 0.5);
      const got = ons(run(sig, {}, sr));

      let correct = 0;
      const delays: number[] = [];
      for (const n of notes) {
        const hit = got.find((e) => Math.abs(e.time - n.start) < 0.05);
        if (hit && hit.midi === n.midi) {
          correct++;
          delays.push(hit.delayMs);
          expect(Math.abs(hit.time - n.start) * 1000).toBeLessThan(8); // onset timing
        }
      }
      expect(correct / notes.length).toBeGreaterThanOrEqual(0.95);
      expect(Math.max(...delays)).toBeLessThan(100);
      expect(got.length).toBeLessThanOrEqual(notes.length + 1); // no flood of phantom notes
    });
  }

  it('hears a repeated note as separate notes', () => {
    const sig = pianoLikeSignal(
      [0.2, 0.6, 1.0].map((start) => ({ midi: 60, start, dur: 0.6 })), // no gap: re-struck while ringing
      SR,
      2,
    );
    const got = ons(run(sig));
    expect(got.map((e) => e.midi)).toEqual([60, 60, 60]);
  });

  it('follows a quick legato scale (C major at 120 BPM eighth notes)', () => {
    const scale = [60, 62, 64, 65, 67, 69, 71, 72];
    const sig = pianoLikeSignal(scale.map((midi, i) => ({ midi, start: 0.2 + i * 0.25, dur: 0.3 })), SR, 3);
    expect(ons(run(sig)).map((e) => e.midi)).toEqual(scale);
  });

  it('catches a note at the very first sample', () => {
    const sig = pianoLikeSignal([{ midi: 64, start: 0, dur: 0.5 }], SR, 1);
    expect(ons(run(sig)).map((e) => e.midi)).toEqual([64]);
  });

  it('stays silent on room noise below the threshold', () => {
    const sig = pianoLikeSignal([], SR, 2, 0.003);
    expect(run(sig, { threshold: 0.01 })).toEqual([]);
  });

  it('ignores a note quieter than the threshold', () => {
    const sig = pianoLikeSignal([{ midi: 60, start: 0.2, dur: 0.5, amp: 0.004 }], SR, 1);
    expect(ons(run(sig, { threshold: 0.01 }))).toEqual([]);
  });

  it('sends a note-off once the sound dies away', () => {
    const sig = pianoLikeSignal([{ midi: 67, start: 0.2, dur: 0.4 }], SR, 2);
    const got = run(sig);
    expect(got.map((e) => e.type)).toEqual(['on', 'off']);
    expect(got[1].midi).toBe(67);
    expect(got[1].time).toBeGreaterThan(0.6);
  });

  it('gives louder notes a higher velocity', () => {
    const soft = ons(run(pianoLikeSignal([{ midi: 60, start: 0.2, dur: 0.5, amp: 0.05 }], SR, 1)))[0];
    const loud = ons(run(pianoLikeSignal([{ midi: 60, start: 0.2, dur: 0.5, amp: 0.5 }], SR, 1)))[0];
    expect(loud.velocity).toBeGreaterThan(soft.velocity);
  });
});
