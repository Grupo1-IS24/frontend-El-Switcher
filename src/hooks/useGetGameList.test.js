import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useGetGameList from './useGetGameList';
import { getGameList } from '../service/GetGameListService';

// Mock getGameList service
vi.mock('../service/GetGameListService', () => ({
  getGameList: vi.fn(),
}));

describe('useGetGameList', () => {
  const mockGameList = [
    { gameId: 1, gameName: 'Test Game 1', connectedPlayers: 2, maxPlayers: 4 },
    { gameId: 2, gameName: 'Test Game 2', connectedPlayers: 4, maxPlayers: 4 },
    { gameId: 3, gameName: 'Test Game 3', connectedPlayers: 1, maxPlayers: 4 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct initial state', () => {
    const { result } = renderHook(() => useGetGameList());
    expect(result.current.gameList).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should fetch and set game list on mount', async () => {
    getGameList.mockResolvedValueOnce(mockGameList);

    const { result } = renderHook(() => useGetGameList());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.gameList).toEqual([
      { gameId: 1, gameName: 'Test Game 1', connectedPlayers: 2, maxPlayers: 4 },
      { gameId: 3, gameName: 'Test Game 3', connectedPlayers: 1, maxPlayers: 4 },
    ]);
    expect(result.current.error).toBeNull();
    expect(getGameList).toHaveBeenCalled();
  });

  it('should handle error when fetching game list', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const errorMessage = 'Error fetching game list';
    getGameList.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useGetGameList());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.gameList).toEqual([]);
    expect(result.current.error).toEqual(new Error(errorMessage));
    expect(getGameList).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should refresh game list when refreshGameList is called', async () => {
    getGameList.mockResolvedValueOnce(mockGameList);

    const { result } = renderHook(() => useGetGameList());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.gameList).toEqual([
      { gameId: 1, gameName: 'Test Game 1', connectedPlayers: 2, maxPlayers: 4 },
      { gameId: 3, gameName: 'Test Game 3', connectedPlayers: 1, maxPlayers: 4 },
    ]);

    const newMockGameList = [
      { gameId: 4, gameName: 'Test Game 4', connectedPlayers: 2, maxPlayers: 4 },
    ];
    getGameList.mockResolvedValueOnce(newMockGameList);

    act(() => {
      result.current.refreshGameList();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.gameList).toEqual(newMockGameList);
    expect(result.current.error).toBeNull();
    expect(getGameList).toHaveBeenCalledTimes(2);
  });
});