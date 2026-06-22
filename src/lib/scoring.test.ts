import { describe, it, expect } from 'vitest';
import { scorePercent, isCorrect, wrongAnswers, type Answer } from './scoring';

const a = (selectedIndex: number, correctIndex: number, id = 'q'): Answer => ({
  questionId: id, selectedIndex, correctIndex,
});

describe('scoring', () => {
  it('isCorrect compares indices', () => {
    expect(isCorrect(a(1, 1))).toBe(true);
    expect(isCorrect(a(0, 1))).toBe(false);
  });

  it('scorePercent rounds to nearest integer', () => {
    expect(scorePercent([a(0, 0), a(1, 1), a(0, 1)])).toBe(67); // 2/3
  });

  it('scorePercent of empty is 0', () => {
    expect(scorePercent([])).toBe(0);
  });

  it('wrongAnswers returns only incorrect ones', () => {
    const wrong = wrongAnswers([a(0, 0, 'x'), a(0, 1, 'y')]);
    expect(wrong.map((w) => w.questionId)).toEqual(['y']);
  });
});
