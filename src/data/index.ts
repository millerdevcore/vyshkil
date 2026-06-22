import type { Topic } from '../lib/types';
import { medicine } from './topics/medicine';
import { communications } from './topics/communications';
import { fire } from './topics/fire';
import { tactics } from './topics/tactics';

export const topics: Topic[] = [medicine, communications, fire, tactics].sort(
  (a, b) => a.order - b.order,
);

export function topicById(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}
