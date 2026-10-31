import { describe, expect, it } from 'vitest';
import {
  frequencyToMidi,
  isBlackKey,
  midiToFrequency,
  midiToNote,
  noteToMidi,
  parseNote,
  pitchClass,
  pretty,
} from './notes';

describe('noteToMidi', () => {
  it('puts middle C (C4) at 60 and A4 at 69', () => {
    expect(noteToMidi('C4')).toBe(60);
    expect(noteToMidi('A4')).toBe(69);
  });
  it('handles sharps, flats and their unicode forms', () => {
    expect(noteToMidi('C#4')).toBe(61);
    expect(noteToMidi('Db4')).toBe(61);
    expect(noteToMidi('E♭4')).toBe(63);
    expect(noteToMidi('F♯3')).toBe(54);
  });
  it('lets accidentals cross the octave boundary (B#3 = C4, Cb4 = B3)', () => {
    expect(noteToMidi('B#3')).toBe(60);
    expect(noteToMidi('Cb4')).toBe(59);
  });
  it('covers the piano range A0..C8', () => {
    expect(noteToMidi('A0')).toBe(21);
    expect(noteToMidi('C8')).toBe(108);
  });
  it('rejects nonsense', () => {
    expect(() => noteToMidi('H4')).toThrow();
    expect(() => noteToMidi('C')).toThrow();
  });
});

describe('parseNote', () => {
  it('splits letter, accidental and octave', () => {
    expect(parseNote('Bb3')).toEqual({ letter: 'B', accidental: -1, octave: 3 });
    expect(parseNote('F##5')).toEqual({ letter: 'F', accidental: 2, octave: 5 });
  });
});

describe('midiToNote', () => {
  it('names notes with sharps by default and flats on request', () => {
    expect(midiToNote(60)).toBe('C4');
    expect(midiToNote(61)).toBe('C#4');
    expect(midiToNote(61, { flats: true })).toBe('Db4');
    expect(midiToNote(21)).toBe('A0');
  });
  it('round-trips every piano key', () => {
    for (let m = 21; m <= 108; m++) expect(noteToMidi(midiToNote(m))).toBe(m);
  });
});

describe('pitch class and key colour', () => {
  it('pitchClass is 0..11 with C = 0', () => {
    expect(pitchClass(60)).toBe(0);
    expect(pitchClass(71)).toBe(11);
    expect(pitchClass(72)).toBe(0);
  });
  it('knows the five black keys in an octave', () => {
    const blacks = Array.from({ length: 12 }, (_, i) => 60 + i)
      .filter(isBlackKey)
      .map((m) => midiToNote(m));
    expect(blacks).toEqual(['C#4', 'D#4', 'F#4', 'G#4', 'A#4']);
  });
});

describe('frequency', () => {
  it('A4 is 440 Hz and middle C is about 261.63 Hz', () => {
    expect(midiToFrequency(69)).toBe(440);
    expect(midiToFrequency(60)).toBeCloseTo(261.63, 2);
  });
  it('frequencyToMidi inverts it (fractional for out-of-tune input)', () => {
    expect(frequencyToMidi(440)).toBeCloseTo(69, 6);
    expect(frequencyToMidi(261.63)).toBeCloseTo(60, 2);
    expect(Math.round(frequencyToMidi(452))).toBe(69); // ~47 cents sharp still rounds to A4
  });
});

describe('pretty', () => {
  it('uses real sharp and flat symbols for display', () => {
    expect(pretty('Eb')).toBe('E♭');
    expect(pretty('F#4')).toBe('F♯4');
  });
});
