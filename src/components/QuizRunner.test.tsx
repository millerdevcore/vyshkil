import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuizRunner } from './QuizRunner';
import type { Question } from '../lib/types';

const questions: Question[] = [
  { id: 'a', prompt: 'Q1', options: ['correct1', 'wrong1'], correctIndex: 0, explanation: 'e1' },
  { id: 'b', prompt: 'Q2', options: ['correct2', 'wrong2'], correctIndex: 0, explanation: 'e2' },
];

async function answer(label: RegExp) {
  await userEvent.click(screen.getByRole('button', { name: label }));
  const next =
    screen.queryByRole('button', { name: /Далі/ }) ??
    screen.getByRole('button', { name: /Завершити/ });
  await userEvent.click(next);
}

describe('QuizRunner', () => {
  it('walks through questions and reports 100% when all correct', async () => {
    const onComplete = vi.fn();
    render(<QuizRunner questions={questions} onComplete={onComplete} actionsFor={() => []} />);

    expect(screen.getByText('Q1')).toBeInTheDocument();
    await answer(/correct1/);
    expect(screen.getByText('Q2')).toBeInTheDocument();
    await answer(/correct2/);

    expect(screen.getByText(/100%/)).toBeInTheDocument();
    expect(onComplete).toHaveBeenCalledWith(100);
  });

  it('shows wrong answers on the result screen', async () => {
    render(<QuizRunner questions={questions} actionsFor={() => []} />);
    await answer(/wrong1/);
    await answer(/correct2/);
    expect(screen.getByText(/50%/)).toBeInTheDocument();
    expect(screen.getByText('Q1')).toBeInTheDocument(); // listed as a mistake
  });

  it('renders result actions', async () => {
    const onClick = vi.fn();
    render(
      <QuizRunner questions={[questions[0]]}
        actionsFor={() => [{ label: 'Повторити', onClick }]} />,
    );
    await answer(/correct1/);
    await userEvent.click(screen.getByRole('button', { name: 'Повторити' }));
    expect(onClick).toHaveBeenCalled();
  });
});
