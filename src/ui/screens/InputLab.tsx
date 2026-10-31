// Phase 1 debug view: proves the input layer and the clock before any drill is built on them.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMetronome } from '../../audio/useMetronome';
import { useInput } from '../../input/inputStore';
import { OnScreenKeyboard } from '../../input/onScreenKeyboard';
import { useSettings } from '../../store/settings';
import { ListeningCard } from '../input/ListeningCard';
import { MetronomeCard } from '../input/MetronomeCard';
import { NoteLog } from '../input/NoteLog';
import { PitchCheck } from '../input/PitchCheck';
import { ScaleTest } from '../input/ScaleTest';

export function InputLab() {
  const allowTest = new URLSearchParams(useLocation().search).has('test');

  useEffect(() => {
    useSettings.getState().load();
    useInput.getState().autoMidi();
    // Leaving the screen stops the mic and the metronome.
    return () => {
      useInput.getState().stopMic();
      useMetronome.getState().stop();
    };
  }, []);

  return (
    <div className="space-y-5">
      <section>
        <p className="eyebrow">Phase 1 · Input and clock</p>
        <h1 className="mt-1 text-[34px] leading-tight">Listen and keep time</h1>
        <p className="mt-2 text-muted">Check that the app hears your piano correctly and that the metronome holds steady.</p>
      </section>
      <ListeningCard allowTest={allowTest} />
      <OnScreenKeyboard />
      <NoteLog />
      <MetronomeCard />
      <PitchCheck />
      <ScaleTest />
    </div>
  );
}
