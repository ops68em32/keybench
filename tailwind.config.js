/** @type {import('tailwindcss').Config} */
// Palette from GUIDE.md. Each token is a CSS variable (src/index.css) so dark mode
// swaps them in one place; the light values are the guide's hex codes.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)', // #F3F5F8
        surface: 'var(--surface)',
        ink: 'var(--ink)', // #1B2130
        muted: 'var(--muted)',
        rule: 'var(--rule)',
        soft: 'var(--soft)',
        rh: { DEFAULT: 'var(--rh)', ink: 'var(--rh-ink)' }, // right hand #C4841A
        lh: { DEFAULT: 'var(--lh)', ink: 'var(--lh-ink)' }, // left hand #1E8C82
        root: 'var(--root)', // root / landmark #B23A48
        tip: { DEFAULT: 'var(--tip)', edge: 'var(--tip-edge)' },
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', '"Segoe UI"', 'sans-serif'],
        serif: ['"Young Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
