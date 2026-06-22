import { describe, it, expect } from 'vitest';
import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('keeps the same elements', () => {
    const input = [1, 2, 3, 4, 5];
    const out = shuffle(input);
    expect([...out].sort((a, b) => a - b)).toEqual(input);
  });

  it('does not mutate the input', () => {
    const input = [1, 2, 3];
    shuffle(input);
    expect(input).toEqual([1, 2, 3]);
  });

  it('is deterministic with a seeded rng', () => {
    const seq = [0.1, 0.9, 0.3, 0.7];
    let i = 0;
    const rng = () => seq[i++ % seq.length];
    const a = shuffle([1, 2, 3, 4, 5], rng);
    i = 0;
    const b = shuffle([1, 2, 3, 4, 5], rng);
    expect(a).toEqual(b);
  });
});
