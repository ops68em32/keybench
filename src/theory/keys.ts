import { chordSymbol, type ChordQuality } from './chords';
import { spellScale } from './scales';

export type Mode = 'major' | 'minor';

const SHARP_ORDER = ['F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'];
const FLAT_ORDER = ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'];

export interface KeySignature {
  sharps: string[];
  flats: string[];
}

/** Sharps or flats in the key signature, in the order they are written. */
export function keySignature(tonic: string, mode: Mode = 'major'): KeySignature {
  const major = mode === 'major' ? tonic : relativeMajor(tonic);
  const notes = spellScale(major, 'major');
  const sharps = SHARP_ORDER.filter((n) => notes.includes(n));
  const flats = FLAT_ORDER.filter((n) => notes.includes(n));
  return { sharps, flats };
}

/** The minor key sharing this major key's signature (6th degree). */
export function relativeMinor(majorTonic: string): string {
  return spellScale(majorTonic, 'major')[5];
}

/** The major key sharing this minor key's signature (3rd degree of natural minor). */
export function relativeMajor(minorTonic: string): string {
  return spellScale(minorTonic, 'naturalMinor')[2];
}

export interface DiatonicChord {
  degree: number;
  roman: string;
  symbol: string;
  root: string;
  quality: ChordQuality;
}

const MAJOR_DIATONIC: { roman: string; quality: ChordQuality }[] = [
  { roman: 'I', quality: 'maj' },
  { roman: 'ii', quality: 'min' },
  { roman: 'iii', quality: 'min' },
  { roman: 'IV', quality: 'maj' },
  { roman: 'V', quality: 'maj' },
  { roman: 'vi', quality: 'min' },
  { roman: 'vii°', quality: 'dim' },
];

/** The seven triads built on each degree of a major key. */
export function diatonicChords(majorTonic: string): DiatonicChord[] {
  const notes = spellScale(majorTonic, 'major');
  return MAJOR_DIATONIC.map((c, i) => ({
    degree: i + 1,
    roman: c.roman,
    root: notes[i],
    quality: c.quality,
    symbol: chordSymbol(notes[i], c.quality),
  }));
}
