import { useState } from 'react';
import { activeSource, micLatencyMs, useInput } from '../../input/inputStore';
import { useSettings } from '../../store/settings';
import { Calibrate } from './Calibrate';
import { Button, Card } from './ui';

function LevelMeter({ level, threshold }: { level: number; threshold: number }) {
  // dB scale from -60 dBFS (empty) to 0 dBFS (full).
  const pos = (v: number) => Math.max(0, Math.min(1, (20 * Math.log10(Math.max(v, 1e-6)) + 60) / 60)) * 100;
  return (
    <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-soft" aria-label="Microphone level">
      <div className="h-full bg-lh transition-[width] duration-75" style={{ width: `${pos(level)}%` }} />
      <div className="absolute inset-y-0 w-0.5 bg-root" style={{ left: `${pos(threshold)}%` }} title="Silence threshold" />
    </div>
  );
}

export function ListeningCard({ allowTest }: { allowTest: boolean }) {
  const input = useInput();
  const settings = useSettings((s) => s.settings);
  const [calibrating, setCalibrating] = useState(false);
  const source = activeSource(input);
  const cal = settings?.micCalibration;

  if (calibrating) return <Calibrate onDone={() => setCalibrating(false)} />;

  return (
    <Card title="Listening">
      {input.mic !== 'listening' ? (
        <div className="space-y-2">
          <Button className="w-full" onClick={() => input.startMic()} disabled={input.mic === 'starting'}>
            {input.mic === 'starting' ? 'Starting…' : 'Start listening'}
          </Button>
          {input.mic === 'denied' && (
            <p className="text-sm text-root">
              The microphone is blocked. Allow it in the browser's site settings (the icon left of the address bar), then try again.
            </p>
          )}
          {input.mic === 'error' && <p className="text-sm text-root">Could not start the microphone: {input.micError}</p>}
          {allowTest && (
            <Button variant="secondary" className="w-full" onClick={() => input.startMic({ test: true })}>
              Use test tones instead of the mic
            </Button>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between gap-3 text-[15px]">
            <span>
              <span className="mr-2 inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-lh align-middle" />
              {input.testInput ? 'Listening to test tones' : 'Listening'}
            </span>
            <Button variant="secondary" onClick={input.stopMic}>
              Stop
            </Button>
          </div>
          <LevelMeter level={input.level} threshold={cal?.threshold ?? 0.008} />
        </div>
      )}

      <dl className="mt-4 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5 text-[15px]">
        <dt className="text-muted">Notes from</dt>
        <dd>
          {source === 'midi'
            ? `MIDI cable · ${input.midiDevices.join(', ')}`
            : source === 'mic'
              ? input.testInput
                ? 'Test tones'
                : 'Microphone'
              : 'On-screen keys only'}
        </dd>
        <dt className="text-muted">Calibration</dt>
        <dd>
          {cal ? `Done · mic delay ${Math.round(cal.latencyMs)} ms` : `Not yet (assuming ${micLatencyMs()} ms delay)`}
        </dd>
        <dt className="text-muted">MIDI cable</dt>
        <dd>
          {input.midi === 'unsupported'
            ? 'Not available in this browser (the mic works fine)'
            : input.midi === 'on'
              ? input.midiDevices.length
                ? `Connected: ${input.midiDevices.join(', ')}`
                : 'On · plug in a cable and it switches over by itself'
              : 'Off'}
        </dd>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => setCalibrating(true)} disabled={input.mic !== 'listening' || input.testInput}>
          {cal ? 'Recalibrate' : 'Calibrate (30 s)'}
        </Button>
        {input.midi === 'off' && (
          <Button variant="secondary" onClick={input.enableMidi}>
            I have a USB cable: turn on MIDI
          </Button>
        )}
      </div>
    </Card>
  );
}
