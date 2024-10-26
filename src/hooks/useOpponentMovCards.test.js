import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useContext } from 'react';
import useOpponentMovCards from './useOpponentMovCards';
import { GameContext } from '../contexts/GameProvider';

// Mock useContext to return custom values for GameContext
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: vi.fn(),
  };
});

describe('useOpponentMovCards', () => {
  const mockGameContext = {
    opponentsTotalMovCards: [
      { playerId: 1, totalMovCards: 5 },
      { playerId: 2, totalMovCards: 3 },
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

  it('should return the correct total movement cards for a specific opponent', () => {
    const { result } = renderHook(() => useOpponentMovCards());
    expect(result.current.getTotalMovCardsForOpponent(1)).toBe(5);
    expect(result.current.getTotalMovCardsForOpponent(2)).toBe(3);
  });

  it('should return 0 if the opponent is not found', () => {
    const { result } = renderHook(() => useOpponentMovCards());
    expect(result.current.getTotalMovCardsForOpponent(3)).toBe(0);
  });
});
