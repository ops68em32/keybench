import { describe, expect, it } from 'vitest';
import { gradeAgainstGrid, type GridRef } from './timing';
import type { NoteEvent } from '../../input/types';

// 120 BPM, beat 0 at t = 1000 ms.
const grid: GridRef = {
  beatTime: (k) => 1000 + k * 500,
  nearestBeat: (t, sub = 1) => {
    const beat = Math.round(((t - 1000) / 500) * sub) / sub;
    return { beat, errorMs: t - (1000 + beat * 500) };
  },
};

const on = (note: number, t: number): NoteEvent => ({ note, t, on: true, velocity: 80, source: 'mic', confidence: 1 });
const SCALE = [60, 62, 64, 65];

describe('gradeAgainstGrid', () => {
  it('reports the signed ms error of each note', () => {
    const r = gradeAgainstGrid([on(60, 1010), on(62, 1480), on(64, 2000), on(65, 2565)], SCALE, grid);
    expect(r.notes.map((n) => n.errorMs)).toEqual([10, -20, 0, 65]);
    expect(r.notes.every((n) => n.pitchOk)).toBe(true);
    expect(r.correct).toBe(4);
    expect(r.meanAbsErrorMs).toBeCloseTo(23.75);
    expect(r.meanSignedErrorMs).toBeCloseTo(13.75);
  });

  it('flags notes outside the tolerance and makes the run not clean', () => {
    const r = gradeAgainstGrid([on(60, 1000), on(62, 1500), on(64, 2100), on(65, 2500)], SCALE, grid, { toleranceMs: 80 });
    expect(r.notes[2].timeOk).toBe(false);
    expect(r.clean).toBe(false);
  });

  it('marks a wrong note and a missed note', () => {
    const r = gradeAgainstGrid([on(60, 1000), on(63, 1500), on(65, 2500)], SCALE, grid);
    expect(r.notes[1]).toMatchObject({ expected: 62, got: 63, pitchOk: false });
    expect(r.notes[2]).toMatchObject({ expected: 64, got: null, pitchOk: false, errorMs: null });
    expect(r.correct).toBe(2);
    expect(r.clean).toBe(false);
  });

  it('counts extra notes and ignores note-offs', () => {
    const off = { ...on(60, 1200), on: false };
    const r = gradeAgainstGrid([on(60, 1000), off, on(61, 1250), on(62, 1500), on(64, 2000), on(65, 2500)], SCALE, grid);
    expect(r.extra).toBe(1);
    expect(r.correct).toBe(4);
    expect(r.clean).toBe(false);
  });

  it('a perfect run is clean', () => {
    const r = gradeAgainstGrid(SCALE.map((n, i) => on(n, 1000 + i * 500 + 5)), SCALE, grid);
    expect(r.clean).toBe(true);
  });

  it('supports eighth notes and a later start beat', () => {
    const r = gradeAgainstGrid([on(60, 2000), on(62, 2250)], [60, 62], grid, { startBeat: 2, subdivision: 2 });
    expect(r.notes.map((n) => n.beat)).toEqual([2, 2.5]);
    expect(r.notes.map((n) => n.errorMs)).toEqual([0, 0]);
  });

  it('ignores octave when asked', () => {
    const r = gradeAgainstGrid([on(72, 1000)], [60], grid, { octaveMatters: false });
    expect(r.notes[0].pitchOk).toBe(true);
  });
});
