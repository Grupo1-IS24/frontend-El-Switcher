import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useGetGame from './useGetGame';
import { getGame } from '../service/GetGameService';

// Mock getGame service
vi.mock('../service/GetGameService', () => ({
  getGame: vi.fn(),
}));

describe('useGetGame', () => {
  const gameId = 1;
  const mockGame = {
    gameId: 1,
    gameName: 'Test Game',
    maxPlayers: 4,
    minPlayers: 2,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with null game', () => {
    const { result } = renderHook(() => useGetGame(gameId));
    expect(result.current.game).toBeNull();
  });

  it('should fetch and set game on mount', async () => {
    getGame.mockResolvedValueOnce(mockGame);

    const { result } = renderHook(() => useGetGame(gameId));

    await waitFor(() => {
      expect(result.current.game).toEqual(mockGame);
    });

    expect(getGame).toHaveBeenCalledWith(gameId);
  });

  it('should handle error when fetching game', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const errorMessage = 'Error fetching game';
    getGame.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useGetGame(gameId));

    await waitFor(() => {
      expect(result.current.game).toBeNull();
    });

    expect(getGame).toHaveBeenCalledWith(gameId);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Error fetching game with ID ${gameId}:`,
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it('should refresh game when refreshGame is called', async () => {
    getGame.mockResolvedValueOnce(mockGame);

    const { result } = renderHook(() => useGetGame(gameId));

    await waitFor(() => {
      expect(result.current.game).toEqual(mockGame);
    });

    const newMockGame = {
      gameId: 1,
      gameName: 'Updated Test Game',
      maxPlayers: 4,
      minPlayers: 2,
    };
    getGame.mockResolvedValueOnce(newMockGame);

    act(() => {
      result.current.refreshGame();
    });

    await waitFor(() => {
      expect(result.current.game).toEqual(newMockGame);
    });

    expect(getGame).toHaveBeenCalledWith(gameId);
  });
});
