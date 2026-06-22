import type { Section } from '../lib/types';
import { renderInline } from '../lib/renderInline';

export function SectionView({ section }: { section: Section }) {
  if (section.kind === 'callout') {
    return (
      <div className="callout">
        <span className="callout__mark" aria-hidden="true">❖</span>
        <span className="callout__text">{renderInline(section.body)}</span>
      </div>
    );
  }

  if (section.kind === 'list') {
    return (
      <div>
        {section.heading && <h2 className="h2">{section.heading}</h2>}
        <ol className="seclist">
          {section.items.map((item, i) => (
            <li key={i} className="seclist__item">
              <span className="num">{i + 1}</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (section.kind === 'table') {
    return (
      <div>
        {section.heading && <h2 className="h2">{section.heading}</h2>}
        <div className="sectable">
          {section.rows.map(([k, v], i) => (
            <div key={i} className="sectable__row">
              <div className="sectable__key">{renderInline(k)}</div>
              <div className="sectable__val">{renderInline(v)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="sectext">
      {section.heading && <h2 className="h2">{section.heading}</h2>}
      {section.body.map((p, i) => <p key={i}>{renderInline(p)}</p>)}
    </div>
  );
}
