export type Answer = {
  questionId: string;
  selectedIndex: number;
  correctIndex: number;
};

export function isCorrect(a: Answer): boolean {
  return a.selectedIndex === a.correctIndex;
}

export function wrongAnswers(answers: readonly Answer[]): Answer[] {
  return answers.filter((a) => !isCorrect(a));
}

export function scorePercent(answers: readonly Answer[]): number {
  if (answers.length === 0) return 0;
  const correct = answers.filter(isCorrect).length;
  return Math.round((correct / answers.length) * 100);
}
