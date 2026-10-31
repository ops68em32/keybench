import { LETTERS, LETTER_PC, accidentalString, mod12, parsePitch, type Letter } from './notes';

/** The letter `steps` letters above `letter` (C + 2 = E). */
export function letterAbove(letter: Letter, steps: number): Letter {
  return LETTERS[(LETTERS.indexOf(letter) + steps) % 7];
}

/** Name `pc` using `letter`, adding whatever accidental is needed (pc 6 on F = "F#"). */
export function spellWithLetter(letter: Letter, pc: number): string {
  let diff = mod12(pc - LETTER_PC[letter]);
  if (diff > 6) diff -= 12;
  return letter + accidentalString(diff);
}

/**
 * Spell pitch classes that sit on consecutive letter steps above a root,
 * e.g. scale degrees (steps 0..6) or chord tones (steps 0,2,4,6).
 */
export function spellFrom(root: string, offsets: number[], letterSteps: number[]): string[] {
  const r = parsePitch(root);
  const rootPc = LETTER_PC[r.letter] + r.accidental;
  return offsets.map((semi, i) => spellWithLetter(letterAbove(r.letter, letterSteps[i]), rootPc + semi));
}
