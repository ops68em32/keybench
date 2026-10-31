// The 30-second mic calibration: quiet room → middle C → C major chord → play on the click.
import { useEffect, useRef, useState } from 'react';
import { atAudioTime } from '../../audio/context';
import { useMetronome } from '../../audio/useMetronome';
import { latencyFromTaps, thresholdFromNoise, thresholdFromPlaying } from '../../input/calibration';
import { useInput } from '../../input/inputStore';
import { noteStream } from '../../input/noteStream';
import { midiToNote, pretty } from '../../theory/notes';
import { useSettings } from '../../store/settings';
import { Button, Card } from './ui';

type Step = 'quiet' | 'note' | 'chord' | 'timing' | 'done';
const TAPS = 8;

/** Highest input level seen while `active`. */
function usePeakLevel(active: boolean) {
  const peak = useRef(0);
  useEffect(() => {
    if (!active) return;
    peak.current = 0;
    return useInput.subscribe((s) => (peak.current = Math.max(peak.current, s.level)));
  }, [active]);
  return peak;
}

export function Calibrate({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState<Step>('quiet');
  const [noiseThr, setNoiseThr] = useState(0.008);
  const [noiseLevel, setNoiseLevel] = useState(0);
  const [heard, setHeard] = useState<number[]>([]);
  const [noteLevel, setNoteLevel] = useState(0);
  const [chordLevel, setChordLevel] = useState(0);
  const [latency, setLatency] = useState<{ latencyMs: number; spreadMs: number } | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const notePeak = usePeakLevel(step === 'note');
  const chordPeak = usePeakLevel(step === 'chord');

  // Never leave the mic latency override behind.
  useEffect(() => () => useInput.getState().setLatencyOverride(null), []);

  // Step 1: two seconds of room noise.
  const measureQuiet = () => {
    setRunning(true);
    const levels: number[] = [];
    const unsub = useInput.subscribe((s) => levels.push(s.level));
    setTimeout(() => {
      unsub();
      const thr = thresholdFromNoise(levels);
      setNoiseLevel(Math.max(0, ...levels));
      setNoiseThr(thr);
      useInput.getState().setThreshold(thr);
      setRunning(false);
      setStep('note');
    }, 2000);
  };

  // Step 2: middle C four times.
  useEffect(() => {
    if (step !== 'note') return;
    setHeard([]);
    return noteStream.subscribe((e) => {
      if (e.on && e.source === 'mic') setHeard((h) => (h.length < 4 ? [...h, e.note] : h));
    });
  }, [step]);
  useEffect(() => {
    if (step === 'note' && heard.length === 4) setNoteLevel(notePeak.current);
  }, [heard, step, notePeak]);

  // Step 3: hold a C major chord; we only measure how loud it is for now.
  useEffect(() => {
    if (step !== 'chord') return;
    let seen = false;
    const unsub = noteStream.subscribe((e) => {
      if (e.on && e.source === 'mic' && !seen) {
        seen = true;
        setTimeout(() => setChordLevel(Math.max(chordPeak.current, 0.0001)), 1500);
      }
    });
    return unsub;
  }, [step, chordPeak]);

  // Step 4: play C4 on each of 8 clicks at 80 BPM, after a bar of count-in.
  const measureTiming = async () => {
    setRunning(true);
    setMessage(null);
    const input = useInput.getState();
    input.setLatencyOverride(0);
    const metro = useMetronome.getState();
    metro.setBpm(80);
    const offsets: number[] = [];
    let ref: Awaited<ReturnType<typeof metro.start>> | null = null;
    const unsub = noteStream.subscribe((e) => {
      if (!ref || !e.on || e.source !== 'mic') return;
      const { beat, errorMs } = ref.nearestBeat(e.t);
      if (beat >= 0 && beat < TAPS) offsets.push(errorMs);
    });
    ref = await metro.start({ countInBars: 1 });
    atAudioTime(ref.beatTime(TAPS) + 300, () => {
      unsub();
      useMetronome.getState().stop();
      input.setLatencyOverride(null);
      const r = latencyFromTaps(offsets);
      setRunning(false);
      if (!r) {
        setMessage(`Heard ${offsets.length} of ${TAPS} notes on the clicks. Play a little louder, right on each click, and try again.`);
        return;
      }
      setLatency(r);
      setStep('done');
    });
  };

  const save = async () => {
    const threshold = thresholdFromPlaying(noiseThr, [noteLevel, chordLevel].filter((x) => x > 0));
    await useSettings.getState().update({
      micCalibration: {
        latencyMs: latency!.latencyMs,
        threshold,
        calibratedAt: Date.now(),
        noiseLevel,
        noteLevel,
        chordLevel,
      },
    });
    useInput.getState().setThreshold(threshold);
    onDone();
  };

  const allC4 = heard.length === 4 && heard.every((n) => n === 60);
  const stepNo = { quiet: 1, note: 2, chord: 3, timing: 4, done: 4 }[step];

  return (
    <Card title="Calibrate the microphone" right={<span className="eyebrow">Step {stepNo} of 4</span>}>
      {step === 'quiet' && (
        <Instruction text="Put this device where it will sit while you play (on the music stand is ideal). Keep the room quiet for two seconds.">
          <Button onClick={measureQuiet} disabled={running}>
            {running ? 'Listening to the room…' : 'Start'}
          </Button>
        </Instruction>
      )}

      {step === 'note' && (
        <Instruction text="Play middle C four times, about a second apart, at your normal loudness.">
          <p className="font-mono text-lg" aria-live="polite">
            Heard: {heard.length ? heard.map((n) => pretty(midiToNote(n))).join('  ') : '…'}
          </p>
          {heard.length === 4 && !allC4 && (
            <p className="text-sm text-root">
              Not all of those were C4. Check it is middle C (the C nearest the middle of the piano), then try again.
            </p>
          )}
          <div className="flex gap-2">
            <Button onClick={() => setStep('chord')} disabled={!allC4}>
              Next
            </Button>
            {heard.length > 0 && (
              <Button variant="secondary" onClick={() => setHeard([])}>
                Start over
              </Button>
            )}
          </div>
        </Instruction>
      )}

      {step === 'chord' && (
        <Instruction text="Now play C, E and G together (a C major chord) and hold it for two seconds.">
          <p className="text-[15px]" aria-live="polite">{chordLevel ? 'Heard it.' : 'Listening…'}</p>
          <Button onClick={() => setStep('timing')} disabled={!chordLevel}>
            Next
          </Button>
        </Instruction>
      )}

      {step === 'timing' && (
        <Instruction
          text={`The metronome counts in for one bar, then clicks ${TAPS} more times. Play middle C exactly on each of those ${TAPS} clicks.`}
        >
          {message && <p className="text-sm text-root">{message}</p>}
          <Button onClick={measureTiming} disabled={running}>
            {running ? 'Play C on each click…' : message ? 'Try again' : 'Start the clicks'}
          </Button>
        </Instruction>
      )}

      {step === 'done' && latency && (
        <Instruction text="All set.">
          <ul className="space-y-1 text-[15px]">
            <li>Mic delay: <b>{Math.round(latency.latencyMs)} ms</b>. This is taken off every timing score, so a note played on the click counts as on the click.</li>
            <li>Your taps were within ±{Math.round(latency.spreadMs)} ms of each other.</li>
          </ul>
          <Button onClick={save}>Save</Button>
        </Instruction>
      )}

      <button className="mt-4 text-sm text-muted underline" onClick={onDone}>
        Cancel
      </button>
    </Card>
  );
}

function Instruction({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <p>{text}</p>
      {children}
    </div>
  );
}
