import { describe, expect, it } from 'vitest';
import { keyboardSvg, whiteKeyAbove } from './keyboard';

// The guide's "kb-c" figure.
const C_MAJOR = {
  from: 'C4',
  to: 'B4',
  names: true,
  w: 38,
  marks: [
    { n: 'C4', hand: 'root' as const, label: '1' },
    { n: 'E4', hand: 'R' as const, label: '3' },
    { n: 'G4', hand: 'R' as const, label: '5' },
  ],
  steps: [
    { a: 'C4', b: 'E4', label: '4 half steps', color: 'var(--rh)' },
    { a: 'E4', b: 'G4', label: '3', color: 'var(--rh)' },
  ],
  title: 'C major  ·  C E G',
};

const count = (s: string, re: RegExp) => (s.match(re) || []).length;

describe('keyboardSvg', () => {
  it('draws one octave as 7 white and 5 black keys', () => {
    const svg = keyboardSvg({ from: 'C4', to: 'B4' });
    expect(count(svg, /fill="var\(--wkey\)"/g)).toBe(7);
    expect(count(svg, /fill="var\(--bkey\)"/g)).toBe(5);
  });

  it('matches the guide geometry for the C major chord figure', () => {
    const svg = keyboardSvg(C_MAJOR);
    // width = 7 keys * 38 + 2 * 6 padding
    expect(svg).toContain('viewBox="0 0 278 ');
    // root C4 in the root colour, centred on the first white key (6 + 38/2 = 25)
    expect(svg).toContain('<circle cx="25" cy="');
    expect(svg).toMatch(/<circle cx="25" cy="[\d.]+" r="12" fill="var\(--root\)"\/>/);
    // E4 and G4 in the right-hand colour
    expect(count(svg, /r="12" fill="var\(--rh\)"/g)).toBe(2);
    expect(svg).toContain('C major  ·  C E G');
    expect(svg).toContain('4 half steps');
  });

  it('places flats on the matching black key', () => {
    const svg = keyboardSvg({ from: 'C4', to: 'B4', marks: [{ n: 'Eb4', hand: 'R' }] });
    // D#4 black key x = 6 + 44 * 2 - 26/2 = 81, centre = 81 + 13 = 94
    expect(svg).toContain('<circle cx="94"');
  });

  it('lifts left-hand marks in dual mode', () => {
    const one = keyboardSvg({ from: 'C4', to: 'B4', marks: [{ n: 'C4', hand: 'L' }] });
    const dual = keyboardSvg({ from: 'C4', to: 'B4', dual: true, marks: [{ n: 'C4', hand: 'L' }] });
    const cy = (s: string) => Number(/cy="([\d.]+)"/.exec(s)![1]);
    expect(cy(one) - cy(dual)).toBe(30);
  });

  it('escapes text so labels cannot inject markup', () => {
    const svg = keyboardSvg({ from: 'C4', to: 'B4', title: '<script>' });
    expect(svg).not.toContain('<script>');
    expect(svg).toContain('&lt;script&gt;');
  });
});

describe('whiteKeyAbove', () => {
  it('counts white keys', () => {
    expect(whiteKeyAbove('C4', 5)).toBe('A4');
    expect(whiteKeyAbove('B4', 5)).toBe('G5');
  });
});
