import type { Question } from '../lib/types';

type Wrong = { question: Question; selectedLabel: string };
type Action = { label: string; onClick: () => void };

function grade(percent: number): { cls: string; label: string } {
  if (percent >= 80) return { cls: 'score-panel--high', label: 'Відмінний результат' };
  if (percent >= 50) return { cls: 'score-panel--mid', label: 'Непогано, але є над чим попрацювати' };
  return { cls: 'score-panel--low', label: 'Потрібно повторити матеріал' };
}

export function ResultScreen({
  percent, wrong, total, actions,
}: { percent: number; wrong: Wrong[]; total: number; actions: Action[] }) {
  const correct = total - wrong.length;
  const g = grade(percent);
  const [primary, ...secondary] = actions;

  return (
    <div className="result">
      <div className={`score-panel ${g.cls}`}>
        <div className="score-panel__label">{g.label}</div>
        <div className="score-panel__pct">{percent}%</div>
        <div className="score-panel__sub">Правильних відповідей: {correct} / {total}</div>
      </div>

      {wrong.length > 0 ? (
        <>
          <h2 className="mistakes__title">Розбір помилок ({wrong.length})</h2>
          <ul className="mistakes">
            {wrong.map(({ question }) => (
              <li key={question.id} className="card card--flat mistake-card">
                <p className="mistake-card__q">{question.prompt}</p>
                <div className="answer-plate">
                  <span className="answer-plate__glyph" aria-hidden="true">✓</span>
                  <span>{question.options[question.correctIndex]}</span>
                </div>
                {question.explanation && (
                  <p className="mistake-card__exp">{question.explanation}</p>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="perfect">Жодної помилки. Бездоганно! 🎯</div>
      )}

      {actions.length > 0 && (
        <div className="result__actions">
          {primary && (
            <button type="button" className="cta" onClick={primary.onClick}>
              {primary.label}
            </button>
          )}
          {secondary.length > 0 && (
            <div className="secondary-row">
              {secondary.map((a) => (
                <button key={a.label} type="button" className="btn-secondary" onClick={a.onClick}>
                  {a.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
