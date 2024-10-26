import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useContext } from 'react';
import useFigureCards from './useFigureCards';
import { GameContext } from '../contexts/GameProvider';
import { PlayerContext } from '../contexts/PlayerProvider';

// Mock useContext to return custom values for GameContext and PlayerContext
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: vi.fn(),
  };
});

describe('useFigureCards', () => {
  const mockPlayerContext = {
    playerID: 1,
  };

  const mockGameContext = {
    figureCards: [
      { ownerId: 1, cards: ['card1', 'card2'] },
      { ownerId: 2, cards: ['card3', 'card4'] },
    ],
  };

  beforeEach(() => {
    useContext.mockImplementation((context) => {
      if (context === PlayerContext) {
        return mockPlayerContext;
      }
      if (context === GameContext) {
        return mockGameContext;
      }
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the correct figure cards for the current player', () => {
    const { result } = renderHook(() => useFigureCards());
    expect(result.current.currentPlayerFigureCards).toEqual(['card1', 'card2']);
  });

  it('should return the correct figure cards for a specific player', () => {
    const { result } = renderHook(() => useFigureCards());
    expect(result.current.getFigureCardsByPlayerId(2)).toEqual([
      'card3',
      'card4',
    ]);
  });
});
