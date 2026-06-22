import type { Progress } from './types';

export const PROGRESS_KEY = 'scaryquiz.progress.v1';

export function emptyProgress(): Progress {
  return { topicsRead: {}, quizBest: {}, finalBest: 0 };
}

export function markRead(p: Progress, topicId: string): Progress {
  return { ...p, topicsRead: { ...p.topicsRead, [topicId]: true } };
}

export function recordQuiz(p: Progress, topicId: string, percent: number): Progress {
  const prev = p.quizBest[topicId] ?? 0;
  return { ...p, quizBest: { ...p.quizBest, [topicId]: Math.max(prev, percent) } };
}

export function recordFinal(p: Progress, percent: number): Progress {
  return { ...p, finalBest: Math.max(p.finalBest, percent) };
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return { ...emptyProgress(), ...parsed };
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(p: Progress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  } catch {
    // storage unavailable (private mode) — degrade gracefully
  }
}
