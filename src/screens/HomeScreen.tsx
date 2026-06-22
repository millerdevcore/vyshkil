import { Link } from 'react-router-dom';
import { topics } from '../data';
import { loadProgress } from '../lib/progress';
import { Screen } from '../components/Screen';
import chevron from '../assets/chevron.svg';

export function HomeScreen() {
  const progress = loadProgress();
  const readCount = topics.filter((t) => progress.topicsRead[t.id]).length;
  const pct = topics.length > 0 ? Math.round((readCount / topics.length) * 100) : 0;

  return (
    <Screen>
      <header className="home__splash">
        <img className="home__chevron" src={chevron} alt="Шеврон 122 ОБЗ" />
        <h1 className="h1 home__brand">Вишкіл</h1>
        <div className="home__course">122 ОБЗ · Базовий курс</div>
        <p className="home__tagline">
          Перелік інформації для військовослужбовців · самопідготовка
        </p>
      </header>

      <div className="progress-card">
        <div className="progress-card__head">
          <span>Прогрес курсу</span>
          <b>{readCount} / {topics.length} теми</b>
        </div>
        <div className="progress-card__track">
          <div className="progress-card__fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <ul className="topics">
        {topics.map((t) => {
          const read = !!progress.topicsRead[t.id];
          const best = progress.quizBest[t.id];
          return (
            <li key={t.id}>
              <Link className="topic-card" to={`/topic/${t.id}`}>
                <span className="topic-card__icon" aria-hidden="true">{t.icon}</span>
                <span className="topic-card__body">
                  <span className="topic-card__title">{t.title}</span>
                  <span className="topic-card__meta">
                    {read
                      ? <span className="badge badge--read">✓ Прочитано</span>
                      : <span className="badge badge--unread">Не відкрито</span>}
                    {best != null && <span className="topic-card__score">Квіз: {best}%</span>}
                  </span>
                </span>
                <span className="topic-card__arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="divider"><span className="divider__label">Перевір себе</span></div>

      <Link className="final-card" to="/final">
        <div className="final-card__row">
          <div>
            <div className="final-card__title">🏁 Фінальний тест</div>
            <div className="final-card__sub">{topics.length * 10} питань з усіх {topics.length} тем · вперемішку</div>
          </div>
          <span className="final-card__arrow" aria-hidden="true">→</span>
        </div>
        {progress.finalBest > 0 && (
          <div className="final-card__best">Найкращий результат: {progress.finalBest}%</div>
        )}
      </Link>

      <Link className="about-link" to="/about"><span>Про застосунок</span></Link>
    </Screen>
  );
}
