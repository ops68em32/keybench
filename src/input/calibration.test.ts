import { describe, expect, it } from 'vitest';
import { latencyFromTaps, thresholdFromNoise, thresholdFromPlaying } from './calibration';

describe('thresholdFromNoise', () => {
  it('sits safely above the loudest room noise', () => {
    const levels = [0.001, 0.0012, 0.0009, 0.0011, 0.003, 0.001]; // one louder blip
    const t = thresholdFromNoise(levels);
    expect(t).toBeGreaterThan(0.003);
    expect(t).toBeLessThan(0.02);
  });
  it('never goes below a minimum in a silent room', () => {
    expect(thresholdFromNoise([0, 0, 0])).toBe(0.004);
  });
});

describe('thresholdFromPlaying', () => {
  it('stays well below the level of a played note', () => {
    expect(thresholdFromPlaying(0.01, [0.2, 0.15, 0.25])).toBe(0.01);
    expect(thresholdFromPlaying(0.05, [0.08, 0.1])).toBeCloseTo(0.02); // noisy room, soft playing: cap at 1/4 of softest
  });
});

describe('latencyFromTaps', () => {
  it('takes the median offset and ignores a stray tap', () => {
    expect(latencyFromTaps([60, 64, 58, 62, 61, 300, 59, 63])).toEqual({ latencyMs: 61, used: 7, spreadMs: 2 });
  });
  it('needs at least 5 usable taps', () => {
    expect(latencyFromTaps([60, 62, 61])).toBeNull();
  });
});
