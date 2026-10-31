import { describe, expect, it } from 'vitest';
import { scaleMidi, scaleSteps, spellScale } from './scales';
import { midiToNote } from './notes';

describe('scaleSteps', () => {
  it('major is W W H W W W H', () => {
    expect(scaleSteps('major')).toEqual(['W', 'W', 'H', 'W', 'W', 'W', 'H']);
  });
  it('natural minor is W H W W H W W', () => {
    expect(scaleSteps('naturalMinor')).toEqual(['W', 'H', 'W', 'W', 'H', 'W', 'W']);
  });
});

describe('scaleMidi', () => {
  it('C major from C4 lands on the white keys up to C5', () => {
    expect(scaleMidi('C4', 'major').map((n) => midiToNote(n))).toEqual([
      'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5',
    ]);
  });
  it('G major from G3 includes F#4', () => {
    expect(scaleMidi('G3', 'major').map((n) => midiToNote(n))).toContain('F#4');
  });
});

describe('spellScale', () => {
  it('spells each letter once', () => {
    expect(spellScale('G', 'major')).toEqual(['G', 'A', 'B', 'C', 'D', 'E', 'F#']);
    expect(spellScale('F', 'major')).toEqual(['F', 'G', 'A', 'Bb', 'C', 'D', 'E']);
    expect(spellScale('D', 'major')).toEqual(['D', 'E', 'F#', 'G', 'A', 'B', 'C#']);
    expect(spellScale('Eb', 'major')).toEqual(['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D']);
  });
  it('spells A natural minor with no accidentals and harmonic minor with G#', () => {
    expect(spellScale('A', 'naturalMinor')).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    expect(spellScale('A', 'harmonicMinor')).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G#']);
  });
});
