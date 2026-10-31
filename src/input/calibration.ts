// Pure maths for the 30-second mic calibration (SPEC "Hardware and input").

const MIN_THRESHOLD = 0.004;

function median(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** Silence threshold from level readings taken while the room is quiet. */
export function thresholdFromNoise(levels: number[]): number {
  const loudest = Math.max(0, ...levels);
  return Math.max(MIN_THRESHOLD, loudest * 2.5);
}

/** Keep the threshold at most a quarter of the softest played note, so soft playing still counts. */
export function thresholdFromPlaying(noiseThreshold: number, noteLevels: number[]): number {
  if (!noteLevels.length) return noiseThreshold;
  return Math.max(MIN_THRESHOLD, Math.min(noiseThreshold, Math.min(...noteLevels) / 4));
}

/**
 * Mic latency from "play on the click" taps: raw offset of each detected note from its click.
 * Taps more than 100 ms from the median are treated as slips and ignored.
 */
export function latencyFromTaps(offsetsMs: number[]): { latencyMs: number; used: number; spreadMs: number } | null {
  if (offsetsMs.length < 5) return null;
  const m = median(offsetsMs);
  const good = offsetsMs.filter((x) => Math.abs(x - m) <= 100);
  if (good.length < 5) return null;
  const latencyMs = median(good);
  const spreadMs = Math.round(median(good.map((x) => Math.abs(x - latencyMs))) * 10) / 10;
  return { latencyMs, used: good.length, spreadMs };
}
