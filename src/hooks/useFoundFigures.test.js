import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useContext } from 'react';
import useFoundFigures from './useFoundFigures';
import { GameContext } from '../contexts/GameProvider';
import { isEqualColorCard } from '../utils/isEqualColorCard';

// Mock useContext to return custom values for GameContext
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: vi.fn(),
  };
});

vi.mock('../utils/isEqualColorCard', () => ({
  isEqualColorCard: vi.fn(),
}));

describe('useFoundFigures', () => {
  const mockGameContext = {
    foundFigures: [
      [
        { row: 1, column: 1, color: 'red' },
        { row: 1, column: 2, color: 'red' },
      ],
      [
        { row: 2, column: 1, color: 'blue' },
        { row: 2, column: 2, color: 'blue' },
      ],
    ],
  };

  beforeEach(() => {
    useContext.mockImplementation((context) => {
      if (context === GameContext) {
        return mockGameContext;
      }
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the correct figure that contains the target color card', () => {
    isEqualColorCard.mockImplementation(
      (card1, card2) =>
        card1.row === card2.row &&
        card1.column === card2.column &&
        card1.color === card2.color
    );

    const { result } = renderHook(() => useFoundFigures());
    const targetColorCard = { row: 1, column: 1, color: 'red' };
    expect(result.current.findFigureByColorCard(targetColorCard)).toEqual([
      { row: 1, column: 1, color: 'red' },
      { row: 1, column: 2, color: 'red' },
    ]);
  });

  it('should return an empty array if no figure contains the target color card', () => {
    isEqualColorCard.mockImplementation(
      (card1, card2) =>
        card1.row === card2.row &&
        card1.column === card2.column &&
        card1.color === card2.color
    );

    const { result } = renderHook(() => useFoundFigures());
    const targetColorCard = { row: 3, column: 1, color: 'green' };
    expect(result.current.findFigureByColorCard(targetColorCard)).toEqual([]);
  });

  it('should return true if the target color card is part of any figure', () => {
    isEqualColorCard.mockImplementation(
      (card1, card2) =>
        card1.row === card2.row &&
        card1.column === card2.column &&
        card1.color === card2.color
    );

    const { result } = renderHook(() => useFoundFigures());
    const targetColorCard = { row: 2, column: 1, color: 'blue' };
    expect(result.current.isColorCardInAnyFigure(targetColorCard)).toBe(true);
  });

  it('should return false if the target color card is not part of any figure', () => {
    isEqualColorCard.mockImplementation(
      (card1, card2) =>
        card1.row === card2.row &&
        card1.column === card2.column &&
        card1.color === card2.color
    );

    const { result } = renderHook(() => useFoundFigures());
    const targetColorCard = { row: 3, column: 1, color: 'green' };
    expect(result.current.isColorCardInAnyFigure(targetColorCard)).toBe(false);
  });
});
