import type { NoteEvent, NoteSource } from './types';

type Listener = (e: NoteEvent) => void;

/** The single stream every input writes to and every drill reads from. */
export class NoteStream {
  private listeners = new Set<Listener>();
  /** Notes currently down, and which input is holding each one. */
  readonly held = new Map<number, NoteSource>();

  emit(e: NoteEvent) {
    if (e.on) this.held.set(e.note, e.source);
    else if (this.held.get(e.note) === e.source) this.held.delete(e.note);
    this.listeners.forEach((fn) => fn(e));
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  /** Release everything one input is holding (e.g. the mic was switched off). */
  releaseAll(source: NoteSource, t: number) {
    for (const [note, s] of [...this.held]) {
      if (s === source) this.emit({ note, velocity: 0, t, on: false, source, confidence: 1 });
    }
  }
}

export const noteStream = new NoteStream();
