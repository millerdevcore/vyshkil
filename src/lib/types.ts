export type Question = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export type Section =
  | { kind: 'text'; heading?: string; body: string[] }
  | { kind: 'callout'; body: string }
  | { kind: 'list'; heading?: string; items: string[] }
  | { kind: 'table'; heading?: string; rows: [string, string][] };

export type Topic = {
  id: string;
  title: string;
  icon: string;
  order: number;
  sections: Section[];
  questions: Question[];
};

export type Progress = {
  topicsRead: Record<string, boolean>;
  quizBest: Record<string, number>;
  finalBest: number;
};

export const FINAL_QUESTIONS_PER_TOPIC = 10;
