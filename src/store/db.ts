// IndexedDB schema (SPEC.md "Data model"). Five tables of user state; everything
// derived (streak, sight-reading level, counters) is computed, never stored.
import Dexie, { type Table } from 'dexie';

export type SkillId = string;
export type InputSource = 'mic' | 'midi' | 'screen';

export interface SkillState {
  id: SkillId;
  status: 'locked' | 'learning' | 'mastered' | 'review';
  /** Days until the next review. */
  interval: number;
  /** ISO date (YYYY-MM-DD) the skill is next due. */
  due: string;
  /** ISO dates of the days a clean run was logged. */
  cleanDays: string[];
  bestBpm?: number;
  bestLevel?: number;
  lastSeen?: number;
}

export interface NoteError {
  note: number;
  expected?: number;
  got?: number;
  dtMs?: number;
}

export interface Attempt {
  id?: number;
  ts: number;
  drillId: string;
  unitId: string;
  params: unknown;
  score: number;
  clean: boolean;
  approximate: boolean;
  bpm?: number;
  level?: number;
  errors: NoteError[];
  durationS: number;
  inputSource: InputSource;
}

export interface ChunkState {
  hand: 'rh' | 'lh' | 'both';
  bpm: number;
  cleanRuns: number;
}

export interface Recording {
  ts: number;
  blob: Blob;
}

export interface PieceState {
  id: string;
  chunkStates: ChunkState[][];
  completedAt?: number;
  recordings: Recording[];
}

export interface SessionBlockLog {
  track: string;
  drills: string[];
  minutes: number;
}

export interface SessionLog {
  /** ISO date, one row per day. */
  date: string;
  planned: SessionBlockLog[];
  completed: SessionBlockLog[];
  minutes: number;
  notes?: string;
}

export interface MicCalibration {
  /** Measured mic path latency subtracted from every timing grade. */
  latencyMs: number;
  /** Input level below which audio is ignored (0..1). */
  threshold: number;
  calibratedAt: number;
  /** Levels heard during calibration (RMS 0..1), kept for chord detection later. */
  noiseLevel?: number;
  noteLevel?: number;
  chordLevel?: number;
}

export interface Settings {
  id: 'app';
  inputPreference: 'auto' | 'mic' | 'midi';
  micCalibration?: MicCalibration;
  metronomeSound: 'woodblock' | 'click';
  theme: 'system' | 'light' | 'dark';
  dailyMinutes: number;
  name: string;
}

export const DEFAULT_SETTINGS: Settings = {
  id: 'app',
  inputPreference: 'auto',
  metronomeSound: 'woodblock',
  theme: 'system',
  dailyMinutes: 30,
  name: '',
};

export class KeybenchDB extends Dexie {
  skills!: Table<SkillState, SkillId>;
  attempts!: Table<Attempt, number>;
  pieces!: Table<PieceState, string>;
  sessions!: Table<SessionLog, string>;
  settings!: Table<Settings, 'app'>;

  constructor(name = 'keybench') {
    super(name);
    this.version(1).stores({
      skills: 'id, status, due',
      attempts: '++id, ts, drillId, unitId, [drillId+ts]',
      pieces: 'id',
      sessions: 'date',
      settings: 'id',
    });
  }

  /** Settings row, created with defaults on first run. */
  async getSettings(): Promise<Settings> {
    const existing = await this.settings.get('app');
    if (existing) return { ...DEFAULT_SETTINGS, ...existing };
    await this.settings.put(DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  }
}

export const db = new KeybenchDB();
