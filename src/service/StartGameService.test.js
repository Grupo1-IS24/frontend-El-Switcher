import { describe, it, expect, vi } from 'vitest';
import { apiService } from './axiosConfig';
import { startGame } from './StartGameService';

// Mock the apiService.
vi.mock('./axiosConfig', () => ({
  apiService: {
    post: vi.fn(),
  },
}));

describe('startGame', () => {
  it('should be called with the correct endpoint', async () => {
    apiService.post.mockResolvedValue({
      data: { gameId: 1, status: 'Ingame' },
    });

    await startGame(1);

    expect(apiService.post).toHaveBeenCalledWith('/game/1/start');
  });

  it('should return the correct game ID on success', async () => {
    const gameID = 1;
    apiService.post.mockResolvedValue({
      data: { gameId: gameID, status: 'Ingame' },
    });

    const result = await startGame(gameID);

    expect(result).toBe(gameID);
  });

  it('should throw an error if the API response is invalid', async () => {
    apiService.post.mockResolvedValue({
      data: { gameId: '1', status: 'Ingame' },
    });

    await expect(startGame(1)).rejects.toThrow('Error starting the game');
  });

  it('should throw an error if the API request fails', async () => {
    apiService.post.mockRejectedValue(new Error('API error'));

    await expect(startGame(1)).rejects.toThrow('API error');
  });
});
