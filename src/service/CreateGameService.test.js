import { apiService } from './axiosConfig';
import { describe, it, expect, vi } from 'vitest';
import { createGame, isEmpty } from './CreateGameService';

vi.mock('./axiosConfig', () => ({
  apiService: {
    post: vi.fn(),
  },
}));

describe('createGame', () => {
  describe('Validation errors', () => {
    it('should throw an error if any field is empty', async () => {
      const gameData = {
        gameName: '',
        ownerName: 'Host',
        minPlayers: 2,
        maxPlayers: 4,
      };
      await expect(createGame(gameData)).resolves.toBeNull();
    });

    it('should throw an error if minPlayers is greater than maxPlayers', async () => {
      const gameData = {
        gameName: 'Game',
        ownerName: 'Host',
        minPlayers: 5,
        maxPlayers: 4,
      };
      await expect(createGame(gameData)).resolves.toBeNull();
    });

    it('should throw an error if minPlayers is less than 2', async () => {
      const gameData = {
        gameName: 'Game',
        ownerName: 'Host',
        minPlayers: 1,
        maxPlayers: 4,
      };
      await expect(createGame(gameData)).resolves.toBeNull();
    });

    it('should throw an error if maxPlayers is greater than 4', async () => {
      const gameData = {
        gameName: 'Game',
        ownerName: 'Host',
        minPlayers: 2,
        maxPlayers: 5,
      };
      await expect(createGame(gameData)).resolves.toBeNull();
    });

    it('should throw an error if gameName is null', async () => {
      const gameData = {
        gameName: null,
        ownerName: 'Host',
        minPlayers: 2,
        maxPlayers: 4,
      };
      await expect(createGame(gameData)).resolves.toBeNull();
    });

    it('should throw an error if ownerName is undefined', async () => {
      const gameData = {
        gameName: 'Game',
        ownerName: undefined,
        minPlayers: 2,
        maxPlayers: 4,
      };
      await expect(createGame(gameData)).resolves.toBeNull();
    });
  });

  describe('Server response validation', () => {
    it('should return null if the server response does not contain ownerId or gameId', async () => {
      apiService.post.mockResolvedValue({ data: { ownerId: null, gameId: 1 } });
      const gameData = {
        gameName: 'Game',
        ownerName: 'Host',
        minPlayers: 2,
        maxPlayers: 4,
      };
      await expect(createGame(gameData)).resolves.toBeNull();
    });

    it('should return null if the server response contains non-numeric ownerId or gameId', async () => {
      apiService.post.mockResolvedValue({
        data: { ownerId: '1', gameId: '1' },
      });
      const gameData = {
        gameName: 'Game',
        ownerName: 'Host',
        minPlayers: 2,
        maxPlayers: 4,
      };
      await expect(createGame(gameData)).resolves.toBeNull();
    });

    it('should return game data if the creation is successful', async () => {
      apiService.post.mockResolvedValue({ data: { ownerId: 1, gameId: 1 } });
      const gameData = {
        gameName: 'Game',
        ownerName: 'Host',
        minPlayers: 2,
        maxPlayers: 4,
      };
      await expect(createGame(gameData)).resolves.toEqual({
        ownerId: 1,
        gameId: 1,
      });
    });

    it('should return null if an error occurs during the request', async () => {
      apiService.post.mockRejectedValue(new Error('Network Error'));
      const gameData = {
        gameName: 'Game',
        ownerName: 'Host',
        minPlayers: 2,
        maxPlayers: 4,
      };
      await expect(createGame(gameData)).resolves.toBeNull();
    });
  });

  describe('isEmpty function', () => {
    it('should correctly identify a null value as empty', () => {
      const result = isEmpty(null);
      expect(result).toBe(true);
    });

    it('should correctly identify an undefined value as empty', () => {
      const result = isEmpty(undefined);
      expect(result).toBe(true);
    });
  });
});
