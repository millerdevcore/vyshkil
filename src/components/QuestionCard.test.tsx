import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuestionCard } from './QuestionCard';
import type { Question } from '../lib/types';

const q: Question = {
  id: 'q1', prompt: 'Питання?', options: ['Правильна', 'Хибна'], correctIndex: 0,
  explanation: 'Бо так.',
};

describe('QuestionCard', () => {
  it('calls onSelect with the tapped display index', async () => {
    const onSelect = vi.fn();
    render(
      <QuestionCard question={q} options={['Хибна', 'Правильна']}
        selectedIndex={null} revealed={false} onSelect={onSelect} />,
    );
    await userEvent.click(screen.getByRole('button', { name: /Правильна/ }));
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it('marks correct and wrong options when revealed', () => {
    render(
      <QuestionCard question={q} options={['Хибна', 'Правильна']}
        selectedIndex={0} revealed onSelect={() => {}} />,
    );
    expect(screen.getByRole('button', { name: /Правильна/ })).toHaveAttribute('data-state', 'correct');
    expect(screen.getByRole('button', { name: /Хибна/ })).toHaveAttribute('data-state', 'wrong');
    expect(screen.getByText('Бо так.')).toBeInTheDocument();
  });
});
