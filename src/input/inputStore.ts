// Owns the inputs and turns everything into NoteEvents on noteStream.
// Rule: the microphone is the default; when a MIDI device is connected (and the
// preference is not "mic only") MIDI takes over and mic notes are ignored.
import { create } from 'zustand';
import { audioNowMs, defaultMicLatencyMs, getAudioContext, perfToAudioMs } from '../audio/context';
import { useSettings } from '../store/settings';
import { startMic, startTestInput, type MicHandle } from './mic';
import { midiPermission, midiSupported, startMidi } from './midi';
import { noteStream } from './noteStream';
import type { TrackerNote } from './pitchTracker';

export type MicStatus = 'off' | 'starting' | 'listening' | 'denied' | 'error';
export type MidiStatus = 'unsupported' | 'off' | 'on';

interface InputState {
  mic: MicStatus;
  micError: string | null;
  /** True when the detector is fed by the built-in test tones instead of the mic. */
  testInput: boolean;
  level: number;
  midi: MidiStatus;
  midiDevices: string[];
  pedal: boolean;
  /** When set, replaces the calibrated mic latency (calibration measures with 0). */
  latencyOverride: number | null;

  startMic: (opts?: { test?: boolean }) => Promise<void>;
  stopMic: () => void;
  enableMidi: () => Promise<void>;
  /** Switch MIDI on silently if the browser already allowed it. */
  autoMidi: () => Promise<void>;
  setThreshold: (v: number) => void;
  setLatencyOverride: (v: number | null) => void;
  /** Self-test only: play synthetic notes into the detector. */
  playTest: MicHandle['playTest'] | null;
}

let mic: MicHandle | null = null;
let stopMidiFn: (() => void) | null = null;

/** Which input currently feeds drills. */
export function activeSource(s: Pick<InputState, 'mic' | 'midi' | 'midiDevices'>): 'midi' | 'mic' | 'none' {
  const pref = useSettings.getState().settings?.inputPreference ?? 'auto';
  if (s.midi === 'on' && s.midiDevices.length > 0 && pref !== 'mic') return 'midi';
  if (s.mic === 'listening' && pref !== 'midi') return 'mic';
  return 'none';
}

export function micLatencyMs(): number {
  const o = useInput.getState().latencyOverride;
  if (o !== null) return o;
  return useSettings.getState().settings?.micCalibration?.latencyMs ?? defaultMicLatencyMs();
}

function onMicNotes(notes: TrackerNote[]) {
  const state = useInput.getState();
  if (activeSource(state) !== 'mic') return;
  const latency = state.testInput ? 0 : micLatencyMs();
  for (const n of notes) {
    noteStream.emit({
      note: n.midi,
      velocity: n.velocity,
      t: n.time * 1000 - latency,
      on: n.type === 'on',
      source: 'mic',
      confidence: n.confidence,
      delayMs: n.type === 'on' ? Math.round(n.delayMs) : undefined,
    });
  }
}

export const useInput = create<InputState>((set, get) => ({
  mic: 'off',
  micError: null,
  testInput: false,
  level: 0,
  midi: midiSupported() ? 'off' : 'unsupported',
  midiDevices: [],
  pedal: false,
  latencyOverride: null,
  playTest: null,

  startMic: async (opts = {}) => {
    if (get().mic === 'starting') return;
    get().stopMic();
    set({ mic: 'starting', micError: null, testInput: !!opts.test });
    try {
      const ctx = await getAudioContext();
      const cb = { onNotes: onMicNotes, onLevel: (level: number) => set({ level }) };
      mic = opts.test ? await startTestInput(ctx, cb) : await startMic(ctx, cb);
      const threshold = useSettings.getState().settings?.micCalibration?.threshold;
      if (threshold && !opts.test) mic.setThreshold(threshold);
      set({ mic: 'listening', playTest: mic.playTest ?? null });
    } catch (e) {
      const name = e instanceof DOMException ? e.name : '';
      set({
        mic: name === 'NotAllowedError' || name === 'SecurityError' ? 'denied' : 'error',
        micError: e instanceof Error ? e.message : String(e),
      });
    }
  },

  stopMic: () => {
    mic?.stop();
    mic = null;
    noteStream.releaseAll('mic', audioNowMs());
    set({ mic: 'off', level: 0, playTest: null, testInput: false });
  },

  enableMidi: async () => {
    if (!midiSupported() || stopMidiFn) return;
    try {
      await getAudioContext().catch(() => undefined);
      stopMidiFn = await startMidi({
        onNote: (note, on, velocity, perfMs) => {
          if (activeSource(get()) !== 'midi') return;
          noteStream.emit({ note, on, velocity, t: perfToAudioMs(perfMs), source: 'midi', confidence: 1 });
        },
        onPedal: (pedal) => set({ pedal }),
        onDevices: (midiDevices) => set({ midiDevices }),
      });
      set({ midi: 'on' });
    } catch {
      set({ midi: 'off' });
    }
  },

  autoMidi: async () => {
    if (midiSupported() && (await midiPermission()) === 'granted') await get().enableMidi();
  },

  setThreshold: (v) => mic?.setThreshold(v),
  setLatencyOverride: (latencyOverride) => set({ latencyOverride }),
}));
