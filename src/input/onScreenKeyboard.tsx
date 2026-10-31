// Full 88-key on-screen keyboard. About two octaves fit on a phone and the rest scrolls;
// it opens centred on middle C. Taps go into the NoteEvent stream as source 'screen',
// and every held note (from any input) lights up.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { perfToAudioMs } from '../audio/context';
import { isBlackKey, midiToNote } from '../theory/notes';
import { noteStream } from './noteStream';

const LOW = 21; // A0
const HIGH = 108; // C8

interface Key {
  midi: number;
  black: boolean;
  x: number; // in white-key units
}

const KEYS: Key[] = (() => {
  const keys: Key[] = [];
  let white = 0;
  for (let m = LOW; m <= HIGH; m++) {
    if (isBlackKey(m)) keys.push({ midi: m, black: true, x: white - 0.3 });
    else keys.push({ midi: m, black: false, x: white++ });
  }
  return keys;
})();
const WHITE_COUNT = KEYS.filter((k) => !k.black).length;

function useHeld(): Map<number, string> {
  const [held, setHeld] = useState(() => new Map(noteStream.held));
  useEffect(() => noteStream.subscribe(() => setHeld(new Map(noteStream.held))), []);
  return held;
}

export function OnScreenKeyboard({ height = 150 }: { height?: number }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [whiteW, setWhiteW] = useState(30);
  const held = useHeld();
  const pointers = useRef(new Map<number, number>());

  // Two octaves (15 white keys) across a phone; wider keys capped on big screens.
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const fit = () => setWhiteW(Math.max(24, Math.min(44, el.clientWidth / 15)));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Centre on middle C.
  useLayoutEffect(() => {
    const el = scroller.current;
    const c4 = KEYS.find((k) => k.midi === 60)!;
    if (el) el.scrollLeft = c4.x * whiteW - el.clientWidth / 2 + whiteW * 3.5;
  }, [whiteW]);

  const emit = (midi: number, on: boolean) =>
    noteStream.emit({ note: midi, on, velocity: on ? 80 : 0, t: perfToAudioMs(performance.now()), source: 'screen', confidence: 1 });

  const down = (e: React.PointerEvent, midi: number) => {
    e.preventDefault();
    (e.target as Element).releasePointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, midi);
    emit(midi, true);
  };
  const up = (e: React.PointerEvent) => {
    const midi = pointers.current.get(e.pointerId);
    if (midi === undefined) return;
    pointers.current.delete(e.pointerId);
    emit(midi, false);
  };
  // Sliding a finger to another key moves the note (glissando).
  const enter = (e: React.PointerEvent, midi: number) => {
    const prev = pointers.current.get(e.pointerId);
    if (prev === undefined || prev === midi) return;
    emit(prev, false);
    pointers.current.set(e.pointerId, midi);
    emit(midi, true);
  };

  const blackH = Math.round(height * 0.62);
  return (
    <div
      ref={scroller}
      className="overflow-x-auto overscroll-x-contain rounded-md border border-rule bg-surface"
      style={{ touchAction: 'pan-x' }}
      role="group"
      aria-label="On-screen piano keyboard, scroll sideways for more keys"
    >
      <div className="relative select-none" style={{ width: WHITE_COUNT * whiteW, height }}>
        {KEYS.map((k) => {
          const isHeld = held.has(k.midi);
          const name = midiToNote(k.midi);
          const common = {
            'aria-label': name,
            'aria-pressed': isHeld,
            onPointerDown: (e: React.PointerEvent) => down(e, k.midi),
            onPointerUp: up,
            onPointerCancel: up,
            onPointerLeave: up,
            onPointerEnter: (e: React.PointerEvent) => enter(e, k.midi),
          };
          return k.black ? (
            <button
              key={k.midi}
              {...common}
              className="absolute top-0 z-10 rounded-b-[3px]"
              style={{
                left: k.x * whiteW,
                width: whiteW * 0.6,
                height: blackH,
                background: isHeld ? 'var(--rh)' : 'var(--bkey)',
              }}
            />
          ) : (
            <button
              key={k.midi}
              {...common}
              className="absolute top-0 flex items-end justify-center border-r border-[var(--wkey-line)] pb-1.5 font-mono text-[10px] text-muted"
              style={{ left: k.x * whiteW, width: whiteW, height, background: isHeld ? 'var(--rh)' : 'var(--wkey)' }}
            >
              {name.startsWith('C') && !name.startsWith('C#') ? (
                <span className={isHeld ? 'text-rh-ink' : k.midi === 60 ? 'font-bold text-root' : ''}>{name}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
