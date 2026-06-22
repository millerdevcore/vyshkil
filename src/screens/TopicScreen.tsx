import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { topics, topicById } from '../data';
import { SectionView } from '../components/SectionView';
import { Screen } from '../components/Screen';
import { loadProgress, saveProgress, markRead } from '../lib/progress';
import chevron from '../assets/chevron.svg';

export function TopicScreen() {
  const { id } = useParams();
  const topic = id ? topicById(id) : undefined;

  useEffect(() => {
    if (topic) saveProgress(markRead(loadProgress(), topic.id));
  }, [topic]);

  if (!topic) {
    return (
      <Screen>
        <p className="notfound">Тему не знайдено. <Link to="/">На головну</Link></p>
      </Screen>
    );
  }

  const idx = topics.findIndex((t) => t.id === topic.id);
  const prev = topics[idx - 1];
  const next = topics[idx + 1];

  return (
    <Screen>
      <div className="topic__header">
        <Link className="back" to="/">‹ Меню</Link>
        <img className="topic__chevron" src={chevron} alt="" aria-hidden="true" />
      </div>

      <div className="topic__title-row">
        <span className="topic__emoji" aria-hidden="true">{topic.icon}</span>
        <h1 className="h1 topic__title">{topic.title}</h1>
      </div>
      <div className="topic__rule" />

      <div className="sections">
        {topic.sections.map((s, i) => <SectionView key={i} section={s} />)}
      </div>

      <nav className="topic__nav">
        {prev
          ? <Link className="nav-btn" to={`/topic/${prev.id}`}>‹ {prev.title}</Link>
          : <span className="nav-btn nav-btn--disabled">‹ Початок</span>}
        {next
          ? <Link className="nav-btn" to={`/topic/${next.id}`}>{next.title} ›</Link>
          : <span className="nav-btn nav-btn--disabled">Кінець ›</span>}
      </nav>

      {topic.questions.length > 0 && (
        <div className="quiz-bar">
          <Link className="cta" to={`/quiz/${topic.id}`}>
            Пройти квіз · {Math.min(topic.questions.length, 15)} питань →
          </Link>
        </div>
      )}
    </Screen>
  );
}
