import { useMetronome } from '../../audio/useMetronome';
import { useRecentNotes } from '../../input/useNoteEvents';
import { midiToNote, pretty } from '../../theory/notes';
import { Card, errorColor, signedMs } from './ui';

const SOURCE: Record<string, string> = { mic: 'mic', midi: 'MIDI', screen: 'screen' };

/** Live list of played notes: pitch, input, and how far each was from the nearest click. */
export function NoteLog() {
  const events = useRecentNotes(30);
  const ref = useMetronome((s) => (s.running ? s.ref : null));

  return (
    <Card title="Live notes" right={<span className="text-sm text-muted">newest first</span>}>
      {events.length === 0 ? (
        <p className="text-muted">Play something. Each note appears here as soon as it is heard.</p>
      ) : (
        <table className="w-full text-[15px] tabular-nums">
          <thead>
            <tr className="text-left font-mono text-[11px] uppercase tracking-wider text-muted">
              <th className="py-1 font-medium">Note</th>
              <th className="py-1 font-medium">From</th>
              <th className="py-1 text-right font-medium">vs click</th>
              <th className="py-1 text-right font-medium" title="How long the microphone took to recognise the note">
                Heard in
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((e, i) => {
              const off = ref?.nearestBeat(e.t);
              return (
                <tr key={`${e.t}-${i}`} className="border-t border-rule">
                  <td className="py-1.5 font-mono font-bold">{pretty(midiToNote(e.note))}</td>
                  <td className="py-1.5 text-muted">{SOURCE[e.source]}</td>
                  <td className="py-1.5 text-right font-mono" style={{ color: off ? errorColor(off.errorMs) : undefined }}>
                    {off ? signedMs(off.errorMs) : '–'}
                  </td>
                  <td className="py-1.5 text-right font-mono text-muted">{e.delayMs !== undefined ? `${e.delayMs} ms` : '–'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Card>
  );
}
