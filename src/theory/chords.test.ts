import { describe, expect, it } from 'vitest';
import { chordMidi, identifyChord, invert, parseChordSymbol, spellChord } from './chords';
import { midiToNote, noteToMidi as m } from './notes';

const names = (ns: number[]) => ns.map((n) => midiToNote(n, { flats: true }));

describe('parseChordSymbol', () => {
  it('reads root and quality', () => {
    expect(parseChordSymbol('C')).toEqual({ root: 'C', quality: 'maj' });
    expect(parseChordSymbol('Am')).toEqual({ root: 'A', quality: 'min' });
    expect(parseChordSymbol('Bdim')).toEqual({ root: 'B', quality: 'dim' });
    expect(parseChordSymbol('G7')).toEqual({ root: 'G', quality: 'dom7' });
    expect(parseChordSymbol('Cmaj7')).toEqual({ root: 'C', quality: 'maj7' });
    expect(parseChordSymbol('Am7')).toEqual({ root: 'A', quality: 'min7' });
    expect(parseChordSymbol('Bb')).toEqual({ root: 'Bb', quality: 'maj' });
    expect(parseChordSymbol('F#m')).toEqual({ root: 'F#', quality: 'min' });
  });
  it('rejects unknown symbols', () => {
    expect(() => parseChordSymbol('Hsus')).toThrow();
  });
});

describe('chordMidi', () => {
  it('C major is root, +4, +3 (C E G)', () => {
    expect(names(chordMidi('C', 4))).toEqual(['C4', 'E4', 'G4']);
  });
  it('C minor drops only the middle note', () => {
    expect(names(chordMidi('Cm', 4))).toEqual(['C4', 'Eb4', 'G4']);
  });
  it('builds sevenths', () => {
    expect(names(chordMidi('G7', 3))).toEqual(['G3', 'B3', 'D4', 'F4']);
    expect(names(chordMidi('Am7', 3))).toEqual(['A3', 'C4', 'E4', 'G4']);
  });
  it('applies inversions like the guide (E G C, then G C E)', () => {
    expect(names(chordMidi('C', 4, 1))).toEqual(['E4', 'G4', 'C5']);
    expect(names(chordMidi('C', 4, 2))).toEqual(['G4', 'C5', 'E5']);
  });
});

describe('invert', () => {
  it('moves the lowest note up an octave', () => {
    expect(invert([60, 64, 67])).toEqual([64, 67, 72]);
  });
});

describe('spellChord', () => {
  it('stacks letters in thirds', () => {
    expect(spellChord('C')).toEqual(['C', 'E', 'G']);
    expect(spellChord('Cm')).toEqual(['C', 'Eb', 'G']);
    expect(spellChord('D')).toEqual(['D', 'F#', 'A']);
    expect(spellChord('G7')).toEqual(['G', 'B', 'D', 'F']);
    expect(spellChord('Bdim')).toEqual(['B', 'D', 'F']);
  });
});

describe('identifyChord', () => {
  it('names a root-position triad', () => {
    expect(identifyChord([m('C4'), m('E4'), m('G4')])).toEqual({
      symbol: 'C',
      root: 'C',
      quality: 'maj',
      inversion: 0,
    });
  });
  it('tells C major from C minor from F major', () => {
    expect(identifyChord([m('C4'), m('Eb4'), m('G4')])?.symbol).toBe('Cm');
    expect(identifyChord([m('F4'), m('A4'), m('C5')])?.symbol).toBe('F');
  });
  it('sees through inversions and doubled notes', () => {
    expect(identifyChord([m('C4'), m('F4'), m('A4')])).toMatchObject({ symbol: 'F', inversion: 2 });
    expect(identifyChord([m('B3'), m('D4'), m('G4')])).toMatchObject({ symbol: 'G', inversion: 1 });
    expect(identifyChord([m('C3'), m('C4'), m('E4'), m('G4')])?.symbol).toBe('C');
  });
  it('recognises the guide three-note G7 (B F G)', () => {
    expect(identifyChord([m('B2'), m('F3'), m('G3')])?.symbol).toBe('G7');
  });
  it('returns null for a non-chord', () => {
    expect(identifyChord([m('C4'), m('C#4'), m('D4')])).toBeNull();
  });
});
