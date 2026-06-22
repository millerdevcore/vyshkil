import { useMemo, useState } from 'react';
import type { Question } from '../lib/types';
import { shuffle } from '../lib/shuffle';
import { scorePercent, wrongAnswers, type Answer } from '../lib/scoring';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from './ProgressBar';
import { ResultScreen } from './ResultScreen';

type Props = {
  questions: Question[];
  onComplete?: (percent: number) => void;
  actionsFor: (percent: number) => { label: string; onClick: () => void }[];
};

export function QuizRunner({ questions, onComplete, actionsFor }: Props) {
  // Shuffle option labels once per mounted quiz, per question.
  const shuffledOptions = useMemo(
    () => questions.map((q) => shuffle(q.options)),
    [questions],
  );

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [done, setDone] = useState(false);

  if (done) {
    const percent = scorePercent(answers);
    const wrong = wrongAnswers(answers).map((a) => {
      const q = questions.find((x) => x.id === a.questionId)!;
      return { question: q, selectedLabel: q.options[a.selectedIndex] };
    });
    return <ResultScreen percent={percent} wrong={wrong} total={answers.length} actions={actionsFor(percent)} />;
  }

  const question = questions[index];
  const options = shuffledOptions[index];
  const isLast = index + 1 >= questions.length;

  function handleNext() {
    if (selected === null) return;
    const selectedLabel = options[selected];
    const selectedOriginalIndex = question.options.indexOf(selectedLabel);
    const next = [
      ...answers,
      { questionId: question.id, selectedIndex: selectedOriginalIndex, correctIndex: question.correctIndex },
    ];
    if (isLast) {
      setAnswers(next);
      setDone(true);
      onComplete?.(scorePercent(next));
    } else {
      setAnswers(next);
      setSelected(null);
      setIndex(index + 1);
    }
  }

  return (
    <div className="quiz">
      <span className="quiz__count">Питання {index + 1} / {questions.length}</span>
      <ProgressBar current={index + 1} total={questions.length} />
      <QuestionCard
        question={question}
        options={options}
        selectedIndex={selected}
        revealed={selected !== null}
        onSelect={setSelected}
      />
      {selected !== null && (
        <button type="button" className="cta quiz__next" onClick={handleNext}>
          {isLast ? 'Завершити →' : 'Далі →'}
        </button>
      )}
    </div>
  );
}
