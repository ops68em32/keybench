// Runs on the audio thread. Feeds microphone samples to the PitchTracker and posts
// detected notes (timed on the audio clock) and the input level to the main thread.
import { PitchTracker } from './pitchTracker';

interface WorkletScope {
  sampleRate: number;
  currentTime: number;
  AudioWorkletProcessor: { new (): { port: MessagePort } };
  registerProcessor: (name: string, ctor: unknown) => void;
}
const scope = globalThis as unknown as WorkletScope;

class MicProcessor extends scope.AudioWorkletProcessor {
  private tracker = new PitchTracker({ sampleRate: scope.sampleRate });
  private sinceLevel = 0;
  private peak = 0;

  constructor() {
    super();
    this.port.onmessage = (e: MessageEvent) => {
      if (e.data?.type === 'threshold') this.tracker.threshold = e.data.value;
    };
  }

  process(inputs: Float32Array[][]): boolean {
    const ch = inputs[0]?.[0];
    if (ch && ch.length) {
      const notes = this.tracker.push(ch, scope.currentTime);
      if (notes.length) this.port.postMessage({ type: 'notes', notes });
      this.peak = Math.max(this.peak, this.tracker.level);
      this.sinceLevel += ch.length;
      if (this.sinceLevel >= scope.sampleRate / 20) {
        this.port.postMessage({ type: 'level', rms: this.peak });
        this.sinceLevel = 0;
        this.peak = 0;
      }
    }
    return true;
  }
}

scope.registerProcessor('keybench-mic', MicProcessor);
