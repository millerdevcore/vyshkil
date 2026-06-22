import type { Question } from '../lib/types';

type Props = {
  question: Question;
  options: string[];
  selectedIndex: number | null;
  revealed: boolean;
  onSelect: (displayIndex: number) => void;
};

const LETTERS = ['А', 'Б', 'В', 'Г', 'Ґ', 'Д'];

export function QuestionCard({ question, options, selectedIndex, revealed, onSelect }: Props) {
  const correctLabel = question.options[question.correctIndex];
  const isCorrectAnswer = selectedIndex !== null && options[selectedIndex] === correctLabel;

  function stateFor(label: string, idx: number): 'correct' | 'wrong' | 'dim' | 'idle' {
    if (!revealed) return 'idle';
    if (label === correctLabel) return 'correct';
    if (idx === selectedIndex) return 'wrong';
    return 'dim';
  }

  return (
    <div className="question">
      <div className="card qcard">
        <p className="qcard__prompt">{question.prompt}</p>
      </div>

      <ul className="options">
        {options.map((label, idx) => {
          const state = stateFor(label, idx);
          const glyph = state === 'correct' ? '✓' : state === 'wrong' ? '✕' : LETTERS[idx];
          return (
            <li key={label}>
              <button
                type="button"
                className="option"
                data-state={state}
                disabled={revealed}
                onClick={() => onSelect(idx)}
              >
                <span className="option__badge" aria-hidden="true">{glyph}</span>
                <span className="option__text">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {revealed && (
        <div className="explain">
          <div className={`explain__head ${isCorrectAnswer ? 'explain__head--ok' : 'explain__head--err'}`}>
            {isCorrectAnswer ? '✓ Правильно' : '✕ Неправильно'}
          </div>
          {question.explanation && <div className="explain__body">{question.explanation}</div>}
        </div>
      )}
    </div>
  );
}
