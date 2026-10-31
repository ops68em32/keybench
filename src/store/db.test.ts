import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS, KeybenchDB } from './db';

describe('KeybenchDB', () => {
  it('has the five tables from the spec', () => {
    const db = new KeybenchDB('t-tables');
    expect(db.tables.map((t) => t.name).sort()).toEqual(['attempts', 'pieces', 'sessions', 'settings', 'skills']);
  });

  it('creates default settings on first run and keeps changes', async () => {
    const db = new KeybenchDB('t-settings');
    expect(await db.getSettings()).toEqual(DEFAULT_SETTINGS);
    await db.settings.update('app', { dailyMinutes: 45 });
    expect((await db.getSettings()).dailyMinutes).toBe(45);
  });

  it('stores attempts with auto ids and finds them by drill', async () => {
    const db = new KeybenchDB('t-attempts');
    const base = { unitId: 'u1', params: {}, score: 1, clean: true, approximate: false, errors: [], durationS: 30, inputSource: 'mic' as const };
    await db.attempts.bulkAdd([
      { ...base, ts: 1, drillId: 'key-finder' },
      { ...base, ts: 2, drillId: 'flashcard' },
      { ...base, ts: 3, drillId: 'key-finder' },
    ]);
    expect(await db.attempts.where('drillId').equals('key-finder').count()).toBe(2);
  });
});
