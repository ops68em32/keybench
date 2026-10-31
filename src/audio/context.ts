// One AudioContext for the whole app: metronome clicks and microphone samples share its
// clock, so timing comparisons can never drift apart. Tone.js runs on the same context.
import { setContext } from 'tone';

let ctx: AudioContext | null = null;

/** The shared context, created and resumed on first use (must follow a tap or click). */
export async function getAudioContext(): Promise<AudioContext> {
  if (!ctx) {
    ctx = new AudioContext({ latencyHint: 'interactive' });
    setContext(ctx);
  }
  if (ctx.state !== 'running') await ctx.resume();
  return ctx;
}

export function peekAudioContext(): AudioContext | null {
  return ctx;
}

/** Current audio clock time in ms (the timeline NoteEvents and beats use). */
export function audioNowMs(): number {
  return ctx ? ctx.currentTime * 1000 : performance.now();
}

/** setTimeout that fires when the audio clock reaches `tMs`. */
export function atAudioTime(tMs: number, fn: () => void): ReturnType<typeof setTimeout> {
  return setTimeout(fn, Math.max(0, tMs - audioNowMs()));
}

/**
 * Convert a performance.now() timestamp (MIDI, screen taps) to audio-clock ms: the point
 * in the audio timeline that was coming out of the speakers at that moment, which is
 * what the player was hearing when they pressed the key.
 */
export function perfToAudioMs(perfMs: number): number {
  if (!ctx) return perfMs;
  const ts = ctx.getOutputTimestamp?.();
  if (ts && ts.contextTime !== undefined && ts.performanceTime) {
    return ts.contextTime * 1000 + (perfMs - ts.performanceTime);
  }
  const outMs = ((ctx.outputLatency || 0) + (ctx.baseLatency || 0)) * 1000;
  return ctx.currentTime * 1000 + (perfMs - performance.now()) - outMs;
}

/** Best guess at mic delay before calibration (SPEC: roughly 40 to 80 ms); calibration replaces it. */
export function defaultMicLatencyMs(): number {
  if (!ctx) return 50;
  return Math.round(((ctx.outputLatency || 0) + (ctx.baseLatency || 0)) * 1000 + 30);
}
