import { GUIDE_FIGURES } from '../diagrams/guideFigures';
import { KeyboardDiagram } from '../diagrams/KeyboardDiagram';

export function Diagrams() {
  return (
    <div className="space-y-5">
      <section>
        <p className="eyebrow">Reference</p>
        <h1 className="mt-1 text-[34px] leading-tight">Keyboard diagrams</h1>
        <p className="mt-2 text-muted">Every keyboard figure from the guide, drawn by the app. They should look the same as the book.</p>
      </section>
      {GUIDE_FIGURES.map((f) => (
        <KeyboardDiagram key={f.id} {...f.opts} caption={<span dangerouslySetInnerHTML={{ __html: f.cap }} />} />
      ))}
    </div>
  );
}
