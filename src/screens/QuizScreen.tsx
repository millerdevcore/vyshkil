import { useState, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { topics, topicById } from '../data';
import { QuizRunner } from '../components/QuizRunner';
import { Screen } from '../components/Screen';
import { loadProgress, saveProgress, recordQuiz } from '../lib/progress';
import { shuffle } from '../lib/shuffle';

export function QuizScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(0);
  const topic = id ? topicById(id) : undefined;

  const questions = useMemo(() => {
    if (!topic) return [];
    return shuffle(topic.questions).slice(0, 15);
  }, [topic, attempt]);

  if (!topic) {
    return (
      <Screen>
        <p className="notfound">Тему не знайдено. <Link to="/">На головну</Link></p>
      </Screen>
    );
  }

  const idx = topics.findIndex((t) => t.id === topic.id);
  const next = topics[idx + 1];

  function exit() {
    if (window.confirm('Вийти з квізу? Результат не збережеться.')) navigate('/');
  }

  return (
    <Screen>
      <div className="quiz__header">
        <button type="button" className="back" onClick={exit}>✕ Вийти</button>
        <span className="quiz__title">{topic.title}</span>
      </div>

      <QuizRunner
        key={`${topic.id}-${attempt}`}
        questions={questions}
        onComplete={(percent) => saveProgress(recordQuiz(loadProgress(), topic.id, percent))}
        actionsFor={() => [
          { label: '↻ Повторити', onClick: () => setAttempt((a) => a + 1) },
          { label: 'Назад до теми', onClick: () => navigate(`/topic/${topic.id}`) },
          next
            ? { label: 'Наступна тема →', onClick: () => navigate(`/topic/${next.id}`) }
            : { label: 'На головну', onClick: () => navigate('/') },
        ]}
      />
    </Screen>
  );
}
