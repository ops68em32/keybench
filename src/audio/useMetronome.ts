import { create } from 'zustand';
import type { ClockRef, Metronome } from './clock';
import { createMetronome } from './metronome';
import { peekAudioContext } from './context';

interface MetronomeState {
  bpm: number;
  beatsPerBar: number;
  countInBars: number;
  running: boolean;
  ref: ClockRef | null;
  /** Beat number currently sounding (negative during the count-in). */
  beat: number | null;
  late: number;
  setBpm: (bpm: number) => void;
  setBeatsPerBar: (n: number) => void;
  setCountIn: (bars: number) => void;
  /** Start; resolves with the beat grid once the first click is scheduled. */
  start: (opts?: { countInBars?: number }) => Promise<ClockRef>;
  stop: () => void;
}

let metronome: Metronome | null = null;
let unsub: (() => void) | null = null;
const timers = new Set<ReturnType<typeof setTimeout>>();

export const useMetronome = create<MetronomeState>((set, get) => ({
  bpm: 80,
  beatsPerBar: 4,
  countInBars: 1,
  running: false,
  ref: null,
  beat: null,
  late: 0,

  setBpm: (bpm) => {
    bpm = Math.max(30, Math.min(240, Math.round(bpm)));
    set({ bpm });
    if (metronome?.running) {
      metronome.setBpm(bpm);
      set({ ref: metronome.ref() });
    }
  },
  setBeatsPerBar: (beatsPerBar) => set({ beatsPerBar }),
  setCountIn: (countInBars) => set({ countInBars }),

  start: async (opts = {}) => {
    get().stop();
    const { bpm, beatsPerBar } = get();
    const countInBars = opts.countInBars ?? get().countInBars;
    metronome = await createMetronome({ bpm, beatsPerBar, countInBars });
    // Update the beat display when each click actually sounds, not when it is scheduled.
    unsub = metronome.onBeat((beat, time) => {
      const ctx = peekAudioContext();
      const delay = ctx ? (time - ctx.currentTime + (ctx.outputLatency || 0)) * 1000 : 0;
      const t = setTimeout(() => {
        timers.delete(t);
        set({ beat, late: metronome?.stats.late ?? 0 });
      }, Math.max(0, delay));
      timers.add(t);
    });
    const ref = metronome.start();
    set({ running: true, ref, beat: null, late: 0 });
    return ref;
  },

  stop: () => {
    unsub?.();
    unsub = null;
    metronome?.stop();
    metronome = null;
    timers.forEach(clearTimeout);
    timers.clear();
    set({ running: false, beat: null });
  },
}));
