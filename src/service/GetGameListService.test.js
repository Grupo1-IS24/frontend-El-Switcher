import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';
import { apiService } from './axiosConfig';
import { getGameList } from './GetGameListService';

// Mock the apiService.
vi.mock('./axiosConfig', () => ({
  apiService: {
    get: vi.fn(),
  },
}));

describe('getGameList', () => {
  it('should be called with the correct endpoint', async () => {
    apiService.get.mockResolvedValue({ data: [] });

    await getGameList();

    expect(apiService.get).toHaveBeenCalledWith('/game_list');
  });

  it('should fetch and validate the game list successfully', async () => {
    const validData = [
      { gameId: 1, gameName: 'Game 1', connectedPlayers: 2, maxPlayers: 4 },
      { gameId: 2, gameName: 'Game 2', connectedPlayers: 1, maxPlayers: 3 },
    ];

    apiService.get.mockResolvedValue({ data: validData });

    const result = await getGameList();

    expect(result).toEqual(validData);
  });

  it('should fetch and validate an empty game list successfully', async () => {
    apiService.get.mockResolvedValue({ data: [] });

    const result = await getGameList();

    expect(result).toEqual([]);
  });

  it('should throw an error if the API request fails', async () => {
    // Mock the API response to throw an error
    apiService.get.mockRejectedValue(new Error('API error'));

    await expect(getGameList()).rejects.toThrow('API error');
  });

  it('should throw an error if the game list is null', async () => {
    apiService.get.mockResolvedValue({ data: null });

    await expect(getGameList()).rejects.toThrow(z.ZodError);
  });

  it('should throw an error if the game list validation fails', async () => {
    const invalidData = [
      { gameId: '1', gameName: 'Game 1', connectedPlayers: 2, maxPlayers: 4 }, // gameId should be a number
      { gameId: 2, gameName: 'Game 2', connectedPlayers: 1, maxPlayers: 3 }, // Valid game
    ];

    apiService.get.mockResolvedValue({ data: invalidData });

    await expect(getGameList()).rejects.toThrow(z.ZodError);
  });

  it('should throw an error if the game list is not an array', async () => {
    const invalidData = {
      gameId: 1,
      gameName: 'Game 1',
      connectedPlayers: 2,
      maxPlayers: 4,
    }; // Not an array

    apiService.get.mockResolvedValue({ data: invalidData });

    await expect(getGameList()).rejects.toThrow(z.ZodError);
  });

  it('should throw an error if game list has missing fields', async () => {
    const invalidData = [
      { gameId: 1, gameName: 'Game 1' }, // Missing maxPlayers and connectedPlayers
      { gameId: 2, gameName: 'Game 2', connectedPlayers: 1, maxPlayers: 3 }, // Valid game.
    ];

    apiService.get.mockResolvedValue({ data: invalidData });

    await expect(getGameList()).rejects.toThrow(z.ZodError);
  });
});
