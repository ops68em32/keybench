import { describe, expect, it } from 'vitest';
import { diatonicChords, keySignature, relativeMajor, relativeMinor } from './keys';

describe('keySignature', () => {
  it('C has none, G has F#, F has Bb, D has F# C#', () => {
    expect(keySignature('C')).toEqual({ sharps: [], flats: [] });
    expect(keySignature('G')).toEqual({ sharps: ['F#'], flats: [] });
    expect(keySignature('F')).toEqual({ sharps: [], flats: ['Bb'] });
    expect(keySignature('D')).toEqual({ sharps: ['F#', 'C#'], flats: [] });
    expect(keySignature('Eb').flats).toEqual(['Bb', 'Eb', 'Ab']);
  });
  it('minor keys share their relative major signature', () => {
    expect(keySignature('A', 'minor')).toEqual({ sharps: [], flats: [] });
    expect(keySignature('E', 'minor')).toEqual({ sharps: ['F#'], flats: [] });
    expect(keySignature('D', 'minor')).toEqual({ sharps: [], flats: ['Bb'] });
  });
});

describe('relative keys', () => {
  it('A minor is relative to C major, and back', () => {
    expect(relativeMinor('C')).toBe('A');
    expect(relativeMinor('G')).toBe('E');
    expect(relativeMinor('F')).toBe('D');
    expect(relativeMajor('A')).toBe('C');
    expect(relativeMajor('E')).toBe('G');
  });
});

describe('diatonicChords', () => {
  it('C major gives I ii iii IV V vi vii°', () => {
    expect(diatonicChords('C').map((c) => `${c.roman} ${c.symbol}`)).toEqual([
      'I C', 'ii Dm', 'iii Em', 'IV F', 'V G', 'vi Am', 'vii° Bdim',
    ]);
  });
  it('G major has a D chord and F#dim', () => {
    expect(diatonicChords('G').map((c) => c.symbol)).toEqual(['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim']);
  });
});
