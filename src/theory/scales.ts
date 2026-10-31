import { noteToMidi } from './notes';
import { spellFrom } from './spelling';

export type ScaleType = 'major' | 'naturalMinor' | 'harmonicMinor';

/** Half steps between consecutive degrees, ending back on the tonic an octave up. */
const STEPS: Record<ScaleType, number[]> = {
  major: [2, 2, 1, 2, 2, 2, 1],
  naturalMinor: [2, 1, 2, 2, 1, 2, 2],
  harmonicMinor: [2, 1, 2, 2, 1, 3, 1],
};

export function scaleSteps(type: ScaleType): ('W' | 'H' | '3H')[] {
  return STEPS[type].map((s) => (s === 1 ? 'H' : s === 2 ? 'W' : '3H'));
}

/** Semitone offsets of the seven degrees from the tonic. */
export function scaleOffsets(type: ScaleType): number[] {
  const out = [0];
  for (const s of STEPS[type].slice(0, 6)) out.push(out[out.length - 1] + s);
  return out;
}

/** Eight MIDI notes from the tonic (with octave, e.g. "C4") up to the tonic an octave higher. */
export function scaleMidi(tonic: string, type: ScaleType): number[] {
  const start = noteToMidi(tonic);
  return [...scaleOffsets(type).map((o) => start + o), start + 12];
}

/** Seven note names, each letter used once (G major → … F#). */
export function spellScale(tonic: string, type: ScaleType): string[] {
  return spellFrom(tonic, scaleOffsets(type), [0, 1, 2, 3, 4, 5, 6]);
}
