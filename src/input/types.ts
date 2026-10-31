export type NoteSource = 'mic' | 'midi' | 'screen';

/**
 * One note starting or stopping, from any input. The only thing drills ever see.
 *
 * `t` is milliseconds on the shared audio clock (AudioContext time × 1000), already
 * corrected for input latency, so it can be compared directly with metronome beat times.
 */
export interface NoteEvent {
  note: number;
  velocity: number;
  t: number;
  on: boolean;
  source: NoteSource;
  /** 0..1. Mic events carry the pitch detector's clarity; MIDI and screen are 1. */
  confidence: number;
  /** Mic only: how long detection took after the note began (ms). */
  delayMs?: number;
}
