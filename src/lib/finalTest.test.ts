import { describe, it, expect } from 'vitest';
import { buildFinalTest } from './finalTest';
import type { Topic, Question } from './types';

const q = (id: string): Question => ({ id, prompt: id, options: ['a', 'b'], correctIndex: 0 });
const topic = (id: string, ids: string[]): Topic => ({
  id, title: id, icon: '•', order: 1, sections: [], questions: ids.map(q),
});

const topics: Topic[] = [
  topic('t1', ['t1-q01', 't1-q02', 't1-q03']),
  topic('t2', ['t2-q01', 't2-q02']),
];

describe('buildFinalTest', () => {
  it('returns up to `questionsPerTopic` from each topic', () => {
    expect(buildFinalTest(topics, 2).length).toBe(4);
  });

  it('returns all available when fewer than questionsPerTopic', () => {
    expect(buildFinalTest(topics, 99).length).toBe(5);
  });

  it('never duplicates a question', () => {
    const out = buildFinalTest(topics, 2);
    const ids = out.map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
