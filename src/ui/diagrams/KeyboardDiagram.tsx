import { useMemo, type ReactNode } from 'react';
import { keyboardSvg, type KeyboardOptions } from './keyboard';

interface Props extends KeyboardOptions {
  caption?: ReactNode;
  className?: string;
}

/** A guide-style figure: the keyboard SVG in a card, with an optional caption. */
export function KeyboardDiagram({ caption, className = '', ...opts }: Props) {
  // keyboardSvg escapes every piece of text it is given, so injecting it is safe.
  const key = JSON.stringify(opts);
  const svg = useMemo(() => keyboardSvg(JSON.parse(key) as KeyboardOptions), [key]);
  return (
    <figure className={`fig ${className}`}>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      {caption && <figcaption className="cap">{caption}</figcaption>}
    </figure>
  );
}
