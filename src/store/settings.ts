import { create } from 'zustand';
import { db, type Settings } from './db';

interface SettingsStore {
  settings: Settings | null;
  /** Set when IndexedDB could not be opened (e.g. some private-browsing modes). */
  error: string | null;
  load: () => Promise<void>;
  update: (patch: Partial<Omit<Settings, 'id'>>) => Promise<void>;
}

export const useSettings = create<SettingsStore>((set, get) => ({
  settings: null,
  error: null,
  load: async () => {
    try {
      set({ settings: await db.getSettings(), error: null });
    } catch (e) {
      set({ error: e instanceof Error ? e.message : String(e) });
    }
  },
  update: async (patch) => {
    const current = get().settings ?? (await db.getSettings());
    const next = { ...current, ...patch };
    await db.settings.put(next);
    set({ settings: next });
  },
}));
