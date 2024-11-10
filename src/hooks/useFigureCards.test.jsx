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
      { ownerId: 1, cards: [{ figureCardId: 1 }, { figureCardId: 2 }] },
      {
        ownerId: 2,
        cards: [{ figureCardId: 3, isBlocked: true }, { figureCardId: 4 }],
      },
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
    expect(result.current.currentPlayerFigureCards).toEqual([
      { figureCardId: 1 },
      { figureCardId: 2 },
    ]);
  });

  it('should return the correct figure cards for a specific player', () => {
    const { result } = renderHook(() => useFigureCards());
    expect(result.current.getFigureCardsByPlayerId(2)).toEqual([
      { figureCardId: 3, isBlocked: true },
      { figureCardId: 4 },
    ]);
  });

  it('should check if the current player owns a specific figure card', () => {
    const { result } = renderHook(() => useFigureCards());
    expect(
      result.current.isCurrentPlayerOwnerFigureCard({ figureCardId: 1 })
    ).toBe(true);
    expect(
      result.current.isCurrentPlayerOwnerFigureCard({ figureCardId: 3 })
    ).toBe(false);
  });

  it('should check if a specific player has blocked figure cards', () => {
    const { result } = renderHook(() => useFigureCards());
    expect(result.current.hasBlockedFigureCardByPlayerId(2)).toBe(true);
    expect(result.current.hasBlockedFigureCardByPlayerId(1)).toBe(false);
  });
});
