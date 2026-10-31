import { mod12, noteToMidi, pitchClass, pitchToPc } from './notes';
import { spellFrom } from './spelling';

export type ChordQuality = 'maj' | 'min' | 'dim' | 'aug' | 'maj7' | 'dom7' | 'min7' | 'm7b5' | 'dim7';

/** Semitones above the root for each chord tone. */
export const CHORD_FORMULAS: Record<ChordQuality, number[]> = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  maj7: [0, 4, 7, 11],
  dom7: [0, 4, 7, 10],
  min7: [0, 3, 7, 10],
  m7b5: [0, 3, 6, 10],
  dim7: [0, 3, 6, 9],
};

/** Symbol suffix for each quality, and the extra spellings we accept when parsing. */
const SUFFIX: Record<ChordQuality, string> = {
  maj: '',
  min: 'm',
  dim: 'dim',
  aug: 'aug',
  maj7: 'maj7',
  dom7: '7',
  min7: 'm7',
  m7b5: 'm7b5',
  dim7: 'dim7',
};
const ALIASES: Record<string, ChordQuality> = {
  '': 'maj',
  M: 'maj',
  m: 'min',
  min: 'min',
  '-': 'min',
  dim: 'dim',
  '°': 'dim',
  aug: 'aug',
  '+': 'aug',
  maj7: 'maj7',
  M7: 'maj7',
  '7': 'dom7',
  m7: 'min7',
  min7: 'min7',
  m7b5: 'm7b5',
  ø: 'm7b5',
  dim7: 'dim7',
  '°7': 'dim7',
};

export interface ChordSymbol {
  root: string;
  quality: ChordQuality;
}

export function parseChordSymbol(symbol: string): ChordSymbol {
  const m = /^([A-G](?:#|b)?)(.*)$/.exec(symbol.trim().replace('♯', '#').replace('♭', 'b'));
  const quality = m ? ALIASES[m[2]] : undefined;
  if (!m || !quality) throw new Error(`Unknown chord symbol: "${symbol}"`);
  return { root: m[1], quality };
}

export function chordSymbol(root: string, quality: ChordQuality): string {
  return root + SUFFIX[quality];
}

/** Move the lowest note up an octave. */
export function invert(notes: number[]): number[] {
  const [low, ...rest] = notes;
  return [...rest, low + 12];
}

/** MIDI notes of a chord with its root in `octave`, optionally inverted. */
export function chordMidi(symbol: string, octave = 4, inversion = 0): number[] {
  const { root, quality } = parseChordSymbol(symbol);
  const base = noteToMidi(root + octave);
  let notes = CHORD_FORMULAS[quality].map((s) => base + s);
  for (let i = 0; i < inversion; i++) notes = invert(notes);
  return notes;
}

/** Note names stacked in thirds (Cm → C Eb G). */
export function spellChord(symbol: string): string[] {
  const { root, quality } = parseChordSymbol(symbol);
  const f = CHORD_FORMULAS[quality];
  return spellFrom(root, f, [0, 2, 4, 6].slice(0, f.length));
}

export interface IdentifiedChord extends ChordSymbol {
  symbol: string;
  /** 0 = root in the bass, 1 = third in the bass, 2 = fifth, 3 = seventh. */
  inversion: number;
}

/** Root names for identification; flats where the guide uses them. */
const ROOT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

// Triads first, then sevenths. A three-note G7 without its 5th (B F G) is accepted too,
// because the guide teaches exactly that left-hand voicing.
const MATCH_ORDER: { quality: ChordQuality; pcs: number[] }[] = [
  ...(['maj', 'min', 'dim', 'aug', 'maj7', 'dom7', 'min7', 'm7b5', 'dim7'] as ChordQuality[]).map((q) => ({
    quality: q,
    pcs: CHORD_FORMULAS[q],
  })),
  { quality: 'dom7', pcs: [0, 4, 10] },
];

/** Name the chord formed by a set of MIDI notes, or null if it is not a known chord. */
export function identifyChord(notes: number[]): IdentifiedChord | null {
  if (notes.length < 3) return null;
  const sorted = [...notes].sort((a, b) => a - b);
  const pcs = [...new Set(sorted.map(pitchClass))];
  const bass = pitchClass(sorted[0]);
  for (const { quality, pcs: formula } of MATCH_ORDER) {
    if (formula.length !== pcs.length) continue;
    for (const rootPc of pcs) {
      const rel = pcs.map((p) => mod12(p - rootPc)).sort((a, b) => a - b);
      if (rel.every((r, i) => r === formula[i])) {
        const root = ROOT_NAMES[rootPc];
        const fullFormula = CHORD_FORMULAS[quality];
        const inversion = fullFormula.indexOf(mod12(bass - rootPc));
        return { symbol: chordSymbol(root, quality), root, quality, inversion: Math.max(0, inversion) };
      }
    }
  }
  return null;
}

/** Pitch class of a chord's root, handy for graders. */
export function chordRootPc(symbol: string): number {
  return pitchToPc(parseChordSymbol(symbol).root);
}

