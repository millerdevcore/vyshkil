import { describe, it, expect, beforeEach } from 'vitest';
import {
  emptyProgress, loadProgress, saveProgress, markRead, recordQuiz, recordFinal, PROGRESS_KEY,
} from './progress';

describe('progress pure updaters', () => {
  it('markRead sets the flag', () => {
    expect(markRead(emptyProgress(), 'medicine').topicsRead.medicine).toBe(true);
  });

  it('recordQuiz keeps the maximum percent', () => {
    let p = recordQuiz(emptyProgress(), 'medicine', 60);
    p = recordQuiz(p, 'medicine', 40);
    expect(p.quizBest.medicine).toBe(60);
  });

  it('recordFinal keeps the maximum percent', () => {
    let p = recordFinal(emptyProgress(), 30);
    p = recordFinal(p, 80);
    expect(p.finalBest).toBe(80);
  });
});

describe('progress persistence', () => {
  beforeEach(() => localStorage.clear());

  it('round-trips through localStorage', () => {
    const p = recordQuiz(markRead(emptyProgress(), 'fire'), 'fire', 90);
    saveProgress(p);
    expect(loadProgress()).toEqual(p);
  });

  it('returns empty progress when nothing stored', () => {
    expect(loadProgress()).toEqual(emptyProgress());
  });

  it('returns empty progress when stored value is corrupt', () => {
    localStorage.setItem(PROGRESS_KEY, '{not json');
    expect(loadProgress()).toEqual(emptyProgress());
  });
});
