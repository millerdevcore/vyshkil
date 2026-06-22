import { describe, it, expect } from 'vitest';
import type { Topic, Question, Section } from './types';

describe('types', () => {
  it('allows a well-formed topic literal', () => {
    const q: Question = { id: 'med-q01', prompt: 'p', options: ['a', 'b'], correctIndex: 0 };
    const s: Section = { kind: 'text', body: ['hello'] };
    const t: Topic = { id: 'medicine', title: 'Мед', icon: '🩺', order: 1, sections: [s], questions: [q] };
    expect(t.questions[0].correctIndex).toBe(0);
    expect(t.sections[0].kind).toBe('text');
  });
});
