import { describe, expect, it, vi } from 'vitest';
import { apiService } from './axiosConfig';
import { joinGame } from './JoinGameService';

// Mock the apiService.
vi.mock('./axiosConfig', () => ({
  apiService: {
    post: vi.fn(),
  },
}));

describe('joinGame', () => {
  it('should be called with the correct endpoint', async () => {
    const playerJoinData = { playerName: 'Player 1' };

    apiService.post.mockResolvedValue({
      data: { playerId: 1, playerName: 'Player 1' },
    });

    await joinGame(playerJoinData, 999);

    expect(apiService.post).toHaveBeenCalledWith(
      '/game/999/join',
      playerJoinData
    );
  });

  it('should join a player to a game successfully', async () => {
    const playerJoinData = { playerName: 'Player 1' };
    const playerResponseData = { playerId: 1, playerName: 'Player 1' };

    apiService.post.mockResolvedValue({ data: playerResponseData });

    const result = await joinGame(playerJoinData, 999);

    expect(result).toEqual(playerResponseData);
  });

  it('should throw an error if the player join data is invalid', async () => {
    const invalidPlayerJoinData = { playerName: '' }; // playerName can not be empty

    await expect(joinGame(invalidPlayerJoinData, 999)).rejects.toThrow(
      'Datos inválidos: El nombre del jugador no puede estar vacío'
    );
  });

  it('should throw an error if the player response data is invalid', async () => {
    const playerJoinData = { playerName: 'Player 1' };
    const invalidPlayerResponseData = { playerId: '1', playerName: 'Player 1' }; // playerId should be a number

    apiService.post.mockResolvedValue({ data: invalidPlayerResponseData });

    await expect(joinGame(playerJoinData, 999)).rejects.toThrow(
      'Datos de respuesta inválidos por parte del servidor'
    );
  });

  it('should handle a 404 error with "Lobby lleno" detail', async () => {
    const playerJoinData = { playerName: 'Player 1' };

    apiService.post.mockRejectedValue({
      response: {
        status: 404,
        data: {
          detail: 'Lobby lleno',
        },
      },
    });

    await expect(joinGame(playerJoinData, 999)).rejects.toThrow('Lobby lleno');
  });

  it('should handle a 404 error without detail', async () => {
    const playerJoinData = { playerName: 'Player 1' };

    apiService.post.mockRejectedValue({
      response: {
        status: 404,
      },
    });

    await expect(joinGame(playerJoinData, 999)).rejects.toThrow(
      'El servidor ha rechazado la solicitud'
    );
  });

  it('should handle a network error', async () => {
    const playerJoinData = { playerName: 'Player 1' };

    apiService.post.mockRejectedValue({
      message: 'Network Error',
    });

    await expect(joinGame(playerJoinData, 999)).rejects.toThrow(
      'Error inesperado del servidor (posible fallo de red o en la solicitud)'
    );
  });
});
