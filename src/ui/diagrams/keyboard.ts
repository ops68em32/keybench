// Port of keyboard() from the GUIDE.md appendix ("Appendix: diagram renderer").
// Geometry, colours and text are kept identical so the app matches the book;
// the only changes are types, returning a string instead of writing innerHTML,
// and escaping text. Captions are rendered by the React wrapper, not here.

import { midiToNote, noteToMidi } from '../../theory/notes';

export type Hand = 'R' | 'L' | 'root';

export interface KeyMark {
  /** Note name, e.g. "C4", "Eb4", "F#3". */
  n: string;
  hand: Hand;
  label?: string | number;
  /** Small text under the keyboard below this key. */
  sub?: string;
}

export interface KeyBracket {
  a: string;
  b: string;
  label: string;
}

export interface KeyStep {
  a: string;
  b: string;
  label: string;
  color?: string;
}

export interface KeyboardOptions {
  from: string;
  to: string;
  /** White key width (default 44) and height (default 132). */
  w?: number;
  h?: number;
  /** Letter names on white keys; with `octaves`, include the octave number. */
  names?: boolean;
  octaves?: boolean;
  /** Sharp and flat names on black keys. */
  blackNames?: boolean;
  /** "two" / "three" brackets over the black-key groups. */
  groups?: boolean;
  title?: string;
  aria?: string;
  marks?: KeyMark[];
  brackets?: KeyBracket[];
  steps?: KeyStep[];
  /** Lift left-hand marks so two chords can share one keyboard. */
  dual?: boolean;
}

const NOTE_IDX: Record<string, number> = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };
const HAS_SHARP: Record<string, boolean> = { C: true, D: true, F: true, G: true, A: true };
const SHARP_NAMES: Record<string, [string, string]> = {
  C: ['C♯', 'D♭'],
  D: ['D♯', 'E♭'],
  F: ['F♯', 'G♭'],
  G: ['G♯', 'A♭'],
  A: ['A♯', 'B♭'],
};
const WHITE = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const MONO = 'JetBrains Mono,Consolas,monospace';
const SANS = 'Source Sans 3,Segoe UI,sans-serif';

/** Normalise any spelling to the sharp-based name the renderer keys on ("Eb4" → "D#4"). */
function parse(n: string): { letter: string; acc: '' | '#'; oct: number } {
  const name = midiToNote(noteToMidi(n));
  const m = /^([A-G])(#?)(-?\d+)$/.exec(name)!;
  return { letter: m[1], acc: m[2] as '' | '#', oct: Number(m[3]) };
}

function whiteIndex(letter: string, oct: number): number {
  return oct * 7 + NOTE_IDX[letter];
}

export function whiteName(wi: number): string {
  return WHITE[wi % 7] + Math.floor(wi / 7);
}

/** White-key name `count` white keys above `from` (used for the diatonic-chord row). */
export function whiteKeyAbove(from: string, count: number): string {
  const p = parse(from);
  return whiteName(whiteIndex(p.letter, p.oct) + count);
}

function esc(s: string | number): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function keyboardSvg(o: KeyboardOptions): string {
  const W = o.w || 44,
    H = o.h || 132,
    BW = Math.round(W * 0.6),
    BH = Math.round(H * 0.62),
    pad = 6;
  const f = parse(o.from),
    t = parse(o.to);
  const w0 = whiteIndex(f.letter, f.oct),
    w1 = whiteIndex(t.letter, t.oct);
  const nW = w1 - w0 + 1;
  const nBr = (o.brackets || []).length;
  const topPad = nBr * 34 + (o.groups ? 26 : 0) + (o.title ? 26 : 0);
  const hasSub = (o.marks || []).some((m) => m.sub);
  const botPad = (o.steps && o.steps.length ? 34 : 0) + (hasSub ? 22 : 0);
  const width = nW * W + pad * 2,
    height = H + topPad + botPad + pad * 2;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" role="img" aria-label="${esc(o.aria || 'Piano keyboard diagram')}">`;
  const y0 = pad + topPad;
  if (o.title) {
    s += `<text x="${pad}" y="${pad + 16}" font-family="${MONO}" font-size="13" fill="var(--muted)" letter-spacing="1">${esc(o.title)}</text>`;
  }
  const whites: { x: number; letter: string; oct: number; name: string }[] = [];
  for (let i = 0; i < nW; i++) {
    const wi = w0 + i;
    whites.push({ x: pad + i * W, letter: WHITE[wi % 7], oct: Math.floor(wi / 7), name: whiteName(wi) });
  }
  whites.forEach((k) => {
    s += `<rect x="${k.x}" y="${y0}" width="${W}" height="${H}" fill="var(--wkey)" stroke="var(--wkey-line)" stroke-width="1"/>`;
  });
  const blacks: { x: number; name: string; letter: string }[] = [];
  whites.forEach((k, i) => {
    if (HAS_SHARP[k.letter] && i < nW - 1) blacks.push({ x: k.x + W - BW / 2, name: k.letter + '#' + k.oct, letter: k.letter });
  });
  blacks.forEach((b) => {
    s += `<rect x="${b.x}" y="${y0}" width="${BW}" height="${BH}" fill="var(--bkey)" rx="2"/>`;
  });
  if (o.names)
    whites.forEach((k) => {
      s += `<text x="${k.x + W / 2}" y="${y0 + H - 10}" text-anchor="middle" font-family="${MONO}" font-size="${W < 34 ? 11 : 13}" font-weight="500" fill="var(--muted)">${o.octaves ? k.name : k.letter}</text>`;
    });
  if (o.blackNames)
    blacks.forEach((b) => {
      const nm = SHARP_NAMES[b.letter];
      s += `<text x="${b.x + BW / 2}" y="${y0 + BH - 26}" text-anchor="middle" font-family="${MONO}" font-size="10" fill="var(--bkey-text)">${nm[0]}</text><text x="${b.x + BW / 2}" y="${y0 + BH - 12}" text-anchor="middle" font-family="${MONO}" font-size="10" fill="var(--bkey-text)">${nm[1]}</text>`;
    });
  if (o.groups) {
    blacks.forEach((b, i) => {
      if (b.letter === 'C' && blacks[i + 1]) {
        const b2 = blacks[i + 1];
        s += `<path d="M${b.x} ${y0 - 8} v-6 H${b2.x + BW} v6" fill="none" stroke="var(--muted)" stroke-width="1.2"/><text x="${(b.x + b2.x + BW) / 2}" y="${y0 - 18}" text-anchor="middle" font-size="12" font-family="${SANS}" fill="var(--muted)">two</text>`;
      }
      if (b.letter === 'F' && blacks[i + 2]) {
        const b3 = blacks[i + 2];
        s += `<path d="M${b.x} ${y0 - 8} v-6 H${b3.x + BW} v6" fill="none" stroke="var(--muted)" stroke-width="1.2"/><text x="${(b.x + b3.x + BW) / 2}" y="${y0 - 18}" text-anchor="middle" font-size="12" font-family="${SANS}" fill="var(--muted)">three</text>`;
      }
    });
  }
  function center(n: string): { x: number; y: number } | null {
    const p = parse(n);
    if (p.acc === '#') {
      const b = blacks.find((b) => b.name === p.letter + '#' + p.oct);
      return b ? { x: b.x + BW / 2, y: y0 + BH - 16 } : null;
    }
    const k = whites.find((k) => k.name === p.letter + p.oct);
    return k ? { x: k.x + W / 2, y: y0 + H - 34 } : null;
  }
  (o.brackets || []).forEach((br, bi) => {
    const a = center(br.a),
      b = center(br.b);
    if (!a || !b) return;
    const yy = y0 - 10 - bi * 34 - (o.groups ? 26 : 0);
    s += `<path d="M${a.x} ${yy} v-8 H${b.x} v8" fill="none" stroke="var(--rh)" stroke-width="1.5"/><text x="${(a.x + b.x) / 2}" y="${yy - 13}" text-anchor="middle" font-size="12" font-family="${MONO}" fill="var(--rh)">${esc(br.label)}</text>`;
  });
  (o.marks || []).forEach((m) => {
    const c = center(m.n);
    if (!c) return;
    const col = m.hand === 'L' ? 'var(--lh)' : m.hand === 'root' ? 'var(--root)' : 'var(--rh)';
    const ink = m.hand === 'L' ? 'var(--lh-ink)' : m.hand === 'root' ? '#fff' : 'var(--rh-ink)';
    const cy = m.hand === 'L' && o.dual ? c.y - 30 : c.y;
    s += `<circle cx="${c.x}" cy="${cy}" r="12" fill="${col}"/>`;
    if (m.label !== undefined)
      s += `<text x="${c.x}" y="${cy + 4.5}" text-anchor="middle" font-family="${MONO}" font-size="${String(m.label).length > 2 ? 9 : 12}" font-weight="700" fill="${ink}">${esc(m.label)}</text>`;
    if (m.sub)
      s += `<text x="${c.x}" y="${y0 + H + 16}" text-anchor="middle" font-family="${MONO}" font-size="11" fill="var(--muted)">${esc(m.sub)}</text>`;
  });
  (o.steps || []).forEach((st) => {
    const a = center(st.a),
      b = center(st.b);
    if (!a || !b) return;
    const yy = y0 + H + 8;
    const col = st.color || 'var(--lh)';
    s += `<path d="M${a.x} ${yy} v6 H${b.x} v-6" fill="none" stroke="${col}" stroke-width="1.5"/><text x="${(a.x + b.x) / 2}" y="${yy + 20}" text-anchor="middle" font-size="12" font-weight="700" font-family="${MONO}" fill="${col}">${esc(st.label)}</text>`;
  });
  s += '</svg>';
  return s;
}
