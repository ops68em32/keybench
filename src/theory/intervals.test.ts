import { describe, expect, it } from 'vitest';
import { intervalName, semitonesBetween, stepName } from './intervals';
import { noteToMidi as m } from './notes';

describe('semitonesBetween', () => {
  it('counts half steps upward and downward', () => {
    expect(semitonesBetween(m('C4'), m('E4'))).toBe(4);
    expect(semitonesBetween(m('C4'), m('G4'))).toBe(7);
    expect(semitonesBetween(m('G4'), m('C4'))).toBe(-7);
  });
});

describe('intervalName', () => {
  it('names the guide intervals', () => {
    expect(intervalName(0)).toBe('unison');
    expect(intervalName(3)).toBe('minor 3rd');
    expect(intervalName(4)).toBe('major 3rd');
    expect(intervalName(6)).toBe('tritone');
    expect(intervalName(7)).toBe('perfect 5th');
    expect(intervalName(12)).toBe('octave');
  });
  it('ignores direction', () => {
    expect(intervalName(-4)).toBe('major 3rd');
  });
  it('reduces compound intervals to their simple name', () => {
    expect(intervalName(16)).toBe('major 3rd');
    expect(intervalName(24)).toBe('octave');
  });
});

describe('stepName', () => {
  it('E-F and B-C are half steps, C-D is a whole step', () => {
    expect(stepName(m('E4'), m('F4'))).toBe('H');
    expect(stepName(m('B4'), m('C5'))).toBe('H');
    expect(stepName(m('C4'), m('D4'))).toBe('W');
    expect(stepName(m('C4'), m('E4'))).toBeNull();
  });
});
