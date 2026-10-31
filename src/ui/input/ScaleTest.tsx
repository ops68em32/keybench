// Gate check 3: play C major up and down against the click; see the ms error of every note.
import { useRef, useState } from 'react';
import { atAudioTime } from '../../audio/context';
import { useMetronome } from '../../audio/useMetronome';
import { gradeAgainstGrid, type GridResult } from '../../drills/shared/timing';
import { useInput } from '../../input/inputStore';
import { noteStream } from '../../input/noteStream';
import type { NoteEvent } from '../../input/types';
import { midiToNote, pretty } from '../../theory/notes';
import { scaleMidi } from '../../theory/scales';
import { Button, Card, errorColor, signedMs } from './ui';

const UP = scaleMidi('C4', 'major');
const SCALE = [...UP, ...UP.slice(0, -1).reverse()]; // C4 … C5 … C4, 15 notes
const TOLERANCE = 80;

export function ScaleTest() {
  const [bpm, setBpm] = useState(60);
  const [state, setState] = useState<'idle' | 'running' | 'done'>('idle');
  const [result, setResult] = useState<GridResult | null>(null);
  const testInput = useInput((s) => s.testInput);
  const cancel = useRef<() => void>(() => {});

  const start = async () => {
    setState('running');
    setResult(null);
    const events: NoteEvent[] = [];
    const unsub = noteStream.subscribe((e) => events.push(e));
    const metro = useMetronome.getState();
    metro.setBpm(bpm);
    const ref = await metro.start({ countInBars: 1 });
    if (testInput) {
      // Self-test: the test tones play the scale exactly on the clicks.
      const beat = 60 / bpm;
      useInput.getState().playTest?.(
        SCALE.map((midi, k) => ({ midi, start: k * beat, dur: beat * 0.9 })),
        ref.beatTime(0) / 1000,
      );
    }
    const timer = atAudioTime(ref.beatTime(SCALE.length) + 200, () => {
      unsub();
      useMetronome.getState().stop();
      setResult(gradeAgainstGrid(events, SCALE, ref, { toleranceMs: TOLERANCE }));
      setState('done');
    });
    cancel.current = () => {
      clearTimeout(timer);
      unsub();
      useMetronome.getState().stop();
      setState('idle');
    };
  };

  const maxAbs = result ? Math.max(TOLERANCE, ...result.notes.map((n) => Math.abs(n.errorMs ?? 0))) : TOLERANCE;

  return (
    <Card title="Scale with the click">
      {state === 'idle' && (
        <div className="space-y-3">
          <p>
            One bar of count-in, then play the C major scale up and back down (C D E F G A B C B A G F E D C), one note on each click,
            right hand.
          </p>
          <label className="flex items-center gap-2 text-[15px]">
            Speed
            <select value={bpm} onChange={(e) => setBpm(Number(e.target.value))} className="min-h-11 rounded-md border border-rule bg-bg px-2">
              {[50, 60, 72, 80, 100].map((b) => (
                <option key={b} value={b}>
                  {b} BPM
                </option>
              ))}
            </select>
          </label>
          <Button onClick={start}>Start</Button>
        </div>
      )}

      {state === 'running' && (
        <div className="space-y-3">
          <p className="text-lg">Listen for the count-in, then play one note per click…</p>
          <Button variant="secondary" onClick={() => cancel.current()}>
            Cancel
          </Button>
        </div>
      )}

      {state === 'done' && result && (
        <div className="space-y-3">
          <p className="text-[15px]">
            <b>{result.correct}/{SCALE.length}</b> right notes · on average <b>{Math.round(result.meanAbsErrorMs)} ms</b> off the click
            {Math.abs(result.meanSignedErrorMs) >= 10 && <> (you tend to be {result.meanSignedErrorMs > 0 ? 'late' : 'early'})</>}
            {result.extra > 0 && <> · {result.extra} extra</>}
          </p>
          <ol className="space-y-1">
            {result.notes.map((n) => (
              <li key={n.index} className="grid grid-cols-[3.5rem_1fr_4.5rem] items-center gap-2 font-mono text-sm">
                <span style={{ color: n.pitchOk ? 'var(--ink)' : 'var(--root)' }}>
                  {pretty(midiToNote(n.expected))}
                  {n.got !== null && !n.pitchOk && <span className="block text-[11px]">got {pretty(midiToNote(n.got))}</span>}
                </span>
                <ErrorBar ms={n.errorMs} max={maxAbs} />
                <span className="text-right" style={{ color: n.errorMs === null ? 'var(--root)' : errorColor(n.errorMs, TOLERANCE) }}>
                  {n.errorMs === null ? 'missed' : signedMs(n.errorMs)}
                </span>
              </li>
            ))}
          </ol>
          <p className="text-sm text-muted">
            Green is within {TOLERANCE / 2} ms, orange within {TOLERANCE} ms (the drills' limit), red is further off. Bars left of the
            centre line are early, right are late.
          </p>
          <Button variant="secondary" onClick={() => setState('idle')}>
            Again
          </Button>
        </div>
      )}
    </Card>
  );
}

function ErrorBar({ ms, max }: { ms: number | null; max: number }) {
  const pct = ms === null ? 0 : (Math.abs(ms) / max) * 50;
  return (
    <span className="relative block h-3 rounded bg-soft">
      <span className="absolute inset-y-0 left-1/2 w-px bg-muted" />
      {ms !== null && (
        <span
          className="absolute inset-y-0.5 rounded-sm"
          style={{ background: errorColor(ms), width: `${pct}%`, left: ms < 0 ? `${50 - pct}%` : '50%' }}
        />
      )}
    </span>
  );
}
