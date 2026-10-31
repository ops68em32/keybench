import { useEffect, useRef, useState } from 'react';
import { noteStream } from './noteStream';
import type { NoteEvent } from './types';

/** The most recent `max` events from the stream, newest first. */
export function useRecentNotes(max = 40, onlyOn = true): NoteEvent[] {
  const [events, setEvents] = useState<NoteEvent[]>([]);
  useEffect(
    () =>
      noteStream.subscribe((e) => {
        if (onlyOn && !e.on) return;
        setEvents((prev) => [e, ...prev].slice(0, max));
      }),
    [max, onlyOn],
  );
  return events;
}

/** Call `fn` for every note event while mounted, always with the latest closure. */
export function useNoteListener(fn: (e: NoteEvent) => void) {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => noteStream.subscribe((e) => ref.current(e)), []);
}
