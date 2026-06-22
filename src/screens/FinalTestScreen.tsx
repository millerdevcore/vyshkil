import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { topics } from '../data';
import { FINAL_QUESTIONS_PER_TOPIC } from '../lib/types';
import { buildFinalTest } from '../lib/finalTest';
import { QuizRunner } from '../components/QuizRunner';
import { Screen } from '../components/Screen';
import { loadProgress, saveProgress, recordFinal } from '../lib/progress';

export function FinalTestScreen() {
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(0);
  const questions = useMemo(() => buildFinalTest(topics, FINAL_QUESTIONS_PER_TOPIC), [attempt]);

  function exit() {
    if (window.confirm('Вийти з тесту? Результат не збережеться.')) navigate('/');
  }

  return (
    <Screen>
      <div className="quiz__header">
        <button type="button" className="back" onClick={exit}>✕ Вийти</button>
        <span className="quiz__title">🏁 Фінальний тест</span>
      </div>

      <QuizRunner
        key={attempt}
        questions={questions}
        onComplete={(percent) => saveProgress(recordFinal(loadProgress(), percent))}
        actionsFor={() => [
          { label: '↻ Пройти ще раз', onClick: () => setAttempt((a) => a + 1) },
          { label: 'На головну', onClick: () => navigate('/') },
        ]}
      />
    </Screen>
  );
}
