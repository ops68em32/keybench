import type { ButtonHTMLAttributes, ReactNode } from 'react';

export function Card({ title, children, right }: { title: string; children: ReactNode; right?: ReactNode }) {
  return (
    <section className="rounded-md border border-rule bg-surface p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-xl">{title}</h2>
        {right}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function Button({ variant = 'primary', className = '', ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) {
  const look =
    variant === 'primary' ? 'bg-ink text-bg font-semibold' : 'border border-rule bg-surface text-ink';
  return (
    <button
      className={`min-h-11 rounded-md px-4 py-2 text-[15px] active:opacity-80 disabled:opacity-40 ${look} ${className}`}
      {...p}
    />
  );
}

/** Colour for a timing error: green on time, amber a little off, red outside tolerance. */
export function errorColor(ms: number, tolerance = 80): string {
  const a = Math.abs(ms);
  return a <= tolerance / 2 ? 'var(--lh)' : a <= tolerance ? 'var(--rh)' : 'var(--root)';
}

export function signedMs(ms: number): string {
  const r = Math.round(ms);
  return `${r > 0 ? '+' : r < 0 ? '−' : '±'}${Math.abs(r)} ms`;
}
