import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';
import { apiService } from './axiosConfig';
import { getGame } from './GetGameService';

// Mock the apiService.
vi.mock('./axiosConfig', () => ({
  apiService: {
    get: vi.fn(),
  },
}));

describe('getGame', () => {
  it('should be called with the correct endpoint', async () => {
    const gameId = 1;
    const validData = { gameId: 1, gameName: 'Game 1', maxPlayers: 4, minPlayers: 2 };
    apiService.get.mockResolvedValue({ data: validData });

    await getGame(gameId);

    expect(apiService.get).toHaveBeenCalledWith(`/game/${gameId}`);
  });

  it('should fetch and return the game successfully', async () => {
    const gameId = 1;
    const validData = { gameId: 1, gameName: 'Game 1', maxPlayers: 4, minPlayers: 2 };

    apiService.get.mockResolvedValue({ data: validData });

    const result = await getGame(gameId);

    expect(result).toEqual(validData);
  });

  it('should throw an error if the API request fails', async () => {
    const gameId = 1;
    apiService.get.mockRejectedValue(new Error('API error'));

    await expect(getGame(gameId)).rejects.toThrow('API error');
  });

  it('should throw an error if the game data is null', async () => {
    const gameId = 1;
    apiService.get.mockResolvedValue({ data: null });

    await expect(getGame(gameId)).rejects.toThrow(z.ZodError);
  });

  it('should throw an error if the game data is invalid', async () => {
    const gameId = 1;
    const invalidData = { gameId: '1', gameName: 'Game 1',  maxPlayers: 4, minPlayers: 2 }; 

    apiService.get.mockResolvedValue({ data: invalidData });

    await expect(getGame(gameId)).rejects.toThrow(z.ZodError);
  });
});