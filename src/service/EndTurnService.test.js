import { describe, it, expect, vi } from 'vitest';
import { apiService } from './axiosConfig';
import { endTurn } from './EndTurnService';

// apiService mock
vi.mock('./axiosConfig', () => ({
  apiService: {
    post: vi.fn(),
  },
}));

describe('endTurn', () => {
  it('debe completar el turno correctamente', async () => {
    const gameID = '123';
    const playerID = '456';
    const mockResponse = { data: 'turno finalizado' };

    apiService.post.mockResolvedValueOnce(mockResponse);

    const response = await endTurn(gameID, playerID);

    expect(apiService.post).toHaveBeenCalledWith(
      `/game/${gameID}/end_turn/${playerID}`
    );
    expect(response).toEqual(mockResponse);
  });

  it('debe manejar errores cuando la API falla', async () => {
    const gameID = '123';
    const playerID = '789';
    const errorMessage = 'error de red';

    apiService.post.mockRejectedValueOnce(new Error(errorMessage));

    try {
      await endTurn(gameID, playerID);
      expect(true).toBe(false); // ensures that if the error is not thrown, the test fails
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMessage);
    }
  });
});
