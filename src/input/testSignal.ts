// Piano-like test tones for tests and the in-app self-test: decaying harmonics with
// slight inharmonicity (stretched upper partials) and a weak fundamental in the bass,
// which is what makes real piano pitch detection hard.
import { midiToFrequency } from '../theory/notes';

export interface ToneSpec {
  midi: number;
  /** Seconds. */
  start: number;
  dur: number;
  amp?: number;
}

export function pianoLikeSignal(notes: ToneSpec[], sampleRate: number, totalSec: number, noise = 0.0005, seed = 1): Float32Array<ArrayBuffer> {
  const out = new Float32Array(Math.ceil(totalSec * sampleRate));
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647) * 2 - 1;
  for (let i = 0; i < out.length; i++) out[i] = rand() * noise;
  for (const n of notes) {
    const f = midiToFrequency(n.midi);
    const amp = n.amp ?? 0.3;
    const tau = Math.min(3, 1.2 * Math.sqrt(261.6 / f));
    const B = 0.0003;
    const partials = [];
    for (let h = 1; h <= 8; h++) {
      const fh = h * f * Math.sqrt(1 + B * h * h);
      if (fh > sampleRate / 2.2) break;
      let a = 1 / Math.pow(h, 1.1);
      if (h === 1 && n.midi < 48) a *= 0.4; // weak bass fundamental
      partials.push({ w: 2 * Math.PI * fh, a, tau: tau / h, phase: rand() * Math.PI });
    }
    const i0 = Math.floor(n.start * sampleRate);
    const iEnd = Math.min(out.length, Math.floor((n.start + n.dur + 0.3) * sampleRate));
    for (let i = i0; i < iEnd; i++) {
      const t = (i - i0) / sampleRate;
      const attack = Math.min(1, t / 0.003);
      const release = t > n.dur ? Math.exp(-(t - n.dur) / 0.03) : 1; // damper
      let v = 0;
      for (const p of partials) v += p.a * Math.exp(-t / p.tau) * Math.sin(p.w * t + p.phase);
      out[i] += amp * attack * release * v * 0.5;
    }
  }
  return out;
}
