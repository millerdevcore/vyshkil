import type { Topic, Question } from './types';
import { shuffle } from './shuffle';

export function buildFinalTest(
  topics: readonly Topic[],
  questionsPerTopic: number = 10,
  rng: () => number = Math.random,
): Question[] {
  const pool = topics.flatMap((t) => {
    return shuffle(t.questions, rng).slice(0, questionsPerTopic);
  });
  return shuffle(pool, rng);
}
