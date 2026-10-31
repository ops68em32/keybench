import { describe, expect, it } from 'vitest';
import { NoteStream } from './noteStream';
import type { NoteEvent } from './types';

const ev = (note: number, on: boolean, source: NoteEvent['source'] = 'mic'): NoteEvent => ({
  note,
  on,
  source,
  t: 0,
  velocity: on ? 80 : 0,
  confidence: 1,
});

describe('NoteStream', () => {
  it('delivers events to every subscriber until they unsubscribe', () => {
    const s = new NoteStream();
    const a: number[] = [];
    const b: number[] = [];
    const offA = s.subscribe((e) => a.push(e.note));
    s.subscribe((e) => b.push(e.note));
    s.emit(ev(60, true));
    offA();
    s.emit(ev(62, true));
    expect(a).toEqual([60]);
    expect(b).toEqual([60, 62]);
  });

  it('tracks held notes per source', () => {
    const s = new NoteStream();
    s.emit(ev(60, true, 'mic'));
    s.emit(ev(64, true, 'screen'));
    expect([...s.held.keys()].sort()).toEqual([60, 64]);
    s.emit(ev(60, false, 'mic'));
    expect([...s.held.keys()]).toEqual([64]);
  });

  it('releaseAll sends note-offs for one source only', () => {
    const s = new NoteStream();
    const offs: number[] = [];
    s.subscribe((e) => !e.on && offs.push(e.note));
    s.emit(ev(60, true, 'mic'));
    s.emit(ev(62, true, 'mic'));
    s.emit(ev(64, true, 'screen'));
    s.releaseAll('mic', 100);
    expect(offs.sort()).toEqual([60, 62]);
    expect([...s.held.keys()]).toEqual([64]);
  });
});
