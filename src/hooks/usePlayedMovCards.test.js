import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useContext } from 'react';
import usePlayedMovCards from './usePlayedMovCards';
import { GameContext } from '../contexts/GameProvider';

// Mock useContext to return custom values for GameContext
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: vi.fn(),
  };
});

describe('usePlayedMovCards', () => {
  const mockGameContext = {
    movementCards: [
      { movementcardId: 1, played: true },
      { movementcardId: 2, played: false },
      { movementcardId: 3, played: true },
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

  it('should return true for hasAnyMovementCardPlayed when any movement card has been played', () => {
    const { result } = renderHook(() => usePlayedMovCards());
    expect(result.current.hasAnyMovementCardPlayed()).toBe(true);
  });

  it('should return false for hasAnyMovementCardPlayed when no movement card has been played', () => {
    useContext.mockImplementation((context) => {
      if (context === GameContext) {
        return {
          movementCards: [
            { movementcardId: 1, played: false },
            { movementcardId: 2, played: false },
            { movementcardId: 3, played: false },
          ],
        };
      }
    });

    const { result } = renderHook(() => usePlayedMovCards());
    expect(result.current.hasAnyMovementCardPlayed()).toBe(false);
  });

  it('should return true for areAllMovementCardsPlayed when all movement cards have been played', () => {
    useContext.mockImplementation((context) => {
      if (context === GameContext) {
        return {
          movementCards: [
            { movementcardId: 1, played: true },
            { movementcardId: 2, played: true },
            { movementcardId: 3, played: true },
          ],
        };
      }
    });

    const { result } = renderHook(() => usePlayedMovCards());
    expect(result.current.areAllMovementCardsPlayed()).toBe(true);
  });

  it('should return false for areAllMovementCardsPlayed when not all movement cards have been played', () => {
    const { result } = renderHook(() => usePlayedMovCards());
    expect(result.current.areAllMovementCardsPlayed()).toBe(false);
  });

  it('should return true for isMovementCardPlayed when the target movement card has been played', () => {
    const { result } = renderHook(() => usePlayedMovCards());
    const targetMovCard = { movementcardId: 1 };
    expect(result.current.isMovementCardPlayed(targetMovCard)).toBe(true);
  });

  it('should return false for isMovementCardPlayed when the target movement card has not been played', () => {
    const { result } = renderHook(() => usePlayedMovCards());
    const targetMovCard = { movementcardId: 2 };
    expect(result.current.isMovementCardPlayed(targetMovCard)).toBe(false);
  });
});
