// Draws the app icons (PNG) with no image tools: an ink square with three white keys,
// two black keys and a right-hand dot on C, in the guide palette. Run: npm run icons
import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

const INK = [0x1b, 0x21, 0x30];
const WHITE = [0xff, 0xff, 0xff];
const BKEY = [0x26, 0x2b, 0x36];
const RH = [0xc4, 0x84, 0x1a];

function draw(size, safe) {
  const px = new Uint8Array(size * size * 3);
  const set = (x, y, c) => px.set(c, (y * size + x) * 3);
  const rect = (x0, y0, w, h, c) => {
    for (let y = Math.round(y0); y < Math.round(y0 + h); y++)
      for (let x = Math.round(x0); x < Math.round(x0 + w); x++) set(x, y, c);
  };
  const circle = (cx, cy, r, c) => {
    for (let y = Math.floor(cy - r); y <= cy + r; y++)
      for (let x = Math.floor(cx - r); x <= cx + r; x++) if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) set(x, y, c);
  };
  rect(0, 0, size, size, INK);
  // Keyboard inside the safe area (maskable icons keep content in the middle 80%).
  const area = size * safe;
  const kw = area / 3,
    kh = area * 0.9,
    x0 = (size - area) / 2,
    y0 = (size - kh) / 2,
    gap = Math.max(2, size * 0.012);
  for (let i = 0; i < 3; i++) rect(x0 + i * kw + gap / 2, y0, kw - gap, kh, WHITE);
  const bw = kw * 0.6,
    bh = kh * 0.6;
  for (let i = 1; i < 3; i++) rect(x0 + i * kw - bw / 2, y0, bw, bh, BKEY);
  circle(x0 + kw / 2, y0 + kh * 0.8, kw * 0.26, RH);
  return px;
}

function png(size, safe) {
  const raw = draw(size, safe);
  const rows = Buffer.alloc((size * 3 + 1) * size);
  for (let y = 0; y < size; y++) {
    rows[y * (size * 3 + 1)] = 0;
    Buffer.from(raw.buffer, y * size * 3, size * 3).copy(rows, y * (size * 3 + 1) + 1);
  }
  const crcTable = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });
  const crc = (buf) => {
    let c = 0xffffffff;
    for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };
  const chunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type), data]);
    const c = Buffer.alloc(4);
    c.writeUInt32BE(crc(td));
    return Buffer.concat([len, td, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // RGB
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(rows)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

writeFileSync('public/icon-192.png', png(192, 0.7));
writeFileSync('public/icon-512.png', png(512, 0.7));
writeFileSync('public/icon-512-maskable.png', png(512, 0.56));
writeFileSync('public/apple-touch-icon.png', png(180, 0.7));
console.log('Icons written to public/');
