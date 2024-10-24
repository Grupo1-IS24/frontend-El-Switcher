import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useContext } from 'react';
import usePlayerTurn from './usePlayerTurn';
import { PlayerContext } from '../contexts/PlayerProvider';
import { GameContext } from '../contexts/GameProvider';

// Mock useContext to return custom values for PlayerContext and GameContext
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: vi.fn(),
  };
});

describe('usePlayerTurn', () => {
  const mockPlayerContext = { playerID: 1 };
  const mockGameContext = { playerTurnId: 1 };

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

  it('should return true for isPlayerTurn when playerId matches playerTurnId', () => {
    const { result } = renderHook(() => usePlayerTurn());
    expect(result.current.isPlayerTurn(1)).toBe(true);
  });

  it('should return false for isPlayerTurn when playerId does not match playerTurnId', () => {
    const { result } = renderHook(() => usePlayerTurn());
    expect(result.current.isPlayerTurn(2)).toBe(false);
  });

  it('should return true for isCurrentPlayerTurn when currentPlayerID matches playerTurnId', () => {
    const { result } = renderHook(() => usePlayerTurn());
    expect(result.current.isCurrentPlayerTurn()).toBe(true);
  });

  it('should return false for isCurrentPlayerTurn when currentPlayerID does not match playerTurnId', () => {
    useContext.mockImplementation((context) => {
      if (context === PlayerContext) {
        return { playerID: 2 };
      }
      if (context === GameContext) {
        return mockGameContext;
      }
    });

    const { result } = renderHook(() => usePlayerTurn());
    expect(result.current.isCurrentPlayerTurn()).toBe(false);
  });
});
