// Note names <-> MIDI numbers. Middle C (C4) = 60, A4 = 69 = 440 Hz.
// Internally accidentals are ASCII ('#', 'b'); pretty() turns them into ♯ ♭ for display.

export type Letter = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';

export const LETTERS: readonly Letter[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

/** Pitch class of each natural letter (C = 0). */
export const LETTER_PC: Record<Letter, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export interface ParsedNote {
  letter: Letter;
  /** -2..2: double flat .. double sharp */
  accidental: number;
  octave: number;
}

const NOTE_RE = /^([A-G])(##|bb|#|b|♯♯|♭♭|♯|♭|x)?(-?\d)$/;
const PC_RE = /^([A-G])(##|bb|#|b|♯♯|♭♭|♯|♭|x)?$/;

function accidentalValue(a: string | undefined): number {
  switch (a) {
    case '#':
    case '♯':
      return 1;
    case '##':
    case '♯♯':
    case 'x':
      return 2;
    case 'b':
    case '♭':
      return -1;
    case 'bb':
    case '♭♭':
      return -2;
    default:
      return 0;
  }
}

export function accidentalString(n: number): string {
  return n > 0 ? '#'.repeat(n) : 'b'.repeat(-n);
}

export function parseNote(name: string): ParsedNote {
  const m = NOTE_RE.exec(name.trim());
  if (!m) throw new Error(`Not a note name: "${name}"`);
  return { letter: m[1] as Letter, accidental: accidentalValue(m[2]), octave: Number(m[3]) };
}

/** Parse a pitch name without octave, e.g. "F#" or "Bb". */
export function parsePitch(name: string): { letter: Letter; accidental: number } {
  const m = PC_RE.exec(name.trim());
  if (!m) throw new Error(`Not a pitch name: "${name}"`);
  return { letter: m[1] as Letter, accidental: accidentalValue(m[2]) };
}

export function noteToMidi(name: string): number {
  const p = parseNote(name);
  return (p.octave + 1) * 12 + LETTER_PC[p.letter] + p.accidental;
}

/** Pitch class (0..11) of a pitch name without octave. */
export function pitchToPc(name: string): number {
  const p = parsePitch(name);
  return mod12(LETTER_PC[p.letter] + p.accidental);
}

export function midiToNote(midi: number, opts: { flats?: boolean } = {}): string {
  const names = opts.flats ? FLAT_NAMES : SHARP_NAMES;
  return names[mod12(midi)] + (Math.floor(midi / 12) - 1);
}

export function pcName(pc: number, opts: { flats?: boolean } = {}): string {
  return (opts.flats ? FLAT_NAMES : SHARP_NAMES)[mod12(pc)];
}

export function mod12(n: number): number {
  return ((n % 12) + 12) % 12;
}

export function pitchClass(midi: number): number {
  return mod12(midi);
}

export function isBlackKey(midi: number): boolean {
  return [1, 3, 6, 8, 10].includes(mod12(midi));
}

export function midiToFrequency(midi: number, a4 = 440): number {
  return a4 * Math.pow(2, (midi - 69) / 12);
}

/** Fractional MIDI number for a frequency; round it to get the nearest key. */
export function frequencyToMidi(freq: number, a4 = 440): number {
  return 69 + 12 * Math.log2(freq / a4);
}

/** Display form with real ♯ / ♭ symbols. */
export function pretty(name: string): string {
  return name.replace(/#/g, '♯').replace(/(?<=[A-G])b/g, '♭').replace(/♭b/g, '♭♭');
}
