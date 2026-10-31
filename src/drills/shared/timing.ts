// Shared grading primitive: line up played notes with an expected sequence on a beat grid
// and report pitch and signed timing error per note (SPEC "Grading primitives").
import type { NoteEvent } from '../../input/types';
import type { ClockRef } from '../../audio/clock';

export type GridRef = Pick<ClockRef, 'beatTime' | 'nearestBeat'>;

export interface GridOptions {
  /** Beat of the first expected note (default 0, the first beat after the count-in). */
  startBeat?: number;
  /** Notes per beat: 1 = quarters, 2 = eighths (default 1). */
  subdivision?: number;
  /** Largest |error| that still counts as on time (default 80 ms, the tempo-ladder tolerance). */
  toleranceMs?: number;
  /** When false, C4 and C5 count as the same note (default true). */
  octaveMatters?: boolean;
}

export interface GradedNote {
  index: number;
  beat: number;
  expected: number;
  got: number | null;
  /** Signed: positive = late. Null when nothing was played for this slot. */
  errorMs: number | null;
  pitchOk: boolean;
  timeOk: boolean;
}

export interface GridResult {
  notes: GradedNote[];
  correct: number;
  extra: number;
  clean: boolean;
  meanAbsErrorMs: number;
  meanSignedErrorMs: number;
}

export function gradeAgainstGrid(events: NoteEvent[], expected: number[], grid: GridRef, o: GridOptions = {}): GridResult {
  const startBeat = o.startBeat ?? 0;
  const sub = o.subdivision ?? 1;
  const tol = o.toleranceMs ?? 80;
  const octave = o.octaveMatters ?? true;
  const slotMs = grid.beatTime(startBeat + 1) - grid.beatTime(startBeat);
  const half = slotMs / sub / 2;

  const ons = events.filter((e) => e.on).sort((a, b) => a.t - b.t);
  const used = new Set<number>();
  const notes: GradedNote[] = expected.map((exp, index) => {
    const beat = startBeat + index / sub;
    const at = grid.beatTime(beat);
    // The closest unused note-on within half a slot of this grid point.
    let best = -1;
    for (let i = 0; i < ons.length; i++) {
      if (used.has(i)) continue;
      const d = Math.abs(ons[i].t - at);
      if (d <= half && (best < 0 || d < Math.abs(ons[best].t - at))) best = i;
    }
    if (best < 0) return { index, beat, expected: exp, got: null, errorMs: null, pitchOk: false, timeOk: false };
    used.add(best);
    const got = ons[best].note;
    const errorMs = Math.round((ons[best].t - at) * 100) / 100;
    const pitchOk = octave ? got === exp : (((got - exp) % 12) + 12) % 12 === 0;
    return { index, beat, expected: exp, got, errorMs, pitchOk, timeOk: Math.abs(errorMs) <= tol };
  });

  // Note-ons between the first and last slot that matched nothing are extras.
  const lo = grid.beatTime(startBeat) - half;
  const hi = grid.beatTime(startBeat + (expected.length - 1) / sub) + half;
  const extra = ons.filter((e, i) => !used.has(i) && e.t >= lo && e.t <= hi).length;

  const timed = notes.filter((n) => n.errorMs !== null).map((n) => n.errorMs!);
  const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
  const correct = notes.filter((n) => n.pitchOk).length;
  return {
    notes,
    correct,
    extra,
    clean: extra === 0 && notes.every((n) => n.pitchOk && n.timeOk),
    meanAbsErrorMs: mean(timed.map(Math.abs)),
    meanSignedErrorMs: mean(timed),
  };
}
