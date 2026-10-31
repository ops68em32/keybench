export const HALF = 1;
export const WHOLE = 2;

const NAMES = [
  'unison',
  'minor 2nd',
  'major 2nd',
  'minor 3rd',
  'major 3rd',
  'perfect 4th',
  'tritone',
  'perfect 5th',
  'minor 6th',
  'major 6th',
  'minor 7th',
  'major 7th',
  'octave',
];

export function semitonesBetween(a: number, b: number): number {
  return b - a;
}

/** Simple interval name; direction is ignored and compound intervals are reduced. */
export function intervalName(semitones: number): string {
  const s = Math.abs(semitones);
  if (s === 0) return NAMES[0];
  const r = s % 12;
  return r === 0 ? NAMES[12] : NAMES[r];
}

/** 'H' for a half step, 'W' for a whole step, otherwise null. */
export function stepName(a: number, b: number): 'H' | 'W' | null {
  const d = Math.abs(b - a);
  return d === HALF ? 'H' : d === WHOLE ? 'W' : null;
}
