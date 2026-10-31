// Optional MIDI input (USB cable from the piano). Browsers ask permission once; after
// that it switches on by itself whenever a device is plugged in.
import { WebMidi, type Input, type NoteMessageEvent, type ControlChangeMessageEvent } from 'webmidi';

export interface MidiCallbacks {
  onNote: (note: number, on: boolean, velocity: number, perfMs: number) => void;
  onPedal: (down: boolean) => void;
  onDevices: (names: string[]) => void;
}

export function midiSupported(): boolean {
  return typeof navigator !== 'undefined' && 'requestMIDIAccess' in navigator;
}

/** 'granted' means we can switch MIDI on without asking. */
export async function midiPermission(): Promise<PermissionState | 'unknown'> {
  try {
    const p = await navigator.permissions.query({ name: 'midi' as PermissionName });
    return p.state;
  } catch {
    return 'unknown';
  }
}

export async function startMidi(cb: MidiCallbacks): Promise<() => void> {
  if (!WebMidi.enabled) await WebMidi.enable();
  const attached = new Set<Input>();
  const noteOn = (e: NoteMessageEvent) => cb.onNote(e.note.number, true, e.note.rawAttack || 64, e.timestamp);
  const noteOff = (e: NoteMessageEvent) => cb.onNote(e.note.number, false, 0, e.timestamp);
  const cc = (e: ControlChangeMessageEvent) => {
    if (e.controller.number === 64) cb.onPedal(Number(e.rawValue) >= 64);
  };
  const refresh = () => {
    for (const input of WebMidi.inputs) {
      if (attached.has(input)) continue;
      input.addListener('noteon', noteOn);
      input.addListener('noteoff', noteOff);
      input.addListener('controlchange', cc);
      attached.add(input);
    }
    cb.onDevices(WebMidi.inputs.map((i) => i.name));
  };
  refresh();
  WebMidi.addListener('connected', refresh);
  WebMidi.addListener('disconnected', refresh);
  return () => {
    WebMidi.removeListener('connected', refresh);
    WebMidi.removeListener('disconnected', refresh);
    attached.forEach((i) => i.removeListener());
  };
}
