// Gate check 1: is the mic hearing the right note, fast enough, from C2 to C6?
import { useState } from 'react';
import { audioNowMs } from '../../audio/context';
import { useInput } from '../../input/inputStore';
import { useNoteListener } from '../../input/useNoteEvents';
import { midiToNote, noteToMidi, pretty } from '../../theory/notes';
import { KeyboardDiagram } from '../diagrams/KeyboardDiagram';
import { Button, Card } from './ui';

// 20 notes from low C to high C, white and black keys.
const TARGETS = ['C2', 'D2', 'E2', 'G2', 'A2', 'Bb2', 'C3', 'D3', 'F3', 'F#3', 'A3', 'C4', 'Eb4', 'G4', 'B4', 'D5', 'F#5', 'A5', 'B5', 'C6'];
const PASS = 0.95;
const MAX_DELAY = 100;

interface Result {
  target: string;
  got: number;
  delayMs?: number;
}

export function PitchCheck() {
  const [results, setResults] = useState<Result[] | null>(null);
  const listening = useInput((s) => s.mic === 'listening');
  const testInput = useInput((s) => s.testInput);
  const playTest = useInput((s) => s.playTest);
  const i = results?.length ?? 0;
  const running = results !== null && i < TARGETS.length;
  const done = results !== null && i === TARGETS.length;

  useNoteListener((e) => {
    if (!running || !e.on || e.source === 'screen') return;
    setResults((r) => (r && r.length < TARGETS.length ? [...r, { target: TARGETS[r.length], got: e.note, delayMs: e.delayMs }] : r));
  });

  const autoPlay = () => {
    // Self-test: the built-in tones play every target, 0.7 s apart.
    const start = audioNowMs() / 1000 + 0.3;
    playTest?.(TARGETS.map((n, k) => ({ midi: noteToMidi(n), start: k * 0.7, dur: 0.6 })), start);
  };

  const correct = results?.filter((r) => r.got === noteToMidi(r.target)).length ?? 0;
  const delays = (results ?? []).map((r) => r.delayMs).filter((d): d is number => d !== undefined).sort((a, b) => a - b);
  const maxDelay = delays.length ? delays[delays.length - 1] : 0;
  const medDelay = delays.length ? delays[delays.length >> 1] : 0;
  const pass = done && correct / TARGETS.length >= PASS && maxDelay < MAX_DELAY;

  const target = running ? TARGETS[i] : null;
  const octave = target ? Number(target.slice(-1)) : 4;

  return (
    <Card title="Pitch check" right={<span className="text-sm text-muted">C2 to C6</span>}>
      {!results && (
        <div className="space-y-3">
          <p>The app shows 20 notes from low to high, one at a time. Play each one once. It checks the mic heard the right note, and how fast.</p>
          <Button onClick={() => setResults([])} disabled={!listening}>
            Start pitch check
          </Button>
          {!listening && <p className="text-sm text-muted">Press “Start listening” first.</p>}
        </div>
      )}

      {running && target && (
        <div className="space-y-3">
          <p className="text-muted">
            Note {i + 1} of {TARGETS.length}. Play:
          </p>
          <p className="font-serif text-5xl" aria-live="polite">
            {pretty(target)}
          </p>
          <KeyboardDiagram
            from={`C${octave}`}
            to={`B${octave}`}
            names
            w={34}
            marks={[{ n: target, hand: 'root' }]}
            aria={`Keyboard with ${pretty(target)} marked`}
          />
          {i > 0 && (
            <p className="text-sm text-muted">
              Last heard: {pretty(midiToNote(results![i - 1].got))}
              {results![i - 1].got === noteToMidi(results![i - 1].target) ? ' ✓' : ` (expected ${pretty(results![i - 1].target)})`}
            </p>
          )}
          <div className="flex gap-2">
            {testInput && i === 0 && (
              <Button variant="secondary" onClick={autoPlay}>
                Play all with test tones
              </Button>
            )}
            <Button variant="secondary" onClick={() => setResults(null)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {done && (
        <div className="space-y-3">
          <p className="text-2xl">
            <span style={{ color: pass ? 'var(--lh)' : 'var(--root)' }}>{pass ? 'Pass' : 'Not yet'}</span>
            <span className="ml-2 text-base text-muted">
              {correct}/{TARGETS.length} right ({Math.round((correct / TARGETS.length) * 100)}%, need 95%)
            </span>
          </p>
          {delays.length > 0 && (
            <p className="text-[15px]">
              Recognised in {medDelay} ms typically, slowest {maxDelay} ms (need under {MAX_DELAY} ms).
            </p>
          )}
          <ul className="grid grid-cols-4 gap-1.5 font-mono text-sm sm:grid-cols-5">
            {results!.map((r) => {
              const ok = r.got === noteToMidi(r.target);
              return (
                <li key={r.target} className="rounded border border-rule px-1.5 py-1" style={{ color: ok ? 'var(--ink)' : 'var(--root)' }}>
                  {pretty(r.target)}
                  {!ok && <span className="block text-xs">heard {pretty(midiToNote(r.got))}</span>}
                </li>
              );
            })}
          </ul>
          <Button variant="secondary" onClick={() => setResults([])}>
            Run again
          </Button>
        </div>
      )}
    </Card>
  );
}
