import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { chordMidi, intervalName, midiToNote, pretty, spellChord } from '../../theory';
import { useSettings } from '../../store/settings';
import { KeyboardDiagram } from '../diagrams/KeyboardDiagram';
import { useInstall, useOfflineReady } from '../useInstall';

// C major built from the theory module (not typed in by hand), drawn like the guide's kb-c figure.
const C = chordMidi('C', 4).map((m) => midiToNote(m));
const FINGERS = ['1', '3', '5'];
const fifth = intervalName(7);

export function Home() {
  const { settings, error, load } = useSettings();
  const install = useInstall();
  const offline = useOfflineReady();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-6">
      <section>
        <p className="eyebrow">Phase 0 · Foundation</p>
        <h1 className="mt-1 text-[34px] leading-tight">Your first chord</h1>
        <p className="mt-2 text-muted">
          C major: start on C, count up 4 half steps to E, then 3 more to G.
        </p>
      </section>

      <KeyboardDiagram
        from="C4"
        to="B4"
        names
        w={38}
        title={`C major  ·  ${spellChord('C').map(pretty).join(' ')}`}
        aria="C major chord: C, E and G marked on a one-octave keyboard"
        marks={C.map((n, i) => ({ n, hand: i === 0 ? 'root' : 'R', label: FINGERS[i] }))}
        steps={[
          { a: C[0], b: C[1], label: '4 half steps', color: 'var(--rh)' },
          { a: C[1], b: C[2], label: '3', color: 'var(--rh)' },
        ]}
        caption={
          <>
            Root, then <b>4</b> half steps, then <b>3</b>. Circles show right-hand fingers. C to G is a {fifth}.
          </>
        }
      />

      <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted" aria-label="Colour key">
        <li className="flex items-center gap-1.5"><i className="inline-block h-3.5 w-3.5 rounded-full bg-rh" /> Right hand</li>
        <li className="flex items-center gap-1.5"><i className="inline-block h-3.5 w-3.5 rounded-full bg-lh" /> Left hand</li>
        <li className="flex items-center gap-1.5"><i className="inline-block h-3.5 w-3.5 rounded-full bg-root" /> Root / landmark</li>
      </ul>

      <section className="rounded-md border border-rule bg-surface p-4">
        <h2 className="text-xl">App check</h2>
        <ul className="mt-3 space-y-2 text-[15px]">
          <Check ok={!!settings} label="Saves your progress on this device" pending={!settings && !error} detail={error ?? undefined} />
          <Check ok={offline} label="Works without internet" pending={!offline} detail={offline ? undefined : 'Getting ready… reload the page once if this stays grey.'} />
          <Check
            ok={install.kind === 'installed'}
            pending={install.kind !== 'installed'}
            label={install.kind === 'installed' ? 'Installed as an app' : 'Not installed yet'}
          />
        </ul>
        {install.kind === 'can-prompt' && (
          <button
            onClick={install.install}
            className="mt-4 w-full rounded-md bg-ink px-4 py-3 font-semibold text-bg active:opacity-80"
          >
            Install Keybench
          </button>
        )}
        {install.kind === 'ios' && (
          <p className="mt-3 text-sm text-muted">
            To install on iPhone or iPad: tap the <b className="text-ink">Share</b> button in Safari, then <b className="text-ink">Add to Home Screen</b>.
          </p>
        )}
        {install.kind === 'manual' && (
          <p className="mt-3 text-sm text-muted">
            To install: in Chrome or Edge, use the install icon at the right of the address bar, or the menu → <b className="text-ink">Install Keybench</b>.
          </p>
        )}
      </section>

      <p className="text-sm text-muted">
        Want to compare with the book? <Link to="/diagrams" className="text-lh underline">See every keyboard diagram from the guide</Link>.
      </p>
    </div>
  );
}

function Check({ ok, pending, label, detail }: { ok: boolean; pending?: boolean; label: string; detail?: string }) {
  return (
    <li className="flex gap-2.5">
      <span
        aria-hidden
        className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs font-bold ${
          ok ? 'bg-lh text-lh-ink' : pending ? 'bg-soft text-muted' : 'bg-root text-white'
        }`}
      >
        {ok ? '✓' : pending ? '·' : '!'}
      </span>
      <span>
        {label}
        {detail && <span className="block text-sm text-muted">{detail}</span>}
      </span>
    </li>
  );
}
