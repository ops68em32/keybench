// The metronome on the shared audio clock, with a synthesized woodblock click
// (accent on beat 1). The SPEC's woodblock sample arrives with the sampler in a later phase.
import { MembraneSynth, Volume } from 'tone';
import { getAudioContext } from './context';
import { Metronome, type MetronomeOptions } from './clock';

let synth: MembraneSynth | null = null;
let volume: Volume | null = null;

function woodblock(): MembraneSynth {
  if (!synth) {
    volume = new Volume(-4).toDestination();
    synth = new MembraneSynth({
      pitchDecay: 0.006,
      octaves: 1.5,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.0005, decay: 0.07, sustain: 0, release: 0.02 },
    }).connect(volume);
  }
  return synth;
}

export function setClickVolume(db: number) {
  woodblock();
  volume!.volume.value = db;
}

export async function createMetronome(opts: MetronomeOptions): Promise<Metronome> {
  const ctx = await getAudioContext();
  const s = woodblock();
  return new Metronome(
    {
      now: () => ctx.currentTime,
      click: (time, accent) => s.triggerAttackRelease(accent ? 'G5' : 'D5', 0.04, time, accent ? 1 : 0.6),
      startTimer: (fn, ms) => setInterval(fn, ms),
      stopTimer: (h) => clearInterval(h as ReturnType<typeof setInterval>),
    },
    opts,
  );
}
