import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './HomeScreen';
import { TopicScreen } from './TopicScreen';
import { topics } from '../data';

beforeEach(() => localStorage.clear());

describe('HomeScreen', () => {
  it('lists every topic title and the final-test entry', () => {
    render(<MemoryRouter><HomeScreen /></MemoryRouter>);
    for (const t of topics) {
      expect(screen.getByText(t.title)).toBeInTheDocument();
    }
    expect(screen.getByText(/Фінальний тест/i)).toBeInTheDocument();
  });
});

describe('TopicScreen', () => {
  it('renders the topic material and a quiz link', () => {
    const first = topics[0];
    render(
      <MemoryRouter initialEntries={[`/topic/${first.id}`]}>
        <Routes><Route path="/topic/:id" element={<TopicScreen />} /></Routes>
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: first.title })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Пройти квіз/i })).toBeInTheDocument();
  });
});
