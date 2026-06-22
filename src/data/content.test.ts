import { describe, it, expect } from 'vitest';
import { topics } from './index';

describe('content integrity', () => {
  it('has at least one topic', () => {
    expect(topics.length).toBeGreaterThan(0);
  });

  it('every question id is globally unique', () => {
    const ids = topics.flatMap((t) => t.questions.map((q) => q.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every question is well-formed', () => {
    for (const t of topics) {
      for (const q of t.questions) {
        expect(q.options.length, `${q.id} options`).toBeGreaterThanOrEqual(2);
        expect(q.correctIndex, `${q.id} correctIndex lower`).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex, `${q.id} correctIndex upper`).toBeLessThan(q.options.length);
        expect(q.prompt.trim().length, `${q.id} prompt`).toBeGreaterThan(0);
      }
    }
  });

  it('every topic has study sections', () => {
    for (const t of topics) {
      expect(t.sections.length, `${t.id} sections`).toBeGreaterThan(0);
    }
  });

  it('every topic has at least 8 questions', () => {
    for (const t of topics) {
      expect(t.questions.length, `${t.id} question count`).toBeGreaterThanOrEqual(8);
    }
  });

  it('every question has unique option labels', () => {
    for (const t of topics) {
      for (const q of t.questions) {
        const unique = new Set(q.options);
        expect(unique.size, `${q.id} duplicate option labels`).toBe(q.options.length);
      }
    }
  });
});
