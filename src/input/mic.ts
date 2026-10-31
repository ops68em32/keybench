import workletUrl from './mic.worklet.ts?worker&url';
import type { TrackerNote } from './pitchTracker';
import { pianoLikeSignal, type ToneSpec } from './testSignal';

export interface MicCallbacks {
  onNotes: (notes: TrackerNote[]) => void;
  onLevel: (rms: number) => void;
}

export interface MicHandle {
  setThreshold: (v: number) => void;
  stop: () => void;
  /** Self-test: play synthetic piano notes into the detector instead of the mic. */
  playTest?: (notes: ToneSpec[], atAudioTime: number) => void;
}

const loaded = new WeakSet<AudioContext>();

async function makeNode(ctx: AudioContext, cb: MicCallbacks): Promise<AudioWorkletNode> {
  if (!loaded.has(ctx)) {
    await ctx.audioWorklet.addModule(workletUrl);
    loaded.add(ctx);
  }
  const node = new AudioWorkletNode(ctx, 'keybench-mic', { numberOfInputs: 1, numberOfOutputs: 1, channelCount: 1 });
  node.port.onmessage = (e) => {
    if (e.data.type === 'notes') cb.onNotes(e.data.notes);
    else if (e.data.type === 'level') cb.onLevel(e.data.rms);
  };
  // A silent connection to the speakers keeps the node running in every browser.
  const mute = ctx.createGain();
  mute.gain.value = 0;
  node.connect(mute).connect(ctx.destination);
  return node;
}

/** Start listening to the microphone. Throws if permission is refused. */
export async function startMic(ctx: AudioContext, cb: MicCallbacks): Promise<MicHandle> {
  const stream = await navigator.mediaDevices.getUserMedia({
    // Raw sound: phone-call processing would cut and smear piano notes.
    audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
  });
  const node = await makeNode(ctx, cb);
  const src = ctx.createMediaStreamSource(stream);
  src.connect(node);
  return {
    setThreshold: (value) => node.port.postMessage({ type: 'threshold', value }),
    stop: () => {
      src.disconnect();
      node.disconnect();
      stream.getTracks().forEach((t) => t.stop());
    },
  };
}

/** A detector fed by synthetic piano tones (also played aloud), for checking without a piano. */
export async function startTestInput(ctx: AudioContext, cb: MicCallbacks): Promise<MicHandle> {
  const node = await makeNode(ctx, cb);
  // Feed constant silence so the detector runs between test notes, as it does with a mic.
  const silence = ctx.createConstantSource();
  silence.offset.value = 0;
  silence.connect(node);
  silence.start();
  const sources: AudioScheduledSourceNode[] = [silence];
  return {
    setThreshold: (value) => node.port.postMessage({ type: 'threshold', value }),
    stop: () => {
      sources.forEach((s) => s.stop());
      node.disconnect();
    },
    playTest: (notes, at) => {
      const end = Math.max(...notes.map((n) => n.start + n.dur)) + 0.5;
      const data = pianoLikeSignal(notes, ctx.sampleRate, end);
      const buf = ctx.createBuffer(1, data.length, ctx.sampleRate);
      buf.copyToChannel(data, 0);
      const s = ctx.createBufferSource();
      s.buffer = buf;
      s.connect(node);
      const speaker = ctx.createGain();
      speaker.gain.value = 0.5;
      s.connect(speaker).connect(ctx.destination);
      s.start(at);
      sources.push(s);
    },
  };
}
