import { useMetronome } from '../../audio/useMetronome';
import { Button, Card } from './ui';

function clock(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec - m * 60;
  return `${m}:${s.toFixed(1).padStart(4, '0')}`;
}

export function MetronomeCard() {
  const m = useMetronome();
  const countingIn = m.beat !== null && m.beat < 0;
  const inBar = m.beat === null ? -1 : ((m.beat % m.beatsPerBar) + m.beatsPerBar) % m.beatsPerBar;

  return (
    <Card title="Metronome">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1">
          <Button variant="secondary" aria-label="Slower" onClick={() => m.setBpm(m.bpm - 5)}>
            −
          </Button>
          <label className="flex items-baseline gap-1">
            <input
              type="number"
              inputMode="numeric"
              min={30}
              max={240}
              value={m.bpm}
              onChange={(e) => m.setBpm(Number(e.target.value) || m.bpm)}
              className="w-16 rounded-md border border-rule bg-bg px-2 py-2 text-center font-mono text-lg"
              aria-label="Beats per minute"
            />
            <span className="text-sm text-muted">BPM</span>
          </label>
          <Button variant="secondary" aria-label="Faster" onClick={() => m.setBpm(m.bpm + 5)}>
            +
          </Button>
        </div>
        <select
          value={m.beatsPerBar}
          onChange={(e) => m.setBeatsPerBar(Number(e.target.value))}
          disabled={m.running}
          className="min-h-11 rounded-md border border-rule bg-bg px-2"
          aria-label="Beats per bar"
        >
          {[2, 3, 4, 6].map((n) => (
            <option key={n} value={n}>
              {n}/4
            </option>
          ))}
        </select>
        <label className="flex min-h-11 items-center gap-2 text-[15px]">
          <input type="checkbox" checked={m.countInBars > 0} onChange={(e) => m.setCountIn(e.target.checked ? 1 : 0)} disabled={m.running} />
          Count-in bar
        </label>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button className="w-28" onClick={() => (m.running ? m.stop() : m.start())}>
          {m.running ? 'Stop' : 'Start'}
        </Button>
        <div className="flex gap-2" aria-hidden>
          {Array.from({ length: m.beatsPerBar }, (_, i) => (
            <span
              key={i}
              className="h-5 w-5 rounded-full transition-colors duration-75"
              style={{
                background: i === inBar ? (countingIn ? 'var(--muted)' : i === 0 ? 'var(--root)' : 'var(--rh)') : 'var(--soft)',
              }}
            />
          ))}
        </div>
        {countingIn && <span className="text-sm text-muted">count-in</span>}
      </div>

      {m.running && m.beat !== null && m.beat >= 0 && (
        <p className="mt-3 font-mono text-sm text-muted" aria-live="off">
          beat {m.beat} · {clock((m.beat * 60) / m.bpm)} · late clicks {m.late}
        </p>
      )}
    </Card>
  );
}
